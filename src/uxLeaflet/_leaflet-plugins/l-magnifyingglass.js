/** 
 * [uxleaflet/client]
 * L.Controls.MagnifyGlass closure.
 * Implementación original para Leaflet 1 o superior. No hay implementación para versinoes anteriores.
 * 
 */
(function() {

    // TODO - hacer que tenga ref. a determinadas capas del mapa y hacer que
    // se suscriba a eventos de add/remove de esas capas.
    // Usar l.Util.CloneLayer para clonar nuevas subcapas.
    // TODO - hacer PRIMERO que las 'entities' se añadan en capa propia
    'use strict';

    if (!window.L) {
        throw new Error('L.MagnifyingGlass needs Leaflet');
    }

    var _BASE_CLASS; // clase base de la que heredar.
    var _isLeaflet_07;
    if (L.Layer) {
        // implementación original del widget.
        _BASE_CLASS = L.Layer;
        _isLeaflet_07 = false;
    } else {
        // Esta clase no estaba en versiones anteriores a Leaflet 0.8
        // nueva implementación. Pendiente corregir lo que no funcione en 0.7
        _BASE_CLASS = L.Class;
        _isLeaflet_07 = true;
    }

    /**
     * @class L.MagnifyingGlass 
     * @augments {JSON options}
     */
    L.MagnifyingGlass = _BASE_CLASS.extend({
        options: {
            radius: 180,
            zoomOffset: 3,
            layers: [],
            fixedPosition: false,
            latLng: [0, 0],
            fixedZoom: -1
        },

        initialize: function(options) {
            L.Util.setOptions(this, options);
            this._fixedZoom = (this.options.fixedZoom !== -1);
            this._mainMap = null;
            this._glassMap = null;
        },

        _shifPerformed: function(evt, isPressed) {
            var opacity = isPressed ? '.6' : '1';
            this._glassMap._container.style.opacity = opacity;
        },

        getMap: function() {
            return this._glassMap;
        },

        _createMiniMap: function(elt) {
            // TODO - usar la capa actual del mapa principal
            return new L.Map(elt, {
                layers: this.options.layers,
                zoom: this._getZoom(),
                maxZoom: this._mainMap.getMaxZoom(),
                minZoom: this._mainMap.getMinZoom(),
                crs: this._mainMap.options.crs,
                fadeAnimation: false,
                // disable every controls and interaction means
                attributionControl: false,
                zoomControl: false,
                boxZoom: false,
                touchZoom: false,
                scrollWheelZoom: false,
                doubleClickZoom: false,
                dragging: false,
                keyboard: false
            });
        },

        _getZoom: function() {
            return (this._fixedZoom) ?
                this.options.fixedZoom :
                this._mainMap.getZoom() + this.options.zoomOffset;
        },

        _updateZoom: function() {
            this._glassMap.setZoom(this._getZoom());
        },

        setRadius: function(radius) {
            this.options.radius = radius;
            if (this._wrapperElt) {
                this._wrapperElt.style.width = this.options.radius * 2 + 'px';
                this._wrapperElt.style.height = this.options.radius * 2 + 'px';
            }
        },

        setLatLng: function(latLng) {
            this.options.latLng = latLng;
            this._update(latLng);
        },

        _updateFromMouse: function(evt) {
            this._update(evt.latlng, evt.layerPoint);
        },

        _updateFixed: function() {
            this._update(this.options.latLng);
        },

        _update: function(latLng, layerPoint) {
            // update mini map view, forcing no animation
            this._glassMap.setView(latLng, this._getZoom(), {
                pan: { animate: false }
            });

            // update the layer element position on the main map,
            // using the one provided or reprojecting it
            layerPoint = layerPoint || this._mainMap.latLngToLayerPoint(latLng);
            this._wrapperElt.style.left = layerPoint.x - this.options.radius + 'px';
            this._wrapperElt.style.top = layerPoint.y - this.options.radius + 'px';
        },

        /**
         As defined by ILayer
         */
        onAdd: function(map) {
            this._mainMap = map;
            // create a wrapper element and a container for the map inside it
            this._wrapperElt = L.DomUtil.create('div', 'leaflet-magnifying-glass');
            var glassMapElt = L.DomUtil.create('div', '', this._wrapperElt);
            // Webkit border-radius clipping workaround (see CSS)
            if (L.Browser.webkit)
                L.DomUtil.addClass(glassMapElt, 'leaflet-magnifying-glass-webkit');
            // build the map
            this._glassMap = this._createMiniMap(glassMapElt);

            // forward some DOM events as Leaflet events
            L.DomEvent.addListener(this._wrapperElt, 'click', this._fireClick, this);

            var opts = this.options;

            this.setRadius(opts.radius);
            this.setLatLng(opts.latLng);

            this._glassMap.whenReady(function() {
                if (opts.fixedPosition) {
                    this._mainMap.on('zoomend', this._updateFixed, this);
                    // for now, hide the elements during zoom transitions
                    L.DomUtil.addClass(this._wrapperElt, ('leaflet-zoom-hide'));
                } else {
                    this._mainMap.on('mousemove', this._updateFromMouse, this);
                    if (!this._fixedZoom) {
                        this._mainMap.on('zoomend', this._updateZoom, this);
                    }
                }
            }, this);

            // add the magnifying glass as a layer to the top-most pane
            map.getPanes().popupPane.appendChild(this._wrapperElt);

            // needed after the element has been added, otherwise tile loading is messy
            this._glassMap.invalidateSize();

            addShifEventListener(this._shifPerformed, this);

            return this;
        },

        _fireClick: function(domMouseEvt) {
            if (this.fire) {
                // leaflet 1.0
                this.fire('click', domMouseEvt);
            } else {
                // old leaflet
            }
            L.DomEvent.stopPropagation(domMouseEvt);
        },

        /**
         As defined by ILayer
         */
        onRemove: function(map) {
            map.off('viewreset', this._updateFixed, this);
            map.off('mousemove', this._updateFromMouse, this);
            map.off('zoomend', this._updateZoom, this);
            // layers must be explicitely removed before map destruction,
            // otherwise they can't be reused if the mg is re-added
            for (var i = 0, l = this.options.layers.length; i < l; i++) {
                this._glassMap.removeLayer(this.options.layers[i]);
            }
            this._glassMap.remove();
            L.DomEvent.removeListener(this._wrapperElt, 'click', this._fireClick);
            map.getPanes().popupPane.removeChild(this._wrapperElt);
            this._mainMap = null;
            removeShifEventListener(this._shifPerformed, this);
            return this;
        }
    });

    L.magnifyingGlass = function(options) {
        return new L.MagnifyingGlass(options);
    };

    /**
     * @class  L.Control.MagnifyingGlass
     * @augments {JSON options}
     */
    L.Control.MagnifyingGlass = L.Control.extend({

        _magnifyingGlass: false,

        options: {
            position: 'topleft',
            title: 'Toggle Magnifying Glass',
            forceSeparateButton: true
        },

        initialize: function(options) {
            // Override default options
            for (var i in options) {
                if (options.hasOwnProperty(i) && this.options.hasOwnProperty(i)) {
                    this.options[i] = options[i];
                }
            }
        },

        onAdd: function(map) {
            var className = 'leaflet-control-magnifying-glass';
            var container;
            if (map.zoomControl && !this.options.forceSeparateButton) {
                container = map.zoomControl._container;
            } else {
                container = L.DomUtil.create('div', className + ' leaflet-bar');
            }

            this._button = this._createButton(this.options.title, className, container, map);
            return container;
        },

        _createButton: function(title, className, container, map) {
            // TODO - generar el botón de la misma manera que el resto.
            var _this = this;
            var link = L.DomUtil.create('a', className, container);
            link.href = '#';
            link.title = title;

            L.DomEvent
                .addListener(link, 'click', L.DomEvent.stopPropagation)
                .addListener(link, 'click', L.DomEvent.preventDefault)
                .addListener(link, 'click', function() { _this._clicked(map); });

            return link;
        },

        _clicked: function() {
            var map = this._map;
            if (!this._magnifyingGlass) {
                this._magnifyingGlass = _temp_create_glass(map);
            }

            if (map.hasLayer(this._magnifyingGlass)) {
                map.removeLayer(this._magnifyingGlass);
                L.DomUtil.removeClass(this._button, 'active');
            } else {
                if (this._magnifyingGlass.addTo) {
                    // leaflet >= 1
                    this._magnifyingGlass.addTo(map);
                } else {
                    // leaflet < 1.  En pruebas
                    map.addLayer(this._magnifyingGlass);
                }
                L.DomUtil.addClass(this._button, 'active');
            }
        }

    });

    L.control.magnifyingglass = function(options) {
        return new L.Control.MagnifyingGlass(options);
    };

    addCSS();

    function addCSS() {
        // UPGRADE -añadir estilos por defecto
    }

    /** 
     * Función temporal. Usar funcines de angular para suscripción a eventos de teclado
     */
    function addShifEventListener(func, context) {
        var addEventListener = window.addEventListener ? document.addEventListener : document.attachEvent;
        addEventListener('keydown', function(event) {
            if (event.keyCode === 16 || event.charCode === 16) {
                event._iskeydown = true;
                func.call(context, event, true);
            }
        });
        addEventListener('keyup', function(event) {
            if (event.keyCode === 16 || event.charCode === 16) {
                event._iskeyup = true;
                func.call(context, event, false);
            }
        });
    }

    function removeShifEventListener(func, context) {
        var removeEventListener = window.removeEventListener ? document.removeEventListener : function _foo() {};
        removeEventListener('keydown', context);
        removeEventListener('keyup', context);
    }

    /* Crea una instancia de L.MagnifyingGlass usando como capa la capa principal actual del mapa */
    function _temp_create_glass(map) {

        // código de la demos
        var tileUrl = window.location.protocol + '//b.tile.openstreetmap.org/{z}/{x}/{y}.png';
        var tileOptions = {
            attribution: '&copy; <a href=\'https://osm.org/copyright\'>OpenStreetMap</a> contributors'
        };

        // TODO - obtener desde 'map'
        var currentBaseLayer = L.tileLayer(tileUrl, tileOptions);

        var magnifyingGlass = L.magnifyingGlass({
            zoomOffset: 3,
            layers: [currentBaseLayer]
        });
        return magnifyingGlass;
    }

})(); //  L.Control.MagnifyingGlass