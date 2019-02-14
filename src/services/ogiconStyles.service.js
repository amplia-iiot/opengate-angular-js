angular.module('opengate-angular-js')
    .factory('ogiconStylesService', ['$http', OgiconsStylesService]);
/**   
 *  FaStyles is a service for FontAwesome styles
 * 
 */
function OgiconsStylesService($http) {
    'use strict';

    var OGICON_STYLES = {};
    var OGICON_DISCRIMINATOR_TEXT = 'opengate-icon'; // text containg in all css with FA styles

    // async task. It fill OGICON_STYLES
    asyncInitFaStyles(OGICON_DISCRIMINATOR_TEXT);

    //
    return {
        /* return all ogicon styles existing at now */
        getStyles: function() {
            return OGICON_STYLES;
        },

        /**  */
        getChar: getChar
    };

    ///
    /// Internal functions
    ///

    /**
     * return a hex representation of a Char from a cssSelector (starting with dot, without dot, or without .ogicon-)
     * @param {*} cssSelector  (example  .ogicon-info-circle, ogicon-info-circle, info-circle)
     */
    function getChar(cssSelector) {
        if (!cssSelector) {
            return "";
        }
        cssSelector = name + '';
        if (cssSelector.startsWith('.ogicon-') === false) {
            if (cssSelector.startsWith('ogicon-')) {
                cssSelector = '.' + cssSelector;
            } else {
                cssSelector = '.ogicon-' + cssSelector;
            }
        }
        return OGICON_STYLES[name] || '';
    }


    /**
     * mapping with keys as -ogicon-circle-info, ogicon-pepe, ogicon-xxxx and
     * as value a unicode character
     */
    function asyncInitFaStyles(ogiconDiscriminatorText) {

        var sheets = document.styleSheets;
        for (var i = 0; i < sheets.length; i++) {
            var sheet = document.styleSheets[i];
            if (sheet.href && sheet.href.indexOf(ogiconDiscriminatorText) !== -1) {
                try {
                    addSelectorsFromCss(sheet.href);
                } catch (err) {
                    console.error('WARN: Error httpRequesting file from ' + sheet.href, err);
                }
            }
        }
    }

    /**
     * httpRequest from url, extratc -ogicon- selectors with text content and mix with old  OGICON_STYLES items. 
     * @param {*} url 
     */
    function addSelectorsFromCss(url) {
        $http({
            method: 'GET',
            url: url
        }).then(function successCallback(response) {
            var moreFaStyles = extractOgicons(response);
            // mix new css selctors with old content
            OGICON_STYLES = angular.extend(OGICON_STYLES, moreFaStyles);
        }, function errorCallback(err) {
            console.error('WARN: Error retrieving file from ' + url, err);
        });
    }

    /**
     *  Return a dictionoary where key is css awesome ids and values are unicode content
     *  for a character.
     *  They are be selected all cssSelectors staring with '.ogicon-'
     *  @param {resp} response of angular.$http
     */
    function extractOgicons(resp) {

        var ogiconStyle = {};

        var cssFileContent = resp.data || '';
        // all rules end with '}';
        var rules = cssFileContent.split('}');

        for (var i = 0; i < rules.length; i++) {
            var rule = rules[i];
            var parts = rule.split('{');
            if (parts.length !== 2) {
                continue;
            }

            // Get the value of 'content'
            var sValue = parts[1];
            if (sValue.indexOf('content') === -1) {
                // sin contenido
                continue;
            }
            var sValueParts = sValue.split('"');
            if (sValueParts.length !== 3) {
                // solo se acepta una pareja de comillas en todo el "valor"
                continue;
            }
            var unicodeText = sValueParts[1].substring(1);

            // get all selectors starting with .ogicon
            var cssSelectors = parts[0].trim(); // eliminado :before
            var items = cssSelectors.split(',');

            // add each selector with unicodeText as value
            for (var j = 0; j < items.length; j++) {
                var cssSelector = items[j].split(':')[0].trim();
                // only selected if start with '.ogicon-'
                if (cssSelector.startsWith('.ogicon-')) {
                    ogiconStyle[cssSelector.substring(1)] = unicodeText;
                }
            }

        }
        return ogiconStyle;
    }

}