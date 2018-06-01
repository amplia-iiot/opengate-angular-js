/** 
 * [uxleaflet/client]
 * Parches para leaflet 0.7.7 
 * Funcionalidad de edición de geometrías.
 * Requerido por L.Editable
 * 
 * Pendiente de mover a mapUxService
 */
(function() {

    'use strict';

    if (L.version !== '0.7.7') {
        // si ya no es necesario entonces eliminar este fichero.
        console.warn('Ux-leaflet-patch only is applicable to leaflet 0.7.7. No applied to leaflet ' + L.version);
        return;
    }

    /* L 1043 */
    L.DomUtil.getPosition = function (el) {
        // (*) this method is only used for elements previously positioned using setPosition,
        // so it's safe to cache the position for performance

        // jshint camelcase: false
        return el._leaflet_pos || new L.Point(0, 0);
    };

    /* L 1010 */
    var old_getTranslateString = L.DomUtil.getTranslateString;
    L.DomUtil.getTranslateString = function (point) {
        if (!point || point.x === undefined || point.y === undefined) {
            // old_getTranslateString would fails
            return '';
        } else {
            return old_getTranslateString(point);
        }
    };

    /* L 4656 */
    var _baseUpdateStyle = L.Path.prototype._updateStyle;

    L.Path.prototype._updateStyle = function () {
        // (*) 
        _baseUpdateStyle.apply(this, arguments);
        if (!this.options.fill) {
            this._path.setAttribute('fill-opacity', 0);
        }
    };

    /* L 6397 */
    // cambiar --> obj.addEventListener(type, handler, false);
    //  por -->  obj.addEventListener(type, handler, {passive: false} );


    /* L 6711 */
    var _baseOnMove = L.Draggable.prototype._onMove;

    L.Draggable.prototype._onMove = function (e) {
        // (*) 
        _baseOnMove.apply(this, arguments);
        this._lastEvent = e;
    };
        // TODO - arreglar lo de ... en ese mismo método. Solucionará lo del arrastre.
        //    this._startPos = L.DomUtil.getPosition(this._element).subtract(offset);

    console.info('Ux-leaflet-patch applied to leaflet ' + L.version);

})();