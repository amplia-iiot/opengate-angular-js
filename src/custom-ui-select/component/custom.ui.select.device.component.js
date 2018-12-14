'use strict';


angular.module('opengate-angular-js').controller('customUiSelectDeviceController', ['$scope', '$element', '$attrs', '$api', '$translate', '$doActions', '$jsonFinderHelper', 'jsonPath', '_', 'toastr', 'Filter',
    function($scope, $element, $attrs, $api, $translate, $doActions, $jsonFinderHelper, jsonPath, _, toastr, Filter) {
        var ctrl = this;

        var deviceBuilder = $api().devicesSearchBuilder();

        if (!ctrl.fullInfo) {
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

            deviceBuilder.select(selectBuilder);
        }

        var defaultQuickSearchFields = "provision.administration.identifier,provision.device.specificType,device.specificType";

        function _getQuickSearchFields(search) {
            var _quickSearchFields = ctrl.quickSearchFields || defaultQuickSearchFields;
            var fields = _quickSearchFields.split(/[,|, ]+/);
            var filter = {
                or: []
            };
            fields.forEach(function(field) {
                var _like = {
                    like: {}
                };
                _like.like[field] = search;
                filter.or.push(_like);
            });
            return filter;
        }

        function _getFilter(oql) {
            var _json = Filter.parseQuery(oql);
            var _filter = jsonPath(_json, '$..value.filter')[0] || undefined;
            return _filter.and || ([_filter] || []);
        }

        ctrl.ownConfig = {
            builder: deviceBuilder,
            filter: function(search) {
                var filter;

                if (search) {
                    filter = _getQuickSearchFields(search);
                }

                if (!!ctrl.specificType) {
                    if (filter) {
                        filter = {
                            'and': [filter]
                        };
                    } else {
                        filter = {
                            and: []
                        };
                    }

                    filter.and.push({
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
                    });
                }

                if (ctrl.oql) {
                    var _oql = _getFilter(ctrl.oql);

                    if (!filter) {
                        filter = {
                            'and': []
                        };
                    } else if (!filter.and) {
                        filter = {
                            and: [filter]
                        };
                    }

                    var _and = filter.and.concat(_oql);
                    filter.and = _and;
                }

                return filter;
            },
            rootKey: 'devices',
            collection: [],
            customSelectors: $api().devicesSearchBuilder(),
            specificType: ctrl.specificType,
            oql: ctrl.oql,
            quickSearchFields: ctrl.quickSearchFields
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

        ctrl.editDevice = function(deviceData) {
            var entityId = deviceData.provision.administration.identifier._current.value || deviceData.identifier;
            var deviceFinder = $api().devicesSearchBuilder().filter({
                "and": [{
                    "eq": {
                        "provision.device.identifier": entityId
                    }
                }]
            });

            deviceFinder.build().execute()
                .then(function(result) {
                    if (result.statusCode === 204) {
                        $translate('TOASTR.ENTITY_NOT_FOUND', {
                            identifier: entityId
                        }).
                        then(function(translatedMessage) {
                            toastr.error(translatedMessage);
                        });
                    } else {
                        $doActions.executeModal('editDevice', angular.copy(result.data.devices[0]));
                    }
                })
                .catch(function(err) {
                    $translate('TOASTR.CANNOT_GET_ENTITY_INFO').
                    then(function(translatedMessage) {
                        toastr.error(translatedMessage);
                    });
                });
        };

        function _getOperationActionTemplate(operationSelected) {
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
        }

        var uiSelectActionsDefinition = {
            operation: _getOperationActionTemplate(),
            create: {
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

                            var deviceFinder = $api().devicesSearchBuilder().filter({
                                "and": [{
                                    "eq": {
                                        "provision.device.identifier": result[0].identifier
                                    }
                                }]
                            });

                            deviceFinder.build().execute()
                                .then(function(result) {
                                    if (result.statusCode === 204) {
                                        $translate('TOASTR.ENTITY_NOT_FOUND', {
                                            identifier: result[0].identifier
                                        }).
                                        then(function(translatedMessage) {
                                            toastr.error(translatedMessage);
                                        });
                                    } else {
                                        ctrl.deviceSelected(result.data.devices[0]);
                                    }
                                })
                                .catch(function(err) {
                                    $translate('TOASTR.CANNOT_GET_ENTITY_INFO').
                                    then(function(translatedMessage) {
                                        toastr.error(translatedMessage);
                                    });
                                });
                        }
                    });
                },
                permissions: 'manageEntity'
            }
        };
        // Actions que finalmente se mostrarán en el control
        ctrl.uiSelectActions = [];

        if (!ctrl.actions) {
            angular.forEach(uiSelectActionsDefinition, function(action) {
                ctrl.uiSelectActions.push(action);
            });
        } else {
            angular.forEach(ctrl.actions, function(action) {
                var finalAction;
                switch (action.type) {
                    case 'operation':
                        finalAction = _getOperationActionTemplate(action.operation);
                        break;
                    case 'create':
                        finalAction = uiSelectActionsDefinition.create;
                        break;
                }
                finalAction.title = action.title || finalAction.title;
                finalAction.icon = action.icon || finalAction.icon;
                ctrl.uiSelectActions.push(finalAction);
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
        uiSelectMatchClass: '@?',
        oql: '@',
        quickSearchFields: '@',
        fullInfo: '=?'
    }

});