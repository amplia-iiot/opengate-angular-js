'use strict';


angular.module('opengate-angular-js').controller('customUiSelectChannelController', ['$scope', '$element', '$attrs', '$api', '$q',
    function($scope, $element, $attrs, $api, $q) {
        var ctrl = this;
        var firstLoad = ctrl.ngRequired || ctrl.required;
        var defaultQuickSearchFields = 'provision.channel.identifier,provision.channel.description';
        ctrl.organization = ctrl.organization === 'LOG.LOADING' && undefined;
        ctrl.channel = ctrl.channel || (ctrl.ngModel && ([_getChannel(ctrl.ngModel)]));

        function _getQuickSearchFields(search) {
            var _quickSerachFields = ctrl.quickSearchFields || defaultQuickSearchFields;
            var fields = _quickSerachFields.split(/[,|, ]+/);
            if (!ctrl.organization) {
                fields.push('provision.administration.organization');
            }
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

        ctrl.ownConfig = {
            builder: $api().channelsSearchBuilder(),
            filter: function(search) {
                var filter = _getQuickSearchFields(search);

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
            customSelectors: $api().channelsSearchBuilder(),
            processingData: function(result, channels) {
                if (firstLoad) {
                    var _selectedChannel = ctrl.channel && ctrl.channel.selected && ctrl.channel.selected.length === 1;
                    if (!_selectedChannel && ctrl.organization) {
                        ctrl.channel = channels.filter(function(channel) {
                            return channel.provision.administration.organization._current.value === ctrl.organization;
                        });
                    }

                    if (!ctrl.multiple) {
                        ctrl.channel = ctrl.channel.length > 1 ? undefined : [ctrl.channel[0]];
                    }

                    firstLoad = false;
                }

                var deferred = $q.defer();

                deferred.resolve(channels);

                return deferred.promise;
            }
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
            if (changesObj) {
                Object.keys(changesObj).forEach(function(key) {
                    switch (key) {
                        case 'identifier':
                            mapIdentifier(changesObj.identifier.currentValue);
                            break;
                        case 'organization':
                            var organization = changesObj.organization;
                            var currentValue = organization.currentValue && (Object.keys(organization.currentValue).length > 0 ? organization.currentValue : null);
                            var previousValue = organization.previousValue && (Object.keys(organization.previousValue).length > 0 ? organization.previousValue : null);
                            if (ctrl.organization || previousValue) {
                                if (currentValue !== previousValue) {
                                    ctrl.ngModel = undefined;
                                    ctrl.channel = [];
                                }
                            }
                            break;
                        default:
                            break;
                    }
                });
            }
        };

        if (ctrl.identifier) {
            mapIdentifier(ctrl.identifier);
        }

        function _getChannel(id) {
            var administration = {
                identifier: {
                    _current: {
                        value: id
                    }
                }
            };

            var channel = angular.copy(administration);

            if (ctrl.organization) {
                administration.organization = {
                    _current: {
                        value: ctrl.organization
                    }
                };
            }

            administration.channel = channel;

            return {
                provision: {
                    administration: administration
                }
            };
        }

        function mapIdentifier(identifierSrc) {
            var identifier = identifierSrc;
            ctrl.channel = [];
            if (identifier) {
                if (identifier._current) {
                    identifier = identifier._current.value;
                }
                if (ctrl.multiple) {
                    if (angular.isArray(identifier)) {
                        angular.forEach(identifier, function(idTmp) {
                            ctrl.channel.push(_getChannel(idTmp));
                        });
                    }
                } else {
                    ctrl.channel.push(_getChannel(identifier));
                }
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
        disabled: '<?',
        ngModel: '=?',
        uiSelectMatchClass: '@?'
    }

});