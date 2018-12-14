'use strict';


angular.module('opengate-angular-js').controller('customUiSelectBundleController', ['$scope', '$element', '$attrs', '$api', '$q', function($scope, $element, $attrs, $api, $q) {
    var ctrl = this;

    ctrl.ownConfig = {
        builder: $api().bundlesSearchBuilder(),
        filter: function(search) {
            ctrl.lastSearch = search;

            if (!search) {
                return null;
            } else {
                return {
                    'or': [
                        { 'like': { 'bundles.name': search } },
                        { 'like': { 'bundles.version': search } },
                        { 'like': { 'bundles.description': search } }
                    ]
                };
            }
        },
        rootKey: 'bundles',
        collection: [],
        customSelectors: $api().bundlesSearchBuilder()
    };

    ctrl.bundleSelected = function($item, $model) {
        var returnObj = {};
        returnObj.$item = $item;
        returnObj.$model = $model;
        ctrl.onSelectItem(returnObj);
    };

    ctrl.bundleRemove = function($item, $model) {
        var returnObj = {};
        returnObj.$item = $item;
        returnObj.$model = $model;
        ctrl.onRemove(returnObj);
    };
}]);

angular.module('opengate-angular-js').component('customUiSelectBundle', {
    templateUrl: 'custom-ui-select/views/custom.ui.select.bundle.html',
    controller: 'customUiSelectBundleController',
    bindings: {
        onSelectItem: '&',
        onRemove: '&',
        bundle: '=',
        multiple: '<',
        required: '=',
        uiSelectMatchClass: '@?'
    }
});