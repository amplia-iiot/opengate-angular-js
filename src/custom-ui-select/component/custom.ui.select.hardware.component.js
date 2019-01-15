'use strict';


angular.module('opengate-angular-js').controller('customUiSelectHardwareController', ['$scope', '$element', '$attrs', '$api', '$q',
    function($scope, $element, $attrs, $api, $q) {
        this.$onInit = function() {
            var ctrl = this;
            ctrl.hardware = ctrl.hardware || (ctrl.ngModel && [ctrl.ngModel]);
            ctrl.ownConfig = {
                builder: $api().hardwaresSearchBuilder(),
                filter: function(search) {
                    return {
                        'or': [{
                                'like': {
                                    'modelName': search
                                }
                            },
                            {
                                'like': {
                                    'modelVersion': search
                                }
                            },
                            {
                                'like': {
                                    'manufacturerName': search
                                }
                            }
                        ]
                    };
                },
                rootKey: 'hardwares',
                collection: [],
                customSelectors: $api().hardwaresSearchBuilder(),
                processingData: function(data, collection) {
                    try {
                        return $q(function(C_ok, reject) {
                            collection = [];
                            if (typeof data.data.hardware !== 'undefined') {
                                angular.copy(data.data.hardware, collection);
                            } else if (typeof data.data.manufacturer !== 'undefined') {
                                data.data.manufacturer.forEach(function(manuf) {
                                    var manuf_name = manuf.name;
                                    var manuf_id = manuf.id;
                                    if (manuf.models) {
                                        manuf.models.forEach(function(model) {
                                            var model_name = model.name;
                                            var id = model.id;
                                            var model_version = model.version;
                                            var _model = {
                                                name: model_name,
                                                manufacturer: manuf_name,
                                                version: model_version
                                            };
                                            if (ctrl.fullResult) {
                                                _model.id = id;
                                                _model.manufacturerId = manuf_id;
                                            }
                                            collection.push(_model);
                                        });
                                    }
                                });
                            } else {
                                reject('OGAPI->API-WS: Incompatible hardware catalog searching.');
                            }
                            C_ok(collection);
                        });
                    } catch (err) {
                        console.log(err);
                    }
                }
            };

            ctrl.hardwareSelected = function($item, $model) {
                var _$item = ctrl.ngModel = $item;
                if (!ctrl.multiple) {
                    _$item = ctrl.ngModel = $item;
                }

                if (ctrl.onSelectItem) {
                    var returnObj = {};
                    returnObj.$item = _$item;
                    returnObj.$model = $model;
                    ctrl.onSelectItem(returnObj);
                }
            };

            ctrl.hardwareRemove = function($item, $model) {
                var _$item = ctrl.ngModel = $item;
                if (!ctrl.multiple) {
                    _$item = ctrl.ngModel = undefined;
                }

                if (ctrl.onRemove) {
                    var returnObj = {};
                    returnObj.$item = _$item;
                    returnObj.$model = $model;
                    ctrl.onRemove(returnObj);
                }

            };


            ctrl.$onChanges = function(changesObj) {
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
                            ctrl.hardware = [];

                            angular.forEach(identifier, function(idTmp) {
                                ctrl.hardware.push(idTmp);
                            });
                        }

                    } else {
                        ctrl.hardware = [ctrl.identifier];
                    }
                } else {
                    ctrl.hardware = [];
                }
            }
        };
    }
]);

angular.module('opengate-angular-js').component('customUiSelectHardware', {

    templateUrl: 'custom-ui-select/views/custom.ui.select.hardware.html',
    controller: 'customUiSelectHardwareController',
    bindings: {
        onSelectItem: '&',
        onRemove: '&',
        hardware: '=?',
        identifier: '<?',
        multiple: '<',
        ngRequired: '<',
        label: '<',
        disabled: '<?',
        ngModel: '=?',
        title: '@',
        uiSelectMatchClass: '@?',
        fullResult: '<?'
    }

});