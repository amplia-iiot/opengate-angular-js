/**
 * https://github.com/jieter/leaflet-clonelayer/blob/master/index.js
 * Solo un archivo.
 * Versión 1.0.2.  Compatible con leaflet 0.7.7
 */
(function (exports) {

    'use strict';

    // Add as L.Util if not exist
    if (!L.Util.cloneLayer) {
        L.Util.cloneLayer = cloneLayer;
    }

    // add as export
    if (typeof exports === 'object') {
        module.exports = cloneLayer;
    }

    /**
     * main function.
     * @param {*} layer 
     */
    function cloneLayer(layer) {
        var options = cloneLayerOptions(layer.options);

        // we need to test for the most specific class first, i.e.
        // Circle before CircleMarker

        // Renderers
        if (layer instanceof L.SVG) {
            return L.svg(options);
        }
        if (layer instanceof L.Canvas) {
            return L.canvas(options);
        }

        // Tile layers
        if (layer instanceof L.TileLayer) {
            return L.tileLayer(layer._url, options);
        }
        if (layer instanceof L.ImageOverlay) {
            return L.imageOverlay(layer._url, layer._bounds, options);
        }

        // Marker layers
        if (layer instanceof L.Marker) {
            return L.marker(layer.getLatLng(), options);
        }

        if (layer instanceof L.Circle) {
            return L.circle(layer.getLatLng(), layer.getRadius(), options);
        }
        if (layer instanceof L.CircleMarker) {
            return L.circleMarker(layer.getLatLng(), options);
        }

        if (layer instanceof L.Rectangle) {
            return L.rectangle(layer.getBounds(), options);
        }
        if (layer instanceof L.Polygon) {
            return L.polygon(layer.getLatLngs(), options);
        }
        if (layer instanceof L.Polyline) {
            return L.polyline(layer.getLatLngs(), options);
        }

        if (layer instanceof L.GeoJSON) {
            return L.geoJson(layer.toGeoJSON(), options);
        }

        if (layer instanceof L.LayerGroup) {
            return L.layerGroup(cloneInnerLayers(layer));
        }
        if (layer instanceof L.FeatureGroup) {
            return L.FeatureGroup(cloneInnerLayers(layer));
        }

        throw 'Unknown layer, cannot clone this layer. Leaflet-version: ' + L.version;
    }

    function cloneLayerOptions(options) {
        var ret = {};
        for (var i in options) {
            var item = options[i];
            if (item && item.clone) {
                ret[i] = item.clone();
            } else if (item instanceof L.Layer) {
                ret[i] = cloneLayer(item);
            } else {
                ret[i] = item;
            }
        }
        return ret;
    }

    function cloneInnerLayers(layer) {
        var layers = [];
        layer.eachLayer(function (inner) {
            layers.push(cloneLayer(inner));
        });
        return layers;
    }

})(window.exports);