/*
 * [uxleaflet/client]
 * Leaflet Search Control 1.1.0
 * https://github.com/stefanocudini/leaflet-search
 * https://bitbucket.org/zakis_/leaflet-search
 * http://easyblog.it/maps/leaflet-search
 *
 * Copyright 2012, Stefano Cudini - stefano.cudini@gmail.com
 * Licensed under the MIT license.
 */
(function() {

    'use strict';

    // En pruebas.
    // podría pasar a ser un componente bower
    // Se usa en 'buscador de entities' (mejorable) y en 'geo-search' usando un proveedor de búsqueda genérico
    // (se empezará implementado para nominatim de openstreetmap)

    L.Control.Search = L.Control.extend({
        includes: L.Mixin.Events,

        options: {
            searchCall: null, //callback that fill _recordsCache with key,value table
            searchJsonpUrl: '', //url for search by jsonp service, ex: 'search.php?q={s}&callback={c}'
            searchJsonpFilter: null, //callback for filtering data to _recordsCache
            //TODO add options: searchJsonpKey and searchJsonpLoc for remapping fields from jsonp
            searchLayer: null, //layer where search elements
            searchLayerProp: 'title', //property in marker.options trough filter elements in layer searchLayer
            searchInitial: true, //search text in _recordsCache by initial
            searchMinLen: 1, //minimal text length for autocomplete
            searchDelay: 300, //delay for searching after digit
            //TODO searchLimit: 100,	//limit max results show in tooltip
            timeAutoclose: 1200, //delay for autoclosing alert and collapse after blur
            autoPan: true, //auto panTo when click on tooltip
            autoResize: true, //autoresize on input change
            animatePan: true, //animation after panTo
            zoom: null, //zoom after pan to location found, default: map.getZoom()
            position: 'topright',
            placeholder: 'Seach feature by id...', //placeholder value
            textErr: 'Location not found' //error message
        },

        initialize: function(options) {
            L.Util.setOptions(this, options);
            this._inputMinSize = this.options.placeholder.length;
            this.options.searchLayer = this.options.searchLayer || new L.LayerGroup();
            this.options.searchJsonpFilter = this.options.searchJsonpFilter || this._jsonpDefaultFilter;
            this.timeDelaySearch = this.options.searchDelay;
            this._recordsCache = {}; //key,value table! that store locations! format: key,latlng
        },

        onAdd: function(map) {
            this._map = map;
            this._circleLoc = (new L.CircleMarker([0, 0], { radius: 0, weight: 3, color: '#0000', fill: false })).addTo(this._map);
            this._container = L.DomUtil.create('div', 'leaflet-control-search leaflet-bar');
            this._alert = this._createAlert('search-alert');
            this._input = this._createInput(this.options.placeholder, 'search-input');
            this._createButton(this.options.placeholder, 'search-button');
            this._tooltip = this._createTooltip('search-tooltip');
            //var that = this; map.on('mousedown',function(e) { that._animateLocation(e.latlng); });
            //uncomment for fast test of _animateLocation()
            //TODO bind _recordsFromLayer to map events layeradd layerd remove update ecc
            return this._container;
        },

        onRemove: function(map) {
            this._recordsCache = {}; //free memory!...?
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

        _setCircleVisible: function(b, optLatLon, optRadius) {
            // TODO - ver cómo hacer para agregar/quitar capa en versiones leaflet.
            var geom = this._circleLoc;
            if (b) {
                if (optLatLon) geom.setLatLng(optLatLon);
                if (optRadius !== undefined) geom.setRadius(optRadius);
                geom.setStyle({ color: '#ac60' });
            } else {
                geom.setLatLng([0, 0]);
                geom.setStyle({ color: '#0000' });
            }
        },

        expand: function() {
            this._input.style.display = 'block';
            L.DomUtil.addClass(this._container, 'exp');
            this._input.focus();
        },

        collapse: function() {
            this._hideTooltip();
            this._input.value = '';
            this._input.size = this._inputMinSize;
            this._alert.style.display = 'none';
            this._input.style.display = 'none';
            L.DomUtil.removeClass(this._container, 'exp');
            this._setCircleVisible(false);
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
            //not work!	:-( try mouseover   (FIXED: faltaban los paréntesis de los mçetodos)
            return tool;
        },

        _createTip: function(text) { //build new choice for tooltip menu
            var tip = L.DomUtil.create('a', 'search-tip');
            tip.href = '#';
            tip.innerHTML = text;

            L.DomEvent
                //.disableClickPropagation(tip) // deja de funcionar en 3/3/20017 (?)
                .addListener(tip, 'click', function(e) { // alternativas 'click' 'mousedown'
                    this._input.value = text;
                    this._input.focus();
                    this._hideTooltip();
                    this._handleAutoresize();
                    if (this.options.autoPan) {
                        this._handleSubmit();
                    }
                }, this);

            return tip;
        },
        //////end DOM creations

        _showTooltip: function() { //show tooltip with filtered this._recordsCache values

            if (this._input.value.length < this.options.searchMinLen)
                return this._hideTooltip();

            var regFilter = new RegExp('^[.]$|[|]', 'g'), //remove . and | 
                text = this._input.value.replace(regFilter, ''), //sanitize text
                I = this.options.searchInitial ? '^' : '', //search for initial text
                regSearch = new RegExp(I + text, 'i'), //for search in _recordsCache
                ntip = 0;

            this._tooltip.innerHTML = '';

            for (var key in this._recordsCache) {
                if (regSearch.test(key)) //search in records
                {
                    this._tooltip.appendChild(this._createTip(key));
                    ntip++;
                }
            }
            if (ntip > 0)
                this._tooltip.style.display = 'block';
            else
                this._hideTooltip();

            return ntip;
        },

        _hideTooltip: function() {
            this._tooltip.style.display = 'none';
            this._tooltip.innerHTML = '';
        },

        _jsonpDefaultFilter: function(jsonraw) { //default callback for filter data from jsonp to _recordsCache format(key,latlng)
            var jsonret = {};
            for (var i in jsonraw)
                jsonret[jsonraw[i].title] = L.latLng(jsonraw[i].loc);
            //TODO replace .title and .loc with options: searchJsonpKey and searchJsonpLoc
            //TODO use: throw new Error('my message');on error
            return jsonret;
        },

        _recordsFromJsonp: function(inputText, callAfter, that) {

            L.Control.Search.callJsonp = function (data) { //jsonp callback
                var fdata = that.options.searchJsonpFilter(data);
                callAfter(fdata);
            };
            var scriptNode = L.DomUtil.create('script', '', document.getElementsByTagName('body')[0]);
            var url = L.Util.template(that.options.searchJsonpUrl, { s: inputText, c: 'L.Control.Search.callJsonp' });
            //parsing url
            //rnd = '&_='+Math.floor(Math.random()*10000);//TODO add rnd param or randomize callback name!

            scriptNode.type = 'text/javascript';
            scriptNode.src = url;
            return callAfter;
        },

        _recordsFromLayer: function() { //return table: key,value from layer
            var retRecords = {},
                layerSearch = this.options.searchLayer,
                propSearch = this.options.searchLayerProp;

            layerSearch.eachLayer(function(marker) {
                //TODO filter by element type: marker|polyline|circle...
                var key = marker.options.hasOwnProperty(propSearch) && marker.options[propSearch] || '';
                //TODO check if propSearch is a string! else use: throw new Error('my message');
                if (key)
                    retRecords[key] = marker.getLatLng();
            }, this);
            //TODO caching retRecords while layerSearch not change, controlling on 'load' event
            return retRecords;
        },

        _handleKeypress: function(e) { //run _input keyup event
            switch (e.keyCode) {
                case 27: //Esc
                    this.collapse();
                    break;
                case 13: //Enter
                    this._handleSubmit(); //do search
                    break;
                case 37: //Left
                case 39: //Right
                case 16: //Shift
                case 17: //Ctrl
                    //case 32://Space
                    break;
                    //TODO scroll tips, with shortcuts 38(up),40(down)
                default: //All keys

                    clearTimeout(this.timerKeypress); //cancel last search request

                    if (this._input.value.length < this.options.searchMinLen)
                        return this._hideTooltip();

                    var that = this;
                    //TODO move anonymous function in setTimeout in new function source selector
                    this.timerKeypress = setTimeout(function() {
                        that._timerKeypressElapsed();
                    }, that.timeDelaySearch);
            }
        },

        _timerKeypressElapsed: function() {
            var that = this;
            var inputText = that._input.value;
            if (that.options.searchCall) //PERSONAL SEARCH CALLBACK(USUALLY FOR AJAX SEARCHING)
            {
                //						L.DomUtil.addClass(that._input, 'load');
                that._recordsCache = that.options.searchCall.apply(that, [inputText]);
                that._showTooltip();
                //						L.DomUtil.removeClass(that._input, 'load');
            } else if (that.options.searchJsonpUrl) //JSONP SERVICE REQUESTING
            {
                that._recordsFromJsonp(inputText, function(data) { //callback run after data return
                    that._recordsCache = data;
                    that._showTooltip();
                }, that);
            } else if (that.options.searchLayer) //SEARCH ELEMENTS IN PRELOADED LAYER
            {
                //TODO update _recordsCache only one
                that._recordsCache = that._recordsFromLayer(); //fill table key,value from markers into searchLayer				
                that._showTooltip(); //show tooltip with filter records by this._input.value			
            }
        },

        _handleAutoresize: function() { //autoresize this._input
            if (this.options.autoResize)
                this._input.size = this._input.value.length < this._inputMinSize ? this._inputMinSize : this._input.value.length;
        },

        _handleSubmit: function(e) { //search button action, and enter key shortcut

            if (this._input.style.display === 'none') //on first click show _input only
                this.expand();
            else {
                if (this._input.value === '') //hide _input only
                    this.collapse();
                else {
                    if (this._findLocation(this._input.value) === false) {
                        this.showAlert(this.options.textErr); //location not found, alert!
                    } else {
                        if ((+this.options.timeAutoclose > 0) === false) {
                            this.collapse();
                        }
                    }
                }
            }
            this._input.focus(); //block autoCollapse after _button blur
        },

        _animateLocation: function(latlng) {

            this._setCircleVisible(true, latlng, 50);
            console.info('animated to: ' + latlng);

            var circle = this._circleLoc;
            var tt = 200,
                ss = 10,
                mr = parseInt(circle._radius / ss),
                f = 0;
            var that = this;
            this.timerAnimLoc = setInterval(function() { //animation
                f += 0.5;
                mr += f; //adding acceleration
                var nr = circle._radius - mr;
                if (nr > 0.5)
                    circle.setRadius(nr);
                else
                    clearInterval(that.timerAnimLoc);
            }, tt);
        },

        _findLocation: function(text) { //get location from table _recordsCache and pan to map! ...game over!
            if (this._recordsCache === null) {
                console.warn('Callback for findLocation not set in L.Search plugin');
                return false;
            }
            if (this._recordsCache.hasOwnProperty(text)) {
                var newCenter = this._recordsCache[text]; //serach in table key,value

                if (this.options.zoom) {
                    this._map.setView(newCenter, this.options.zoom);
                } else {
                    this._map.setView(newCenter);
                }

                if (this.options.animatePan) {
                    this._animateLocation(newCenter); //evidence location found
                }
                //TODO start animation after setView panning end, maybe on moveend
                return newCenter;
            } else {
                this._setCircleVisible(false);
            }
            return false;
        }
    });

})();