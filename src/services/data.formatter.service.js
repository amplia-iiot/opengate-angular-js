'use strict';

angular.module('opengate-angular-js')
    .service('$dataFormatter', [
        function() {
            return new DataFormatter();
        }
    ]);

DataFormatter.prototype.format = function(value, symbol) {
    if (this.isDataUrl(value)) {
        return (new DataUrlFormatter()).format(value);
    }
    if (symbol) {
        return value + '<small>' + symbol + '</small>';
    } else {
        return value;
    }

};

function DataFormatter() {
    this.dataurl_regex = /^\s*data:([a-z]+\/[a-z]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i;
    this.isDataUrl = function(value) {
        if (typeof value !== 'string') return false;
        return !!value.match(this.dataurl_regex);
    };
}

DataUrlFormatter.prototype = new DataFormatter();
DataUrlFormatter.prototype.format = function(value) {
    return '<img alt="image" class="datastreamImage" src="' + value + '"/>';
};

function DataUrlFormatter() {}