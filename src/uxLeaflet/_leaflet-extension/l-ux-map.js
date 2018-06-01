'use strict';

/* 
 * Customization of L.Map and L.Control.Layers:
 * - override default options (zoomInText, maxZoom, ...)
 * - override initialize. Check url value.
 * - management of layerControl: base layers (including offline layer), overlays, ...
 * - Change default options for LeafLet classes
 * - Minimap synchorinization
 * - Local layer management
 */
(function(L) {

    // L.UxMap extends L.Map
    // L.Control.UxLayers extends L.Control.Layers
    var USE_INHERITANCE = false; // true: uses L.Control.extends, false: modify original class
    var BASE_CLASS;
    if (!L.UxMap && !L.Map_ixUx) {

        BASE_CLASS = L.Map;
        var _BASE_; // or BASE_CLASS.prototype if USE_INHERITANCE is true

        var _uxMap_members = {
            /* -- */
            initialize: function() {
                var isSimpleMap = isSimpleUxMap(this, arguments); // cómo detectar mapa simple
                // default initialize of L.Map
                _BASE_.initialize.apply(this, arguments);
                console.info('Ux L.Map initialize');
                // uxMap initialize
                var mapOptions = this.options;
                if (mapOptions.editPointSize && L.Editable && L.Editable.VertexIcon) {
                    var size = parseInt(mapOptions.editPointSize);
                    if (size > 5 && size < 30) {
                        // Ojo. De momento se cambia para 'todos'
                        L.Editable.VertexIcon.prototype.options.iconSize = new L.Point(size, size);
                    }
                }
                // init
                if (isSimpleMap) {
                    initSimpleUxMap(this);
                }
            },
            _$ngScope: undefined,
            /** Use this method for synchronize ng config object with L.Map */
            setNgScope: function(optScope) {
                // only once
                if (!this._$ngScope === undefined) {
                    this._$ngScope = optScope || null;
                    this._enableLayerSynchronization();
                }
            },
            /* enable listener for automatic change of layer in minimap */
            _enableLayerSynchronization: function() {
                // only if custom Controls are been added to this map
                var customControls = this._$ngScope && this._$ngScope.controls && this._$ngScope.controls.custom;
                if (!customControls) {
                    return;
                }
                // listenibng to baselayerchange event
                this.on('baselayerchange', this._baseLayerChanged, this);
            },
            /* */
            _disableMinimapSynchronization: function() {
                this.off('baselayerchange', this._baseLayerChanged);
            },
            /* */
            _baseLayerChanged: function(evt) {
                var customControls = this._$ngScope && this._$ngScope.controls && this._$ngScope.controls.custom;
                // manage layer changing in custom controls that are not overriden o that are mandatory choosen 
                var minimapLayer = selectMapControlOfType(L.Control.MiniMap, customControls);
                if (minimapLayer) {
                    var tileLayer = new L.TileLayer(evt.layer._url);
                    minimapLayer.changeLayer(tileLayer);
                }
                // check baseTile for change home-control envelope
                var gohomeControl = selectMapControlOfType(L.Control.Gohome, customControls);
                if (gohomeControl) {
                    var homeInfo = evt.layer.getHomeInfo && evt.layer.getHomeInfo();
                    if (homeInfo && homeInfo.center) {
                        gohomeControl.changeTargetView(homeInfo.center, homeInfo.zoom);
                    } else {
                        gohomeControl.restoreOriginalView();
                    }
                }
                // Check tile options for over-snap zoom levels.
                // PRUEBA de 'saltado' de niveles de zoom.
                // var mapZooms = evt.layer.options.zooms ||
                //     (evt.layer._localTiles && [1, 2, 3, 4, 5, 6, 7, 8, 9, 12, 15, 18]) ||
                //     undefined;
                // map.options.zooms = mapZooms;
            },
            addControl: function(control) {
                _BASE_.addControl.apply(this, arguments);
                // UX dashboard theme for nodes classed with leaflet-control-layers
                var elemClasses = control && control._container && control._container.classList;
                if (elemClasses && elemClasses.contains('leaflet-control-layers')) {
                    if (!this._mainLayerControl && (control instanceof L.Control.Layers)) {
                        this._mainLayerControl = control;
                    }
                    this._layerControlPosition = control.options.position;
                }
                // move layer-control to end (se intenta solo cuando se añade nuevo control en misma esquina)
                if (this._layerControlPosition === control.options.position) {
                    var lc = $(this._container).find('.leaflet-control-layers.leaflet-control')[0];
                    if (lc && lc !== control._container) {
                        var p = lc.parentNode;
                        p.removeChild(lc);
                        p.appendChild(lc);
                    }
                }
            }
        };

        if (USE_INHERITANCE) {
            _BASE_ = BASE_CLASS.prototype;
            L.UxMap = BASE_CLASS.extend(_uxMap_members);
            L.UxMap._isUx = true;
        } else {
            _BASE_ = {};
            __overrideClass(BASE_CLASS, _uxMap_members, _BASE_);
        }

        // default values
        L.Map._isUx = true; // set flag or fails if L.Map not exist.
        L.Map._isDemoEnabled = !!localStorage.getItem('isUxDemo'); // localStorage.setItem('isUxDemo', '1')

        // Default options in all known widgets. Remove default + - texts. UX uses awesome fonts
        var opt = L.Control.Zoom.prototype.options; /* leaflet:7997 */
        opt.zoomInText = '';
        opt.zoomOutText = '';
        opt.maxZoom = 20;

        // ensure async.
        if (!L.Map.prototype._removeZoomContent) {
            L.Map.prototype._removeZoomContent = true;
        }

    }

    /**
     * En prueba. Refresca capas offline a partir del resultado de 'browse' sobre ficheros locales
     * @param {*} oLayer 
     * @param {*} files 
     */
    function refreshOfflineLayer(oLayer, files) {
        var primero = files[0];
        if (!primero) {
            console.debug('carga de tiles locales cancelada');
            return;
        }
        // En pruebas. solo se considera el primero.
        loadGeoJsonFromFile(primero, function(err, sData) {
            if (err) {
                console.error('Error cartgando fichero', err);
                return;
            }
            var obj;
            try {
                L.TileLayer.prototype.changeTileDataFromJson.call(oLayer, sData);
            } catch (err) {
                throw 'Invalid JSON data';
            }
        });
        console.debug('Cambiando tiles a capa: ' + oLayer.name);
    }

    /**
     * L.Control.UxLayers extends L.Control.Layers
     * L.Control.Layers is an original Leaflet Control to allow users to switch between different layers on the map.
     * The code above customize it for UX.
     * (Futura clase L.Controls.UxLayers)
     */
    if (!L.Control.UxLayers) {

        BASE_CLASS = L.Control.Layers;
        var _uxBase; // or BASE_CLASS.prototype if USE_INHERITANCE is true
        var OFFLINE_PREFIX = 'Offline'; // provisional. 

        /* overrider members of UxLayerControl over L.Controls.Layer */
        var _uxLayerControl_members = {

            initialize: function(baseLayers, overlays, options) {
                _uxBase.initialize.apply(this, arguments); // call to base initialize
                this._localLayer = null; // unique instance of local layer
            },

            _initLayout: function() {
                _uxBase._initLayout.apply(this, arguments); // call to base _initLayout
                // Custom UX.
                this._container.classList.add('navbar');
                this._container.classList.add('navbar-primary');
                // form child
                this._form.classList.add('navbar');
                this._form.classList.add('navbar-primary');
            },

            addBaseLayer: function(layer, name) {
                _uxBase.addBaseLayer.apply(this, arguments);
                if (layer._isUsingLocalTiles) {
                    if (this._localLayer === null) {
                        this._localLayer = layer;
                    } else {
                        console.warn('Another locallayer already exists. ' + this._localLayer.layerName);
                    }
                }
                return this;
            },

            removeLayer: function(layer) {
                _uxBase.removeLayer.apply(this, arguments);
                if (layer._isUsingLocalTiles && this._localLayer === layer) {
                    // TODO - esto la quita del mapa, no del control ?
                    // this._localLayer = null;
                }
                return this;
            },

            _addItem: function(obj) {
                var node = _uxBase._addItem.apply(this, arguments);
                // al añadir un objeto 'label' para el desplegable ...
                if (obj.name.startsWith(OFFLINE_PREFIX)) {
                    // Añade un botón de broswe-file para esta capa
                    var input = document.createElement('input');
                    input.textContent = 'Seleccionar';
                    input.type = 'file';

                    Object.defineProperty(input, 'layerId', { // parche para L.Map._onInputClick
                        get: function() {
                            return obj.layer._leaflet_id;
                        }
                    });

                    // $('.leaflet-control-layers.leaflet-control')[0].classList.add('leaflet-control-layers-expanded');
                    input.style.width = '160px';
                    input.style.position = 'absolute';
                    // input.classList.add('btn');
                    // input.classList.add('btn-default');
                    input.style.left = '0px';
                    input.style.top = '-24px';
                    input.style.display = 'none';
                    $(input).click(function(evt) {
                        evt.stopPropagation();
                    });
                    input.onchange = function(evt) {
                        evt.stopPropagation();
                        refreshOfflineLayer(obj.layer, evt.target.files);
                    };

                    var mainInput = node.children[0];
                    var parent = node.parentNode;
                    $(parent).click(function() {
                        // click any menu.
                        var inputDisplay = (mainInput.checked) ? 'inherit' : 'none';
                        input.style.display = inputDisplay;
                    });

                    // OJO: Debe estar antes que el input[radio]
                    var grParent = parent.parentNode;
                    grParent.insertBefore(input, grParent.firstChild);
                }
            },

            _refreshOfflineLayer: function(oLayer, files) {
                var firstFile = files[0];
                if (!firstFile) {
                    console.debug('carga de tiles locales cancelada');
                    return;
                } else if (files.length > 1) {
                    console.warn('selected ' + (files.length - 1) + ' files after first is ignored');
                }
                // only fisrt file
                loadGeoJsonFromFile(firstFile, function(err, sData) {
                    if (err) {
                        console.error('Error cartgando fichero', err);
                        return;
                    }
                    var obj;
                    try {
                        L.TileLayer.prototype.changeTileDataFromJson.call(oLayer, sData);
                    } catch (err) {
                        throw 'Invalid JSON data';
                    }
                });
                console.debug('Cambiando tiles a capa: ' + oLayer.name);
            }

        };



        if (USE_INHERITANCE) {
            // new control for layers. Default control used by UxMap
            _uxBase = BASE_CLASS.prototype;
            L.Control.UxLayers = BASE_CLASS.extend(_uxLayerControl_members);
        } else {
            // change original BASE_CLASS, overriding some methods
            _uxBase = {}; // container of old methods
            __overrideClass(BASE_CLASS, _uxLayerControl_members, _uxBase);
        }

    }


    /**
     * Devuelve true si el mapa pasado como parámetro se debe configurar con lo mínimo.
     * @param {*} map 
     * @param {*} args passed to L.Map or L.UxMap
     */
    function isSimpleUxMap(map, args) {
        var container = args[0];
        if (typeof container === 'string') {
            return false;
        }
        var mapId = container.id;
        // return (container.classList && container.classList.contains('ux-map-helper')) ||
        //     mapId === 'map-marker' || mapId === 'map-finder';
        return false;
    }

    /**
     * No activar todavía. Ver cómo funciona por dentro leaflet-angular para elegir qué hacer
     * 
     * Intenta añadir las dos capas por defecto a un mapa UX, sin necesidad de pasar por configuración.
     * @param {*} map 
     * @param {*} args .  Debe existir _isSimpleUx como propiedad (y resultado true)
     */
    function initSimpleUxMap(map) {
        var options = map.options || {};

        // para probar tiles OFFLINE localStorage.setItem('localtiles', '1') 
        // TODO - cómo pasarlo en opciones de mapa ?
        var usingLocalTiles = map.options.usingLocalTiles || localStorage.getItem('localtiles');

        // caso especial.
        // cómo se añade _isSimpleUx:true en opciones de angular-leaflet ?
        var tileLayers = {
            osm: {
                name: 'OpenStreetMap',
                url: '//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                type: 'xyz',
                layerParams: {
                    attribution: 'OpenStreet Map',
                    maxZoom: 19
                }
            },
            dark2: {
                name: 'Dark Map',
                url: '//{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
                layerParams: {
                    attribution: 'Cartocdn Dark Map',
                    maxZoom: 19
                },
                type: 'xyz'
            },
            ogWorld: {
                name: 'OpenGate Maps',
                url: 'http://172.19.18.248/osm_tiles/{z}/{x}/{y}.png',
                layerParams: {
                    attribution: 'OpenGate Maps',
                    maxZoom: 19
                },
                type: 'xyz'
            }
        };
        if (usingLocalTiles) {
            // Podría buscarse en la carpeta de descargas un './currentlocaltiles.json'
            //   que es el fichero que se descarga tras el 'robado' de tiles.
            // tileLayers.local = {
            //     name: 'Capa base Offline',
            //     url: 'file://_$local_salonica25_{z}/{x}/{y}.png',
            //     options: { attribution: '' },
            //     visible: false
            // }
        }

        var layerControl = new L.Control.Layers();
        map.addControl(layerControl);
        for (var key in tileLayers) {
            var cfg = tileLayers[key];
            var tileLayer = L.tileLayer(cfg.url, cfg.options);
            layerControl.addBaseLayer(tileLayer, cfg.name);
        }

        // default util controls
        map.addControl(new L.Control.MousePosition({}));
        map.addControl(new L.Control.Fullscreen({}));
        if (usingLocalTiles && L.Control.LocalTileControl) {
            // quitar segunda condición cuando esté implementado
            map.addControl(new L.Control.LocalTileControl({}));
        }
    }

    /** Search a Control (given its type) from a Map passed as argument. */
    function selectMapControlOfType(clazz, mapControls) {
        for (var index = 0; index < mapControls.length; index += 1) {
            var cc = mapControls[index];
            if (cc instanceof clazz) {
                return cc;
            }
        }
    }

    ///
    /// Utilidades
    ///

    L.DomUtil.uxLoadGeoJsonFromFile = loadGeoJsonFromFile;
    /** 
     * Utilidad implementada en mapContoller/geojson_service 
     * It require FileReader (ecma6)
     * */
    function loadGeoJsonFromFile(file, callback) {
        var fileName = file ? file.name : 'null';
        var freader = new FileReader();
        freader.onload = function() {
            try {
                var result = freader.result;
                callback(null, result);
            } catch (msg) {
                callback(new Error('No valid GeoJson file: [' + fileName + ']\n' + msg), null);
            }
        };
        try {
            freader.readAsText(file);
        } catch (err) {
            callback(new Error('Invalid ' + fileName + '\n' + err.message), null);
        }
    }



    /** 
     * This method override an existing class. 
     * WARN: it is not a processing of inheritance. Class will be changed.
     * 
     * angular-leaflet has hardcoded L.Map and L.Control.Layers as constructors. 
     * Uxleaflet needs to use L.UxMap and L.Control.UxLayers instead.
     * Then we use this 'class modification'
     */
    function __overrideClass(clazzToModify, newMembers, overriddenMembers) {
        /*  Parche para modificar la clase (en vez de extender de ella)
            Pendiente extender cuando sea posible personalizar Leaflet desde angular-leaflet */
        console.debug('WARN: MapUx está usando __overrideClass. Class in development: ',
            clazzToModify.constructor); // eliminar comentario si pruebas OK
        var oldMembers = overriddenMembers || {};

        function Message(text) {
            this.getMessage = function() {
                return text;
            };
        }
        for (var key in newMembers) {
            var methodName = key;
            var oldMember = clazzToModify.prototype[methodName];
            if (!oldMember) {
                var oldName = methodName;
                oldMember = new Message(' not exist ' + oldName).getMessage;
            }
            oldMembers[methodName] = oldMember;
            var func = newMembers[methodName];
            clazzToModify.prototype[methodName] = func;
        }
        return oldMembers;
    }

})(window.L);