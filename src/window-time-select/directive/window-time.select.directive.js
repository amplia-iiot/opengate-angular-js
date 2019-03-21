'use strict';
angular.module('opengate-angular-js')

.directive('windowTimeSelect', function() { // ['$scope', '$compile'], function($scope, $compile) {
    return {
        restrict: 'AE',
        templateUrl: 'window-time-select/views/window-time.select.view.html',
        scope: {
            event: '@',
            rawdate: '@'
        },
        controller: function($scope, $element, $attrs, $translate) {
            $scope.fromCalendarOpen = false;
            $scope.toCalendarOpen = false;

            // General config
            $scope.customButtonBar = {
                show: true,
                now: {
                    show: false
                },
                today: {
                    show: false
                },
                clear: {
                    show: false
                },
                date: {
                    show: true,
                    text: ' ',
                    cls: 'btn-sm btn-info oux-button-margin fa fa-calendar'
                },
                time: {
                    show: true,
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

            function toLimit() {
                return window.moment($scope.date.from).add(1, 'minutes')._d;
            }

            function fromLimit() {
                return window.moment($scope.date.to).subtract(1, 'minutes')._d;
            }

            function fromDate() {
                return window.moment($scope.date.to).subtract(1, 'months')._d;
            }

            function setTo(toDate) {
                if (!$scope.date) $scope.date = {};
                $scope.date.to = toDate;
                $scope.toMax = toDate;

                $scope.toOptions = {
                    datePicker: {
                        startingDay: 1,
                        showWeeks: false,
                        minDate: $scope.toMin,
                        minMode: 'day',
                        closed: $scope.toChange
                    },
                    timePicker: {
                        //min: $scope.toMin,
                        showMeridian: false
                    }
                }
            }

            function setFrom() {
                $scope.date.from = fromDate($scope.date.to);

                $scope.toOptions.datePicker.minDate = toLimit();
                //$scope.toOptions.timePicker.min = toLimit();

                $scope.toMin = toLimit();
                $scope.fromMax = fromLimit($scope.date.to);

                $scope.fromOptions = {
                    datePicker: {
                        startingDay: 1,
                        showWeeks: false,
                        maxDate: $scope.fromMax,
                        maxMode: 'day',
                        closed: $scope.fromChange
                    },
                    timePicker: {
                        //max: $scope.fromMax,
                        showMeridian: false
                    }
                };
            }

            $scope.todayClass = $scope.oneDayClass = $scope.oneWeekClass = $scope.oneMonthClass = $scope.customClass = 'btn-info';
            $scope.filterApplied = false;
            $scope.format = 'dd MMMM yyyy HH:mm';
            $scope.clear = function() {

                $scope.todayClass = $scope.oneDayClass = $scope.oneWeekClass = $scope.oneMonthClass = $scope.customClass = 'btn-info';
                $scope.filterApplied = false;
                $scope.customEnabled = false;
                $scope.$emit('onWindowTimeChanged', {});
            };
            $scope.fromOpen = function() {
                $scope.fromPopup.opened = true;
            };
            $scope.fromPopup = {
                opened: false
            };
            $scope.toOpen = function() {
                $scope.toPopup.opened = true;
            };
            $scope.toPopup = {
                opened: false
            };

            $scope.openCalendarFrom = function() {
                $scope.fromCalendarOpen = true;
            };

            $scope.openCalendarTo = function() {
                $scope.toCalendarOpen = true;
            };

            $scope.custom = function() {
                if (!$scope.customEnabled || (!$scope.fromCalendarOpen && !$scope.toCalendarOpen)) {
                    $scope.customEnabled = !$scope.customEnabled;
                }

            };
            $scope.apply = function(winTime, fire_event) {
                $scope.filterApplied = true;
                $scope.customEnabled = false;
                /* jshint ignore:start */
                if (!window.eval($scope.rawdate)) {
                    for (var key in winTime) {
                        if (key !== 'type' && key !== 'rawdate')
                            winTime[key] = window.moment(winTime[key]).format();
                    }
                    //TODO: enganche con widgets, habría que ver como resolver este problema o hacer que esto sea una directiva propia del angular-dashboard-framework
                    winTime.rawdate = false;
                }
                /* jshint ignore:end */
                if (fire_event) {
                    $scope.$emit('onWindowTimeChanged', winTime);
                }
            };
            $scope.today = function(no_fire_event) {
                $scope.todayClass = 'btn-success';
                $scope.oneDayClass = $scope.oneWeekClass = $scope.oneMonthClass = $scope.customClass = 'btn-info';
                $scope.apply(genWindowTime('today'), !no_fire_event);
            };
            $scope.oneDay = function(no_fire_event) {
                $scope.oneDayClass = 'btn-success';
                $scope.oneWeekClass = $scope.oneMonthClass = $scope.customClass = $scope.todayClass = 'btn-info';
                $scope.apply(genWindowTime('days'), !no_fire_event);
            };
            $scope.oneWeek = function(no_fire_event) {
                $scope.oneWeekClass = 'btn-success';
                $scope.oneDayClass = $scope.oneMonthClass = $scope.customClass = $scope.todayClass = 'btn-info';
                $scope.apply(genWindowTime('weeks'), !no_fire_event);
            };
            $scope.oneMonth = function(no_fire_event) {
                $scope.oneMonthClass = 'btn-success';
                $scope.oneWeekClass = $scope.oneDayClass = $scope.customClass = $scope.todayClass = 'btn-info';
                $scope.apply(genWindowTime('months'), !no_fire_event);
            };

            $scope.applyCustom = function(no_fire_event) {
                if ($scope.fromCalendarOpen) {
                    $scope.fromChange();
                } else if ($scope.toCalendarOpen) {
                    $scope.toChange()
                } else {
                    $scope.fromCalendarOpen = false;
                    $scope.toCalendarOpen = false;

                    $scope.customClass = 'btn-success';
                    $scope.todayClass = $scope.oneWeekClass = $scope.oneDayClass = $scope.oneMonthClass = 'btn-info';
                    $scope.apply({
                        type: 'custom',
                        to: $scope.date.to,
                        from: $scope.date.from
                    }, !no_fire_event);
                }
            };

            // Config custom window
            $scope.init = function() {

                setTo(new Date());
                setFrom();

                $scope.toChange = function() {
                    validateCustomWindow();
                    $scope.fromMax = fromLimit($scope.date.to);
                    $scope.fromOptions.datePicker.maxDate = $scope.fromMax;
                    //$scope.fromOptions.timePicker.max = $scope.fromMax;
                    $scope.toCalendarOpen = false;
                };
                $scope.fromChange = function() {
                    validateCustomWindow();
                    $scope.toOptions.datePicker.minDate = toLimit();
                    //$scope.toOptions.timePicker.min = toLimit();

                    $scope.toMin = toLimit();
                    $scope.fromCalendarOpen = false;
                };

                function validateCustomWindow() {
                    if (window.moment($scope.date.to).diff($scope.date.from) <= 0) {
                        $scope.errorCustomWindow = 'From date(' + $scope.date.from.toISOString() + ') is bigger than to date(' + $scope.date.to.toISOString() + ')';
                    } else {
                        $scope.errorCustomWindow = undefined;
                    }
                }


                //TODO: enganche con widgets, habría que ver como resolver este problema o hacer que esto sea una directiva propia del angular-dashboard-framework
                if ($scope.$parent.config && $scope.$parent.config.windowFilter) {
                    var configWindowFilter = $scope.$parent.config.windowFilter;
                    /* jshint ignore:start */
                    if (!window.eval($scope.rawdate)) {
                        $scope.$parent.config.windowFilter.rawdate = false;
                    }
                    /* jshint ignore:end */
                    switch (configWindowFilter.type) {
                        case 'today':
                            $scope.today(true);
                            break;
                        case 'days':
                            $scope.oneDay(true);
                            break;
                        case 'weeks':
                            $scope.oneWeek(true);
                            break;
                        case 'months':
                            $scope.oneMonth(true);
                            break;
                        case 'custom':
                            if (configWindowFilter.to && configWindowFilter.from) {
                                $scope.date.to = new Date(configWindowFilter.to);
                                $scope.date.from = new Date(configWindowFilter.from);
                            }
                            $scope.applyCustom(true);
                            break;
                        default:
                            break;
                    }
                }
            };

            $scope.init();

            function genWindowTime(type) {
                var from = window.moment().subtract(1, type);
                return {
                    from: from._d,
                    type: type
                };
            }
        },
        link: function(scope) {
            var widgetWindowTimeChangedEvt = scope.$on('widgetWindowTimeChanged', function(event, windowFilter) {
                var configWindowFilter = windowFilter;

                switch (configWindowFilter.type) {
                    case 'today':
                        scope.today(true);
                        break;
                    case 'days':
                        scope.oneDay(true);
                        break;
                    case 'weeks':
                        scope.oneWeek(true);
                        break;
                    case 'months':
                        scope.oneMonth(true);
                        break;
                    case 'custom':
                        if (configWindowFilter.to && configWindowFilter.from) {
                            scope.date.to = new Date(configWindowFilter.to);
                            scope.date.from = new Date(configWindowFilter.from);
                        }
                        scope.applyCustom(true);
                        break;
                    default:
                        break;
                }
            });

            scope.$on('$destroy', function() {
                widgetWindowTimeChangedEvt();

                scope.fromCalendarOpen = false;
                scope.toCalendarOpen = false;

                // manual destroy
                var pickers = angular.element('ul[class*="datetime-picker-dropdown"]')

                if (pickers && pickers.length) {
                    angular.forEach(pickers, function(element) {
                        element.remove();
                    });
                }
            });
        }
    };
});