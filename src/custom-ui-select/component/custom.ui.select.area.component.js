'use strict';


angular.module('opengate-angular-js').controller('customUiSelectAreaController', ['$scope', '$element', '$attrs', '$api', '$q', function($scope, $element, $attrs, $api, $q) {
    this.$onInit = function() {
        var ctrl = this;

        var andFilter;
        if (ctrl.organization) {
            andFilter = [{ 'eq': { 'areas.organization': ctrl.organization } }];
        }

        ctrl.ownConfig = {
            builder: $api().areasSearchBuilder(),
            filter: function(search) {
                ctrl.lastSearch = search;

                if (andFilter) {
                    if (search) {
                        andFilter.push({
                            'or': [
                                { 'like': { 'areas.name': search } },
                                { 'like': { 'areas.organization': search } }
                            ]
                        });
                    }

                    return {
                        'and': andFilter
                    };
                } else {
                    if (!search) {
                        return null;
                    } else {
                        return {
                            'or': [
                                { 'like': { 'areas.name': search } },
                                { 'like': { 'areas.organization': search } }
                            ]
                        };
                    }
                }
            },
            rootKey: 'areas',
            collection: [],
            customSelectors: $api().areasSearchBuilder()
        };

        ctrl.areaSelected = function($item, $model) {
            var returnObj = {};
            returnObj.$item = $item;
            returnObj.$model = $model;
            ctrl.onSelectItem(returnObj);
        };

        ctrl.areaRemove = function($item, $model) {
            var returnObj = {};
            returnObj.$item = $item;
            returnObj.$model = $model;
            ctrl.onRemove(returnObj);
        };
    };
}]);

angular.module('opengate-angular-js').component('customUiSelectArea', {
    templateUrl: 'custom-ui-select/views/custom.ui.select.area.html',
    controller: 'customUiSelectAreaController',
    bindings: {
        onSelectItem: '&',
        onRemove: '&',
        area: '=',
        multiple: '<',
        required: '=',
        organization: '<',
        uiSelectMatchClass: '@?'
    }
});