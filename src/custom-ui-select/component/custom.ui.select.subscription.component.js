'use strict';


angular.module('opengate-angular-js').controller('customUiSelectSubscriptionController', ['$scope', '$element', '$attrs', '$api', '$entityExtractor', '$translate', '$doActions', '$jsonFinderHelper', 'jsonPath', 'Filter',
    function($scope, $element, $attrs, $api, $entityExtractor, $translate, $doActions, $jsonFinderHelper, jsonPath, Filter) {
        var ctrl = this;
        var defaultQuickSearchFields = "provision.device.communicationModules[].subscription.identifier, device.communicationModules[].subscription.identifier";

        function _getQuickSerachFields(search) {
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
        ctrl.ownConfig = {
            builder: $api().subscriptionsSearchBuilder().provisioned(),
            filter: function(search) {
                var filter = _getQuickSerachFields(search);
                if (!!ctrl.specificType) {
                    filter = {
                        'and': [
                            filter,
                            {
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
                            }
                        ]
                    };
                }

                if (ctrl.excludeDevices) {
                    if (filter.and) {
                        filter.and.push({
                            'eq': {
                                'resourceType': 'entity.subscription'
                            }
                        });
                    } else {
                        filter = {
                            'and': [
                                filter,
                                {
                                    'eq': {
                                        'resourceType': 'entity.subscription'
                                    }
                                }
                            ]
                        };
                    }
                }
                if (ctrl.organization && typeof ctrl.organization === 'string') {
                    if (filter.and) {
                        filter.and.push({
                            'eq': {
                                'provision.administration.organization': ctrl.organization
                            }
                        });
                    } else {
                        filter = {
                            'and': [
                                filter,
                                {
                                    'eq': {
                                        'provision.administration.organization': ctrl.organization
                                    }
                                }
                            ]
                        };
                    }
                }
                if (ctrl.channel && typeof ctrl.channel === 'string') {
                    if (filter.and) {
                        filter.and.push({
                            'eq': {
                                'provision.administration.channel': ctrl.channel
                            }
                        });
                    } else {
                        filter = {
                            'and': [
                                filter,
                                {
                                    'eq': {
                                        'provision.administration.channel': ctrl.channel
                                    }
                                }
                            ]
                        };
                    }
                }
                if (ctrl.oql) {
                    var _oql = _getFilter(ctrl.oql);
                    if (!filter.and)
                        filter = {
                            and: [filter]
                        };
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
            var returnObj = {};
            returnObj.$item = $item;
            returnObj.$model = $model;
            ctrl.onSelectItem(returnObj);
        };

        ctrl.entityRemove = function($item, $model) {
            var returnObj = {};
            returnObj.$item = $item;
            returnObj.$model = $model;
            ctrl.onRemove(returnObj);
        };


        if (!ctrl.actions) {
            ctrl.actions = [{
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
            }, {
                title: $translate.instant('BUTTON.TITLE.EXECUTE_OPERATION'),
                icon: 'glyphicon glyphicon-flash',
                action: function() {
                    $doActions.executeModal('executeOperation', {
                        keys: jsonPath(ctrl.entity, '$..' + $jsonFinderHelper.subscription.provisioned.getPath('identifier') + '._current.value') || [],
                        entityType: 'SUBSCRIPTION'
                    });
                },
                disable: function() {
                    return !ctrl.entity || ctrl.entity.length === 0;
                },
                permissions: 'executeOperation'
            }];
        }

        if (ctrl.required !== undefined) {
            ctrl.ngRequired = ctrl.required;
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
        action: '=?',
        uiSelectMatchClass: '@?'
    }

});