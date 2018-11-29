'use strict';

angular.module('opengate-angular-js')
    .directive('customUiSelect', ['$compile', 'Filter',
        function($compile, Filter) {
            var button = angular.element('<div title="Toggle Advanced/Basic filter search" ng-click="complex()" style="cursor:pointer" class="custom-ui-select-button input-group-addon"><i class="fa fa-filter"></i><i class="filter-icon fa fa-bold text-muted"></i></div>');
            var container = angular.element('<div class="custom-ui-select-container input-group"></div>');

            var setRefresh = function(obj, fnc) {
                var choices = obj.querySelectorAll('ui-select-choices');
                choices.attr('refresh', fnc);
                choices.attr('refresh-delay', '0');
            };

            return {
                require: 'uiSelect',
                scope: true,
                bindToController: true,
                controller: function($scope, $element, $attrs, $q, $timeout) {
                    var uiConfig = getConfig();

                    function processFilter(_filter) {
                        if (uiConfig.prefilter) {
                            var filter = {
                                and: []
                            };
                            filter.and.push(uiConfig.prefilter);
                            filter.and.push(_filter);
                            return filter;
                        }
                        return _filter;
                    }

                    function getConfig() {
                        var configPath = $attrs.customUiSelectConfig.split('.');
                        if (configPath.length === 1) {
                            return $scope[$attrs.customUiSelectConfig];
                        } else {
                            var config = $scope;
                            configPath.forEach(function(path) {
                                config = config[path];
                            });
                            return config;
                        }
                    }

                    //Filtro asistido con mass-autocomplete
                    $scope.complexfilter = function(search) {
                        //console.log(search);
                        Filter.parseQuery(search || '')
                            .then(function(data) {
                                var filter = data.filter;
                                //Solo filtramos si no se trata de un filtro vacio
                                if (Object.keys(filter).length > 0) {
                                    _loadCollection(processFilter(filter));
                                    // console.log('Final filter: ' + filter);
                                } else {
                                    //lo tratamos igual que si fuera un filtro no valido
                                    uiConfig.collection.splice(0, uiConfig.collection.length);
                                }
                            })
                            .catch(function(err) {
                                console.error(err);
                                //Si el filtro no es valido borramos la lista de opciones del ui-select
                                uiConfig.collection.splice(0, uiConfig.collection.length);
                                // Tratar el error
                            });
                    };

                    //Filtro simple con or-like
                    $scope.asyncfilter = function(search) {
                        _loadCollection(processFilter(uiConfig.filter(search)));
                    };

                    $scope._complex = $attrs.$$button.querySelectorAll('.fa-filter').hasClass('text-primary');
                    $scope.complex = function() {
                        if (!uiConfig.simpleMode) {
                            $scope._complex = !$scope._complex;
                            if ($scope._complex) {
                                $element.css('display', '').removeClass('custom-ui-select-hide');
                                $attrs.$$cloneElement.css('display', 'none').addClass('custom-ui-select-hide');
                                $attrs.$$button.querySelectorAll('.filter-icon').removeClass('fa-bold').removeClass('text-muted').addClass('fa-font').addClass('text-primary');
                            } else {
                                $element.css('display', 'none').addClass('custom-ui-select-hide');
                                $attrs.$$cloneElement.css('display', '').removeClass('custom-ui-select-hide');
                                $attrs.$$button.querySelectorAll('.filter-icon').removeClass('fa-font').addClass('text-muted').addClass('fa-bold').removeClass('text-primary');
                            }
                        }
                    };

                    $scope.customUiTagTransform = function(value) {
                        return null;
                    };

                    // Retraso de la peticion de recarga para no saturar (OUW-431)
                    var lastTimeout = null;

                    function _loadCollection(filter) {
                        if (lastTimeout) clearTimeout(lastTimeout);

                        lastTimeout = setTimeout(function() {
                            _loadCollectionTimeout(filter);
                        }, 500);
                    }

                    var lastFilter = null;

                    function _loadCollectionTimeout(filter) {
                        var builder = uiConfig.builder,
                            id = uiConfig.rootKey,
                            limit = uiConfig.limit ? uiConfig.limit : 25,
                            isGet = uiConfig.isGet ? uiConfig.isGet : false;

                        function _processingData(datas) {
                            var _collection = [];
                            if (!angular.isArray(datas)) {
                                angular.forEach(datas, function(data, key) {
                                    _collection.push(data);
                                });
                            } else {
                                angular.copy(datas, _collection);
                            }
                            angular.copy(_collection, uiConfig.collection);

                        }
                        if (!lastFilter || !angular.equals(lastFilter, filter)) {
                            lastFilter = angular.copy(filter);
                            $attrs.$$button.querySelectorAll('.filter-icon').removeClass('fa-bold').removeClass('fa-font').addClass('fa-spinner').addClass('fa-spin');
                            var builderToExecute = isGet ? builder : builder.limit(limit).filter(filter).build().execute();
                            builderToExecute.then(
                                function(data) {
                                    if ($scope._complex) {
                                        $attrs.$$button.querySelectorAll('.filter-icon').removeClass('fa-spinner').removeClass('fa-spin').addClass('fa-font');
                                    } else {
                                        $attrs.$$button.querySelectorAll('.filter-icon').removeClass('fa-spinner').removeClass('fa-spin').addClass('fa-bold');
                                    }

                                    if (data.statusCode === 200) {
                                        var datas = id ? data.data[id] : data.data;

                                        if (angular.isFunction(uiConfig.processingData)) {
                                            uiConfig.processingData(data, datas).then(_processingData);
                                        } else {
                                            _processingData(datas);
                                        }
                                    } else {
                                        uiConfig.collection.splice(0, uiConfig.collection.length);
                                    }
                                    $scope.$apply();
                                }
                            ).catch(function(err) {
                                console.error(err);
                                $attrs.$$button.querySelectorAll('.filter-icon').removeClass('fa-spinner').removeClass('fa-spin').addClass('fa-filter');
                            });
                        }

                    }
                },
                compile: function(templateElement, templateAttributes) {
                    templateAttributes.$$button = button.clone();
                    templateAttributes.$$container = container.clone();
                    var simple = templateAttributes.multiple !== 'true';
                    var taggFunction = templateAttributes.tagging;
                    if (simple) {
                        templateElement.attr('limit', '1');
                        templateAttributes.limit = '1';
                        templateAttributes.searchEnabled = '!$select.selected || $select.selected.length === 0';
                        templateElement.attr('search-enabled', '!$select.selected || $select.selected.length === 0');
                        templateElement.addClass('custom-ui-select-no-multiple');
                    }

                    if (!taggFunction || taggFunction.trim().length === 0) {
                        templateElement.attr('tagging', 'customUiTagTransform');
                        templateAttributes.tagging = 'customUiTagTransform';
                    }

                    var asyncFilter = 'asyncfilter($select.search);';
                    var complexFilter = 'complexfilter($select.search);';


                    if (templateAttributes.customMassAutocompleteItem) {
                        setRefresh(templateElement, complexFilter);
                        var _templateElement = angular.element(templateElement.clone());
                        _templateElement.removeAttr('custom-ui-select');
                        setRefresh(_templateElement, asyncFilter);
                        templateAttributes.$$templateElement = _templateElement;
                    } else {
                        setRefresh(templateElement, asyncFilter);
                    }

                    return function link($scope, $element, $attrs, $select) {
                        var maus = 'mass-autocomplete-ui-select';
                        var aus = 'async-ui-select';

                        if ($attrs.customMassAutocompleteItem) {
                            $element.addClass(maus);
                            var massAutocompleteItem = getAttribute('customMassAutocompleteItem');

                            if (!massAutocompleteItem.suggest) {
                                massAutocompleteItem.suggest = Filter.suggest_field_delimited;
                            }
                            var filterInput = $element.querySelectorAll('input.ui-select-search');
                            filterInput.attr('mass-autocomplete-item', $attrs.customMassAutocompleteItem);
                            //filterInput.attr('ng-change', 'debugQuery()');
                            $compile(filterInput)($scope);

                            $attrs.$$container.empty();
                            $element.before($attrs.$$container);
                            $element.detach();

                            $attrs.$$container.append($element);
                            var template = $attrs.$$templateElement.clone();
                            var _cloneElement = $compile(template)($scope, function(clonedElement, $scope) {
                                $attrs.$$container.append(clonedElement);
                            });
                            _cloneElement.addClass(aus);
                            $attrs.$$cloneElement = _cloneElement;

                            $compile($attrs.$$button)($scope);
                            $attrs.$$container.append($attrs.$$button);
                            $element.css('display', 'none').addClass('custom-ui-select-hide');

                            var keys = [];
                            $attrs.$$container.bind('keydown', function(e) {
                                keys.push(e.keyCode);
                            });
                            $attrs.$$container.bind('keyup', function(e) {
                                if (keys.length > 0) {
                                    if (angular.equals(keys, [17, 18, 70])) {
                                        $scope.complex();
                                    }
                                    keys.splice(0, keys.length);
                                }
                            });


                        } else {
                            $element.addClass(aus);
                        }



                        function getAttribute(attr) {
                            if ($attrs[attr]) {

                                var configPath = $attrs[attr].split('.');
                                if (configPath.length === 1) {
                                    return $scope[$attrs[attr]];
                                } else {
                                    var config = $scope;
                                    configPath.forEach(function(path) {
                                        config = config[path];
                                    });
                                    return config;
                                }
                            } else {
                                return;
                            }
                        }
                    };
                }
            };
        }
    ]);