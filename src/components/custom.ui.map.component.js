'use strict';


angular.module('opengate-angular-js').controller('customUiMapController', ['$scope', 'mapUxService', 'geocodingService', 'Authentication', '$timeout',
    function($scope, mapUxService, geocodingService, Authentication, $timeout) {
        this.$onInit = function() {
            var $ctrl = this;

            $ctrl.coordsObj = {
                current: {
                    lat: null,
                    lng: null
                },
                new: {
                    lat: null,
                    lng: null
                }
            };
            
            $ctrl.ownConfig = {
                showMap: $ctrl.showMap !== undefined && $ctrl.showMap !== null?$ctrl.showMap:true
            };

            $ctrl.reloadingInfo = false;
            $ctrl.getInfo = function() {
                $ctrl.reloadingInfo = true;
                $ctrl.location.country = undefined; // Pais
                $ctrl.location.region = undefined; // Comunidad
                $ctrl.location.province = undefined; // provincia
                $ctrl.location.town = undefined; // ciudad
                $ctrl.location.postal = undefined;
                $ctrl.location.address = undefined;
                $ctrl.display_name = undefined;
                if ($ctrl.map.markers.marker) {
                    $ctrl.coordsObj = {
                        current: {
                            lat: $ctrl.map.markers.marker.lat,
                            lng: $ctrl.map.markers.marker.lng
                        },
                        new: {
                            lat: $ctrl.map.markers.marker.lat,
                            lng: $ctrl.map.markers.marker.lng
                        }
                    };
                    geocodingService.reverseSearch($ctrl.map.markers.marker.lat, $ctrl.map.markers.marker.lng, 18,
                        function(err, data) {
                            $ctrl.reloadingInfo = false;
                            if (data && data.address) {
                                $ctrl.location.country = data.address.country || undefined; // Pais
                                $ctrl.location.region = data.address.county || undefined; // Comunidad
                                $ctrl.location.province = data.address.state || undefined; // provincia
                                $ctrl.location.town = data.address.city || data.address.village || data.address.town || undefined; // ciudad
                                $ctrl.location.postal = data.address.postcode || undefined;
                                $ctrl.location.address = data.address.road || data.address.pedestrian || undefined;
                            }
                            $ctrl.display_name = buildCompleteAddress($ctrl.location);
                            $ctrl.map.markers.marker.message = buildCompleteAddress($ctrl.location, true);
                        }, {}, Authentication.user.langCode);
                } else {
                    $ctrl.reloadingInfo = false;
                }
            };

            var ngOptions = mapUxService.getDefaultOptions();
            delete ngOptions.l_gohome;
            delete ngOptions.l_print;

            $ctrl.map = mapUxService.createNgOptions(ngOptions);

            //config map helper
            angular.extend($ctrl.map, {
                center: {
                    lat: 40.095,
                    lng: -3.823,
                    zoom: 4
                },
                markers: {},

                events: {
                    markers: {
                        enable: ['dragend', 'click'],
                        logic: 'emit'
                    },
                    map: {
                        enable: ['click', 'focus'],
                        logic: 'emit'
                    }
                }
            });

            if ($ctrl.location) {
                if ($ctrl.location.position && $ctrl.location.position.coordinates) {
                    setPosition($ctrl.location.position.coordinates[1], $ctrl.location.position.coordinates[0], $ctrl.location.zoom);
                }

                $ctrl.display_name = buildCompleteAddress($ctrl.location);
            }

            $ctrl.map.id = $scope.$id;


            $ctrl.searchCoords = function() {
                $ctrl.map.center = {
                    lat: $ctrl.coordsObj.new.lat,
                    lng: $ctrl.coordsObj.new.lng,
                    zoom: 17
                };

                $ctrl.coordsObj = {
                    current: {
                        lat: $ctrl.coordsObj.new.lat,
                        lng: $ctrl.coordsObj.new.lng
                    },
                    new: {
                        lat: $ctrl.coordsObj.new.lat,
                        lng: $ctrl.coordsObj.new.lng
                    }
                };


                mapUxService.getMapWithId($ctrl.map.id, function(map) {
                    map.invalidateSize();
                    map.fireEvent('focus');
                });
            };

            $ctrl.applyCoords = function() {
                $ctrl.coordsObj = {
                    current: {
                        lat: $ctrl.coordsObj.new.lat,
                        lng: $ctrl.coordsObj.new.lng
                    },
                    new: {
                        lat: $ctrl.coordsObj.new.lat,
                        lng: $ctrl.coordsObj.new.lng
                    }
                };

                mapUxService.getMapWithId($ctrl.map.id, function(map) {
                    map.invalidateSize();
                    map.fireEvent('focus');
                });

                if (!$ctrl.disabled) {
                    delete $ctrl.map.markers.marker;
                    setPosition($ctrl.coordsObj.new.lat, $ctrl.coordsObj.new.lng);

                    $ctrl.getInfo();
                }
            };

            var events = [];

            events.push(
                $scope.$on('leafletDirectiveMarker.' + $ctrl.map.id + '.click', function(event, args) {
                    args.leafletObject._map.invalidateSize();

                    if (!args.leafletObject.getPopup()._isOpen) {
                        removeMarker();
                    }

                }));

            events.push(
                $scope.$on('leafletDirectiveMap.' + $ctrl.map.id + '.focus', function(event, args) {
                    args.leafletObject.invalidateSize();
                }));

            events.push(
                $scope.$on('leafletDirectiveMap.' + $ctrl.map.id + '.click', function(event, args) {
                    args.leafletObject.invalidateSize();

                    if (!$ctrl.disabled) {
                        var latlng = args.leafletEvent.latlng;
                        delete $ctrl.map.markers.marker;
                        setPosition(latlng.lat, latlng.lng, args.leafletObject._zoom);

                        $ctrl.getInfo();
                    }
                }));

            events.push(
                $scope.$on('leafletDirectiveMarker.' + $ctrl.map.id + '.dragend', function(event, args) {
                    var point = args.leafletEvent.target._leaflet_events.dragend[0].context._latlng;
                    delete $ctrl.map.markers.marker;
                    setPosition(point.lat, point.lng, args.leafletObject._zoom);

                    $ctrl.getInfo();
                })
            );

            function setPosition(lat, lng, zoom) {
                if (!$ctrl.location) {
                    $ctrl.location = {};
                } else if (!$ctrl.location.position) {
                    $ctrl.location.position = {
                        type: 'Point'
                    };
                }

                $ctrl.location.position.coordinates = [lng, lat];

                $ctrl.coordsObj = {
                    current: {
                        lat: lat,
                        lng: lng
                    },
                    new: {
                        lat: lat,
                        lng: lng
                    }
                };

                $ctrl.location.zoom = zoom ? zoom : $ctrl.map.center.zoom;

                if (!$ctrl.map.markers.marker) {
                    $ctrl.map.center = {
                        lat: lat,
                        lng: lng,
                        zoom: zoom ? zoom : $ctrl.map.center.zoom
                    };
                    $ctrl.map.markers = {
                        marker: {
                            lat: lat,
                            lng: lng,
                            draggable: $ctrl.disabled ? false : true,
                            message: buildCompleteAddress($ctrl.location, true),
                            compileMessage: true,
                            getMessageScope: function() {
                                $scope.removeMarker = removeMarker;
                                return $scope;
                            }
                        }
                    };

                }
            }

            function removeMarker() {
                if (!$ctrl.disabled) {
                    $ctrl.map.markers = {};

                    delete $ctrl.location.position;

                    $ctrl.getInfo();
                }
            }

            function buildCompleteAddress(data, showButton) {
                var display_name = '';

                display_name += data.address ? data.address : '';
                display_name += data.postal ? (display_name ? ', ' : '') + data.postal : '';
                display_name += data.town ? (display_name ? ', ' : '') + data.town : '';
                display_name += data.province ? (display_name ? ', ' : '') + data.province : '';
                display_name += data.region ? (display_name ? ', ' : '') + data.region : '';
                display_name += data.country ? (display_name ? ', ' : '') + data.country : '';

                if (showButton && !$ctrl.disabled) {
                    display_name += '<br><div class="text-right"><button type="button" class="btn btn-warning text-danger btn-xs no-margin" ng-click="removeMarker()"><i class="fa fa-trash"></i></button></div>';
                }

                return display_name;
            }

            $ctrl.showMap = false;
            $timeout(function() {
                $ctrl.showMap = $ctrl.ownConfig.showMap;
                $scope.$apply();
                mapUxService.getMapWithId($ctrl.map.id, function(map) {
                    map.invalidateSize();
                    map.fireEvent('focus');
                });
            }, 1000);

            //clear events
            $ctrl.$onDestroy = function() {
                angular.forEach(events, function(eventToDestroy) {
                    eventToDestroy();
                });
            };
        }
    }
]);

angular.module('opengate-angular-js').component('customUiMap', {
    templateUrl: 'components/views/custom.ui.map.html',
    controller: 'customUiMapController',
    bindings: {
        label: '=',
        location: '=',
        required: '=',
        disabled: '=',
        onlyMap: '=',
        showMap: '='
    }

});