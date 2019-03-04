'use strict';


angular.module('opengate-angular-js').controller('customUiSelectSubscriberController', ['$scope', '$element', '$attrs', '$api', '$entityExtractor',
    function($scope, $element, $attrs, $api, $entityExtractor) {
        this.$onInit = function() {
            var ctrl = this;

            var subscriberBuilder = $api().subscribersSearchBuilder().provisioned();

            if (ctrl.disableDefaultSorted) {
                subscriberBuilder = subscriberBuilder.disableDefaultSorted();
            }
            ctrl.ownConfig = {
                builder: subscriberBuilder,
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
                                        'device.communicationModules[].subscriber.specificType': ctrl.specificType
                                    }
                                },
                                {
                                    'eq': {
                                        'provision.device.communicationModules[].subscriber.specificType': ctrl.specificType
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
                                'resourceType': 'entity.subscriber'
                            }
                        });

                    }

                    if (ctrl.organization) {
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

                    if (ctrl.channel) {
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
                var returnObj = {};
                returnObj.$item = $item;
                returnObj.$model = $model;
                ctrl.onRemove(returnObj);
            };

            if (ctrl.required !== undefined) {
                ctrl.ngRequired = ctrl.required;
            }
        };
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
        disableDefaultSorted: '=?',
        uiSelectMatchClass: '@?'
    }

});