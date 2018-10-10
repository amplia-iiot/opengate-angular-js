'use strict';
angular.module('opengate-angular-js')

.directive('datetimeSelect', function() { // ['$scope', '$compile'], function($scope, $compile) {
    return {
        restrict: 'AE',
        templateUrl: 'window-time-select/views/datetime.select.view.html',
        scope: {
            ngModel: '=',
            ngValue: '=',
            ngRequired: '<',
            placeholder: '@',
            format: '@',
            mode: '@',
            ngChange: '<',
            dateOptions: '=',
            timeOptions: '=',
            min: '=',
            max: '='
        },
        controller: function($scope, $element, $attrs, $translate, uibDateParser) {
            if (!$scope.mode || $scope.mode === 'date-time') {
                $scope.inputMode = 'datetime';
            } else {
                $scope.inputMode = $scope.mode;
            }

            $scope.required = !$scope.ngRequired ? false : !!$scope.ngRequired;

            $scope.calendarOpen = false;
            $scope.enableDate = !$scope.inputMode || $scope.inputMode === 'datetime' || $scope.inputMode === 'date';
            $scope.enableTime = $scope.inputMode && ($scope.inputMode === 'datetime' || $scope.inputMode === 'time');

            if (!$scope.format) {
                if ($scope.enableDate && !$scope.enableTime) {
                    $scope.format = 'yyyy-MM-dd';
                    $scope.visibleFormat = 'dd MMMM yyyy';
                } else if (!$scope.enableDate && $scope.enableTime) {
                    $scope.format = 'HH:mm:ss';
                    $scope.visibleFormat = 'HH:mm';
                } else {
                    $scope.format = 'yyyy-MM-ddTHH:mm:ss.sssZ';
                    $scope.visibleFormat = 'dd MMMM yyyy HH:mm';
                }
            } else {
                $scope.visibleFormat = $scope.format;
            }

            $scope.outputFormat = $scope.format;

            // Control del valor de entrada
            if (!angular.isUndefined($scope.ngModel) || !angular.isUndefined($scope.ngValue)) {
                if ($scope.ngValue) {
                    $scope.rawdata = $scope.ngValue;
                } else if ($scope.ngModel) {
                    $scope.rawdata = uibDateParser.parse($scope.ngModel, $scope.outputFormat);
                }
            }

            // General config
            $scope.customButtonBar = {
                show: true,
                now: {
                    show: false
                },
                today: {
                    show: true,
                    text: ' ',
                    cls: 'btn-sm btn-info oux-button-margin fa fa-calendar-o'
                },
                clear: {
                    show: true,
                    text: ' ',
                    cls: 'btn-sm btn-success oux-button-margin fa fa-close'
                },
                date: {
                    show: !$scope.inputMode || $scope.inputMode === 'datetime' || $scope.inputMode === 'date',
                    text: ' ',
                    cls: 'btn-sm btn-info oux-button-margin fa fa-calendar'
                },
                time: {
                    show: $scope.inputMode && ($scope.inputMode === 'datetime' || $scope.inputMode === 'time'),
                    text: ' ',
                    cls: 'btn-sm btn-info oux-button-margin fa fa-clock-o'
                },
                close: {
                    show: true,
                    text: ' ',
                    cls: 'btn-sm btn-success oux-button-margin fa fa-check'
                },
                cancel: {
                    show: false
                }
            };

            $scope.pickerOptions = {
                datePicker: {
                    startingDay: 1,
                    showWeeks: false,
                    appendToBody: true
                },
                timePicker: {
                    //max: $scope.fromMax,
                    showMeridian: false,
                    appendToBody: true
                }
            };

            if ($scope.dateOptions) {
                angular.merge($scope.pickerOptions.datePicker, $scope.dateOptions);
            }

            if ($scope.timeOptions) {
                angular.merge($scope.pickerOptions.timePicker, $scope.timeOptions);
            }

            $scope.openCalendar = function() {
                $scope.calendarOpen = true;
            };

            //$scope.$watch('rawdata', function(newValue) {
            $scope.changedRawdata = function() {
                var newValue = $scope.rawdata;
                if (newValue) {
                    if (($scope.min && (newValue < $scope.min || newValue < uibDateParser.parse($scope.min, $scope.outputFormat))) ||
                        ($scope.max && (newValue > $scope.max || newValue > uibDateParser.parse($scope.max, $scope.outputFormat)))) {
                        $scope.rawdata = undefined;

                        if ($scope.ngModel) {
                            $scope.ngModel = undefined;
                            if ($scope.ngChange) {
                                $scope.ngChange($scope.ngModel);
                            }
                        }
                    } else {
                        var parsedNewValue;
                        if ($scope.outputFormat !== 'yyyy-MM-ddTHH:mm:ss.sssZ') {
                            parsedNewValue = uibDateParser.filter(newValue, $scope.outputFormat);
                        } else {
                            parsedNewValue = newValue.toISOString();
                        }

                        if (parsedNewValue !== $scope.ngModel) {
                            $scope.ngModel = parsedNewValue;
                            if ($scope.ngChange) {
                                $scope.ngChange($scope.ngModel);
                            }
                        }
                    }

                } else {
                    $scope.rawdata = undefined;

                    if ($scope.ngModel) {
                        $scope.ngModel = undefined;
                        if ($scope.ngChange) {
                            $scope.ngChange($scope.ngModel);
                        }
                    }

                }
                //$scope.ngValue = newValue;
            };

            $scope.$watch('ngModel', function(newValue) {
                if (newValue) {
                    if (uibDateParser.parse(newValue, $scope.outputFormat)) {
                        $scope.rawdata = uibDateParser.parse(newValue, $scope.outputFormat);
                    } else {
                        $scope.rawdata = new Date(newValue);
                    }
                } else
                    $scope.rawdata = undefined;

                if ($scope.ngChange) {
                    $scope.ngChange($scope.ngModel);
                }
            });

            // Config custom window
            $scope.init = function() {

            };

            $scope.init();


        },
        link: function(scope) {
            scope.$on('$destroy', function() {
                console.log("destroy");
                scope.calendarOpen = false;
            });
        }
    };
});