/*
 * [uxleaflet/client]
 * Google layer using Google Maps API.
 * window.google.maps is required when constructor is called.
 */
(function(L, google) {

    'use strict';

    // check objects loaded in header as external libraries.
    if (!L) {
        throw new Error('L.Google needs Leaflet');
    }


    /**
     * L.Google implementation for L-0.7.7
     * (In L-1.x, L.Google must inherit from L.Evented)
     */
    L.Google = L.Class.extend({
        includes: L.Mixin.Events,

        options: {
            minZoom: 0,
            maxZoom: 18,
            tileSize: 256,
            subdomains: 'abc',
            errorTileUrl: '',
            attribution: '',
            opacity: 1,
            continuousWorld: false,
            noWrap: false
        },

        // Possible types: SATELLITE, ROADMAP, HYBRID, TERRAIN
        initialize: function(type, options) {
            L.Util.setOptions(this, options);

            // check param of this scope
            this._ready = google !== undefined;
            if (!this._ready) {
                delayInit(this);
            }

            this._type = type || 'SATELLITE';
        },

        onAdd: function(map, insertAtTheBottom) {
            this._map = map;
            this._insertAtTheBottom = insertAtTheBottom;

            // create a container div for tiles
            this._initContainer();
            this._initMapObject();

            // set up events
            map.on('viewreset', this._resetCallback, this);

            this._limitedUpdate = L.Util.limitExecByInterval(this._update, 50, this);
            map.on('move', this._update, this);
            map.on('dragstart', this._update, this);
            map.on('drag', this._update, this);
            map.on('zoomstart', this._update, this);
            map.on('zoomend', this._update, this);
            map.on('autopanstart', this._update, this);

            map._controlCorners.bottomright.style.marginBottom = '1em';

            this._reset();
            this._update();
        },

        onRemove: function(map) {
            this._map._container.removeChild(this._container);
            //this._container = null;

            this._map.off('viewreset', this._resetCallback, this);

            this._map.off('move', this._update, this);
            map._controlCorners.bottomright.style.marginBottom = '0em';
            //this._map.off('moveend', this._update, this);
        },

        getAttribution: function() {
            return this.options.attribution;
        },

        setOpacity: function(opacity) {
            this.options.opacity = opacity;
            if (opacity < 1) {
                L.DomUtil.setOpacity(this._container, opacity);
            }
        },

        setElementSize: function(e, size) {
            e.style.width = size.x + 'px';
            e.style.height = size.y + 'px';
        },

        _initContainer: function() {
            var tilePane = this._map._container,
                first = tilePane.firstChild;

            if (!this._container) {
                this._container = L.DomUtil.create('div', 'leaflet-google-layer leaflet-top leaflet-left');
                this._container.id = '_GMapContainer_' + L.Util.stamp(this);
                this._container.style.zIndex = 'auto';
            }

            if (true) {
                tilePane.insertBefore(this._container, first);

                this.setOpacity(this.options.opacity);
                this.setElementSize(this._container, this._map.getSize());
            }
        },

        _initMapObject: function() {
            if (!this._ready) return;
            this._google_center = new google.maps.LatLng(0, 0);
            var map = new google.maps.Map(this._container, {
                center: this._google_center,
                zoom: 0,
                tilt: 0,
                mapTypeId: google.maps.MapTypeId[this._type],
                disableDefaultUI: true,
                keyboardShortcuts: false,
                draggable: false,
                disableDoubleClickZoom: true,
                scrollwheel: true,
                streetViewControl: false
            });

            var _this = this;
            this._reposition = google.maps.event.addListenerOnce(map, 'center_changed',
                function() { _this.onReposition(); });

            map.backgroundColor = '#ff0000';
            this._google = map;
        },

        _resetCallback: function(e) {
            this._reset(e.hard);
        },

        _reset: function(clearOldContainer) {
            this._initContainer();
        },

        _update: function() {
            if (!this._google) return;
            this._resize();

            var bounds = this._map.getBounds();
            var ne = bounds.getNorthEast();
            var sw = bounds.getSouthWest();
            var google_bounds = new google.maps.LatLngBounds(
                new google.maps.LatLng(sw.lat, sw.lng),
                new google.maps.LatLng(ne.lat, ne.lng)
            );
            var center = this._map.getCenter();
            var _center = new google.maps.LatLng(center.lat, center.lng);

            this._google.setCenter(_center);
            this._google.setZoom(this._map.getZoom());
            //this._google.fitBounds(google_bounds);
        },

        _resize: function() {
            var size = this._map.getSize();
            if (this._container.style.width === size.x &&
                this._container.style.height === size.y)
                return;
            this.setElementSize(this._container, size);
            this.onReposition();
        },

        onReposition: function() {
            if (!this._google) return;
            google.maps.event.trigger(this._google, 'resize');
        }
    });


    L.Google.asyncWait = [];

    var ensureStarted = false;

    function delayInit(obj) {
        L.Google.asyncWait.push(obj);
        if (ensureStarted) {
            return;
        }
        ensureStarted = true;
        L.extraApi.ensureLib('google', ['google.maps.Map'], function() {
            var i;
            // refresh 'google' parameter
            google = window.google;
            for (i = 0; i < L.Google.asyncWait.length; i++) {
                var o = L.Google.asyncWait[i];
                o._ready = true;
                if (o._container) {
                    o._initMapObject();
                    o._update();
                }
            }
            L.Google.asyncWait = [];
        });
    }
    /*
        function testPromise() {
            var p = new Promise(function(resolve, reject) {
                window.setTimeout(function() {
                    resolve('p-' + $scope.$id);
                }, 2000);
            })
            p.then(
                function(data) {
                    console.info('OK: ' + data);
                }
            );
        }
    */
})(window.L, window.google);