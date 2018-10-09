'use strict';


angular.module('opengate-angular-js').controller('uiSelectFaStylesController', ['$scope', 'faStylesService', '$window', function($scope, faStylesService, $window) {
    var ctrl = this;

    ctrl.availableIcons = faStylesService.getStyles();
    var intervalIconsid = -1;
    ctrl.maxIcons = 50;
    ctrl.onOpenClose = function(isOpen) {
        ctrl.maxIcons = 50;
        $window.clearInterval(intervalIconsid);
        if (isOpen) {
            intervalIconsid = $window.setInterval(function() {
                ctrl.maxIcons = ctrl.maxIcons + 50;

                if (ctrl.maxIcons > Object.keys(ctrl.availableIcons).length) {
                    $window.clearInterval(intervalIconsid);
                }
                $scope.$apply();
            }, 500);
        }
    };

    ctrl.iconSelected = function($item, $model) {
        var returnObj = {};
        returnObj.$item = $item;
        returnObj.$model = $model;
        ctrl.onSelectItem(returnObj);
    };

    ctrl.iconRemove = function($item, $model) {
        ctrl.onRemove($item, $model);
    };
}]);

angular.module('opengate-angular-js').component('uiSelectFaStyles', {

    templateUrl: 'custom-ui-select/views/ui.select.icon.html',
    controller: 'uiSelectFaStylesController',
    bindings: {
        onSelectItem: '&',
        onRemove: '&',
        required: '=',
        allowClear: '=',
        disabled: '=',
        icon: '=',
        title: '@',
        label: '=',
        uiSelectMatchClass: '@?'
    }

});