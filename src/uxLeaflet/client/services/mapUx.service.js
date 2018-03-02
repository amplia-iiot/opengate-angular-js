'use strict';

angular.module('uxleaflet')

.constant('defaultMapOptions', {
    l_gohome: { center: [40.4, -3.7], zoom: 5 },
    l_fullscreen: { position: 'topleft' },
    l_placefinder: { text: 'Place name or coordinates' },
    l_print: { title: 'Print current map view', position: 'topleft' },
    l_minimap: { layer: '$main', toggleDisplay: true }, // { 'osm', 'dark2', '$main', ...}
    l_search: { placeholder: 'Enter device ID', timeAutoclose: 2000 },
    l_boxselection: localStorage.testselection && { position: 'topleft' }, // por defecto deshabilitado 
    l_measure: false, // { position: 'topleft'},
    l_mouseposition: { position: 'bottomleft', numDigits: 4 },
    l_scale: false, //{ position: 'bottomleft', numDigits: 4 },
    l_magnifying: { scale: 3, radius: 180 },
    l_localtiles: false,
    baseLayers: ['osm', 'dark2', 'ogWorld', 'googleTerrain', 'googleHybrid', 'googleRoadmap', 'googleSatellite'],
    baseLayerDefault: 'googleRoadmap',
    overlays: [],
    mapOptions: {
        editPointSize: 10
    }
})

.constant('allNgBaseLayers', { // angular-leaflet format
    osm: {
        name: 'OpenStreetMap',
        url: '//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        type: 'xyz',
        layerParams: {
            attribution: 'OpenStreet Map',
            maxZoom: 19,
            subdomains: ['a', 'b', 'c']
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
        url: '//maps.opengate.es/osm_tiles/{z}/{x}/{y}.png',
        layerParams: {
            attribution: 'OpenGate Maps',
            maxZoom: 19
        },
        type: 'xyz'
    },
    googleTerrain: {
        name: 'Google Terrain',
        layerType: 'TERRAIN',
        type: 'google'
    },
    googleHybrid: {
        name: 'Google Hybrid',
        layerType: 'HYBRID',
        type: 'google'
    },
    googleRoadmap: {
        name: 'Google Streets',
        layerType: 'ROADMAP',
        type: 'google'
    },
    googleSatellite: {
        name: 'Google Satellite',
        layerType: 'SATELLITE',
        type: 'google'
    }
    // google: {
    //     name: 'Google Maps',
    //     url: '//{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
    //     layerParams: {
    //         attribution: 'OpenGate Maps',
    //         maxZoom: 19,
    //         subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    //     },
    //     type: 'xyz'
    // }
    ///////////////// REVISAR NO FUNCIONA
    //     ///////////////////
    //     opengate-angular-js-3.0.1.js:7119 Invalid leaflet. No locallayer defined
    // recalculateTileset @ opengate-angular-js-3.0.1.js:7119
    // resetTiles @ opengate-angular-js-3.0.1.js:7043
    // (anonymous) @ opengate-angular-js-3.0.1.js:6960
    // s @ leaflet.js:8
    // opengate-angular-js-3.0.1.js:7047 Uncaught TypeError: Cannot read property '_tileInfos' of undefined
    //     at resetTiles (opengate-angular-js-3.0.1.js:7047)
    //     at e.<anonymous> (opengate-angular-js-3.0.1.js:6960)
    //     at HTMLAnchorElement.s [as _leaflet_click126] (leaflet.js:8)
    // local: {
    //     name: '',
    //     url: 'file://_$local_$NAME_{z}/{x}/{y}.png',
    //     type: 'xyz',
    //     layerParams: {
    //         attribution: '',
    //         maxZoom: 20
    //     }
    // }
})

/**
 * This method updates configuration to improve maps experience in offline config
 */
.run(function($http, allNgBaseLayers, defaultMapOptions) {
    $http.get('//a.tile.openstreetmap.org/0/0/0.png').error(function(data) {
        delete allNgBaseLayers.osm;
        defaultMapOptions.baseLayers.splice(defaultMapOptions.baseLayers.indexOf('osm'), 1);
    });

    // $http.get('//maps.google.com/maps').error(function(data) {
    //     delete allNgBaseLayers.googleTerrain;
    //     delete allNgBaseLayers.googleHybrid;
    //     delete allNgBaseLayers.googleRoadmap;
    //     defaultMapOptions.baseLayers.splice(defaultMapOptions.baseLayers.indexOf('googleTerrain'), 1);
    //     defaultMapOptions.baseLayers.splice(defaultMapOptions.baseLayers.indexOf('googleHybrid'), 1);
    //     defaultMapOptions.baseLayers.splice(defaultMapOptions.baseLayers.indexOf('googleRoadmap'), 1);
    // });
    // http://mt0.google.com/vt/lyrs=m&x=0&y=0&z=0

    $http.get('//a.basemaps.cartocdn.com/dark_all/0/0/0.png').error(function(data) {
        delete allNgBaseLayers.dark2;
        defaultMapOptions.baseLayers.splice(defaultMapOptions.baseLayers.indexOf('dark2'), 1);
    });

    $http.get('//maps.opengate.es/osm_tiles/0/0/0.png').error(function(data) {
        delete allNgBaseLayers.ogWorld;
        defaultMapOptions.baseLayers.splice(defaultMapOptions.baseLayers.indexOf('ogWorld'), 1);
    });
})

/**   
 * MapUxService implements:
 * - custom controls configuration for UX users
 * - baselayer configuration
 * It use leafletData
 */
.service('mapUxService', function($timeout, leafletData, mapExtraApiService, geomUxService, defaultMapOptions, allNgBaseLayers) {
    var _this = this;
    var _mapUxService = this;

    this.createMapManager = function(scope) {
        if (!scope || !scope.$id) {
            throw 'Invalid angular scope';
        }
        return new MapManager(scope);
    };

    /**
     * Returns the Id that will be used by a instance of Controller given it scope.
     * @param {scope} $scope param of an angular controller.
     * @param {optIndex : string} only if needed if you want to manage more than one lefaletmap by controller
     */
    _this.getMapId = function(scope, optIndex) {
        var sufix = (optIndex === undefined) ? '' : '-' + optIndex;
        return 'map-' + scope.$id + sufix;
    };

    /**
     * Execute a Promise async.
     * It is required in function that makes a call to $apply method
     * @param {scope} $scope param of an angular controller.
     * @param {function(map)} mapCallback function
     */
    _this.getMap = function(scope, mapCallback, optIndex) {
        var mapId = this.getMapId(scope, optIndex);
        _this.getMapWithId(mapId, mapCallback, scope);
    };

    /**
     * Execute a Promise async.
     * It is required in function that makes a call to $apply method
     * Warn: Returned map has been initiated as UX once.
     * @param {mapId} DOM ID for the map element container.
     * @param {function(map)} mapCallback function
     * @param {scope} $scope param of an angular controller.
     */
    _this.getMapWithId = function(mapId, mapCallback, optScope) {
        // this promise is either sync or async. Problems with angular $apply method.
        leafletData.getMap(mapId).then(function(map) {
            if (map.setNgScope)
                map.setNgScope(optScope);
            $timeout(function() { mapCallback(map); });
        });
    };

    /**
     * Suscribe map event: scope.$on('leafletDirectiveMap.ID.dblclick', function(e) {   })
     * @param {scope} component scope
     * @param {eventName string} valid leaflet map eventname (click, dblclick, mousedown, etc.)
     */
    _this.mapOn = function(scope, eventName, fn) {
        var id = _this.getMapId(scope);
        scope.$on('leafletDirectiveMap.{{ vm.id }}.' + eventName, function(e) {
            if (e.currentScope.vm.id === id) {
                try { fn(e); } catch (err) {}
            }
        });
    };

    /**
     * Return default Options for Ux Map.
     * @param {json} optional. Map options for override returned default options.
     */
    _this.getDefaultOptions = function(overOptions) {
        return angular.extend({}, defaultMapOptions, overOptions || {});
    };

    /** 
     * Return all knwonn configuration for base layers.
     * Configuration base layers is for angular-leaflet-directives
     * @param {options JSON} or null for default
     * @param {searchCallBacks  JSON}  placefinderCb, searchCb
     */
    _this.createNgOptions = function(options, searchCallBacks) {

        options = options || defaultMapOptions;
        searchCallBacks = searchCallBacks || {};

        var uxLocation = options.l_gohome ? options.l_gohome : null;

        /** angular-leaflet-directive options */
        var ngOptions = {
            center: uxLocation ? { lat: uxLocation.center[0], lng: uxLocation.center[1], zoom: uxLocation.zoom } : { lat: 40, lng: -3.7, zoom: 5 },
            layers: {
                baselayers: this.getBaseLayerConfigs(options),
                overlays: options.overlays || {}
            },
            controls: this.createControlConfigs(options, searchCallBacks),
            default: options.mapOptions
        };
        // value for applying to $scope 
        return ngOptions;
    };

    /** 
     * Return all knwonn configuration for base layers.
     * That 'Configuration base layers' are for angular-leaflet-directives
     */
    _this.getAllBaseLayerConfigs = function() {
        return allNgBaseLayers;
    };

    /**
     * Create a JSON configuraton of basemaps for angular-leaflet-directive.
     * It may be assingned to 'options.layers.baselayers'
     * @param {uxOptions JSON} ver .constant('defaultMapOptions'
     * return a JSON with configuration of basemaps for angular-leaflet-directive.
     */
    _this.getBaseLayerConfigs = function(uxOptions) {
        var mapBaseLayerConfig = uxOptions.baseLayers;
        var baseDefault = uxOptions.baseLayerDefault || '';
        var allConfigs = this.getAllBaseLayerConfigs();
        var retConfigs = {};
        var failed = [];
        for (var i = 0; i < mapBaseLayerConfig.length; i++) {
            var config = mapBaseLayerConfig[i];
            var key = (config instanceof Object) ? (config.id || 'layer_' + i) : config;
            try {
                retConfigs[key] = createNgLayerConfig(config, allConfigs, baseDefault);
            } catch (err) {
                failed.push(config);
            }
        }
        // 
        if (failed.length > 0) {
            var sText = 'Not found basemaps: [' + failed.join(', ') +
                ']. available names: [' + this.getAllBaseLayerConfigNames().join(', ') + ']';
            console.error(sText, '');
        }
        return retConfigs;
    };

    _this.getAllBaseLayerConfigNames = function() {
        var allConfigs = _this.getAllBaseLayerConfigs();
        var retNames = [];
        for (var key in allConfigs) {
            retNames.push(key);
        }
        return retNames;
    };

    /**
     * return a json configuration for 'controls' of angular-leaflet-directive.
     * @param {json uxOptions}
     * @param {searchCallBacks json} function callbacks for search control and gPlace control: placefinderCb, searchCb
     */
    _this.createControlConfigs = function(uxOptions, searchCallBacks) {
        var ngOptions = {};

        // angular-plugin: scale 
        if (uxOptions.l_scale) {
            ngOptions.scale = uxOptions.l_scale;
        }

        // custom plugins: array of instances
        ngOptions.custom = _this.createCustomWidgets(uxOptions, searchCallBacks);
        // assignable to ng_options.controls  

        angular.forEach(uxOptions.apikeys, function(value, key) {
            mapExtraApiService.setApikey(key, value);
        });

        return ngOptions;

    };

    _this._createMapControls = function(options, searchCalls) {
        var result = this.createCustomWidgets(options, searchCalls);
        // TODO - Crear el resto de controles. minimap, scale, etc
        return result;
    };

    /**
     * Return an array of instances of plugings configured as options parameters.
     * @param options
     * @param searchCalls: placefinderCb, searchCb
     * @returns Array of leafletplugins 
     */
    _this.createCustomWidgets = function(options, searchCalls) {
        /* known plugins, constructor and default options for ux-map plugins  */

        /* jshint ignore:start */
        var knownPlugins = {
            'l_fullscreen': {
                _controlName: 'fullscreenControl',
                _desc: 'Control for set current view mode in fullscreen',
                constructor: 'L.Control.Fullscreen',
                defaultOpts: {
                    position: 'topleft'
                }
            },
            'l_minimap': {
                _controlName: 'minimapControl',
                _desc: 'Control for showing a minimap guide in a corner of main map',
                constructor: null, // it will be used this.createControlInstance instead 'L.Control.MiniMap',
                defaultOpts: {
                    layer: {
                        url: '//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                        options: {} // { minZoom: 5, maxZoom: 18, attribution: 'Map data &copy; OpenStreetMap contributors' }
                    },
                    position: 'bottomright',
                    toggleDisplay: true,
                    autoToggleDisplay: true,
                    minimized: true,
                    width: 100,
                    height: 100,
                    strings: { hideText: 'Hide Mini Map', showText: 'Show Mini Map' },
                },
                createControlInstance: function(opts) {
                    // minimap has a special constructor: (url, options)
                    // TODO - add constructor to L.Minimap handling args
                    var tileOpt = opts.layer;
                    var tileLayer;
                    if (typeof(tileOpt) === 'string') {
                        tileLayer = tileLayerFromName(tileOpt);
                    } else {
                        // options: next, layerParams old-angular
                        tileLayer = new L.TileLayer(tileOpt.url, tileOpt.options);
                    }
                    return new L.Control.MiniMap(tileLayer, opts);
                }
            },
            'l_mouseposition': {
                _controlName: 'geolocationControl',
                _desc: 'Control for showing current mouse location in lat/lon',
                constructor: L.Control.MousePosition,
                defaultOpts: {
                    position: 'bottomleft'
                }
            },
            'l_placefinder-google': {
                _controlName: 'googleplacefinderControl',
                _desc: 'Control for Search GeoLocation using external WebService (bower:leaflet-google-places-autocomplete)',
                constructor: L.Control.GPlaceAutocomplete2,
                defaultOpts: {
                    searchCall: (searchCalls && searchCalls.placefinderCb) || function() {},
                    placeholder: 'Enter place name', // buscar alternativa ??
                    text: 'Enter place name', // buscar alternativa ??
                    position: 'topleft'
                },
                dependencies: ['google'] /* no usado todavía */
            },
            'l_placefinder-esri': {
                _controlName: 'esriplacefinderControl',
                _desc: 'Control for Search ... ESRI',
                constructor: L.Control.PlaceFinderEsri,
                defaultOpts: {
                    providerName: ['arcgisOnlineProvider', 'mapServiceProvider'],
                    layers: [2, 3],
                    searchFields: ['NAME', 'STATE_NAME']
                }
            },
            'l_placefinder-osm': {
                _controlName: 'osmplacefinderControl',
                _desc: 'Control for Search using OSM/Nominatim',
                constructor: L.Control.OsmPlaceFinder,
                defaultOpts: {
                    placeholder: 'Enter place name', // buscar alternativa ??
                    text: 'Enter place name', // buscar alternativa ??
                    position: 'topleft',
                    forcePosition: 'cómo lo hace googleplacefinderControl???'
                }

            },
            'l_placefinder': 'pending to assign',
            'l_search': {
                _controlName: 'searchControl',
                _desc: 'Control for Search internal features in map',
                constructor: L.Control.Search,
                defaultOpts: {
                    searchCall: searchCalls.searchCb || function() { console.warn('NOT entitiesCacheCallback setter in l_search'); },
                    position: 'topright',
                    placeholder: 'search',
                    timeAutoclose: 2400,
                    textErr: 'Device not found'
                }
            },
            'l_measure': {
                _desc: 'Control for distance measure in map',
                constructor: 'L.Control.Measure',
                defaultOpts: {
                    primaryLengthUnit: 'kilometers',
                    secondaryLengthUnit: 'meters',
                    primaryAreaUnit: 'hectares',
                    secondaryAreaUnit: 'sqmeters',
                    position: 'bottomleft'
                },
                _bower: '\'leaflet-measure \': \'^ 2.1.5\''
            },
            'l_boxselection': {
                _controlName: 'boxselectionControl',
                _desc: 'Control for select features using mouse bounding box',
                constructor: L.Control.FeatureSelection,
                defaultOpts: {
                    position: 'topleft'
                }
            },
            'l_gohome': {
                _controlName: 'gohomeControl',
                _desc: 'Control for Pan/zoom to original position',
                constructor: L.Control.Gohome,
                defaultOpts: {
                    center: [0, 0],
                    zoom: 4,
                    position: 'topleft'
                },
                _bower: false
            },
            'l_print': {
                _controlName: 'printoutControl',
                _desc: 'Control for print out current map view',
                constructor: L.Control.EasyPrint,
                defaultOpts: {
                    title: 'Print map',
                    position: 'topleft',
                    elementsToHide: 'p, h2'
                },
                _bower: false
            },
            'l_magnifying': {
                _controlName: 'magnifyingControl',
                _desc: 'Control for magnify cursor area on map view',
                constructor: L.Control.MagnifyingGlass,
                defaultOpts: {
                    title: 'Magnifying glass',
                    position: 'topleft'
                },
                _bower: false
            },
            'l_localtiles': {
                _controlName: 'localtilesControl',
                _desc: 'Control for reset/load base tiles for offline navigation',
                constructor: L.Control.LocalTileControl,
                defaultOpts: {
                    //title: 'Magnifying glass',
                    position: 'topright'
                },
                _bower: false
            }
        };
        // set default placeFinder:
        knownPlugins['l_placefinder'] = knownPlugins['l_placefinder-osm'];

        var customPlugins = [];
        for (var key in knownPlugins) {
            var plugin = knownPlugins[key];
            var opt = options[key];
            if (plugin && opt) {
                // opt is not undefined, false or 0
                var descName = key + ' ' + plugin._desc;
                try {
                    var fullOpts = $.extend(plugin.defaultOpts, opt);
                    var instance;
                    if (plugin.constructor) {
                        instance = createControlInstance(plugin.constructor, fullOpts);
                    } else {
                        // caso especial con parámetros extra al principio
                        instance = plugin.createControlInstance(fullOpts);
                    }
                    if (!instance._controlName) {
                        instance._controlName = plugin._controlName;
                    }
                    customPlugins.push(instance);
                    console.debug('Created plugin: ' + key + ' ' + descName);
                } catch (err) {
                    console.error('INTERNAL ERROR loading leaflet plugin: ' + descName, err);
                }
            }
        }

        // return array ov leaflet controls (checked addTo method)
        return customPlugins;
        /* jshint ignore:end */
    };

    _this.createOverlaysConfig = function(options) {

        console.debug('createOverlaysConfig no implementado. Solo funciona  options=\'demo\'');
        // sin implementar
        if (options === 'demo') {
            return {
                wms: {
                    name: 'EEUU States (WMS)',
                    type: 'wms',
                    visible: true,
                    url: 'http://suite.opengeo.org/geoserver/usa/wms',
                    layerParams: {
                        layers: 'usa:states',
                        format: 'image/png',
                        transparent: true
                    }
                }
            };
        }

    };

    _this.tryChangeGohomeOptions = tryChangeGohomeOptions; // ngOption , bounds


    //
    // internal functions
    //

    /**
     * Create a NgLayer configuration from a known name (oxm, mbsatellite, etc)
     * @param {*} config string as known map name or config as JSON
     * @param {*} allConfigs 
     * @param {*} baseDefault is the name of the default base layer-
     */
    function createNgLayerConfig(config, allConfigs, baseDefault) {
        var oLayer;
        if (config.split) {
            var mapName = config;
            var parts = mapName.split(':');
            if (parts[0] === 'local') {
                var fileName = parts[1];
                var labelName = parts[2] || 'Local ' + fileName;
                // ng layer configuration
                oLayer = {
                    name: labelName,
                    url: 'file://_$local_' + fileName + '_{z}/{x}/{y}.png',
                    type: 'xyz',
                    layerParams: {
                        attribution: '',
                        maxZoom: 19
                    }
                };
            } else if (allConfigs[mapName]) {
                oLayer = angular.extend({}, allConfigs[mapName]);
            } else {
                throw 'Not found baseLayer name ' + mapName;
            }
        } else {
            // It supposed json configuration. Solo para pruebas internas
            oLayer = angular.extend({}, config);
        }
        // extra config
        if (config === baseDefault) {
            oLayer.visible = true;
        }
        return oLayer;
    }

    /**
     * Create a instance of a L.Control subclass.
     * @param {*} pathOrFunction 
     * @param {*} args only an object will be passed
     */
    function createControlInstance(fullPathOrFunction, args) {
        var Clazz = fullPathOrFunction; // function
        if (typeof fullPathOrFunction === 'string') {
            var path = fullPathOrFunction;
            // try get function from window path
            var parts = path.split('.');
            Clazz = window;
            var known = 'window';
            for (var i = 0; i < parts.length; i++) {
                var key = parts[i];
                if (Clazz[key] === undefined) {
                    throw 'Not found ' + key + ' in ' + known;
                }
                known = known + '.' + key;
                Clazz = Clazz[key];
            }
        }
        try {
            // try construct and only check if implements addTo method
            var instance = new Clazz(args);
            if (instance instanceof L.Control) {
                return instance;
            }
            console.warn(fullPathOrFunction + ' instance do not appears as L.Control');
        } catch (err) {
            var sArgs = JSON.stringify(args);
            throw new Error('Error instantiating ' + fullPathOrFunction + ' with ' + sArgs, err);
        }
    }

    /** Return a L.TileLayer from a known name  (osm, gmaps, etc) */
    function tileLayerFromName(name) {
        var all = _mapUxService.getAllBaseLayerConfigs();
        var opt = all[name] || all.osm || all.dark2 || all.ogWorld || all.googleTerrain || all.googleHybrid || all.googleRoadmap || all.googleSatellite;
        if (opt.type === 'xyz') {
            var tilelayer = new L.TileLayer(opt.url, opt.options || opt.layerParams);
            return tilelayer;
        }
        throw 'not implemented tilelayer creation from ' + JSON.stringify(opt);
    }

    //
    // CLASSES
    //

    /**
     * MapManager gestiona un mapa Leallet con los controles y estilos necesarios para ser usado con UX.
     * @param {*} scope of controller
     * 
     * (se requiere en adf-widget-hmi)
     */
    function MapManager(scope) {

        var _this = this;
        this.controls = [];
        // this._controlName = instance

        // pendiente implementar manejo de los controles y capas para poder tener acceso a ellos.
        this.initControls = function(uxOptions, searchCallBacks) {
            var baseLayers = _mapUxService.getBaseLayerConfigs(uxOptions);
            var controls = _mapUxService._createMapControls(uxOptions, searchCallBacks);
            _mapUxService.getMap(scope, function(map) {
                initControls(map, controls);

                // TODO - addbaselayers

                //$(map._container).find('elem...')...
            });
        };

        this.toggleFullscreen = function() {
            _mapUxService.getMap(scope, function(map) {
                map.toggleFullscreen({});
            });
        };

        function initControls(map, controls) {
            for (var key in controls) {
                var control = controls[key];
                if (control.addTo) {
                    try {
                        control.addTo(map);
                        _this.controls.push(control);
                        var propName = control._controlName;
                        if (propName && !_this[propName]) {
                            // ref to control as named property
                            _this[propName] = control;
                        }
                    } catch (err) {
                        console.error('INTERNAL ERROR adding control to map ', err);
                    }
                }
            }
            // TODO - agregar clases css para temas. Ejemplo
            angular.element(map._container).find('.leaflet-control-layers').addClass('navbar navbar-primary');
        }

    } // MapManager class

    _this.loadGeoJsonFromFile = function(file, callback) {
        var fileName = file ? file.name : 'null';
        var freader = new FileReader();
        freader.onload = function() {
            try {
                var result = freader.result;

                callback(_this.validateGeoJsonContent(result));
            } catch (msg) {
                callback(null, new Error('No valid GeoJson file: [' + fileName + ']\n' + msg), null);
            }
        };

        try {
            freader.readAsText(file);
        } catch (err) {
            callback(new Error('Invalid ' + fileName + '\n' + err.message), null);
        }
    };

    /**
     * validateGeoJsonContent
     * @param {data JSON} As valid GeoJson
     *  
     */
    _this.validateGeoJsonContent = function(data) {
        var obj;
        try {
            obj = JSON.parse(data);
        } catch (err) {
            throw 'Invalid JSON data';
        }
        if (typeof obj !== 'object') {
            throw 'Invalid GeoJSON. Expected JSON format';
        }
        if (obj.type !== 'FeatureCollection') {
            throw 'Invalid GeoJSON. Expected {type:\'FeatureCollection\'...';
        }
        var features = obj.features;
        if (!angular.isArray(features)) {
            throw 'Invalid GeoJSON. Expected {features:[...]...';
        }
        return obj;
    };

    // v ---- ya existe en servicio geomUxService
    _this.circleToPolygon = geomUxService.circleToPolygon;
    _this.createVectorLayer = geomUxService.createVectorLayer;
    // ^ ---- movido a servicio geomUxService

    /**
     * 
     * @param {*} map 
     */
    function tryChangeGohomeOptions(ngOptions, geoBounds) {
        try {
            var i = 0;
            for (var key in ngOptions.controls.custom) {
                var cc = ngOptions.controls.custom[key];
                if (cc._isGohomeInstance) {
                    cc.changeTargetViewToBounds(geoBounds);
                }
            }
        } catch (err) {
            console.error('Error zooming to bounds ' + geoBounds, err);
        }
    }
    // Pendiente de añadir cuando se deje de usar directiva leaflet.controls

});