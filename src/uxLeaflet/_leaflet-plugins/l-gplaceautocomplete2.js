/** 
 * [uxleaflet/client]
 * Versión extendida de GPlaceAutocomplete 
 * Consta de un botón para mostrar ocultar el cuadro de texto.
 * 
 * Esta clase está preparada para esperar su inicialización hasta que se resuelva la carga de
 * su la librería de la que depende: google.maps.places.Autocomplete.
 * Es necesario un API-KEY de Google para que funcione. 
 * Este API-KEY se está buscando uando L.extraApi.ensureLib('google', ...)
 */
(function() {

    'use strict';

    var BASE_CLASS = L.Control.GPlaceAutocomplete;
    if (!BASE_CLASS) {
        console.error('L.Control.GPlaceAutocomplete2 requires L.Control.GPlaceAutocomplete');
        return;
    }

    L.Control.GPlaceAutocomplete2 = BASE_CLASS.extend({

        _buildContainer: function(options) {
            // Solo debe invocarse si existe google.maps.places.Autocomplete
            var _that = this;
            L.extraApi.ensureLib('google', ['google.maps.places.Autocomplete'], function() {
                // called when available google-key
                BASE_CLASS.prototype._buildContainer.call(_that, options);
            });
        },

        addTo: function(map) {
            // solo debe invocarse cuando exista this._container.
            var _that = this;
            var tInterval = window.setInterval(function() {
                    if (_that.container) {
                        window.clearInterval(tInterval);
                        BASE_CLASS.prototype.addTo.call(_that, map);
                    }
                },
                100); // check this._container each 100 ms
        }

    });

})();