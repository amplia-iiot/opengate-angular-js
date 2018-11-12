'use strict';


angular.module('opengate-angular-js').controller('customUiSelectDomainController', ['$scope', '$element', '$attrs', '$api', '$q', function ($scope, $element, $attrs, $api, $q) {
    var ctrl = this;
    var firstLoad = ctrl.ngRequired || ctrl.required;
    ctrl.ownConfig = {
        builder: $api().domainsSearchBuilder(),
        rootKey: 'domains',
        collection: [],
        filter: function (search) {
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
        customSelectors: $api().domainsSearchBuilder(),
        processingData: function (result, domains) {
            if (firstLoad) {
                var _selectedDomain = Array.isArray(ctrl.domain) ? ctrl.domain : (ctrl.domain && [ctrl.domain]);
                ctrl.domain = _selectedDomain || [domains[0]];
                firstLoad = false;
            }

            var deferred = $q.defer();

            deferred.resolve(domains);

            return deferred.promise;
        }
    };

    ctrl.domainSelected = function ($item, $model) {
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