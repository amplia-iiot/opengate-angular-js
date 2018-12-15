'use strict';


angular.module('opengate-angular-js').controller('customUiSelectSubscriptionController', ['$scope', '$element', '$attrs', '$api', '$entityExtractor', '$translate', '$doActions', '$jsonFinderHelper', 'jsonPath', 'Filter',
    function($scope, $element, $attrs, $api, $entityExtractor, $translate, $doActions, $jsonFinderHelper, jsonPath, Filter) {
        var ctrl = this;
        var defaultQuickSearchFields = "provision.device.communicationModules[].subscription.identifier, device.communicationModules[].subscription.identifier";

        function _getQuickSearchFields(search) {
            var _quickSerachFields = ctrl.quickSearchFields || defaultQuickSearchFields;
            var fields = _quickSerachFields.split(/[,|, ]+/);
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

        ctrl.ownConfig = {
            builder: $api().subscriptionsSearchBuilder().provisioned().disableDefaultSorted(),
            filter: function(search) {
                var filter;

                if (search) {
                    filter = {
                        'or': [
                            { 'like': { 'provision.device.communicationModules[].subscriber.identifier': search } },
                            { 'like': { 'device.communicationModules[].subscriber.identifier': search } },
                            { 'like': { 'provision.device.communicationModules[].subscriber.mobile.icc': search } }
                        ]
                    };
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
                                    'device.communicationModules[].subscription.specificType': ctrl.specificType
                                }
                            },
                            {
                                'eq': {
                                    'provision.device.communicationModules[].subscription.specificType': ctrl.specificType
                                }
                            }
                        ]
                    });
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
            quickSearchFields: ctrl.quickSearchFields
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
        quickSearchFields: '@',
        multiple: '<',
        ngRequired: '<',
        placeholder: '@',
        title: '@',
        required: '<',
        excludeDevices: '=',
        actions: '=?',
        uiSelectMatchClass: '@?',
        identifier: '<?',
        ngModel: '=?',
        uiSelectMatchPath: '@?'
    }

});