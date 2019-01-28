'use strict';


angular.module('opengate-angular-js').controller('customUiSelectEntityController', ['$scope', '$element', '$attrs', '$api',
    function($scope, $element, $attrs, $api) {
        this.$onInit = function() {
            var ctrl = this;

            var entitiesBuilder = $api().entitiesSearchBuilder();

            if (ctrl.disableDefaultSorted) {
                entitiesBuilder = entitiesBuilder.disableDefaultSorted();
            }
            if (ctrl.disableCaseSensitive) {
                entitiesBuilder = entitiesBuilder.disableCaseSensitive();
            }

            var selectBuilder = $api().newSelectBuilder();
            var SE = $api().SE;

            selectBuilder.add(SE.element('provision.administration.identifier', [{
                field: 'value'
            }]));
            selectBuilder.add(SE.element('provision.administration.organization', [{
                field: 'value'
            }]));
            selectBuilder.add(SE.element('provision.administration.channel', [{
                field: 'value'
            }]));
            selectBuilder.add(SE.element('resourceType', [{
                field: 'value'
            }]));
            selectBuilder.add(SE.element('provision.device.identifier', [{
                field: 'value'
            }]));
            selectBuilder.add(SE.element('provision.device.specificType', [{
                field: 'value'
            }]));
            selectBuilder.add(SE.element('provision.device.operationalStatus', [{
                field: 'value'
            }]));
            selectBuilder.add(SE.element('provision.device.communicationModules[].specificType', [{
                field: 'value'
            }]));
            selectBuilder.add(SE.element('provision.device.communicationModules[].subscription.specificType', [{
                field: 'value'
            }]));
            selectBuilder.add(SE.element('provision.device.communicationModules[].subscriber.specificType', [{
                field: 'value'
            }]));

            selectBuilder.add(SE.element('provision.asset.identifier', [{
                field: 'value'
            }]));
            selectBuilder.add(SE.element('provision.asset.specificType', [{
                field: 'value'
            }]));

            ctrl.ownConfig = {
                builder: entitiesBuilder.select(selectBuilder),
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
                                        'provision.device.specificType': search
                                    }
                                },
                                {
                                    'like': {
                                        'device.specificType': search
                                    }
                                },
                                {
                                    'like': {
                                        'provision.entity.specificType': search
                                    }
                                },
                                {
                                    'like': {
                                        'provision.device.communicationModules[].specificType': search
                                    }
                                }
                            ]
                        };
                    } else {
                        return null;
                    }
                },
                rootKey: 'entities',
                collection: [],
                customSelectors: $api().entitiesSearchBuilder(),
                forceFilter: ctrl.forceFilter
            };

            ctrl.entitySelected = function($item, $model) {
                if (ctrl.multiple) {
                    var identifierTmp = ctrl.ngModel || [];

                    angular.forEach(ctrl.entity, function(entityTmp) {
                        identifierTmp.push(entityTmp.provision.administration.identifier._current.value);
                    });

                    ctrl.ngModel = identifierTmp;
                } else {
                    ctrl.ngModel = $item.provision.administration.identifier._current.value;
                }

                if (ctrl.onSelectItem) {
                    var returnObj = {};
                    returnObj.$item = $item;
                    returnObj.$model = $model;
                    ctrl.onSelectItem(returnObj);
                }
            };

            ctrl.entityRemove = function($item, $model) {
                if (ctrl.onRemove) {
                    var returnObj = {};
                    returnObj.$item = $item;
                    returnObj.$model = $model;
                    ctrl.onRemove(returnObj);
                }

                if (ctrl.multiple) {
                    if (ctrl.ngModel && ctrl.ngModel.indexOf($item.provision.administration.identifier._current.value) !== -1) {
                        ctrl.ngModel.splice(ctrl.ngModel.indexOf($item.provision.administration.identifier._current.value), 1);
                    }
                } else {
                    ctrl.ngModel = undefined;
                }
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

            function mapIdentifier(identifierSource) {
                var identifier = identifierSource;

                if (identifier) {
                    if (identifier._current) {
                        identifier = identifier._current.value;
                    }

                    if (ctrl.multiple) {
                        if (angular.isArray(identifier)) {
                            ctrl.entity = [];

                            angular.forEach(identifier, function(idTmp) {
                                ctrl.entity.push({
                                    provision: {
                                        administration: {
                                            identifier: {
                                                _current: {
                                                    value: idTmp
                                                }
                                            }
                                        }
                                    }
                                });
                            });
                        }
                    } else {
                        ctrl.entity = [{
                            provision: {
                                administration: {
                                    identifier: {
                                        _current: {
                                            value: ctrl.identifier
                                        }
                                    }
                                }
                            }
                        }];
                    }
                } else {
                    ctrl.entity = [];
                }
            }
        };
    }
]);

angular.module('opengate-angular-js').component('customUiSelectEntity', {

    templateUrl: 'custom-ui-select/views/custom.ui.select.entity.html',
    controller: 'customUiSelectEntityController',
    bindings: {
        onSelectItem: '&',
        onRemove: '&',
        entity: '=',
        identifier: '<?',
        multiple: '<',
        ngRequired: '<',
        required: '<',
        label: '<',
        disabled: '<?',
        ngModel: '=?',
        uiSelectMatchClass: '@?',
        disableDefaultSorted: '=?',
        disableCaseSensitive: '=?',
        forceFilter: '=?'
    }

});