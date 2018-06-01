/*
 * [uxleaflet/client]
 * L.Control.OsmPlaceFinder: Usado como buscador de lugares predeterminado.
 */
(function() {

    'use strict';

    // Exportación en L (leaflet)
    L.OsmGeocodingService = GeocodingService; // class
    // (usar esta nomenclatura para usar desde dentro de un 'servicio angular')
    L.Util.geocodingService = new GeocodingService(HTTP);

    /**
     * L.Control.OsmPlaceFinder 
     */
    L.Control.OsmPlaceFinder = L.Control.extend({
        includes: L.Mixin.Events,

        options: {
            searchLayerProp: 'title', //property in marker.options trough filter elements in layer searchLayer
            searchInitial: true, //search text in _recordsCache by initial
            searchMinLen: 5, //minimal text length for autocomplete
            searchDelay: 300, //delay for searching after digit
            //TODO searchLimit: 100,	//limit max results show in tooltip
            timeAutoclose: 1200, //delay for autoclosing alert and collapse after blur
            autoPan: true, //auto panTo when click on tooltip
            autoResize: true, //autoresize on input change
            animatePan: true, //animation after panTo
            zoom: null, //zoom after pan to location found, default: map.getZoom()
            position: 'topleft',
            prepend: true,
            placeholder: 'Search place ..', //placeholder value
            textErr: 'Place not found', //error message
            autocompleteEnabled: true, //false // no permitido en 'nominatim público'  (Unacceptable Use)
            hightlightTarget: true
        },

        initialize: function(options) {
            L.Control.prototype.initialize.apply(this, arguments);
            L.Util.setOptions(this, options);
            this._inputMinSize = this.options.placeholder.length;
            this.options.searchLayer = this.options.searchLayer || new L.LayerGroup();
            this.options.searchJsonpFilter = this.options.searchJsonpFilter || this._jsonpDefaultFilter;
            this.timeDelaySearch = this.options.searchDelay;
            this._recordsCache = {};
        },

        addTo: function(map) {
            this._map = map;
            // copiede from L.Control (0.7.7)
            var container = this._container = this.onAdd(map);
            var pos = this.getPosition();
            var corner = map._controlCorners[pos];

            L.DomUtil.addClass(container, 'leaflet-control');

            if (this.options.prepend) {
                corner.insertBefore(container, corner.firstChild);
            } else {
                corner.appendChild(container);
            }

            return this;
        },

        onAdd: function(map) {
            this._map = map;
            var css_id = 'leaflet-control-osmplacefinder';
            this._container = L.DomUtil.create('div', css_id + ' leaflet-bar');
            this._alert = this._createAlert('search-alert');
            this._input = this._createInput(this.options.placeholder, 'search-input');
            this._createButton(this.options.placeholder, 'search-button');
            this._tooltip = this._createTooltip('search-tooltip');
            return this._container;
        },

        onRemove: function(map) {
            this._recordsCache = [];
        },

        showAlert: function(text) {
            this._setVisibleElem(this._alert, true, 100);
            this._alert.innerHTML = text;
            var that = this;
            clearTimeout(this.timerAlert);
            var timeout = 2000;
            this.timerAlert = setTimeout(function() {
                that._setVisibleElem(that._alert, false, 200);
            }, timeout);
        },

        _setVisibleElem: function(elem, isVisible, animMillis) {
            // TODO - mejor probar con ccs3 directamente
            var method = isVisible ? 'show' : 'hide';
            if ($ && $.fn && $.fn.show && $.fn.hide) {
                $(elem)[method](500);
            } else {
                this._alert.style.display = isVisible ? 'inherit' : 'none';
            }
        },

        expand: function() {
            this._input.style.display = 'block';
            L.DomUtil.addClass(this._container, 'exp');
            this._input.focus();
            if (this._input.value !== '') {
                // handle  previous text
                this._refreshPlaces();
            }
        },

        collapse: function() {
            if (localStorage.getItem('CSS')) {
                // localStorage.setItem('CSS', '1')
                console.error('  comentado código para colapsar');
                return;
            }
            this._hideTooltip();
            this._input.size = this._inputMinSize;
            this._alert.style.display = 'none';
            this._input.style.display = 'none';
            L.DomUtil.removeClass(this._container, 'exp');
        },

        autoCollapse: function() { //collapse after delay, used on_input blur
            var that = this;
            var timeout = isNaN(this.options.timeAutoclose) ? 0 : +this.options.timeAutoclose;
            if (timeout) {
                this.timerCollapse = setTimeout(function() {
                    that.collapse();
                }, this.timeout);
            }
        },

        autoCollapseStop: function() {
            clearTimeout(this.timerCollapse);
        },

        _clickFocus: function(e) {
            e.target.focus();
        },

        _createAlert: function(className) {
            var alert = L.DomUtil.create('div', className, this._container);
            alert.style.display = 'none';
            return alert;
        },

        _createInput: function(text, className) {
            var input = L.DomUtil.create('input', className, this._container);
            input.type = 'text';
            input.size = this._inputMinSize;
            input.value = '';
            input.placeholder = text;
            input.style.display = 'none';

            L.DomEvent
                .disableClickPropagation(input)
                .addListener(input, 'keyup', this._handleKeypress, this)
                .addListener(input, 'keyup', this._handleAutoresize, this)
                .addListener(input, 'blur', this.autoCollapse, this)
                .addListener(input, 'focus', this.autoCollapseStop, this);

            return input;
        },

        _createButton: function(text, className) {
            var button = L.DomUtil.create('a', className, this._container);
            button.href = '#';
            button.title = text;

            L.DomEvent
                .disableClickPropagation(button)
                .addListener(button, 'focus', this.autoCollapseStop, this)
                .addListener(button, 'blur', this.autoCollapse, this)
                .addListener(button, 'click', this._handleSubmit, this);

            return button;
        },

        _createTooltip: function(className) {
            var tool = L.DomUtil.create('div', className, this._container);
            tool.style.display = 'none';
            var _this = this;

            L.DomEvent
                .disableClickPropagation(tool)
                .addListener(tool, 'blur', this.autoCollapse, this)
                .addListener(tool, 'mousewheel', function(e) {
                    _this.autoCollapseStop();
                    L.DomEvent.stopPropagation(e);
                }, this)
                .addListener(tool, 'mousedown', function(e) {
                    L.DomEvent.stop(e);
                    _this.autoCollapseStop();
                }, this);
            return tool;
        },

        _createTip: function(item) { //build new choice for tooltip menu
            var tip = L.DomUtil.create('a', 'search-tip');
            tip.href = '#';
            tip.innerHTML = item.display_name;
            tip.setAttribute('data-tip', item);

            L.DomEvent.addListener(tip, 'click', function(e) { // alternativas 'click' 'mousedown'
                // no cambia _input pero adquiere el foco
                this._input.focus();
                this._hideTooltip();
                this._handleAutoresize();
                if (this.options.autoPan) {
                    this._handleSubmit(item);
                }
            }, this);

            return tip;
        },

        _createCopyright: function() { //build new choice for tooltip menu
            var p = L.DomUtil.create('p', 'osm-copyright');
            p.innerHTML = 'powered by ';
            var a = L.DomUtil.create('a');
            a.href = 'http://wiki.openstreetmap.org/wiki/Nominatim';
            a.innerHTML = 'Nominatim';
            a.target = '_blank';
            p.appendChild(a);
            return p;
        },
        //////end DOM creations

        _showTooltip: function() {
            // all _recordsCache items are shown
            this._tooltip.innerHTML = '';
            var data = this._recordsCache;
            var n = 0;
            // fill tip items
            for (; n < data.length; n += 1) {
                var item = data[n];
                this._tooltip.appendChild(this._createTip(item));
            }
            if (+data.length === 0) {
                var msg = L.DomUtil.create('p', 'err-text', this._tooltip);
                msg.innerText = this.options.textErr;
            }
            this._tooltip.appendChild(this._createCopyright());
            this._tooltip.style.display = 'block';
        },

        _hideTooltip: function() {
            this._tooltip.style.display = 'none';
            this._tooltip.innerHTML = '';
        },

        _handleKeypress: function(e) { //run _input keyup event
            switch (e.keyCode) {
                case 27: //Esc
                    if (this._input.value === '') {
                        this.collapse();
                    } else {
                        this._input.value = '';
                    }
                    break;
                case 13: //Enter
                    if (this.options.autocompleteEnabled === false) {
                        this._refreshPlaces();
                    } else {
                        this._handleSubmit(0); //do search
                    }
                    break;
                case 37: //Left
                case 39: //Right
                    var inputText = this._input.value;
                    if (this._input.selectionStart >= inputText.length) {
                        this._refreshPlaces(inputText);
                    }
                    break;
                case 16: //Shift
                case 17: //Ctrl
                    //case 32://Space
                    break;
                    //TODO scroll tips, with shortcuts 38(up),40(down)
                default: //All keys
                    if (this.options.autocompleteEnabled === false) {
                        // no usar autocomplete con nominatim
                        return;
                    }
                    clearTimeout(this.timerKeypress); //cancel last search request
                    if (this._input.value.length < this.options.searchMinLen) {
                        return this._hideTooltip();
                    }
                    var that = this;
                    this.timerKeypress = setTimeout(function() {
                        that._refreshPlaces();
                    }, that.timeDelaySearch);
            }
        },

        _refreshPlaces: function(sText) {
            var that = this;
            if (this._isRefreshing) {
                return;
            }
            this._isRefreshing = true;

            if (sText === undefined) {
                sText = this._input.value;
            }

            var _service = L.Util.geocodingService;
            var options = { limit: 5 };

            _service.search(sText, options, function(err, arrData) {
                if (err !== null) {
                    console.warn('Error search in nominatim ' + sText + ']', err);
                    that._recordsCache = [];
                } else {
                    // display_name, lat, lon, boundingbox
                    that._recordsCache = arrData;
                    var count = arrData || arrData.length;
                    console.info('' + new Date() + ' nominatim - getPlaces: ok: ' + count, arrData);
                }
                that._isRefreshing = false;
                that._showTooltip();
            });

        },

        _handleAutoresize: function() { //autoresize this._input
            if (this.options.autoResize)
                this._input.size = this._input.value.length < this._inputMinSize ? this._inputMinSize : this._input.value.length;
        },

        _handleSubmit: function(item) { //search button action, and enter key shortcut

            if (this._input.style.display === 'none') //on first click show _input only
                this.expand();
            else {
                item = item || this._recordsCache[0];
                if (!item) //hide _input only
                    this.collapse();
                else {
                    if (this._findLocation(item) === false) {
                        this.showAlert(this.options.textErr); //location not found, alert!
                    } else {
                        if ((+this.options.timeAutoclose > 0) === false) {
                            this.collapse();
                        }
                        if (this.options.hightlightTarget) {
                            this.highlightResult(item);
                        }
                    }
                }
            }
            this._input.focus(); //block autoCollapse after _button blur
        },

        _findLocation: function(item) {
            // response of nominatim: lat, lon, display_name, boundingbox
            try {
                var newCenter = new L.latLng(item.lat, item.lon); //serach in table key,value
                var ps = item.boundingbox;
                var bb = new L.LatLngBounds([
                    [ps[0], ps[2]],
                    [ps[1], ps[3]]
                ]);
                this._map.fitBounds(bb);
                return newCenter;
            } catch (err) {
                return false;
            }
        },

        highlightResult: function(result) {
            if (!result) { return; }
            var resultLayerGroup = new L.LayerGroup(); // temporal layer
            resultLayerGroup.addTo(this._map);

            if (result.lat) {
                var circle = L.circleMarker([result.lat, result.lon], {
                    radius: 10,
                    weight: 2,
                    fillColor: '#ff7800',
                    color: 'blue',
                    opacity: 0.75
                });
                var thatMap = this._map;
                circle.on('click', function() {
                    thatMap.removeLayer(resultLayerGroup);
                });
                resultLayerGroup.addLayer(circle);
            }
            if (result.aBoundingBox) {
                var bounds = [
                    [result.aBoundingBox[0] * 1, result.aBoundingBox[2] * 1],
                    [result.aBoundingBox[1] * 1, result.aBoundingBox[3] * 1]
                ];
                this._map.fitBounds(bounds);
                if (result.asgeojson && result.asgeojson.match(/(Polygon)|(Line)/)) {
                    var gj = JSON.parse(result.asgeojson);
                    var geojson_layer = L.geoJson(gj, {
                        style: function(feature) {
                            return { interactive: false, color: 'blue' };
                        }
                    });
                    resultLayerGroup.addLayer(geojson_layer);
                } else {
                    // var layer = L.rectangle(bounds, {color: '#ff7800', weight: 1} );
                    // layerGroup.addLayer(layer);
                }
            }
        }

    }); // L.Control.OsmSearch Class


    /**
     * GeocodingService
     * @param {http object} with Promise implementation, Usage http({}).then()
     * @param {options JSON}  baseAddress { 'https://...' }, houseNumberSwap { true, false, func() }
     */
    function GeocodingService($http, options) {
        var _this = this;

        var _baseAddress = 'https://nominatim.openstreetmap.org';
        var _houseNumberSwap = false;
        if (options) {
            _baseAddress = options.baseAddress || _baseAddress;
            _houseNumberSwap = options.houseNumberSwap || _houseNumberSwap;
        }

        /* Esto puede usarse para configurar el tipo de respuesta en reverse-geocoding */
        var FULL_RESPONSE_TEMPLATE = {
            'house_number': { 'Num casa': true },
            'road': { 'Calle': true },
            'suburb': { 'Suburb': false },
            'city': { 'Ciudad': true },
            'county': { 'Provincia': true },
            'state_district': { 'Suburb': false },
            'state': { 'Estado': false },
            'postcode': { 'CP': false },
            'country': { 'País': true },
            'country_code': { 'cc': false }
        };

        /** Utilidad para obtener información geopolítica a partir de una lat/lon y un nivel de zoom
         * @param {number} lat 
         * @param {number} lon 
         * @param {zoom} level of detail (1 to 18)
         * @param {function} callback  (err, data)
         * @return {object} place_id, lat, lon, display_name, address (country_code, country, postcode, state, etc), boundingBox
         */
        _this.reverseSearch = reverseSearch;
        _this.search = search;
        _this.lookupGeometry = lookupGeometry;

        //
        // internal functions
        //

        /**
         * Return information given a description of a feature.
         * @param {String} sDescription 
         * @param {*} callback 
         * @return {json array} a json like () [{'place_id':'179320264','osm_type':'relation','osm_id':'5326784',
         *  'boundingbox':['40.3119774','40.6437293','-3.8889539','-3.5179163'],
         *   'lat':'40.4167047','lon':'-3.7035825',
         *   'display_name':'Madrid, Área metropolitana de Madrid y Corredor del Henares, Comunidad de Madrid, España',
         *   'class':'place','type':'city','importance':0.29353044801777,
         *   'icon':'http:\/\/nominatim.openstreetmap.org\/images\/mapicons\/poi_place_city.p.20.png',
         *   'address':{'city':'Madrid','county':'Área metropolitana de Madrid y Corredor del Henares',
         *       'state':'Comunidad de Madrid','country':'España','country_code':'es'}}]
         */
        function search(sDescription, options, callback) {
            var searchUrl = _baseAddress + '/search';
            var escapedText = escapeTextForUrl(sDescription);
            var limit = (!options && '2') || (options.limit || '3');
            var url = searchUrl + '/' + escapedText + '?format=json&limit=' + limit;
            if (options && options.extraParams) {
                url += '&' + options.extraParams;
            }
            console.info('URL nominatim search \n' + url);
            // async request
            asyncRequestJs(url, callback);
        }

        /**
         * https://nominatim.openstreetmap.org/reverse
         * @param {*} lat 
         * @param {*} lon 
         * @param {*} callback 
         * @param {*} optFormat. formato del json respuesta, por defecto se devuelve todo lo que responde el webservce
         * @return JSON object with data and metadata of this location
         */
        function reverseSearch(lat, lon, zoom, callback, optFormat) {
            var resp = $.extend({}, FULL_RESPONSE_TEMPLATE);

            var reverseSearchUrl = _baseAddress + '/reverse';
            var url = reverseSearchUrl + '?format=json&lat=' + lat + '&lon=' + lon +
                '&zoom=' + zoom + '&addressdetails=1';
            $http({
                method: 'GET',
                url: url
            }).then(function successCallback(response) {
                    var js;
                    try {
                        if (response.address) {
                            js = response;
                        } else if (response.status === 200) {
                            js = response.data;
                        } else {
                            return;
                        }
                    } catch (err) {
                        var sResp = '' + response;
                        callback(new Error('Invalid json: \n ', response));
                        return;
                    }
                    callback(null, js);
                },
                function errorCallback(response) {
                    callback(response);
                }
            );
        }

        /**
         * searchGeometry us used for search a Geometry of an object in OSM database given its id
         * @param {*} id 
         * @param {*} callback 
         * @return Geometry
         */
        function lookupGeometry(id, callback) {
            // pendiene de probar. Obtener una geometria.
            /*var searchUrl = _baseAddress + '/lookup';
            var url = searchUrl + '?polygon_geojson=1&osm_id=' + id;
            requestJs(sUrl, function(err, data) {
                if (err) {
                    console.warn('Not found OSM id: ' + id);
                    callback(err)
                } else {
                    // TODO - convertir data en geom

                    callback(null, geom);
                }
            });*/

            /* probar a que devuelva algo parecido a:
            https://nominatim.openstreetmap.org/search/lisboa%20?format=json&polygon_geojson=1&limit=2
            */
        }

        /**
         * asyncRequestJs use $http object passed as arguments.
         * @param {*} url 
         * @param {*} callback (err, data)
         * @return javascript object
         */
        function asyncRequestJs(url, callback) {
            $http({
                method: 'GET',
                url: url
            }).then(function successCallback(response) {
                    var js;
                    try {
                        if (typeof response !== 'string') {
                            js = response;
                        } else {
                            js = JSON.parse(response);
                        }
                    } catch (err) {
                        callback(new Error('Invalid json: \n ' + response.substring(0, 20)));
                        return;
                    }
                    callback(null, js);
                },
                function errorCallback(response) {
                    callback(response);
                }
            );
        }

        /**
         * Implementar si fuera necesario.
         * @param {*} sText text thath will be included in url 
         */
        function escapeTextForUrl(sText) {
            return sText;
        }


    } //  L.OsmGeoocodingService

    if (L.Map._isDemoGeocodingEnabled) {
        // option-demo: L.Map._isDemoGeocodingEnabled = true
        console.info('OJO: Nominatim activado. Hacking L.Map._onclic');

        // Código de prueba. DECLARAMOS nuevo plugin de leaflet.
        // añadimos ref al GeocodingService en  L.Map.uxGeocodingService
        // Podría implementarse un nuevo plugin de leaflet a partir de este código.
        //  l-uxnominatim.js o l-nominatim.js (y añadir un control al mapa)

        L.Map.mergeOptions({
            uxNominatim: { zoomOffset: 2 }
        });

        var __super;

        L.Map.NominatimClickHandler = L.Handler.extend({
            initialize: function(map) {
                __super.initialize.apply(this, arguments);
                this._zoomOffset = map.options.uxNominatim.zoomOffset || 0;
            },
            addHooks: function() {
                var map = this._map;
                map.on('click', this._clicked, this);
                map.whenReady(this._mapReady, this);
            },

            removeHooks: function() {
                this._map.off('click', this._clicked, this);
            },

            _mapReady: function() {
                var mapId = this._map._container && this._map._container.id;
                console.info('GeocodingService. Mapa listo para  click->nominatim-balloon: MapId: [' + mapId +
                    ']. Clic con shift y ctrl presionados');
            },

            _clicked: function(evt) {
                var e = evt.originalEvent;
                if (e.altKey && e.ctrlKey) {
                    console.info('Prueba con nominatim en ', e);
                } else {
                    return;
                }
                var map = this._map;
                var loc = evt.latlng;
                var zoom = map.getZoom() + this._zoomOffset;

                // prepara balloon personalizado
                var balloon = L.popup({ className: 'ux-nomintim' });
                var popupContent = document.createElement('div');
                balloon.setContent(popupContent);
                balloon.setLatLng(loc);
                // internal configuration
                popupContent.classList.add('ux-nominatim');
                popupContent.classList.add('ux-waiting');
                var hueco = document.createElement('div');
                hueco.style.maxHeight = '150px';
                hueco.style.overflowY = 'scroll';
                hueco.style.padding = '.6em';
                hueco.style.backgroundColor = '#f0f0d0';
                popupContent.innerHTML = '<p>Obteniendo posición</p>';
                popupContent.appendChild(hueco);

                // UPGRADE - pasar objetos angular.
                var service = new GeocodingService(HTTP, {});
                // hacer consulta a nominatim
                var _this = this;
                service.reverseSearch(loc.lat, loc.lng, zoom, function(err, data) {
                    if (err !== null) {
                        hueco.innerText = err.message;
                    } else {
                        // OK.  Es un JSON con datos y metadatos.
                        // var s = _this._generateHtmlTable(data, 'display_name', false);
                        var s = _this._generateHtmlTable(data.address, null, false);
                        // UPGRADE - extraer los campos y crear una tabla html con los datos.

                        // address es un objeto con todos los detalles.
                        hueco.style.fontSize = '1.35em';
                        // ponemos el contenido
                        hueco.innerHTML = s;
                        popupContent.classList.remove('ux-waiting');
                        popupContent.parentNode.style.width = 'inherit';
                        popupContent.parentNode.style.minWidth = '200px';
                        popupContent.parentNode.style.maxWidth = '500px';
                        balloon.update(); // para que recalcule apuntamiento
                    }
                });

                this._map.openPopup(balloon);
            },

            _onViewReset: function() {
                // TODO fix hardcoded Earth values
                var pxCenter = this._map.getSize()._divideBy(2),
                    pxWorldCenter = this._map.latLngToLayerPoint([0, 0]);

                this._initialWorldOffset = pxWorldCenter.subtract(pxCenter).x;
                this._worldWidth = this._map.project([0, 180]).x;
            },

            _generateHtmlTable: function(json, keys, showKeys) {
                if (typeof keys === 'string') {
                    return json[keys];
                }
                var all = !keys;
                keys = !keys && json; // replace key width json if no keys
                var lines = '';
                for (var key in keys) {
                    if (all || key in json) {
                        var sOptKey = showKeys ? (key + ' : ') : '';
                        lines += '<tr><td>' + sOptKey + '</td><td>' + json[key] + '</td></tr>';
                    }
                }
                lines = lines || '- - -';
                return '<table><tbody>' + lines + '</tbody></table>';
            }

        });

        __super = L.Map.NominatimClickHandler.__super__; // ref to class, not to instance

        // agrega un handler NominatimClickHandler si la instancia contiene options.uxNominatim
        L.Map.addInitHook('addHandler', 'uxNominatim', L.Map.NominatimClickHandler);

    }

    //
    // AUX. Pendiente sustituir por el acceso real a estos objetos de angular o node.
    //

    function HTTP(obj) {
        return $.ajax(obj.url);
    }

    /*
      Ejemplos:

      polygon_geojson=1&viewbox=
       
      https://nominatim.openstreetmap.org/reverse?format=xml&lat=52.548&lon=-1.81607&zoom=15&addressdetails=1
    
        lat/lon  4 decimales ya tienen precisión de 1 metro.
        zoom: (18, 1) nivel de detalle de la respuesta: 18 número de casa, 15 barrio, 10 ciudad ...
    
        Ejemplo con nivel 18;
        ---------------------
        <addressparts>
            <house_number>137</house_number>
            <road>Pilkington Avenue</road>
            <suburb>Sutton Coldfield</suburb>
            <city>Birmingham</city>
            <county>West Midlands Combined Authority</county>
            <state_district>West Midlands</state_district>
            <state>Inglaterra</state>
            <postcode>B72 1LH</postcode>
            <country>Reino Unido</country>
            <country_code>gb</country_code>
        </addressparts>
    
        https://nominatim.openstreetmap.org/reverse?format=json&lat=52.5487429714954&lon=-1.81602098644987&zoom=18&addressdetails=1
    
        {
            'place_id':'91015268',
            'licence':'Data © OpenStreetMap contributors, ODbL 1.0. http:\/\/www.openstreetmap.org\/copyright',
            'osm_type': 'way',
            'osm_id':'90394420',
            'lat':'52.54877605',
            'lon':'-1.81627033283164',
            'display_name':'137, Pilkington Avenue, Sutton Coldfield, Birmingham, West Midlands Combined Authority, West Midlands, Inglaterra, B72 1LH, Reino Unido',
            'address':{
                'house_number':'137',
                'road':'Pilkington Avenue',
                'suburb':'Sutton Coldfield','city':'Birmingham','county':'West Midlands Combined Authority',
                'state_district':'West Midlands',
                'state':'Inglaterra',
                'postcode':'B72 1LH',
                'country':'Reino Unido',
                'country_code':'gb'
            },
            'boundingbox':['52.5487321','52.5488299','-1.8163514','-1.8161885']}
        
     */

})();