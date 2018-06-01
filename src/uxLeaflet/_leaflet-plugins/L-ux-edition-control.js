/**
 * [uxleaflet/client]
 * L.Control.UxEdition.
 * Basado en el ejemplo incluido en index.html de Leaflet.Editable
 * 
 * No es usado. Se está suando l-draw.js
 * 
 */
(function() {

    'use strict';

    if (!L.Control) {
        console.error('L.Control.Edition requires Leaflet');
        return;
    }

    /**
     * Main Control as container for edition buttons: 
     * AddPolyline, AddPolygon, AddMarker, and DeleteGeom.
     */
    L.Control.UxEdition = L.Control.extend({
        options: {
            position: 'topleft',
            addPolygonText: '',
            addPolylineText: '',
            addMarkerText: '',
            deleteGeomText: '',
            onFeatureCommited: null, // en pruebas
            cssClass: ''
        },
        onAdd: function(map) {
            var container = L.DomUtil.create('div', 'leaflet-control leaflet-bar');

            // usar options para establecer qué botones son visibles
            //var buttonClazzes = [L.NewMarkerControl, L.NewLineControl, L.NewPolygonControl, L.DeleteGeomControl];
            var buttonClazzes = [L.NewPolygonControl, L.DeleteGeomControl];

            this._buttons = [];
            for (var i = 0; i < buttonClazzes.length; i++) {
                var Clazz = buttonClazzes[i];
                var bto = new Clazz();
                bto.onFeatureCommitedListener = this.options.onFeatureCommited;
                this._buttons.push(bto);
                container.appendChild(bto._createLink(map));
            }
            return container;
        },
        setLayer: function(layer) {
            for (var i = 0; i < this._buttons.length; i++) {
                this._buttons[i].layerGroup = layer;
            }
            for (var key in layer) {
                var lyr = layer[key];
                if (lyr.enableEdit) {
                    lyr.enableEdit();
                    lyr.on('dblclick', L.DomEvent.stop).on('dblclick', this.toggleEdit);
                }
            }
        }
    });

    L.BaseEditControl = L.Control.extend({
        options: {
            position: 'topleft',
            title: 'Edit control',
            innerText: 'o'
        },
        _commitedAction: 'added',
        layerGroup: undefined,
        onAdd: function(map) {
            this._map = map;
            var container = L.DomUtil.create('div', 'leaflet-control leaflet-bar');
            var link = this._createLink(map);
            container.appendChild(link);
            return container;
        },
        isActive: function() {
            return this._link && this._link.classList.contains('active');
        },
        setActive: function(opt) {
            if (!opt) {
                this._link.setAttribute('title', this.options.title);
                this._link.classList.remove('active');
                this._link.style.backgroundColor = '';
                this._link.style.color = '';
            } else {
                this._link.setAttribute('title', this.options.cancelTitle);
                this._link.classList.add('active');
                var color = window.getComputedStyle(this._link).color;
                this._link.style.backgroundColor = color;
                this._link.style.color = '#ffffff'; /* blanco o negro, según tema */
            }
        },
        _createLink: function(map) {
            var link = L.DomUtil.create('a', this.options.cssClass || '');
            link.href = '#';
            link.title = this.options.title;
            link.innerHTML = this.options.innerText;
            this._link = link;
            var _this = this;
            L.DomEvent.on(link, 'click', L.DomEvent.stop)
                .on(link, 'click', function() {
                    var lastGeom = _this._onClick(map);
                    var id = lastGeom && lastGeom._leaflet_id;
                    if (id) {
                        // add to layer group
                        _this.layerGroup[id] = lastGeom;
                    }
                });
            this._link = link;
            return link;
        },
        _onClick: null, // must return a edittool
        _toggle: function() {
            var next = !this.isActive();
            this.setActive(next);
            console.debug('starting tool from: ' + this.options.title);
            return next;
        },
        _featureCommitted: function(evt) {
            evt.action = this._commitedAction;
            console.info('feature commited ', evt);
            if (this.onFeatureCommitedListener) {
                this.onFeatureCommitedListener(evt);
            }
        },
        onFeatureCommitedListener: null,
        _featureCanceled: function(lyr) {
            var id = lyr._leaflet_id;
            if (!lyr._deleting) {
                lyr._deleting = true;
                var map = lyr._map;
                // standard remove
                map.removeLayer(lyr);
                map._onResize();
                delete this.layerGroup[id];
            }
        }
    });

    L.DeleteGeomControl = L.BaseEditControl.extend({
        options: {
            title: 'Delete geometries',
            cancelTitle: 'Stop deletiing',
            innerText: '\uf1f8',
            /* awesome fa-trash */
            //innerText: '\uf12d', /* awesome fa-eraser */
            cssClass: 'delete-edit-control'
        },

        _commitedAction: 'deleted',

        _onClick: function(map) {
            var isActive = this._toggle();
            for (var key in this.layerGroup) {
                var lyr = this.layerGroup[key];
                if (isActive) {
                    this._addOnclick(lyr);
                } else {
                    this._removeOnclick(lyr);
                }
            }
        },

        _addOnclick: function(lyr) {
            if (lyr.editor) {
                var _this = this;
                lyr.on('click', L.DomEvent.stop).on('click', function() {
                    // map layer clicked (included in _this.map)
                    var id = this._leaflet_id;
                    if (id !== undefined) {
                        var map = this._map;
                        // standard remove
                        map.removeLayer(this);
                        map._onResize();
                        // internal ref deletion
                        delete _this.layerGroup[id];
                        // notification
                        _this._featureCommitted({ layer: this });
                        console.debug('deleted feature ' + id);
                    } else {
                        console.warn('clicked object is not a leaflet layer: ' + this);
                    }
                }, lyr);
            }
        },

        _removeOnclick: function(lyr) {
            if (lyr.editor) {
                lyr.off('click', L.DomEvent.stop).off('click');
            }
        }

    });

    L.NewLineControl = L.BaseEditControl.extend({
        options: {
            title: 'Create a new line',
            cancelTitle: 'Cancel line',
            innerText: '\\/\\',
            cssClass: 'newline-edit-control'
        },
        _onClick: function(map) {
            var isActive = this._toggle();
            return map.editTools.startPolyline();
        }
    });

    L.NewPolygonControl = L.BaseEditControl.extend({
        options: {
            title: 'Create a new polygon',
            cancelTitle: 'Cancel polygon',
            innerText: '▰',
            cssClass: 'newpolygon-edit-control'
        },
        _onClick: function(map) {
            var isActive = this._toggle();
            if (isActive) {
                var poly = map.editTools.startPolygon();
                poly.on('editable:drawing:commit', this._featureCommitted, this);
                poly.on('editable:drawing:commit', function(evt) { this.setActive(false); }, this);
                poly.on('editable:drawing:cancel', function(evt) {
                    this.setActive(false);
                    this._featureCanceled(poly);
                }, this);
                return poly;
            } else {
                map.editTools.stopDrawing();
            }
        }
    });

    L.NewMarkerControl = L.BaseEditControl.extend({
        options: {
            title: 'Add a new marker',
            cancelTitle: 'Cancel marker',
            innerText: '🖈',
            cssClass: 'newmarker-edit-control'
        },
        _onClick: function(map) {
            var isActive = this._toggle();
            return map.editTools.startMarker();
        }
    });

})(); /* L.Control.Edition */


// naming of leaflet classes
L.Class.prototype.toString = function() { 'use strict'; return 'Class: ' + this._clazzName; };

L.Map.prototype._clazzName = 'Map';
L.Polygon.prototype._clazzName = 'Polygon';
L.Polygon.prototype.toString = function() {
    'use strict';
    return L.Polyline.prototype.toString.call(this) + ' ' + JSON.stringify(this._latlng);
};

L.Circle.prototype._clazzName = 'Circle';
L.Point.prototype._clazzName = 'Point';
L.Path.prototype._clazzName = 'Path';
L.Marker.prototype._clazzName = 'Marker';
L.Polyline.prototype._clazzName = 'Polyline';