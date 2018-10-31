'use strict';


angular.module('opengate-angular-js').controller('customUiSelectHardwareController', ['$scope', '$element', '$attrs', '$api', '$q',
    function($scope, $element, $attrs, $api, $q) {
        var ctrl = this;

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
                                if (manuf.models) {
                                    manuf.models.forEach(function(model) {
                                        var model_name = model.name;
                                        var id = model.id;
                                        var model_version = model.version;
                                        collection.push({
                                            id: id,
                                            model: {
                                                name: model_name,
                                                version: model_version
                                            },
                                            manufacturer: {
                                                name: manuf_name
                                            }
                                        });
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
            if (ctrl.multiple) {
                var identifierTmp = [];

                angular.forEach(ctrl.hardware, function(sgTmp) {
                    if (sgTmp.id) {
                        identifierTmp.push({
                            name: sgTmp.model.name,
                            manufacturer: sgTmp.manufacturer.name,
                            version: sgTmp.model.version
                        });
                    } else {
                        identifierTmp.push(sgTmp);
                    }
                });

                ctrl.ngModel = identifierTmp;
            } else {
                ctrl.ngModel = {
                    name: $item.model.name,
                    manufacturer: $item.manufacturer.name,
                    version: $item.model.version
                };
            }

            if (ctrl.onSelectItem) {
                var returnObj = {};
                returnObj.$item = $item;
                returnObj.$model = $model;
                ctrl.onSelectItem(returnObj);
            }
        };

        ctrl.hardwareRemove = function($item, $model) {
            if (ctrl.onRemove) {
                var returnObj = {};
                returnObj.$item = $item;
                returnObj.$model = $model;
                ctrl.onRemove(returnObj);
            }

            if (ctrl.multiple) {
                if (ctrl.hardware && ctrl.hardware.length > 0) {
                    var identifierTmp = [];

                    angular.forEach(ctrl.hardware, function(sgTmp) {
                        if (sgTmp.id) {
                            identifierTmp.push({
                                name: sgTmp.model.name,
                                manufacturer: sgTmp.manufacturer.name,
                                version: sgTmp.model.version
                            });
                        } else {
                            identifierTmp.push(sgTmp);
                        }
                    });

                    ctrl.ngModel = identifierTmp;
                } else {
                    ctrl.ngModel = undefined;
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
    }
]);

angular.module('opengate-angular-js').component('customUiSelectHardware', {

    templateUrl: 'custom-ui-select/views/custom.ui.select.hardware.html',
    controller: 'customUiSelectHardwareController',
    bindings: {
        onSelectItem: '&',
        onRemove: '&',
        hardware: '=',
        identifier: '<?',
        multiple: '<',
        ngRequired: '<',
        label: '<',
        action: '<?',
        disabled: '<?',
        ngModel: '=?',
        title: '@',
        uiSelectMatchClass: '@?'
    }

});