'use strict';


angular.module('opengate-angular-js').controller('uiSelectOgiconsController', ['$scope', 'ogiconStylesService', '$window',
    function($scope, ogiconStylesService, $window) {
        this.$onInit = function() {
            var ctrl = this;

            ctrl.availableIcons = ogiconStylesService.getStyles();
            var intervalIconsid = -1;
            ctrl.maxIcons = 50;

            ctrl.iconSelected = function($item, $model) {
                var returnObj = {};

                var itemObj = angular.copy($item);
                itemObj.prefix = 'ogicon';
                itemObj.completeKey = itemObj.prefix + ' ' + itemObj.key;

                returnObj.$item = $item;
                returnObj.$model = $model;

                if (ctrl.onSelectItem) {
                    ctrl.onSelectItem(returnObj);
                }
            };

            ctrl.iconRemove = function($item, $model) {
                var returnObj = {};
                returnObj.$item = $item;
                returnObj.$model = $model;

                if (ctrl.onRemove) {
                    ctrl.onRemove(returnObj);
                }
            };

            ctrl.removeSelection = function() {
                if (ctrl.icon) {
                    ctrl.icon = null;
                }
            };

            intervalIconsid = $window.setInterval(function() {
                ctrl.maxIcons = ctrl.maxIcons + 100;

                if (ctrl.maxIcons > Object.keys(ctrl.availableIcons).length) {
                    $window.clearInterval(intervalIconsid);
                }
                $scope.$apply();
            }, 50);
        };
    }
]);

angular.module('opengate-angular-js').component('uiSelectOgicons', {

    templateUrl: 'custom-ui-select/views/ui.select.ogicon.html',
    controller: 'uiSelectOgiconsController',
    bindings: {
        onSelectItem: '&?',
        onRemove: '&?',
        required: '=',
        allowClear: '=',
        disabled: '=',
        icon: '=',
        title: '@?',
        label: '=?',
        smallIcons: '=',
        uiSelectMatchClass: '@?'
    }

});