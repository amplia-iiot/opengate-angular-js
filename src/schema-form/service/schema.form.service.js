angular.module('opengate-angular-js')
    .service('$schemaFormUtils', ['$provisionDatastreamsUtils', '$api', '$q',
        function($provisionDatastreamsUtils, $api, $q) {
            'use strict';

            function checkFieldToForm(field, form) {
                if (!field) {
                    throw new Error("First parameter field must be a string or object");
                }
                if (!Array.isArray(form)) {
                    throw new Error("Second parameter form must be an array");
                }
            }

            function removeFieldToForm(field, form) {
                checkFieldToForm(field, form);
                form = form.filter(function(value) {
                    if (typeof value === 'string') {
                        if (typeof field === 'string') {
                            return value !== field;
                        } else {
                            var field_value = Array.isArray(field.key) ? field.key[0] : field.key;
                            return value !== field_value;
                        }
                    } else {
                        if (typeof field === 'string') {
                            var value_value = Array.isArray(value.key) ? value.key[0] : value.key;
                            return field !== value_value;
                        } else {
                            var f = Array.isArray(field.key) ? field.key[0] : field.key;
                            var v = Array.isArray(value.key) ? value.key[0] : value.key;
                            return f !== v;
                        }
                    }
                });
                return form;
            }

            function addFieldToForm(field, form) {
                checkFieldToForm(field, form);
                form.push(typeof field === 'string' ? {
                    "key": "['" + field + "']"
                } : field);
                return form;
            }

            function SchemaFormCreator() {
                var _this = this;
                var schema = {
                    type: "object",
                    properties: {},
                    required: []
                };
                var identifiers = [];
                var form = [];

                function addToSchema($item, creationMode, withoutHelper) {
                    var identifier = $item.identifier;
                    if ($item.required) {
                        schema.required.push(identifier);
                    }
                    if (!$item.modifiable) {
                        $item.schema.readOnly = $item.schema.readOnly || (!creationMode || $item.calculated);
                    }
                    $item.schema.description = $item.description;
                    $item.title = ($item.name || identifier) + ($item.unit && $item.unit.label ? ' (' + $item.unit.label + ')' : '');
                    $item.schema.title = $item.title;
                    addExtraAttributes($item.schema, withoutHelper);
                    addIdentifier(identifier);
                    form = addFieldToForm(identifier, form);

                    schema.properties[identifier] = $item.schema;
                }

                function addExtraAttributes(schema, withoutHelper) {
                    var _keys = Object.keys(schema);
                    _keys.forEach(function(key) {
                        var obj = schema[key];
                        if (!withoutHelper) {
                            if (obj === 'string' && typeof schema.format === 'undefined' && typeof schema.enum === 'undefined') {
                                schema.format = 'string';
                            }
                        }
                        if (angular.isObject(obj)) {
                            addExtraAttributes(obj, withoutHelper);
                        }
                    });
                }

                function addIdentifier(identifier) {
                    if (identifiers.indexOf(identifier) === -1) {
                        identifiers.push(identifier);
                    }
                }

                this.updateForm = function(form) {
                    form = angular.copy(form);
                };


                this.addField = function($item, creationMode, withoutHelper) {
                    var defered = $q.defer();
                    var promise = defered.promise;

                    if (typeof $item.schema.$ref === 'string') {
                        var path = '$.' + $item.schema.$ref.split('#')[1];
                        path = path.replace(/[\/]/g, '.');
                        $api().basicTypesSearchBuilder().withPath(path).execute().then(function(response) {
                            $item.schema = response.data;
                            addToSchema($item, creationMode, withoutHelper);
                            defered.resolve();
                        }).catch(function(err) {
                            console.error(err);
                            defered.reject(err);
                        });
                    } else {
                        addToSchema($item, creationMode, withoutHelper);
                        defered.resolve();
                    }
                    return promise;
                };

                this.addFields = function(fields, creationMode, withoutHelper) {
                    var promisses = [];
                    if (Array.isArray(fields) && fields.length > 0) {
                        fields.forEach(function(field) {
                            promisses.push(_this.addField(field, creationMode, withoutHelper));
                        });
                        return $q.all(promisses).catch(function(err) {
                            console.error(err);
                        });
                    } else {
                        throw new Error("fields must be an array");
                    }
                };

                this.removeField = function(field) {
                    delete schema.properties[field];
                    schema.required.splice(schema.required.indexOf(field), 1);
                    identifiers.splice(identifiers.indexOf(field), 1);
                    form = removeFieldToForm(field, form);
                };

                this.getSchema = function() {
                    return schema;
                };

                this.getForm = function() {
                    return form;
                };

                this.getIdentifiers = function() {
                    return identifiers;
                };
            }

            return {
                addFieldToForm: addFieldToForm,
                removeFieldToForm: removeFieldToForm,
                getSchemaFormCreator: function() {
                    return new SchemaFormCreator();
                },
                getSchemaFormCreatorFromDatamodel: function(options) {
                    var customfields = options.customFields;
                    var allowedResourceTypes = options.allowedResourceTypes;
                    var organization = options.organization;
                    var creationMode = options.creationMode;
                    var fromAllDatamodels = options.fromAllDatamodels;
                    var withoutHelper = options.withoutHelper;

                    var filter = fromAllDatamodels ? {
                        and: []
                    } : $provisionDatastreamsUtils.getFilter();

                    var defered = $q.defer();
                    var promise = defered.promise;

                    if (Array.isArray(customfields) && customfields.length > 0) {
                        filter.and.push({
                            'in': {
                                'datamodels.categories.datastreams.identifier': customfields
                            }
                        });
                        // } else {
                        //     defered.reject("First parameter must be an array of datastreams identifier");
                    }

                    var schemaFormCreator = new SchemaFormCreator({
                        creationMode: creationMode
                    });
                    if (allowedResourceTypes) {
                        filter.and.push({
                            'in': {
                                'datamodels.allowedResourceTypes': allowedResourceTypes
                            }
                        });
                    }

                    if (organization) {
                        filter.and.push({
                            'eq': {
                                'datamodels.organizationName': organization
                            }
                        });
                    }

                    $api().datamodelsSearchBuilder().filter(filter).build().execute()
                        .then(function(response) {
                            var datamodels = response.data.datamodels;
                            if (!fromAllDatamodels) {
                                datamodels = $provisionDatastreamsUtils.filterForCoreDatamodelsCatalog(datamodels);
                            }

                            var rd = datamodels.reduce(function(first, next) {
                                var categories = [];
                                if (next.categories) {
                                    return first.concat(next.categories.reduce(function(first, next) {
                                        if (next.datastreams)
                                            return first.concat(next.datastreams);
                                        return first;
                                    }, categories));
                                }
                                return first;
                            }, []);
                            var datastreams = rd.reduce(function(first, ds) {
                                first[ds.identifier] = ds;
                                return first;
                            }, []);
                            var promisses = [];

                            if (Array.isArray(customfields) && customfields.length > 0) {
                                customfields.forEach(function(identifier) {
                                    var confDatastream = datastreams[identifier];
                                    if (typeof confDatastream === 'undefined') {
                                        console.error('Datastream ' + identifier + ' no exists or not is custom.');
                                    } else {
                                        promisses.push(schemaFormCreator.addField(confDatastream, undefined, withoutHelper));
                                    }
                                });
                            } else {
                                Object.keys(datastreams).forEach(function(streamId) {
                                    promisses.push(schemaFormCreator.addField(datastreams[streamId], undefined, withoutHelper));
                                });
                            }

                            if (promisses.length > 0) {
                                $q.all(promisses).then(function() {
                                    defered.resolve(schemaFormCreator);
                                }).catch(function(err) {
                                    console.error(err);
                                    defered.reject(err);
                                });
                            }

                        })
                        .catch(function(err) {
                            console.error(err);
                            defered.reject(err);
                        });
                    return promise;
                }
            };

        }
    ]);