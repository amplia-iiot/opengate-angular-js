'use strict';

angular.module('opengate-angular-js').controller('helperUiSelectController', ['$scope', '$element', '$attrs', function($scope, $element, $attrs) {
    var $ctrl = this;
    $ctrl.$helper_keys = {};
    // $ctrl.labelError = $ctrl.labelError ? $ctrl.labelError : 'Parameter is required';
    // $ctrl.labelText = $ctrl.labelText ? $ctrl.labelText : 'Parameter';

    $ctrl.helperTagTransform = function(newTag) {
        return {
            key: 'custom',
            value: newTag
        };
    };

    $ctrl._onCopy = function(copy_obj) {
        $ctrl.$helper_keys = copy_obj.$helper_keys;
        $ctrl.have_helper_keys = true;
        if ($ctrl.helperModel && $ctrl.helperModel.length > 0) {
            $ctrl.$helper_keys["'" + $ctrl.labelText + "' default"] = $ctrl.helperModel;
        }
    };

    $ctrl.$onChanges = function(changesObj) {
        //console.log(JSON.stringify(changesObj));
        if (changesObj && changesObj.selectedKeys && changesObj.selectedKeys.currentValue) {
            if (Object.keys(changesObj.selectedKeys.currentValue).length > 0) {
                $ctrl.$helper_keys = changesObj.selectedKeys.currentValue;
                $ctrl.have_helper_keys = true;
            } else {
                $ctrl.$helper_keys = {};
                $ctrl.have_helper_keys = false;
            }
        }
    };

    $ctrl.$onInit = function() {
        $ctrl.labelError = $ctrl.labelError ? $ctrl.labelError : 'Parameter is required';
        $ctrl.labelText = $ctrl.labelText ? $ctrl.labelText : 'Parameter';

        if (!$ctrl.helperCtrl.onMulti) {
            $ctrl.helperCtrl.onMulti = [];
        }
        $ctrl.helperCtrl.onMulti.push($ctrl._onCopy);

        if (!$ctrl.helperCtrl.componentsIds) {
            $ctrl.helperCtrl.componentsIds = [];
        }
        $ctrl.helperCtrl.componentsIds.push($ctrl.labelText);

        $ctrl.have_helper_keys = false;
    };

    $ctrl.clean = function() {
        $ctrl.$helper_keys = {};
        $ctrl.have_helper_keys = false;
    };
}]);

angular.module('opengate-angular-js').component('helperUiSelect', {
    templateUrl: 'helper/views/custom.ui.select.helper.html',
    transclude: {
        input: '?helperUiSelectInput'
            //,custom: '?helperUiSelectCustom'
    },
    require: {
        helperCtrl: '^^helperDialog'
    },
    controller: 'helperUiSelectController',
    bindings: {
        id: '@',
        name: '@',
        labelText: '@',
        helperModel: '=',
        required: '<',
        multiple: '<',
        labelError: '@',
        selectedKeys: '<'
    }

});