'use strict';


angular.module('opengate-angular-js').controller('customUiSelectOgtypeListController', ['$scope', '$element', '$attrs', '$api', '$q', function($scope, $element, $attrs, $api, $q) {
    var ctrl = this;
    var builder = $api().basicTypesSearchBuilder();
    if (ctrl.path) {
        builder = builder.withPath(ctrl.path);
    }
    ctrl.ownConfig = {
        builder: builder.build().execute(),
        filter: function(search) {},
        rootKey: 'enum',
        collection: [],
        isGet: true,
        customSelectors: builder.build().execute(),
        processingData: function(p1, p2) {
            //  console.log(p1);
            // console.log(p2);

        },
        path: ctrl.path
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
            ctrl.onRemove($item, $model);
        }
        ctrl.ngModel = undefined;
    };


    ctrl.$onChanges = function(changesObj) {
        if (changesObj && changesObj.identifier) {
            mapIdentifier(changesObj.identifier.currentValue);
        }
    };

    if (ctrl.required !== undefined) {
        ctrl.ngRequired = ctrl.required;
    }

    if (ctrl.identifier) {
        mapIdentifier(ctrl.identifier);
    }


    function mapIdentifier(identifierSrc) {
        var identifier = identifierSrc;
        if (identifier) {
            if (identifier._current) {
                identifier = identifier._current.value;
            }

            if (ctrl.multiple) {
                if (angular.isArray(identifier)) {
                    ctrl.element = [];

                    angular.forEach(identifier, function(idTmp) {
                        ctrl.element.push({
                            name: idTmp
                        });
                    });
                }

            } else {
                ctrl.element = [{
                    name: ctrl.identifier
                }];
            }
        } else {
            ctrl.element = [];
        }
    }
}]);

angular.module('opengate-angular-js').component('customUiSelectOgtypeList', {

    templateUrl: 'custom-ui-select/views/custom.ui.select.ogtypelist.html',
    controller: 'customUiSelectOgtypeListController',
    bindings: {
        onSelectItem: '&',
        onRemove: '&',
        element: '=',
        identifier: '<?',
        path: '@?',
        multiple: '<',
        ngRequired: '<',
        required: '<',
        label: '=',
        placeholder: '=',
        action: '=?',
        disabled: '<?',
        ngModel: '=?',
        uiSelectMatchClass: '@?'
    }


});