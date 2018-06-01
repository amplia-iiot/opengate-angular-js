/*
 * [uxleaflet/client] 
 * https://github.com/ardhi/Leaflet.ZoomWheelToggle
 * File: l-zoomwheeltoggle.js 
 * 
 * NO añadir todavía a Options activado por defecto. HMI usa leaflet y aparecería el mensaje
 */

(function() {
    'use strict';

    L.Control.ZoomWheelToggle = L.Control.extend({
        options: {
            position: 'topleft',
            text: 'Click to enable zoom with mouse wheel',
            detectBodyScroll: true
        },

        onAdd: function(map) {
            this._container = L.DomUtil.create('div', 'leaflet-control-zoomwheeltoggle');
            this._span = L.DomUtil.create('span', '', this._container);
            this._suscribeEvents(map);
            this._refreshText();
            return this._container;
        },

        addTo: function(map) {
            this._map = map;
            // add directly to map Container
            this._container = this.onAdd(map);
            // L.DomUtil.addClass(this._container, 'leaflet-control');
            this._map._container.appendChild(this._container);
            return this;
        },

        removeFrom: function(map) {
            if (map && map !== this._map) {
                throw new Error("Invalid map for removing from: ", map);
            }
            this._setMouseWheelEnabled(true);
            // removing from current map.
            map = this._map;
            map._container.removeChild(this._container);
            map.off('fullscreenchange', this._onFullScreenChanged, this);
            map.off('contextmenu', this._onMouseWheelEnabling, this);
            map.off('click', this._onMouseWheelEnabling, this);
            map.off('mouseout', this._onMouseWheelDisabling, this);
            map.off('mousemove', this._onMouseMoving, this);
            this._map = null;
        },

        _isBodyScrollVisible: function() {
            var hasScrollBar = true;
            if (typeof window.innerWidth === 'number') {
                hasScrollBar = window.innerWidth > document.body.clientWidth;
            }
            return hasScrollBar;
        },

        _timeout: null,

        _suscribeEvents: function(map) {

            if (this._isBodyScrollVisible()) {
                map.scrollWheelZoom.disable();
                this._setTextVisible(false);
            }
            var _this = this;

            map.on('fullscreenchange', this._onFullScreenChanged, this);
            map.on('contextmenu', this._onMouseWheelEnabling, this);
            map.on('click', this._onMouseWheelEnabling, this);
            map.on('mouseout', this._onMouseWheelDisabling, this);
            map.on('mousemove', this._onMouseMoving, this);
        },

        _setMouseWheelEnabled: function(v, preCondition) {
            if (preCondition) {
                // usamos precondición si this.detectBodyScrol
                if (this.options.detectBodyScroll) {
                    v = v || !this._isBodyScrollVisible();
                }
            }
            if (v) {
                this._map.scrollWheelZoom.enable();
                this._container.style.display = 'none';
            } else {
                this._map.scrollWheelZoom.disable();
                this._container.style.display = '';
                this._setTextVisible(true, 0, function() {
                    this._setTextVisible(false, 200);
                });
            }
            this._setTextVisible(false, 0);
        },

        _setTextVisible: function(v, millis, cb) {
            var _this = this;
            if (this._timeout) clearTimeout(this._timeout);
            this._timeout = setTimeout(function() {
                if (v) {
                    _this._container.style.opacity = '0.4';
                } else {
                    _this._container.style.opacity = '0';
                }
                if (cb) cb();
            }, millis || 0);
        },

        _onFullScreenChanged: function(event) {
            var enable = event.target._isFullscreen;
            this._setMouseWheelEnabled(enable, true);
        },

        _onMouseWheelEnabling: function(event) {
            this._setMouseWheelEnabled(true);
        },

        _onMouseWheelDisabling: function(event) {
            this._setMouseWheelEnabled(false, true);
        },

        _onMouseMoving: function(event) {
            if (!event.target._isFullscreen && this._map) {
                if (!this._map.scrollWheelZoom._enabled) {
                    this._setTextVisible(true);
                }
            }
        },

        _windowResized: function(evt) {
            // TODO - detectar si hay scroll para evitar desactivar zoom-wheel
            if ($("body").height() > $(window).height()) {}
        },

        onRemove: function(map) {
            map.off('mousemove', this._onMouseMove);
        },

        setText: function(sText) {
            this.options.text = sText;
            this._refreshText();
        },
        _refreshText: function() {
            this._span.innerHTML = this.options.text;
        }

    });

    /**
     * Opciones por defecto de L.Map: zoomWheelToggle activado
     */
    L.Map.mergeOptions({
        // habilitado por defecto
        zoomWheelToggle: { text: 'clic into map for enable zoom-wheel' }
        // deshabililtado por defecto
        //zoomWheelToggle: false
    });

    /** Importante. Deshabilitado por defecto en el MiniMap, si estuviera
     * activado por defecto en L.Map
     */
    L.Control.MiniMap.mergeOptions({
        mapOptions: { zoomWheelToggle: false }
    });

    L.Map.addInitHook(function() {
        if (this.options.zoomWheelToggle) {
            var opts = this.options.zoomWheelToggle;
            opts = (typeof opts === 'object') ? opts : {};
            this.zoomWheelToggleControl = new L.Control.ZoomWheelToggle(opts);
            this.addControl(this.zoomWheelToggleControl);
        }
    });

    /** Enable plugin for enable/disable wheel zoom.
     * @param { string | JSON } if string then text of message will be replaced
     * whit this text
     */
    L.Map.prototype.enableWheelZoomToggle = function(options) {
        if (typeof options === 'string') {
            // default propery is text
            options = { text: options };
        }
        if (!this.zoomWheelToggleControl) {
            this.zoomWheelToggleControl = new L.Control.ZoomWheelToggle(options);
            this.addControl(this.zoomWheelToggleControl);
        } else {
            this.zoomWheelToggleControl.setOptions(options);
        }
    };

    /**
     * Diaslbe plugin for enable/disable wheel zoom.
     */
    L.Map.prototype.disableWheelZoomToggle = function(options) {
        if (this.zoomWheelToggleControl) {
            // removeFrom is overriden. No need map parameter
            this.zoomWheelToggleControl.removeFrom();
            this.zoomWheelToggleControl = null;
        }
    };

    L.control.zoomWheelToggle = function(options) {
        return new L.Control.ZoomWheelToggle(options);
    };

    var styleElem = document.createElement('style');
    styleElem.type = 'text/css';

    styleElem.innerHTML = ' \n ' +
        '.leaflet-control-zoomwheeltoggle {  \n ' +
        '    position: absolute;  \n ' +
        '    text-align: center;  \n ' +
        '    pointer-events: none;  \n ' +
        '    width: 98%;  \n ' +
        '    opacity: .5;  \n ' +
        '    z-index: 1;  \n ' +
        '    transition: 1s;  \n ' +
        '    padding-top: 30px;  \n ' +
        ' } \n ' +
        '.leaflet-control-zoomwheeltoggle span {  \n ' +
        '    background-color: #000000;  \n ' +
        '    text-align: center;  \n ' +
        '    color: #ffffff;  \n ' +
        '    font-size: 14px;  \n ' +
        '    padding: 1em; \n ' +
        '    padding-left: 3em; \n ' +
        '    padding-right: 3em; \n ' +
        ' } \n ' +
        document.head.appendChild(styleElem);

})();