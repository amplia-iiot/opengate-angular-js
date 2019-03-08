'use strict';


angular.module('opengate-angular-js').controller('customUiSelectAssetController', ['$scope', '$element', '$attrs', '$api', '$doActions', '$translate', 'jsonPath', 'Filter',
    function($scope, $element, $attrs, $api, $doActions, $translate, jsonPath, Filter) {
        this.$onInit = function() {
            var ctrl = this;

            var assetsBuilder = $api().assetsSearchBuilder();

            if (ctrl.disableDefaultSorted !== false) {
                assetsBuilder = assetsBuilder.disableDefaultSorted();
            }

            if (ctrl.disableCaseSensitive) {
                assetsBuilder = assetsBuilder.disableCaseSensitive();
            }

            var defaultQuickSearchFields = "provision.administration.identifier, provision.asset.specificType, asset.specificType";
            var defaultSpecificTypeSearchFields = "provision.asset.specificType, asset.specificType";

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

            function _getFilter(oql) {
                var _json = Filter.parseQuery(oql);
                var _filter = jsonPath(_json, '$..value.filter')[0] || undefined;
                return _filter.and || ([_filter] || []);
            }

            ctrl.matchFields = {
                principal: 'provision.administration.identifier',
                extra: {
                    'FORM.LABEL.NAME': 'provision.asset.name',
                    'FORM.LABEL.SPECIFIC_TYPE': 'provision.asset.specificType'
                }
            };

            if (ctrl.uiSelectMatchFields) {
                if (ctrl.uiSelectMatchFields.principal) {
                    ctrl.fullInfo = true;
                    ctrl.matchFields.principal = ctrl.uiSelectMatchFields.principal;
                }

                if (ctrl.uiSelectMatchFields.extra) {
                    ctrl.fullInfo = true;
                    ctrl.matchFields.extra = ctrl.uiSelectMatchFields.extra;
                }
            }

            ctrl.showFieldInfo = function(path, data) {
                var match = jsonPath(data, '$..' + path + '._current.value');
                if (!match) {
                    return null;
                } else {
                    //return match.toString();
                    return match.filter(function(item, pos, self) {
                        return self.indexOf(item) == pos;
                    }).toString();
                }
            };

            if (!ctrl.fullInfo) {
                var selectBuilder = $api().newSelectBuilder();
                var SE = $api().SE;

                selectBuilder.add(SE.element('provision.administration.identifier', [{
                    field: 'value'
                }]));
                selectBuilder.add(SE.element('provision.administration.organization', [{
                    field: 'value'
                }]));
                selectBuilder.add(SE.element('provision.administration.channel', [{
                    field: 'value'
                }]));
                selectBuilder.add(SE.element('resourceType', [{
                    field: 'value'
                }]));
                selectBuilder.add(SE.element('provision.asset.identifier', [{
                    field: 'value'
                }]));
                selectBuilder.add(SE.element('provision.asset.name', [{
                    field: 'value'
                }]));
                selectBuilder.add(SE.element('provision.asset.specificType', [{
                    field: 'value'
                }]));

                assetsBuilder.select(selectBuilder);
            }

            ctrl.ownConfig = {
                builder: assetsBuilder,
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
                rootKey: 'assets',
                collection: [],
                customSelectors: $api().assetsSearchBuilder(),
                specificType: ctrl.specificType,
                forceFilter: ctrl.forceFilter
            };

            ctrl.assetSelected = function($item, $model) {
                if (ctrl.multiple) {
                    var identifierTmp = [];

                    angular.forEach(ctrl.asset, function(assetTmp) {
                        identifierTmp.push(assetTmp.provision.administration.identifier._current.value);
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

            ctrl.assetRemove = function($item, $model) {
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

            var uiSelectActionsDefinition = {
                create: {
                    title: $translate.instant('FORM.LABEL.NEW'),
                    icon: 'glyphicon glyphicon-plus-sign',
                    action: function() {
                        var actionData = {};
                        if (!!ctrl.specificType) {
                            actionData = {
                                resourceType: {
                                    _current: {
                                        value: 'entity.asset'
                                    }
                                },
                                provision: {
                                    asset: {
                                        specificType: {
                                            _current: {
                                                value: ctrl.specificType
                                            }
                                        }
                                    }
                                }
                            };
                        }
                        $doActions.executeModal('createAsset', actionData, function(result) {
                            if (result && result.length > 0) {
                                ctrl.asset = !ctrl.asset ? [] : ctrl.asset;
                                ctrl.asset.push({
                                    provision: {
                                        administration: {
                                            identifier: {
                                                _current: {
                                                    value: result[0].identifier
                                                }
                                            }
                                        },
                                        asset: {
                                            identifier: {
                                                _current: {
                                                    value: result[0].identifier
                                                }
                                            }
                                        }
                                    }
                                });

                                var assetFinder = $api().assetsSearchBuilder().disableDefaultSorted().filter({
                                    "and": [{
                                        "eq": {
                                            "provision.asset.identifier": result[0].identifier
                                        }
                                    }]
                                });

                                assetFinder.build().execute()
                                    .then(function(result) {
                                        if (result.statusCode === 204) {
                                            $translate('TOASTR.ENTITY_NOT_FOUND', {
                                                identifier: result[0].identifier
                                            }).
                                            then(function(translatedMessage) {
                                                toastr.error(translatedMessage);
                                            });
                                        } else {
                                            ctrl.assetSelected(result.data.assets[0], result.data.assets[0]);
                                        }
                                    })
                                    .catch(function(err) {
                                        $translate('TOASTR.CANNOT_GET_ENTITY_INFO').
                                        then(function(translatedMessage) {
                                            toastr.error(translatedMessage);
                                        });
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
                        case 'create':
                            finalAction = uiSelectActionsDefinition.create;
                            break;
                    }
                    finalAction.title = action.title || finalAction.title;
                    finalAction.icon = action.icon || finalAction.icon;
                    ctrl.uiSelectActions.push(finalAction);
                });

            }

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

            function mapIdentifier(identifierSrc) {
                var identifier = identifierSrc;
                if (identifier) {
                    if (identifier._current) {
                        identifier = identifier._current.value;
                    }

                    if (ctrl.multiple) {
                        if (angular.isArray(identifier)) {
                            ctrl.asset = [];

                            angular.forEach(identifier, function(idTmp) {
                                ctrl.asset.push({
                                    provision: {
                                        administration: {
                                            identifier: {
                                                _current: {
                                                    value: idTmp
                                                }
                                            }
                                        },
                                        asset: {
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
                        ctrl.asset = [{
                            provision: {
                                administration: {
                                    identifier: {
                                        _current: {
                                            value: ctrl.identifier
                                        }
                                    }
                                },
                                asset: {
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
                    ctrl.asset = [];
                }
            }
        };
    }
]);

angular.module('opengate-angular-js').component('customUiSelectAsset', {

    templateUrl: 'custom-ui-select/views/custom.ui.select.asset.html',
    controller: 'customUiSelectAssetController',
    bindings: {
        onSelectItem: '&',
        onRemove: '&',
        asset: '=',
        identifier: '<?',
        multiple: '<',
        ngRequired: '<',
        placeholder: '@',
        required: '<',
        label: '=',
        actions: '=?',
        specificType: '@?',
        disabled: '<?',
        ngModel: '=?',
        uiSelectMatchClass: '@?',
        uiSelectMatchFields: '=?',
        fullInfo: '=?',
        oql: '@',
        quickSearchFields: '@',
        exactSearch: '<',
        specificTypeSearchFields: '@',
        disableDefaultSorted: '=?',
        disableCaseSensitive: '=?',
        forceFilter: '=?'
    }

});