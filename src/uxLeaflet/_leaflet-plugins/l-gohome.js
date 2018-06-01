/** 
 * [uxleaflet/client] 
 * L.Controls.Gohome closure
 */
// (function() {
'use strict';

if (!window.L) {
    throw new Error('L.Control.Gohome needs Leaflet');
}

/**
 * @class L.Control.GoHome 
 * @augments {JSON options} bounds or center/zoom
 */
L.Control.Gohome = L.Control.extend({
    includes: L.Mixin.Events,

    options: {
        className: ''
    },

    _isGohomeInstance: true,

    initialize: function(options) {
        if (L.Control.initialize) {
            L.Control.initialize.apply(this, arguments);
        }
        L.Util.setOptions(this, options);
        this._className = (this.options.className || '') + ' ux-home';
        this.options.center = this.options.center || [40, -3.7];
        this.options.zoom = this.options.zoom || 8;
        this._originalView = { center: this.options.center, zoom: this.options.zoom };
    },

    onAdd: function(map) {
        // add custom classname
        var className = this._className + ' leaflet-control-home';
        var container = L.DomUtil.create('div', className + ' leaflet-bar');

        var fsTitle = this.options.fullscreenTitle || 'Go Home Location';
        var fullClassName = className + ' leaflet-control-home';
        this._createButton('', fsTitle, className, container, this.goHome, this);

        return container;
    },

    _createButton: function(html, title, className, container, fn, context) {
        var link = L.DomUtil.create('a', className + ' leaflet-bar-part', container);
        link.innerHTML = html;
        link.href = '#';
        link.title = title;

        var stop = L.DomEvent.stopPropagation;

        L.DomEvent
            .on(link, 'click', stop)
            .on(link, 'mousedown', stop)
            .on(link, 'dblclick', stop)
            .on(link, 'click', L.DomEvent.preventDefault)
            .on(link, 'click', fn, context)
            .on(link, 'click', this._refocusOnMap, context);

        return link;
    },

    goHome: function() {
        if (this.options.bounds) {
            this._map.fitBounds(this.options.bounds);
        } else {
            var zoom = this.options.zoom || 8;
            var center = this.options.center;
            var ll = new L.LatLng(center[0], center[1]);
            this._map.setView(ll, zoom);
        }
        // force internal resize for map
        this._map.invalidateSize();
    },

    saveCurrentViewOriginalView: function() {
        this._originalView = { center: this.options.center, zoom: this.options.zoom };
    },

    restoreOriginalView: function() {
        this.changeTargetView(this._originalView.center, this._originalView.zoom);
    },

    changeTargetView: function(center, zoom) {
        if (!isNaN(center[0]) && !isNaN(center[1])) {
            this.options.center = center;
        } else if (!isNaN(center.lat) && !isNaN(center.lng)) {
            this.options.center = [center.lat, center.lng];
        } else {
            throw 'unknowwn format for center: ' + center;
        }
        this.options.zoom = zoom;
        this.options.bounds = undefined;
    },

    changeTargetViewToBounds: function(bounds) {
        if (bounds.isValid) {
            this.options.bounds = bounds;
            this.options.zoom = undefined;
            this.options.center = undefined;
        } else {
            throw 'Invalid bounds: ' + bounds;
        }
    },

    _oldStyle: {}

});

L.gohome = function (opt) {
    return new L.Control.Gohome(opt);
};

addCSS();

function addCSS() {
    // UPGRADE -añadir estilos por defecto
}

// })();