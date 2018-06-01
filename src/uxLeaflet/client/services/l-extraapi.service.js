'use strict';

/**
 * L.extraApi o module('uxleaflet').service('mapExtraApiService')
 * Necesita se requerido desde algún módulo
 */
angular.module('uxleaflet').service('mapExtraApiService',
    function() {

        /** inicialización como servicio de uxleaflet */
        this.ensureLib = ensureLib;
        this.setApikey = setApikey;

        /** Inicialización como parte de Leaflet */
        /* jshint ignore:start */
        L.extraApi = {};
        L.extraApi.ensureLib = this.ensureLib = ensureLib;
        L.extraApi.setApikey = this.setApikey = setApikey;
        /* jshint ignore:end */

        // TODO - extraer API-KEY y resto de parámetros
        // solo asignable una vez
        var EXT_APIS = {
            /** Api de Google, incluyendo drawing and places  AIzaSyCaoa14apu4sn1ubM3karbgt8A8V-E7J3s */
            google: {
                apikey: null, // 'AIzaSyCaoa14apu4sn1ubM3karbgt8A8V-E7J3s',
                isApikeyRequired: true,
                options: { libraries: 'drawing,places' },
                getUrl: function() {
                    var GOOGLE_API_VERSION = '3.6';
                    var libs = (this.options.libraries) ? '&libraries=' + this.options.libraries : '';
                    var key = '&key=' + this.apikey;
                    return 'https://maps.google.com/maps/api/js?v=' + GOOGLE_API_VERSION + libs + key;
                },
                status: null
            },
            /** Api de Esri. Versiones compatibles con leaflet 0.7 y 1, */
            esri: {
                apikey: '',
                getUrl: function() {
                    return 'https://unpkg.com/esri-leaflet@2.0.8';
                },
                status: null
            },
            /* */
            osm: {
                apikey: '',
                getUrl: function() {
                    return 'https://openstreetmap.org/aaaaaaaaaaaaa';
                },
                status: null
            },
            /** Sin usar todavía */
            mapquest: {
                apikey: '',
                getUrl: function() {
                    return 'https://maquest.com/aaaaaaaaaaaa';
                },
                status: null
            },
        };

        ///
        /// internal functions
        ///

        /**
         * set the apiKey for required Gis lib (i.e google)
         * 
         */
        function setApikey(apiName, sApiKey) {
            // FIXME - evitar duplicación de apikey en la página completa (sobre todo de google maps)
            if (EXT_APIS[apiName]) {
                EXT_APIS[apiName].apikey = sApiKey;

            } else {
                console.warn('WARN: \'setApiKey\'. Not found ApiName: ' + apiName);
            }
        }

        function existGlobalNames(globalNames) {
            var exist = true;
            for (var a = 0; a < globalNames.length; a++) {
                var name = globalNames[a];
                var parts = name.split('.');
                var obj = window;
                for (var i = 0; i < parts.length; i++) {
                    exist = exist && obj[parts[i]];
                    if (!exist) break;
                }
            }
            return exist;
        }

        /**
         * Load required Gis services and call to callback(err, data).
         * It can be called from different modules to load a known lib only once.
         * NOTE: this method wait if apikey is required.
         * @param {*} typelib : { google, esri, osm, mapquest }
         * @param {*} globalNames : { google, google.maps, google.maps.places, L.esri, osm, mapquest }
         * @param {*} callback : function called when success or fail.
         */
        function ensureLib(apiId, globalNames, callback) {

            var extApi = EXT_APIS[apiId];
            if (!extApi) {
                console.warn('not found known EXT_API as: ' + apiId);
                tryCallback(callback, new Error('not found known EXT_API as: ' + apiId), null);
            }

            var exist = existGlobalNames(globalNames);
            if (exist) {
                tryCallback(callback, null, window[apiId]);
                return;
            }

            if (extApi.status === 'fail') {
                // already try and fail loading API
                tryCallback(callback, new Error('not found API for ' + apiId), null);
                return;
            }
            if (extApi.status === 'loading') {
                // wait for pending loading
                var timer = window.setInterval(function() {
                    if (extApi.status !== 'loading') {
                        window.clearInterval(timer);
                        if (extApi.status === 'ok') {
                            tryCallback(callback, null, window[apiId]);
                        } else if (extApi.status === 'fail') {
                            tryCallback(callback, new Error('not found API for ' + apiId), null);
                        }
                    }
                });
                return;
            }

            // flag as loading API
            extApi.status = 'loading'; // loading, ok, fail

            var script = document.createElement('script');
            script.type = 'text/javascript';
            // event listener readyState or onload
            if (script.readyState) { //IE
                script.onreadystatechange = function() {
                    if (script.readyState === 'loaded' || script.readyState === 'complete') {
                        extApi.status = 'ok';
                        script.onreadystatechange = null;
                        tryCallback(callback, null, window[apiId]);
                    }
                };
            } else { //Others
                script.onload = function() {
                    extApi.status = 'ok';
                    tryCallback(callback, null, window[apiId]);
                };
            }
            // on Fail ???

            // TODO - usar un objeto Promise html5 o un Promose de Angular
            appendScriptWhenApikeyReady();

            function appendScriptWhenApikeyReady() {
                // extApi and script are declared in current ensureLib function scope
                if (extApi.isApikeyRequired && !extApi.apikey) {
                    // repetir la espera (de forma indefinida)
                    window.setTimeout(appendScriptWhenApikeyReady, 1000);
                } else {
                    // apikey is available or not required.
                    script.src = extApi.getUrl();
                    document.getElementsByTagName('head')[0].appendChild(script);
                }
            }

            // Utils

            /** do callback if it is a function */
            function tryCallback(cb, err, data) {
                if (cb && cb.call) {
                    try { cb(err, data); } catch (err) { console.error('callback error: ', err); }
                }
            }

        } // 


        // comment this code in production
        if (document.location.host.startsWith('172.') || document.location.host.startsWith('localhost')) {

            var VAR_NAME = 'google-apikey';
            var sApiKey = localStorage.getItem(VAR_NAME);
            if (sApiKey && L.extraApi) {
                console.info('Found apikey in locaStorage[\'' + VAR_NAME + '\']');
                L.extraApi.setApikey('google', sApiKey);
            } else {
                console.debug('Not Found apikey in locaStorage[\'' + VAR_NAME + '\']');
                // or l.extraApi not loaded yet
            }

        }

    });