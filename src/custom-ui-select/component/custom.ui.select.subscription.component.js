'use strict';


angular.module('opengate-angular-js').controller('customUiSelectSubscriptionController', ['$scope', '$element', '$attrs', '$api', '$entityExtractor', '$translate', '$doActions', '$jsonFinderHelper', 'jsonPath',
    function($scope, $element, $attrs, $api, $entityExtractor, $translate, $doActions, $jsonFinderHelper, jsonPath) {
        var ctrl = this;
        ctrl.ownConfig = {
            builder: $api().subscriptionsSearchBuilder().provisioned(),
            filter: function(search) {
                var filter = {
                    'or': [
                        { 'like': { 'provision.device.communicationModules[].subscription.identifier': search } },
                        { 'like': { 'device.communicationModules[].subscription.identifier': search } }
                    ]
                };
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
                if (ctrl.organization) {
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
                if (ctrl.channel) {
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

                return filter;
            },
            rootKey: 'devices',
            collection: [],
            customSelectors: $api().subscriptionsSearchBuilder().provisioned(),
            processingData: $entityExtractor.extractSubscriptions,
            specificType: ctrl.specificType,
            organization: ctrl.organization,
            channel: ctrl.channel
        };

        ctrl.entitySelected = function($item, $model) {
            var returnObj = {};
            returnObj.$item = $item;
            returnObj.$model = $model;
            ctrl.onSelectItem(returnObj);
        };

        ctrl.entityRemove = function($item, $model) {
            ctrl.onRemove($item, $model);
        };


        if (!ctrl.actions) {
            ctrl.actions = [{
                title: $translate.instant('BUTTON.TITLE.NEW_SUBSCRIPTION'),
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
        multiple: '<',
        ngRequired: '<',
        required: '<',
        excludeDevices: '=',
        action: '=?',
        uiSelectMatchClass: '@?'
    }

});