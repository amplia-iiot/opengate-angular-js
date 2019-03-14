'use strict';

angular.module('opengate-angular-js')
    .service('$dataFormatter', [
        function() {
            return new DataFormatter();
        }
    ]);

DataFormatter.prototype.format = function(value, symbol) {
    var finalValue = '';

    if (this.isDataUrl(value)) {
        return (new DataUrlFormatter()).format(value);
    } else if (angular.isObject(value)) {
        return (new DataObjectFormatter()).format(value);
    } else {
        if (symbol) {
            finalValue = '<span class="last-value">' + value + '</span><small>' + symbol + '</small>';
        } else {
            finalValue = value;
        }
    }

    return finalValue;
};

function DataFormatter() {
    this.dataurl_regex = /^\s*data:([a-z]+\/[a-z]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i;
    this.isDataUrl = function(value) {
        if (typeof value !== 'string') return false;
        return !!value.match(this.dataurl_regex);
    };
}

DataObjectFormatter.prototype = new DataFormatter();
DataObjectFormatter.prototype.format = function(value) {
    function objectIterator(value, parent) {
        var partialObject = '';

        angular.forEach(value, function(objValue, key) {
            if (partialObject) {
                partialObject += '<br>';
            }

            if (angular.isObject(objValue)) {
                partialObject += objectIterator(objValue, key);
            } else {
                partialObject += '<span class="capitalize-text bold-font">' + (parent ? parent + ' ' + key + ':' : (angular.isString(key) ? key + ':' : '')) + '</span> ' + objValue;
            }
        });

        return partialObject;
    }

    return objectIterator(value);
};

function DataObjectFormatter() {}

DataUrlFormatter.prototype = new DataFormatter();
DataUrlFormatter.prototype.format = function(value) {
    return '<img alt="image" class="datastreamImage" src="' + value + '"/>';
};

function DataUrlFormatter() {}