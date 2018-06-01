// Limit leaflet map zoom to a list of variants
// Written by Ilya Zverev, licensed WTFPL

// DESACTIVADO por defecto. No es compatible con el plugin de zoom 'continuo' usado por adf-widget-hmi.
//  Se puede activar según capa base. Probar en UxMap.js, linea 236
'use strict';

L.Map.mergeOptions({
    zooms: undefined // Ejemplo: [1, 2, 3, 4, 5, 6, 7, 8, 9, 12, 15, 18] 
});

L.Map.include({
    _limitZoom: function(zoom) {
        var zooms = this.options.zooms;
        var snap;
        if (!zooms || !('length' in zooms) || !zooms.length) {
            var min = this.getMinZoom();
            var max = this.getMaxZoom();
            snap = L.Browser.any3d ? this.options.zoomSnap : 1;
            if (snap) {
                zoom = Math.round(zoom / snap) * snap;
            }
            return Math.max(min, Math.min(max, zoom));
        } else {
            var z, d = 100,
                i, dist;
            var dz = -1,
                dd = 100,
                dir = zoom - this._zoom;
            snap = L.Browser.any3d ? this.options.zoomSnap : 1;
            if (snap) {
                zoom = Math.round(zoom / snap) * snap;
            }
            for (i = 0; i < zooms.length; i++) {
                dist = Math.abs(zooms[i] - zoom);
                if (dist < d) {
                    z = zooms[i];
                    d = dist;
                }
                if (dir * (zooms[i] - this._zoom) > 0 && dist < dd) {
                    dz = zooms[i];
                    dd = dist;
                }
            }
            return dz < 0 ? z : dz;
        }
    }
});