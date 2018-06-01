/** 
 * [uxleaflet/client]
 * L.Controls.BoxSelection closure.
 * OJO: No borrar todavía. Es una alternativa a L.BoxZoom 
 * 
 * OJO: Ejemplo en el que se basa este código usaba nuevas instrucciones ECMA6.
 * Son incompatibles con jslint uado por tarea gulp.
 */
(function() {

    'use strict';

    if (!window.L) {
        throw new Error('L.Control.FeatureSelection needs Leaflet');
    }

    /**
     * @class L.Control.FeatureSelection 
     */
    L.Control.FeatureSelection = L.Control.extend({
        includes: L.Mixin.Events,

        options: {
            className: ''
        },

        _button: null,
        _restriction: null,

        initialize: function(options) {
            if (!window.L.Map.SelectArea) {
                throw new Error('L.Control.FeatureSelection needs L.Map.SelectArea (bower: leaflet-select-area');
            }
            if (L.Control.initialize) {
                L.Control.initialize.apply(this, arguments);
            }
            L.Util.setOptions(this, options);

        },

        onAdd: function(map) {
            this._map = map;

            var className = (this._className || '') + ' leaflet-control-boxselection',
                container = L.DomUtil.create('div', className + ' leaflet-bar');
            var classNamePrefix = ' leaflet-control-boxselection'; // leaflet-select-control

            var title = this.options.title || 'Select features on map';
            title = 'IN DEVELOPMENT  --  Select features on map';
            console.warn(title); // DELETE this line when ...
            this._button = this._createButton('', title, className, container, this.goHome, this);

            var result = document.querySelector('.info .result') || $('<div></div>');
            // on select
            map.on({
                'areaselected': this.areaSelectedPerformed,
                'areaselecttoggled': this.updateButton
            });

            // no necesario. Se seleccionará sin necesidad de ctrl
            // L.DomEvent.on(document.querySelector('#restriction'), 'change', toggleRestriction);
            // L.DomEvent.on(document.querySelector('#shift-key'), 'change', toggleShiftKey);
            // L.DomEvent.on(document.querySelector('#ctrl-key'), 'change', toggleCtrlKey);

            this._map.selectArea.setControlKey(false);

            // enable
            this.updateButton();

            return container;
        },

        areaSelectedPerformed: function(evt) {
            // Esto depende de los objetos a seleccionar.
            // L.Util.requestAnimFrame(function() {
            //     map.eachLayer(function(pointLayer) {
            //         if (pointLayer instanceof L.CircleMarker) {
            //             pointLayer.setStyle({
            //                 color: evt.bounds.contains(pointLayer.getLatLng()) ? '#0f0' : '#f00'
            //             });
            //         }
            //     });
            // });
            var sInner = evt.bounds.toBBoxString().split(',').join(',\n');
            // result.innerHTML = '<pre>' + sInner + '</pre>';
            console.info(sInner);
        },

        _createButton: function(html, title, className, container, fn, context) {
            var _this = this;
            var link = L.DomUtil.create('a', className + ' leaflet-bar-part', container);
            link.innerHTML = html;
            link.href = '#';
            link.title = title;

            var stop = L.DomEvent.stopPropagation;

            L.DomEvent
                .on(link, 'click', function() {
                    _this._areaSelectToggled();
                })
                .on(link, 'mousedown', stop)
                .on(link, 'dblclick', stop)
                .on(link, 'click', L.DomEvent.preventDefault);

            return link;
        },

        updateButton: function() {
            if (this._button) {
                L.DomUtil[this._map.selectArea.enabled() ? 'addClass' : 'removeClass'](this._button, 'active');
            }
        },

        toggleRestriction: function() {
            var map = this._map;
            if (this._restriction) {
                map.removeLayer(this._restriction);
                map.selectArea.setValidate();
                this._restriction = null;
            } else {
                var bounds = map.getBounds().pad(-0.25);
                this._restriction = L.rectangle(bounds, {
                    weight: 2,
                    color: '#0ff',
                    fillOpacity: 0,
                    clickable: false,
                    opacity: 0.7
                }).addTo(map);
                map.selectArea.setValidate(function(p) {
                    return bounds.contains(map.layerPointToLatLng(p));
                });
            }
        },

        _areaSelectToggled: function() {
            if (this._map.selectArea.enabled()) {
                L.DomUtil.removeClass(this._button, 'active');
                this._map.selectArea.disable();
                console.info('Select area disabled');
            } else {
                L.DomUtil.addClass(this._button, 'active');
                this._map.selectArea.enable();
                console.info('Select area enabled');
            }
        },

        toggleCtrlKey: function() {
            this._map.selectArea.setControlKey(document.querySelector('#ctrl-key').checked);
        },

        toggleShiftKey: function() {
            this._map.selectArea.selectArea.setShiftKey(document.querySelector('#shift-key').checked);
        },

        _oldStyle: {}

    });

    L.boxSelection = function (opt) {
        return new L.Control.BoxSelection(opt);
    };

})();