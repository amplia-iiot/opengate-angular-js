'use strict';

// Filter service
angular.module('opengate-angular-js').factory('Filter', ['$window', '$sce', '$q',

    function($window, $sce, $q) {
        //var customSelectors = [];
        var conditionSelectors = [];
        //var separators = [' ', '\n', '-', '!', '=', '~', '>', '<', '&', 'or', 'and', '(', ')', 'eq', 'neq', '==', 'like', 'gt', 'gte', 'lt', 'lte', '<=', '>='];
        var separators = [' ', '\n', '!', '=', '~', '>', '<', '&', 'or', 'and', ')', 'in', ',', 'neq', 'like', 'within'];

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



        function parseQuery(string) {
            var promises = '';
            var defered = $q.defer();
            var promise = defered.promise;
            var parse_tree = null;
            var query = {
                text: [],
                offsets: [],
                filter: {}
            };
            try {
                //job.id like "1e" or (job.id like 189 and job.status== FINISHED) and job.status== CANCELED
                $window.jsep.addBinaryOp('and', 1);
                $window.jsep.addBinaryOp('&&', 1);
                $window.jsep.addBinaryOp('||', 2);
                $window.jsep.addBinaryOp('or', 2);
                $window.jsep.addBinaryOp('in', 2);
                $window.jsep.addBinaryOp('within', 2);
                $window.jsep.addBinaryOp('~', 6);
                $window.jsep.addBinaryOp('=', 6);

                $window.jsep.addBinaryOp('like', 6);
                $window.jsep.addBinaryOp('gt', 6);
                $window.jsep.addBinaryOp('lte', 6);
                $window.jsep.addBinaryOp('gte', 6);
                $window.jsep.addBinaryOp('eq', 6);
                $window.jsep.addBinaryOp('neq', 6);
                $window.jsep.addBinaryOp(',', 6);

                parse_tree = $window.jsep(string);
                query.filter[parse_tree.operator] = [];

                query.filter = parseSimple(parse_tree);
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

        function parseSimple(parse_tree) {
            var id, value, newFilter = {};
            var op;
            if (parse_tree.type === 'BinaryExpression' && /\eq|\neq|\like|\gt|\lt|\gte|\lte|\=|\'<'|\'>'|\~|\!/.test(parse_tree.operator)) {
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
                newFilter[parse_tree.operator] = [];
                newFilter[parse_tree.operator].push(parseSimple(parse_tree.left));
                newFilter[parse_tree.operator].push(parseSimple(parse_tree.right));

            } else if (parse_tree.type === 'BinaryExpression' && /\within/.test(parse_tree.operator)) {
                if (parse_tree.right.type === 'ArrayExpression' && parse_tree.right.elements[0].left && parse_tree.right.elements[0].right) {
                    id = getId(parse_tree.left).split('.').reverse().join('.');
                    id = id.replace('.undefined', '[]');
                    op = getSimpleOperator(parse_tree.operator);

                    newFilter[op] = {};

                    newFilter[op][id] = [parse_tree.right.elements[0].left.value, parse_tree.right.elements[0].right.value];
                }
            } else if (parse_tree.type === 'BinaryExpression' && /\in/.test(parse_tree.operator)) {
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


        return {
            suggest_field_delimited: function(term, target_element, selectors) {
                var customSelectors = selectors;
                var result = suggest_field_delimited(term, target_element, selectors);
                return result;
            },
            parseQuery: function(values) {
                var result = parseQuery(values);
                return result;
            }
        };
    }
]);