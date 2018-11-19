'use strict';


angular.module('opengate-angular-js').controller('customUiSelectAssetController', ['$scope', '$element', '$attrs', '$api', '$doActions', '$translate', 'jsonPath', 'Filter',
    function($scope, $element, $attrs, $api, $doActions, $translate, jsonPath, Filter) {

        var ctrl = this;

        var defaultQuickSearchFields = "provision.administration.identifier, provision.asset.specificType, asset.specificType";

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


        ctrl.ownConfig = {
            builder: $api().assetsSearchBuilder().select(selectBuilder),
            filter: function(search) {
                var filter = _getQuickSearchFields(search);

                if (!!ctrl.specificType) {
                    filter = {
                        'and': [
                            filter,
                            {
                                'or': [{
                                        'eq': {
                                            'asset.specificType': ctrl.specificType
                                        }
                                    },
                                    {
                                        'eq': {
                                            'provision.asset.specificType': ctrl.specificType
                                        }
                                    }
                                ]
                            }
                        ]
                    };
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
            rootKey: 'assets',
            collection: [],
            customSelectors: $api().assetsSearchBuilder(),
            specificType: ctrl.specificType
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

                            var assetFinder = $api().assetsSearchBuilder().filter({
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
        oql: '@',
        quickSearchFields: '@'
    }

});