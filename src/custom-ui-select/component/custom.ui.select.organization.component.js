'use strict';


angular.module('opengate-angular-js').controller('customUiSelectOrganizationController', ['$scope', '$element', '$attrs', '$api', 'Authentication', function($scope, $element, $attrs, $api, Authentication) {
    var ctrl = this;
    ctrl.ownConfig = {
        builder: $api().newOrganizationFinder().findByDomainAndWorkgroup(Authentication.getUser().domain, Authentication.getUser().workgroup),
        filter: function(search) {},
        rootKey: undefined,
        collection: [],
        isGet: true,
        customSelectors: $api().newOrganizationFinder().findByDomainAndWorkgroup(Authentication.getUser().domain, Authentication.getUser().workgroup)
    };

    ctrl.organizationSelected = function($item, $model) {
        if (ctrl.multiple) {
            var identifierTmp = [];

            angular.forEach(ctrl.organization, function(organizationTmp) {
                identifierTmp.push(organizationTmp.name);
            });

            ctrl.ngModel = identifierTmp;
        } else {
            ctrl.ngModel = $item.name;
        }

        if (ctrl.onSelectItem) {
            var returnObj = {};
            returnObj.$item = $item;
            returnObj.$model = $model;
            ctrl.onSelectItem(returnObj);
        }
    };

    ctrl.organizationRemove = function($item, $model) {
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
                    ctrl.organization = [];

                    angular.forEach(identifier, function(idTmp) {
                        ctrl.organization.push({
                            name: idTmp
                        });
                    });
                }

            } else {
                ctrl.organization = [{
                    name: ctrl.identifier
                }];
            }
        } else {
            ctrl.organization = [];
        }
    }
}]);

angular.module('opengate-angular-js').component('customUiSelectOrganization', {

    templateUrl: 'custom-ui-select/views/custom.ui.select.organization.html',
    controller: 'customUiSelectOrganizationController',
    bindings: {
        onSelectItem: '&',
        onRemove: '&',
        organization: '=',
        identifier: '<?',
        multiple: '<',
        ngRequired: '<',
        required: '<',
        label: '<',
        action: '<?',
        disabled: '<?',
        ngModel: '=?',
        uiSelectMatchClass: '@?'
    }

});