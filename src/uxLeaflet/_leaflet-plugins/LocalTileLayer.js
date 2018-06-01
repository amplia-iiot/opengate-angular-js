'use strict';

/**
 * L.LocalTileLayer hace uso de Tiles en local.
 * carga los tiles desde un url (fichero json) o desde localstorge.
 * Mientras se siga usando ui-leaflet:
 * - No se implementa como clase hija de L.TileLayer sino que se hackea L.TileLayer
 * para que tenga en cuenta la funcionalidad de tiles en local.
 * 

 */
(function() {

    if (!L.Map) return;

    var ERR_TILE = '';
    var NOT_FOUND_TILE = '';

    L.TileLayer.DEFAULT_LS_KEY = 'currentlocaltiles'; // key for localStorage 
    L.TileLayer.LOCAL_MAX_VIEW_ZOOM = 16; // Zoom for view when current layer in map 

    var _tileLayerInitialize = L.TileLayer.prototype.initialize;
    L.TileLayer.prototype.initialize = function() {
        _tileLayerInitialize.apply(this, arguments);

        var url = arguments[0] || '__';
        var parts = url.split('_');
        // check if '_$local_[TILE_FILE_NAME]_{z}/{x}/{y}';
        // {z}/{x}/{y} must match with tile organization in file.
        var localItem = parts[1]; // part of a local layer description
        if (localItem === '$local') {
            this.options.maxNativeZoom = L.TileLayer.LOCAL_MAX_VIEW_ZOOM;
            this.options.minZoom = 4;
            this._isLocalLayer = true;
            if (!this._localTiles) {
                var jsonName = parts[2] || L.TileLayer.DEFAULT_LS_KEY;
                var sContent = localStorage.getItem(jsonName);
                this._isUsingLocalTiles = true;
                if (sContent) {
                    console.info('Detected offline layer from localStorage: ' + jsonName);
                    this.changeTileDataFromJson(sContent);
                } else {
                    console.info('Detected offline layer: ' + jsonName);
                    var jsonPathFileName = './sampledata/tiles-' + jsonName + '.json';
                    this.changeTileDataFromUrl(jsonPathFileName);
                }
            }
        }

        // eliminar cuando ya se puedan generar los json con todos los tiles de una zona
        if (this._url && this._url.indexOf('172.') > 0) {
            if (this._url.indexOf('smara/')) {
                this._defaultView = { zoom: 16, center: { lat: 26.7420, lng: -11.7006 } };
            }
        }

    };

    /**
     * It include methods for LayerControl. 
     * It allow management of unique local layer.
     */
    L.Control.Layers.include({
        /* */
        setLocalTilesFromLocalstorage: function(key) {
            var sData = localStorage.getItem(key);
            if (sData && this._localLayer) {
                this._localLayer.changeTileDataFromJson(sData);
                this._map.update();
            }
        },
        /* */
        setLocalTilesFromUrl: function(jsonUrl) {
            if (jsonUrl && this._localLayer) {
                this._localLayer.changeTileDataFromUrl(jsonUrl);
                this._map.update();
            }
        }
    });

    /**
     * This method is implemented only for LocalTileLayers changeTileDataFromUrl
     */
    L.TileLayer.prototype.changeTileDataFromUrl = function(jsonPathFileName) {
        if (!this._isLocalLayer) {
            throw 'This layer is not a Local TileLayer';
        }
        var _thisLayer = this;
        getJson(jsonPathFileName,
            function(jsonData) {
                try {
                    var tiles = _thisLayer._localTiles = JSON.parse(jsonData);
                    var n = _thisLayer._checkTiles(tiles);
                    console.info('Loaded tiles offline: ' + jsonPathFileName + '\n Tile count:' + n +
                        '\n Map View: ', tiles.mapview);
                } catch (err) {
                    console.info('Fail parsing json file container of tiles: ' + jsonPathFileName + '\n', err);
                }
            },
            function(err) {
                console.info('Fail response. ' + jsonPathFileName, err);
            }
        );
    };

    /**
     * 
     */
    L.TileLayer.prototype.changeTileDataFromJson = function(tileSetJson) {
        try {
            var tiles = this._localTiles = JSON.parse(tileSetJson);
            var n = this._checkTiles(tiles);
            console.info('Loaded tiles offline from localstorage\n Tile count:' + n +
                '\n Map View: ', tiles.mapview);
        } catch (err) {
            console.info('Fail parsing json content \n', err);
        }
    };

    /**
     * Check tiles. Return count and 
     * (Mejor crear nueva capa cuando se deje de usar ui-leaflet)
     */
    L.TileLayer.prototype._checkTiles = function(tiles) {
        var n = 0;
        var max = 0;
        for (var key in tiles) {
            var z = +key.split('/')[0];
            // UPGRADE - Check if too large
            // UPGRADE - Check if void png transparent.
            if (isNaN(z) === false) {
                n += 1;
                max = Math.max(z, max);
            }
        }
        // updat options maxNativeZoom and options.tms
        this.options.maxNativeZoom = max;
        this.options.tms = (tiles.mapview && tiles.mapview.tms);
        //
        return n;
    };

    /**
     * return map view for most top level and center on bounding box tiles
     */
    L.TileLayer.prototype.getHomeInfo = function() {
        if (this._isUsingLocalTiles) {
            return this._localTiles && this._localTiles.mapview || {};
        } else {
            return this._defaultView || {};
        }
    };

    var _tileLayerGetTileUrl = L.TileLayer.prototype.getTileUrl;
    L.TileLayer.prototype.getTileUrl = function(tilePoint) {
        if (!this._isUsingLocalTiles) {
            if (!this._url) {
                this._url = '//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
            }

            return _tileLayerGetTileUrl.apply(this, arguments);
        }

        // check if '_$local_[TILE_FILE_NAME]_{z}/{x}/{y}';
        var url = L.Util.template(this._url, L.extend({
            s: this._getSubdomain(tilePoint),
            z: tilePoint.z,
            x: tilePoint.x,
            y: tilePoint.y
        }, this.options));

        var entry = url.split('_')[3]; //  '...l_{z}/{x}/{y}';
        if (entry) {
            entry = entry.split('.')[0]; // remove posible extension
            var srcData = this._localTiles && (this._localTiles[entry] || NOT_FOUND_TILE) || ERR_TILE;
            return srcData;
        }
    };

    /* Static function. Utility implemented in L.TileLayer
     * Returns a file containg image tiles grouped in a TileSet.
     * @param {*} url 
     * @param {*} resolve 
     * @param {*} reject 
     */
    L.TileLayer.getJson = getJson;

    /**
     * Pendiente de reemplazar por $http (que asegure devolver JSON)
     * @param {*} url 
     * @param {*} resolve 
     * @param {*} reject 
     */
    function getJson(url, resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 300) {
                var data = xhr.response;
                if (data[0] === '{') {
                    // valid JSON
                    resolve(data);
                } else {
                    // not expected data
                    reject('Invalid json. Expected start with \'{\'. Response start with: ' + data.substring(0, 20));
                }
            } else {
                reject('Invalid request for ' + url, xhr.statusText);
            }
        };
        xhr.onerror = function() {
            // internal error
            reject(xhr.statusText);
        };
        xhr.send(null);
    }

})(); // LocalTileLayer TESTING