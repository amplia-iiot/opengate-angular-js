'use strict';


angular.module('opengate-angular-js').controller('actionButtonController', ['$scope', '$element', '$attrs', function($scope, $element, $attrs) {
    var $ctrl = this;

    $ctrl.onAction = function(action) {
        if (!action.disable || !action.disable()) {
            action.action();
        }
    };

}]);

angular.module('opengate-angular-js').component('actionButton', {

    templateUrl: 'components/views/action.button.html',
    controller: 'actionButtonController',
    bindings: {
        actions: '<'
    }

});