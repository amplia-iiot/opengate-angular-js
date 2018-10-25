'use strict';


angular.module('opengate-angular-js').controller('customUiSelectDomainController', ['$scope', '$element', '$attrs', '$api', function($scope, $element, $attrs, $api) {
    var ctrl = this;
    ctrl.ownConfig = {
        builder: $api().domainsSearchBuilder(),
        rootKey: 'domains',
        collection: [],
        filter: function(search) {
            return {
                'or': [{
                        'like': {
                            'domain.name': search
                        }
                    },
                    {
                        'like': {
                            'domain.description': search
                        }
                    }
                ]
            };
        },
        customSelectors: $api().domainsSearchBuilder()
    };

    ctrl.domainSelected = function($item, $model) {
        var returnObj = {};
        returnObj.$item = $item;
        returnObj.$model = $model;
        ctrl.onSelectItem(returnObj);
    };

    ctrl.domainRemove = function ($item, $model) {
        var returnObj = {};
        returnObj.$item = $item;
        returnObj.$model = $model;
        ctrl.onRemove(returnObj);
    };
}]);

angular.module('opengate-angular-js').component('customUiSelectDomain', {

    templateUrl: 'custom-ui-select/views/custom.ui.select.domain.html',
    controller: 'customUiSelectDomainController',
    bindings: {
        onSelectItem: '&',
        onRemove: '&',
        domain: '=',
        multiple: '<',
        required: '=',
        label: '=',
        uiSelectMatchClass: '@?'
    }

});