'use strict';


angular.module('opengate-angular-js').controller('customUiSelectSubscriptionController', ['$scope', '$element', '$attrs', '$api', '$entityExtractor', '$translate', '$doActions', '$jsonFinderHelper', 'jsonPath', 'Filter',
    function($scope, $element, $attrs, $api, $entityExtractor, $translate, $doActions, $jsonFinderHelper, jsonPath, Filter) {
        this.$onInit = function() {
            var ctrl = this;

            var subscriptionsBuilder = $api().subscriptionsSearchBuilder();

            if (ctrl.disableDefaultSorted !== false) {
                subscriptionsBuilder = subscriptionsBuilder.disableDefaultSorted();
            }
            if (ctrl.disableCaseSensitive) {
                subscriptionsBuilder = subscriptionsBuilder.disableCaseSensitive();
            }


            function _getFilter(oql) {
                var _json = Filter.parseQuery(oql);
                var _filter = jsonPath(_json, '$..value.filter')[0] || undefined;
                return _filter.and || ([_filter] || []);
            }

            ctrl.getSelectMatch = function(item) {
                if (!item) return item;
                var defaultPath = 'provision.subscription.identifier';
                var path = ctrl.uiSelectMatchPath || defaultPath;
                var match = jsonPath(item, '$..' + path + '._current.value');
                if (!match) {
                    match = jsonPath(item, '$..' + defaultPath + '._current.value');
                }
                return match[0];
            };

            var defaultQuickSearchFields = "provision.device.communicationModules[].subscription.identifier,device.communicationModules[].subscription.identifier";
            var defaultSpecificTypeSearchFields = "provision.device.communicationModules[].subscription.specificType, device.communicationModules[].subscription.specificType";

            function _getQuickSearchFields(search) {
                var _quickSearchFields = ctrl.quickSearchFields || defaultQuickSearchFields;
                var fields = _quickSearchFields.split(/[,|, ]+/);
                var filter = {
                    or: []
                };
                fields.forEach(function(field) {
                    var _condition;

                    if (ctrl.exactSearch) {
                        _condition = {
                            eq: {}
                        };
                        _condition.eq[field] = search;
                    } else {
                        _condition = {
                            like: {}
                        };
                        _condition.like[field] = search;
                    }

                    filter.or.push(_condition);
                });
                return filter;
            }


            function _getSpecificTypeSearchFields(specificType) {
                var _specificTypeSearchFields = ctrl.specificTypeSearchFields || defaultSpecificTypeSearchFields;
                var fields = _specificTypeSearchFields.split(/[,|, ]+/);
                var filter = {
                    or: [],
                    eq: {}
                };
                if (fields.length === 1) {
                    delete filter.or;
                    filter.eq[fields[0]] = specificType;
                } else {
                    delete filter.eq;
                    fields.forEach(function(field) {
                        var _eq = {
                            eq: {}
                        };
                        _eq.eq[field] = specificType;
                        filter.or.push(_eq);
                    });
                }
                return filter;
            }

            ctrl.ownConfig = {
                builder: subscriptionsBuilder.provisioned(),
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

                        filter.and.push(_getSpecificTypeSearchFields(ctrl.specificType));

                    }

                    if (ctrl.excludeDevices) {
                        if (filter && !filter.and) {
                            filter = {
                                'and': [filter]
                            };
                        } else if (!filter) {
                            filter = {
                                and: []
                            };
                        }

                        filter.and.push({
                            'eq': {
                                'resourceType': 'entity.subscription'
                            }
                        });
                    }
                    if (ctrl.organization && typeof ctrl.organization === 'string') {
                        if (filter && !filter.and) {
                            filter = {
                                'and': [filter]
                            };
                        } else if (!filter) {
                            filter = {
                                and: []
                            };
                        }

                        filter.and.push({
                            'eq': {
                                'provision.administration.organization': ctrl.organization
                            }
                        });
                    }
                    if (ctrl.channel && typeof ctrl.channel === 'string') {
                        if (filter && !filter.and) {
                            filter = {
                                'and': [filter]
                            };
                        } else if (!filter) {
                            filter = {
                                and: []
                            };
                        }

                        filter.and.push({
                            'eq': {
                                'provision.administration.channel': ctrl.channel
                            }
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
                customSelectors: $api().subscriptionsSearchBuilder().provisioned(),
                processingData: $entityExtractor.extractSubscriptions,
                specificType: ctrl.specificType,
                organization: ctrl.organization,
                channel: ctrl.channel,
                oql: ctrl.oql,
                quickSearchFields: ctrl.quickSearchFields,
                forceFilter: ctrl.forceFilter
            };

            ctrl.entitySelected = function($item, $model) {
                if (ctrl.multiple) {
                    var identifierTmp = [];

                    angular.forEach(ctrl.entity, function(entityTmp) {
                        identifierTmp.push(ctrl.getSelectMatch(entityTmp));
                    });

                    ctrl.ngModel = identifierTmp;
                } else {
                    ctrl.ngModel = ctrl.getSelectMatch($item);
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

            function _getOperationActionTemplate(operationSelected) {
                return {
                    title: $translate.instant('BUTTON.TITLE.EXECUTE_OPERATION'),
                    icon: 'glyphicon glyphicon-flash',
                    action: function() {
                        $doActions.executeModal('executeOperation', {
                            keys: jsonPath(ctrl.entity, '$..' + $jsonFinderHelper.subscription.provisioned.getPath('identifier') + '._current.value') || [],
                            entityType: 'SUBSCRIPTION',
                            operation: operationSelected ? operationSelected.trim().toUpperCase() : undefined
                        });
                    },
                    disable: function() {
                        return !ctrl.entity || ctrl.entity.length === 0;
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
                        $doActions.executeModal('createSubscription', {}, function(result) {
                            if (result && result.length > 0) {
                                ctrl.entity = !ctrl.entity ? [] : ctrl.entity;
                                ctrl.entity.push({
                                    provision: {
                                        administration: {
                                            identifier: {
                                                _current: {
                                                    value: result[0].identifier
                                                }
                                            }
                                        },
                                        subscription: {
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

            if (ctrl.required !== undefined) {
                ctrl.ngRequired = ctrl.required;
            }
            if (ctrl.disabled !== undefined) {
                ctrl.ngDisabled = ctrl.disabled;
            }


            ctrl.$onChanges = function(changesObj) {
                if (changesObj && changesObj.identifier) {
                    mapIdentifier(changesObj.identifier.currentValue);
                }
            };

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
                                        },
                                        subscription: {
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
                                },
                                subscription: {
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

angular.module('opengate-angular-js').component('customUiSelectSubscription', {

    templateUrl: 'custom-ui-select/views/custom.ui.select.subscription.html',
    controller: 'customUiSelectSubscriptionController',
    bindings: {
        onSelectItem: '&',
        onRemove: '&',
        entity: '=',
        specificType: '@',
        organization: '@',
        channel: '@',
        oql: '@',
        specificTypeSearchFields: '@',
        quickSearchFields: '@',
        exactSearch: '<',
        multiple: '<',
        ngRequired: '<',
        ngDisabled: '<',
        placeholder: '@',
        title: '@',
        required: '<',
        disabled: '<',
        excludeDevices: '=',
        actions: '=?',
        uiSelectMatchClass: '@?',
        identifier: '<?',
        ngModel: '=?',
        uiSelectMatchPath: '@?',
        disableDefaultSorted: '=?',
        disableCaseSensitive: '=?',
        forceFilter: '=?'
    }

})