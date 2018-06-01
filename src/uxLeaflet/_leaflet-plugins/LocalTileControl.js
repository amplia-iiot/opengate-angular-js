'use strict';

/**
 * LocalTileLayerSet representa un conjunto de tiles para uso en navagación offline.
 * Los tiles estarán guardados en memoria local
 * - Podrán ser descargados en un único fichero en formato JSON.
 * - Podrán ser descargados uno a uno desde el servidor para formar en memoria un objeto javascript
 *    que será guardado en formato JSON en localstorage.
 * 
 * Depende de UxMap.js
 */
(function() {

    if (!L.Map) return;

    // Static values
    var MIN_DOWNLOAD_ZOOM = 12;
    var DEFAULT_LS_KEY = 'currentlocaltiles'; // key for localStorage

    // Classes

    /**
     * 
     * @param {*} key 
     * @param {*} url 
     */
    function TileInfo(key, url) {
        this.key = key;
        this.url = url;
        this.data = null;

        /**
         * 
         */
        this.load = function(sucessCallback, errorCallback) {
            var _this = this;

            var parts = this.url.split('.');
            var ext = parts.length === 1 ? 'png' : parts[parts.length - 1];

            var xhr = new XMLHttpRequest();
            xhr.responseType = 'arraybuffer';
            xhr.open('GET', url);
            xhr.onload = function() {
                if (xhr.status >= 200 && xhr.status < 300) {
                    convertArrayToUrlData(xhr.response, ext, function(urlData) {
                        _this.data = urlData;
                        sucessCallback(_this);
                    });
                } else {
                    errorCallback('not found ' + url, xhr.statusText);
                }
            };
            xhr.onerror = function() {
                // internal error
                errorCallback(xhr.statusText);
            };
            xhr.send(null);
        };

        /**
         * Store the arrayBuffer data in dataUrl format (using base64 encoding)
         */
        function convertArrayToUrlData(arrayBuffer, imageType, sucessCallback) {

            var prefixImage = 'data:image/' + imageType + ';base64,';
            var blob = new Blob([arrayBuffer], { type: 'application/octet-binary' });
            var reader = new FileReader();

            reader.onload = function(evt) {
                var b64Data = evt.target.result.split(',');
                if (b64Data[0].startsWith('data')) {
                    var dataUrl = prefixImage + b64Data[1];
                    sucessCallback(dataUrl);
                } else {
                    console.error('interval error: invalid data as base64');
                }
            };
            reader.readAsDataURL(blob);
        }

    }

    /**
     * LocalTileSet keep image data for a range or tiles bounding by a center and current-zoom parameters 
     * and a zoom range from 5 to MAX_LEVEL.
     * Current-zoom must be greater or equal than MIN_DOWNLOAD_ZOOM
     */
    L.LocalTileSet = L.Class.extend({

        options: {

        },

        _refTileLayer: null,

        _localTileLayer: null,

        _zoom: null,
        _center: null,
        _tileInfos: [],

        /**
         * Convert to json:
         * { 'mapview': ((center and zoom), '11/1/1': 'data:bas64...', '11/1/2': 'data:bas64...', )}
         */
        tileSetToJson: function() {
            var lat = this._center.lat || this._center[1] || 0.00;
            var lng = this._center.lng || this._center[0] | 0.00;
            var obj = {};
            obj.mapview = { 'zoom': this._zoom, 'center': { 'lat': lat, 'lng': lng } };
            for (var i = 0; i < this._tileInfos.length; i += 1) {
                var tileInfo = this._tileInfos[i];
                obj[tileInfo.key] = tileInfo.data;
            }
            return JSON.stringify(obj, null, 2); // pretty print tab:2
        },

        initialize: function(localTileLayer, refTileLayer) {
            this._localTileLayer = localTileLayer;
            if (refTileLayer instanceof L.TileLayer) {
                this._refTileLayer = refTileLayer;
            } else {
                throw 'argument exception: it is needed a TileLayer';
            }
        },

        /**
         * updateTileRange from a map (its current tileLayer), selecting all tiles
         * included in the current view from a min zoom to a max zoom,
         * and set home center and zoom.
         */
        updateTileRange: function(minLevel, maxLevel, map) {

            // set home location
            this._center = map.getCenter();
            this._zoom = map.getZoom();

            // reset tileInfos
            this._tileInfos = [];
            var latlngBounds = map.getBounds(); // in latlng

            for (var z = minLevel; z <= maxLevel; z += 1) {
                var pixelBounds = this.getPixelBounds(map, z, latlngBounds);
                var tileSize = this._refTileLayer._getTileSize();

                var tileBounds = L.bounds(
                    pixelBounds.min.divideBy(tileSize)._floor(),
                    pixelBounds.max.divideBy(tileSize)._floor());

                var zoomTileInfos = this._getTileInfosFrom(tileBounds, z);
                this._tileInfos = this._tileInfos.concat(zoomTileInfos);
            }

        },

        /**
         * Copiado de leaflet 0.7.7. 
         * FIXME - Pendiente de optimizar. Sobra el uso de :container y fragment.
         */
        _getTileInfosFrom: function(bounds, zoom) {
            var queue = [];
            var center = bounds.getCenter();

            var j, i, point;
            for (j = bounds.min.y; j <= bounds.max.y; j++) {
                for (i = bounds.min.x; i <= bounds.max.x; i++) {
                    point = new L.Point(i, j);
                    queue.push(point);
                }
            }

            var tilesToLoad = queue.length;

            // if its the first batch of tiles to load
            console.info('Existing tiles from zoom: ' + zoom + ', count: ' + tilesToLoad);

            if (tilesToLoad === 0) { return []; }

            // load tiles in order of their distance to center
            queue.sort(function(a, b) {
                return a.distanceTo(center) - b.distanceTo(center);
            });

            var tileInfos = [];
            for (i = 0; i < tilesToLoad; i++) {
                var tilePoint = queue[i];
                tilePoint.z = zoom;
                var key = tilePoint.z + '/' + tilePoint.x + '/' + tilePoint.y;
                var tileUrl = this._refTileLayer.getTileUrl(tilePoint);
                this._tileInfos.push(new TileInfo(key, tileUrl));
                console.info('* Tile desde: ' + tileUrl);
            }
            return tileInfos;
        },

        startLoading: function(options, successCallback, progressCallback) {
            var tileInfos = this._tileInfos;
            var total = tileInfos.length;
            var remain = total;

            function oneLess() {
                remain -= 1;
                if (remain <= 0) {
                    successCallback();
                }
            }

            var okis = 0;
            var fails = 0;

            function Promisse2() {
                this.success = function() {
                    progressCallback(okis + 1, fails, total);
                    okis += 1;
                    oneLess();
                };
                this.reject = function() {
                    oneLess();
                };
            }
            var promisse2 = new Promisse2();
            for (var i = 0; i < total; i += 1) {
                var tileInfo = tileInfos[i];
                tileInfo.load(promisse2.success, promisse2.reject);
            }
            console.info('Downloading started for bb centered in ' + this.center);
        },

        getPixelBounds: function(map, zoom, latlngBounds) {
            var sw0 = map.options.crs.latLngToPoint(latlngBounds.getSouthWest(), zoom);

            var bottomLeft = this.project(map, zoom, latlngBounds.getSouthWest());
            var topRight = this.project(map, zoom, latlngBounds.getNorthEast());
            return new L.Bounds(bottomLeft, topRight);
        },

        project: function(map, zoom, latlng) { // (LatLng[, Number]) -> Point
            return map.options.crs.latLngToPoint(L.latLng(latlng), zoom);
        },

        getTileCount: function() {
            var child = this._tileInfos.length;
        },

        _0: ''
    });

    /**
     * L.Control.LocalTileControl is a control that manage CotnrolLayers adding a special TileLayer whose source
     * data is obtained from JSON (accessed by url) or localstorage content (accessed by fixed key name).
     */
    L.Control.LocalTileControl = L.Control.extend({
        options: {
            title: 'Reset Local base tile layer',
            position: 'topright'
        },

        onAdd: function() {
            var container = L.DomUtil.create('div', 'leaflet-control-localtiles leaflet-bar leaflet-control');
            container.style.position = 'relative';
            var _thisControl = this;

            this.progressLabel = L.DomUtil.create('div', 'leaflet-control-localtiles-progress leaflet-bar-part', container);
            /**  leaflet-control-localtiles-progress */
            this.progressLabel.style.position = 'absolute';
            this.progressLabel.style.display = 'none';
            this.progressLabel.style.right = '36px';
            this.progressLabel.style.left = 'auto';
            this.progressLabel.style.width = '70px';
            this.progressLabel.style.textAlign = 'center';
            this.progressLabel.style.float = 'left';
            this.progressLabel.style.backgroundColor = '#e0e0e0';
            this.progressLabel.style.color = '#ff7040';

            this.link = L.DomUtil.create('a', 'leaflet-control-localtiles-button leaflet-bar-part', container);
            this.link.title = this.options.title;

            L.DomEvent.addListener(this.link, 'click', function() { resetTiles(_thisControl); }, this);
            L.DomEvent.disableClickPropagation(container);

            return container;
        },

        disable: function() {
            this.link.classList.add('leaflet-disabled');
            this.progressLabel.style.display = 'block';
            this.progressLabel.innerHTML = 'downloading...';
        },

        enable: function() {
            this.link.classList.remove('leaflet-disabled');
            this.progressLabel.style.display = 'none';
        },

        setProgressText: function(text) {
            this.progressLabel.innerHTML = text;
        },

        resetTiles: function() {
            resetTiles.apply(this, arguments);
        },

        _refresDefaultLocalLayer: function(sJson) {
            var mainLayerControl = this._map._mainLayerControl;
            if (!mainLayerControl) {
                console.error('this map is not a UX map. Not found mainLayerControl');
                return;
            }
            var localLayer = this._map._mainLayerControl._localLayer;
            if (localLayer) {
                localLayer.changeTileDataFromJson(sJson);
                this._map.setZoom(this._map.getZoom()); // this._map._update();
            }
        }

    });

    L.LocalTileSet.MIN_DOWNLOAD_ZOOM = MIN_DOWNLOAD_ZOOM;
    L.Control.LocalTileControl.recalculateTileset = recalculateTileset;

    // nueva opción para L.Map
    L.Map.mergeOptions({
        localtiles: false, // trye || 'my-name' || urlName:'my-name' // access name in localstorage
    });

    L.Map.addInitHook(function() {
        if (this.options.localtiles) {
            var DEFAULT_NAME = 'localtiles';
            // probar --- obtención de name
            var name = (typeof this.options.localtiles === 'string') ? this.options.localtiles : (this.options.localtiles.urlName || DEFAULT_NAME);
            this.positionControl = new L.Control.LocalTileControl({ keyname: name });
            this.addControl(this.positionControl);
        }
    });

    //
    // internal functions
    // 

    /**
     * It is called from clic event in a L.LocalTileControl.
     * this ask confirmation to user to continue reseting tiles and home location
     * @param {*} lControl 
     */
    function resetTiles(lControl) {
        var map = lControl && lControl._map;
        if (!map) {
            console.error('Error interno. Falta referencia a mapa en Control LocalTileControl');
            return;
        }
        var currentResolution = map.getZoom();
        if (currentResolution < MIN_DOWNLOAD_ZOOM) {
            alert('Zoom demasiado lejano: ' + currentResolution + '\nAl menos debe ser ' + MIN_DOWNLOAD_ZOOM);
            return;
        }

        var minResolution = 6;
        var maxResolution = 17;
        // calcular tiles necesarios para el 'envelope' actual hasta un nivel de 18

        var tileset = recalculateTileset(minResolution, maxResolution, map);

        // msotrar un cuadro de diálogo para indicar lo que se va a hacer.
        var result = window.confirm('WARN: Current stored tiles will be deleted. \n' +
            'Then, it will be loaded ' + tileset._tileInfos.length + ' tiles replacing old tiles for offset navigation',
            'Offline tile replacement');
        if (result === false) {
            // no continue
            return;
        }
        var jsonName = prompt('Enter \'new\' word of a name for searching in public/sampledata/files-NAME.json \n (salonica25, smara, smara-topo)', 'new');
        if (!jsonName) {
            return;
        }

        if (jsonName === 'new') {
            // desactivar botón llamador
            lControl.disable();
            // carga de nuevos tiles
            var tileInfos = tileset._tileInfos;
            var LS_KEY = L.TileLayer.DEFAULT_LS_KEY;
            // inicio descarga de tiles en segundo plano.
            tileset.startLoading({},
                function() { // success/end
                    lControl.setProgressText('OK: ' + tileset._tileInfos.length + ' tiles');
                    var s = tileset.tileSetToJson();
                    console.info('Json tileSet have a size in bytes of ' + s.length);
                    var oldValue = localStorage.getItem(LS_KEY);
                    try {
                        // try store with a key in localStorage
                        localStorage.removeItem(LS_KEY);
                        localStorage.setItem(LS_KEY, s);
                        alert('local tiles downloaded: ' + tileInfos.length);
                        lControl._refresDefaultLocalLayer(s);
                        console.info('local base layer refreshed');
                    } catch (err) {
                        if (oldValue) localStorage.setItem(LS_KEY, oldValue);
                        alert('Error saving tileSet in localstorage\n\n' + err.message);
                        try {
                            var blob = new Blob([s], { type: 'text/JSON' });
                            // try store in a local folder (default is system 'download' folder)
                            L.Util.saveAs(blob, LS_KEY + '.json');
                            alert('WARN. json has been downloaded in local folder');
                        } catch (err2) {
                            alert('Error saving tileSet in local folder\n\n' + err2.message);
                        }
                    }
                    lControl.enable(); //.link.classList.remove('leaflet-disabled');
                },
                function(loaded, fails, total) {
                    var left = total - loaded;
                    lControl.setProgressText('Left ' + left);
                });

        } else {
            var jsonPathFileName = './sampledata/tiles-' + jsonName + '.json';
            console.info('Probando cargar tiles desde ' + jsonPathFileName);
            var oLayer = map._mainLayerControl._localLayer;
            if (oLayer) {
                oLayer.changeTileDataFromUrl(jsonPathFileName);
            }
        }

        console.error('AVISO. Sin implementar reseteado de tiles para navegación offline');
    }

    /**
     * Recalculate all tiles needed for a range of zoom and current boundingBox showed in map.
     * NOTE: Current zoom in map is limited to 16 (MIN_DOWNLOAD_ZOOM)
     * @param {*} minRes 
     * @param {*} maxRes 
     * @param {*} map 
     */
    function recalculateTileset(minRes, maxRes, map) {

        if (!map._mainLayerControl) { console.error('Invalid leaflet. No mainLayercontrol found'); return; }
        if (!map._mainLayerControl._localLayer) { console.error('Invalid leaflet. No locallayer defined'); return; }

        var localLayer = map._mainLayerControl._localLayer;
        var currentLayer = getCurrentNoLocalBaseLayer(map);
        var rnd = new Date().getMilliseconds();
        var tileSet = new L.LocalTileSet(localLayer, currentLayer);
        tileSet.updateTileRange(minRes, maxRes, map);
        return tileSet;

    }

    function getCurrentNoLocalBaseLayer(map) {
        // TODO - obtener la capa base actual que no se Local.
        var first = null;
        for (var key in map._layers) {
            var oLayer = map._layers[key];
            if (oLayer instanceof L.TileLayer) {
                if (first === null) {
                    first = oLayer;
                }
                // TODO - cómo saber si esta capa es la actual.
                // si es la base actual then
                //   return oLayer;
            }
        }
        return first;
    }

    // TODO - añadir css a 
    // .leaflet-control-container .leaflet-control-localtiles a {
    //    background-size: 16px 16px;
    //    cursor: pointer;
    // }
    // .leaflet-control-container .leaflet-control-localtiles a:before {
    //    content: '\f02c';
    //    font-size: 20px;
    // }

})(); // LocalTileLayer TESTING