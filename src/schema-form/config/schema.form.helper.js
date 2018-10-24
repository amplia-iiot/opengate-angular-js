angular.module('opengate-angular-js').config(function (schemaFormProvider, schemaFormDecoratorsProvider, sfPathProvider, sfBuilderProvider) {
    'use strict';
    var helper = function (name, schema, options) {
        var f;
        if (schema.type === 'string' && (schema.format === 'helperdialog' || schema.format === 'date' || schema.format === 'time' || schema.format === 'datetime' || schema.format === 'date-time')) {
            f = schemaFormProvider.stdFormObj(name, schema, options);
            f.key = options.path;

            if (schema.format === 'helperdialog') {
                f.type = 'helperdialog';
            } else if (schema.format === 'date') {
                f.type = 'date';
            } else if (schema.format === 'datetime' || schema.format === 'date-time') {
                f.type = 'datetime';
            } else if (schema.format === 'time') {
                f.type = 'time';
            }
        } else if (schema.type === 'object' && (schema.format === 'date' || schema.format === 'time' || schema.format === 'datetime' || schema.format === 'date-time')) {
            f = schemaFormProvider.stdFormObj(name, schema, options);
            f.key = options.path;

            if (schema.format === 'date') {
                f.type = 'date';
            } else if (schema.format === 'datetime' || schema.format === 'date-time') {
                f.type = 'datetime';
            } else if (schema.format === 'time') {
                f.type = 'time';
            }
        } else if (schema.type === 'boolean') {
            f = schemaFormProvider.stdFormObj(name, schema, options);
            f.key = options.path;
            f.type = 'boolean';
        } else if (schema.type === 'object') {
            if (schema.properties && schema.properties.position && schema.properties.zoom) {
                f = schemaFormProvider.stdFormObj(name, schema, options);
                f.key = options.path;
                f.type = 'map';
            }
        }

        if (f) {
            options.lookup[sfPathProvider.stringify(options.path)] = f;
            return f;
        }
    };

    schemaFormProvider.defaults.string.unshift(helper);
    schemaFormProvider.defaults.object.unshift(helper);
    schemaFormProvider.defaults.boolean.unshift(helper);

    // schemaFormProvider.defaults.radios.unshift(helper);

    schemaFormDecoratorsProvider.defineAddOn(
        'bootstrapDecorator', // Name of the decorator you want to add to.
        'helperdialog', // Form type that should render this add-on
        'schema-form/views/schema.form.helper.template.html', // Template name in $templateCache
        sfBuilderProvider.stdBuilders // List of builder functions to apply.
    );

    schemaFormDecoratorsProvider.defineAddOn(
        'bootstrapDecorator', // Name of the decorator you want to add to.
        'boolean', // Form type that should render this add-on
        'schema-form/views/schema.form.helper.boolean.template.html', // Template name in $templateCache
        sfBuilderProvider.stdBuilders // List of builder functions to apply.
    );

    schemaFormDecoratorsProvider.defineAddOn(
        'bootstrapDecorator', // Name of the decorator you want to add to.
        'checkboxes', // Form type that should render this add-on
        'schema-form/views/schema.form.helper.checkboxes.template.html', // Template name in $templateCache
        sfBuilderProvider.stdBuilders // List of builder functions to apply.
    );

    schemaFormDecoratorsProvider.defineAddOn(
        'bootstrapDecorator', // Name of the decorator you want to add to.
        'radios', // Form type that should render this add-on
        'schema-form/views/schema.form.helper.radios.template.html', // Template name in $templateCache
        sfBuilderProvider.stdBuilders // List of builder functions to apply.
    );

    schemaFormDecoratorsProvider.defineAddOn(
        'bootstrapDecorator', // Name of the decorator you want to add to.
        'radiobuttons', // Form type that should render this add-on
        'schema-form/views/schema.form.helper.radiobuttons.template.html', // Template name in $templateCache
        sfBuilderProvider.stdBuilders // List of builder functions to apply.
    );

    schemaFormDecoratorsProvider.defineAddOn(
        'bootstrapDecorator', // Name of the decorator you want to add to.
        'radios-inline', // Form type that should render this add-on
        'schema-form/views/schema.form.helper.radiosinline.template.html', // Template name in $templateCache
        sfBuilderProvider.stdBuilders // List of builder functions to apply.
    );

    ///////////////////////////////////////////////////////////////
    // todos los tipos para el selector de fechas
    schemaFormDecoratorsProvider.defineAddOn(
        'bootstrapDecorator', // Name of the decorator you want to add to.
        'datetime', // Form type that should render this add-on
        'schema-form/views/schema.form.helper.datetime.template.html', // Template name in $templateCache
        sfBuilderProvider.stdBuilders // List of builder functions to apply.
    );

    schemaFormDecoratorsProvider.defineAddOn(
        'bootstrapDecorator', // Name of the decorator you want to add to.
        'date-time', // Form type that should render this add-on
        'schema-form/views/schema.form.helper.datetime.template.html', // Template name in $templateCache
        sfBuilderProvider.stdBuilders // List of builder functions to apply.
    );

    schemaFormDecoratorsProvider.defineAddOn(
        'bootstrapDecorator', // Name of the decorator you want to add to.
        'date', // Form type that should render this add-on
        'schema-form/views/schema.form.helper.datetime.template.html', // Template name in $templateCache
        sfBuilderProvider.stdBuilders // List of builder functions to apply.
    );

    schemaFormDecoratorsProvider.defineAddOn(
        'bootstrapDecorator', // Name of the decorator you want to add to.
        'time', // Form type that should render this add-on
        'schema-form/views/schema.form.helper.datetime.template.html', // Template name in $templateCache
        sfBuilderProvider.stdBuilders // List of builder functions to apply.
    );

    schemaFormDecoratorsProvider.defineAddOn(
        'bootstrapDecorator', // Name of the decorator you want to add to.
        'map', // Form type that should render this add-on
        'schema-form/views/schema.form.map.template.html', // Template name in $templateCache
        sfBuilderProvider.stdBuilders // List of builder functions to apply.
    );
    ///////////////////////////////////////////////////////////////

    var customUiSelect = function (name, schema, options) {
        if (schema.type === 'string' && schema.format === 'customuiselect') {
            var f = schemaFormProvider.stdFormObj(name, schema, options);
            f.key = options.path;
            f.type = (schema.properties && schema.properties.type) ? schema.properties.type : 'string';
            options.lookup[sfPathProvider.stringify(options.path)] = f;
            return f;
        }
    };

    schemaFormProvider.defaults.string.unshift(customUiSelect);

    schemaFormDecoratorsProvider.defineAddOn(
        'bootstrapDecorator', // Name of the decorator you want to add to.
        'entity', // Form type that should render this add-on
        'schema-form/views/schema.form.entity.template.html', // Template name in $templateCache
        sfBuilderProvider.stdBuilders // List of builder functions to apply.
    );

    schemaFormDecoratorsProvider.defineAddOn(
        'bootstrapDecorator', // Name of the decorator you want to add to.
        'datastream', // Form type that should render this add-on
        'schema-form/views/schema.form.datastream.template.html', // Template name in $templateCache
        sfBuilderProvider.stdBuilders // List of builder functions to apply.
    );

    schemaFormDecoratorsProvider.defineAddOn(
        'bootstrapDecorator', // Name of the decorator you want to add to.
        'device', // Form type that should render this add-on
        'schema-form/views/schema.form.device.template.html', // Template name in $templateCache
        sfBuilderProvider.stdBuilders // List of builder functions to apply.
    );

    schemaFormDecoratorsProvider.defineAddOn(
        'bootstrapDecorator', // Name of the decorator you want to add to.
        'asset', // Form type that should render this add-on
        'schema-form/views/schema.form.asset.template.html', // Template name in $templateCache
        sfBuilderProvider.stdBuilders // List of builder functions to apply.
    );

    schemaFormDecoratorsProvider.defineAddOn(
        'bootstrapDecorator', // Name of the decorator you want to add to.
        'organization', // Form type that should render this add-on
        'schema-form/views/schema.form.organization.template.html', // Template name in $templateCache
        sfBuilderProvider.stdBuilders // List of builder functions to apply.
    );

    schemaFormDecoratorsProvider.defineAddOn(
        'bootstrapDecorator', // Name of the decorator you want to add to.
        'channel', // Form type that should render this add-on
        'schema-form/views/schema.form.channel.template.html', // Template name in $templateCache
        sfBuilderProvider.stdBuilders // List of builder functions to apply.
    );

    schemaFormDecoratorsProvider.defineAddOn(
        'bootstrapDecorator', // Name of the decorator you want to add to.
        'serviceGroup', // Form type that should render this add-on
        'schema-form/views/schema.form.serviceGroup.template.html', // Template name in $templateCache
        sfBuilderProvider.stdBuilders // List of builder functions to apply.
    );
    schemaFormDecoratorsProvider.defineAddOn(
        'bootstrapDecorator', // Name of the decorator you want to add to.
        'oglist', // Form type that should render this add-on
        'schema-form/views/schema.form.ogtypelist.template.html', // Template name in $templateCache
        sfBuilderProvider.stdBuilders // List of builder functions to apply.
    );

    schemaFormDecoratorsProvider.defineAddOn(
        'bootstrapDecorator', // Name of the decorator you want to add to.
        'hardware', // Form type that should render this add-on
        'schema-form/views/schema.form.hardware.template.html', // Template name in $templateCache
        sfBuilderProvider.stdBuilders // List of builder functions to apply.
    );

    schemaFormDecoratorsProvider.defineAddOn(
        'bootstrapDecorator', // Name of the decorator you want to add to.
        'subscription', // Form type that should render this add-on
        'schema-form/views/schema.form.subscription.template.html', // Template name in $templateCache
        sfBuilderProvider.stdBuilders // List of builder functions to apply.
    );
});