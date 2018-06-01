'use strict';

angular.module('uxleaflet')

/**   
 * uxGeomService implements utilities for manage geometries and coordinates
 */
.service('geomUxService', function($timeout) {
    var _this = this;

    _this.circleToPolygon = circleToPolygon;
    _this.createVectorLayer = createVectorLayer;

    //
    // internal functions
    //

    function toRadians(angleInDegrees) {
        return angleInDegrees * Math.PI / 180;
    }

    function toDegrees(angleInRadians) {
        return angleInRadians * 180 / Math.PI;
    }

    /**
     * 
     * @param {*} c1 
     * @param {*} distance 
     * @param {*} bearing 
     */
    function offset(c1, distance, bearing) {
        var lat1 = toRadians(c1[1]);
        var lon1 = toRadians(c1[0]);
        var dByR = distance / 6378137; // distance divided by 6378137 (radius of the earth) wgs84
        var lat = Math.asin(
            Math.sin(lat1) * Math.cos(dByR) +
            Math.cos(lat1) * Math.sin(dByR) * Math.cos(bearing));
        var lon = lon1 + Math.atan2(
            Math.sin(bearing) * Math.sin(dByR) * Math.cos(lat1),
            Math.cos(dByR) - Math.sin(lat1) * Math.sin(lat));
        return [toDegrees(lon), toDegrees(lat)];
    }

    /**
     * Create a Geometry object of type polygon from circle parameters.
     * The coordinates will contains an unique ring
     * @return {JSON Geometry} type:'Polygon', coordinates: [ [[p1x, p1y], [p2x, p2y]] ]
     */
    function circleToPolygon(centerPoint, radius, numberOfSegments) {
        var n = numberOfSegments ? numberOfSegments : 32;
        var ring = [];
        for (var i = 0; i < n; i += 1) {
            ring.push(offset(centerPoint, radius, 2 * Math.PI * i / n));
        }
        ring.push(ring[0]); // last point ref to firts point. they are the same object

        return {
            type: 'Polygon',
            coordinates: [ring] // only an external linear ring
        };
    }

    /** 
     * This method is used for check distances from points to a supossed common 'center'.
     * It is the case of points of polygon generated from circle parameters: all points should be
     * have a distance very simililar to common center.
     * The error is setted to .00001% (10^-7)  */
    function areSimiliarValues(a, b) {
        var EPS = 0.0000001;
        if (!a || !b) return false;
        var ratio = 1.0 * a / b;
        var dif = Math.abs(1 - ratio);
        return dif < EPS;
    }

    /**
     * Create a vector Layer: Polygon or circle attending to geometry type of parameter
     * @param {GeoJSON geometry}
     */
    function createVectorLayer(geometry) {

        var isCircle;

        var METERS_PER_DEGREE = (40075017.0 / 360);

        var exteriorRing = geometry.coordinates[0] || [];
        var bounds = L.bounds(exteriorRing);
        var center = bounds.getCenter();
        var size = bounds.getSize();
        var radius = size.y / 2 * METERS_PER_DEGREE;
        if (geometry.type === 'Polygon') {
            // only one linear ring expected: the exteriorRing

            var MIN_CIRCLE_POINTS = 50; // minimum points for conversion circle to polygon

            if (exteriorRing.length >= MIN_CIRCLE_POINTS) {
                // polygon candidate to circle.
                isCircle = true;
                var centerLatLng = new L.LatLng(center.y, center.x);
                for (var key in exteriorRing) {
                    var xy = exteriorRing[key];
                    var borderLatLng = new L.LatLng(xy[1], xy[0]);
                    var dist = centerLatLng.distanceTo(borderLatLng);
                    if (!dist || !areSimiliarValues(radius, dist)) {
                        isCircle = false;
                        break;
                    }
                }
            } else {
                // too few points for a transformed circle in polygon
                isCircle = false;
            }
        } else {
            isCircle = false;
        }

        var vectorLayer;
        if (isCircle === false) {
            // No Circle.
            var gjLayer = L.geoJson(geometry, {
                onEachFeature: function(feat, layer) {
                    if (!feat.properties) {
                        feat.properties = {};
                    }
                }
            });
            vectorLayer = gjLayer.getLayers()[0];
        } else {
            // It is a polygon generated from Circle parameters
            // creating special VectorLayer for Circle
            var lat = (center.lat !== undefined) ? center.lat : center.y;
            var lng = (center.lng !== undefined) ? center.lng : center.x;
            vectorLayer = L.circle([lat, lng], radius);
        }
        return vectorLayer;
    }

});