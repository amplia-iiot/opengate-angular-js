/*
 * [uxleaflet/client] 
 * https://github.com/ardhi/Leaflet.MousePosition
 * File: l-mouseposition.js 
 */

(function () {
    'use strict';

    L.Control.MousePosition = L.Control.extend({
        options: {
            position: 'bottomleft',
            separator: ' : ',
            emptyString: 'Unavailable',
            lngFirst: false,
            numDigits: 6,
            lngFormatter: undefined,
            latFormatter: undefined,
            prefix: ''
        },
        _existMouse: false,

        onAdd: function(map) {
            this._container = L.DomUtil.create('div', 'leaflet-control-mouseposition');
            L.DomEvent.disableClickPropagation(this._container);
            map.on('mousemove', this._onMouseMove, this);
            map.on('move', this._onMove, this); // for no-mouse device.
            this._container.innerHTML = this.options.emptyString;
            return this._container;
        },

        onRemove: function(map) {
            map.off('mousemove', this._onMouseMove);
        },

        _setText: function(latlng) {
            var lng = this.options.lngFormatter ? this.options.lngFormatter(latlng.lng) : L.Util.formatNum(latlng.lng, this.options.numDigits);
            var lat = this.options.latFormatter ? this.options.latFormatter(latlng.lat) : L.Util.formatNum(latlng.lat, this.options.numDigits);
            var value = this.options.lngFirst ? lng + this.options.separator + lat : lat + this.options.separator + lng;
            var prefixAndValue = this.options.prefix + ' ' + value;
            this._container.innerHTML = prefixAndValue;
        },

        _onMouseMove: function(e) {
            this._existMouse = true;
            this._setText(e.latlng);
        },

        _onMove: function(e) {
            if (!this._existMouse) {
                var map = e.target;
                this._setText(map.getCenter());
            }
        },

    });

    L.Map.mergeOptions({
        positionControl: false
    });

    L.Map.addInitHook(function() {
        if (this.options.positionControl) {
            this.positionControl = new L.Control.MousePosition();
            this.addControl(this.positionControl);
        }
    });

    L.control.mousePosition = function(options) {
        return new L.Control.MousePosition(options);
    };

})();