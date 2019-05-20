'use strict';


angular.module('opengate-angular-js').controller('customUiSelectFieldsSearch', ['$api', '$q', function($api, $q) {
    this.$onInit = function() {
        var ctrl = this;
        var builder = ctrl.builder();
        ctrl.ownConfig = {
            builder: builder().customSelectors.findFields(),
            filter: function(search) {
                builder().customSelectors.findFields(search)
            },
            rootKey: '',
            collection: [],
            isGet: true,
            customSelectors: builder
        };

        ctrl.elementSelected = function($item, $model) {
            if (ctrl.multiple) {
                var identifierTmp = [];

                angular.forEach(ctrl.element, function(element) {
                    identifierTmp.push(element);
                });

                ctrl.ngModel = identifierTmp;
            } else {
                ctrl.ngModel = $item;
            }

            if (ctrl.onSelectItem) {
                var returnObj = {};
                returnObj.$item = $item;
                returnObj.$model = $model;
                ctrl.onSelectItem(returnObj);
            }
        };

        ctrl.elementRemove = function($item, $model) {
            if (ctrl.onRemove) {
                var returnObj = {};
                returnObj.$item = $item;
                returnObj.$model = $model;
                ctrl.onRemove(returnObj);
            }
            if (ctrl.multiple) {
                if (ctrl.ngModel && ctrl.ngModel.indexOf($item) !== -1) {
                    ctrl.ngModel.splice(ctrl.ngModel.indexOf($item), 1);
                }
            } else {
                ctrl.ngModel = undefined;
            }
        };


        if (ctrl.required !== undefined) {
            ctrl.ngRequired = ctrl.required;
        }


    }
}]);

angular.module('opengate-angular-js').component('customUiSelectFieldsSearch', {

    templateUrl: 'custom-ui-select/views/custom.ui.select.fieldssearch.html',
    controller: 'customUiSelectFieldsSearch',
    bindings: {
        onSelectItem: '&',
        onRemove: '&',
        builder: '&',
        element: '=',
        multiple: '<',
        ngRequired: '<',
        required: '<',
        label: '=',
        placeholder: '@',
        disabled: '<?',
        ngModel: '=?',
        uiSelectMatchClass: '@?'
    }


});