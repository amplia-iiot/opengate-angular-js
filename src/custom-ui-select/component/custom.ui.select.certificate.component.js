'use strict';


angular.module('opengate-angular-js').controller('customUiSelectCertificateController', ['$scope', '$element', '$attrs', '$api',
    function ($scope, $element, $attrs, $api) {
        var ctrl = this;
        ctrl.certificate = ctrl.certificate || (ctrl.ngModel && [ctrl.ngModel]);
        var builder = $api().certificatesSearchBuilder().assignable();
        ctrl.ownConfig = {
            builder: builder,
            filter: function (search) {
                return {
                    'or': [{
                            'like': {
                                'certificateName': search
                            }
                        },
                        {
                            'like': {
                                'certificateVersion': search
                            }
                        },
                        {
                            'like': {
                                'certificateId': search
                            }
                        },
                        {
                            'like': {
                                'certificateAdministrativeState': search
                            }
                        },
                        {
                            'like': {
                                'certificateSerialNumber': search
                            }
                        },
                        {
                            'like': {
                                'certificateValidFrom': search
                            }
                        }
                    ]
                };
            },
            rootKey: 'certificates',
            collection: [],
            customSelectors: builder
        };

        ctrl.certificateSelected = function ($item, $model) {
            if (ctrl.multiple) {
                var identifierTmp = [];

                angular.forEach(ctrl.certificate, function (sgTmp) {
                    if (sgTmp.id) {
                        identifierTmp.push(sgTmp.id);
                    } else {
                        identifierTmp.push(sgTmp);
                    }
                });

                ctrl.ngModel = identifierTmp;
            } else {
                ctrl.ngModel = $item.id;
            }

            if (ctrl.onSelectItem) {
                var returnObj = {};
                returnObj.$item = $item;
                returnObj.$model = $model;
                ctrl.onSelectItem(returnObj);
            }
        };

        ctrl.certificateRemove = function ($item, $model) {
            if (ctrl.onRemove) {
                var returnObj = {};
                returnObj.$item = $item;
                returnObj.$model = $model;
                ctrl.onRemove(returnObj);
            }

            if (ctrl.multiple) {
                if (ctrl.ngModel && ctrl.ngModel.indexOf($item.id) !== -1) {
                    ctrl.ngModel.splice(ctrl.ngModel.indexOf($item.id), 1);
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
                        ctrl.certificate = [];

                        angular.forEach(identifier, function (idTmp) {
                            ctrl.certificate.push(idTmp);
                        });
                    }

                } else {
                    ctrl.certificate = [ctrl.identifier];
                }
            } else {
                ctrl.certificate = [];
            }
        }
    }
]);

angular.module('opengate-angular-js').component('customUiSelectCertificate', {

    templateUrl: 'custom-ui-select/views/custom.ui.select.certificate.html',
    controller: 'customUiSelectCertificateController',
    bindings: {
        onSelectItem: '&',
        onRemove: '&',
        certificate: '=',
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