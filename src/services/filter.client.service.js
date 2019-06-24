'use strict';

// Filter service
angular.module('opengate-angular-js').factory('Filter', ['$window', '$sce', '$q', 'jsonPath',

    function($window, $sce, $q, jsonPath) {
        //var customSelectors = [];
        var conditionSelectors = [];
        //var separators = [' ', '\n', '-', '!', '=', '~', '>', '<', '&', 'or', 'and', '(', ')', 'eq', 'neq', '==', 'like', 'gt', 'gte', 'lt', 'lte', '<=', '>='];
        var separators = [' ', '\n', '!', '=', '~', '>', '<', '&', 'or', 'and', ')', 'in', ',', 'neq', 'like', 'within', 'exists'];

        function suggest_field(term, customSelectors) {
            var results = [];
            var i, customSelector, conditionSelector;

            if (!term || term.trim().length === 0) {
                for (i = 0; i < customSelectors.length && results.length < 8; i++) {
                    customSelector = customSelectors[i];

                    var exists = results.find(function(data) {
                        return data.value === customSelector;
                    });

                    if (!exists) {
                        results.push({
                            label: $sce.trustAsHtml(highlight(customSelector, term)),
                            value: customSelector
                        });
                    }
                }

                for (i = 0; i < conditionSelectors.length && results.length < 12; i++) {
                    conditionSelector = conditionSelectors[i];
                    results.push({
                        label: $sce.trustAsHtml(highlight(conditionSelector, term)),
                        value: conditionSelector
                    });
                }
            } else {
                var q = term.toLowerCase().trim();

                // Find first 10 allSelectors that start with `term`.
                for (i = 0; i < customSelectors.length && results.length < 8; i++) {
                    customSelector = customSelectors[i];
                    if (customSelector.toLowerCase().indexOf(q) > -1) {
                        var exists = results.find(function(data) {
                            return data.value === customSelector;
                        });

                        if (!exists) {
                            results.push({
                                label: $sce.trustAsHtml(highlight(customSelector, term)),
                                value: customSelector
                            });
                        }
                    }
                }

                for (i = 0; i < conditionSelectors.length && results.length < 12; i++) {
                    conditionSelector = conditionSelectors[i];
                    if (conditionSelector.toLowerCase().indexOf(q) > -1)
                        results.push({
                            label: $sce.trustAsHtml(highlight(conditionSelector, term)),
                            value: conditionSelector
                        });
                }
            }

            return results;
        }


        function suggest_field_delimited(term, target_element, query) {
            var deferred = $q.defer();
            query.findFields(term).then(function(fields) {
                var values = fields;
                var idx = -1;

                if (target_element.selectionStart) {
                    idx = target_element.selectionStart - 1;
                } else if (target_element.prop) {
                    idx = target_element.prop('selectionStart') - 1;
                }

                if (idx < 0) return;

                var suggestions;
                if (term !== undefined && term !== '') {
                    var ix = -1;
                    for (; idx >= 0 && ix === -1; idx--) {
                        if (separators.indexOf(term[idx]) > -1) {
                            ix = idx + 1;
                        } else if (idx === 0) {
                            ix = idx;
                        }
                    }

                    var ex = ix;

                    for (idx = ix; idx < term.length && ex === ix; idx++) {
                        if (separators.indexOf(term[idx]) > -1) {
                            ex = idx + 1;
                        } else if (idx === (term.length - 1)) {
                            ex = idx + 1;
                        }
                    }

                    suggestions = suggest_field(term.substring(ix, ex), values);
                } else {
                    suggestions = suggest_field();
                }

                suggestions.forEach(function(s) {
                    s.value = s.value;
                });
                deferred.resolve(suggestions);

            }).catch(function(err) {
                console.error(err);
                deferred.reject(err);
            });



            return deferred.promise;
        }

        function highlight(str, term) {
            var highlight_regex = new RegExp('(' + term + ')', 'gi');
            return str.replace(highlight_regex,
                '<span class="text-info">$1</span>');
        }

        function queryParser(string) {
            var parse_tree = null;
            var query = {
                text: [],
                offsets: [],
                filter: {}
            };

            //job.id like "1e" or (job.id like 189 and job.status== FINISHED) and job.status== CANCELED
            $window.jsep.addBinaryOp('and', 1);
            $window.jsep.addBinaryOp('&&', 1);
            $window.jsep.addBinaryOp('||', 2);
            $window.jsep.addBinaryOp('or', 2);

            $window.jsep.addBinaryOp('in', 6);
            $window.jsep.addBinaryOp('nin', 6);
            $window.jsep.addBinaryOp('within', 6);
            $window.jsep.addBinaryOp('~', 6);
            $window.jsep.addBinaryOp('=', 6);

            $window.jsep.addBinaryOp('like', 6);
            $window.jsep.addBinaryOp('gt', 6);
            $window.jsep.addBinaryOp('lte', 6);
            $window.jsep.addBinaryOp('gte', 6);
            $window.jsep.addBinaryOp('eq', 6);
            $window.jsep.addBinaryOp('neq', 6);
            $window.jsep.addBinaryOp('exists', 6);
            $window.jsep.addBinaryOp(',', 6);

            parse_tree = $window.jsep(string);
            query.filter[parse_tree.operator] = [];

            query.filter = parseSimple(parse_tree);

            return query;
        }

        function parseQuery(string) {
            var defered = $q.defer();
            var promise = defered.promise;

            var query;
            try {
                query = queryParser(string);
                defered.resolve(query);
            } catch (err) {
                var error = err;
                if (err.description) {
                    error = err.description;
                }
                defered.reject(error);
            }

            return promise;
        }
        //job.id like "1e" or (job.id like 189 and job.status== FINISHED) and job.status== CANCELED
        // job.id like "1e" and job.status<= CANCELED

        function parseSimple(parse_tree, parent) {
            var id, value, newFilter = {};
            var op;
            if (parse_tree.type === 'BinaryExpression' && /\eq|\neq|\exists|\like|\gt|\lt|\gte|\lte|\=|\<|\>|\~|\!/.test(parse_tree.operator)) {
                id = getId(parse_tree.left).split('.').reverse().join('.');
                id = id.replace('.undefined', '[]');
                var right = parse_tree.right;
                if (right.type === 'UnaryExpression' && right.prefix) {
                    var ue = right.operator + right.argument.value;
                    value = isNaN(ue) ? ue : (ue * 1);
                } else {
                    value = right.name || right.value;
                }
                op = getSimpleOperator(parse_tree.operator);

                newFilter[op] = {};
                newFilter[op][id] = value;
            } else if (parse_tree.type === 'BinaryExpression' && /or|and/.test(parse_tree.operator)) {
                if (!newFilter[parse_tree.operator]) {
                    newFilter[parse_tree.operator] = [];
                }

                // newFilter[parse_tree.operator].push(parseSimple(parse_tree.left));
                // newFilter[parse_tree.operator].push(parseSimple(parse_tree.right));

                if (parse_tree.left.operator === parse_tree.operator) {
                    if (parent) {
                        parseSimple(parse_tree.left, parent);
                    } else {
                        parseSimple(parse_tree.left, newFilter)
                    }
                } else {
                    if (parent) {
                        parent[parse_tree.operator].push(parseSimple(parse_tree.left));
                    } else {
                        newFilter[parse_tree.operator].push(parseSimple(parse_tree.left));
                    }
                }

                if (parent) {
                    parent[parse_tree.operator].push(parseSimple(parse_tree.right));
                } else {
                    newFilter[parse_tree.operator].push(parseSimple(parse_tree.right));
                }

            } else if (parse_tree.type === 'BinaryExpression' && /\within/.test(parse_tree.operator)) {
                if (parse_tree.right.type === 'ArrayExpression' && parse_tree.right.elements[0].left && parse_tree.right.elements[0].right) {
                    id = getId(parse_tree.left).split('.').reverse().join('.');
                    id = id.replace('.undefined', '[]');
                    op = getSimpleOperator(parse_tree.operator);

                    newFilter[op] = {};

                    newFilter[op][id] = [parse_tree.right.elements[0].left.value, parse_tree.right.elements[0].right.value];
                }
            } else if (parse_tree.type === 'BinaryExpression' && /\in|\nin/.test(parse_tree.operator)) {
                id = getId(parse_tree.left).split('.').reverse().join('.');
                id = id.replace('.undefined', '[]');
                op = getSimpleOperator(parse_tree.operator);

                newFilter[op] = {};
                var ids = getSimpleValuesFromArray(parse_tree.right);
                newFilter[op][id] = ids;
            }

            return newFilter;

        }

        function getSimpleValuesFromArray(parser_tree) {
            var identifiers = [];

            switch (parser_tree.type) {
                case 'Identifier':
                    identifiers.push(parser_tree.name);
                    break;
                case 'Literal':
                    identifiers.push(parser_tree.value);
                    break;
                case 'BinaryExpression':
                    if (/\,/.test(parser_tree.operator)) {
                        var left = getSimpleValuesFromArray(parser_tree.left);
                        var right = getSimpleValuesFromArray(parser_tree.right);
                        identifiers = left.concat(right);
                    }
                    break;
            }
            return identifiers;
        }

        function getId(parser_tree) {
            var id = '';
            if (parser_tree.type === 'Identifier') {
                id = parser_tree.name;
            } else if (parser_tree.type === 'MemberExpression') {
                id = parser_tree.property.name + '.' + getId(parser_tree.object);
            }
            return id;


        }

        function getSimpleOperator(operator) {
            return operator === '==' ? 'eq' :
                operator === '=' ? 'eq' :
                operator === '!=' ? 'neq' :
                operator === '~' ? 'like' :
                operator === '>' ? 'gt' :
                operator === '<' ? 'lt' :
                operator === '>=' ? 'gte' :
                operator === '<=' ? 'lte' : operator;
        }

        function convertJsonOperator(operator) {
            return operator === 'eq' ? '=' :
                operator === 'neq' ? '!=' :
                operator === 'like' ? '~' :
                operator === 'gt' ? '>' :
                operator === 'lt' ? '<' :
                operator === 'gte' ? '>=' :
                operator === 'lte' ? '<=' : operator;
        }

        function parseJsonFilter(jsonFilter, isLeaf) {
            var sqlResult = '';

            // validar el tipo de filtro
            if (jsonFilter) {
                if (angular.isArray(jsonFilter)) {
                    angular.forEach(jsonFilter, function(curElement, idx) {
                        if (idx && !curElement.and && !curElement.or) {
                            sqlResult += ' and ';
                        }
                        sqlResult += parseJsonFilter(curElement, true);
                    });
                } else {
                    if (jsonFilter.and) {
                        if (!isLeaf) {
                            sqlResult += parseJsonFilter(jsonFilter.and);
                        } else {
                            sqlResult += ' and (' + parseJsonFilter(jsonFilter.and) + ')';
                        }
                    } else if (jsonFilter.or) {
                        if (!isLeaf) {
                            sqlResult += parseJsonFilter(jsonFilter.or);
                        } else {
                            sqlResult += ' or (' + parseJsonFilter(jsonFilter.or) + ')';
                        }
                    } else {
                        var sqlResultTmp;

                        angular.forEach(jsonFilter, function(complexValue, operator) {
                            angular.forEach(complexValue, function(value, field) {
                                if (!sqlResultTmp) {
                                    sqlResultTmp = '';
                                } else {
                                    sqlResultTmp += ' and ';
                                }

                                var finalValue = angular.isString(value) ? '"' + value + '"' : value;

                                if (angular.isArray(finalValue)) {
                                    sqlResultTmp += field.trim() + ' ' + convertJsonOperator(operator) + ' [' + finalValue + ']';
                                } else {
                                    sqlResultTmp += field.trim() + ' ' + convertJsonOperator(operator) + ' ' + finalValue;
                                }

                            });
                        });
                        sqlResult += sqlResultTmp;
                    }
                }
            }

            return sqlResult;
        }

        var filterKeyForTemplates = {
            'ENTITIES': {
                key: 'provision.administration.identifier',
                schema: {
                    type: "string",
                    public: true,
                    pattern: "^[a-zA-Z0-9_@.-]*$"
                },
                schemaName: "ogIdentifier"
            },
            'ENTITIES_VALUES': {
                key: 'provision.administration.identifier',
                schema: {
                    type: "string",
                    public: true,
                    pattern: "^[a-zA-Z0-9_@.-]*$"
                },
                schemaName: "ogIdentifier"
            },
            'OPERATIONS': { key: 'entityId' },
            'ALARMS': { key: 'entityId' },
            'DATAPOINTS': { key: 'datapoints.entityIdentifie' },
            'TICKET': {
                key: 'provision.ticket.entity',
                schema: {
                    type: "string",
                    public: true,
                    pattern: "^[a-zA-Z0-9_@.-]*$"
                },
                schemaName: "ogIdentifier",
            },

        }


        function buildFilterForTemplates(config, type, value) {
            var id = Math.floor((Math.random() * 1000) + 1);
            var previousFilterOQL = jsonPath(config, '$..oql')[0] || undefined;
            var previousQueryFields = jsonPath(config, '$..queryFields')[0] || undefined;
            var previousQueryAsString = jsonPath(config, '$..queryAsString')[0] || undefined;
            previousQueryAsString = previousQueryAsString && previousQueryAsString.length > 1 ? previousQueryAsString.substr(0, previousQueryAsString.lastIndexOf(')')) : undefined;
            var oql = filterKeyForTemplates[type].key + ' eq \'' + value + '\'';
            var finalOql = previousFilterOQL ? oql + ' and ' + previousFilterOQL : oql;

            var json = this.parseQueryNow(finalOql);
            var queryAsString = +id + '=\"' + value + '\")';
            var finalQueryAsString = previousQueryAsString ? previousQueryAsString + '&&' + queryAsString : '(' + queryAsString
            var queryfield = {
                id: id,
                name: filterKeyForTemplates[type].key,
                disabledComparators: [
                    8
                ],
                schema: filterKeyForTemplates[type].schema || undefined,
                schemaName: filterKeyForTemplates[type].schemaName || undefined
            }
            if (previousQueryFields) {
                previousQueryFields.push(queryfield)
            }
            var queryFields = previousQueryFields ? previousQueryFields : [queryfield];

            var finalFilter = json && json.filter ? json.filter : undefined;
            var filter = {
                type: 'advanced',
                oql: finalOql,
                queryAsString: finalQueryAsString,
                value: finalFilter ? JSON.stringify(finalFilter) : '{"eq": {"' + filterKeyForTemplates[type] + '": "' + value + '"}}',
                json: finalFilter ? JSON.stringify(finalFilter) : '{"eq": {"' + filterKeyForTemplates[type] + '": "' + value + '"}}',
                queryFields: queryFields
            };
            return filter;
        }


        return {
            suggest_field_delimited: function(term, target_element, selectors) {
                //var customSelectors = selectors;
                var result = suggest_field_delimited(term, target_element, selectors);
                return result;
            },
            parseQuery: function(values) {
                var result = parseQuery(values);
                return result;
            },
            parseQueryNow: function(oql) {
                try {
                    return queryParser(oql);
                } catch (err) {
                    console.error(err);
                    return null;
                }
            },
            parseJsonFilter: function(jsonFilter) {
                try {
                    return parseJsonFilter(jsonFilter);
                } catch (err) {
                    console.error(err);
                    return null;
                }
            },
            buildFilterForTemplates: buildFilterForTemplates
        };
    }
]);