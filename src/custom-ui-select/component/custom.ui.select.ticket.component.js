'use strict';


angular.module('opengate-angular-js').controller('customUiSelectTicketController', ['$scope', '$element', '$attrs', '$api', function($scope, $element, $attrs, $api) {
    var ctrl = this;
    ctrl.ownConfig = {
        builder: $api().ticketsSearchBuilder(),
        filter: function(search) {
            return {
                'or': [
                    { 'like': { 'provision.administration.identifier': search } },
                    { 'like': { 'provision.ticket.specificType': search } },
                    { 'like': { 'provision.ticket.name': search } },
                    { 'like': { 'provision.ticket.type': search } },
                    { 'like': { 'provision.ticket.entity': search } }
                ]
            };
        },
        rootKey: 'tickets',
        collection: [],
        customSelectors: $api().ticketsSearchBuilder()
    };

    ctrl.ticketSelected = function($item, $model) {
        var returnObj = {};
        returnObj.$item = $item;
        returnObj.$model = $model;
        ctrl.onSelectItem(returnObj);
    };

    ctrl.ticketRemove = function($item, $model) {
        ctrl.onRemove($item, $model);
    };
}]);

angular.module('opengate-angular-js').component('customUiSelectTicket', {

    templateUrl: 'custom-ui-select/views/custom.ui.select.ticket.html',
    controller: 'customUiSelectTicketController',
    bindings: {
        onSelectItem: '&',
        onRemove: '&',
        ticket: '=',
        multiple: '<',
        required: '='
    }

});