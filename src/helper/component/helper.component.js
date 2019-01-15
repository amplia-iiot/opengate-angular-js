/**
 * Created by Monica on 12/09/2016.
 */
'use strict';

var _wizard = angular.module('opengate-angular-js');

_wizard.controller('helperDialogController', ['$scope', '$element', '$attrs', '$uibModal', function($scope, $element, $attrs, $uibModal) {
    var $helper = this;
    var style = angular.element('<style title="helper-dialog-style">' +
        'helper-dialog .row-eq-height,.helper-dialog .row-eq-height {display: -webkit-box;display: -webkit-flex;display: -ms-flexbox;display: flex;}' +
        'helper-dialog .vcenter,.helper-dialog .vcenter {display: -webkit-box;display: -webkit-flex;display: -ms-flexbox;display: flex;flex-direction: column;justify-content: center;}' +
        '.helper-dialog .top-buffer {margin-top: 25px;}' +
        '.helper-dialog .custom-ui-select-label {display: none;}' +
        '.helper-dialog .without-padding-top .form-group {margin-top: 0 !important;}' +
        '.helper-dialog .without-padding-top.modal-body h4 {padding-bottom: 0px;}' +
        '</style>');

    var head = angular.element('html head');
    if (head.find('style[title="helper-dialog-style"]').length === 0)
        head.append(style);

    $helper.mode = 'default';
    if ($helper.helperTitle) {
        $helper.mode = 'title';
        if ($helper.helperButton) {
            $helper.mode = 'title_button';
        }
    } else if ($helper.helperButton) {
        $helper.mode = 'button';
    }

    $helper.open = function() {

        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'helper.view.modal.html',
            controller: 'helperDialogModalController',
            controllerAs: '$ctrl',
            windowClass: 'helper-dialog',
            resolve: {
                helper_id: function() {
                    if ($helper.componentsIds && $helper.componentsIds.length === 1) {
                        return $helper.componentsIds[0];
                    } else {
                        return $helper.helperId;
                    }
                },
                helper_exclusive: function() {
                    return $helper.helperExclusive === 'true';
                },
                specific_type: function() {
                    return $helper.specificType;
                },
                organization: function() {
                    return $helper.organization;
                },
                channel: function() {
                    return $helper.channel;
                },
                exclude_devices: function() {
                    return $helper.excludeDevices === 'true';
                },
                helper_extra: function() {
                    return $helper.helperExtra;
                },
                helper_type: function() {
                    return $helper.helperType;
                },
                helper_selected: function() {
                    if ($helper.helperExtra && $helper.helperExtra.selected) {
                        return $helper.helperExtra.selected;
                    } else {
                        return $helper.selected;
                    }
                },
                fullCopy: function() {
                    return $helper.fullCopy;
                }
            }
        });
        //Send result
        modalInstance.result.then(function(helper_result) {
            if (helper_result) {
                $helper.selected = angular.fromJson(helper_result);
                if ($helper.onCopy) {
                    $helper.onCopy({
                        $helper_keys: helper_result
                    });
                }

                if ($helper.onMulti && angular.isArray($helper.onMulti)) {
                    angular.forEach($helper.onMulti, function(_onCopy, idx) {
                        if (angular.isFunction(_onCopy))
                            _onCopy({
                                $helper_keys: helper_result
                            });
                    });
                }
            } else {
                console.warn('Nothing selected on modal');
            }
        }, function() {});
    };
}]);

_wizard.controller('helperDialogModalController', ['$scope', '$uibModalInstance', 'helper_id', 'helper_exclusive', 'specific_type', 'organization', 'channel', 'exclude_devices', 'helper_extra', 'helper_selected', 'helper_type', 'Upload', 'mapUxService', '$translate', 'fullCopy',
    function($scope, $uibModalInstance, helper_id, helper_exclusive, specific_type, organization, channel, exclude_devices, helper_extra, helper_selected, helper_type, Upload, mapUxService, $translate, fullCopy) {
        var $ctrl = this;
        $ctrl.helper_extra = helper_extra;

        if (helper_id) {
            // Extraer el primer bloque de letras para intentar determinar el tipo de campo
            var regex = /(\w|0-9)+/g;
            helper_id = regex.exec(helper_id.toLowerCase())[0];

            $ctrl.helper_id = helper_id;
            $ctrl[helper_id + 'IsOpen'] = true;
            $ctrl[helper_id + 'IsExclusive'] = $ctrl.helper_exclusive = helper_exclusive;
        }

        if (helper_type) {
            $ctrl[helper_type + 'IsOpen'] = true;
            $ctrl[helper_type + 'IsExclusive'] = true;
            $ctrl.helper_exclusive = true;
        }

        $ctrl.helper_keys = {};

        $ctrl.helper_keys.__clean = {};
        $ctrl.helper_keys.__clean[$translate.instant('FORM.HELPER.FIELD.EMPTY')] = '';

        $ctrl.specific_type = specific_type;
        $ctrl.organization = organization;
        $ctrl.channel = channel;

        $ctrl.exclude_devices = exclude_devices;

        var events = [];

        var ngOptions = mapUxService.getDefaultOptions();
        delete ngOptions.l_gohome;
        delete ngOptions.l_print;
        $ctrl.map = mapUxService.createNgOptions(ngOptions);
        //config map helper
        angular.extend($ctrl.map, {
            center: {
                lat: helper_selected && helper_selected.latitude ? helper_selected.latitude : 40.095,
                lng: helper_selected && helper_selected.longitude ? helper_selected.longitude : -3.823,
                zoom: helper_selected && helper_selected.zoom ? helper_selected.zoom : 4
            },
            markers: {},
            events: {
                markers: {
                    enable: ['dragend', 'click'],
                    logic: 'emit'
                },
                map: {
                    enable: ['click'],
                    logic: 'emit'
                }
            }
        });

        if (helper_selected && helper_selected.latitude) {
            $ctrl.map.markers = {
                marker: {
                    lat: helper_selected.latitude,
                    lng: helper_selected.longitude,
                    draggable: true,
                    focus: true,
                    message: $translate.instant('LOG.DRAG_ME')
                }
            };
            setPosition(helper_selected.latitude, helper_selected.longitude, helper_selected.zoom);
        }

        // contorl de elementos de entrada
        if (helper_extra) {
            // configuración extra de mapa
            if (helper_extra.map) {
                var markers = {
                    marker: {
                        draggable: true,
                        focus: true,
                        message: $translate.instant('LOG.DRAG_ME')
                    }
                };
                $ctrl.map = _.merge($ctrl.map, helper_extra.map, markers);
            }

            //Configuracion extra para areas
            if (helper_extra.area) {
                $ctrl.area = helper_extra.area;
            }
        }

        function setPosition(lat, lng, zoom) {
            $ctrl.helper_keys.map = {
                latitude: lat,
                longitude: lng,
                zoom: zoom
            };
        }

        events.push(
            $scope.$on('leafletDirectiveMarker.map-marker.click', function(event, args) {
                delete $ctrl.helper_keys.map;
                $ctrl.map.markers = {};
            }),
            $scope.$on('leafletDirectiveMap.map-marker.click', function(event, args) {
                var latlng = args.leafletEvent.latlng;
                $ctrl.map.markers = {
                    marker: {
                        lat: latlng.lat,
                        lng: latlng.lng,
                        draggable: true,
                        focus: true,
                        message: $translate.instant('LOG.DRAG_ME')
                    }
                };
                setPosition(latlng.lat, latlng.lng, args.leafletObject._zoom);
            }),
            $scope.$on('leafletDirectiveMarker.map-marker.dragend', function(event, args) {
                var point = args.leafletEvent.target._leaflet_events.dragend[0].context._latlng;
                setPosition(point.lat, point.lng, args.leafletObject._zoom);
            })
        );

        //config domain
        $ctrl.domain = {};
        if (helper_selected && helper_selected.name) {
            $ctrl.helper_keys.domain = {
                name: helper_selected.name
            };
            $ctrl.datastream = {
                selected: [{
                    name: helper_selected.name
                }]
            };
        }
        $ctrl.onSelectDomainKey = function($item, $model) {
            $ctrl.helper_keys.domain = {
                name: $item.name
            };
        };

        $ctrl.onDeleteDomainKey = function() {
            delete $ctrl.helper_keys.name;
        };

        //config datastream
        $ctrl.datastream = {};
        if (helper_selected && helper_selected.datastreamId) {
            $ctrl.helper_keys.datastream = {
                datastreamId: helper_selected.datastreamId
            };
            $ctrl.datastream = {
                selected: [{
                    identifier: helper_selected.datastreamId
                }]
            };
        }
        $ctrl.onSelectDatastreamKey = function($item, $model) {
            $ctrl.helper_keys.datastream = {
                datastreamId: $item.identifier
            };
        };

        $ctrl.onDeleteDatastreamKey = function() {
            delete $ctrl.helper_keys.datastream;
        };

        //config entity
        $ctrl.entity = {};
        if (helper_selected && helper_selected.entityKey) {
            $ctrl.helper_keys.entity = {
                entityKey: helper_selected.entityKey
            };
            $ctrl.entity = {
                selected: [{
                    provision: {
                        administration: {
                            identifier: {
                                _current: {
                                    value: helper_selected.entityKey
                                }
                            }
                        }
                    }
                }]
            };
        }

        $ctrl.onSelectEntityKey = function($item, $model) {
            // $ctrl.helper_keys['entity'] = { entityKey: $item.id };
            $ctrl.helper_keys.entity = {
                entityKey: $item.provision.administration.identifier._current.value
            };
        };

        $ctrl.onDeleteEntityKey = function() {
            delete $ctrl.helper_keys.entity;
        };

        //config device
        $ctrl.device = {};
        if (helper_selected && helper_selected.deviceKey) {
            $ctrl.helper_keys.device = {
                deviceKey: helper_selected.deviceKey
            };
            $ctrl.device = {
                selected: [{
                    provision: {
                        administration: {
                            identifier: {
                                _current: {
                                    value: helper_selected.deviceKey
                                }
                            }
                        }
                    }
                }]
            };
        }

        $ctrl.onSelectDeviceKey = function($item, $model) {
            $ctrl.helper_keys.device = {
                deviceKey: $item.provision.administration.identifier._current.value
            };
        };

        $ctrl.onDeleteDeviceKey = function() {
            delete $ctrl.helper_keys.device;
        };

        //config asset
        $ctrl.asset = {};
        if (helper_selected && helper_selected.assetKey) {
            $ctrl.helper_keys.asset = {
                assetKey: helper_selected.assetKey
            };
            $ctrl.asset = {
                selected: [{
                    provision: {
                        administration: {
                            identifier: {
                                _current: {
                                    value: helper_selected.assetKey
                                }
                            }
                        }
                    }
                }]
            };
        }

        $ctrl.onSelectAssetKey = function($item, $model) {
            $ctrl.helper_keys.asset = {
                assetKey: $item.provision.administration.identifier._current.value
            };
        };

        $ctrl.onDeleteAssetKey = function() {
            delete $ctrl.helper_keys.asset;
        };

        //config subscriber
        $ctrl.subscriber = {};
        if (helper_selected && helper_selected.subscriberKey) {
            $ctrl.helper_keys.subscriberKey = {
                subscriberKey: helper_selected.subscriberKey
            };
            $ctrl.subscriber = {
                selected: [{
                    provision: {
                        subscriber: {
                            identifier: {
                                _current: {
                                    value: helper_selected.subscriberKey
                                }
                            }
                        }
                    }
                }]
            };
        }

        $ctrl.onSelectSubscriberKey = function($item, $model) {
            $ctrl.helper_keys.subscriber = $item;
        };

        $ctrl.onDeleteSubscriberKey = function() {
            delete $ctrl.helper_keys.subscriber;
        };

        //config entity
        $ctrl.subscription = {};

        if (helper_selected && helper_selected.subscriptionKey) {
            $ctrl.helper_keys.subscriptionKey = {
                subscriptionKey: helper_selected.subscriptionKey
            };
            $ctrl.subscription = {
                selected: [{
                    provision: {
                        subscription: {
                            identifier: {
                                _current: {
                                    value: helper_selected.subscriptionKey
                                }
                            }
                        }
                    }
                }]
            };
        }

        $ctrl.onSelectSubscriptionKey = function($item, $model) {
            $ctrl.helper_keys.subscription = $item;
        };

        $ctrl.onDeleteSubscriptionKey = function() {
            delete $ctrl.helper_keys.subscription;
        };

        //config areas
        if (!$ctrl.area) {
            $ctrl.area = {};
        } else {
            delete $ctrl.area.selected;
        }

        if (helper_selected && helper_selected.area) {
            $ctrl.helper_keys.area = {
                area: helper_selected.area
            };
            $ctrl.area.selected = [{
                identifier: helper_selected.area
            }];
        }

        $ctrl.onSelectAreaKey = function($item, $model) {
            $ctrl.helper_keys.area = {
                area: $item.identifier
            };
        };

        $ctrl.onDeleteAreaKey = function() {
            delete $ctrl.helper_keys.area;
        };

        //Condicion para botón de aplicar todo lo seleccionado en los helpers
        $ctrl.canApply = function() {
            return Object.keys($ctrl.helper_keys).length > 0;
        };

        //config bundles
        if (!$ctrl.bundle) {
            $ctrl.bundle = {};
        } else {
            delete $ctrl.bundle.selected;
        }

        if (helper_selected && helper_selected.bundle) {
            $ctrl.helper_keys.bundle = {
                bundle: helper_selected.bundle
            };
            $ctrl.bundle.selected = [{
                id: helper_selected.bundle
            }];
        }

        $ctrl.onSelectBundleKey = function($item, $model) {
            $ctrl.helper_keys.bundle = {
                bundleId: $item.id,
                bundleName: $item.name,
                bundleVersion: $item.version
            };
        };

        $ctrl.onDeleteBundleKey = function() {
            delete $ctrl.helper_keys.bundle;
        };

        // imagen
        if (helper_selected && helper_selected.image) {
            $ctrl.helper_keys.image = {
                image: helper_selected.image
            };
        }

        $ctrl.imageSelected = function(file) {
            if (file) {
                Upload.base64DataUrl(file).then(
                    function(url) {
                        $ctrl.helper_keys.image = {
                            image: url
                        };
                    });
            } else {
                $ctrl.removeDataFile();
            }
        };

        $ctrl.removeDataFile = function() {
            delete $ctrl.helper_keys.image;
        };

        //config organization
        $ctrl.organizationC = {};
        if (helper_selected && helper_selected.organization) {

            $ctrl.organizationC = {
                selected: helper_selected.organization
            };
        }

        $ctrl.onSelectOrganization = function($item, $model) {
            $ctrl.helper_keys.organization = $item;
        };

        $ctrl.onDeleteOrganization = function() {
            delete $ctrl.helper_keys.organization;
        };

        //config channel
        $ctrl.channelC = {};
        if (helper_selected && helper_selected.channel) {

            $ctrl.channelC = {
                selected: helper_selected.channel
            };
        }

        $ctrl.onSelectChannel = function($item, $model) {
            $ctrl.helper_keys.channel = {
                channelName: $item.provision.administration.identifier._current.value,
                channelOrganization: $item.provision.administration.organization._current.value
            };
        };

        $ctrl.onDeleteChannel = function() {
            delete $ctrl.helper_keys.channel;
        };

        //config service group
        $ctrl.serviceGroupC = {};
        if (helper_selected && helper_selected.serviceGroup) {

            $ctrl.serviceGroupC = {
                selected: helper_selected.serviceGroup
            };
        }

        $ctrl.onSelectServiceGroup = function($item, $model) {
            $ctrl.helper_keys.serviceGroup = {
                serviceGroupName: $item.name
            };
        };

        $ctrl.onDeleteServiceGroup = function() {
            delete $ctrl.helper_keys.serviceGroup;
        };

        //Condicion para botón de aplicar todo lo seleccionado en los helpers
        $ctrl.canApply = function() {
            return Object.keys($ctrl.helper_keys).length > 0;
        };

        //Modal methods
        $ctrl.ok = function(helper) {
            if (helper && fullCopy) {
                $uibModalInstance.close($ctrl.helper_keys[helper]);
            } else {
                var finalKeys = {};
                angular.forEach($ctrl.helper_keys, function(value, key) {
                    if (key.trim().toLowerCase() === 'subscriber' || key.trim().toLowerCase() === 'subscription') {
                        var identifier = value.provision[key.trim().toLowerCase()].identifier._current.value;
                        finalKeys[key.trim().toLowerCase() + 'Key'] = identifier;
                    } else {
                        angular.forEach(value, function(finalValue, finalkey) {
                            finalKeys[finalkey] = finalValue;
                        });
                    }
                });

                $uibModalInstance.close(finalKeys);
            }
        };
        $ctrl.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };

        //clear evetns
        $scope.$on('$destroy', function() {
            for (var eventToDestroy in events) {
                eventToDestroy();
            }
        });
    }
]);


_wizard.component('helperDialog', {
    transclude: true,
    templateUrl: 'helper/views/helper.view.html',
    controller: 'helperDialogController',
    controllerAs: '$helper',
    bindings: {
        onCopy: '&',
        helperId: '@',
        specificType: '@',
        organization: '@',
        channel: '@',
        excludeDevices: '@',
        helperButton: '@',
        helperTitle: '@',
        helperExclusive: '@',
        helperExtra: '<',
        helperType: '@?',
        modalTemplate: '@',
        modalController: '@',
        onMulti: '<',
        fullCopy: '='
    }
});