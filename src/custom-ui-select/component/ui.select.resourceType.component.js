'use strict';


angular.module('opengate-angular-js').controller('uiSelectResourceTypeController', ['$scope', '$element', '$attrs', '$api', function ($scope, $element, $attrs, $api) {
    var ctrl = this;
    ctrl.ownConfig = {
        builder: $api().resourceTypeSearchBuilder(),
        filter: function (search) {},
        rootKey: 'resourceType',
        collection: [],
        customSelectors: $api().resourceTypeSearchBuilder()
    };

    ctrl.resourceTypeSelected = function ($item, $model) {
        var returnObj = {};
        returnObj.$item = $item;
        returnObj.$model = $model;
        ctrl.onSelectItem(returnObj);
    };

    ctrl.resourceTypeRemove = function ($item, $model) {
        var returnObj = {};
        returnObj.$item = $item;
        returnObj.$model = $model;
        ctrl.onRemove(returnObj);
    };
}]);

angular.module('opengate-angular-js').component('uiSelectResourceType', {

    templateUrl: 'custom-ui-select/views/ui.select.resourceType.html',
    controller: 'uiSelectResourceTypeController',
    bindings: {
        onSelectItem: '&',
        onRemove: '&',
        resourceType: '=',
        multiple: '<',
        required: '=',
        uiSelectMatchClass: '@?'
    }

});