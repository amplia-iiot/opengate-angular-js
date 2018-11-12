'use strict';


angular.module('opengate-angular-js').controller('customUiSelectServiceGroupController', ['$scope', '$element', '$attrs', '$api', '$q',
    function ($scope, $element, $attrs, $api, $q) {
        var ctrl = this;
        ctrl.serviceGroup = ctrl.serviceGroup || (ctrl.ngModel && [ctrl.ngModel]);
        var firstLoad = ctrl.ngRequired || ctrl.required;
        var builder = $api().serviceGroupSearchBuilder();
        if (!!ctrl.entityType && ctrl.entityType.toUpperCase() !== 'DEVICE') {
            builder.withEntityType(ctrl.entityType.toUpperCase());
        } else {
            builder.withEntityType('GATEWAY');
        }

        var savedSearch;
        ctrl.ownConfig = {
            builder: builder,
            filter: function (search) {
                savedSearch = search;
            },
            rootKey: 'serviceGroups',
            collection: [],
            simpleMode: true,
            customSelectors: builder,
            processingData: function (result, serviceGroups) {

                if (firstLoad) {
                    var _selectedServiceGroup = ctrl.serviceGroup && ctrl.serviceGroup.length === 1;
                    if (!_selectedServiceGroup) {
                        var item = {
                            name: serviceGroups.indexOf('emptyServiceGroup') === -1 ? ctrl.serviceGroup[0] : 'emptyServiceGroup'
                        };
                        ctrl.serviceGroup = [item];
                    }
                    firstLoad = false;
                }

                var serviceGroupsFormatted = serviceGroups.map(function (item) {
                    return {
                        name: item
                    };
                });

                if (savedSearch) {
                    serviceGroupsFormatted = serviceGroupsFormatted.filter(function (tmp) {
                        return tmp.name.toLowerCase().indexOf(savedSearch.trim().toLowerCase()) !== -1;
                    });
                }

                var deferred = $q.defer();

                deferred.resolve(serviceGroupsFormatted);

                return deferred.promise;
            }
        };

        ctrl.serviceGroupSelected = function ($item, $model) {
            if (ctrl.multiple) {
                var identifierTmp = [];

                angular.forEach(ctrl.serviceGroup, function (sgTmp) {
                    identifierTmp.push(sgTmp.name);
                });

                ctrl.ngModel = identifierTmp;
            } else {
                ctrl.ngModel = $item.name;
            }

            if (ctrl.onSelectItem) {
                var returnObj = {};
                returnObj.$item = $item;
                returnObj.$model = $model;
                ctrl.onSelectItem(returnObj);
            }
        };

        ctrl.serviceGroupRemove = function ($item, $model) {
            if (ctrl.onRemove) {
                var returnObj = {};
                returnObj.$item = $item;
                returnObj.$model = $model;
                ctrl.onRemove(returnObj);
            }

            if (ctrl.multiple) {
                if (ctrl.ngModel && ctrl.ngModel.indexOf($item.name) !== -1) {
                    ctrl.ngModel.splice(ctrl.ngModel.indexOf($item.name), 1);
                }
            } else {
                ctrl.ngModel = undefined;
            }
        };


        ctrl.$onChanges = function (changesObj) {
            if (changesObj && changesObj.identifier) {
                mapIdentifier(changesObj.identifier.currentValue);
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
                        ctrl.serviceGroup = [];

                        angular.forEach(identifier, function (idTmp) {
                            ctrl.serviceGroup.push({
                                name: idTmp
                            });
                        });
                    }

                } else {
                    ctrl.serviceGroup = [{
                        name: ctrl.identifier
                    }];
                }
            } else {
                ctrl.serviceGroup = [];
            }
        }
    }
]);

angular.module('opengate-angular-js').component('customUiSelectServiceGroup', {

    templateUrl: 'custom-ui-select/views/custom.ui.select.servicegroup.html',
    controller: 'customUiSelectServiceGroupController',
    bindings: {
        onSelectItem: '&',
        onRemove: '&',
        serviceGroup: '=',
        entityType: '<?',
        identifier: '<?',
        multiple: '<',
        ngRequired: '<',
        label: '<',
        disabled: '<?',
        ngModel: '=?',
        uiSelectMatchClass: '@?'
    }

});