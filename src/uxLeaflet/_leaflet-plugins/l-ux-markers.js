/**
 * [uxleaflet/client]
 * Usado en OSS. En UX no es usado todavía.
 * 
 * Closure for Special Markers used by OSS: amplia.maps.EntityMarker and amplia.maps.QuadrantMarker.
 * Estos marcadores están basados en un DIV en lugar de un IMAGE.
 * Están basados en la clase L.Marker. Solo se añade la característica de que el icono pasado
 * como parte de las 'opciones' es un objeto DivIcon.
 * El marcador se compone:
 * * De un DIV con una imagen de fondo establecida por css
 * * Otro DIV interno cuya colocación e imagen de fondo es también establecida por css
 */
(function() {
    'use strict';

    if (!window.L) {
        throw new Error('L.Control.Markers needs Leaflet');
    }

    /** package definition (this ux-markers or ux-map ) */
    if (!L.ux) {
        L.ux = {};
    }

    // Clases css para Status:
    // status-ok, status-warn, status.error

    // Clases para tipos de entidad
    // t-

    var IMAGE_HEIGHT = 40;
    var IMAGE_WIDTH = 40;

    /**
     * Clase base para UxMarker. 
     * Implementa lo necesario para mostrar un marcador en un mapa de amplia
     */
    L.ux.Marker = L.Marker.extend({

        _isMarker: true,
        _feature: null,
        _latlng: null,
        _bocadilloOffset: new L.Point(0, -42),

        initialize: function(latlng, feature) {
            /* keep feature: properties accesible with _getPrroperty */
            this._feature = feature;
            /* keep latlon. Used by showPopup */
            this._latlng = latlng;
            var myIcon = this.createIcon();
            var sTitle = this.createTitle();
            L.Marker.prototype.initialize.call(this, latlng, { title: sTitle, icon: myIcon });
        },

        showPopup: function(map, htmlTemplate, handlePopupAction, hidingOthers) {
            if (this._popup === null) {
                // implementar fill en este fichero
                var divContent = map.fillPopup(this._feature, htmlTemplate, handlePopupAction);
                var latLon = this._latlng;
                var bocadilloOffset = this._bocadilloOffset;
                this._popup = L.popup({ offset: bocadilloOffset })
                    .setLatLng(latLon)
                    .setContent(divContent);
            }
            this._popup.openOn(map);
        },

        createIcon: function() {
            return L.marker();
        },

        createTitle: function() {
            return 'Marker';
        },

        _getProperty: function(name) {
            getProperty('entitytype', this._feature);
        },

        _end: 0

    });

    /**
     * Special subclass ofr Marker for render an Entity.
     * Only needed a required parameter: feature
     */
    L.ux.EntityMarker = L.ux.Marker.extend({

        _isEntityMarker: true,
        _bocadilloOffset: new L.Point(0, -42),

        createIcon: function() {
            var status = this._feature.properties.status || 'unknown';
            var cssName = 'status-' + status + ' t-' + this._getProperty('entitytype');
            // Creamos un ojbeto DivIcon al que le pasamos el contenido personalizados HTML
            var icon = L.divIcon({
                iconSize: [40, 40],
                iconAnchor: [20, 40],
                html: '<div class=\'m2m-type\'></div>',
                className: cssName
            });
            return icon;
        },

        createTitle: function() {
            return this._getProperty('entityKeyAsString');
        },

        _end: 0

    });

    /**
     * Method for creation of a EntityMarker.
     * @param latlng
     * @param feature
     */
    L.ux.entityMarker = function (latlng, feature) {
        return new L.ux.maps.EntityMarker(latlng, feature);
    };


    /**
     * Special subclass ofr Marker for render an Entity.
     * Only needed a required parameter: feature
     */
    L.ux.QuadrantMarker = L.ux.Marker.extend({

        _isQuadrantMarker: true,
        _bocadilloOffset: new L.Point(0, -17),

        createIcon: function() {
            // El estilo es el mismo que el usado por el clusterMaker
            var cssName = 'marker-cluster marker-cluster-small quadranKey';
            // Creamos un ojbeto DivIcon al que le pasamos el contenido personalizados HTML
            var icon = L.divIcon({
                iconSize: [40, 40],
                iconAnchor: [20, 20],
                html: '<div class=\'\'><span>G</span></div>',
                className: cssName
            });
            return icon;
        },

        createTitle: function() {
            var sTitle = 'Agrupador: ' + this._getProperty('quadrantKeyAsString');
            return sTitle;
        },

        _end: 0

    });

    /**
     * Method for creation of a EntityMarker.
     * @param latlng
     * @param feature
     */
    L.ux.quadrantMarker = function (latlng, feature) {
        return new L.ux.maps.QuadrantMarker(latlng, feature);
    };


    /** return the value of a property containing into a feature */
    function getProperty(name, feature) {
        var v = feature.properties[name];
        if (v === undefined) {
            // add a breakpoint for debugging
            v = 'not-found-' + name;
        }
        return v;
    }

})();