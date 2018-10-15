'use strict';


angular.module('opengate-angular-js').controller('customUiSelectDeviceController', ['$scope', '$element', '$attrs', '$api', '$translate', '$doActions', '$jsonFinderHelper', 'jsonPath', '_',
    function($scope, $element, $attrs, $api, $translate, $doActions, $jsonFinderHelper, jsonPath, _) {
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

        var ctrl = this;
        ctrl.ownConfig = {
            builder: $api().devicesSearchBuilder().select(selectBuilder),
            filter: function(search) {
                var filter = {
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
                        }
                    ]
                };

                if (!!ctrl.specificType) {
                    filter = {
                        'and': [
                            filter,
                            {
                                'or': [{
                                        'eq': {
                                            'device.specificType': ctrl.specificType
                                        }
                                    },
                                    {
                                        'eq': {
                                            'provision.device.specificType': ctrl.specificType
                                        }
                                    }
                                ]
                            }
                        ]
                    };
                }

                return filter;
            },
            rootKey: 'devices',
            collection: [],
            customSelectors: $api().devicesSearchBuilder(),
            specificType: ctrl.specificType
        };

        ctrl.deviceSelected = function($item, $model) {
            if (ctrl.multiple) {
                var identifierTmp = [];

                angular.forEach(ctrl.device, function(deviceTmp) {
                    identifierTmp.push(deviceTmp.provision.administration.identifier._current.value);
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

        ctrl.deviceRemove = function($item, $model) {
            if (ctrl.onRemove) {
                ctrl.onRemove($item, $model);
            }
            ctrl.ngModel = null;

        };

        // Actions que finalmente se mostrarán en el control
        ctrl._actions = [{
            title: $translate.instant('FORM.LABEL.NEW'),
            icon: 'glyphicon glyphicon-plus-sign',
            action: function() {
                var actionData = {};
                if (!!ctrl.specificType) {
                    actionData = {
                        resourceType: {
                            _current: {
                                value: 'entity.device'
                            }
                        },
                        provision: {
                            device: {
                                specificType: {
                                    _current: {
                                        value: ctrl.specificType
                                    }
                                }
                            }
                        }
                    };
                }
                $doActions.executeModal('createDevice', actionData, function(result) {
                    if (result && result.length > 0) {
                        ctrl.device = !ctrl.device ? [] : ctrl.device;
                        ctrl.device.push({
                            provision: {
                                administration: {
                                    identifier: {
                                        _current: {
                                            value: result[0].identifier
                                        }
                                    }
                                },
                                device: {
                                    identifier: {
                                        _current: {
                                            value: result[0].identifier
                                        }
                                    }
                                }
                            }
                        });
                    }
                });
            },
            permissions: 'manageEntity'
        }];

        if (!ctrl.actions) {
            ctrl._actions.push({
                title: $translate.instant('BUTTON.TITLE.EXECUTE_OPERATION'),
                icon: 'glyphicon glyphicon-flash',
                action: function() {
                    $doActions.executeModal('executeOperation', {
                        keys: jsonPath(ctrl.device, '$..' + $jsonFinderHelper.provisioned.getPath('identifier') + '._current.value') || [],
                        entityType: 'GATEWAY'
                    });
                },
                disable: function() {
                    return !ctrl.device || ctrl.device.length === 0;
                },
                permissions: 'executeOperation'
            });
        } else {
            var operationTemplateBuilder = function(operationSelected) {
                return {
                    title: $translate.instant('BUTTON.TITLE.EXECUTE_OPERATION'),
                    icon: 'glyphicon glyphicon-flash',
                    action: function() {
                        $doActions.executeModal('executeOperation', {
                            keys: jsonPath(ctrl.device, '$..' + $jsonFinderHelper.provisioned.getPath('identifier') + '._current.value') || [],
                            entityType: 'GATEWAY',
                            operation: operationSelected ? operationSelected.trim().toUpperCase() : undefined
                        });
                    },
                    disable: function() {
                        return !ctrl.device || ctrl.device.length === 0;
                    },
                    permissions: 'executeOperation'
                };
            };

            angular.forEach(ctrl.actions, function(operationAction) {
                var operationActionFinal = operationTemplateBuilder(operationAction.operation);
                operationActionFinal.title = operationAction.title || operationActionFinal.title;
                operationActionFinal.icon = operationAction.icon || operationActionFinal.icon;

                ctrl._actions.push(operationActionFinal);
            });
        }

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
                        ctrl.device = [];

                        angular.forEach(identifier, function(idTmp) {
                            ctrl.device.push({
                                provision: {
                                    administration: {
                                        identifier: {
                                            _current: {
                                                value: idTmp
                                            }
                                        }
                                    },
                                    device: {
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
                    ctrl.device = [{
                        provision: {
                            administration: {
                                identifier: {
                                    _current: {
                                        value: ctrl.identifier
                                    }
                                }
                            },
                            device: {
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
                ctrl.device = [];
            }
        }
    }
]);

angular.module('opengate-angular-js').component('customUiSelectDevice', {

    templateUrl: 'custom-ui-select/views/custom.ui.select.device.html',
    controller: 'customUiSelectDeviceController',
    bindings: {
        onSelectItem: '&',
        onRemove: '&',
        device: '=',
        identifier: '<?',
        multiple: '<',
        ngRequired: '<',
        required: '<',
        label: '=',
        actions: '=?',
        specificType: '@?',
        disabled: '<?',
        ngModel: '=?',
        uiSelectMatchClass: '@?'
    }

});