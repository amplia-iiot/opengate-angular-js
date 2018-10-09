'use strict';


angular.module('opengate-angular-js').controller('customUiSelectSubscriberController', ['$scope', '$element', '$attrs', '$api', '$entityExtractor',
    function($scope, $element, $attrs, $api, $entityExtractor) {

        var ctrl = this;
        ctrl.ownConfig = {
            builder: $api().subscribersSearchBuilder().provisioned(),
            filter: function(search) {
                var filter = {
                    'or': [
                        { 'like': { 'provision.device.communicationModules[].subscriber.identifier': search } },
                        { 'like': { 'device.communicationModules[].subscriber.identifier': search } },
                        { 'like': { 'provision.device.communicationModules[].subscriber.mobile.icc': search } }
                    ]
                };
                if (!!ctrl.specificType) {
                    filter = {
                        'and': [
                            filter,
                            {
                                'or': [{
                                        'eq': {
                                            'device.communicationModules[].subscriber.specificType': ctrl.specificType
                                        }
                                    },
                                    {
                                        'eq': {
                                            'provision.device.communicationModules[].subscriber.specificType': ctrl.specificType
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
                                'resourceType': 'entity.subscriber'
                            }
                        });
                    } else {
                        filter = {
                            'and': [
                                filter,
                                {
                                    'eq': {
                                        'resourceType': 'entity.subscriber'
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
            customSelectors: $api().subscribersSearchBuilder().provisioned(),
            processingData: $entityExtractor.extractSubscribers,
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

        if (ctrl.required !== undefined) {
            ctrl.ngRequired = ctrl.required;
        }
    }
]);

angular.module('opengate-angular-js').component('customUiSelectSubscriber', {

    templateUrl: 'custom-ui-select/views/custom.ui.select.subscriber.html',
    controller: 'customUiSelectSubscriberController',
    bindings: {
        onSelectItem: '&',
        onRemove: '&',
        entity: '=',
        organization: '@',
        channel: '@',
        specificType: '@',
        multiple: '<',
        ngRequired: '<',
        required: '<',
        excludeDevices: '=',
        uiSelectMatchClass: '@?'
    }

});