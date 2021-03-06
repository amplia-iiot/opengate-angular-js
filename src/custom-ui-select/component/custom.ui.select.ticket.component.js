'use strict';


angular.module('opengate-angular-js').controller('customUiSelectTicketController', ['$scope', '$element', '$attrs', '$api', function($scope, $element, $attrs, $api) {
    this.$onInit = function() {
        var ctrl = this;

        var ticketsBuilder = $api().ticketsSearchBuilder();

        if (ctrl.disableDefaultSorted !== false) {
            ticketsBuilder.disableDefaultSorted();
        }




        ctrl.ownConfig = {
            builder: ticketsBuilder,
            filter: function(search) {
                if (search) {
                    return {
                        'or': [{
                                'like': {
                                    'provision.administration.identifier': search
                                }
                            },
                            {
                                'like': {
                                    'provision.ticket.specificType': search
                                }
                            },
                            {
                                'like': {
                                    'provision.ticket.name': search
                                }
                            },
                            {
                                'like': {
                                    'provision.ticket.type': search
                                }
                            },
                            {
                                'like': {
                                    'provision.ticket.entity': search
                                }
                            }
                        ]
                    };
                } else {
                    return null;
                }
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
            var returnObj = {};
            returnObj.$item = $item;
            returnObj.$model = $model;
            ctrl.onRemove(returnObj);
        };
        if (ctrl.required !== undefined) {
            ctrl.ngRequired = ctrl.required;
        }
        if (ctrl.disabled !== undefined) {
            ctrl.ngDisabled = ctrl.disabled;
        }
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
        ngRequired: '<',
        ngDisabled: '<',
        required: '<',
        disabled: '<',
        uiSelectMatchClass: '@?',
        disableDefaultSorted: '=?'
    }

});