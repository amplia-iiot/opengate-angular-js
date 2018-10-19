'use strict';


angular.module('opengate-angular-js').controller('customUiSelectDatastreamController', ['$api', '$q', 'Authentication', function($api, $q, Authentication) {
    var ctrl = this;
    ctrl.ownConfig = {
        builder: $api().datamodelsSearchBuilder(),
        limit: 5,
        filter: function(search) {
            ctrl.lastSearch = search;

            var finalFilter = {};
            if (ctrl.resourceTypes && angular.isArray(ctrl.resourceTypes) && ctrl.resourceTypes.length > 0) {
                finalFilter.and = [{ in: {
                        'datamodels.allowedResourceTypes': ctrl.resourceTypes
                    }
                }];
            }
            if (ctrl.organization && ctrl.organization.length > 0) {
                if (!finalFilter.and) {
                    finalFilter.and = [];
                }
                finalFilter.and.push({
                    'eq': {
                        'datamodels.organizationName': ctrl.organization
                    }
                });
            }

            if (!search) {
                if (Authentication && Authentication.user && Authentication.user.domain && (!ctrl.organization || ctrl.organization.length <= 0)) {
                    if (!finalFilter.and) {
                        finalFilter.and = [];
                    }

                    finalFilter.and.push({
                        'eq': {
                            'datamodels.organizationName': Authentication.user.domain
                        }
                    });
                }
                return finalFilter;
            } else {
                var quickSearchFilter = {
                    'or': [{
                            'like': {
                                'datamodels.categories.datastreams.identifier': search
                            }
                        },
                        {
                            'like': {
                                'datamodels.categories.datastreams.name': search
                            }
                        },
                        {
                            'like': {
                                'datamodels.identifier': search
                            }
                        },
                        {
                            'like': {
                                'datamodels.name': search
                            }
                        },
                        {
                            'like': {
                                'datamodels.description': search
                            }
                        },
                        {
                            'like': {
                                'datamodels.version': search
                            }
                        }
                    ]
                };

                if (finalFilter.and) {
                    finalFilter.and.push(quickSearchFilter);
                } else {
                    return quickSearchFilter;
                }
                return finalFilter;
            }


        },
        rootKey: 'datamodels',
        collection: [],
        processingData: function(data, collection) {
            return $q(function(C_ok) {
                var _datastreams = [];
                var datamodels = data.data.datamodels;
                angular.forEach(datamodels, function(datamodel, key) {
                    var categories = datamodel.categories;
                    var _datamodel = {
                        identifier: datamodel.identifier,
                        description: datamodel.description,
                        name: datamodel.name,
                        organization: datamodel.organizationName
                    };
                    angular.forEach(categories, function(category, key) {
                        var datastreams = category.datastreams;
                        if (datastreams) {
                            var _category = {
                                identifier: category.identifier
                            };
                            angular.forEach(datastreams
                                .filter(function(ds) {
                                    return (ds.identifier.toLowerCase().indexOf(ctrl.lastSearch.toLowerCase()) > -1 && !!ctrl.lastSearch.length) || !ctrl.lastSearch;
                                }),
                                function(datastream, key) {
                                    var _datastream = angular.copy(datastream);
                                    _datastream.datamodel = _datamodel;
                                    _datastream.category = _category;

                                    if (ctrl.postFilter) {
                                        var filter = ctrl.postFilter(_datastream);

                                        if (!filter) {
                                            _datastreams.push(_datastream);
                                        }
                                    } else {
                                        _datastreams.push(_datastream);
                                    }
                                });
                        }
                    });
                });
                angular.copy(_datastreams, collection);
                C_ok(collection);
            });
        },
        customSelectors: $api().datamodelsSearchBuilder()
    };

    ctrl.datastreamSelected = function($item, $model) {
        if (ctrl.multiple) {
            var identifierTmp = ctrl.ngModel || [];

            angular.forEach(ctrl.datastream, function(datastreamTmp) {
                identifierTmp.push(datastreamTmp.identifier);
            });

            ctrl.ngModel = identifierTmp;
        } else {
            ctrl.ngModel = $item.identifier;
        }

        if (ctrl.onSelectItem) {
            var returnObj = {};
            returnObj.$item = $item;
            returnObj.$model = $model;
            ctrl.onSelectItem(returnObj);
        }
    };

    ctrl.datastreamRemove = function($item, $model) {
        if (ctrl.onRemove) {
            var returnObj = {};
            returnObj.$item = $item;
            returnObj.$model = $model;
            ctrl.onRemove(returnObj);
        }

        if (ctrl.multiple) {
            if (ctrl.ngModel && ctrl.ngModel.indexOf($item.identifier) !== -1) {
                ctrl.ngModel.splice(ctrl.ngModel.indexOf($item.identifier), 1);
            }
        } else {
            ctrl.ngModel = undefined;
        }
    };

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
                    ctrl.datastream = [];

                    angular.forEach(identifier, function(idTmp) {
                        ctrl.datastream.push({
                            identifier: idTmp

                        });
                    });
                }
            } else {
                ctrl.datastream = [{
                    identifier: ctrl.identifier

                }];
            }
        } else {
            ctrl.datastream = [];
        }
    }

    if (!ctrl.maxResults) {
        ctrl.maxResults = 100;
    }
}]);

angular.module('opengate-angular-js').component('customUiSelectDatastream', {
    templateUrl: 'custom-ui-select/views/custom.ui.select.datastream.html',
    controller: 'customUiSelectDatastreamController',
    bindings: {
        onSelectItem: '&',
        onRemove: '&',
        datastream: '=',
        multiple: '<',
        maxResults: '<',
        ngRequired: '<',
        required: '<',
        postFilter: '<',
        resourceTypes: '=',
        organization: '=',
        placeholder: '=',
        uiSelectMatchClass: '@?',
        identifier: '<?',
        ngModel: '=?'
    }
});