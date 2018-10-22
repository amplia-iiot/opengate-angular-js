'use strict';


angular.module('opengate-angular-js').controller('customUiSelectChannelController', ['$scope', '$element', '$attrs', '$api',
    function($scope, $element, $attrs, $api) {
        var ctrl = this;
        ctrl.ownConfig = {
            builder: $api().channelsSearchBuilder(),
            filter: function(search) {
                var filter = {
                    'or': [{
                        'like': {
                            'provision.channel.identifier': search
                        }
                    }, {
                        'like': {
                            'provision.channel.description': search
                        }
                    }, {
                        'like': {
                            'provision.administration.organization': search
                        }
                    }]
                };

                if (!!ctrl.organization) {
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

                return filter;
            },
            rootKey: 'channels',
            collection: [],
            customSelectors: $api().channelsSearchBuilder()
        };

        ctrl.channelSelected = function($item, $model) {
            if (ctrl.multiple) {
                var identifierTmp = [];

                angular.forEach(ctrl.channel, function(channelTmp) {
                    identifierTmp.push(channelTmp.provision.administration.identifier._current.value);
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

        ctrl.channelRemove = function($item, $model) {
            if (ctrl.onRemove) {
                ctrl.onRemove($item, $model);
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
            if (changesObj) {
                if (changesObj.identifier) {
                    mapIdentifier(changesObj.identifier.currentValue);
                }

                if (changesObj.organization) {
                    ctrl.ngModel = undefined;
                    ctrl.channel = [];
                }
            }
        };

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
                        ctrl.channel = [];

                        angular.forEach(identifier, function(idTmp) {
                            ctrl.channel.push({
                                provision: {
                                    administration: {
                                        identifier: {
                                            _current: {
                                                value: idTmp
                                            }
                                        },
                                        organization: {
                                            _current: {
                                                value: ctrl.organization
                                            }
                                        }
                                    },
                                    channel: {
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
                    ctrl.channel = [{
                        provision: {
                            administration: {
                                identifier: {
                                    _current: {
                                        value: identifier
                                    }
                                },
                                organization: {
                                    _current: {
                                        value: ctrl.organization
                                    }
                                }
                            },
                            channel: {
                                identifier: {
                                    _current: {
                                        value: identifier
                                    }
                                }
                            }
                        }
                    }];
                }
            } else {
                ctrl.channel = [];
            }
        }
    }
]);

angular.module('opengate-angular-js').component('customUiSelectChannel', {

    templateUrl: 'custom-ui-select/views/custom.ui.select.channel.html',
    controller: 'customUiSelectChannelController',
    bindings: {
        onSelectItem: '&',
        onRemove: '&',
        channel: '=',
        organization: '<?',
        identifier: '<?',
        multiple: '<',
        ngRequired: '<',
        label: '<',
        action: '<?',
        disabled: '<?',
        ngModel: '=?',
        uiSelectMatchClass: '@?'
    }

});