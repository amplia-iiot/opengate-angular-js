(function(window, undefined) {'use strict';

angular.module('uxleaflet', []);
angular.module('opengate-angular-js', ['schemaForm', 'uxleaflet', 'ui-leaflet']);
angular.module("opengate-angular-js").run(["$templateCache", function($templateCache) {$templateCache.put("components/views/action.button.html","<div class=form-group><div ng-repeat=\"action in $ctrl.actions\" permission permission-only=action.permissions><a title={{action.title}} style=cursor:pointer ng-click=$ctrl.onAction(action) class=\"custom-ui-select-button btn btn-xs no-margin {{(action.disable && action.disable()) ? \'disabled\' : \'\'}}\"><i class=\"text-primary {{action.icon}}\"></i>&nbsp;<small>{{action.title}}</small></a></div></div>");
$templateCache.put("components/views/custom.ui.map.html","<div class=no-margin><div class=\"col-xs-12 no-padding\"><label class=custom-ui-select-label>{{ ($ctrl.label?$ctrl.label:\'FORM.LABEL.ENTITY_KEY\') | translate }}<field-options required=$ctrl.required multiple=$ctrl.multiple loading=$ctrl.reloadingInfo></field-options></label></div><div class=row ng-if=!$ctrl.disabled><div class=\"col-xs-3 form-group no-margin\"><input ng-required=$ctrl.required type=number class=form-control title=\"{{ \'FORM.TITLE.LATITUDE\' | translate }}\" placeholder=\"{{ \'FORM.TITLE.LATITUDE\' | translate }}\" ng-model=$ctrl.coordsObj.new.lat></div><div class=\"col-xs-3 form-group no-margin\"><input ng-required=$ctrl.required type=number class=form-control title=\"{{ \'FORM.TITLE.LONGITUDE\' | translate }}\" placeholder=\"{{ \'FORM.TITLE.LONGITUDE\' | translate }}\" ng-model=$ctrl.coordsObj.new.lng></div><div class=\"col-xs-2 form-group no-margin\"><button type=button ng-disabled=\"$ctrl.coordsObj.current.lat === $ctrl.coordsObj.new.lat && $ctrl.coordsObj.current.lng === $ctrl.coordsObj.new.lng\" class=\"btn btn-info no-margin\" ng-click=$ctrl.searchCoords()><i class=\"fa fa-search\"></i></button> <button type=button ng-if=!$ctrl.disabled class=\"btn btn-default no-margin\" ng-click=$ctrl.applyCoords()><i class=\"fa fa-map-marker\"></i></button></div></div><div class=col-xs-12><small>{{ $ctrl.display_name }}&nbsp;</small></div><leaflet ng-if=$ctrl.showMap id=\"{{ $ctrl.map.id }}\" lf-center=$ctrl.map.center layers=$ctrl.map.layers controls=$ctrl.map.controls event-broadcast=$ctrl.map.events markers=$ctrl.map.markers width=100% height=150px></leaflet><div class=row ng-if=\"!$ctrl.disabled && !$ctrl.onlyMap\"><div class=\"col-xs-12 col-md-5 form-group no-margin\"><input ng-required=$ctrl.required type=text class=form-control title=\"{{ \'FORM.TITLE.ADDRESS\' | translate }}\" placeholder=\"{{ \'FORM.TITLE.ADDRESS\' | translate }}\" ng-model=$ctrl.location.address></div><div class=\"col-xs-12 col-md-5 form-group no-margin\"><input ng-required=$ctrl.required type=text class=form-control title=\"{{ \'FORM.TITLE.TOWN\' | translate }}\" placeholder=\"{{ \'FORM.TITLE.TOWN\' | translate }}\" ng-model=$ctrl.location.town></div><div class=\"col-xs-12 col-md-2 form-group no-margin\"><input ng-required=$ctrl.required type=text class=form-control title=\"{{ \'FORM.TITLE.POSTAL_CODE\' | translate }}\" placeholder=\"{{ \'FORM.TITLE.POSTAL_CODE\' | translate }}\" ng-model=$ctrl.location.postal></div></div><div class=row ng-if=\"!$ctrl.disabled && !$ctrl.onlyMap\"><div class=\"col-xs-12 col-md-5 form-group no-margin\"><input ng-required=$ctrl.required type=text class=form-control title=\"{{ \'FORM.TITLE.PROVINCE\' | translate }}\" placeholder=\"{{ \'FORM.TITLE.PROVINCE\' | translate }}\" ng-model=$ctrl.location.province></div><div class=\"col-xs-12 col-md-5 form-group no-margin\"><input ng-required=$ctrl.required type=text class=form-control title=\"{{ \'FORM.TITLE.REGION\' | translate }}\" placeholder=\"{{ \'FORM.TITLE.REGION\' | translate }}\" ng-model=$ctrl.location.region></div><div class=\"col-xs-12 col-md-2 form-group no-margin\"><input ng-required=$ctrl.required type=text class=form-control title=\"{{ \'FORM.TITLE.COUNTRY.NAME\' | translate }}\" placeholder=\"{{ \'FORM.TITLE.COUNTRY.NAME\' | translate }}\" ng-model=$ctrl.location.country></div></div></div>");
$templateCache.put("components/views/fieldOptions.html","<small class=ux-txt-danger ng-if=$ctrl.required title=\"{{ \'FORM.FIELD.REQUIRED\' | translate }}\">*</small> <small class=ux-txt-warning ng-if=$ctrl.optional title=\"{{ \'FORM.FIELD.OPTIONAL\' | translate }}\">(-)</small> <small class=ux-txt-info ng-if=$ctrl.multiple title=\"{{ \'FORM.FIELD.MULTIPLE\' | translate }}\"><span class=fa-stack style=font-size:0.5em;><i class=\"fa fa-clone fa-stack-2x\"></i> <i class=\"fa fa-check fa-stack-1x\"></i></span></small> <small class=ux-txt-info ng-if=$ctrl.loading><span class=\"fa fa-spinner fa-spin\" style=font-size:1.2em;></span></small>");
$templateCache.put("custom-ui-select/views/custom.ui.select.area.html","<div class=\"form-group no-margin\" mass-autocomplete ng-if=$ctrl.multiple><label class=custom-ui-select-label>{{ \'FORM.LABEL.AREA\' | translate }}<field-options required=$ctrl.required multiple=$ctrl.multiple></field-options></label><ui-select custom-ui-select-config=$ctrl.ownConfig name=area ng-model=$ctrl.area theme=bootstrap title=\"{{ \'FORM.PLACEHOLDER.AREA_MULTI\' | translate }}\" custom-ui-select multiple=true custom-mass-autocomplete-item=$ctrl.ownConfig on-select=\"$ctrl.areaSelected($item, $model)\" on-remove=\"$ctrl.areaRemove($item, $model)\" ng-required=$ctrl.required><ui-select-match class={{$ctrl.uiSelectMatchClass}} placeholder=\"{{ \'FORM.PLACEHOLDER.AREA_MULTI\' | translate }}\" allow-clear=true>{{$item.identifier}}</ui-select-match><ui-select-choices repeat=\"area in $ctrl.ownConfig.collection | filter:$select.search track by $index\"><div><span ng-bind-html=\"area.identifier | highlight: $select.search\"></span> - <span ng-bind-html=\"area.name | highlight: $select.search\"></span><br><span ng-bind-html=\"area.organization | highlight: $select.search\"></span></div></ui-select-choices></ui-select></div><div class=\"form-group no-margin\" mass-autocomplete ng-if=!$ctrl.multiple><label class=custom-ui-select-label>{{ \'FORM.LABEL.AREA\' | translate }}<field-options required=$ctrl.required multiple=$ctrl.multiple></field-options></label><ui-select custom-ui-select-config=$ctrl.ownConfig name=area ng-model=$ctrl.area theme=bootstrap title=\"Choose an area\" custom-ui-select multiple=false custom-mass-autocomplete-item=$ctrl.ownConfig on-select=\"$ctrl.areaSelected($item, $model)\" on-remove=\"$ctrl.areaRemove($item, $model)\" ng-required=$ctrl.required><ui-select-match class={{$ctrl.uiSelectMatchClass}} placeholder=\"{{ \'FORM.PLACEHOLDER.AREA\' | translate }}\" allow-clear=true>{{$item.identifier}}</ui-select-match><ui-select-choices repeat=\"area in $ctrl.ownConfig.collection | filter:$select.search track by $index\"><div><span ng-bind-html=\"area.identifier | highlight: $select.search\"></span> - <span ng-bind-html=\"area.name | highlight: $select.search\"></span><br><span ng-bind-html=\"area.organization | highlight: $select.search\"></span></div></ui-select-choices></ui-select></div>");
$templateCache.put("custom-ui-select/views/custom.ui.select.asset.html","<div class=\"form-group no-margin\" mass-autocomplete ng-if=$ctrl.multiple><label ng-if=$ctrl.label class=custom-ui-select-label>{{ $ctrl.label | translate }}<field-options required=$ctrl.ngRequired multiple=$ctrl.multiple></field-options></label><ui-select custom-ui-select-config=$ctrl.ownConfig ng-disabled=$ctrl.disabled name=asset ng-model=$ctrl.asset theme=bootstrap title=\"Choose a asset\" custom-ui-select custom-ui-select-action=$ctrl.action multiple=true custom-mass-autocomplete-item=$ctrl.ownConfig on-select=\"$ctrl.assetSelected($item, $model)\" on-remove=\"$ctrl.assetRemove($item, $model)\" ng-required=$ctrl.ngRequired><ui-select-match class={{$ctrl.uiSelectMatchClass}} placeholder=\"{{ \'FORM.PLACEHOLDER.ENTITY\' | translate }}\" allow-clear=true>{{$item.provision.administration.identifier._current.value || $item.identifier}}</ui-select-match><ui-select-choices repeat=\"assetData in $ctrl.ownConfig.collection track by $index\"><span ng-bind-html=\"assetData.provision.administration.identifier._current.value | highlight: $select.search\"></span> <small><div ng-if=assetData.provision.asset.specificType._current.value>{{ \'FORM.LABEL.SPECIFIC_TYPE\' | translate }}: <span ng-bind-html=\"assetData.provision.asset.specificType._current.value | highlight: $select.search\"></span></div><div ng-if=assetData.provision.asset.name._current.value>{{ \'FORM.LABEL.NAME\' | translate }}: <span ng-bind-html=\"\'\'+assetData.provision.asset.name._current.value | highlight: $select.search\"></span></div></small></ui-select-choices></ui-select></div><div class=\"form-group no-margin\" mass-autocomplete ng-if=!$ctrl.multiple><label ng-if=$ctrl.label class=custom-ui-select-label>{{ $ctrl.label | translate }}<field-options required=$ctrl.ngRequired multiple=$ctrl.multiple></field-options></label><ui-select custom-ui-select-config=$ctrl.ownConfig ng-disabled=$ctrl.disabled name=asset ng-model=$ctrl.asset theme=bootstrap title=\"Choose an asset\" custom-ui-select multiple=false custom-mass-autocomplete-item=$ctrl.ownConfig on-select=\"$ctrl.assetSelected($item, $model)\" on-remove=\"$ctrl.assetRemove($item, $model)\" ng-required=$ctrl.ngRequired><ui-select-match class={{$ctrl.uiSelectMatchClass}} placeholder=\"{{ \'FORM.PLACEHOLDER.ENTITY\' | translate }}\" allow-clear=true>{{$item.provision.administration.identifier._current.value || $item.identifier}}</ui-select-match><ui-select-choices repeat=\"assetData in $ctrl.ownConfig.collection track by $index\"><span ng-bind-html=\"assetData.provision.administration.identifier._current.value | highlight: $select.search\"></span> <small><div ng-if=assetData.provision.asset.specificType._current.value>{{ \'FORM.LABEL.SPECIFIC_TYPE\' | translate }}: <span ng-bind-html=\"assetData.provision.asset.specificType._current.value | highlight: $select.search\"></span></div><div ng-if=assetData.provision.asset.name._current.value>{{ \'FORM.LABEL.NAME\' | translate }}: <span ng-bind-html=\"\'\'+assetData.provision.asset.name._current.value | highlight: $select.search\"></span></div></small></ui-select-choices></ui-select></div><action-button ng-if=\"$ctrl.actions && !$ctrl.disabled\" actions=$ctrl.actions></action-button>");
$templateCache.put("custom-ui-select/views/custom.ui.select.bundle.html","<div class=\"form-group no-margin\" mass-autocomplete ng-if=$ctrl.multiple><label class=custom-ui-select-label>{{ \'FORM.LABEL.BUNDLE_NAME\' | translate }}<field-options required=$ctrl.required multiple=$ctrl.multiple></field-options></label><ui-select custom-ui-select-config=$ctrl.ownConfig name=bundle ng-model=$ctrl.bundle theme=bootstrap title=\"{{ \'FORM.PLACEHOLDER.BUNDLE_MULTI\' | translate }}\" custom-ui-select multiple=true custom-mass-autocomplete-item=$ctrl.ownConfig on-select=\"$ctrl.bundleSelected($item, $model)\" on-remove=\"$ctrl.bundleRemove($item, $model)\" ng-required=$ctrl.required><ui-select-match class={{$ctrl.uiSelectMatchClass}} placeholder=\"{{ \'FORM.PLACEHOLDER.BUNDLE_MULTI\' | translate }}\" allow-clear=true>{{$item.name}} (v{{$item.version}})</ui-select-match><ui-select-choices repeat=\"bundle in $ctrl.ownConfig.collection | filter:$select.search track by $index\"><div><span ng-bind-html=\"bundle.name | highlight: $select.search\"></span> - <span ng-bind-html=\"bundle.version | highlight: $select.search\"></span><br><span ng-bind-html=\"bundle.description | highlight: $select.search\"></span></div></ui-select-choices></ui-select></div><div class=\"form-group no-margin\" mass-autocomplete ng-if=!$ctrl.multiple><label class=custom-ui-select-label>{{ \'FORM.LABEL.BUNDLE_NAME\' | translate }}<field-options required=$ctrl.required multiple=$ctrl.multiple></field-options></label><ui-select custom-ui-select-config=$ctrl.ownConfig name=bundle ng-model=$ctrl.bundle theme=bootstrap title=\"Choose an bundle\" custom-ui-select multiple=false custom-mass-autocomplete-item=$ctrl.ownConfig on-select=\"$ctrl.bundleSelected($item, $model)\" on-remove=\"$ctrl.bundleRemove($item, $model)\" ng-required=$ctrl.required><ui-select-match class={{$ctrl.uiSelectMatchClass}} placeholder=\"{{ \'FORM.PLACEHOLDER.BUNDLE\' | translate }}\" allow-clear=true>{{$item.name}} (v{{$item.version}})</ui-select-match><ui-select-choices repeat=\"bundle in $ctrl.ownConfig.collection | filter:$select.search track by $index\"><div><span ng-bind-html=\"bundle.name | highlight: $select.search\"></span> (v<span ng-bind-html=\"bundle.version | highlight: $select.search\"></span>)<br><span ng-bind-html=\"bundle.description | highlight: $select.search\"></span></div></ui-select-choices></ui-select></div>");
$templateCache.put("custom-ui-select/views/custom.ui.select.channel.html","<div class=\"form-group no-margin\" mass-autocomplete ng-if=$ctrl.multiple><label ng-if=$ctrl.label class=custom-ui-select-label>{{ $ctrl.label | translate }}<field-options required=$ctrl.ngRequired multiple=$ctrl.multiple></field-options></label><ui-select name=channel custom-ui-select-config=$ctrl.ownConfig ng-model=$ctrl.channel theme=bootstrap title=\"Choose a channel\" custom-ui-select multiple=true custom-mass-autocomplete-item=$ctrl.ownConfig on-select=\"$ctrl.channelSelected($item, $model)\" on-remove=\"$ctrl.channelRemove($item, $model)\" ng-required=$ctrl.ngRequired><ui-select-match class={{$ctrl.uiSelectMatchClass}} placeholder=\"{{ \'FORM.PLACEHOLDER.CHOOSE_A_CHANNEL\' | translate }}\" allow-clear=true>{{$item.provision.administration.identifier._current.value}}</ui-select-match><ui-select-choices repeat=\"channel in $ctrl.ownConfig.collection track by $index\"><span ng-bind-html=\"channel.provision.administration.identifier._current.value | highlight: $select.search\"></span> <small>(<span ng-bind-html=\"channel.provision.administration.organization._current.value | highlight: $select.search\"></span>)</small></ui-select-choices></ui-select></div><div class=\"form-group no-margin\" mass-autocomplete ng-if=!$ctrl.multiple><label ng-if=$ctrl.label class=custom-ui-select-label>{{ $ctrl.label | translate }}<field-options required=$ctrl.ngRequired multiple=$ctrl.multiple></field-options></label><ui-select custom-ui-select-config=$ctrl.ownConfig name=channel ng-model=$ctrl.channel theme=bootstrap title=\"Choose a channel\" custom-ui-select multiple=false custom-mass-autocomplete-item=$ctrl.ownConfig on-select=\"$ctrl.channelSelected($item, $model)\" on-remove=\"$ctrl.channelRemove($item, $model)\" ng-required=$ctrl.ngRequired><ui-select-match class={{$ctrl.uiSelectMatchClass}} placeholder=\"{{ \'FORM.PLACEHOLDER.CHOOSE_A_CHANNEL\' | translate }}\" allow-clear=true>{{$item.provision.administration.identifier._current.value}}</ui-select-match><ui-select-choices repeat=\"channel in $ctrl.ownConfig.collection track by $index\"><span ng-bind-html=\"channel.provision.administration.identifier._current.value | highlight: $select.search\"></span> <small>(<span ng-bind-html=\"channel.provision.administration.organization._current.value | highlight: $select.search\"></span>)</small></ui-select-choices></ui-select></div>");
$templateCache.put("custom-ui-select/views/custom.ui.select.datastream.html","<div class=\"form-group no-margin\" mass-autocomplete ng-if=$ctrl.multiple><label class=custom-ui-select-label>{{ \'FORM.LABEL.DATASTREAM_ID\' | translate }}<field-options required=$ctrl.ngRequired multiple=$ctrl.multiple></field-options></label><ui-select custom-ui-select-config=$ctrl.ownConfig ng-disabled=$ctrl.disabled name=datastream ng-model=$ctrl.datastream theme=bootstrap title=\"{{ ($ctrl.placeholder?$ctrl.placeholder:\'FORM.PLACEHOLDER.DATASTREAM\') | translate }}\" custom-ui-select multiple=true custom-mass-autocomplete-item=$ctrl.ownConfig on-select=\"$ctrl.datastreamSelected($item, $model)\" on-remove=\"$ctrl.datastreamRemove($item, $model)\" ng-required=$ctrl.ngRequired><ui-select-match class={{$ctrl.uiSelectMatchClass}} placeholder=\"{{ ($ctrl.placeholder?$ctrl.placeholder:\'FORM.PLACEHOLDER.DATASTREAM\') | translate }}\" allow-clear=true>{{$item.identifier}}</ui-select-match><ui-select-choices repeat=\"ds in $ctrl.ownConfig.collection | limitTo:$ctrl.maxResults track by $index\"><div><span ng-bind-html=\"ds.identifier | highlight: $select.search\"></span> - <span ng-bind-html=\"ds.name | highlight: $select.search\"></span></div><small><div ng-if=ds.category.name>{{ \'FORM.LABEL.CATEGORY\' | translate }} <span ng-bind-html=\"ds.category.name | highlight: $select.search\"></span></div><div ng-if=ds.feed>{{ \'FORM.LABEL.FEED\' | translate }}: <span ng-bind-html=\"ds.feed | highlight: $select.search\"></span></div><div ng-if=ds.datamodel><div>{{ \'FORM.LABEL.DATAMODEL\' | translate }}:</div><div>- {{ \'FORM.LABEL.ID\' | translate }}: <span ng-bind-html=\"ds.datamodel.identifier | highlight: $select.search\"></span><div>- {{ \'FORM.LABEL.ORGANIZATION\' | translate }}: <span ng-bind-html=\"ds.datamodel.organization | highlight: $select.search\"></span><div>- {{ \'FORM.LABEL.NAME\' | translate }}: <span ng-bind-html=\"ds.datamodel.name | highlight: $select.search\"></span><div>- {{ \'FORM.LABEL.DESCRIPTION\' | translate }}: <span ng-bind-html=\"ds.datamodel.description | highlight: $select.search\"></span><div>- {{ \'FORM.LABEL.VERSION\' | translate }}: <span ng-bind-html=\"ds.datamodel.version | highlight: $select.search\"></span></div></div></div></div></div></div></small></ui-select-choices></ui-select></div><div class=\"form-group no-margin\" mass-autocomplete ng-if=!$ctrl.multiple><label class=custom-ui-select-label>{{\'FORM.LABEL.DATASTREAM_ID\' | translate}}<field-options required=$ctrl.ngRequired multiple=$ctrl.multiple></field-options></label><ui-select custom-ui-select-config=$ctrl.ownConfig ng-disabled=$ctrl.disabled name=datastream ng-model=$ctrl.datastream theme=bootstrap title=\"{{ ($ctrl.placeholder?$ctrl.placeholder:\'FORM.PLACEHOLDER.DATASTREAM\') | translate }}\" custom-ui-select multiple=false custom-mass-autocomplete-item=$ctrl.ownConfig on-select=\"$ctrl.datastreamSelected($item, $model)\" on-remove=\"$ctrl.datastreamRemove($item, $model)\" ng-required=$ctrl.ngRequired><ui-select-match class={{$ctrl.uiSelectMatchClass}} placeholder=\"{{ ($ctrl.placeholder?$ctrl.placeholder:\'FORM.PLACEHOLDER.DATASTREAM\') | translate }}\" allow-clear=true>{{$item.identifier}}</ui-select-match><ui-select-choices repeat=\"ds in $ctrl.ownConfig.collection | limitTo:$ctrl.maxResults track by $index\"><div><span ng-bind-html=\"ds.identifier | highlight: $select.search\"></span> - <span ng-bind-html=\"ds.name | highlight: $select.search\"></span></div><small><div ng-if=ds.category.name>{{ \'FORM.LABEL.CATEGORY\' | translate }} <span ng-bind-html=\"ds.category.name | highlight: $select.search\"></span></div><div ng-if=ds.feed>{{ \'FORM.LABEL.FEED\' | translate }}: <span ng-bind-html=\"ds.feed | highlight: $select.search\"></span></div><div ng-if=ds.datamodel><div>{{ \'FORM.LABEL.DATAMODEL\' | translate }}:</div><div>- {{ \'FORM.LABEL.ID\' | translate }}: <span ng-bind-html=\"ds.datamodel.identifier | highlight: $select.search\"></span><div>- {{ \'FORM.LABEL.ORGANIZATION\' | translate }}: <span ng-bind-html=\"ds.datamodel.organization | highlight: $select.search\"></span><div>- {{ \'FORM.LABEL.NAME\' | translate }}: <span ng-bind-html=\"ds.datamodel.name | highlight: $select.search\"></span><div>- {{ \'FORM.LABEL.DESCRIPTION\' | translate }}: <span ng-bind-html=\"ds.datamodel.description | highlight: $select.search\"></span><div>- {{ \'FORM.LABEL.VERSION\' | translate }}: <span ng-bind-html=\"ds.datamodel.version | highlight: $select.search\"></span></div></div></div></div></div></div></small></ui-select-choices></ui-select></div>");
$templateCache.put("custom-ui-select/views/custom.ui.select.device.html","<div class=\"form-group no-margin\" mass-autocomplete ng-if=$ctrl.multiple><label class=custom-ui-select-label>{{ ($ctrl.label?$ctrl.label:\'FORM.LABEL.ENTITY_KEY\') | translate }}<field-options required=$ctrl.ngRequired multiple=$ctrl.multiple></field-options></label><ui-select custom-ui-select-config=$ctrl.ownConfig ng-disabled=$ctrl.disabled name=device ng-model=$ctrl.device theme=bootstrap title=\"Choose an entity\" custom-ui-select multiple=true custom-mass-autocomplete-item=$ctrl.ownConfig on-select=\"$ctrl.deviceSelected($item, $model)\" on-remove=\"$ctrl.deviceRemove($item, $model)\" ng-required=$ctrl.ngRequired><ui-select-match class={{$ctrl.uiSelectMatchClass}} placeholder=\"{{ \'FORM.PLACEHOLDER.ENTITY\' | translate }}\" allow-clear=true><div class=entity-editable permission permission-only=\"\'editDevice\'\" ng-dblclick=$ctrl.editDevice($item) title=\"{{ \'BUTTON.TITLE.DOUBLE_CLICK_EDIT\' | translate }}\">&nbsp;</div>{{$item.provision.administration.identifier._current.value || $item.identifier}}</ui-select-match><ui-select-choices repeat=\"entityData in $ctrl.ownConfig.collection track by $index\"><span ng-bind-html=\"entityData.provision.administration.identifier._current.value | highlight: $select.search\"></span> <small><div ng-if=entityData.provision.device.specificType._current.value>{{ \'FORM.LABEL.SPECIFIC_TYPE\' | translate }}: <span ng-bind-html=\"entityData.provision.device.specificType._current.value | highlight: $select.search\"></span></div><div ng-if=entityData.provision.device.operationalStatus._current.value>{{ \'FORM.LABEL.OP_STATUS\' | translate }}: <span ng-bind-html=\"\'\'+entityData.provision.device.operationalStatus._current.value | highlight: $select.search\"></span></div><div ng-if=\"!entityData.provision.device.specificType && entityData.provision.device.communicationModules && entityData.provision.device.communicationModules[0] && entityData.provision.device.communicationModules[0].specificType._current.value\">{{ \'FORM.LABEL.SPECIFIC_TYPE\' | translate }}: <span ng-bind-html=\"entityData.provision.device.communicationModules[0].specificType._current.value | highlight: $select.search\"></span></div><div ng-if=\"!entityData.provision.device.specificType && entityData.provision.device.communicationModules && entityData.provision.device.communicationModules[0] && entityData.provision.device.communicationModules[0].subscriber && entityData.provision.device.communicationModules[0].subscriber.specificType._current.value\">{{ \'FORM.LABEL.SPECIFIC_TYPE\' | translate }}: <span ng-bind-html=\"entityData.provision.device.communicationModules[0].subscriber.specificType._current.value | highlight: $select.search\"></span></div><div ng-if=\"!entityData.provision.device.specificType && entityData.provision.device.communicationModules && entityData.provision.device.communicationModules[0] && entityData.provision.device.communicationModules[0].subscription && entityData.provision.device.communicationModules[0].subscription.specificType._current.value\">{{ \'FORM.LABEL.SPECIFIC_TYPE\' | translate }}: <span ng-bind-html=\"entityData.provision.device.communicationModules[0].subscription.specificType._current.value | highlight: $select.search\"></span></div></small></ui-select-choices></ui-select></div><div class=\"form-group no-margin\" mass-autocomplete ng-if=!$ctrl.multiple><label class=custom-ui-select-label>{{ ($ctrl.label?$ctrl.label:\'FORM.LABEL.ENTITY_KEY\') | translate }}<field-options required=$ctrl.ngRequired multiple=$ctrl.multiple></field-options></label><ui-select custom-ui-select-config=$ctrl.ownConfig ng-disabled=$ctrl.disabled name=device ng-model=$ctrl.device theme=bootstrap title=\"Choose an entity\" custom-ui-select multiple=false custom-mass-autocomplete-item=$ctrl.ownConfig on-select=\"$ctrl.deviceSelected($item, $model)\" on-remove=\"$ctrl.deviceRemove($item, $model)\" ng-required=$ctrl.ngRequired><ui-select-match class={{$ctrl.uiSelectMatchClass}} placeholder=\"{{ \'FORM.PLACEHOLDER.ENTITY\' | translate }}\" allow-clear=true><div class=entity-editable permission permission-only=\"\'editDevice\'\" ng-dblclick=$ctrl.editDevice($item) title=\"{{ \'BUTTON.TITLE.DOUBLE_CLICK_EDIT\' | translate }}\">&nbsp;</div>{{$item.provision.administration.identifier._current.value || $item.identifier}}</ui-select-match><ui-select-choices repeat=\"entityData in $ctrl.ownConfig.collection track by $index\"><span ng-bind-html=\"entityData.provision.administration.identifier._current.value | highlight: $select.search\"></span> <small><div ng-if=entityData.provision.device.specificType._current.value>{{ \'FORM.LABEL.SPECIFIC_TYPE\' | translate }}: <span ng-bind-html=\"entityData.provision.device.specificType._current.value | highlight: $select.search\"></span></div><div ng-if=entityData.provision.device.operationalStatus._current.value>{{ \'FORM.LABEL.OP_STATUS\' | translate }}: <span ng-bind-html=\"\'\'+entityData.provision.device.operationalStatus._current.value | highlight: $select.search\"></span></div><div ng-if=\"!entityData.provision.device.specificType && entityData.provision.device.communicationModules && entityData.provision.device.communicationModules[0] && entityData.provision.device.communicationModules[0].specificType._current.value\">{{ \'FORM.LABEL.SPECIFIC_TYPE\' | translate }}: <span ng-bind-html=\"entityData.provision.device.communicationModules[0].specificType._current.value | highlight: $select.search\"></span></div><div ng-if=\"!entityData.provision.device.specificType && entityData.provision.device.communicationModules && entityData.provision.device.communicationModules[0] && entityData.provision.device.communicationModules[0].subscriber && entityData.provision.device.communicationModules[0].subscriber.specificType._current.value\">{{ \'FORM.LABEL.SPECIFIC_TYPE\' | translate }}: <span ng-bind-html=\"entityData.provision.device.communicationModules[0].subscriber.specificType._current.value | highlight: $select.search\"></span></div><div ng-if=\"!entityData.provision.device.specificType && entityData.provision.device.communicationModules && entityData.provision.device.communicationModules[0] && entityData.provision.device.communicationModules[0].subscription && entityData.provision.device.communicationModules[0].subscription.specificType._current.value\">{{ \'FORM.LABEL.SPECIFIC_TYPE\' | translate }}: <span ng-bind-html=\"entityData.provision.device.communicationModules[0].subscription.specificType._current.value | highlight: $select.search\"></span></div></small></ui-select-choices></ui-select></div><action-button ng-if=\"$ctrl._actions && !$ctrl.disabled\" actions=$ctrl._actions></action-button>");
$templateCache.put("custom-ui-select/views/custom.ui.select.domain.html","<div class=\"form-group no-margin\" mass-autocomplete ng-if=$ctrl.multiple><label for=domain class=custom-ui-select-label>{{ ($ctrl.label?$ctrl.label:\'FORM.LABEL.DOMAIN\') | translate }}<field-options required=$ctrl.required multiple=$ctrl.multiple></field-options></label><ui-select name=domain custom-ui-select-config=$ctrl.ownConfig ng-model=$ctrl.domain theme=bootstrap title=\"Choose a domaion\" custom-ui-select multiple=true custom-mass-autocomplete-item=$ctrl.ownConfig on-select=\"$ctrl.domainSelected($item, $model)\" on-remove=\"$ctrl.domainRemove($item, $model)\" ng-required=$ctrl.required><ui-select-match class={{$ctrl.uiSelectMatchClass}} placeholder=\"{{ \'FORM.PLACEHOLDER.DOMAIN\' | translate }}\" allow-clear=true>{{$item.name}}</ui-select-match><ui-select-choices repeat=\"domainData in $ctrl.ownConfig.collection track by $index\"><span ng-bind-html=\"domainData.name | highlight: $select.search\"></span></ui-select-choices></ui-select></div><div class=\"form-group no-margin\" mass-autocomplete ng-if=!$ctrl.multiple><label for=domain class=custom-ui-select-label>{{ ($ctrl.label?$ctrl.label:\'FORM.LABEL.DOMAIN\') | translate }}<field-options required=$ctrl.required multiple=$ctrl.multiple></field-options></label><ui-select custom-ui-select-config=$ctrl.ownConfig name=domain ng-model=$ctrl.domain theme=bootstrap title=\"Choose a domain\" custom-ui-select multiple=false custom-mass-autocomplete-item=$ctrl.ownConfig on-select=\"$ctrl.domainSelected($item, $model)\" on-remove=\"$ctrl.domainRemove($item, $model)\" ng-required=$ctrl.required><ui-select-match class={{$ctrl.uiSelectMatchClass}} placeholder=\"{{ \'FORM.PLACEHOLDER.DOMAIN\' | translate }}\" allow-clear=true>{{$item.name}}</ui-select-match><ui-select-choices repeat=\"domainData in $ctrl.ownConfig.collection track by $index\"><span ng-bind-html=\"domainData.name | highlight: $select.search\"></span></ui-select-choices></ui-select></div>");
$templateCache.put("custom-ui-select/views/custom.ui.select.entity.html","<div class=\"form-group no-margin\" mass-autocomplete ng-if=$ctrl.multiple><label class=custom-ui-select-label>{{ ($ctrl.label?$ctrl.label:\'FORM.LABEL.ENTITY_KEY\') | translate }}<field-options required=$ctrl.ngRequired multiple=$ctrl.multiple></field-options></label><ui-select custom-ui-select-config=$ctrl.ownConfig ng-disabled=$ctrl.disabled name=entity ng-model=$ctrl.entity theme=bootstrap title=\"Choose a entity\" custom-ui-select custom-ui-select-action=$ctrl.action multiple=true custom-mass-autocomplete-item=$ctrl.ownConfig on-select=\"$ctrl.entitySelected($item, $model)\" on-remove=\"$ctrl.entityRemove($item, $model)\" ng-required=$ctrl.ngRequired><ui-select-match class={{$ctrl.uiSelectMatchClass}} placeholder=\"{{ \'FORM.PLACEHOLDER.ENTITY\' | translate }}\" allow-clear=true>{{$item.provision.administration.identifier._current.value || $item.identifier}}</ui-select-match><ui-select-choices repeat=\"entityData in $ctrl.ownConfig.collection track by $index\"><span ng-bind-html=\"entityData.provision.administration.identifier._current.value | highlight: $select.search\"></span> <small><div ng-if=entityData.resourceType._current.value>{{ \'FORM.LABEL.RESOURCE_TYPE\' | translate }}: <span ng-bind-html=\"entityData.resourceType._current.value | highlight: $select.search\"></span></div><div ng-if=entityData.provision.asset.specificType._current.value>{{ \'FORM.LABEL.SPECIFIC_TYPE\' | translate }}: <span ng-bind-html=\"entityData.provision.asset.specificType._current.value | highlight: $select.search\"></span></div><div ng-if=entityData.provision.device.specificType._current.value>{{ \'FORM.LABEL.SPECIFIC_TYPE\' | translate }}: <span ng-bind-html=\"entityData.provision.device.specificType._current.value | highlight: $select.search\"></span></div><div ng-if=entityData.provision.device.operationalStatus._current.value>{{ \'FORM.LABEL.OP_STATUS\' | translate }}: <span ng-bind-html=\"\'\'+entityData.provision.device.operationalStatus._current.value | highlight: $select.search\"></span></div><div ng-if=\"!entityData.provision.device.specificType && entityData.provision.device.communicationModules && entityData.provision.device.communicationModules[0] && entityData.provision.device.communicationModules[0].specificType._current.value\">{{ \'FORM.LABEL.SPECIFIC_TYPE\' | translate }}: <span ng-bind-html=\"entityData.provision.device.communicationModules[0].specificType._current.value | highlight: $select.search\"></span></div><div ng-if=\"!entityData.provision.device.specificType && entityData.provision.device.communicationModules && entityData.provision.device.communicationModules[0] && entityData.provision.device.communicationModules[0].subscriber && entityData.provision.device.communicationModules[0].subscriber.specificType._current.value\">{{ \'FORM.LABEL.SPECIFIC_TYPE\' | translate }}: <span ng-bind-html=\"entityData.provision.device.communicationModules[0].subscriber.specificType._current.value | highlight: $select.search\"></span></div><div ng-if=\"!entityData.provision.device.specificType && entityData.provision.device.communicationModules && entityData.provision.device.communicationModules[0] && entityData.provision.device.communicationModules[0].subscription && entityData.provision.device.communicationModules[0].subscription.specificType._current.value\">{{ \'FORM.LABEL.SPECIFIC_TYPE\' | translate }}: <span ng-bind-html=\"entityData.provision.device.communicationModules[0].subscription.specificType._current.value | highlight: $select.search\"></span></div></small></ui-select-choices></ui-select></div><div class=\"form-group no-margin\" mass-autocomplete ng-if=!$ctrl.multiple><label class=custom-ui-select-label>{{($ctrl.label?$ctrl.label:\'FORM.LABEL.ENTITY_KEY\') | translate }}<field-options required=$ctrl.ngRequired multiple=$ctrl.multiple></field-options></label><ui-select custom-ui-select-config=$ctrl.ownConfig ng-disabled=$ctrl.disabled name=entity ng-model=$ctrl.entity theme=bootstrap title=\"Choose a entity\" custom-ui-select custom-ui-select-action=$ctrl.action multiple=false custom-mass-autocomplete-item=$ctrl.ownConfig on-select=\"$ctrl.entitySelected($item, $model)\" on-remove=\"$ctrl.entityRemove($item, $model)\" ng-required=$ctrl.ngRequired><ui-select-match class={{$ctrl.uiSelectMatchClass}} placeholder=\"{{ \'FORM.PLACEHOLDER.ENTITY\' | translate }}\" allow-clear=true>{{$item.provision.administration.identifier._current.value || $item.identifier}}</ui-select-match><ui-select-choices repeat=\"entityData in $ctrl.ownConfig.collection track by $index\"><span ng-bind-html=\"entityData.provision.administration.identifier._current.value | highlight: $select.search\"></span> <small><div ng-if=entityData.resourceType._current.value>{{ \'FORM.LABEL.RESOURCE_TYPE\' | translate }}: <span ng-bind-html=\"entityData.resourceType._current.value | highlight: $select.search\"></span></div><div ng-if=entityData.provision.asset.specificType._current.value>{{ \'FORM.LABEL.SPECIFIC_TYPE\' | translate }}: <span ng-bind-html=\"entityData.provision.asset.specificType._current.value | highlight: $select.search\"></span></div><div ng-if=entityData.provision.device.specificType._current.value>{{ \'FORM.LABEL.SPECIFIC_TYPE\' | translate }}: <span ng-bind-html=\"entityData.provision.device.specificType._current.value | highlight: $select.search\"></span></div><div ng-if=entityData.provision.device.operationalStatus._current.value>{{ \'FORM.LABEL.OP_STATUS\' | translate }}: <span ng-bind-html=\"\'\'+entityData.provision.device.operationalStatus._current.value | highlight: $select.search\"></span></div><div ng-if=\"!entityData.provision.device.specificType && entityData.provision.device.communicationModules && entityData.provision.device.communicationModules[0] && entityData.provision.device.communicationModules[0].specificType._current.value\">{{ \'FORM.LABEL.SPECIFIC_TYPE\' | translate }}: <span ng-bind-html=\"entityData.provision.device.communicationModules[0].specificType._current.value | highlight: $select.search\"></span></div><div ng-if=\"!entityData.provision.device.specificType && entityData.provision.device.communicationModules && entityData.provision.device.communicationModules[0] && entityData.provision.device.communicationModules[0].subscriber && entityData.provision.device.communicationModules[0].subscriber.specificType._current.value\">{{ \'FORM.LABEL.SPECIFIC_TYPE\' | translate }}: <span ng-bind-html=\"entityData.provision.device.communicationModules[0].subscriber.specificType._current.value | highlight: $select.search\"></span></div><div ng-if=\"!entityData.provision.device.specificType && entityData.provision.device.communicationModules && entityData.provision.device.communicationModules[0] && entityData.provision.device.communicationModules[0].subscription && entityData.provision.device.communicationModules[0].subscription.specificType._current.value\">{{ \'FORM.LABEL.SPECIFIC_TYPE\' | translate }}: <span ng-bind-html=\"entityData.provision.device.communicationModules[0].subscription.specificType._current.value | highlight: $select.search\"></span></div></small></ui-select-choices></ui-select></div>");
$templateCache.put("custom-ui-select/views/custom.ui.select.ogtypelist.html","<div class=\"form-group no-margin\" mass-autocomplete ng-if=$ctrl.multiple><label ng-if=$ctrl.label class=custom-ui-select-label>{{ $ctrl.label | translate }}<field-options required=$ctrl.ngRequired multiple=$ctrl.multiple></field-options></label><ui-select name=element custom-ui-select-config=$ctrl.ownConfig ng-model=$ctrl.element theme=bootstrap title=\"{{ $ctrl.placeholder | translate }}\" custom-ui-select multiple=true custom-mass-autocomplete-item=$ctrl.ownConfig on-select=\"$ctrl.elementSelected($item, $model)\" on-remove=\"$ctrl.elementRemove($item, $model)\" ng-required=$ctrl.required><ui-select-match class={{$ctrl.uiSelectMatchClass}} placeholder=\"{{ $ctrl.placeholder | translate }}\" allow-clear=true>{{$item}}</ui-select-match><ui-select-choices repeat=\"element in $ctrl.ownConfig.collection track by $index\"><span ng-bind-html=\"element | highlight: $select.search\"></span></ui-select-choices></ui-select></div><div class=\"form-group no-margin\" mass-autocomplete ng-if=!$ctrl.multiple><label ng-if=$ctrl.label class=custom-ui-select-label>{{ $ctrl.label | translate }}<field-options required=$ctrl.ngRequired multiple=$ctrl.multiple></field-options></label><ui-select custom-ui-select-config=$ctrl.ownConfig name=element ng-model=$ctrl.element theme=bootstrap title=\"{{ $ctrl.placeholder | translate }}\" custom-ui-select multiple=false custom-mass-autocomplete-item=$ctrl.ownConfig on-select=\"$ctrl.elementSelected($item, $model)\" on-remove=\"$ctrl.elementRemove($item, $model)\" ng-required=$ctrl.required><ui-select-match class={{$ctrl.uiSelectMatchClass}} placeholder=\"{{ $ctrl.placeholder | translate }}\" allow-clear=true><span>{{$item}}</span></ui-select-match><ui-select-choices repeat=\"element in $ctrl.ownConfig.collection track by $index\"><span ng-bind-html=\"element | highlight: $select.search\"></span></ui-select-choices></ui-select></div>");
$templateCache.put("custom-ui-select/views/custom.ui.select.organization.html","<div class=\"form-group no-margin\" mass-autocomplete ng-if=$ctrl.multiple><label ng-if=$ctrl.label class=custom-ui-select-label>{{ $ctrl.label | translate }}<field-options required=$ctrl.ngRequired multiple=$ctrl.multiple></field-options></label><ui-select name=organization custom-ui-select-config=$ctrl.ownConfig ng-model=$ctrl.organization theme=bootstrap title=\"Choose an organization\" custom-ui-select multiple=true custom-mass-autocomplete-item=$ctrl.ownConfig on-select=\"$ctrl.organizationSelected($item, $model)\" on-remove=\"$ctrl.organizationRemove($item, $model)\" ng-required=$ctrl.required><ui-select-match class={{$ctrl.uiSelectMatchClass}} placeholder=\"{{ \'FORM.PLACEHOLDER.ORGANIZATION\' | translate }}\" allow-clear=true>{{$item.name}}</ui-select-match><ui-select-choices repeat=\"organization in $ctrl.ownConfig.collection track by $index\"><span ng-bind-html=\"organization.name | highlight: $select.search\"></span></ui-select-choices></ui-select></div><div class=\"form-group no-margin\" mass-autocomplete ng-if=!$ctrl.multiple><label ng-if=$ctrl.label class=custom-ui-select-label>{{ $ctrl.label | translate }}<field-options required=$ctrl.ngRequired multiple=$ctrl.multiple></field-options></label><ui-select custom-ui-select-config=$ctrl.ownConfig name=organization ng-model=$ctrl.organization theme=bootstrap title=\"Choose an organization\" custom-ui-select multiple=false custom-mass-autocomplete-item=$ctrl.ownConfig on-select=\"$ctrl.organizationSelected($item, $model)\" on-remove=\"$ctrl.organizationRemove($item, $model)\" ng-required=$ctrl.required><ui-select-match class={{$ctrl.uiSelectMatchClass}} placeholder=\"{{ \'FORM.PLACEHOLDER.ORGANIZATION\' | translate }}\" allow-clear=true>{{$item.name}}</ui-select-match><ui-select-choices repeat=\"organization in $ctrl.ownConfig.collection track by $index\"><span ng-bind-html=\"organization.name | highlight: $select.search\"></span></ui-select-choices></ui-select></div>");
$templateCache.put("custom-ui-select/views/custom.ui.select.servicegroup.html","<div class=\"form-group no-margin\" mass-autocomplete ng-if=$ctrl.multiple><label ng-if=$ctrl.label class=custom-ui-select-label>{{ $ctrl.label | translate }}<field-options required=$ctrl.ngRequired multiple=$ctrl.multiple></field-options></label><ui-select name=serviceGroup custom-ui-select-config=$ctrl.ownConfig ng-model=$ctrl.serviceGroup theme=bootstrap title=\"{{ \'FORM.PLACEHOLDER.SERVICEGROUP\' | translate }}\" custom-ui-select multiple=true custom-mass-autocomplete-item=$ctrl.ownConfig on-select=\"$ctrl.serviceGroupSelected($item, $model)\" on-remove=\"$ctrl.serviceGroupRemove($item, $model)\" ng-required=$ctrl.required><ui-select-match class={{$ctrl.uiSelectMatchClass}} placeholder=\"{{ \'FORM.PLACEHOLDER.SERVICEGROUP\' | translate }}\" allow-clear=true>{{$item.name}}</ui-select-match><ui-select-choices repeat=\"serviceGroup in $ctrl.ownConfig.collection track by $index\"><span ng-bind-html=\"serviceGroup.name | highlight: $select.search\"></span></ui-select-choices></ui-select></div><div class=\"form-group no-margin\" mass-autocomplete ng-if=!$ctrl.multiple><label ng-if=$ctrl.label class=custom-ui-select-label>{{ $ctrl.label | translate }}<field-options required=$ctrl.ngRequired multiple=$ctrl.multiple></field-options></label><ui-select custom-ui-select-config=$ctrl.ownConfig name=serviceGroup ng-model=$ctrl.serviceGroup theme=bootstrap title=\"{{ \'FORM.PLACEHOLDER.SERVICEGROUP\' | translate }}\" custom-ui-select multiple=false custom-mass-autocomplete-item=$ctrl.ownConfig on-select=\"$ctrl.serviceGroupSelected($item, $model)\" on-remove=\"$ctrl.serviceGroupRemove($item, $model)\" ng-required=$ctrl.ngRequired><ui-select-match class={{$ctrl.uiSelectMatchClass}} placeholder=\"{{ \'FORM.PLACEHOLDER.SERVICEGROUP\' | translate }}\" allow-clear=true>{{$item.name}}</ui-select-match><ui-select-choices repeat=\"serviceGroup in $ctrl.ownConfig.collection track by $index\"><span ng-bind-html=\"serviceGroup.name | highlight: $select.search\"></span></ui-select-choices></ui-select></div>");
$templateCache.put("custom-ui-select/views/custom.ui.select.subscriber.html","<div class=\"form-group no-margin\" mass-autocomplete ng-if=$ctrl.multiple><label class=custom-ui-select-label>{{\'FORM.LABEL.ENTITY_KEY\' | translate}}<field-options required=$ctrl.ngRequired multiple=$ctrl.multiple></field-options></label><ui-select custom-ui-select-config=$ctrl.ownConfig name=entity ng-model=$ctrl.entity theme=bootstrap title=\"Choose a entity\" custom-ui-select multiple=true custom-mass-autocomplete-item=$ctrl.ownConfig on-select=\"$ctrl.entitySelected($item, $model)\" on-remove=\"$ctrl.entityRemove($item, $model)\" ng-required=$ctrl.ngRequired><ui-select-match class={{$ctrl.uiSelectMatchClass}} placeholder=\"Choose a entity\" allow-clear=true>{{$item.provision.subscriber.identifier._current.value}}</ui-select-match><ui-select-choices repeat=\"subscriberData in $ctrl.ownConfig.collection track by $index\"><span ng-bind-html=\"subscriberData.provision.subscriber.identifier._current.value | highlight: $select.search\"></span> <small><div ng-if=subscriberData.provision.subscriber.name._current.value>Name: <span ng-bind-html=\"\'\'+subscriberData.provision.subscriber.name._current.value | highlight: $select.search\"></span></div></small></ui-select-choices></ui-select></div><div class=\"form-group no-margin\" mass-autocomplete ng-if=!$ctrl.multiple><label class=custom-ui-select-label>{{\'FORM.LABEL.ENTITY_KEY\' | translate}}<field-options required=$ctrl.ngRequired multiple=$ctrl.multiple></field-options></label><ui-select custom-ui-select-config=$ctrl.ownConfig name=entity ng-model=$ctrl.entity theme=bootstrap title=\"Choose a entity\" custom-ui-select multiple=false custom-mass-autocomplete-item=$ctrl.ownConfig on-select=\"$ctrl.entitySelected($item, $model)\" on-remove=\"$ctrl.entityRemove($item, $model)\" ng-required=$ctrl.ngRequired><ui-select-match class={{$ctrl.uiSelectMatchClass}} placeholder=\"Choose a entity\" allow-clear=true>{{$item.provision.subscriber.identifier._current.value}}</ui-select-match><ui-select-choices repeat=\"subscriberData in $ctrl.ownConfig.collection track by $index\"><span ng-bind-html=\"subscriberData.provision.subscriber.identifier._current.value | highlight: $select.search\"></span> <small><div ng-if=subscriberData.provision.subscriber.name._current.value>{{ \'FORM.LABEL.NAME\' | translate }}: <span ng-bind-html=\"\'\'+subscriberData.provision.subscriber.name._current.value | highlight: $select.search\"></span></div><div ng-if=subscriberData.provision.subscriber.mobile.icc._current.value>{{ \'FORM.LABEL.NAME\' | translate }}: <span ng-bind-html=\"\'\'+subscriberData.provision.subscriber.mobile.icc.name._current.value | highlight: $select.search\"></span></div></small></ui-select-choices></ui-select></div>");
$templateCache.put("custom-ui-select/views/custom.ui.select.subscription.html","<div class=\"form-group no-margin\" mass-autocomplete ng-if=$ctrl.multiple><label class=custom-ui-select-label>{{\'FORM.LABEL.ENTITY_KEY\' | translate }}<field-options required=$ctrl.ngRequired multiple=$ctrl.multiple></field-options></label><ui-select custom-ui-select-config=$ctrl.ownConfig name=entity ng-model=$ctrl.entity theme=bootstrap title=\"Choose a entity\" custom-ui-select multiple=true custom-mass-autocomplete-item=$ctrl.ownConfig on-select=\"$ctrl.entitySelected($item, $model)\" on-remove=\"$ctrl.entityRemove($item, $model)\" ng-required=$ctrl.ngRequired><ui-select-match class={{$ctrl.uiSelectMatchClass}} placeholder=\"Choose a entity\" allow-clear=true>{{$item.provision.subscription.identifier._current.value}}</ui-select-match><ui-select-choices repeat=\"subscriptionData in $ctrl.ownConfig.collection track by $index\"><span ng-bind-html=\"subscriptionData.provision.subscription.identifier._current.value | highlight: $select.search\"></span> <small><div ng-if=subscriptionData.provision.subscription.name._current.value>{{ \'FORM.LABEL.NAME\' | translate }}: <span ng-bind-html=\"\'\'+subscriptionData.provision.subscription.name._current.value | highlight: $select.search\"></span></div></small></ui-select-choices></ui-select></div><div class=\"form-group no-margin\" mass-autocomplete ng-if=!$ctrl.multiple><label class=custom-ui-select-label>{{\'FORM.LABEL.ENTITY_KEY\' | translate }}<field-options required=$ctrl.ngRequired multiple=$ctrl.multiple></field-options></label><ui-select custom-ui-select-config=$ctrl.ownConfig name=entity ng-model=$ctrl.entity theme=bootstrap title=\"Choose a entity\" custom-ui-select multiple=false custom-mass-autocomplete-item=$ctrl.ownConfig on-select=\"$ctrl.entitySelected($item, $model)\" on-remove=\"$ctrl.entityRemove($item, $model)\" ng-required=$ctrl.ngRequired><ui-select-match class={{$ctrl.uiSelectMatchClass}} placeholder=\"Choose a entity\" allow-clear=true>{{$item.provision.subscription.identifier._current.value}}</ui-select-match><ui-select-choices repeat=\"subscriptionData in $ctrl.ownConfig.collection track by $index\"><span ng-bind-html=\"subscriptionData.provision.subscription.identifier._current.value | highlight: $select.search\"></span> <small><div ng-if=subscriptionData.provision.subscription.name._current.value>{{ \'FORM.LABEL.NAME\' | translate }}: <span ng-bind-html=\"\'\'+subscriptionData.provision.subscription.name._current.value | highlight: $select.search\"></span></div></small></ui-select-choices></ui-select></div><action-button ng-if=\"$ctrl.actions && !$ctrl.disabled\" actions=$ctrl.actions></action-button>");
$templateCache.put("custom-ui-select/views/custom.ui.select.ticket.html","<div class=\"form-group no-margin\" mass-autocomplete ng-if=$ctrl.multiple><label class=custom-ui-select-label>{{\'FORM.LABEL.TICKET\' | translate}}<field-options required=$ctrl.required multiple=$ctrl.multiple></field-options></label><ui-select custom-ui-select-config=$ctrl.ownConfig name=entity ng-model=$ctrl.ticket theme=bootstrap title=\"Choose a ticket\" custom-ui-select multiple=true custom-mass-autocomplete-item=$ctrl.ownConfig on-select=\"$ctrl.ticketSelected($item, $model)\" on-remove=\"$ctrl.ticketRemove($item, $model)\" ng-required=$ctrl.required><ui-select-match class={{$ctrl.uiSelectMatchClass}} placeholder=\"{{ \'FORM.PLACEHOLDER.TICKET\' | translate }}\" allow-clear=true>{{$item.provision.administration.identifier._current.value || $item.identifier}}</ui-select-match><ui-select-choices repeat=\"ticketData in $ctrl.ownConfig.collection track by $index\"><span ng-bind-html=\"ticketData.provision.administration.identifier._current.value | highlight: $select.search\"></span> <small><div ng-if=ticketData.provision.ticket.name._current.value>{{ \'FORM.LABEL.NAME\' | translate }}: <span ng-bind-html=\"ticketData.provision.ticket.name._current.value | highlight: $select.search\"></span></div><div ng-if=ticketData.provision.ticket.type._current.value>{{ \'FORM.LABEL.TYPE\' | translate }}: <span ng-bind-html=\"ticketData.provision.ticket.type._current.value | highlight: $select.search\"></span></div><div ng-if=ticketData.provision.ticket.specificType._current.value>{{ \'FORM.LABEL.SPECIFIC_TYPE\' | translate }}: <span ng-bind-html=\"ticketData.provision.ticket.specificType._current.value | highlight: $select.search\"></span></div><div ng-if=ticketData.provision.ticket.status._current.value>{{ \'FORM.LABEL.STATUS\' | translate }}: <span ng-bind-html=\"ticketData.provision.ticket.status._current.value | highlight: $select.search\"></span></div></small></ui-select-choices></ui-select></div><div class=\"form-group no-margin\" mass-autocomplete ng-if=!$ctrl.multiple><label class=custom-ui-select-label>{{\'FORM.LABEL.TICKET\' | translate}}<field-options required=$ctrl.required multiple=$ctrl.multiple></field-options></label><ui-select custom-ui-select-config=$ctrl.ownConfig name=entity ng-model=$ctrl.ticket theme=bootstrap title=\"Choose a ticket\" custom-ui-select multiple=false custom-mass-autocomplete-item=$ctrl.ownConfig on-select=\"$ctrl.ticketSelected($item, $model)\" on-remove=\"$ctrl.ticketRemove($item, $model)\" ng-required=$ctrl.required><ui-select-match class={{$ctrl.uiSelectMatchClass}} placeholder=\"{{ \'FORM.PLACEHOLDER.TICKET\' | translate }}\" allow-clear=true>{{$item.provision.administration.identifier._current.value || $item.identifier}}</ui-select-match><ui-select-choices repeat=\"ticketData in $ctrl.ownConfig.collection track by $index\"><span ng-bind-html=\"ticketData.provision.administration.identifier._current.value | highlight: $select.search\"></span> <small><div ng-if=ticketData.provision.ticket.name._current.value>{{ \'FORM.LABEL.NAME\' | translate }}: <span ng-bind-html=\"ticketData.provision.ticket.name._current.value | highlight: $select.search\"></span></div><div ng-if=ticketData.provision.ticket.type._current.value>{{ \'FORM.LABEL.TYPE\' | translate }}: <span ng-bind-html=\"ticketData.provision.ticket.type._current.value | highlight: $select.search\"></span></div><div ng-if=ticketData.provision.ticket.specificType._current.value>{{ \'FORM.LABEL.SPECIFIC_TYPE\' | translate }}: <span ng-bind-html=\"ticketData.provision.ticket.specificType._current.value | highlight: $select.search\"></span></div><div ng-if=ticketData.provision.ticket.status._current.value>{{ \'FORM.LABEL.STATUS\' | translate }}: <span ng-bind-html=\"ticketData.provision.ticket.status._current.value | highlight: $select.search\"></span></div></small></ui-select-choices></ui-select></div>");
$templateCache.put("custom-ui-select/views/ui.select.icon.html","<div class=\"form-group no-margin\"><label ng-if=$ctrl.label for=icon translate>FORM.LABEL.ICON</label><div class=\"{{$ctrl.allowClear ? \'input-group\' : \'\'}}\"><ui-select id=icon name=icon ng-model=$ctrl.icon theme=bootstrap ng-required=$ctrl.required title=$ctrl.title ng-disabled=$ctrl.disabled on-remove=\"$ctrl.iconRemove($item, $model)\" on-select=\"$ctrl.iconSelected($item, $model)\" allow-clear=$ctrl.allowClear uis-open-close=$ctrl.onOpenClose(isOpen)><ui-select-match class={{$ctrl.uiSelectMatchClass}} placeholder=\"{{ \'FORM.PLACEHOLDER.ICON.CHOOSE\' | translate }}\" allow-clear=$ctrl.allowClear><i class=\"fa {{$select.selected.key}} fa-2x\"></i> <span>{{$select.selected.key}}</span></ui-select-match><ui-select-choices class=oux-icon-selector repeat=\"icon.key as (key, icon) in $ctrl.availableIcons | filter: $select.search | limitTo: $ctrl.maxIcons\"><i class=\"fa fa-4x\" ng-class=icon.key title={{icon.key}}></i><br><span ng-bind-html=\"icon.key| highlight: $select.search\"></span></ui-select-choices></ui-select><span class=input-group-btn ng-if=$ctrl.allowClear><button type=button ng-click=\"$ctrl.icon = undefined\" class=\"btn btn-default\"><span class=\"glyphicon glyphicon-trash\"></span></button></span></div></div>");
$templateCache.put("custom-ui-select/views/ui.select.resourceType.html","<div class=\"form-group no-margin\" ng-if=$ctrl.multiple><label class=custom-ui-select-label>{{\'FORM.LABEL.RESOURCE_TYPE\' | translate }}<field-options required=$ctrl.required multiple=$ctrl.multiple></field-options></label><ui-select custom-ui-select-config=$ctrl.ownConfig name=resourceType ng-model=$ctrl.resourceType theme=bootstrap title=\"{{ \'FORM.PLACEHOLDER.RESOURCE_TYPE_MULTI\' | translate }}\" custom-ui-select multiple=true on-select=\"$ctrl.resourceTypeSelected($item, $model)\" on-remove=\"$ctrl.resourceTypeRemove($item, $model)\" ng-required=$ctrl.required><ui-select-match class={{$ctrl.uiSelectMatchClass}} placeholder=\"{{ \'FORM.PLACEHOLDER.RESOURCE_TYPE\' | translate }}\" allow-clear=true>{{$item.identifier | translate}}</ui-select-match><ui-select-choices repeat=\"resourceType in $ctrl.ownConfig.collection | filter:$select.search track by $index\"><div><span ng-bind-html=\"resourceType.identifier | translate | highlight: $select.search\"></span></div></ui-select-choices></ui-select></div><div class=\"form-group no-margin\" ng-if=!$ctrl.multiple><label class=custom-ui-select-label>{{\'FORM.LABEL.RESOURCE_TYPE\' | translate }}<field-options required=$ctrl.required multiple=$ctrl.multiple></field-options></label><ui-select custom-ui-select-config=$ctrl.ownConfig name=resourceType ng-model=$ctrl.resourceType theme=bootstrap title=\"Choose an resourceType\" custom-ui-select multiple=false on-select=\"$ctrl.resourceTypeSelected($item, $model)\" on-remove=\"$ctrl.resourceTypeRemove($item, $model)\" ng-required=$ctrl.required><ui-select-match class={{$ctrl.uiSelectMatchClass}} placeholder=\"{{ \'FORM.PLACEHOLDER.RESOURCE_TYPE\' | translate }}\" allow-clear=true>{{$item.identifier | translate}}</ui-select-match><ui-select-choices repeat=\"resourceType in $ctrl.ownConfig.collection | filter:$select.search track by $index\"><div><span ng-bind-html=\"resourceType.identifier | translate | highlight: $select.search\"></span></div></ui-select-choices></ui-select></div>");
$templateCache.put("helper/views/custom.ui.select.helper.html","<div class=form-group ng-hide=$ctrl.have_helper_keys ng-transclude=input><label for={{$ctrl.id}}>{{$ctrl.labelText | translate }}<field-options required=$ctrl.required></field-options></label> <input class=form-control name={{$ctrl.name}} type=text id={{$ctrl.id}} ng-model=$ctrl.helperModel ng-required=$ctrl.required> <span class=help-inline ng-show=\"!$ctrl.helperModel && $ctrl.required\">{{$ctrl.labelError}}</span></div><div class=form-group ng-hide=!$ctrl.have_helper_keys><label for={{$ctrl.id}}>{{$ctrl.labelText | translate }}<field-options required=$ctrl.required></field-options></label><ui-select id={{$ctrl.id}} name={{$ctrl.name}} ng-model=$ctrl.helperModel theme=bootstrap title=\"Choose an option\" ng-required=$ctrl.required tagging=$ctrl.helperTagTransform tagging-label=false><ui-select-match class={{$ctrl.uiSelectMatchClass}} placeholder=\"Choose an option\"><span ng-if=\"$select.selected && $select.selected.key !== \'image\'\">{{$select.selected.value}}</span> <img ng-if=\"$select.selected && $select.selected.key === \'image\'\" src=\"{{ $select.selected.value }}\" style=max-height:30px;></ui-select-match><ui-select-choices repeat=\"parameter.value as (key, parameter) in $ctrl.$helper_keys | filter: $select.search\"><span ng-bind-html=\"parameter.key | highlight: $select.search\"></span>: <small ng-if=\"parameter.key !== \'image\'\" ng-bind-html=\"parameter.value | highlight: $select.search\"></small> <img ng-if=\"parameter.key === \'image\'\" src=\"{{ parameter.value }}\" style=max-height:30px;></ui-select-choices></ui-select></div>");
$templateCache.put("helper/views/helper.view.html","<div class=\"container col-md-12 col-xs-12\" style=padding-left:0;padding-right:0 ng-transclude></div><div class=\"col-xs-12 col-md-12 text-right no-margin no-padding\"><a class=\"btn btn-default btn-xs ux-txt-info pointer oux-button-margin\" ng-href ng-click=$helper.open() ng-switch=$helper.mode><span ng-switch-when=button><i ng-class=$helper.helperButton aria-hidden=true></i></span> <span ng-switch-when=title>{{$helper.helperTitle}}</span> <span ng-switch-when=title_button><i ng-class=$helper.helperButton aria-hidden=true></i>{{$helper.helperTitle}}</span> <span ng-switch-default><i ng-if=\"!$helper.helperTitle && !$helper.helperButton\" class=\"fa fa-lg fa-search-plus\" title=\"{{ \'FORM.HELPER.TITLE\' | translate }}\" aria-hidden=true></i></span></a></div><script type=text/ng-template id=helper.view.modal.html><div class=\"modal-header\"> <h4 class=\"modal-title\">{{ \'FORM.HELPER.TITLE\' | translate }}</h4> </div> <div class=\"modal-body without-padding-top\"> <uib-accordion close-others=\"true\"> <div uib-accordion-group is-open=\"$ctrl.areaIsOpen\" class=\"area-option\" ng-hide=\"$ctrl.helper_exclusive ? !$ctrl.areaIsExclusive: false\"> <div uib-accordion-heading>{{ \'FORM.AREAS\' | translate }}</div> <div class=\"row row-eq-height\"> <div class=\"col-xs-10\"> <custom-ui-select-area on-select-item=\"$ctrl.onSelectAreaKey($item, $model)\" on-remove=\"$ctrl.onDeleteAreaKey()\" area=\"$ctrl.area.selected\" organization=\"$ctrl.area.organization\" multiple=\"false\"> </custom-ui-select-area> </div> <div class=\"col-xs-2 vcenter no-padding\" ng-if=\"$ctrl.helper_exclusive\"> <a class=\"top-buffer btn btn-default ux-txt-success pointer\" ng-class=\"{\'disabled\': !$ctrl.helper_keys.area}\" ng-click=\"$ctrl.ok(\'area\')\" ng-disabled=\"!$ctrl.helper_keys.area\"> <i class=\"fa fa-lg fa-files-o\" aria-hidden=\"true\"></i> </a> </div> </div> </div> <div uib-accordion-group is-open=\"$ctrl.assetIsOpen\" ng-hide=\"$ctrl.helper_exclusive ? (!$ctrl.entityIsExclusive && !$ctrl.assetIsExclusive): false\" class=\"asset-option\"> <div uib-accordion-heading>{{ \'FORM.ASSETS\' | translate }}</div> <div class=\"row row-eq-height\"> <div class=\"col-xs-10\"> <custom-ui-select-asset on-select-item=\"$ctrl.onSelectAssetKey($item, $model)\" on-remove=\"$ctrl.onDeleteAssetKey()\" asset=\"$ctrl.asset.selected\" multiple=\"false\" specific-type=\"{{$ctrl.specific_type}}\"></custom-ui-select-asset> </div> <div class=\"col-xs-2 vcenter no-padding\" ng-if=\"$ctrl.helper_exclusive\"> <a class=\"top-buffer btn btn-default ux-txt-success pointer\" ng-class=\"{\'disabled\': !$ctrl.helper_keys.asset}\" ng-click=\"$ctrl.ok(\'asset\')\" ng-disabled=\"!$ctrl.helper_keys.asset\"> <i class=\"fa fa-lg fa-files-o\" aria-hidden=\"true\"></i> </a> </div> </div> </div> <div uib-accordion-group is-open=\"$ctrl.mapIsOpen\" ng-hide=\"$ctrl.helper_exclusive ? !$ctrl.mapIsExclusive : false\" class=\"map-option\"> <div uib-accordion-heading>Map</div> <div class=\"row\" ng-if=\"$ctrl.mapIsOpen\"> <div class=\"col-xs-12\"> <div class=\"form-group leaflet-container\"> <leaflet id=\"map-marker\" lf-center=\"$ctrl.map.center\" layers=\"$ctrl.map.layers\" controls=\"$ctrl.map.controls\" event-broadcast=\"$ctrl.map.events\" markers=\"$ctrl.map.markers\" width=\"100% \" height=\"300px\"></leaflet> </div> </div> <div class=\"col-xs-12 text-right\" ng-if=\"$ctrl.helper_exclusive\"> <a class=\"top-buffer btn btn-default ux-txt-success pointer\" ng-class=\"{\'disabled\': !$ctrl.helper_keys.map}\" ng-click=\"$ctrl.ok(\'map\')\" ng-disabled=\"!$ctrl.helper_keys.map\"> <i class=\"fa fa-lg fa-files-o\" aria-hidden=\"true\"></i> </a> </div> </div> </div> <div uib-accordion-group is-open=\"$ctrl.entityIsOpen\" ng-hide=\"$ctrl.helper_exclusive ? !$ctrl.entityIsExclusive: false\" class=\"entity-option\"> <div uib-accordion-heading>{{ \'FORM.ENTITY\' | translate }}</div> <div class=\"row row-eq-height\"> <div class=\"col-xs-10\"> <custom-ui-select-entity on-select-item=\"$ctrl.onSelectEntityKey($item, $model)\" on-remove=\"$ctrl.onDeleteEntityKey()\" entity=\"$ctrl.entity.selected\" multiple=\"false\"> </custom-ui-select-entity> </div> <div class=\"col-xs-2 vcenter no-padding\" ng-if=\"$ctrl.helper_exclusive\"> <a class=\"top-buffer btn btn-default ux-txt-success pointer\" ng-class=\"{\'disabled\': !$ctrl.helper_keys.entity}\" ng-click=\"$ctrl.ok(\'entity\')\" ng-disabled=\"!$ctrl.helper_keys.entity\"> <i class=\"fa fa-lg fa-files-o\" aria-hidden=\"true\"></i> </a> </div> </div> </div> <div uib-accordion-group is-open=\"$ctrl.deviceIsOpen\" ng-hide=\"$ctrl.helper_exclusive ? (!$ctrl.entityIsExclusive && !$ctrl.deviceIsExclusive): false\" class=\"device-option\"> <div uib-accordion-heading>{{ \'FORM.DEVICES\' | translate }}</div> <div class=\"row row-eq-height\"> <div class=\"col-xs-10\"> <custom-ui-select-device on-select-item=\"$ctrl.onSelectDeviceKey($item, $model)\" on-remove=\"$ctrl.onDeleteDeviceKey()\" device=\"$ctrl.device.selected\" multiple=\"false\" specific-type=\"{{$ctrl.specific_type}}\"> </custom-ui-select-device> </div> <div class=\"col-xs-2 vcenter no-padding\" ng-if=\"$ctrl.helper_exclusive\"> <a class=\"top-buffer btn btn-default ux-txt-success pointer\" ng-class=\"{\'disabled\': !$ctrl.helper_keys.device}\" ng-click=\"$ctrl.ok(\'device\')\" ng-disabled=\"!$ctrl.helper_keys.device\"> <i class=\"fa fa-lg fa-files-o\" aria-hidden=\"true\"></i> </a> </div> </div> </div> <div uib-accordion-group is-open=\"$ctrl.subscriberIsOpen\" class=\"subscriber-option\" ng-hide=\"$ctrl.helper_exclusive ? (!$ctrl.entityIsExclusive && !$ctrl.subscriberIsExclusive): false\"> <div uib-accordion-heading>{{ \'FORM.SUBSCRIBERS\' | translate }}</div> <div class=\"row row-eq-height\"> <div class=\"col-xs-10\"> <custom-ui-select-subscriber on-select-item=\"$ctrl.onSelectSubscriberKey($item, $model)\" specific-type=\"{{$ctrl.specific_type}}\" organization=\"{{$ctrl.organization}}\" channel=\"{{$ctrl.channel}}\" exclude-devices=\"$ctrl.exclude_devices\" on-remove=\"$ctrl.onDeleteSubscriberKey()\" entity=\"$ctrl.subscriber.selected\" multiple=\"false\"> </custom-ui-select-subscriber> </div> <div class=\"col-xs-2 vcenter no-padding\" ng-if=\"$ctrl.helper_exclusive\"> <a class=\"top-buffer btn btn-default ux-txt-success pointer\" ng-class=\"{\'disabled\': !$ctrl.helper_keys.subscriber}\" ng-click=\"$ctrl.ok(\'subscriber\')\" ng-disabled=\"!$ctrl.helper_keys.subscriber\"> <i class=\"fa fa-lg fa-files-o\" aria-hidden=\"true\"></i> </a> </div> </div> </div> <div uib-accordion-group is-open=\"$ctrl.subscriptionIsOpen\" class=\"subscription-option\" ng-hide=\"$ctrl.helper_exclusive ? (!$ctrl.entityIsExclusive && !$ctrl.subscriptionIsExclusive): false\"> <div uib-accordion-heading>{{ \'FORM.SUBSCRIPTIONS\' | translate }}</div> <div class=\"row row-eq-height\"> <div class=\"col-xs-10\"> <custom-ui-select-subscription on-select-item=\"$ctrl.onSelectSubscriptionKey($item, $model)\" specific-type=\"{{$ctrl.specific_type}}\" organization=\"{{$ctrl.organization}}\" channel=\"{{$ctrl.channel}}\" exclude-devices=\"$ctrl.exclude_devices\" on-remove=\"$ctrl.onDeleteSubscriptionKey()\" entity=\"$ctrl.subscription.selected\" multiple=\"false\"> </custom-ui-select-subscription> </div> <div class=\"col-xs-2 vcenter no-padding\" ng-if=\"$ctrl.helper_exclusive\"> <a class=\"top-buffer btn btn-default ux-txt-success pointer\" ng-class=\"{\'disabled\': !$ctrl.helper_keys.subscription}\" ng-click=\"$ctrl.ok(\'subscription\')\" ng-disabled=\"!$ctrl.helper_keys.subscription\"> <i class=\"fa fa-lg fa-files-o\" aria-hidden=\"true\"></i> </a> </div> </div> </div> <div uib-accordion-group is-open=\"$ctrl.datastreamIsOpen\" ng-hide=\"$ctrl.helper_exclusive ? !$ctrl.datastreamIsExclusive: false\" class=\"datastream-option\"> <div uib-accordion-heading>{{ \'FORM.DATASTREAM\' | translate }}</div> <div class=\"row row-eq-height\"> <div class=\"col-xs-10\"> <custom-ui-select-datastream on-select-item=\"$ctrl.onSelectDatastreamKey($item, $model)\" on-remove=\"$ctrl.onDeleteDatastreamKey()\" datastream=\"$ctrl.datastream.selected\" multiple=\"false\"> </custom-ui-select-datastream> </div> <div class=\"col-xs-2 vcenter no-padding\" ng-if=\"$ctrl.helper_exclusive\"> <a class=\"top-buffer btn btn-default ux-txt-success pointer\" ng-class=\"{\'disabled\': !$ctrl.helper_keys.datastream}\" ng-click=\"$ctrl.ok(\'datastream\')\" ng-disabled=\"!$ctrl.helper_keys.datastream\"> <i class=\"fa fa-lg fa-files-o\" aria-hidden=\"true\"></i> </a> </div> </div> </div> <div uib-accordion-group is-open=\"$ctrl.domainIsOpen\" class=\"domain-option\" ng-hide=\"$ctrl.helper_exclusive ? !$ctrl.domainIsExclusive: false\"> <div uib-accordion-heading>{{ \'FORM.DOMAINS\' | translate }}</div> <div class=\"row row-eq-height\"> <div class=\"col-xs-10\"> <custom-ui-select-domain on-select-item=\"$ctrl.onSelectDomainKey($item, $model)\" on-remove=\"$ctrl.onDeleteDomainKey()\" domain=\"$ctrl.domain.selected\" multiple=\"false\"> </custom-ui-select-domain> </div> <div class=\"col-xs-2 vcenter no-padding\" ng-if=\"$ctrl.helper_exclusive\"> <a class=\"top-buffer btn btn-default ux-txt-success pointer\" ng-class=\"{\'disabled\': !$ctrl.helper_keys.domain}\" ng-click=\"$ctrl.ok(\'domain\')\" ng-disabled=\"!$ctrl.helper_keys.domain\"> <i class=\"fa fa-lg fa-files-o\" aria-hidden=\"true\"></i> </a> </div> </div> </div> <div uib-accordion-group is-open=\"$ctrl.bundleIsOpen\" class=\"bundle-option\" ng-hide=\"$ctrl.helper_exclusive ? !$ctrl.bundleIsExclusive: false\"> <div uib-accordion-heading>{{ \'FORM.BUNDLES\' | translate }}</div> <div class=\"row row-eq-height\"> <div class=\"col-xs-10\"> <custom-ui-select-bundle on-select-item=\"$ctrl.onSelectBundleKey($item, $model)\" on-remove=\"$ctrl.onDeleteBundleKey()\" bundle=\"$ctrl.bundle.selected\" multiple=\"false\"> </custom-ui-select-bundle> </div> <div class=\"col-xs-2 vcenter no-padding\" ng-if=\"$ctrl.helper_exclusive\"> <a class=\"top-buffer btn btn-default ux-txt-success pointer\" ng-class=\"{\'disabled\': !$ctrl.helper_keys.bundle}\" ng-click=\"$ctrl.ok(\'bundle\')\" ng-disabled=\"!$ctrl.helper_keys.bundle\"> <i class=\"fa fa-lg fa-files-o\" aria-hidden=\"true\"></i> </a> </div> </div> </div> <div uib-accordion-group is-open=\"$ctrl.imageIsOpen\" class=\"image-option\" ng-hide=\"$ctrl.helper_exclusive ? !$ctrl.imageIsExclusive: false\"> <div uib-accordion-heading>{{ \'FORM.IMAGE\' | translate }}</div> <div class=\"row row-eq-height\"> <div class=\"col-xs-12 col-md-8\"> <div name=\"image\" ng-if=\"!$ctrl.helper_keys.image && !$ctrl.helper_keys.image.image\" ngf-drop=\"$ctrl.imageSelected($file)\" ng-model=\"$ctrl.image\" ngf-max-size=\"1MB\" ngf-select=\"$ctrl.imageSelected($file)\" class=\"drop-box pointer\" ngf-drag-over-class=\"\'dragover\'\" ngf-multiple=\"false\" ng-required=\"$ctrl.helper_keys.image\" ngf-accept=\"\'image/*\'\" ngf-pattern=\"\'image/*\'\">{{ \'FORM.DRAG_DROP\' | translate }} <br>{{ \'FORM.MAX_SIZE\' | translate }}</div> <img ng-if=\"$ctrl.helper_keys.image && $ctrl.helper_keys.image.image\" src=\"{{ $ctrl.helper_keys.image.image }}\" style=\"max-height:200px;\" name=\"image\" /> </div> <div class=\"col-xs-12 col-md-4\"> <button id=\"idRemoveFileLink\" ng-if=\"$ctrl.helper_keys.image && $ctrl.helper_keys.image.image\" ng-click=\"$ctrl.removeDataFile()\" class=\"btn btn-warning ux-txt-warning pointer\"> <i class=\"fa fa-trash\" aria-hidden=\"true\"></i> {{ \'BUTTON.TITLE.REMOVE\' | translate }}</button> <a ng-if=\"$ctrl.helper_exclusive\" class=\"top-buffer btn btn-default ux-txt-success pointer\" ng-class=\"{\'disabled\': !$ctrl.helper_keys.bundle}\" ng-click=\"$ctrl.ok(\'bundle\')\" ng-disabled=\"!$ctrl.helper_keys.bundle\"> <i class=\"fa fa-lg fa-files-o\" aria-hidden=\"true\"></i> </a> </div> </div> </div> <div uib-accordion-group is-open=\"$ctrl.organizationIsOpen\" ng-hide=\"$ctrl.helper_exclusive ? !$ctrl.organizationIsExclusive: false\" class=\"organization-option\"> <div uib-accordion-heading>{{ \'FORM.ORGANIZATION\' | translate }}</div> <div class=\"row row-eq-height\"> <div class=\"col-xs-10\"> <custom-ui-select-organization on-select-item=\"$ctrl.onSelectOrganization($item, $model)\" on-remove=\"$ctrl.onDeleteOrganization()\" organization=\"$ctrl.organizationC.selected\" multiple=\"false\"></custom-ui-select-organization> </div> <div class=\"col-xs-2 vcenter no-padding\" ng-if=\"$ctrl.helper_exclusive\"> <a class=\"top-buffer btn btn-default ux-txt-success pointer\" ng-class=\"{\'disabled\': !$ctrl.helper_keys.organization}\" ng-click=\"$ctrl.ok(\'organization\')\" ng-disabled=\"!$ctrl.helper_keys.organization\"> <i class=\"fa fa-lg fa-files-o\" aria-hidden=\"true\"></i> </a> </div> </div> </div> <div uib-accordion-group is-open=\"$ctrl.channelIsOpen\" ng-hide=\"$ctrl.helper_exclusive ? !$ctrl.channelIsExclusive: false\" class=\"channel-option\"> <div uib-accordion-heading>{{ \'FORM.CHANNEL\' | translate }}</div> <div class=\"row row-eq-height\"> <div class=\"col-xs-10\"> <custom-ui-select-channel on-select-item=\"$ctrl.onSelectChannel($item, $model)\" on-remove=\"$ctrl.onDeleteChannel()\" channel=\"$ctrl.channelC.selected\" multiple=\"false\" organization=\"$ctrl.organization\"></custom-ui-select-channel> </div> <div class=\"col-xs-2 vcenter no-padding\" ng-if=\"$ctrl.helper_exclusive\"> <a class=\"top-buffer btn btn-default ux-txt-success pointer\" ng-class=\"{\'disabled\': !$ctrl.helper_keys.channel}\" ng-click=\"$ctrl.ok(\'channel\')\" ng-disabled=\"!$ctrl.helper_keys.channel\"> <i class=\"fa fa-lg fa-files-o\" aria-hidden=\"true\"></i> </a> </div> </div> </div> <div uib-accordion-group is-open=\"$ctrl.serviceGroupIsOpen\" ng-hide=\"$ctrl.helper_exclusive ? !$ctrl.serviceGroupIsExclusive: false\" class=\"serviceGroup-option\"> <div uib-accordion-heading>{{ \'FORM.SERVICE_GROUP\' | translate }}</div> <div class=\"row row-eq-height\"> <div class=\"col-xs-10\"> <custom-ui-select-service-group on-select-item=\"$ctrl.onSelectServiceGroup($item, $model)\" on-remove=\"$ctrl.onDeleteServiceGroup()\" service-group=\"$ctrl.serviceGroupC.selected\" multiple=\"false\"></custom-ui-select-service-group> </div> <div class=\"col-xs-2 vcenter no-padding\" ng-if=\"$ctrl.helper_exclusive\"> <a class=\"top-buffer btn btn-default ux-txt-success pointer\" ng-class=\"{\'disabled\': !$ctrl.helper_keys.serviceGroup}\" ng-click=\"$ctrl.ok(\'channel\')\" ng-disabled=\"!$ctrl.helper_keys.serviceGroup\"> <i class=\"fa fa-lg fa-files-o\" aria-hidden=\"true\"></i> </a> </div> </div> </div> </uib-accordion> </div> <div class=\"modal-footer\"> <a ng-if=\"!$ctrl.helper_exclusive\" class=\"top-buffer btn btn-default ux-txt-success pointer\" ng-class=\"{\'disabled\': !$ctrl.canApply()}\" ng-click=\"$ctrl.ok()\" ng-disabled=\"!$ctrl.canApply()\"> <i class=\"fa fa-lg fa-files-o\" aria-hidden=\"true\"></i> {{\'BUTTON.TITLE.ALL\' | translate }} </a> <button class=\"btn btn-warning\" type=\"button\" ng-click=\"$ctrl.cancel()\">{{\'BUTTON.TITLE.CANCEL\' | translate}}</button> </div></script>");
$templateCache.put("schema-form/views/schema.form.asset.template.html","<div ng-class=\"{\'has-error\': hasError(), \'has-success\': hasSuccess(), \'has-feedback\': form.feedback !== false }\" class=\"form-group {{form.htmlClass}}\"><custom-ui-select-asset label=form.title specific-type={{form.specificType}} on-select-item=\"evalExpr(form.onselectitem, {$item: $$value$$, $model: $model})\" on-remove=\"evalExpr(form.onremove, {$item: $$value$$, $model: $model})\" ng-model=$$value$$ identifier=$$value$$ multiple=form.multiple sf-field-model=replaceAll ui-select-match-class=form.uiSelectMatchClass asset=form.dummy ng-required=form.required></custom-ui-select-asset></div>");
$templateCache.put("schema-form/views/schema.form.channel.template.html","<div ng-class=\"{\'has-error\': hasError(), \'has-success\': hasSuccess(), \'has-feedback\': form.feedback !== false }\" class=\"form-group {{form.htmlClass}}\"><custom-ui-select-channel label=form.title on-select-item=\"evalExpr(form.onselectitem, {$item: $item, $model: $model})\" on-remove=\"evalExpr(form.onremove, {$item: $item, $model: $model})\" channel=form.dummy identifier=$$value$$ multiple=form.multiple sf-field-model=replaceAll ng-model=$$value$$ organization=evalInScope(form.organization) ng-required=form.required ui-select-match-class=form.uiSelectMatchClass></custom-ui-select-channel></div>");
$templateCache.put("schema-form/views/schema.form.datastream.template.html","<div ng-class=\"{\'has-error\': hasError(), \'has-success\': hasSuccess(), \'has-feedback\': form.feedback !== false }\" class=\"form-group {{form.htmlClass}}\"><custom-ui-select-datastream on-select-item=\"evalExpr(form.onselectitem, {$item: $$value$$, $model: $model})\" on-remove=\"evalExpr(form.onremove, {$item: $$value$$, $model: $model})\" ng-model=$$value$$ datastream=form.dummy identifier=$$value$$ multiple=form.multiple sf-field-model=replaceAll ng-required=form.required ui-select-match-class=form.uiSelectMatchClass></custom-ui-select-datastream></div>");
$templateCache.put("schema-form/views/schema.form.device.template.html","<div ng-class=\"{\'has-error\': hasError(), \'has-success\': hasSuccess(), \'has-feedback\': form.feedback !== false }\" class=\"form-group {{form.htmlClass}}\"><custom-ui-select-device label=form.title specific-type={{form.specificType}} on-select-item=\"evalExpr(form.onselectitem, {$item: $$value$$, $model: $model})\" on-remove=\"evalExpr(form.onremove, {$item: $$value$$, $model: $model})\" identifier=$$value$$ multiple=form.multiple sf-field-model=replaceAll device=form.dummy ng-model=$$value$$ ng-required=form.required ui-select-match-class=form.uiSelectMatchClass actions=form.actions></custom-ui-select-device></div>");
$templateCache.put("schema-form/views/schema.form.entity.template.html","<div ng-class=\"{\'has-error\': hasError(), \'has-success\': hasSuccess(), \'has-feedback\': form.feedback !== false }\" class=\"form-group {{form.htmlClass}}\"><custom-ui-select-entity label=form.title on-select-item=\"evalExpr(form.onselectitem, {$item: $$value$$, $model: $model})\" on-remove=\"evalExpr(form.onremove, {$item: $$value$$, $model: $model})\" entity=form.dummy identifier=$$value$$ multiple=form.multiple sf-field-model=replaceAll ng-model=$$value$$ ng-required=form.required ui-select-match-class=form.uiSelectMatchClass></custom-ui-select-entity></div>");
$templateCache.put("schema-form/views/schema.form.helper.boolean.template.html","<div class=form-group><div class=checkbox ng-class=\"{\'has-error\': hasError(), \'has-success\': hasSuccess(), \'has-feedback\': form.feedback !== false }\"><label><input type=checkbox id=$$value$$ name=$$value$$ ng-model=$$value$$ sf-field-model=replaceAll sf-changed=form ng-model-options=form.ngModelOptions schema-validate=form> <span class=checkbox-material><span class=check></span></span> <span ng-bind-html=form.title class=text-left></span></label></div><div class=help-inline sf-message=form.description ng-bind-html=form.description></div></div>");
$templateCache.put("schema-form/views/schema.form.helper.checkboxes.template.html","<div class=\"{{form.schema?form.schema.htmlClass:\'\'}}\"><div class=form-group sf-array=form ng-class=\"{\'has-error\': hasError(), \'has-success\': hasSuccess(), \'has-feedback\': form.feedback !== false }\"><label>{{ form.title }}</label><br><div class=checkbox ng-if=form.titleMap ng-repeat=\"val in titleMapValues track by $index\"><label><input type=checkbox id=$$value$$ ng-disabled=form.readonly sf-changed=form name=$$value$$ ng-model=titleMapValues[$index]> <span class=checkbox-material><span class=check></span></span> <span ng-bind-html=form.titleMap[$index].name class=text-left></span></label></div><div ng-if=form.description class=help-inline ng-bind-html=form.description></div></div></div>");
$templateCache.put("schema-form/views/schema.form.helper.datetime.template.html","<div class=\"form-group {{form.htmlClass}}\"><label class=control-label ng-show=showTitle()>{{form.title}}<field-options required=form.required multiple=form.multiple></field-options></label><datetime-select id={{form.id}} name={{form.name}} ng-model=$$value$$ sf-changed=form schema-validate=form sf-field-model=replaceAll ng-disabled=form.readonly ng-required=form.required placeholder=\"{{form.date.placeholder }}\" mode={{form.type}} format={{form.date.format}} ng-value=form.value><div class=help-block sf-message=form.description></div></datetime-select></div>");
$templateCache.put("schema-form/views/schema.form.helper.radiobuttons.template.html","<div class=\"{{form.schema?form.schema.htmlClass:\'\'}}\"><div class=form-group ng-class=\"{\'has-error\': hasError(), \'has-success\': hasSuccess(), \'has-feedback\': form.feedback !== false }\"><label for=$$value$$ ng-model=$$value$$>{{ form.title }}</label><br><div class=btn-group><label ng-repeat=\"data in form.titleMap track by $index\" class=\"btn btn-sm\" ng-class=\"{ \'btn-primary\': data.value === $$value$$, \'btn-default\': data.value !== $$value$$ }\" sf-field-model=replaceAll><input type=radio id=$$value$$ name=$$value$$ ng-model=$$value$$ sf-field-model=replaceAll ng-value=data.value style=display:none; sf-changed=form> <span ng-bind-html=data.name class=text-left></span></label></div><div ng-if=form.description class=help-inline ng-bind-html=form.description></div></div></div>");
$templateCache.put("schema-form/views/schema.form.helper.radios.template.html","<div class=\"{{form.schema?form.schema.htmlClass:\'\'}}\"><div class=form-group ng-class=\"{\'has-error\': hasError(), \'has-success\': hasSuccess(), \'has-feedback\': form.feedback !== false }\"><label for={{$$value$$}} ng-model=$$value$$>{{ form.title }}</label><br><div class=\"radio radio-primary\" ng-if=form.titleMap ng-repeat=\"data in form.titleMap track by $index\"><label><input type=radio id=$$value$$ name=$$value$$ ng-model=$$value$$ sf-field-model=replaceAll value={{data.value}} sf-changed=form ng-disabled=form.readonly schema-validate=form ng-model-options=form.ngModelOptions> <span class=circle></span> <span class=check></span><p ng-bind-html=data.name class=text-left></p></label></div><div ng-if=form.description class=help-inline ng-bind-html=form.description></div></div></div>");
$templateCache.put("schema-form/views/schema.form.helper.radiosinline.template.html","<div class=\"{{form.schema?form.schema.htmlClass:\'\'}}\"><div class=form-group ng-class=\"{\'has-error\': hasError(), \'has-success\': hasSuccess(), \'has-feedback\': form.feedback !== false }\"><label for={{$$value$$}} ng-model=$$value$$ sf-field-model=replaceAll>{{ form.title }}</label><br><div class=\"radio radio-primary\" ng-if=form.titleMap ng-repeat=\"data in form.titleMap track by $index\" style=\"display: inline;\"><label><input type=radio id=\"{{$$value$$ + \'_\' + $index}}\" name={{$$value$$}} ng-model=$$value$$ sf-field-model=replaceAll value={{data.value}} sf-changed=form ng-disabled=form.readonly schema-validate=form ng-model-options=form.ngModelOptions> <span class=circle></span> <span class=check></span><p ng-bind-html=data.name class=text-left></p></label></div><div ng-if=form.description class=help-inline ng-bind-html=form.description></div></div></div>");
$templateCache.put("schema-form/views/schema.form.helper.template.html","<div class=\"{{form.schema?form.schema.htmlClass:\'\'}}\"><div class=form-group ng-class=\"{\'has-error\': hasError(), \'has-success\': hasSuccess(), \'has-feedback\': form.feedback !== false }\"><helper-dialog helper-id={{form.helperid}} helper-exclusive={{form.exclusive}} helper-type={{form.helperType}} specific-type={{form.specificType}} organization={{form.organization}} channel={{form.channel}} ng-required=form.required><helper-ui-select id={{form.id}} name={{form.name}} label-text={{form.title}} helper-model=$$value$$ sf-field-model=replaceAll label-error={{form.labelerror}} ng-required=form.required><helper-ui-select-input><label for={{form.name}}>{{form.title}} {{form.helperid}} {{form.exclusive}}<field-optionsng-required=\"form.required\"></field-optionsng-required=\"form.required\"></label> <input class=form-control name={{form.name}} type=text id={{form.id}} ng-model=$$value$$ sf-field-model=replaceAll ng-required=form.required></helper-ui-select-input></helper-ui-select></helper-dialog></div></div>");
$templateCache.put("schema-form/views/schema.form.map.template.html","<div ng-class=\"{\'has-error\': hasError(), \'has-success\': hasSuccess(), \'has-feedback\': form.feedback !== false }\" class=\"form-group {{form.htmlClass}}\"><custom-ui-map label=form.title ng-required=form.required only-map=form.onlyMap disabled=form.disabled on-select-item=\"evalExpr(form.onselectitem, {$item: $$value$$, $model: $model})\" on-remove=\"evalExpr(form.onremove, {$item: $$value$$, $model: $model})\" location=$$value$$ sf-field-model=replaceAll></custom-ui-map></div>");
$templateCache.put("schema-form/views/schema.form.ogtypelist.template.html","<div ng-class=\"{\'has-error\': hasError(), \'has-success\': hasSuccess(), \'has-feedback\': form.feedback !== false }\" class=\"form-group {{form.htmlClass}}\"><custom-ui-select-ogtype-list label=form.title path={{form.path}} placeholder=\"{{form.placeholder || \'FORM.PLACEHOLDER.ELEMENT\' | translate }}\" on-select-item=\"evalExpr(form.onselectitem, {$item: $item, $model: $model})\" on-remove=\"evalExpr(form.onremove, {$item: $item, $model: $model})\" ng-model=$$value$$ identifier=$$value$$ multiple=form.multiple sf-field-model=replaceAll ui-select-match-class=form.uiSelectMatchClass element=form.dummy ng-required=form.required></custom-ui-select-ogtype-list></div>");
$templateCache.put("schema-form/views/schema.form.organization.template.html","<div ng-class=\"{\'has-error\': hasError(), \'has-success\': hasSuccess(), \'has-feedback\': form.feedback !== false }\" class=\"form-group {{form.htmlClass}}\"><custom-ui-select-organization label=form.title on-select-item=\"evalExpr(form.onselectitem, {$item: $$value$$, $model: $model})\" on-remove=\"evalExpr(form.onremove, {$item: $$value$$, $model: $model})\" organization=form.dummy identifier=$$value$$ multiple=form.multiple sf-field-model=replaceAll ng-model=$$value$$ ng-required=form.required ui-select-match-class=form.uiSelectMatchClass></custom-ui-select-organization></div>");
$templateCache.put("schema-form/views/schema.form.serviceGroup.template.html","<div ng-class=\"{\'has-error\': hasError(), \'has-success\': hasSuccess(), \'has-feedback\': form.feedback !== false }\" class=\"form-group {{form.htmlClass}}\"><custom-ui-select-service-group label=form.title on-select-item=\"evalExpr(form.onselectitem, {$item: $$value$$, $model: $model})\" on-remove=\"evalExpr(form.onremove, {$item: $$value$$, $model: $model})\" service-group=form.dummy identifier=$$value$$ multiple=form.multiple sf-field-model=replaceAll ng-model=$$value$$ ng-required=form.required ui-select-match-class=form.uiSelectMatchClass entity-type=form.entityType></custom-ui-select-service-group></div>");
$templateCache.put("window-time-select/views/datetime.select.view.html","<p class=\"datetime-container input-group form-group no-margin\"><input readonly type=text class=\"form-control text-left no-margin\" ng-model=rawdata ng-required=required ng-disabled=ngDisabled button-bar=customButtonBar ng-click=openCalendar() datetime-picker={{visibleFormat}} is-open=calendarOpen datepicker-options=pickerOptions.datePicker timepicker-options=pickerOptions.timePicker popup-placement=\"auto top-right\" enable-date=enableDate enable-time=enableTime datepicker-append-to-body=true placeholder={{placeholder}} ng-change=changedRawdata()> <span class=input-group-btn><button class=\"btn btn-default no-padding fa\" ng-class=\"{\'fa-calendar\' : enableDate, \'fa-clock-o\' : !enableDate && enableTime}\" ng-click=openCalendar() aria-hidden=true></button></span></p>");
$templateCache.put("window-time-select/views/window-time.select.view.html","<div permission permission-only=\"\'dateFilter\'\" class=window-time-container><button type=button class=\"btn btn-xs\" ng-class=oneDayClass ng-click=oneDay() translate>BUTTON.TITLE.LAST_DAY</button> <button type=button class=\"btn btn-xs\" ng-class=oneWeekClass ng-click=oneWeek() translate=BUTTON.TITLE.LAST_NUMBER_DAY translate-values=\"{ number: \'7\' }\"></button> <button type=button class=\"btn btn-xs\" ng-class=oneMonthClass ng-click=oneMonth() translate=BUTTON.TITLE.LAST_NUMBER_DAY translate-values=\"{ number: \'30\' }\"></button> <button type=button class=\"btn btn-xs\" ng-class=customClass ng-click=custom() translate>BUTTON.TITLE.CUSTOM</button> <button type=button class=\"btn btn-xs btn-info\" ng-if=filterApplied ng-click=clear() translate>BUTTON.TITLE.CLEAR</button><div ng-if=customEnabled class=\"window-time-body panel panel-body\"><div class=col-xs-12><div class=row><div class=\"col-xs-6 text-left\"><label translate>BUTTON.TITLE.CUSTOM</label></div><div class=\"col-xs-6 text-right\"><button type=button class=\"btn btn-xs oux-button-margin btn-success\" ng-disabled=\"!!errorCustomWindow || fromCalendarOpen || toCalendarOpen\" ng-click=applyCustom() translate>BUTTON.TITLE.APPLY</button></div></div><div class=row><div class=\"col-xs-12 col-md-2 text-left\"><label class=control-label><i class=\"fa fa-calendar\" aria-hidden=true></i> {{ \'FORM.LABEL.FROM\' | translate }}: {{fromDate | date:\'fullDate\'}}</label></div><div class=\"col-xs-12 col-md-4\"><input readonly type=text class=\"form-control text-left no-margin\" ng-model=date.from button-bar=customButtonBar ng-click=openCalendarFrom() ng-required=true datetime-picker={{format}} is-open=fromCalendarOpen datepicker-options=fromOptions.datePicker timepicker-options=fromOptions.timePicker when-closed=fromChange(args) popup-placement=\"auto top-right\" datepicker-append-to-body=true></div><div class=\"col-xs-12 col-md-2 text-left\"><label class=control-label><i class=\"fa fa-calendar\" aria-hidden=true></i> {{ \'FORM.LABEL.TO\' | translate }}: {{fromDate | date:\'fullDate\'}}</label></div><div class=\"col-xs-12 col-md-4\"><input readonly type=text class=\"form-control text-left no-margin\" ng-model=date.to button-bar=customButtonBar ng-click=openCalendarTo() ng-required=true datetime-picker={{format}} is-open=toCalendarOpen datepicker-options=toOptions.datePicker timepicker-options=toOptions.timePicker when-closed=toChange(args) popup-placement=\"auto top-right\" datepicker-append-to-body=true></div></div></div><alert type=danger ng-show=errorCustomWindow class=text-danger style=\"display: block;text-align: center;\"><span ng-bind=errorCustomWindow></span></alert></div></div>");}]);


angular.module('uxleaflet')

.constant('defaultMapOptions', {
    l_gohome: { center: [40.4, -3.7], zoom: 5 },
    l_fullscreen: { position: 'topleft' },
    l_placefinder: { text: 'Place name or coordinates' },
    l_print: { title: 'Print current map view', position: 'topleft' },
    l_minimap: { layer: '$main', toggleDisplay: true }, // { 'osm', 'dark2', '$main', ...}
    l_search: { placeholder: 'Enter device ID', timeAutoclose: 2000 },
    l_boxselection: localStorage.testselection && { position: 'topleft' }, // por defecto deshabilitado 
    l_measure: false, // { position: 'topleft'},
    l_mouseposition: { position: 'bottomleft', numDigits: 4 },
    l_scale: false, //{ position: 'bottomleft', numDigits: 4 },
    l_magnifying: { scale: 3, radius: 180 },
    l_localtiles: false,
    baseLayers: ['osm', 'dark2', 'ogWorld', 'googleTerrain', 'googleHybrid', 'googleRoadmap', 'googleSatellite'],
    baseLayerDefault: 'osm',
    overlays: {},
    mapOptions: {
        editPointSize: 10
    }
})

.constant('allNgBaseLayers', { // angular-leaflet format
    osm: {
        name: 'OpenStreetMap',
        url: '//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        type: 'xyz',
        layerParams: {
            attribution: 'OpenStreet Map',
            maxZoom: 19,
            subdomains: ['a', 'b', 'c']
        }
    },
    dark2: {
        name: 'Dark Map',
        url: '//{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
        layerParams: {
            attribution: 'Cartocdn Dark Map',
            maxZoom: 19
        },
        type: 'xyz'
    },
    ogWorld: {
        name: 'OpenGate Maps',
        url: '//maps.opengate.es/osm_tiles/{z}/{x}/{y}.png',
        layerParams: {
            attribution: 'OpenGate Maps',
            maxZoom: 19
        },
        type: 'xyz'
    },
    googleTerrain: {
        name: 'Google Terrain',
        layerType: 'TERRAIN',
        type: 'google',
        layerParams: {
            maxZoom: 20
        }
    },
    googleHybrid: {
        name: 'Google Hybrid',
        layerType: 'HYBRID',
        type: 'google',
        layerParams: {
            maxZoom: 20
        }
    },
    googleRoadmap: {
        name: 'Google Streets',
        layerType: 'ROADMAP',
        type: 'google',
        layerParams: {
            maxZoom: 20
        }
    },
    googleSatellite: {
        name: 'Google Satellite',
        layerType: 'SATELLITE',
        type: 'google',
        layerParams: {
            maxZoom: 20
        }
    }
    // google: {
    //     name: 'Google Maps',
    //     url: '//{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
    //     layerParams: {
    //         attribution: 'OpenGate Maps',
    //         maxZoom: 19,
    //         subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    //     },
    //     type: 'xyz'
    // }
    ///////////////// REVISAR NO FUNCIONA
    //     ///////////////////
    //     opengate-angular-js-3.0.1.js:7119 Invalid leaflet. No locallayer defined
    // recalculateTileset @ opengate-angular-js-3.0.1.js:7119
    // resetTiles @ opengate-angular-js-3.0.1.js:7043
    // (anonymous) @ opengate-angular-js-3.0.1.js:6960
    // s @ leaflet.js:8
    // opengate-angular-js-3.0.1.js:7047 Uncaught TypeError: Cannot read property '_tileInfos' of undefined
    //     at resetTiles (opengate-angular-js-3.0.1.js:7047)
    //     at e.<anonymous> (opengate-angular-js-3.0.1.js:6960)
    //     at HTMLAnchorElement.s [as _leaflet_click126] (leaflet.js:8)
    // local: {
    //     name: '',
    //     url: 'file://_$local_$NAME_{z}/{x}/{y}.png',
    //     type: 'xyz',
    //     layerParams: {
    //         attribution: '',
    //         maxZoom: 20
    //     }
    // }
})

/**
 * This method updates configuration to improve maps experience in offline config
 */
.run(["$http", "allNgBaseLayers", "defaultMapOptions", function($http, allNgBaseLayers, defaultMapOptions) {
    $http.get('//a.tile.openstreetmap.org/0/0/0.png').error(function(data) {
        delete allNgBaseLayers.osm;
        defaultMapOptions.baseLayers.splice(defaultMapOptions.baseLayers.indexOf('osm'), 1);
    });

    // $http.get('//maps.google.com/maps').error(function(data) {
    //     delete allNgBaseLayers.googleTerrain;
    //     delete allNgBaseLayers.googleHybrid;
    //     delete allNgBaseLayers.googleRoadmap;
    //     defaultMapOptions.baseLayers.splice(defaultMapOptions.baseLayers.indexOf('googleTerrain'), 1);
    //     defaultMapOptions.baseLayers.splice(defaultMapOptions.baseLayers.indexOf('googleHybrid'), 1);
    //     defaultMapOptions.baseLayers.splice(defaultMapOptions.baseLayers.indexOf('googleRoadmap'), 1);
    // });
    // http://mt0.google.com/vt/lyrs=m&x=0&y=0&z=0

    $http.get('//a.basemaps.cartocdn.com/dark_all/0/0/0.png').error(function(data) {
        delete allNgBaseLayers.dark2;
        defaultMapOptions.baseLayers.splice(defaultMapOptions.baseLayers.indexOf('dark2'), 1);
    });

    $http.get('//maps.opengate.es/osm_tiles/0/0/0.png').error(function(data) {
        delete allNgBaseLayers.ogWorld;
        defaultMapOptions.baseLayers.splice(defaultMapOptions.baseLayers.indexOf('ogWorld'), 1);
    });
}])

/**   
 * MapUxService implements:
 * - custom controls configuration for UX users
 * - baselayer configuration
 * It use leafletData
 */
.service('mapUxService', ["$timeout", "leafletData", "mapExtraApiService", "geomUxService", "defaultMapOptions", "allNgBaseLayers", "$translate", function($timeout, leafletData, mapExtraApiService, geomUxService, defaultMapOptions, allNgBaseLayers, $translate) {
    var _this = this;
    var _mapUxService = this;

    L.Map.mergeOptions({
        // false if you want an unruly map
        sleep: true,
        // time(ms) until map sleeps on mouseout
        sleepTime: 750,
        // time(ms) until map wakes on mouseover
        wakeTime: 750,
        // should the user receive wake instrurctions?
        sleepNote: true,
        // should hovering wake the map? (non-touch devices only)
        hoverToWake: true,
        // a message to inform users about waking the map
        wakeMessage: $translate.instant('TOASTR.RIGHT_CLICK_ZOOM_ACTIVATION'),
        wakeMessageTouch: $translate.instant('TOASTR.RIGHT_CLICK_ZOOM_ACTIVATION'),
        // opacity for the sleeping map
        sleepOpacity: .9,
        sleepNoteStyle: {
            background: 'black',
            color: 'white',
            maxWidth: '50%',
            top: '5px'
        }
    });

    this.createMapManager = function(scope) {
        if (!scope || !scope.$id) {
            throw 'Invalid angular scope';
        }
        return new MapManager(scope);
    };

    /**
     * Returns the Id that will be used by a instance of Controller given it scope.
     * @param {scope} $scope param of an angular controller.
     * @param {optIndex : string} only if needed if you want to manage more than one lefaletmap by controller
     */
    _this.getMapId = function(scope, optIndex) {
        var sufix = (optIndex === undefined) ? '' : '-' + optIndex;
        return 'map-' + scope.$id + sufix;
    };

    /**
     * Execute a Promise async.
     * It is required in function that makes a call to $apply method
     * @param {scope} $scope param of an angular controller.
     * @param {function(map)} mapCallback function
     */
    _this.getMap = function(scope, mapCallback, optIndex) {
        var mapId = this.getMapId(scope, optIndex);
        _this.getMapWithId(mapId, mapCallback, scope);
    };

    /**
     * Execute a Promise async.
     * It is required in function that makes a call to $apply method
     * Warn: Returned map has been initiated as UX once.
     * @param {mapId} DOM ID for the map element container.
     * @param {function(map)} mapCallback function
     * @param {scope} $scope param of an angular controller.
     */
    _this.getMapWithId = function(mapId, mapCallback, optScope) {
        // this promise is either sync or async. Problems with angular $apply method.
        leafletData.getMap(mapId).then(function(map) {
            if (map.setNgScope)
                map.setNgScope(optScope);
            $timeout(function() { mapCallback(map); });
        });
    };

    /**
     * Suscribe map event: scope.$on('leafletDirectiveMap.ID.dblclick', function(e) {   })
     * @param {scope} component scope
     * @param {eventName string} valid leaflet map eventname (click, dblclick, mousedown, etc.)
     */
    _this.mapOn = function(scope, eventName, fn) {
        var id = _this.getMapId(scope);
        scope.$on('leafletDirectiveMap.{{ vm.id }}.' + eventName, function(e) {
            if (e.currentScope.vm.id === id) {
                try { fn(e); } catch (err) {}
            }
        });
    };

    /**
     * Return default Options for Ux Map.
     * @param {json} optional. Map options for override returned default options.
     */
    _this.getDefaultOptions = function(overOptions) {
        return angular.extend({}, defaultMapOptions, overOptions || {});
    };

    /** 
     * Return all knwonn configuration for base layers.
     * Configuration base layers is for angular-leaflet-directives
     * @param {options JSON} or null for default
     * @param {searchCallBacks  JSON}  placefinderCb, searchCb
     */
    _this.createNgOptions = function(options, searchCallBacks) {

        options = options || defaultMapOptions;
        searchCallBacks = searchCallBacks || {};

        var uxLocation = options.l_gohome ? options.l_gohome : null;

        /** angular-leaflet-directive options */
        var ngOptions = {
            center: uxLocation ? { lat: uxLocation.center[0], lng: uxLocation.center[1], zoom: uxLocation.zoom } : { lat: 40, lng: -3.7, zoom: 5 },
            layers: {
                baselayers: this.getBaseLayerConfigs(options),
                overlays: options.overlays || {}
            },
            controls: this.createControlConfigs(options, searchCallBacks),
            default: options.mapOptions
        };
        // value for applying to $scope 
        return ngOptions;
    };

    /** 
     * Return all knwonn configuration for base layers.
     * That 'Configuration base layers' are for angular-leaflet-directives
     */
    _this.getAllBaseLayerConfigs = function() {
        return allNgBaseLayers;
    };

    _this.getBaseLayerConfigByName = function(name) {
        var allConfigs = _this.getAllBaseLayerConfigs();
        var curLayer = null;
        angular.forEach(allConfigs, function(layer, key) {
            if (!curLayer && layer.name === name) {
                curLayer = layer;
                curLayer.identifier = key;
            }
        });
        return curLayer;
    };

    /**
     * Create a JSON configuraton of basemaps for angular-leaflet-directive.
     * It may be assingned to 'options.layers.baselayers'
     * @param {uxOptions JSON} ver .constant('defaultMapOptions'
     * return a JSON with configuration of basemaps for angular-leaflet-directive.
     */
    _this.getBaseLayerConfigs = function(uxOptions) {
        var mapBaseLayerConfig = uxOptions.baseLayers;
        var baseDefault = uxOptions.baseLayerDefault || '';
        var allConfigs = this.getAllBaseLayerConfigs();
        var retConfigs = {};

        var failed = [];

        if (baseDefault) {
            for (var i = 0; i < mapBaseLayerConfig.length; i++) {
                var config = mapBaseLayerConfig[i];
                var key = (config instanceof Object) ? (config.id || 'layer_' + i) : config;
                try {
                    if (baseDefault === key) {
                        retConfigs[key] = createNgLayerConfig(config, allConfigs, baseDefault);
                    }
                } catch (err) {
                    failed.push(config);
                }
            }

            for (var i = 0; i < mapBaseLayerConfig.length; i++) {
                var config = mapBaseLayerConfig[i];
                var key = (config instanceof Object) ? (config.id || 'layer_' + i) : config;
                try {
                    if (baseDefault !== key) {
                        retConfigs[key] = createNgLayerConfig(config, allConfigs, baseDefault);
                    }
                } catch (err) {
                    failed.push(config);
                }
            }
        } else {
            for (var i = 0; i < mapBaseLayerConfig.length; i++) {
                var config = mapBaseLayerConfig[i];
                var key = (config instanceof Object) ? (config.id || 'layer_' + i) : config;
                try {
                    retConfigs[key] = createNgLayerConfig(config, allConfigs, baseDefault);
                } catch (err) {
                    failed.push(config);
                }
            }

        }


        // 
        if (failed.length > 0) {
            var sText = 'Not found basemaps: [' + failed.join(', ') +
                ']. available names: [' + this.getAllBaseLayerConfigNames().join(', ') + ']';
            console.error(sText, '');
        }
        return retConfigs;
    };

    _this.getAllBaseLayerConfigNames = function() {
        var allConfigs = _this.getAllBaseLayerConfigs();
        var retNames = [];
        for (var key in allConfigs) {
            retNames.push(key);
        }
        return retNames;
    };

    /**
     * return a json configuration for 'controls' of angular-leaflet-directive.
     * @param {json uxOptions}
     * @param {searchCallBacks json} function callbacks for search control and gPlace control: placefinderCb, searchCb
     */
    _this.createControlConfigs = function(uxOptions, searchCallBacks) {
        var ngOptions = {};

        // angular-plugin: scale 
        if (uxOptions.l_scale) {
            ngOptions.scale = uxOptions.l_scale;
        }

        // custom plugins: array of instances
        ngOptions.custom = _this.createCustomWidgets(uxOptions, searchCallBacks);
        // assignable to ng_options.controls  

        angular.forEach(uxOptions.apikeys, function(value, key) {
            mapExtraApiService.setApikey(key, value);
        });

        return ngOptions;

    };

    _this._createMapControls = function(options, searchCalls) {
        var result = this.createCustomWidgets(options, searchCalls);
        // TODO - Crear el resto de controles. minimap, scale, etc
        return result;
    };

    /**
     * Return an array of instances of plugings configured as options parameters.
     * @param options
     * @param searchCalls: placefinderCb, searchCb
     * @returns Array of leafletplugins 
     */
    _this.createCustomWidgets = function(options, searchCalls) {
        /* known plugins, constructor and default options for ux-map plugins  */

        /* jshint ignore:start */
        var knownPlugins = {
            'l_fullscreen': {
                _controlName: 'fullscreenControl',
                _desc: 'Control for set current view mode in fullscreen',
                constructor: 'L.Control.Fullscreen',
                defaultOpts: {
                    position: 'topleft'
                }
            },
            'l_minimap': {
                _controlName: 'minimapControl',
                _desc: 'Control for showing a minimap guide in a corner of main map',
                constructor: null, // it will be used this.createControlInstance instead 'L.Control.MiniMap',
                defaultOpts: {
                    layer: {
                        url: '//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                        options: {} // { minZoom: 5, maxZoom: 18, attribution: 'Map data &copy; OpenStreetMap contributors' }
                    },
                    position: 'bottomright',
                    toggleDisplay: true,
                    autoToggleDisplay: true,
                    minimized: true,
                    width: 100,
                    height: 100,
                    strings: { hideText: 'Hide Mini Map asdfasdfasdf', showText: 'Show Mini Map' },
                },
                createControlInstance: function(opts) {
                    // minimap has a special constructor: (url, options)
                    // TODO - add constructor to L.Minimap handling args
                    var tileOpt = opts.layer;
                    var tileLayer;
                    if (typeof(tileOpt) === 'string') {
                        tileLayer = tileLayerFromName(tileOpt);
                    } else {
                        // options: next, layerParams old-angular
                        tileLayer = new L.TileLayer(tileOpt.url, tileOpt.options);
                    }
                    return new L.Control.MiniMap(tileLayer, opts);
                }
            },
            'l_mouseposition': {
                _controlName: 'geolocationControl',
                _desc: 'Control for showing current mouse location in lat/lon',
                constructor: L.Control.MousePosition,
                defaultOpts: {
                    position: 'bottomleft'
                }
            },
            'l_placefinder-google': {
                _controlName: 'googleplacefinderControl',
                _desc: 'Control for Search GeoLocation using external WebService (bower:leaflet-google-places-autocomplete)',
                constructor: L.Control.GPlaceAutocomplete2,
                defaultOpts: {
                    searchCall: (searchCalls && searchCalls.placefinderCb) || function() {},
                    placeholder: 'Enter place name', // buscar alternativa ??
                    text: 'Enter place name', // buscar alternativa ??
                    position: 'topleft'
                },
                dependencies: ['google'] /* no usado todavía */
            },
            'l_placefinder-esri': {
                _controlName: 'esriplacefinderControl',
                _desc: 'Control for Search ... ESRI',
                constructor: L.Control.PlaceFinderEsri,
                defaultOpts: {
                    providerName: ['arcgisOnlineProvider', 'mapServiceProvider'],
                    layers: [2, 3],
                    searchFields: ['NAME', 'STATE_NAME']
                }
            },
            'l_placefinder-osm': {
                _controlName: 'osmplacefinderControl',
                _desc: 'Control for Search using OSM/Nominatim',
                constructor: L.Control.OsmPlaceFinder,
                defaultOpts: {
                    placeholder: 'Enter place name', // buscar alternativa ??
                    text: 'Enter place name', // buscar alternativa ??
                    position: 'topleft',
                    forcePosition: 'cómo lo hace googleplacefinderControl???'
                }

            },
            'l_placefinder': 'pending to assign',
            'l_search': {
                _controlName: 'searchControl',
                _desc: 'Control for Search internal features in map',
                constructor: L.Control.Search,
                defaultOpts: {
                    searchCall: searchCalls.searchCb || function() { console.warn('NOT entitiesCacheCallback setter in l_search'); },
                    position: 'topright',
                    placeholder: 'search',
                    timeAutoclose: 2400,
                    textErr: 'Device not found'
                }
            },
            'l_measure': {
                _desc: 'Control for distance measure in map',
                constructor: 'L.Control.Measure',
                defaultOpts: {
                    primaryLengthUnit: 'kilometers',
                    secondaryLengthUnit: 'meters',
                    primaryAreaUnit: 'hectares',
                    secondaryAreaUnit: 'sqmeters',
                    position: 'bottomleft'
                },
                _bower: '\'leaflet-measure \': \'^ 2.1.5\''
            },
            'l_boxselection': {
                _controlName: 'boxselectionControl',
                _desc: 'Control for select features using mouse bounding box',
                constructor: L.Control.FeatureSelection,
                defaultOpts: {
                    position: 'topleft'
                }
            },
            'l_gohome': {
                _controlName: 'gohomeControl',
                _desc: 'Control for Pan/zoom to original position',
                constructor: L.Control.Gohome,
                defaultOpts: {
                    center: [0, 0],
                    zoom: 4,
                    position: 'topleft'
                },
                _bower: false
            },
            'l_print': {
                _controlName: 'printoutControl',
                _desc: 'Control for print out current map view',
                constructor: L.Control.EasyPrint,
                defaultOpts: {
                    title: 'Print map',
                    position: 'topleft',
                    elementsToHide: 'p, h2'
                },
                _bower: false
            },
            'l_magnifying': {
                _controlName: 'magnifyingControl',
                _desc: 'Control for magnify cursor area on map view',
                constructor: L.Control.MagnifyingGlass,
                defaultOpts: {
                    title: 'Magnifying glass',
                    position: 'topleft'
                },
                _bower: false
            },
            'l_localtiles': {
                _controlName: 'localtilesControl',
                _desc: 'Control for reset/load base tiles for offline navigation',
                constructor: L.Control.LocalTileControl,
                defaultOpts: {
                    //title: 'Magnifying glass',
                    position: 'topright'
                },
                _bower: false
            }
        };
        // set default placeFinder:
        knownPlugins['l_placefinder'] = knownPlugins['l_placefinder-osm'];

        var customPlugins = [];
        for (var key in knownPlugins) {
            var plugin = knownPlugins[key];
            var opt = options[key];
            if (plugin && opt) {
                // opt is not undefined, false or 0
                var descName = key + ' ' + plugin._desc;
                try {
                    var fullOpts = $.extend(plugin.defaultOpts, opt);
                    var instance;
                    if (plugin.constructor) {
                        instance = createControlInstance(plugin.constructor, fullOpts);
                    } else {
                        // caso especial con parámetros extra al principio
                        instance = plugin.createControlInstance(fullOpts);
                    }
                    if (!instance._controlName) {
                        instance._controlName = plugin._controlName;
                    }
                    customPlugins.push(instance);
                    console.debug('Created plugin: ' + key + ' ' + descName);
                } catch (err) {
                    console.error('INTERNAL ERROR loading leaflet plugin: ' + descName, err);
                }
            }
        }

        // return array ov leaflet controls (checked addTo method)
        return customPlugins;
        /* jshint ignore:end */
    };

    _this.createOverlaysConfig = function(options) {

        console.debug('createOverlaysConfig no implementado. Solo funciona  options=\'demo\'');
        // sin implementar
        if (options === 'demo') {
            return {
                wms: {
                    name: 'EEUU States (WMS)',
                    type: 'wms',
                    visible: true,
                    url: 'http://suite.opengeo.org/geoserver/usa/wms',
                    layerParams: {
                        layers: 'usa:states',
                        format: 'image/png',
                        transparent: true
                    }
                }
            };
        }

    };

    _this.tryChangeGohomeOptions = tryChangeGohomeOptions; // ngOption , bounds


    //
    // internal functions
    //

    /**
     * Create a NgLayer configuration from a known name (oxm, mbsatellite, etc)
     * @param {*} config string as known map name or config as JSON
     * @param {*} allConfigs 
     * @param {*} baseDefault is the name of the default base layer-
     */
    function createNgLayerConfig(config, allConfigs, baseDefault) {
        var oLayer;
        if (config.split) {
            var mapName = config;
            var parts = mapName.split(':');
            if (parts[0] === 'local') {
                var fileName = parts[1];
                var labelName = parts[2] || 'Local ' + fileName;
                // ng layer configuration
                oLayer = {
                    name: labelName,
                    url: 'file://_$local_' + fileName + '_{z}/{x}/{y}.png',
                    type: 'xyz',
                    layerParams: {
                        attribution: '',
                        maxZoom: 19
                    }
                };
            } else if (allConfigs[mapName]) {
                oLayer = angular.extend({}, allConfigs[mapName]);
            } else {
                throw 'Not found baseLayer name ' + mapName;
            }
        } else {
            // It supposed json configuration. Solo para pruebas internas
            oLayer = angular.extend({}, config);
        }
        // extra config
        if (config === baseDefault) {
            oLayer.visible = true;
        }
        return oLayer;
    }

    /**
     * Create a instance of a L.Control subclass.
     * @param {*} pathOrFunction 
     * @param {*} args only an object will be passed
     */
    function createControlInstance(fullPathOrFunction, args) {
        var Clazz = fullPathOrFunction; // function
        if (typeof fullPathOrFunction === 'string') {
            var path = fullPathOrFunction;
            // try get function from window path
            var parts = path.split('.');
            Clazz = window;
            var known = 'window';
            for (var i = 0; i < parts.length; i++) {
                var key = parts[i];
                if (Clazz[key] === undefined) {
                    throw 'Not found ' + key + ' in ' + known;
                }
                known = known + '.' + key;
                Clazz = Clazz[key];
            }
        }
        try {
            // try construct and only check if implements addTo method
            var instance = new Clazz(args);
            if (instance instanceof L.Control) {
                return instance;
            }
            console.warn(fullPathOrFunction + ' instance do not appears as L.Control');
        } catch (err) {
            var sArgs = JSON.stringify(args);
            throw new Error('Error instantiating ' + fullPathOrFunction + ' with ' + sArgs, err);
        }
    }

    /** Return a L.TileLayer from a known name  (osm, gmaps, etc) */
    function tileLayerFromName(name) {
        var all = _mapUxService.getAllBaseLayerConfigs();
        var opt = all[name] || all.osm || all.dark2 || all.ogWorld || all.googleTerrain || all.googleHybrid || all.googleRoadmap || all.googleSatellite;
        if (opt.type === 'xyz') {
            var tilelayer = new L.TileLayer(opt.url, opt.options || opt.layerParams);
            return tilelayer;
        }
        throw 'not implemented tilelayer creation from ' + JSON.stringify(opt);
    }

    //
    // CLASSES
    //

    /**
     * MapManager gestiona un mapa Leallet con los controles y estilos necesarios para ser usado con UX.
     * @param {*} scope of controller
     * 
     * (se requiere en adf-widget-hmi)
     */
    function MapManager(scope) {

        var _this = this;
        this.controls = [];
        // this._controlName = instance

        // pendiente implementar manejo de los controles y capas para poder tener acceso a ellos.
        this.initControls = function(uxOptions, searchCallBacks) {
            var baseLayers = _mapUxService.getBaseLayerConfigs(uxOptions);
            var controls = _mapUxService._createMapControls(uxOptions, searchCallBacks);
            _mapUxService.getMap(scope, function(map) {
                initControls(map, controls);

                // TODO - addbaselayers

                //$(map._container).find('elem...')...
            });
        };

        this.toggleFullscreen = function() {
            _mapUxService.getMap(scope, function(map) {
                map.toggleFullscreen({});
            });
        };

        function initControls(map, controls) {
            for (var key in controls) {
                var control = controls[key];
                if (control.addTo) {
                    try {
                        control.addTo(map);
                        _this.controls.push(control);
                        var propName = control._controlName;
                        if (propName && !_this[propName]) {
                            // ref to control as named property
                            _this[propName] = control;
                        }
                    } catch (err) {
                        console.error('INTERNAL ERROR adding control to map ', err);
                    }
                }
            }
            // TODO - agregar clases css para temas. Ejemplo
            angular.element(map._container).find('.leaflet-control-layers').addClass('navbar navbar-primary');
        }

    } // MapManager class

    _this.loadGeoJsonFromFile = function(file, callback) {
        var fileName = file ? file.name : 'null';
        var freader = new FileReader();
        freader.onload = function() {
            try {
                var result = freader.result;

                callback(_this.validateGeoJsonContent(result));
            } catch (msg) {
                callback(null, new Error('No valid GeoJson file: [' + fileName + ']\n' + msg), null);
            }
        };

        try {
            freader.readAsText(file);
        } catch (err) {
            callback(new Error('Invalid ' + fileName + '\n' + err.message), null);
        }
    };

    /**
     * validateGeoJsonContent
     * @param {data JSON} As valid GeoJson
     *  
     */
    _this.validateGeoJsonContent = function(data) {
        var obj;
        try {
            obj = JSON.parse(data);
        } catch (err) {
            throw 'Invalid JSON data';
        }
        if (typeof obj !== 'object') {
            throw 'Invalid GeoJSON. Expected JSON format';
        }
        if (obj.type !== 'FeatureCollection') {
            throw 'Invalid GeoJSON. Expected {type:\'FeatureCollection\'...';
        }
        var features = obj.features;
        if (!angular.isArray(features)) {
            throw 'Invalid GeoJSON. Expected {features:[...]...';
        }
        return obj;
    };

    _this.enableRightClickToZoom = function(map, scope) {
        map.scrollWheelZoom.disable();

        var timeoutMessage;

        function hideMessage() {
            scope.showClickMessage = false;
            scope.$apply();
        }

        map.on('fullscreenchange', function(event) {
            if (event.target._isFullscreen) {
                map.scrollWheelZoom.enable();
            } else {
                map.scrollWheelZoom.disable();
            }
        });

        map.on('contextmenu', function(event) {
            scope.showClickMessage = false;
            map.scrollWheelZoom.enable();
        });
        map.on('click', function(event) {
            scope.showClickMessage = false;
            map.scrollWheelZoom.enable();
        });
        // map.on('mouseup', function(event) {
        //     map.scrollWheelZoom.disable();
        // });
        map.on('mouseout', function(event) {
            map.scrollWheelZoom.disable();

            if (timeoutMessage) clearTimeout(timeoutMessage);
            timeoutMessage = setTimeout(hideMessage, 2000);
        });
        map.on('blur', function(event) {
            map.scrollWheelZoom.disable();

            if (timeoutMessage) clearTimeout(timeoutMessage);
            timeoutMessage = setTimeout(hideMessage, 2000);
        });
        map.on('mousemove', function(event) {
            if (!event.target._isFullscreen) {
                if (!map.scrollWheelZoom._enabled) {
                    scope.showClickMessage = true;

                    if (timeoutMessage) clearTimeout(timeoutMessage);
                    timeoutMessage = setTimeout(hideMessage, 2000);
                }
            } else {
                if (!map.scrollWheelZoom._enabled) {
                    map.scrollWheelZoom.enable();
                }
            }
        });
    }

    // v ---- ya existe en servicio geomUxService
    _this.circleToPolygon = geomUxService.circleToPolygon;
    _this.createVectorLayer = geomUxService.createVectorLayer;
    // ^ ---- movido a servicio geomUxService

    /**
     * 
     * @param {*} map 
     */
    function tryChangeGohomeOptions(ngOptions, geoBounds) {
        try {
            var i = 0;
            for (var key in ngOptions.controls.custom) {
                var cc = ngOptions.controls.custom[key];
                if (cc._isGohomeInstance) {
                    cc.changeTargetViewToBounds(geoBounds);
                }
            }
        } catch (err) {
            console.error('Error zooming to bounds ' + geoBounds, err);
        }
    }
    // Pendiente de añadir cuando se deje de usar directiva leaflet.controls

}]);
angular.module('uxleaflet')

/**   
 *  mapUxGeoJsonService is an adf.widget.maps implemented for:
 *  - render custom json data as markers and geometries inside a leaflet layer.
 *  - edition of polygon, lines and markers.
 *  (en esta versión de sept/2017 solo se añadirá botón para añadir polígonos, 
 *   aunque puedan editarse resto de geometrías)
 * 
 * NOTE: only is allowed for edition: simple polygons, simple lines and points 
 *     (rendered as markers)
 */
.service('mapUxGeoJsonService',
    ["$window", "jsonPath", "$api", "$http", "$timeout", "mapUxService", "mapMarkerService", "$oguxThemes", function($window, jsonPath, $api, $http, $timeout, mapUxService, mapMarkerService, $oguxThemes) {
        
        var _markerGroup;
        var _currentFeatures = [];

        /* return an instance of UxGeoJsonManager */
        this.createLayerManager = createLayerManager;
        this.loadGeoJsonFromFile = loadGeoJsonFromFile;
        this.normalizeGeoJson = normalizeGeoJson;

        //
        // internal functions
        // 

        /**
         * create a geoJsonLayer Manager
         * @param {map: L.Map} leaflet map instance
         * @param {geoData: GeoJSON} String with serialized geodata
         * @param {options: JSON} optional callbacks for styling, popup, etc.
         */
        function createLayerManager(map, sGeoData, options) {
            options = options || {};
            try {
                var data = parseGeoJson(sGeoData);
                replaceDefaultProperties(data.features);

                // create wrapper with info about styles
                var mng = new UxGeoJsonManager(map, data, options);
                // leaflet layer based on geojson info
                return mng;
            } catch (err) {
                throw 'invalid data as geojson content. ' + err.message;
            }
        }

        /**
         * Create or replace properties on all features: name, description and drawing-styles
         * (De momento solo útil para polígonos)
         * @param {} features (single feature or array of features)
         */
        function replaceDefaultProperties(features) {

            // force to array
            features = Array.isArray(features) ? features : [features];

            var fillColor = '#ff6600';
            try {
                fillColor = $oguxThemes.getColorFromThemeComposition().sample;
            } catch (err) {
                console.error('WARN: Fail recovering theme from oguxThemes', err);
            }
            var i = 0;
            for (; i < features.length; i++) {
                var feat = features[i];
                try {
                    // required properties object 
                    var props = feat.properties = (feat.properties || {});
                    props.name = props.name || 'no-name'; // provisional. Si no hay nombre entonces 'no-name'

                    if (props.name) {
                        var popupContent = '';
                        popupContent += '<div><span class=\'text-primary\'>' + (props.name || '') + '</span><br>' +
                            (props.description || '') + '</div>';
                        props.popupContent = popupContent;
                    }
                    // default colors for polygons
                    props['fill-opacity'] = 0.2;
                    props.stroke = '#555555';
                    props['stroke-width'] = 1;
                    props['stroke-opacity'] = 1;
                    props.fill = fillColor;
                } catch (err) {
                    console.error('Error replacing properties on feature ', feat, err);
                }
            }

        }

        /**
         * try parse as a object from json string.
         * @param {* any} sJson 
         */
        function parseGeoJson(sJson) {
            if (sJson && sJson.features && (typeof sJson.type === 'string')) {
                // is already an object
                return sJson;
            }
            if (sJson.startsWith('<!')) {
                // 
                throw 'Not found geojson file.';
            }
            try {
                var obj = JSON.parse(sJson);
                if (typeof obj.type !== 'string') {
                    throw 'invalid geojson. Expected type property as string';
                }
                return obj;
            } catch (err) {
                throw 'invalid geojson. Expected JSON ' + err.message;
            }
        }


        function iifUndefined(value1, value2) {
            return (value1 !== undefined) ? value1 : value2;
        }

        /** Converts a point style from gjStyle (editor online) to leaflet style */
        function geoJsonCircleStyle2LeafletCircleStyle(gjStyle) {
            return {
                radius: iifUndefined(gjStyle.radius || 12),
                fillColor: iifUndefined(gjStyle['marker-color'] || '#ff0000'),
                color: iifUndefined(gjStyle.stroke || gjStyle['marker-color'], '#ff0000'),
                weight: iifUndefined(gjStyle['stroke-weight'], 1),
                opacity: iifUndefined(gjStyle['stroke-opacity'], 0.8),
                fillOpacity: iifUndefined(gjStyle['fill-opacity'], 0.2),
            };
        }

        /**
         * Converts style properties from standard app as http://geojson.io to
         * 'leaflet properties' used for styling markers and geometries.
         * @param {flat object} gjStyle 
         */
        function geoJsonStyle2LeafletStyle(gjStyle) {
            return {
                radius: iifUndefined(gjStyle.radius || 12),
                fillColor: iifUndefined(gjStyle.fill, '#ff7800'),
                color: iifUndefined(gjStyle.stroke, '#ff0000'),
                weight: iifUndefined(gjStyle['stroke-weight'], 1),
                opacity: iifUndefined(gjStyle['stroke-opacity'], 0.8),
                fillOpacity: iifUndefined(gjStyle['fill-opacity'], 0.2),
                popupContent: gjStyle.popupContent
            };
        }

        /**
         * load a file with valid geojson content. 
         * It call to callback if success or error; first param is Error (if exist), 
         * and second param is data as text (if success)
         * @param {file} File object.
         * @param {Function callback} called for success or fail result: f(err, data)
         */
        function loadGeoJsonFromFile(file, callback) {
            var fileName = file ? file.name : 'null';
            var freader = new FileReader();
            freader.onload = function() {
                try {
                    var result = freader.result;
                    validateGeoJsonContent(result);
                    callback(null, result);
                } catch (msg) {
                    callback(new Error('No valid GeoJson file: [' + fileName + ']\n' + msg), null);
                }
            };
            try {
                freader.readAsText(file);
            } catch (err) {
                callback(new Error('Invalid ' + fileName + '\n' + err.message), null);
            }
        }

        /**
         * validateGeoJsonContent
         * @param {data JSON} As valid GeoJson
         *  
         */
        function validateGeoJsonContent(data) {
            var obj;
            try {
                obj = JSON.parse(data);
            } catch (err) {
                throw 'Invalid JSON data';
            }
            if (typeof obj !== 'object') {
                throw 'Invalid GeoJSON. Expected JSON format';
            }
            if (obj.type !== 'FeatureCollection') {
                throw 'Invalid GeoJSON. Expected {type:\'FeatureCollection\'...';
            }
            var features = obj.features;
            if (Object.prototype.toString.call(features) !== '[object Array]') {
                throw 'Invalid GeoJSON. Expected {features:[...]...';
            }
        }

        var GEOJSON_TYPES = {
            Point: 'geometry',
            MultiPoint: 'geometry',
            LineString: 'geometry',
            MultiLineString: 'geometry',
            Polygon: 'geometry',
            MultiPolygon: 'geometry',
            GeometryCollection: 'geometry',
            Feature: 'feature',
            FeatureCollection: 'featurecollection'
        };

        /**
         * Normalize a GeoJSON feature into a FeatureCollection.
         * Based on https://github.com/mapbox/geojson-normalize/blob/master/index.js
         *
         * @param {object | string} gj geojson data (only one object)
         * @returns {object} normalized geojson data
         */
        function normalizeGeoJson(gj) {
            var orig = gj; // object or string
            if (typeof gj === 'string') {
                gj = JSON.parse(gj);
            } else if (typeof gj !== 'object') {
                throw new Error('geojson is required as object or string. Nor valid ' + orig);
            }
            if (!gj || !gj.type) {
                throw new Error('Invalid geojson object ', orig);
            }
            var type = GEOJSON_TYPES[gj.type];
            if (!type) {
                throw new Error('Invalid geojson type ' + gj.type);
            }

            if (type === 'geometry') {
                return {
                    type: 'FeatureCollection',
                    features: [{
                        type: 'Feature',
                        properties: {},
                        geometry: gj
                    }]
                };
            } else if (type === 'feature') {
                return {
                    type: 'FeatureCollection',
                    features: [gj]
                };
            } else if (type === 'featurecollection') {
                return gj;
            }
        }

        //
        // Classes
        // 

        /**
         * UxGeoJsonManager manage geojson layer creation and marker/geometries configuration.
         * Permite poner en modo edición sus geometrías y añade botones para añadir más geometrías.
         * @param {map L.Map} L.Map instance
         * @param {data JSON} valid geo json information
         * @param {options OBJECT} style, onEachFeature, pointToLayer, onFeatureCommited listener, etc.
         */
        function UxGeoJsonManager(map, data, options) {

            var _this = this;

            var defaultOptions = {
                radius: 12,
                fillColor: '#ff7800',
                color: '#000',
                weight: 1,
                opacity: 1,
                fillOpacity: 0.2,
                aweMarkerCss: 'hand-o-down',
                onFeatureCommited: _onFeatureCommited
            };

            // private fields
            this._map = map; // TODO - check valid map instance
            this._uxEditionControl = null;

            this.options = L.extend({}, defaultOptions, options);

            /** It represent de L.GeoJson FeatureLayer */
            this.layer = L.geoJson(data, {

                // UX configuration for geometries read from geoJSON

                style: this.options.style || function(feature) {
                    // default style
                    if (feature.properties) {
                        var style = geoJsonStyle2LeafletStyle(feature.properties);
                        return style;
                    } else {
                        return { color: '#ff8800' };
                    }
                },

                onEachFeature: this.options.onEachFeature || function(feature, layer) {
                    // default on each feature
                    if (feature.properties && feature.properties.popupContent) {
                        // usamos este valor como contenido de popup
                        layer.bindPopup(feature.properties.popupContent);
                    }
                },

                pointToLayer: this.options.pointToLayer || function(feature, latlng) {
                    var cssName = _this.options.aweMarkerCss;
                    var layer = mapMarkerService.createMarker(feature, latlng, { defaultAweSymbol: cssName });
                    return layer;
                },

                filter: this.options.filter || function(feature, layer) {
                    return true;
                }

            }); // layer creation

            /** Change edition mode in map passed as argument or in last map used. */
            this.setEditionMode = function (isEnabled) {
                // Add/remove buttons to add/remove geometries.
                // en primera versión usar solo botón para añadir polígonos.
                var map = this._map;
                if (!map) {
                    throw 'Error. No has Map associated to this GeoJson Manager';
                }

                if (isEnabled) {
                    this._uxEditionControl = new L.Control.UxEdition({ position: 'topright', onFeatureCommited: this.options.onFeatureCommited });
                    this._uxEditionControl.addTo(map);
                    this._uxEditionControl.setLayer(this.layer._layers);
                    //this._uxEditionControl.on;
                } else {
                    if (this._uxEditionControl) {
                        this._uxEditionControl.setLayer(undefined);
                        map.removeControl(this._uxEditionControl);
                        delete this._uxEditionControl;
                    }
                }

                // search editable geometries and set it in editionMode
                try {
                    for (var key in this.layer._layers) {
                        var geomLayer = this.layer._layers[key];
                        if (isEnabled) {
                            if (geomLayer.enableEdit) {
                                geomLayer.enableEdit(map);
                            } else {
                                // no editable
                            }
                        } else {
                            if (geomLayer.disableEdit) {
                                geomLayer.disableEdit();
                            } else {
                                // no editable
                            }
                        }
                    }
                } catch (err) {
                    console.error('Error interno habilitando edición de geometrías GeoJSON', err);
                }
            };

            /**
             * Generate geoJson string from all features contained in
             * current layer.
             * All elements of gj layer are layers editable and convertible to GeoJSON.
             * @param {* string} geojson string
             */
            this.layersToGeoJson = function () {
                var features = [];
                for (var key in this.layer._layers) {
                    var lyr = this.layer._layers[key];
                    try {
                        // layer editable
                        lyr.editor.commitDrawing();
                        var feature = lyr.toGeoJSON();
                        features.push(feature);
                    } catch (err) {
                        console.error(' Layer can be converted to feature: ', err);
                    }
                }
                var result = {
                    'type': 'FeatureCollection',
                    'features': features,
                    'lastEdition': new Date().toISOString()
                };
                var sResult = JSON.stringify(result);
                return sResult;
            };

            /* listener por defecto para 'commits' de los botones de edición */
            function _onFeatureCommited(evt) {
                var json = evt.layer.toGeoJSON ? evt.layer.toGeoJSON() : '';
                console.info('map-ux-geojson-service: commited feature. Action: ' + evt.action, json);
            }

        } // UxGeoJsonManager class

    }]
);
angular.module('uxleaflet')

/** 
 * Cambiar a [uxleaflet/client]
 * PlaceFinderEsri carga en segundo plano las librerías requeridas
 * de ESRI para implementar la funcionalidad de PlaceFinder.
 * 
 * Sin implementar. Es posible que se use otro proveedor.
 */
.service('mapEsriService', ["$window", "jsonPath", "$api", "mapUxService", function($window, jsonPath, $api, mapUxService) {

    
    console.info('TESTING l_placefinder_esri');

    // check required esri classes

    var BASE_CLASS = jsonPath('L.esri.Geocoding.Geosearch');
    if (BASE_CLASS) {
        console.warn('Error not found L.esri.Geocoding.Geosearch ');
    }

    /*
 constructor: 'L.esri.Geocoding.Geosearch',
                    defaultOpts: {
                        providers: [
                            L.esri.Geocoding.arcgisOnlineProvider(),
                            L.esri.Geocoding.mapServiceProvider({
                                label: 'States and Counties',
                                url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer',
                                layers: [2, 3],
                                searchFields: ['NAME', 'STATE_NAME']
                            })
                        ]
                    }
   */

    /* 
     * Extension for L.esri.Geocoding.Geosearch class 
     * this class allows simple options
     */
    L.Control.PlaceFinderEsri = BASE_CLASS.extend({

        /* Sample {
               providerName: [ 'arcgisOnlineProvider', 'mapServiceProvider' ],
               layers: [2, 3],
               searchFields: ['NAME', 'STATE_NAME'] }
        */
        initialize: function(options) {

            var opt2 = {
                providers: [
                    L.esri.Geocoding.arcgisOnlineProvider(),
                    L.esri.Geocoding.mapServiceProvider({
                        label: 'States and Counties',
                        url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer',
                        layers: options.layers,
                        searchFields: options.searchFields
                    })
                ]
            };
            BASE_CLASS.prototype.initialize.call(this, opt2);
        },

        _buildContainer: function(options) {
            BASE_CLASS.prototype._buildContainer.call(this, options);
            // Solo debe invocarse si existe google.maps.places.Autocomplete
            // var _that = this;
            // L.ensureExtraApi('esri', ['google.maps.places.Autocomplete'], function() {
            //     BASE_CLASS.prototype._buildContainer.call(_that, options);
            // });
        },

        addTo: function(map) {
            BASE_CLASS.prototype.addTo.call(this, map);
            // solo debe invocarse cuando exista this._container.
            // var _that = this;
            // var tInterval = window.setInterval(function() {
            //     if (_that.container) {
            //         window.clearInterval(tInterval);
            //         BASE_CLASS.prototype.addTo.call(_that, map);
            //     }
            // }, 
            // 100); // check this._container each 100 ms
        }

    });

}]);


/**
 * L.extraApi o module('uxleaflet').service('mapExtraApiService')
 * Necesita se requerido desde algún módulo
 */
angular.module('uxleaflet').service('mapExtraApiService',
    function() {

        /** inicialización como servicio de uxleaflet */
        this.ensureLib = ensureLib;
        this.setApikey = setApikey;

        /** Inicialización como parte de Leaflet */
        /* jshint ignore:start */
        L.extraApi = {};
        L.extraApi.ensureLib = this.ensureLib = ensureLib;
        L.extraApi.setApikey = this.setApikey = setApikey;
        /* jshint ignore:end */

        // TODO - extraer API-KEY y resto de parámetros
        // solo asignable una vez
        var EXT_APIS = {
            /** Api de Google, incluyendo drawing and places  AIzaSyCaoa14apu4sn1ubM3karbgt8A8V-E7J3s */
            google: {
                apikey: null, // 'AIzaSyCaoa14apu4sn1ubM3karbgt8A8V-E7J3s',
                isApikeyRequired: true,
                options: { libraries: 'drawing,places' },
                getUrl: function() {
                    var libs = (this.options.libraries) ? '&libraries=' + this.options.libraries : ''; // probar
                    return 'https://maps.google.com/maps/api/js?v=3.20&libraries=drawing,places&key=' + this.apikey;
                },
                status: null
            },
            /** Api de Esri. Versiones compatibles con leaflet 0.7 y 1, */
            esri: {
                apikey: '',
                getUrl: function() {
                    return 'https://unpkg.com/esri-leaflet@2.0.8';
                },
                status: null
            },
            /* */
            osm: {
                apikey: '',
                getUrl: function() {
                    return 'https://openstreetmap.org/aaaaaaaaaaaaa';
                },
                status: null
            },
            /** Sin usar todavía */
            mapquest: {
                apikey: '',
                getUrl: function() {
                    return 'https://maquest.com/aaaaaaaaaaaa';
                },
                status: null
            },
        };

        ///
        /// internal functions
        ///

        /**
         * set the apiKey for required Gis lib (i.e google)
         * 
         */
        function setApikey(apiName, sApiKey) {
            // FIXME - evitar duplicación de apikey en la página completa (sobre todo de google maps)
            if (EXT_APIS[apiName]) {
                EXT_APIS[apiName].apikey = sApiKey;

            } else {
                console.warn('WARN: \'setApiKey\'. Not found ApiName: ' + apiName);
            }
        }

        function existGlobalNames(globalNames) {
            var exist = true;
            for (var a = 0; a < globalNames.length; a++) {
                var name = globalNames[a];
                var parts = name.split('.');
                var obj = window;
                for (var i = 0; i < parts.length; i++) {
                    exist = exist && obj[parts[i]];
                    if (!exist) break;
                }
            }
            return exist;
        }

        /**
         * Load required Gis services and call to callback(err, data).
         * It can be called from different modules to load a known lib only once.
         * NOTE: this method wait if apikey is required.
         * @param {*} typelib : { google, esri, osm, mapquest }
         * @param {*} globalNames : { google, google.maps, google.maps.places, L.esri, osm, mapquest }
         * @param {*} callback : function called when success or fail.
         */
        function ensureLib(apiId, globalNames, callback) {

            var extApi = EXT_APIS[apiId];
            if (!extApi) {
                console.warn('not found known EXT_API as: ' + apiId);
                tryCallback(callback, new Error('not found known EXT_API as: ' + apiId), null);
            }

            var exist = existGlobalNames(globalNames);
            if (exist) {
                tryCallback(callback, null, window[apiId]);
                return;
            }

            if (extApi.status === 'fail') {
                // already try and fail loading API
                tryCallback(callback, new Error('not found API for ' + apiId), null);
                return;
            }
            if (extApi.status === 'loading') {
                // wait for pending loading
                var timer = window.setInterval(function() {
                    if (extApi.status !== 'loading') {
                        window.clearInterval(timer);
                        if (extApi.status === 'ok') {
                            tryCallback(callback, null, window[apiId]);
                        } else if (extApi.status === 'fail') {
                            tryCallback(callback, new Error('not found API for ' + apiId), null);
                        }
                    }
                });
                return;
            }

            // flag as loading API
            extApi.status = 'loading'; // loading, ok, fail

            var script = document.createElement('script');
            script.type = 'text/javascript';
            // event listener readyState or onload
            if (script.readyState) { //IE
                script.onreadystatechange = function() {
                    if (script.readyState === 'loaded' || script.readyState === 'complete') {
                        extApi.status = 'ok';
                        script.onreadystatechange = null;
                        tryCallback(callback, null, window[apiId]);
                    }
                };
            } else { //Others
                script.onload = function() {
                    extApi.status = 'ok';
                    tryCallback(callback, null, window[apiId]);
                };
            }
            // on Fail ???

            // TODO - usar un objeto Promise html5 o un Promose de Angular
            appendScriptWhenApikeyReady();

            function appendScriptWhenApikeyReady() {
                // extApi and script are declared in current ensureLib function scope
                if (extApi.isApikeyRequired && !extApi.apikey) {
                    // repetir la espera (de forma indefinida)
                    window.setTimeout(appendScriptWhenApikeyReady, 1000);
                } else {
                    // apikey is available or not required.
                    script.src = extApi.getUrl();
                    document.getElementsByTagName('head')[0].appendChild(script);
                }
            }

            // Utils

            /** do callback if it is a function */
            function tryCallback(cb, err, data) {
                if (cb && cb.call) {
                    try { cb(err, data); } catch (err) { console.error('callback error: ', err); }
                }
            }

        } // 

    });


angular.module('uxleaflet')

/**   
 * geomUxService implements utilities for manage geometries and coordinates
 */
.service('geomUxService', ["$timeout", function($timeout) {
    var _this = this;

    _this.circleToPolygon = circleToPolygon;
    _this.createVectorLayer = createVectorLayer;

    //
    // internal functions
    //

    function toRadians(angleInDegrees) {
        return angleInDegrees * Math.PI / 180;
    }

    function toDegrees(angleInRadians) {
        return angleInRadians * 180 / Math.PI;
    }

    /**
     * 
     * @param {*} c1 
     * @param {*} distance 
     * @param {*} bearing 
     */
    function offset(c1, distance, bearing) {
        var lat1 = toRadians(c1[1]);
        var lon1 = toRadians(c1[0]);
        var dByR = distance / 6378137; // distance divided by 6378137 (radius of the earth) wgs84
        var lat = Math.asin(
            Math.sin(lat1) * Math.cos(dByR) +
            Math.cos(lat1) * Math.sin(dByR) * Math.cos(bearing));
        var lon = lon1 + Math.atan2(
            Math.sin(bearing) * Math.sin(dByR) * Math.cos(lat1),
            Math.cos(dByR) - Math.sin(lat1) * Math.sin(lat));
        return [toDegrees(lon), toDegrees(lat)];
    }

    /**
     * Create a Geometry object of type polygon from circle parameters.
     * The coordinates will contains an unique ring
     * @return {JSON Geometry} type:'Polygon', coordinates: [ [[p1x, p1y], [p2x, p2y]] ]
     */
    function circleToPolygon(centerPoint, radius, numberOfSegments) {
        var n = numberOfSegments ? numberOfSegments : 32;
        var ring = [];
        for (var i = 0; i < n; i += 1) {
            ring.push(offset(centerPoint, radius, 2 * Math.PI * i / n));
        }
        ring.push(ring[0]); // last point ref to firts point. they are the same object

        return {
            type: 'Polygon',
            coordinates: [ring] // only an external linear ring
        };
    }

    /** 
     * This method is used for check distances from points to a supossed common 'center'.
     * It is the case of points of polygon generated from circle parameters: all points should be
     * have a distance very simililar to common center.
     * The error is setted to .00001% (10^-7)  */
    function areSimiliarValues(a, b) {
        var EPS = 0.0000001;
        if (!a || !b) return false;
        var ratio = 1.0 * a / b;
        var dif = Math.abs(1 - ratio);
        return dif < EPS;
    }

    /**
     * Create a vector Layer: Polygon or circle attending to geometry type of parameter
     * @param {GeoJSON geometry}
     */
    function createVectorLayer(geometry) {

        var isCircle;

        var METERS_PER_DEGREE = (40075017.0 / 360);

        var exteriorRing = geometry.coordinates[0] || [];
        var bounds = L.bounds(exteriorRing);
        var center = bounds.getCenter();
        var size = bounds.getSize();
        var radius = size.y / 2 * METERS_PER_DEGREE;
        if (geometry.type === 'Polygon') {
            // only one linear ring expected: the exteriorRing

            var MIN_CIRCLE_POINTS = 50; // minimum points for conversion circle to polygon
            
            if (exteriorRing.length >= MIN_CIRCLE_POINTS) {
                // polygon candidate to circle.
                isCircle = true;
                var centerLatLng = new L.LatLng(center.y, center.x);
                for (var key in exteriorRing) {
                    var xy = exteriorRing[key];
                    var borderLatLng = new L.LatLng(xy[1], xy[0]);
                    var dist = centerLatLng.distanceTo(borderLatLng);
                    if (!dist || !areSimiliarValues(radius, dist)) {
                        isCircle = false;
                        break;
                    }
                }
            } else {
                // too few points for a transformed circle in polygon
                isCircle = false;
            }
        } else {
            isCircle = false;
        }

        var vectorLayer;
        if (isCircle === false) {
            // No Circle.
            var gjLayer = L.geoJson(geometry, {
                onEachFeature: function(feat, layer) {
                    if (!feat.properties) {
                        feat.properties = {};
                    }
                }
            });
            vectorLayer = gjLayer.getLayers()[0];
        } else {
            // It is a polygon generated from Circle parameters
            // creating special VectorLayer for Circle
            var lat = (center.lat !== undefined) ? center.lat : center.y;
            var lng = (center.lng !== undefined) ? center.lng : center.x;
            vectorLayer = L.circle([lat, lng], radius);
        }
        return vectorLayer;
    }

}]);


angular.module('uxleaflet').service('geocodingService', UxLeaflet_GeocodingService);

/**   
 * uxleaflet.geocodingService implements geo utilities search address and locations.
 * It allows search a lo location from address.
 * It allows reverse search of the nearest address from a geo location
 * 
 * NOTE:
 * An instance of will be setted to L.Util.geocodingService (provisional)
 */
function UxLeaflet_GeocodingService($http) {

    var _this = this;

    var opts = {}; // default options for this service
    var _geoCodingService = new L.OsmGeocodingService($http, opts);

    /* Esto puede usarse para configurar el tipo de respuesta en reverse-geocoding */
    var FULL_RESPONSE_TEMPLATE = {
        'house_number': { 'Num casa': true },
        'road': { 'Calle': true },
        'suburb': { 'Suburb': false },
        'city': { 'Ciudad': true },
        'county': { 'Provincia': true },
        'state_district': { 'Suburb': false },
        'state': { 'Estado': false },
        'postcode': { 'CP': false },
        'country': { 'País': true },
        'country_code': { 'cc': false }
    };

    /**
     * Return information given a description of a feature.
     * @param {String} sDescription 
     * @param {*} callback (err, responseData)
     * @return {json array} a json like () [{'place_id':'179320264','osm_type':'relation','osm_id':'5326784',
     *  'boundingbox':['40.3119774','40.6437293','-3.8889539','-3.5179163'],
     *   'lat':'40.4167047','lon':'-3.7035825',
     *   'display_name':'Madrid, Área metropolitana de Madrid y Corredor del Henares, Comunidad de Madrid, España',
     *   'class':'place','type':'city','importance':0.29353044801777,
     *   'icon':'http:\/\/nominatim.openstreetmap.org\/images\/mapicons\/poi_place_city.p.20.png',
     *   'address':{'city':'Madrid','county':'Área metropolitana de Madrid y Corredor del Henares',
     *       'state':'Comunidad de Madrid','country':'España','country_code':'es'}}]
     */
    _this.search = function(sDescription, options, callback) {

        var escapedText = sDescription; // TODO - escapar
        var limit = (!options && '2') || (options.limit || '3');

        _geoCodingService.search(escapedText, options, callback);

    };

    /**
     * https://nominatim.openstreetmap.org/reverse
     * @param {*} lat 
     * @param {*} lon 
     * @param {*} callback 
     * @param {*} optFormat. formato del json respuesta, por defecto se devuelve todo lo que responde el webservce
     * @return JSON object with data and metadata of this location
     */
    _this.reverseSearch = function(lat, lon, zoom, callback, optFormat, language_code) {

        var resp = $.extend({}, FULL_RESPONSE_TEMPLATE);
        optFormat = $.extend({}, optFormat);

        _geoCodingService.reverseSearch(lat, lon, zoom, function(err, data) {
            // 
            if (err) {
                callback(err);
            } else {
                // formatear respuesta
                var resp2 = formatGeoResponse(data);
                callback(null, resp2);
            }
        }, optFormat, language_code);

    };

    /**
     * 
     * @param {*} baseUrl 
     * @param {*} lat
     * @param {*} lon 
     * @param {*} zoom 
     */
    function formatGeoResponse(geoData) {
        // usar FULL_RESPONSE_TEMPLATE para formatear la respuesta si fuera necesario
        return geoData;
    }

}
UxLeaflet_GeocodingService.$inject = ["$http"];

/*
  Ejemplo:
   
  https://nominatim.openstreetmap.org/reverse?format=xml&lat=52.548&lon=-1.81607&zoom=15&addressdetails=1

    lat/lon  4 decimales ya tienen precisión de 1 metro.
    zoom: (18, 1) nivel de detalle de la respuesta: 18 número de casa, 15 barrio, 10 ciudad ...

    Ejemplo con nivel 18;
    ---------------------
    <addressparts>
        <house_number>137</house_number>
        <road>Pilkington Avenue</road>
        <suburb>Sutton Coldfield</suburb>
        <city>Birmingham</city>
        <county>West Midlands Combined Authority</county>
        <state_district>West Midlands</state_district>
        <state>Inglaterra</state>
        <postcode>B72 1LH</postcode>
        <country>Reino Unido</country>
        <country_code>gb</country_code>
    </addressparts>

    https://nominatim.openstreetmap.org/reverse?format=json&lat=52.5487429714954&lon=-1.81602098644987&zoom=18&addressdetails=1

    {
        'place_id':'91015268',
        'licence':'Data © OpenStreetMap contributors, ODbL 1.0. http:\/\/www.openstreetmap.org\/copyright',
        'osm_type': 'way',
        'osm_id':'90394420',
        'lat':'52.54877605',
        'lon':'-1.81627033283164',
        'display_name':'137, Pilkington Avenue, Sutton Coldfield, Birmingham, West Midlands Combined Authority, West Midlands, Inglaterra, B72 1LH, Reino Unido',
        'address':{
            'house_number':'137',
            'road':'Pilkington Avenue',
            'suburb':'Sutton Coldfield','city':'Birmingham','county':'West Midlands Combined Authority',
            'state_district':'West Midlands',
            'state':'Inglaterra',
            'postcode':'B72 1LH',
            'country':'Reino Unido',
            'country_code':'gb'
        },
        'boundingbox':['52.5487321','52.5488299','-1.8163514','-1.8161885']}
    
 */
/*
 * (SIN USAR)
 * 
 * Cloned from angular-leaflet-directive  2015-11-06
 *  It uses L.UxMap instead L.Map.
 *  Pending correct resize events and ...
 */


angular.
module('uxleaflet-directive', []).
directive('uxleaflet', ['$q', 'leafletData', 'leafletMapDefaults', 'leafletHelpers', 'leafletMapEvents', uxLeafletDirective]);

function uxLeafletDirective($q, leafletData, leafletMapDefaults, leafletHelpers, leafletMapEvents) {

    var _MAP_CLASS = L.UxMap || L.Map;

    return {
        restrict: 'EA',
        replace: true,
        scope: {
            center: '=',
            lfCenter: '=',
            defaults: '=',
            maxbounds: '=',
            bounds: '=',
            markers: '=',
            legend: '=',
            geojson: '=',
            paths: '=',
            tiles: '=',
            layers: '=',
            controls: '=',
            decorations: '=',
            eventBroadcast: '=',
            markersWatchOptions: '=',
            geojsonWatchOptions: '=',
        },
        transclude: true,
        template: '<div class=\'angular-leaflet-map\'><div ng-transclude></div></div>',
        controller: ['$scope', function($scope) {
            this._leafletMap = $q.defer();
            this.getMap = function() {
                return this._leafletMap.promise;
            };

            this.getLeafletScope = function() {
                return $scope;
            };
        }],

        link: function(scope, element, attrs, ctrl) {
            var isDefined = leafletHelpers.isDefined;
            var defaults = leafletMapDefaults.setDefaults(scope.defaults, attrs.id);
            var mapEvents = leafletMapEvents.getAvailableMapEvents();
            var addEvents = leafletMapEvents.addEvents;

            var map; // create after check attributes

            scope.mapId = attrs.id;
            leafletData.setDirectiveControls({}, attrs.id);

            // Set width and height utility functions
            function updateWidth() {
                if (isNaN(attrs.width)) {
                    element.css('width', attrs.width);
                } else {
                    element.css('width', attrs.width + 'px');
                }
            }

            function updateHeight() {
                if (isNaN(attrs.height)) {
                    element.css('height', attrs.height);
                } else {
                    element.css('height', attrs.height + 'px');
                }
            }

            // If the width attribute defined update css
            // Then watch if bound property changes and update css
            if (isDefined(attrs.width)) {
                updateWidth();

                scope.$watch(
                    function() {
                        return element[0].getAttribute('width');
                    },

                    function() {
                        updateWidth();
                        map.invalidateSize();
                    });
            }

            // If the height attribute defined update css
            // Then watch if bound property changes and update css
            if (isDefined(attrs.height)) {
                updateHeight();

                scope.$watch(
                    function() {
                        return element[0].getAttribute('height');
                    },

                    function() {
                        updateHeight();
                        map.invalidateSize();
                    });
            }

            // Create the Leaflet Map Object with the options
            var opts = leafletMapDefaults.getMapCreationDefaults(attrs.id);
            map = new _MAP_CLASS(element[0], opts);
            ctrl._leafletMap.resolve(map);

            if (!isDefined(attrs.center) && !isDefined(attrs.lfCenter)) {
                map.setView([defaults.center.lat, defaults.center.lng], defaults.center.zoom);
            }

            // If no layers nor tiles defined, set the default tileLayer
            if (!isDefined(attrs.tiles) && (!isDefined(attrs.layers))) {
                var tileLayerObj = L.tileLayer(defaults.tileLayer, defaults.tileLayerOptions);
                tileLayerObj.addTo(map);
                leafletData.setTiles(tileLayerObj, attrs.id);
            }

            // Set zoom control configuration
            if (isDefined(map.zoomControl) &&
                isDefined(defaults.zoomControlPosition)) {
                map.zoomControl.setPosition(defaults.zoomControlPosition);
            }

            if (isDefined(map.zoomControl) && defaults.zoomControl === false) {
                map.zoomControl.removeFrom(map);
            }

            if (isDefined(map.zoomsliderControl) &&
                isDefined(defaults.zoomsliderControl) &&
                defaults.zoomsliderControl === false) {
                map.zoomsliderControl.removeFrom(map);
            }

            // if no event-broadcast attribute, all events are broadcasted
            if (!isDefined(attrs.eventBroadcast)) {
                var logic = 'broadcast';
                addEvents(map, mapEvents, 'eventName', scope, logic);
            }

            // Resolve the map object to the promises
            map.whenReady(function() {
                leafletData.setMap(map, attrs.id);
            });

            scope.$on('$destroy', function() {
                leafletMapDefaults.reset();
                map.remove();
                leafletData.unresolveMap(attrs.id);
            });

            //Handle request to invalidate the map size
            //Up scope using $scope.$emit('invalidateSize')
            //Down scope using $scope.$broadcast('invalidateSize')
            scope.$on('invalidateSize', function() {
                map.invalidateSize();
            });
        },
    };
}


//angular.module('leaflet-directive')
angular.module('ui-leaflet')

/**
 * Directiva angular: 'decopaths'
 * Prueba/comparación de funcionamiento de los decorations y los paths.
 * Requiere L.PolylineDecorator
 */
.directive('decopaths', ['$log', 'leafletHelpers', function($log, leafletHelpers) {

    return {
        restrict: 'A',
        scope: false,
        replace: false,
        require: 'leaflet',

        link: function(scope, element, attrs, controller) {
            var leafletScope = controller.getLeafletScope();
            var PolylineDecoratorPlugin = leafletHelpers.PolylineDecoratorPlugin;
            var isDefined = leafletHelpers.isDefined;
            var leafletDecorations = {};

            /* Creates an 'empty' decoration with a set of coordinates, but no pattern. */
            function createDecoration(options) {
                if (isDefined(options) && isDefined(options.coordinates)) {
                    if (!PolylineDecoratorPlugin.isLoaded()) {
                        $log.error('[AngularJS - Leaflet] The PolylineDecorator Plugin is not loaded.');
                    }
                }

                return L.polylineDecorator(options.coordinates);
            }

            /* Updates the path and the patterns for the provided decoration, and returns the decoration. */
            function setDecorationOptions(decoration, options) {
                if (isDefined(decoration) && isDefined(options)) {
                    if (isDefined(options.coordinates) && isDefined(options.patterns)) {
                        decoration.setPaths(options.coordinates);
                        decoration.setPatterns(options.patterns);
                        return decoration;
                    }
                }
            }

            controller.getMap().then(function(map) {
                leafletScope.$watch('decopaths', function(newDecorations) {

                    // no funciona. De momento se usará mapTraker.service.js
                    console.debug('Pendiente implementar aquí: decopaths');

                    for (var name in leafletDecorations) {
                        if (!isDefined(newDecorations[name]) || !angular.equals(newDecorations[name], leafletDecorations)) {
                            map.removeLayer(leafletDecorations[name]);
                            delete leafletDecorations[name];
                        }
                    }

                    for (var newName in newDecorations) {
                        var decorationData = newDecorations[newName];
                        var newDecoration = createDecoration(decorationData);

                        if (isDefined(newDecoration)) {
                            leafletDecorations[newName] = newDecoration;
                            map.addLayer(newDecoration);
                            setDecorationOptions(newDecoration, decorationData);
                        }
                    }
                }, true);
            });
        },
    };
}]);

angular.module('opengate-angular-js')

.directive('windowTimeSelect', function() { // ['$scope', '$compile'], function($scope, $compile) {
    return {
        restrict: 'AE',
        templateUrl: 'window-time-select/views/window-time.select.view.html',
        scope: {
            event: '@',
            rawdate: '@'
        },
        controller: ["$scope", "$element", "$attrs", "$translate", function($scope, $element, $attrs, $translate) {
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

            $scope.oneDayClass = $scope.oneWeekClass = $scope.oneMonthClass = $scope.customClass = 'btn-info';
            $scope.filterApplied = false;
            $scope.format = 'dd MMMM yyyy HH:mm';
            $scope.clear = function() {

                $scope.oneDayClass = $scope.oneWeekClass = $scope.oneMonthClass = $scope.customClass = 'btn-info';
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
            $scope.oneDay = function(no_fire_event) {
                $scope.oneDayClass = 'btn-success';
                $scope.oneWeekClass = $scope.oneMonthClass = $scope.customClass = 'btn-info';
                $scope.apply(genWindowTime('days'), !no_fire_event);
            };
            $scope.oneWeek = function(no_fire_event) {
                $scope.oneWeekClass = 'btn-success';
                $scope.oneDayClass = $scope.oneMonthClass = $scope.customClass = 'btn-info';
                $scope.apply(genWindowTime('weeks'), !no_fire_event);
            };
            $scope.oneMonth = function(no_fire_event) {
                $scope.oneMonthClass = 'btn-success';
                $scope.oneWeekClass = $scope.oneDayClass = $scope.customClass = 'btn-info';
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
                    $scope.oneWeekClass = $scope.oneDayClass = $scope.oneMonthClass = 'btn-info';
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
        }],
        link: function(scope) {
            scope.$on('$destroy', function() {
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
        controller: ["$scope", "$element", "$attrs", "$translate", "uibDateParser", function($scope, $element, $attrs, $translate, uibDateParser) {
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


        }],
        link: function(scope) {
            scope.$on('$destroy', function() {
                //console.log("destroy");
                scope.calendarOpen = false;
            });
        }
    };
});


// Use Applicaion configuration module to register a new module
//ApplicationConfiguration.registerModule('uxleaflet', ['opengate-angular-js']);
/*
 * [uxleaflet/client]
 * Leaflet Search Control 1.1.0
 * https://github.com/stefanocudini/leaflet-search
 * https://bitbucket.org/zakis_/leaflet-search
 * http://easyblog.it/maps/leaflet-search
 *
 * Copyright 2012, Stefano Cudini - stefano.cudini@gmail.com
 * Licensed under the MIT license.
 */
(function() {

    

    // En pruebas.
    // podría pasar a ser un componente bower
    // Se usa en 'buscador de entities' (mejorable) y en 'geo-search' usando un proveedor de búsqueda genérico
    // (se empezará implementado para nominatim de openstreetmap)

    L.Control.Search = L.Control.extend({
        includes: L.Mixin.Events,

        options: {
            searchCall: null, //callback that fill _recordsCache with key,value table
            searchJsonpUrl: '', //url for search by jsonp service, ex: 'search.php?q={s}&callback={c}'
            searchJsonpFilter: null, //callback for filtering data to _recordsCache
            //TODO add options: searchJsonpKey and searchJsonpLoc for remapping fields from jsonp
            searchLayer: null, //layer where search elements
            searchLayerProp: 'title', //property in marker.options trough filter elements in layer searchLayer
            searchInitial: true, //search text in _recordsCache by initial
            searchMinLen: 1, //minimal text length for autocomplete
            searchDelay: 300, //delay for searching after digit
            //TODO searchLimit: 100,	//limit max results show in tooltip
            timeAutoclose: 1200, //delay for autoclosing alert and collapse after blur
            autoPan: true, //auto panTo when click on tooltip
            autoResize: true, //autoresize on input change
            animatePan: true, //animation after panTo
            zoom: null, //zoom after pan to location found, default: map.getZoom()
            position: 'topright',
            placeholder: 'Seach feature by id...', //placeholder value
            textErr: 'Location not found' //error message
        },

        initialize: function(options) {
            L.Util.setOptions(this, options);
            this._inputMinSize = this.options.placeholder.length;
            this.options.searchLayer = this.options.searchLayer || new L.LayerGroup();
            this.options.searchJsonpFilter = this.options.searchJsonpFilter || this._jsonpDefaultFilter;
            this.timeDelaySearch = this.options.searchDelay;
            this._recordsCache = {}; //key,value table! that store locations! format: key,latlng
        },

        onAdd: function(map) {
            this._map = map;
            this._circleLoc = (new L.CircleMarker([0, 0], { radius: 0, weight: 3, color: '#0000', fill: false })).addTo(this._map);
            this._container = L.DomUtil.create('div', 'leaflet-control-search leaflet-bar');
            this._alert = this._createAlert('search-alert');
            this._input = this._createInput(this.options.placeholder, 'search-input');
            this._createButton(this.options.placeholder, 'search-button');
            this._tooltip = this._createTooltip('search-tooltip');
            //var that = this; map.on('mousedown',function(e) { that._animateLocation(e.latlng); });
            //uncomment for fast test of _animateLocation()
            //TODO bind _recordsFromLayer to map events layeradd layerd remove update ecc
            return this._container;
        },

        onRemove: function(map) {
            this._recordsCache = {}; //free memory!...?
        },

        showAlert: function(text) {
            this._setVisibleElem(this._alert, true, 100);
            this._alert.innerHTML = text;
            var that = this;
            clearTimeout(this.timerAlert);
            var timeout = 2000;
            this.timerAlert = setTimeout(function() {
                that._setVisibleElem(that._alert, false, 200);
            }, timeout);
        },

        _setVisibleElem: function(elem, isVisible, animMillis) {
            // TODO - mejor probar con ccs3 directamente
            var method = isVisible ? 'show' : 'hide';
            if ($ && $.fn && $.fn.show && $.fn.hide) {
                $(elem)[method](500);
            } else {
                this._alert.style.display = isVisible ? 'inherit' : 'none';
            }
        },

        _setCircleVisible: function(b, optLatLon, optRadius) {
            // TODO - ver cómo hacer para agregar/quitar capa en versiones leaflet.
            var geom = this._circleLoc;
            if (b) {
                if (optLatLon) geom.setLatLng(optLatLon);
                if (optRadius !== undefined) geom.setRadius(optRadius);
                geom.setStyle({ color: '#ac60' });
            } else {
                geom.setLatLng([0, 0]);
                geom.setStyle({ color: '#0000' });
            }
        },

        expand: function() {
            this._input.style.display = 'block';
            L.DomUtil.addClass(this._container, 'exp');
            this._input.focus();
        },

        collapse: function() {
            this._hideTooltip();
            this._input.value = '';
            this._input.size = this._inputMinSize;
            this._alert.style.display = 'none';
            this._input.style.display = 'none';
            L.DomUtil.removeClass(this._container, 'exp');
            this._setCircleVisible(false);
        },

        autoCollapse: function() { //collapse after delay, used on_input blur
            var that = this;
            var timeout = isNaN(this.options.timeAutoclose) ? 0 : +this.options.timeAutoclose;
            if (timeout) {
                this.timerCollapse = setTimeout(function() {
                    that.collapse();
                }, this.timeout);
            }
        },

        autoCollapseStop: function() {
            clearTimeout(this.timerCollapse);
        },

        _clickFocus: function(e) {
            e.target.focus();
        },

        _createAlert: function(className) {
            var alert = L.DomUtil.create('div', className, this._container);
            alert.style.display = 'none';
            return alert;
        },

        _createInput: function(text, className) {
            var input = L.DomUtil.create('input', className, this._container);
            input.type = 'text';
            input.size = this._inputMinSize;
            input.value = '';
            input.placeholder = text;
            input.style.display = 'none';

            L.DomEvent
                .disableClickPropagation(input)
                .addListener(input, 'keyup', this._handleKeypress, this)
                .addListener(input, 'keyup', this._handleAutoresize, this)
                .addListener(input, 'blur', this.autoCollapse, this)
                .addListener(input, 'focus', this.autoCollapseStop, this);

            return input;
        },

        _createButton: function(text, className) {
            var button = L.DomUtil.create('a', className, this._container);
            button.href = '#';
            button.title = text;

            L.DomEvent
                .disableClickPropagation(button)
                .addListener(button, 'focus', this.autoCollapseStop, this)
                .addListener(button, 'blur', this.autoCollapse, this)
                .addListener(button, 'click', this._handleSubmit, this);

            return button;
        },

        _createTooltip: function(className) {
            var tool = L.DomUtil.create('div', className, this._container);
            tool.style.display = 'none';
            var _this = this;

            L.DomEvent
                .disableClickPropagation(tool)
                .addListener(tool, 'blur', this.autoCollapse, this)
                .addListener(tool, 'mousewheel', function(e) {
                    _this.autoCollapseStop();
                    L.DomEvent.stopPropagation(e);
                }, this)
                .addListener(tool, 'mousedown', function(e) {
                    L.DomEvent.stop(e);
                    _this.autoCollapseStop();
                }, this);
            //not work!	:-( try mouseover   (FIXED: faltaban los paréntesis de los mçetodos)
            return tool;
        },

        _createTip: function(text) { //build new choice for tooltip menu
            var tip = L.DomUtil.create('a', 'search-tip');
            tip.href = '#';
            tip.innerHTML = text;

            L.DomEvent
                //.disableClickPropagation(tip) // deja de funcionar en 3/3/20017 (?)
                .addListener(tip, 'click', function(e) { // alternativas 'click' 'mousedown'
                    this._input.value = text;
                    this._input.focus();
                    this._hideTooltip();
                    this._handleAutoresize();
                    if (this.options.autoPan) {
                        this._handleSubmit();
                    }
                }, this);

            return tip;
        },
        //////end DOM creations

        _showTooltip: function() { //show tooltip with filtered this._recordsCache values

            if (this._input.value.length < this.options.searchMinLen)
                return this._hideTooltip();

            var regFilter = new RegExp('^[.]$|[|]', 'g'), //remove . and | 
                text = this._input.value.replace(regFilter, ''), //sanitize text
                I = this.options.searchInitial ? '^' : '', //search for initial text
                regSearch = new RegExp(I + text, 'i'), //for search in _recordsCache
                ntip = 0;

            this._tooltip.innerHTML = '';

            for (var key in this._recordsCache) {
                if (regSearch.test(key)) //search in records
                {
                    this._tooltip.appendChild(this._createTip(key));
                    ntip++;
                }
            }
            if (ntip > 0)
                this._tooltip.style.display = 'block';
            else
                this._hideTooltip();

            return ntip;
        },

        _hideTooltip: function() {
            this._tooltip.style.display = 'none';
            this._tooltip.innerHTML = '';
        },

        _jsonpDefaultFilter: function(jsonraw) { //default callback for filter data from jsonp to _recordsCache format(key,latlng)
            var jsonret = {};
            for (var i in jsonraw)
                jsonret[jsonraw[i].title] = L.latLng(jsonraw[i].loc);
            //TODO replace .title and .loc with options: searchJsonpKey and searchJsonpLoc
            //TODO use: throw new Error('my message');on error
            return jsonret;
        },

        _recordsFromJsonp: function(inputText, callAfter, that) {

            L.Control.Search.callJsonp = function (data) { //jsonp callback
                var fdata = that.options.searchJsonpFilter(data);
                callAfter(fdata);
            };
            var scriptNode = L.DomUtil.create('script', '', document.getElementsByTagName('body')[0]);
            var url = L.Util.template(that.options.searchJsonpUrl, { s: inputText, c: 'L.Control.Search.callJsonp' });
            //parsing url
            //rnd = '&_='+Math.floor(Math.random()*10000);//TODO add rnd param or randomize callback name!

            scriptNode.type = 'text/javascript';
            scriptNode.src = url;
            return callAfter;
        },

        _recordsFromLayer: function() { //return table: key,value from layer
            var retRecords = {},
                layerSearch = this.options.searchLayer,
                propSearch = this.options.searchLayerProp;

            layerSearch.eachLayer(function(marker) {
                //TODO filter by element type: marker|polyline|circle...
                var key = marker.options.hasOwnProperty(propSearch) && marker.options[propSearch] || '';
                //TODO check if propSearch is a string! else use: throw new Error('my message');
                if (key)
                    retRecords[key] = marker.getLatLng();
            }, this);
            //TODO caching retRecords while layerSearch not change, controlling on 'load' event
            return retRecords;
        },

        _handleKeypress: function(e) { //run _input keyup event
            switch (e.keyCode) {
                case 27: //Esc
                    this.collapse();
                    break;
                case 13: //Enter
                    this._handleSubmit(); //do search
                    break;
                case 37: //Left
                case 39: //Right
                case 16: //Shift
                case 17: //Ctrl
                    //case 32://Space
                    break;
                    //TODO scroll tips, with shortcuts 38(up),40(down)
                default: //All keys

                    clearTimeout(this.timerKeypress); //cancel last search request

                    if (this._input.value.length < this.options.searchMinLen)
                        return this._hideTooltip();

                    var that = this;
                    //TODO move anonymous function in setTimeout in new function source selector
                    this.timerKeypress = setTimeout(function() {
                        that._timerKeypressElapsed();
                    }, that.timeDelaySearch);
            }
        },

        _timerKeypressElapsed: function() {
            var that = this;
            var inputText = that._input.value;
            if (that.options.searchCall) //PERSONAL SEARCH CALLBACK(USUALLY FOR AJAX SEARCHING)
            {
                //						L.DomUtil.addClass(that._input, 'load');
                that._recordsCache = that.options.searchCall.apply(that, [inputText]);
                that._showTooltip();
                //						L.DomUtil.removeClass(that._input, 'load');
            } else if (that.options.searchJsonpUrl) //JSONP SERVICE REQUESTING
            {
                that._recordsFromJsonp(inputText, function(data) { //callback run after data return
                    that._recordsCache = data;
                    that._showTooltip();
                }, that);
            } else if (that.options.searchLayer) //SEARCH ELEMENTS IN PRELOADED LAYER
            {
                //TODO update _recordsCache only one
                that._recordsCache = that._recordsFromLayer(); //fill table key,value from markers into searchLayer				
                that._showTooltip(); //show tooltip with filter records by this._input.value			
            }
        },

        _handleAutoresize: function() { //autoresize this._input
            if (this.options.autoResize)
                this._input.size = this._input.value.length < this._inputMinSize ? this._inputMinSize : this._input.value.length;
        },

        _handleSubmit: function(e) { //search button action, and enter key shortcut

            if (this._input.style.display === 'none') //on first click show _input only
                this.expand();
            else {
                if (this._input.value === '') //hide _input only
                    this.collapse();
                else {
                    if (this._findLocation(this._input.value) === false) {
                        this.showAlert(this.options.textErr); //location not found, alert!
                    } else {
                        if ((+this.options.timeAutoclose > 0) === false) {
                            this.collapse();
                        }
                    }
                }
            }
            this._input.focus(); //block autoCollapse after _button blur
        },

        _animateLocation: function(latlng) {

            this._setCircleVisible(true, latlng, 50);
            console.info('animated to: ' + latlng);

            var circle = this._circleLoc;
            var tt = 200,
                ss = 10,
                mr = parseInt(circle._radius / ss),
                f = 0;
            var that = this;
            this.timerAnimLoc = setInterval(function() { //animation
                f += 0.5;
                mr += f; //adding acceleration
                var nr = circle._radius - mr;
                if (nr > 0.5)
                    circle.setRadius(nr);
                else
                    clearInterval(that.timerAnimLoc);
            }, tt);
        },

        _findLocation: function(text) { //get location from table _recordsCache and pan to map! ...game over!
            if (this._recordsCache === null) {
                console.warn('Callback for findLocation not set in L.Search plugin');
                return false;
            }
            if (this._recordsCache.hasOwnProperty(text)) {
                var newCenter = this._recordsCache[text]; //serach in table key,value

                if (this.options.zoom) {
                    this._map.setView(newCenter, this.options.zoom);
                } else {
                    this._map.setView(newCenter);
                }

                if (this.options.animatePan) {
                    this._animateLocation(newCenter); //evidence location found
                }
                //TODO start animation after setView panning end, maybe on moveend
                return newCenter;
            } else {
                this._setCircleVisible(false);
            }
            return false;
        }
    });

})();
/** 
 * [uxleaflet/client]
 * Parches para leaflet 0.7.7 
 * Funcionalidad de edición de geometrías.
 * Requerido por L.Editable
 * 
 * Pendiente de mover a mapUxService
 */
(function() {

    

    if (L.version !== '0.7.7') {
        // si ya no es necesario entonces eliminar este fichero.
        console.warn('Ux-leaflet-patch only is applicable to leaflet 0.7.7. No applied to leaflet ' + L.version);
        return;
    }

    /* L 1043 */
    L.DomUtil.getPosition = function (el) {
        // (*) this method is only used for elements previously positioned using setPosition,
        // so it's safe to cache the position for performance

        // jshint camelcase: false
        return el._leaflet_pos || new L.Point(0, 0);
    };

    /* L 1010 */
    var old_getTranslateString = L.DomUtil.getTranslateString;
    L.DomUtil.getTranslateString = function (point) {
        if (!point || point.x === undefined || point.y === undefined) {
            // old_getTranslateString would fails
            return '';
        } else {
            return old_getTranslateString(point);
        }
    };

    /* L 4656 */
    var _baseUpdateStyle = L.Path.prototype._updateStyle;

    L.Path.prototype._updateStyle = function () {
        // (*) 
        _baseUpdateStyle.apply(this, arguments);
        if (!this.options.fill) {
            this._path.setAttribute('fill-opacity', 0);
        }
    };

    /* L 6397 */
    // cambiar --> obj.addEventListener(type, handler, false);
    //  por -->  obj.addEventListener(type, handler, {passive: false} );


    /* L 6711 */
    var _baseOnMove = L.Draggable.prototype._onMove;

    L.Draggable.prototype._onMove = function (e) {
        // (*) 
        _baseOnMove.apply(this, arguments);
        this._lastEvent = e;
    };
        // TODO - arreglar lo de ... en ese mismo método. Solucionará lo del arrastre.
        //    this._startPos = L.DomUtil.getPosition(this._element).subtract(offset);

    console.info('Ux-leaflet-patch applied to leaflet ' + L.version);

})();
/*
 * [uxleaflet/client]
 * L.Control.OsmPlaceFinder: Usado como buscador de lugares predeterminado.
 */
(function() {

    

    // Exportación en L (leaflet)
    L.OsmGeocodingService = GeocodingService; // class
    // (usar esta nomenclatura para usar desde dentro de un 'servicio angular')
    L.Util.geocodingService = new GeocodingService(HTTP);

    /**
     * L.Control.OsmPlaceFinder 
     */
    L.Control.OsmPlaceFinder = L.Control.extend({
        includes: L.Mixin.Events,

        options: {
            searchLayerProp: 'title', //property in marker.options trough filter elements in layer searchLayer
            searchInitial: true, //search text in _recordsCache by initial
            searchMinLen: 5, //minimal text length for autocomplete
            searchDelay: 300, //delay for searching after digit
            //TODO searchLimit: 100,	//limit max results show in tooltip
            timeAutoclose: 1200, //delay for autoclosing alert and collapse after blur
            autoPan: true, //auto panTo when click on tooltip
            autoResize: true, //autoresize on input change
            animatePan: true, //animation after panTo
            zoom: null, //zoom after pan to location found, default: map.getZoom()
            position: 'topleft',
            prepend: true,
            placeholder: 'Search place ..', //placeholder value
            textErr: 'Place not found', //error message
            autocompleteEnabled: true, //false // no permitido en 'nominatim público'  (Unacceptable Use)
            hightlightTarget: true
        },

        initialize: function(options) {
            L.Control.prototype.initialize.apply(this, arguments);
            L.Util.setOptions(this, options);
            this._inputMinSize = this.options.placeholder.length;
            this.options.searchLayer = this.options.searchLayer || new L.LayerGroup();
            this.options.searchJsonpFilter = this.options.searchJsonpFilter || this._jsonpDefaultFilter;
            this.timeDelaySearch = this.options.searchDelay;
            this._recordsCache = {};
        },

        addTo: function(map) {
            this._map = map;
            // copiede from L.Control (0.7.7)
            var container = this._container = this.onAdd(map);
            var pos = this.getPosition();
            var corner = map._controlCorners[pos];

            L.DomUtil.addClass(container, 'leaflet-control');

            if (this.options.prepend) {
                corner.insertBefore(container, corner.firstChild);
            } else {
                corner.appendChild(container);
            }

            return this;
        },

        onAdd: function(map) {
            this._map = map;
            var css_id = 'leaflet-control-osmplacefinder';
            this._container = L.DomUtil.create('div', css_id + ' leaflet-bar');
            this._alert = this._createAlert('search-alert');
            this._input = this._createInput(this.options.placeholder, 'search-input');
            this._createButton(this.options.placeholder, 'search-button');
            this._tooltip = this._createTooltip('search-tooltip');
            return this._container;
        },

        onRemove: function(map) {
            this._recordsCache = [];
        },

        showAlert: function(text) {
            this._setVisibleElem(this._alert, true, 100);
            this._alert.innerHTML = text;
            var that = this;
            clearTimeout(this.timerAlert);
            var timeout = 2000;
            this.timerAlert = setTimeout(function() {
                that._setVisibleElem(that._alert, false, 200);
            }, timeout);
        },

        _setVisibleElem: function(elem, isVisible, animMillis) {
            // TODO - mejor probar con ccs3 directamente
            var method = isVisible ? 'show' : 'hide';
            if ($ && $.fn && $.fn.show && $.fn.hide) {
                $(elem)[method](500);
            } else {
                this._alert.style.display = isVisible ? 'inherit' : 'none';
            }
        },

        expand: function() {
            this._input.style.display = 'block';
            L.DomUtil.addClass(this._container, 'exp');
            this._input.focus();
            if (this._input.value !== '') {
                // handle  previous text
                this._refreshPlaces();
            }
        },

        collapse: function() {
            if (localStorage.getItem('CSS')) {
                // localStorage.setItem('CSS', '1')
                console.error('  comentado código para colapsar');
                return;
            }
            this._hideTooltip();
            this._input.size = this._inputMinSize;
            this._alert.style.display = 'none';
            this._input.style.display = 'none';
            L.DomUtil.removeClass(this._container, 'exp');
        },

        autoCollapse: function() { //collapse after delay, used on_input blur
            var that = this;
            var timeout = isNaN(this.options.timeAutoclose) ? 0 : +this.options.timeAutoclose;
            if (timeout) {
                this.timerCollapse = setTimeout(function() {
                    that.collapse();
                }, this.timeout);
            }
        },

        autoCollapseStop: function() {
            clearTimeout(this.timerCollapse);
        },

        _clickFocus: function(e) {
            e.target.focus();
        },

        _createAlert: function(className) {
            var alert = L.DomUtil.create('div', className, this._container);
            alert.style.display = 'none';
            return alert;
        },

        _createInput: function(text, className) {
            var input = L.DomUtil.create('input', className, this._container);
            input.type = 'text';
            input.size = this._inputMinSize;
            input.value = '';
            input.placeholder = text;
            input.style.display = 'none';

            L.DomEvent
                .disableClickPropagation(input)
                .addListener(input, 'keyup', this._handleKeypress, this)
                .addListener(input, 'keyup', this._handleAutoresize, this)
                .addListener(input, 'blur', this.autoCollapse, this)
                .addListener(input, 'focus', this.autoCollapseStop, this);

            return input;
        },

        _createButton: function(text, className) {
            var button = L.DomUtil.create('a', className, this._container);
            button.href = '#';
            button.title = text;

            L.DomEvent
                .disableClickPropagation(button)
                .addListener(button, 'focus', this.autoCollapseStop, this)
                .addListener(button, 'blur', this.autoCollapse, this)
                .addListener(button, 'click', this._handleSubmit, this);

            return button;
        },

        _createTooltip: function(className) {
            var tool = L.DomUtil.create('div', className, this._container);
            tool.style.display = 'none';
            var _this = this;

            L.DomEvent
                .disableClickPropagation(tool)
                .addListener(tool, 'blur', this.autoCollapse, this)
                .addListener(tool, 'mousewheel', function(e) {
                    _this.autoCollapseStop();
                    L.DomEvent.stopPropagation(e);
                }, this)
                .addListener(tool, 'mousedown', function(e) {
                    L.DomEvent.stop(e);
                    _this.autoCollapseStop();
                }, this);
            return tool;
        },

        _createTip: function(item) { //build new choice for tooltip menu
            var tip = L.DomUtil.create('a', 'search-tip');
            tip.href = '#';
            tip.innerHTML = item.display_name;
            tip.setAttribute('data-tip', item);

            L.DomEvent.addListener(tip, 'click', function(e) { // alternativas 'click' 'mousedown'
                // no cambia _input pero adquiere el foco
                this._input.focus();
                this._hideTooltip();
                this._handleAutoresize();
                if (this.options.autoPan) {
                    this._handleSubmit(item);
                }
            }, this);

            return tip;
        },

        _createCopyright: function() { //build new choice for tooltip menu
            var p = L.DomUtil.create('p', 'osm-copyright');
            p.innerHTML = 'powered by ';
            var a = L.DomUtil.create('a');
            a.href = 'http://wiki.openstreetmap.org/wiki/Nominatim';
            a.innerHTML = 'Nominatim';
            a.target = '_blank';
            p.appendChild(a);
            return p;
        },
        //////end DOM creations

        _showTooltip: function() {
            // all _recordsCache items are shown
            this._tooltip.innerHTML = '';
            var data = this._recordsCache;
            var n = 0;
            // fill tip items
            for (; n < data.length; n += 1) {
                var item = data[n];
                this._tooltip.appendChild(this._createTip(item));
            }
            if (+data.length === 0) {
                var msg = L.DomUtil.create('p', 'err-text', this._tooltip);
                msg.innerText = this.options.textErr;
            }
            this._tooltip.appendChild(this._createCopyright());
            this._tooltip.style.display = 'block';
        },

        _hideTooltip: function() {
            this._tooltip.style.display = 'none';
            this._tooltip.innerHTML = '';
        },

        _handleKeypress: function(e) { //run _input keyup event
            switch (e.keyCode) {
                case 27: //Esc
                    if (this._input.value === '') {
                        this.collapse();
                    } else {
                        this._input.value = '';
                    }
                    break;
                case 13: //Enter
                    if (this.options.autocompleteEnabled === false) {
                        this._refreshPlaces();
                    } else {
                        this._handleSubmit(0); //do search
                    }
                    break;
                case 37: //Left
                case 39: //Right
                    var inputText = this._input.value;
                    if (this._input.selectionStart >= inputText.length) {
                        this._refreshPlaces(inputText);
                    }
                    break;
                case 16: //Shift
                case 17: //Ctrl
                    //case 32://Space
                    break;
                    //TODO scroll tips, with shortcuts 38(up),40(down)
                default: //All keys
                    if (this.options.autocompleteEnabled === false) {
                        // no usar autocomplete con nominatim
                        return;
                    }
                    clearTimeout(this.timerKeypress); //cancel last search request
                    if (this._input.value.length < this.options.searchMinLen) {
                        return this._hideTooltip();
                    }
                    var that = this;
                    this.timerKeypress = setTimeout(function() {
                        that._refreshPlaces();
                    }, that.timeDelaySearch);
            }
        },

        _refreshPlaces: function(sText) {
            var that = this;
            if (this._isRefreshing) {
                return;
            }
            this._isRefreshing = true;

            if (sText === undefined) {
                sText = this._input.value;
            }

            var _service = L.Util.geocodingService;
            var options = { limit: 5 };

            _service.search(sText, options, function(err, arrData) {
                if (err !== null) {
                    console.warn('Error search in nominatim ' + sText + ']', err);
                    that._recordsCache = [];
                } else {
                    // display_name, lat, lon, boundingbox
                    that._recordsCache = arrData;
                    var count = arrData || arrData.length;
                    console.info('' + new Date() + ' nominatim - getPlaces: ok: ' + count, arrData);
                }
                that._isRefreshing = false;
                that._showTooltip();
            });

        },

        _handleAutoresize: function() { //autoresize this._input
            if (this.options.autoResize)
                this._input.size = this._input.value.length < this._inputMinSize ? this._inputMinSize : this._input.value.length;
        },

        _handleSubmit: function(item) { //search button action, and enter key shortcut

            if (this._input.style.display === 'none') //on first click show _input only
                this.expand();
            else {
                item = item || this._recordsCache[0];
                if (!item) //hide _input only
                    this.collapse();
                else {
                    if (this._findLocation(item) === false) {
                        this.showAlert(this.options.textErr); //location not found, alert!
                    } else {
                        if ((+this.options.timeAutoclose > 0) === false) {
                            this.collapse();
                        }
                        if (this.options.hightlightTarget) {
                            this.highlightResult(item);
                        }
                    }
                }
            }
            this._input.focus(); //block autoCollapse after _button blur
        },

        _findLocation: function(item) {
            // response of nominatim: lat, lon, display_name, boundingbox
            try {
                var newCenter = new L.latLng(item.lat, item.lon); //serach in table key,value
                var ps = item.boundingbox;
                var bb = new L.LatLngBounds([
                    [ps[0], ps[2]],
                    [ps[1], ps[3]]
                ]);
                this._map.fitBounds(bb);
                return newCenter;
            } catch (err) {
                return false;
            }
        },

        highlightResult: function(result) {
            if (!result) { return; }
            var resultLayerGroup = new L.LayerGroup(); // temporal layer
            resultLayerGroup.addTo(this._map);

            if (result.lat) {
                var circle = L.circleMarker([result.lat, result.lon], {
                    radius: 10,
                    weight: 2,
                    fillColor: '#ff7800',
                    color: 'blue',
                    opacity: 0.75
                });
                var thatMap = this._map;
                circle.on('click', function() {
                    thatMap.removeLayer(resultLayerGroup);
                });
                resultLayerGroup.addLayer(circle);
            }
            if (result.aBoundingBox) {
                var bounds = [
                    [result.aBoundingBox[0] * 1, result.aBoundingBox[2] * 1],
                    [result.aBoundingBox[1] * 1, result.aBoundingBox[3] * 1]
                ];
                this._map.fitBounds(bounds);
                if (result.asgeojson && result.asgeojson.match(/(Polygon)|(Line)/)) {
                    var gj = JSON.parse(result.asgeojson);
                    var geojson_layer = L.geoJson(gj, {
                        style: function(feature) {
                            return { interactive: false, color: 'blue' };
                        }
                    });
                    resultLayerGroup.addLayer(geojson_layer);
                } else {
                    // var layer = L.rectangle(bounds, {color: '#ff7800', weight: 1} );
                    // layerGroup.addLayer(layer);
                }
            }
        }

    }); // L.Control.OsmSearch Class


    /**
     * GeocodingService
     * @param {http object} with Promise implementation, Usage http({}).then()
     * @param {options JSON}  baseAddress { 'https://...' }, houseNumberSwap { true, false, func() }
     */
    function GeocodingService($http, options) {
        var _this = this;

        var _baseAddress = 'https://nominatim.openstreetmap.org';
        var _houseNumberSwap = false;
        if (options) {
            _baseAddress = options.baseAddress || _baseAddress;
            _houseNumberSwap = options.houseNumberSwap || _houseNumberSwap;
        }

        /* Esto puede usarse para configurar el tipo de respuesta en reverse-geocoding */
        var FULL_RESPONSE_TEMPLATE = {
            'house_number': { 'Num casa': true },
            'road': { 'Calle': true },
            'suburb': { 'Suburb': false },
            'city': { 'Ciudad': true },
            'county': { 'Provincia': true },
            'state_district': { 'Suburb': false },
            'state': { 'Estado': false },
            'postcode': { 'CP': false },
            'country': { 'País': true },
            'country_code': { 'cc': false }
        };

        /** Utilidad para obtener información geopolítica a partir de una lat/lon y un nivel de zoom
         * @param {number} lat 
         * @param {number} lon 
         * @param {zoom} level of detail (1 to 18)
         * @param {function} callback  (err, data)
         * @return {object} place_id, lat, lon, display_name, address (country_code, country, postcode, state, etc), boundingBox
         */
        _this.reverseSearch = reverseSearch;
        _this.search = search;
        _this.lookupGeometry = lookupGeometry;

        //
        // internal functions
        //

        /**
         * Return information given a description of a feature.
         * @param {String} sDescription 
         * @param {*} callback 
         * @return {json array} a json like () [{'place_id':'179320264','osm_type':'relation','osm_id':'5326784',
         *  'boundingbox':['40.3119774','40.6437293','-3.8889539','-3.5179163'],
         *   'lat':'40.4167047','lon':'-3.7035825',
         *   'display_name':'Madrid, Área metropolitana de Madrid y Corredor del Henares, Comunidad de Madrid, España',
         *   'class':'place','type':'city','importance':0.29353044801777,
         *   'icon':'http:\/\/nominatim.openstreetmap.org\/images\/mapicons\/poi_place_city.p.20.png',
         *   'address':{'city':'Madrid','county':'Área metropolitana de Madrid y Corredor del Henares',
         *       'state':'Comunidad de Madrid','country':'España','country_code':'es'}}]
         */
        function search(sDescription, options, callback) {
            var searchUrl = _baseAddress + '/search';
            var escapedText = escapeTextForUrl(sDescription);
            var limit = (!options && '2') || (options.limit || '3');
            var url = searchUrl + '/' + escapedText + '?format=json&limit=' + limit;
            if (options && options.extraParams) {
                url += '&' + options.extraParams;
            }
            console.info('URL nominatim search \n' + url);
            // async request
            asyncRequestJs(url, callback);
        }

        /**
         * https://nominatim.openstreetmap.org/reverse
         * @param {*} lat 
         * @param {*} lon 
         * @param {*} callback 
         * @param {*} optFormat. formato del json respuesta, por defecto se devuelve todo lo que responde el webservce
         * @param {*} language_code idioma del resultado
         * @return JSON object with data and metadata of this location
         */
        function reverseSearch(lat, lon, zoom, callback, optFormat, language_code) {
            var resp = $.extend({}, FULL_RESPONSE_TEMPLATE);

            var reverseSearchUrl = _baseAddress + '/reverse';
            var url = reverseSearchUrl + '?format=json&lat=' + lat + '&lon=' + lon +
                '&zoom=' + zoom + '&addressdetails=1&polygon_geojson=1' + (language_code ? '&accept-language=' + language_code : '');

            $http({
                method: 'GET',
                url: url
            }).then(function successCallback(response) {
                    var js;
                    try {
                        if (response.address) {
                            js = response;
                        } else if (response.status === 200) {
                            js = response.data;
                        } else {
                            return;
                        }
                    } catch (err) {
                        var sResp = '' + response;
                        callback(new Error('Invalid json: \n ', response));
                        return;
                    }
                    callback(null, js);
                },
                function errorCallback(response) {
                    callback(response);
                }
            );
        }

        /**
         * searchGeometry us used for search a Geometry of an object in OSM database given its id
         * @param {*} id 
         * @param {*} callback 
         * @return Geometry
         */
        function lookupGeometry(id, callback) {
            // pendiene de probar. Obtener una geometria.
            /*var searchUrl = _baseAddress + '/lookup';
            var url = searchUrl + '?polygon_geojson=1&osm_id=' + id;
            requestJs(sUrl, function(err, data) {
                if (err) {
                    console.warn('Not found OSM id: ' + id);
                    callback(err)
                } else {
                    // TODO - convertir data en geom

                    callback(null, geom);
                }
            });*/

            /* probar a que devuelva algo parecido a:
            https://nominatim.openstreetmap.org/search/lisboa%20?format=json&polygon_geojson=1&limit=2
            */
        }

        /**
         * asyncRequestJs use $http object passed as arguments.
         * @param {*} url 
         * @param {*} callback (err, data)
         * @return javascript object
         */
        function asyncRequestJs(url, callback) {
            $http({
                method: 'GET',
                url: url
            }).then(function successCallback(response) {
                    var js;
                    try {
                        if (typeof response !== 'string') {
                            js = response;
                        } else {
                            js = JSON.parse(response);
                        }
                    } catch (err) {
                        callback(new Error('Invalid json: \n ' + response.substring(0, 20)));
                        return;
                    }
                    callback(null, js);
                },
                function errorCallback(response) {
                    callback(response);
                }
            );
        }

        /**
         * Implementar si fuera necesario.
         * @param {*} sText text thath will be included in url 
         */
        function escapeTextForUrl(sText) {
            return sText;
        }


    } //  L.OsmGeoocodingService

    if (L.Map._isDemoEnabled) {
        console.info('OJO: Nominatim activado. Hacking L.Map._onclic');

        // Código de prueba. DECLARAMOS nuevo plugin de leaflet.
        // añadimos ref al GeocodingService en  L.Map.uxGeocodingService
        // Podría implementarse un nuevo plugin de leaflet a partir de este código.
        //  l-uxnominatim.js o l-nominatim.js (y añadir un control al mapa)

        L.Map.mergeOptions({
            uxNominatim: { zoomOffset: 2 }
        });

        var __super;

        L.Map.NominatimClickHandler = L.Handler.extend({
            initialize: function(map) {
                __super.initialize.apply(this, arguments);
                this._zoomOffset = map.options.uxNominatim.zoomOffset || 0;
            },
            addHooks: function() {
                var map = this._map;
                map.on('click', this._clicked, this);
                map.whenReady(this._mapReady, this);
            },

            removeHooks: function() {
                this._map.off('click', this._clicked, this);
            },

            _mapReady: function() {
                var mapId = this._map._container && this._map._container.id;
                console.info('GeocodingService. Mapa listo para  click->nominatim-balloon: MapId: [' + mapId +
                    ']. Clic con shift y ctrl presionados');
            },

            _clicked: function(evt) {
                var e = evt.originalEvent;
                if (e.altKey && e.ctrlKey) {
                    console.info('Prueba con nominatim en ', e);
                } else {
                    return;
                }
                var map = this._map;
                var loc = evt.latlng;
                var zoom = map.getZoom() + this._zoomOffset;

                // prepara balloon personalizado
                var balloon = L.popup({ className: 'ux-nomintim' });
                var popupContent = document.createElement('div');
                balloon.setContent(popupContent);
                balloon.setLatLng(loc);
                // internal configuration
                popupContent.classList.add('ux-nominatim');
                popupContent.classList.add('ux-waiting');
                var hueco = document.createElement('div');
                hueco.style.maxHeight = '150px';
                hueco.style.overflowY = 'scroll';
                hueco.style.padding = '.6em';
                hueco.style.backgroundColor = '#f0f0d0';
                popupContent.innerHTML = '<p>Obteniendo posición</p>';
                popupContent.appendChild(hueco);

                // UPGRADE - pasar objetos angular.
                var service = new GeocodingService(HTTP, {});
                // hacer consulta a nominatim
                var _this = this;
                service.reverseSearch(loc.lat, loc.lng, zoom, function(err, data) {
                    if (err !== null) {
                        hueco.innerText = err.message;
                    } else {
                        // OK.  Es un JSON con datos y metadatos.
                        // var s = _this._generateHtmlTable(data, 'display_name', false);
                        var s = _this._generateHtmlTable(data.address, null, false);
                        // UPGRADE - extraer los campos y crear una tabla html con los datos.

                        // address es un objeto con todos los detalles.
                        hueco.style.fontSize = '1.35em';
                        // ponemos el contenido
                        hueco.innerHTML = s;
                        popupContent.classList.remove('ux-waiting');
                        popupContent.parentNode.style.width = 'inherit';
                        popupContent.parentNode.style.minWidth = '200px';
                        popupContent.parentNode.style.maxWidth = '500px';
                        balloon.update(); // para que recalcule apuntamiento
                    }
                });

                this._map.openPopup(balloon);
            },

            _onViewReset: function() {
                // TODO fix hardcoded Earth values
                var pxCenter = this._map.getSize()._divideBy(2),
                    pxWorldCenter = this._map.latLngToLayerPoint([0, 0]);

                this._initialWorldOffset = pxWorldCenter.subtract(pxCenter).x;
                this._worldWidth = this._map.project([0, 180]).x;
            },

            _generateHtmlTable: function(json, keys, showKeys) {
                if (typeof keys === 'string') {
                    return json[keys];
                }
                var all = !keys;
                keys = !keys && json; // replace key width json if no keys
                var lines = '';
                for (var key in keys) {
                    if (all || key in json) {
                        var sOptKey = showKeys ? (key + ' : ') : '';
                        lines += '<tr><td>' + sOptKey + '</td><td>' + json[key] + '</td></tr>';
                    }
                }
                lines = lines || '- - -';
                return '<table><tbody>' + lines + '</tbody></table>';
            }

        });

        __super = L.Map.NominatimClickHandler.__super__; // ref to class, not to instance

        // agrega un handler NominatimClickHandler si la instancia contiene options.uxNominatim
        L.Map.addInitHook('addHandler', 'uxNominatim', L.Map.NominatimClickHandler);

    }

    //
    // AUX. Pendiente sustituir por el acceso real a estos objetos de angular o node.
    //

    function HTTP(obj) {
        return $.ajax(obj.url);
    }

    /*
      Ejemplos:

      polygon_geojson=1&viewbox=
       
      https://nominatim.openstreetmap.org/reverse?format=xml&lat=52.548&lon=-1.81607&zoom=15&addressdetails=1
    
        lat/lon  4 decimales ya tienen precisión de 1 metro.
        zoom: (18, 1) nivel de detalle de la respuesta: 18 número de casa, 15 barrio, 10 ciudad ...
    
        Ejemplo con nivel 18;
        ---------------------
        <addressparts>
            <house_number>137</house_number>
            <road>Pilkington Avenue</road>
            <suburb>Sutton Coldfield</suburb>
            <city>Birmingham</city>
            <county>West Midlands Combined Authority</county>
            <state_district>West Midlands</state_district>
            <state>Inglaterra</state>
            <postcode>B72 1LH</postcode>
            <country>Reino Unido</country>
            <country_code>gb</country_code>
        </addressparts>
    
        https://nominatim.openstreetmap.org/reverse?format=json&lat=52.5487429714954&lon=-1.81602098644987&zoom=18&addressdetails=1
    
        {
            'place_id':'91015268',
            'licence':'Data © OpenStreetMap contributors, ODbL 1.0. http:\/\/www.openstreetmap.org\/copyright',
            'osm_type': 'way',
            'osm_id':'90394420',
            'lat':'52.54877605',
            'lon':'-1.81627033283164',
            'display_name':'137, Pilkington Avenue, Sutton Coldfield, Birmingham, West Midlands Combined Authority, West Midlands, Inglaterra, B72 1LH, Reino Unido',
            'address':{
                'house_number':'137',
                'road':'Pilkington Avenue',
                'suburb':'Sutton Coldfield','city':'Birmingham','county':'West Midlands Combined Authority',
                'state_district':'West Midlands',
                'state':'Inglaterra',
                'postcode':'B72 1LH',
                'country':'Reino Unido',
                'country_code':'gb'
            },
            'boundingbox':['52.5487321','52.5488299','-1.8163514','-1.8161885']}
        
     */

})();
/**
 * https://github.com/jieter/leaflet-clonelayer/blob/master/index.js
 * Solo un archivo.
 * Versión 1.0.2.  Compatible con leaflet 0.7.7
 */
(function (exports) {

    

    // Add as L.Util if not exist
    if (!L.Util.cloneLayer) {
        L.Util.cloneLayer = cloneLayer;
    }

    // add as export
    if (typeof exports === 'object') {
        module.exports = cloneLayer;
    }

    /**
     * main function.
     * @param {*} layer 
     */
    function cloneLayer(layer) {
        var options = cloneLayerOptions(layer.options);

        // we need to test for the most specific class first, i.e.
        // Circle before CircleMarker

        // Renderers
        if (layer instanceof L.SVG) {
            return L.svg(options);
        }
        if (layer instanceof L.Canvas) {
            return L.canvas(options);
        }

        // Tile layers
        if (layer instanceof L.TileLayer) {
            return L.tileLayer(layer._url, options);
        }
        if (layer instanceof L.ImageOverlay) {
            return L.imageOverlay(layer._url, layer._bounds, options);
        }

        // Marker layers
        if (layer instanceof L.Marker) {
            return L.marker(layer.getLatLng(), options);
        }

        if (layer instanceof L.Circle) {
            return L.circle(layer.getLatLng(), layer.getRadius(), options);
        }
        if (layer instanceof L.CircleMarker) {
            return L.circleMarker(layer.getLatLng(), options);
        }

        if (layer instanceof L.Rectangle) {
            return L.rectangle(layer.getBounds(), options);
        }
        if (layer instanceof L.Polygon) {
            return L.polygon(layer.getLatLngs(), options);
        }
        if (layer instanceof L.Polyline) {
            return L.polyline(layer.getLatLngs(), options);
        }

        if (layer instanceof L.GeoJSON) {
            return L.geoJson(layer.toGeoJSON(), options);
        }

        if (layer instanceof L.LayerGroup) {
            return L.layerGroup(cloneInnerLayers(layer));
        }
        if (layer instanceof L.FeatureGroup) {
            return L.FeatureGroup(cloneInnerLayers(layer));
        }

        throw 'Unknown layer, cannot clone this layer. Leaflet-version: ' + L.version;
    }

    function cloneLayerOptions(options) {
        var ret = {};
        for (var i in options) {
            var item = options[i];
            if (item && item.clone) {
                ret[i] = item.clone();
            } else if (item instanceof L.Layer) {
                ret[i] = cloneLayer(item);
            } else {
                ret[i] = item;
            }
        }
        return ret;
    }

    function cloneInnerLayers(layer) {
        var layers = [];
        layer.eachLayer(function (inner) {
            layers.push(cloneLayer(inner));
        });
        return layers;
    }

})(window.exports);
/**
 * [uxleaflet/client]
 * Usado en OSS. En UX no es usado todavía.
 * 
 * Closure for Special Markers used by OSS: amplia.maps.EntityMarker and amplia.maps.QuadrantMarker.
 * Estos marcadores están basados en un DIV en lugar de un IMAGE.
 * Están basados en la clase L.Marker. Solo se añade la característica de que el icono pasado
 * como parte de las 'opciones' es un objeto DivIcon.
 * El marcador se compone:
 * * De un DIV con una imagen de fondo establecida por css
 * * Otro DIV interno cuya colocación e imagen de fondo es también establecida por css
 */
(function() {
    

    if (!window.L) {
        throw new Error('L.Control.Markers needs Leaflet');
    }

    /** package definition (this ux-markers or ux-map ) */
    if (!L.ux) {
        L.ux = {};
    }

    // Clases css para Status:
    // status-ok, status-warn, status.error

    // Clases para tipos de entidad
    // t-

    var IMAGE_HEIGHT = 40;
    var IMAGE_WIDTH = 40;

    /**
     * Clase base para UxMarker. 
     * Implementa lo necesario para mostrar un marcador en un mapa de amplia
     */
    L.ux.Marker = L.Marker.extend({

        _isMarker: true,
        _feature: null,
        _latlng: null,
        _bocadilloOffset: new L.Point(0, -42),

        initialize: function(latlng, feature) {
            /* keep feature: properties accesible with _getPrroperty */
            this._feature = feature;
            /* keep latlon. Used by showPopup */
            this._latlng = latlng;
            var myIcon = this.createIcon();
            var sTitle = this.createTitle();
            L.Marker.prototype.initialize.call(this, latlng, { title: sTitle, icon: myIcon });
        },

        showPopup: function(map, htmlTemplate, handlePopupAction, hidingOthers) {
            if (this._popup === null) {
                // implementar fill en este fichero
                var divContent = map.fillPopup(this._feature, htmlTemplate, handlePopupAction);
                var latLon = this._latlng;
                var bocadilloOffset = this._bocadilloOffset;
                this._popup = L.popup({ offset: bocadilloOffset })
                    .setLatLng(latLon)
                    .setContent(divContent);
            }
            this._popup.openOn(map);
        },

        createIcon: function() {
            return L.marker();
        },

        createTitle: function() {
            return 'Marker';
        },

        _getProperty: function(name) {
            getProperty('entitytype', this._feature);
        },

        _end: 0

    });

    /**
     * Special subclass ofr Marker for render an Entity.
     * Only needed a required parameter: feature
     */
    L.ux.EntityMarker = L.ux.Marker.extend({

        _isEntityMarker: true,
        _bocadilloOffset: new L.Point(0, -42),

        createIcon: function() {
            var status = this._feature.properties.status || 'unknown';
            var cssName = 'status-' + status + ' t-' + this._getProperty('entitytype');
            // Creamos un ojbeto DivIcon al que le pasamos el contenido personalizados HTML
            var icon = L.divIcon({
                iconSize: [40, 40],
                iconAnchor: [20, 40],
                html: '<div class=\'m2m-type\'></div>',
                className: cssName
            });
            return icon;
        },

        createTitle: function() {
            return this._getProperty('entityKeyAsString');
        },

        _end: 0

    });

    /**
     * Method for creation of a EntityMarker.
     * @param latlng
     * @param feature
     */
    L.ux.entityMarker = function (latlng, feature) {
        return new L.ux.maps.EntityMarker(latlng, feature);
    };


    /**
     * Special subclass ofr Marker for render an Entity.
     * Only needed a required parameter: feature
     */
    L.ux.QuadrantMarker = L.ux.Marker.extend({

        _isQuadrantMarker: true,
        _bocadilloOffset: new L.Point(0, -17),

        createIcon: function() {
            // El estilo es el mismo que el usado por el clusterMaker
            var cssName = 'marker-cluster marker-cluster-small quadranKey';
            // Creamos un ojbeto DivIcon al que le pasamos el contenido personalizados HTML
            var icon = L.divIcon({
                iconSize: [40, 40],
                iconAnchor: [20, 20],
                html: '<div class=\'\'><span>G</span></div>',
                className: cssName
            });
            return icon;
        },

        createTitle: function() {
            var sTitle = 'Agrupador: ' + this._getProperty('quadrantKeyAsString');
            return sTitle;
        },

        _end: 0

    });

    /**
     * Method for creation of a EntityMarker.
     * @param latlng
     * @param feature
     */
    L.ux.quadrantMarker = function (latlng, feature) {
        return new L.ux.maps.QuadrantMarker(latlng, feature);
    };


    /** return the value of a property containing into a feature */
    function getProperty(name, feature) {
        var v = feature.properties[name];
        if (v === undefined) {
            // add a breakpoint for debugging
            v = 'not-found-' + name;
        }
        return v;
    }

})();


/* 
 * Customization of L.Map and L.Control.Layers:
 * - override default options (zoomInText, maxZoom, ...)
 * - override initialize. Check url value.
 * - management of layerControl: base layers (including offline layer), overlays, ...
 * - Change default options for LeafLet classes
 * - Minimap synchorinization
 * - Local layer management
 */
(function() {

    // L.UxMap extends L.Map
    // L.Control.UxLayers extends L.Control.Layers
    var USE_INHERITANCE = false; // true: uses L.Control.extends, false: modify original class
    var BASE_CLASS;
    if (!L.UxMap && !L.Map_ixUx) {

        BASE_CLASS = L.Map;
        var _BASE_; // or BASE_CLASS.prototype if USE_INHERITANCE is true

        var _uxMap_members = {
            /* -- */
            initialize: function() {
                var isSimpleMap = isSimpleUxMap(this, arguments); // cómo detectar mapa simple
                // default initialize of L.Map
                _BASE_.initialize.apply(this, arguments);
                console.info('Ux L.Map initialize');
                // uxMap initialize
                var mapOptions = this.options;
                if (mapOptions.editPointSize && L.Editable && L.Editable.VertexIcon) {
                    var size = parseInt(mapOptions.editPointSize);
                    if (size > 5 && size < 30) {
                        // Ojo. De momento se cambia para 'todos'
                        L.Editable.VertexIcon.prototype.options.iconSize = new L.Point(size, size);
                    }
                }
                // init
                if (isSimpleMap) {
                    initSimpleUxMap(this);
                }
            },
            /** Use this method for synchronize ng config object with L.Map */
            setNgScope: function(optScope) {
                if (!this._$ScopeConfig) {
                    this._$ScopeConfig = optScope && optScope.config;
                    // TODO - test method
                    enableMinimapSynchronization(this, optScope); // it use optScope.controls
                }
            },
            _enableMinimapSynchronization: function(optScope) {

            },
            addControl: function(control) {
                _BASE_.addControl.apply(this, arguments);
                // UX dashboard theme for nodes classed with leaflet-control-layers
                var elemClasses = control && control._container && control._container.classList;
                if (elemClasses && elemClasses.contains('leaflet-control-layers')) {
                    if (!this._mainLayerControl && (control instanceof L.Control.Layers)) {
                        this._mainLayerControl = control;
                    }
                    this._layerControlPosition = control.options.position;
                }
                // move layer-control to end (se intenta solo cuando se añade nuevo control en misma esquina)
                if (this._layerControlPosition === control.options.position) {
                    var lc = $(this._container).find('.leaflet-control-layers.leaflet-control')[0];
                    if (lc && lc !== control._container) {
                        var p = lc.parentNode;
                        p.removeChild(lc);
                        p.appendChild(lc);
                    }
                }
            }
        };

        if (USE_INHERITANCE) {
            _BASE_ = BASE_CLASS.prototype;
            L.UxMap = BASE_CLASS.extend(_uxMap_members);
            L.UxMap._isUx = true;
        } else {
            _BASE_ = {};
            __overrideClass(BASE_CLASS, _uxMap_members, _BASE_);
        }

        // default values
        L.Map._isUx = true; // set flag or fails if L.Map not exist.
        L.Map._isDemoEnabled = !!localStorage.getItem('isUxDemo'); // localStorage.setItem('isUxDemo', '1')

        // Default options in all known widgets. Remove default + - texts. UX uses awesome fonts
        var opt = L.Control.Zoom.prototype.options; /* leaflet:7997 */
        opt.zoomInText = '';
        opt.zoomOutText = '';
        opt.maxZoom = 20;

        // ensure async.
        if (!L.Map.prototype._removeZoomContent) {
            L.Map.prototype._removeZoomContent = true;
        }

    }

    /**
     * En prueba. Refresca capas offline a partir del resultado de 'browse' sobre ficheros locales
     * @param {*} oLayer 
     * @param {*} files 
     */
    function refreshOfflineLayer(oLayer, files) {
        var primero = files[0];
        if (!primero) {
            console.debug('carga de tiles locales cancelada');
            return;
        }
        // En pruebas. solo se considera el primero.
        loadGeoJsonFromFile(primero, function(err, sData) {
            if (err) {
                console.error('Error cartgando fichero', err);
                return;
            }
            var obj;
            try {
                L.TileLayer.prototype.changeTileDataFromJson.call(oLayer, sData);
            } catch (err) {
                throw 'Invalid JSON data';
            }
        });
        console.debug('Cambiando tiles a capa: ' + oLayer.name);
    }

    /**
     * L.Control.UxLayers extends L.Control.Layers
     * L.Control.Layers is an original Leaflet Control to allow users to switch between different layers on the map.
     * The code above customize it for UX.
     * (Futura clase L.Controls.UxLayers)
     */
    if (!L.Control.UxLayers) {

        BASE_CLASS = L.Control.Layers;
        var _uxBase; // or BASE_CLASS.prototype if USE_INHERITANCE is true
        var OFFLINE_PREFIX = 'Offline'; // provisional. 

        /* overrider members of UxLayerControl over L.Controls.Layer */
        var _uxLayerControl_members = {

            initialize: function(baseLayers, overlays, options) {
                _uxBase.initialize.apply(this, arguments); // call to base initialize
                this._localLayer = null; // unique instance of local layer
            },

            _initLayout: function() {
                _uxBase._initLayout.apply(this, arguments); // call to base _initLayout
                // Custom UX.
                this._container.classList.add('navbar');
                this._container.classList.add('navbar-primary');
                // form child
                this._form.classList.add('navbar');
                this._form.classList.add('navbar-primary');
            },

            addBaseLayer: function(layer, name) {
                _uxBase.addBaseLayer.apply(this, arguments);
                if (layer._isUsingLocalTiles) {
                    if (this._localLayer === null) {
                        this._localLayer = layer;
                    } else {
                        console.warn('Another locallayer already exists. ' + this._localLayer.layerName);
                    }
                }
                return this;
            },

            removeLayer: function(layer) {
                _uxBase.removeLayer.apply(this, arguments);
                if (layer._isUsingLocalTiles && this._localLayer === layer) {
                    // TODO - esto la quita del mapa, no del control ?
                    // this._localLayer = null;
                }
                return this;
            },

            _addItem: function(obj) {
                var node = _uxBase._addItem.apply(this, arguments);
                // al añadir un objeto 'label' para el desplegable ...
                if (obj.name.startsWith(OFFLINE_PREFIX)) {
                    // Añade un botón de broswe-file para esta capa
                    var input = document.createElement('input');
                    input.textContent = 'Seleccionar';
                    input.type = 'file';

                    Object.defineProperty(input, 'layerId', { // parche para L.Map._onInputClick
                        get: function() {
                            return obj.layer._leaflet_id;
                        }
                    });

                    // $('.leaflet-control-layers.leaflet-control')[0].classList.add('leaflet-control-layers-expanded');
                    input.style.width = '160px';
                    input.style.position = 'absolute';
                    // input.classList.add('btn');
                    // input.classList.add('btn-default');
                    input.style.left = '0px';
                    input.style.top = '-24px';
                    input.style.display = 'none';
                    $(input).click(function(evt) {
                        evt.stopPropagation();
                    });
                    input.onchange = function(evt) {
                        evt.stopPropagation();
                        refreshOfflineLayer(obj.layer, evt.target.files);
                    };

                    var mainInput = node.children[0];
                    var parent = node.parentNode;
                    $(parent).click(function() {
                        // click any menu.
                        var inputDisplay = (mainInput.checked) ? 'inherit' : 'none';
                        input.style.display = inputDisplay;
                    });

                    // OJO: Debe estar antes que el input[radio]
                    var grParent = parent.parentNode;
                    grParent.insertBefore(input, grParent.firstChild);
                }
            },

            _refreshOfflineLayer: function(oLayer, files) {
                var firstFile = files[0];
                if (!firstFile) {
                    console.debug('carga de tiles locales cancelada');
                    return;
                } else if (files.length > 1) {
                    console.warn('selected ' + (files.length - 1) + ' files after first is ignored');
                }
                // only fisrt file
                loadGeoJsonFromFile(firstFile, function(err, sData) {
                    if (err) {
                        console.error('Error cartgando fichero', err);
                        return;
                    }
                    var obj;
                    try {
                        L.TileLayer.prototype.changeTileDataFromJson.call(oLayer, sData);
                    } catch (err) {
                        throw 'Invalid JSON data';
                    }
                });
                console.debug('Cambiando tiles a capa: ' + oLayer.name);
            }

        };



        if (USE_INHERITANCE) {
            // new control for layers. Default control used by UxMap
            _uxBase = BASE_CLASS.prototype;
            L.Control.UxLayers = BASE_CLASS.extend(_uxLayerControl_members);
        } else {
            // change original BASE_CLASS, overriding some methods
            _uxBase = {}; // container of old methods
            __overrideClass(BASE_CLASS, _uxLayerControl_members, _uxBase);
        }

    }


    /**
     * Devuelve true si el mapa pasado como parámetro se debe configurar con lo mínimo.
     * @param {*} map 
     * @param {*} args passed to L.Map or L.UxMap
     */
    function isSimpleUxMap(map, args) {
        var container = args[0];
        if (typeof container === 'string') {
            return false;
        }
        var mapId = container.id;
        // return (container.classList && container.classList.contains('ux-map-helper')) ||
        //     mapId === 'map-marker' || mapId === 'map-finder';
        return false;
    }

    /**
     * No activar todavía. Ver cómo funciona por dentro leaflet-angular para elegir qué hacer
     * 
     * Intenta añadir las dos capas por defecto a un mapa UX, sin necesidad de pasar por configuración.
     * @param {*} map 
     * @param {*} args .  Debe existir _isSimpleUx como propiedad (y resultado true)
     */
    function initSimpleUxMap(map) {
        var options = map.options || {};

        // para probar tiles OFFLINE localStorage.setItem('localtiles', '1') 
        // TODO - cómo pasarlo en opciones de mapa ?
        var usingLocalTiles = map.options.usingLocalTiles || localStorage.getItem('localtiles');

        // caso especial.
        // cómo se añade _isSimpleUx:true en opciones de angular-leaflet ?
        var tileLayers = {
            osm: {
                name: 'OpenStreetMap',
                url: '//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                type: 'xyz',
                layerParams: {
                    attribution: 'OpenStreet Map',
                    maxZoom: 19
                }
            },
            dark2: {
                name: 'Dark Map',
                url: '//{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
                layerParams: {
                    attribution: 'Cartocdn Dark Map',
                    maxZoom: 19
                },
                type: 'xyz'
            },
            ogWorld: {
                name: 'OpenGate Maps',
                url: 'http://172.19.18.248/osm_tiles/{z}/{x}/{y}.png',
                layerParams: {
                    attribution: 'OpenGate Maps',
                    maxZoom: 19
                },
                type: 'xyz'
            }
        };
        if (usingLocalTiles) {
            // Podría buscarse en la carpeta de descargas un './currentlocaltiles.json'
            //   que es el fichero que se descarga tras el 'robado' de tiles.
            // tileLayers.local = {
            //     name: 'Capa base Offline',
            //     url: 'file://_$local_salonica25_{z}/{x}/{y}.png',
            //     options: { attribution: '' },
            //     visible: false
            // }
        }

        var layerControl = new L.Control.Layers();
        map.addControl(layerControl);
        for (var key in tileLayers) {
            var cfg = tileLayers[key];
            var tileLayer = L.tileLayer(cfg.url, cfg.options);
            layerControl.addBaseLayer(tileLayer, cfg.name);
        }

        // default util controls
        map.addControl(new L.Control.MousePosition({}));
        map.addControl(new L.Control.Fullscreen({}));
        if (usingLocalTiles && L.Control.LocalTileControl) {
            // quitar segunda condición cuando esté implementado
            map.addControl(new L.Control.LocalTileControl({}));
        }
    }

    /**
     * Utilidad para sincronización de Minimap con mapa principal.
     * En pruebas. Se puede implementar en otro lugar.
     * @param {*} map 
     * @param {*} scope 
     */
    function enableMinimapSynchronization(map, scope) {
        // custom controls are referenced in scope.controls.custom
        var customControls = scope && scope.controls && scope.controls.custom;
        if (map._syncMinimapLayerenabled || !customControls) {
            return;
        }
        map._syncMinimapLayerenabled = true;
        map.on('baselayerchange', function(evt) {
            // search minimap and change its layer
            var minimapLayer = searchMapControl(customControls, L.Control.MiniMap);
            if (minimapLayer) {
                var tileLayer = new L.TileLayer(evt.layer._url);
                minimapLayer.changeLayer(tileLayer);
            }
            // check baseTile for change home-control envelope
            var gohomeControl = searchMapControl(customControls, L.Control.Gohome);
            if (gohomeControl) {
                var homeInfo = evt.layer.getHomeInfo && evt.layer.getHomeInfo();
                if (homeInfo && homeInfo.center) {
                    gohomeControl.changeTargetView(homeInfo.center, homeInfo.zoom);
                } else {
                    gohomeControl.restoreOriginalView();
                }
            }
            // Check tile options for over-snap zoom levels.
            // PRUEBA de 'saltado' de niveles de zoom.
            // var mapZooms = evt.layer.options.zooms ||
            //     (evt.layer._localTiles && [1, 2, 3, 4, 5, 6, 7, 8, 9, 12, 15, 18]) ||
            //     undefined;
            // map.options.zooms = mapZooms;
        });
    }

    /** Search a Control (given its type) from a Map passed as argument. */
    function searchMapControl(mapControls, clazz) {
        for (var index = 0; index < mapControls.length; index += 1) {
            var cc = mapControls[index];
            if (cc instanceof clazz) {
                return cc;
            }
        }
    }

    ///
    /// Utilidades
    ///

    L.DomUtil.uxLoadGeoJsonFromFile = loadGeoJsonFromFile;
    /** 
     * Utilidad implementada en mapContoller/geojson_service 
     * It require FileReader (ecma6)
     * */
    function loadGeoJsonFromFile(file, callback) {
        var fileName = file ? file.name : 'null';
        var freader = new FileReader();
        freader.onload = function() {
            try {
                var result = freader.result;
                callback(null, result);
            } catch (msg) {
                callback(new Error('No valid GeoJson file: [' + fileName + ']\n' + msg), null);
            }
        };
        try {
            freader.readAsText(file);
        } catch (err) {
            callback(new Error('Invalid ' + fileName + '\n' + err.message), null);
        }
    }



    /** 
     * This method override an existing class. 
     * WARN: it is not a processing of inheritance. Class will be changed.
     * 
     * angular-leaflet has hardcoded L.Map and L.Control.Layers as constructors. 
     * Uxleaflet needs to use L.UxMap and L.Control.UxLayers instead.
     * Then we use this 'class modification'
     */
    function __overrideClass(clazzToModify, newMembers, overriddenMembers) {
        /*  Parche para modificar la clase (en vez de extender de ella)
            Pendiente extender cuando sea posible personalizar Leaflet desde angular-leaflet */
        console.warn('WARN: MapUx está usando __overrideClass. Class in development: ',
            clazzToModify.constructor); // eliminar comentario si pruebas OK
        var oldMembers = overriddenMembers || {};

        function Message(text) {
            this.getMessage = function() {
                return text;
            };
        }
        for (var key in newMembers) {
            var methodName = key;
            var oldMember = clazzToModify.prototype[methodName];
            if (!oldMember) {
                var oldName = methodName;
                oldMember = new Message(' not exist ' + oldName).getMessage;
            }
            oldMembers[methodName] = oldMember;
            var func = newMembers[methodName];
            clazzToModify.prototype[methodName] = func;
        }
        return oldMembers;
    }

})();
/*
 * [uxleaflet/client] 
 * https://github.com/ardhi/Leaflet.MousePosition
 * File: l-mouseposition.js 
 */

(function () {
    

    L.Control.MousePosition = L.Control.extend({
        options: {
            position: 'bottomleft',
            separator: ' : ',
            emptyString: 'Unavailable',
            lngFirst: false,
            numDigits: 6,
            lngFormatter: undefined,
            latFormatter: undefined,
            prefix: ''
        },
        _existMouse: false,

        onAdd: function(map) {
            this._container = L.DomUtil.create('div', 'leaflet-control-mouseposition');
            L.DomEvent.disableClickPropagation(this._container);
            map.on('mousemove', this._onMouseMove, this);
            map.on('move', this._onMove, this); // for no-mouse device.
            this._container.innerHTML = this.options.emptyString;
            return this._container;
        },

        onRemove: function(map) {
            map.off('mousemove', this._onMouseMove);
        },

        _setText: function(latlng) {
            var lng = this.options.lngFormatter ? this.options.lngFormatter(latlng.lng) : L.Util.formatNum(latlng.lng, this.options.numDigits);
            var lat = this.options.latFormatter ? this.options.latFormatter(latlng.lat) : L.Util.formatNum(latlng.lat, this.options.numDigits);
            var value = this.options.lngFirst ? lng + this.options.separator + lat : lat + this.options.separator + lng;
            var prefixAndValue = this.options.prefix + ' ' + value;
            this._container.innerHTML = prefixAndValue;
        },

        _onMouseMove: function(e) {
            this._existMouse = true;
            this._setText(e.latlng);
        },

        _onMove: function(e) {
            if (!this._existMouse) {
                var map = e.target;
                this._setText(map.getCenter());
            }
        },

    });

    L.Map.mergeOptions({
        positionControl: false
    });

    L.Map.addInitHook(function() {
        if (this.options.positionControl) {
            this.positionControl = new L.Control.MousePosition();
            this.addControl(this.positionControl);
        }
    });

    L.control.mousePosition = function(options) {
        return new L.Control.MousePosition(options);
    };

})();
/** 
 * [uxleaflet/client]
 * L.Controls.MagnifyGlass closure.
 * Implementación original para Leaflet 1 o superior. No hay implementación para versinoes anteriores.
 * 
 */
(function() {

    // TODO - hacer que tenga ref. a determinadas capas del mapa y hacer que
    // se suscriba a eventos de add/remove de esas capas.
    // Usar l.Util.CloneLayer para clonar nuevas subcapas.
    // TODO - hacer PRIMERO que las 'entities' se añadan en capa propia
    

    if (!window.L) {
        throw new Error('L.MagnifyingGlass needs Leaflet');
    }

    var _BASE_CLASS; // clase base de la que heredar.
    var _isLeaflet_07;
    if (L.Layer) {
        // implementación original del widget.
        _BASE_CLASS = L.Layer;
        _isLeaflet_07 = false;
    } else {
        // Esta clase no estaba en versiones anteriores a Leaflet 0.8
        // nueva implementación. Pendiente corregir lo que no funcione en 0.7
        _BASE_CLASS = L.Class;
        _isLeaflet_07 = true;
    }

    /**
     * @class L.MagnifyingGlass 
     * @augments {JSON options}
     */
    L.MagnifyingGlass = _BASE_CLASS.extend({
        options: {
            radius: 180,
            zoomOffset: 3,
            layers: [],
            fixedPosition: false,
            latLng: [0, 0],
            fixedZoom: -1
        },

        initialize: function(options) {
            L.Util.setOptions(this, options);
            this._fixedZoom = (this.options.fixedZoom !== -1);
            this._mainMap = null;
            this._glassMap = null;
        },

        _shifPerformed: function(evt, isPressed) {
            var opacity = isPressed ? '.6' : '1';
            this._glassMap._container.style.opacity = opacity;
        },

        getMap: function() {
            return this._glassMap;
        },

        _createMiniMap: function(elt) {
            // TODO - usar la capa actual del mapa principal
            return new L.Map(elt, {
                layers: this.options.layers,
                zoom: this._getZoom(),
                maxZoom: this._mainMap.getMaxZoom(),
                minZoom: this._mainMap.getMinZoom(),
                crs: this._mainMap.options.crs,
                fadeAnimation: false,
                // disable every controls and interaction means
                attributionControl: false,
                zoomControl: false,
                boxZoom: false,
                touchZoom: false,
                scrollWheelZoom: false,
                doubleClickZoom: false,
                dragging: false,
                keyboard: false
            });
        },

        _getZoom: function() {
            return (this._fixedZoom) ?
                this.options.fixedZoom :
                this._mainMap.getZoom() + this.options.zoomOffset;
        },

        _updateZoom: function() {
            this._glassMap.setZoom(this._getZoom());
        },

        setRadius: function(radius) {
            this.options.radius = radius;
            if (this._wrapperElt) {
                this._wrapperElt.style.width = this.options.radius * 2 + 'px';
                this._wrapperElt.style.height = this.options.radius * 2 + 'px';
            }
        },

        setLatLng: function(latLng) {
            this.options.latLng = latLng;
            this._update(latLng);
        },

        _updateFromMouse: function(evt) {
            this._update(evt.latlng, evt.layerPoint);
        },

        _updateFixed: function() {
            this._update(this.options.latLng);
        },

        _update: function(latLng, layerPoint) {
            // update mini map view, forcing no animation
            this._glassMap.setView(latLng, this._getZoom(), {
                pan: { animate: false }
            });

            // update the layer element position on the main map,
            // using the one provided or reprojecting it
            layerPoint = layerPoint || this._mainMap.latLngToLayerPoint(latLng);
            this._wrapperElt.style.left = layerPoint.x - this.options.radius + 'px';
            this._wrapperElt.style.top = layerPoint.y - this.options.radius + 'px';
        },

        /**
         As defined by ILayer
         */
        onAdd: function(map) {
            this._mainMap = map;
            // create a wrapper element and a container for the map inside it
            this._wrapperElt = L.DomUtil.create('div', 'leaflet-magnifying-glass');
            var glassMapElt = L.DomUtil.create('div', '', this._wrapperElt);
            // Webkit border-radius clipping workaround (see CSS)
            if (L.Browser.webkit)
                L.DomUtil.addClass(glassMapElt, 'leaflet-magnifying-glass-webkit');
            // build the map
            this._glassMap = this._createMiniMap(glassMapElt);

            // forward some DOM events as Leaflet events
            L.DomEvent.addListener(this._wrapperElt, 'click', this._fireClick, this);

            var opts = this.options;

            this.setRadius(opts.radius);
            this.setLatLng(opts.latLng);

            this._glassMap.whenReady(function() {
                if (opts.fixedPosition) {
                    this._mainMap.on('zoomend', this._updateFixed, this);
                    // for now, hide the elements during zoom transitions
                    L.DomUtil.addClass(this._wrapperElt, ('leaflet-zoom-hide'));
                } else {
                    this._mainMap.on('mousemove', this._updateFromMouse, this);
                    if (!this._fixedZoom) {
                        this._mainMap.on('zoomend', this._updateZoom, this);
                    }
                }
            }, this);

            // add the magnifying glass as a layer to the top-most pane
            map.getPanes().popupPane.appendChild(this._wrapperElt);

            // needed after the element has been added, otherwise tile loading is messy
            this._glassMap.invalidateSize();

            addShifEventListener(this._shifPerformed, this);

            return this;
        },

        _fireClick: function(domMouseEvt) {
            if (this.fire) {
                // leaflet 1.0
                this.fire('click', domMouseEvt);
            } else {
                // old leaflet
            }
            L.DomEvent.stopPropagation(domMouseEvt);
        },

        /**
         As defined by ILayer
         */
        onRemove: function(map) {
            map.off('viewreset', this._updateFixed, this);
            map.off('mousemove', this._updateFromMouse, this);
            map.off('zoomend', this._updateZoom, this);
            // layers must be explicitely removed before map destruction,
            // otherwise they can't be reused if the mg is re-added
            for (var i = 0, l = this.options.layers.length; i < l; i++) {
                this._glassMap.removeLayer(this.options.layers[i]);
            }
            this._glassMap.remove();
            L.DomEvent.removeListener(this._wrapperElt, 'click', this._fireClick);
            map.getPanes().popupPane.removeChild(this._wrapperElt);
            this._mainMap = null;
            removeShifEventListener(this._shifPerformed, this);
            return this;
        }
    });

    L.magnifyingGlass = function(options) {
        return new L.MagnifyingGlass(options);
    };

    /**
     * @class  L.Control.MagnifyingGlass
     * @augments {JSON options}
     */
    L.Control.MagnifyingGlass = L.Control.extend({

        _magnifyingGlass: false,

        options: {
            position: 'topleft',
            title: 'Toggle Magnifying Glass',
            forceSeparateButton: true
        },

        initialize: function(options) {
            // Override default options
            for (var i in options) {
                if (options.hasOwnProperty(i) && this.options.hasOwnProperty(i)) {
                    this.options[i] = options[i];
                }
            }
        },

        onAdd: function(map) {
            var className = 'leaflet-control-magnifying-glass';
            var container;
            if (map.zoomControl && !this.options.forceSeparateButton) {
                container = map.zoomControl._container;
            } else {
                container = L.DomUtil.create('div', className + ' leaflet-bar');
            }

            this._button = this._createButton(this.options.title, className, container, map);
            return container;
        },

        _createButton: function(title, className, container, map) {
            // TODO - generar el botón de la misma manera que el resto.
            var _this = this;
            var link = L.DomUtil.create('a', className, container);
            link.href = '#';
            link.title = title;

            L.DomEvent
                .addListener(link, 'click', L.DomEvent.stopPropagation)
                .addListener(link, 'click', L.DomEvent.preventDefault)
                .addListener(link, 'click', function() { _this._clicked(map); });

            return link;
        },

        _clicked: function() {
            var map = this._map;
            if (!this._magnifyingGlass) {
                this._magnifyingGlass = _temp_create_glass(map);
            }

            if (map.hasLayer(this._magnifyingGlass)) {
                map.removeLayer(this._magnifyingGlass);
                L.DomUtil.removeClass(this._button, 'active');
            } else {
                if (this._magnifyingGlass.addTo) {
                    // leaflet >= 1
                    this._magnifyingGlass.addTo(map);
                } else {
                    // leaflet < 1.  En pruebas
                    map.addLayer(this._magnifyingGlass);
                }
                L.DomUtil.addClass(this._button, 'active');
            }
        }

    });

    L.control.magnifyingglass = function(options) {
        return new L.Control.MagnifyingGlass(options);
    };

    addCSS();

    function addCSS() {
        // UPGRADE -añadir estilos por defecto
    }

    /** 
     * Función temporal. Usar funcines de angular para suscripción a eventos de teclado
     */
    function addShifEventListener(func, context) {
        var addEventListener = window.addEventListener ? document.addEventListener : document.attachEvent;
        addEventListener('keydown', function(event) {
            if (event.keyCode === 16 || event.charCode === 16) {
                event._iskeydown = true;
                func.call(context, event, true);
            }
        });
        addEventListener('keyup', function(event) {
            if (event.keyCode === 16 || event.charCode === 16) {
                event._iskeyup = true;
                func.call(context, event, false);
            }
        });
    }

    function removeShifEventListener(func, context) {
        var removeEventListener = window.removeEventListener ? document.removeEventListener : function _foo() {};
        removeEventListener('keydown', context);
        removeEventListener('keyup', context);
    }

    /* Crea una instancia de L.MagnifyingGlass usando como capa la capa principal actual del mapa */
    function _temp_create_glass(map) {

        // código de la demos
        var tileUrl = window.location.protocol + '//b.tile.openstreetmap.org/{z}/{x}/{y}.png';
        var tileOptions = {
            attribution: '&copy; <a href=\'https://osm.org/copyright\'>OpenStreetMap</a> contributors'
        };

        // TODO - obtener desde 'map'
        var currentBaseLayer = L.tileLayer(tileUrl, tileOptions);

        var magnifyingGlass = L.magnifyingGlass({
            zoomOffset: 3,
            layers: [currentBaseLayer]
        });
        return magnifyingGlass;
    }

})(); //  L.Control.MagnifyingGlass
/** 
 * [uxleaflet/client]
 * Versión extendida de GPlaceAutocomplete 
 * Consta de un botón para mostrar ocultar el cuadro de texto.
 * 
 * Esta clase está preparada para esperar su inicialización hasta que se resuelva la carga de
 * su la librería de la que depende: google.maps.places.Autocomplete.
 * Es necesario un API-KEY de Google para que funcione. 
 * Este API-KEY se está buscando en localStorage / 'google-key'
 */
(function() {

    
    
    var BASE_CLASS = L.Control.GPlaceAutocomplete;
    if (!BASE_CLASS) {
        console.error('L.Control.GPlaceAutocomplete2 requires L.Control.GPlaceAutocomplete');
        return;
    }

    L.Control.GPlaceAutocomplete2 = BASE_CLASS.extend({

        _buildContainer: function(options) {
            // Solo debe invocarse si existe google.maps.places.Autocomplete
            var _that = this;
            L.extraApi.ensureLib('google', ['google.maps.places.Autocomplete'], function() {
                // called when available google-key
                BASE_CLASS.prototype._buildContainer.call(_that, options);
            });
        },

        addTo: function(map) {
            // solo debe invocarse cuando exista this._container.
            var _that = this;
            var tInterval = window.setInterval(function() {
                    if (_that.container) {
                        window.clearInterval(tInterval);
                        BASE_CLASS.prototype.addTo.call(_that, map);
                    }
                },
                100); // check this._container each 100 ms
        }

    });


    // comment this code in production
    if (document.location.host.startsWith('172.') || document.location.host.startsWith('localhost')) {
        var CHECK_EACH = 2000; // ms
        var CHECK_TIMES = 3;
        var times = CHECK_TIMES;
        var interval = window.setInterval(function() {
            var VAR_NAME = 'google-apikey';
            var sApiKey = localStorage.getItem(VAR_NAME);
            if (sApiKey && L.extraApi) {
                console.info('Found apikey in locaStorage[\'' + VAR_NAME + '\']');
                L.extraApi.setApikey('google', sApiKey);
                times = -1;
            } else {
                console.debug('Not Found apikey in locaStorage[\'' + VAR_NAME + '\']');
                // or l.extraApi not loaded yet
            }
            if ((times -= 1) < 0) {
                window.clearInterval(interval);
            }
        }, CHECK_EACH);
    }

})();
/*
 * [uxleaflet/client]
 * Google layer using Google Maps API.
 * window.google.maps is required when constructor is called.
 */
(function() {

    

    if (!window.L) {
        throw new Error('L.Google needs Leaflet');
    }

    L.Google = L.Class.extend({
        includes: L.Mixin.Events,

        options: {
            minZoom: 0,
            maxZoom: 18,
            tileSize: 256,
            subdomains: 'abc',
            errorTileUrl: '',
            attribution: '',
            opacity: 1,
            continuousWorld: false,
            noWrap: false
        },

        // Possible types: SATELLITE, ROADMAP, HYBRID, TERRAIN
        initialize: function(type, options) {
            L.Util.setOptions(this, options);

            this._ready = window.google !== undefined;
            if (!this._ready) {
                delayInit(this);
            }

            this._type = type || 'SATELLITE';
        },

        onAdd: function(map, insertAtTheBottom) {
            this._map = map;
            this._insertAtTheBottom = insertAtTheBottom;

            // create a container div for tiles
            this._initContainer();
            this._initMapObject();

            // set up events
            map.on('viewreset', this._resetCallback, this);

            this._limitedUpdate = L.Util.limitExecByInterval(this._update, 50, this);
            map.on('move', this._update, this);
            map.on('dragstart', this._update, this);
            map.on('drag', this._update, this);
            map.on('zoomstart', this._update, this);
            map.on('zoomend', this._update, this);
            map.on('autopanstart', this._update, this);

            map._controlCorners.bottomright.style.marginBottom = '1em';

            this._reset();
            this._update();
        },

        onRemove: function(map) {
            this._map._container.removeChild(this._container);
            //this._container = null;

            this._map.off('viewreset', this._resetCallback, this);

            this._map.off('move', this._update, this);
            map._controlCorners.bottomright.style.marginBottom = '0em';
            //this._map.off('moveend', this._update, this);
        },

        getAttribution: function() {
            return this.options.attribution;
        },

        setOpacity: function(opacity) {
            this.options.opacity = opacity;
            if (opacity < 1) {
                L.DomUtil.setOpacity(this._container, opacity);
            }
        },

        setElementSize: function(e, size) {
            e.style.width = size.x + 'px';
            e.style.height = size.y + 'px';
        },

        _initContainer: function() {
            var tilePane = this._map._container,
                first = tilePane.firstChild;

            if (!this._container) {
                this._container = L.DomUtil.create('div', 'leaflet-google-layer leaflet-top leaflet-left');
                this._container.id = '_GMapContainer_' + L.Util.stamp(this);
                this._container.style.zIndex = 'auto';
            }

            if (true) {
                tilePane.insertBefore(this._container, first);

                this.setOpacity(this.options.opacity);
                this.setElementSize(this._container, this._map.getSize());
            }
        },

        _initMapObject: function() {
            if (!this._ready) return;
            this._google_center = new google.maps.LatLng(0, 0);
            var map = new google.maps.Map(this._container, {
                center: this._google_center,
                zoom: 0,
                tilt: 0,
                mapTypeId: google.maps.MapTypeId[this._type],
                disableDefaultUI: true,
                keyboardShortcuts: false,
                draggable: false,
                disableDoubleClickZoom: true,
                scrollwheel: true,
                streetViewControl: false
            });

            var _this = this;
            this._reposition = google.maps.event.addListenerOnce(map, 'center_changed',
                function() { _this.onReposition(); });

            map.backgroundColor = '#ff0000';
            this._google = map;
        },

        _resetCallback: function(e) {
            this._reset(e.hard);
        },

        _reset: function(clearOldContainer) {
            this._initContainer();
        },

        _update: function() {
            if (!this._google) return;
            this._resize();

            var bounds = this._map.getBounds();
            var ne = bounds.getNorthEast();
            var sw = bounds.getSouthWest();
            var google_bounds = new google.maps.LatLngBounds(
                new google.maps.LatLng(sw.lat, sw.lng),
                new google.maps.LatLng(ne.lat, ne.lng)
            );
            var center = this._map.getCenter();
            var _center = new google.maps.LatLng(center.lat, center.lng);

            this._google.setCenter(_center);
            this._google.setZoom(this._map.getZoom());
            //this._google.fitBounds(google_bounds);
        },

        _resize: function() {
            var size = this._map.getSize();
            if (this._container.style.width === size.x &&
                this._container.style.height === size.y)
                return;
            this.setElementSize(this._container, size);
            this.onReposition();
        },

        onReposition: function() {
            if (!this._google) return;
            google.maps.event.trigger(this._google, 'resize');
        }
    });


    L.Google.asyncWait = [];

    var ensureStarted = false;

    function delayInit(obj) {
        L.Google.asyncWait.push(obj);
        if (ensureStarted) {
            return;
        }
        ensureStarted = true;
        L.extraApi.ensureLib('google', ['google.maps.Map'], function() {
            var i;
            for (i = 0; i < L.Google.asyncWait.length; i++) {
                var o = L.Google.asyncWait[i];
                o._ready = true;
                if (o._container) {
                    o._initMapObject();
                    o._update();
                }
            }
            L.Google.asyncWait = [];
        });
    }
/*
    function testPromise() {
        var p = new Promise(function(resolve, reject) {
            window.setTimeout(function() {
                resolve('p-' + $scope.$id);
            }, 2000);
        })
        p.then(
            function(data) {
                console.info('OK: ' + data);
            }
        );
    }
*/
})();
/** 
 * [uxleaflet/client] 
 * L.Controls.Gohome closure
 */
// (function() {


if (!window.L) {
    throw new Error('L.Control.Gohome needs Leaflet');
}

/**
 * @class L.Control.GoHome 
 * @augments {JSON options} bounds or center/zoom
 */
L.Control.Gohome = L.Control.extend({
    includes: L.Mixin.Events,

    options: {
        className: ''
    },

    _isGohomeInstance: true,

    initialize: function(options) {
        if (L.Control.initialize) {
            L.Control.initialize.apply(this, arguments);
        }
        L.Util.setOptions(this, options);
        this._className = (this.options.className || '') + ' ux-home';
        this.options.center = this.options.center || [40, -3.7];
        this.options.zoom = this.options.zoom || 8;
        this._originalView = { center: this.options.center, zoom: this.options.zoom };
    },

    onAdd: function(map) {
        // add custom classname
        var className = this._className + ' leaflet-control-home';
        var container = L.DomUtil.create('div', className + ' leaflet-bar');

        var fsTitle = this.options.fullscreenTitle || 'Go Home Location';
        var fullClassName = className + ' leaflet-control-home';
        this._createButton('', fsTitle, className, container, this.goHome, this);

        return container;
    },

    _createButton: function(html, title, className, container, fn, context) {
        var link = L.DomUtil.create('a', className + ' leaflet-bar-part', container);
        link.innerHTML = html;
        link.href = '#';
        link.title = title;

        var stop = L.DomEvent.stopPropagation;

        L.DomEvent
            .on(link, 'click', stop)
            .on(link, 'mousedown', stop)
            .on(link, 'dblclick', stop)
            .on(link, 'click', L.DomEvent.preventDefault)
            .on(link, 'click', fn, context)
            .on(link, 'click', this._refocusOnMap, context);

        return link;
    },

    goHome: function() {
        if (this.options.bounds) {
            this._map.fitBounds(this.options.bounds);
        } else {
            var zoom = this.options.zoom || 8;
            var center = this.options.center;
            var ll = new L.LatLng(center[0], center[1]);
            this._map.setView(ll, zoom);
        }
        // force internal resize for map
        this._map.invalidateSize();
    },

    saveCurrentViewOriginalView: function() {
        this._originalView = { center: this.options.center, zoom: this.options.zoom };
    },

    restoreOriginalView: function() {
        this.changeTargetView(this._originalView.center, this._originalView.zoom);
    },

    changeTargetView: function(center, zoom) {
        if (!isNaN(center[0]) && !isNaN(center[1])) {
            this.options.center = center;
        } else if (!isNaN(center.lat) && !isNaN(center.lng)) {
            this.options.center = [center.lat, center.lng];
        } else {
            throw 'unknowwn format for center: ' + center;
        }
        this.options.zoom = zoom;
        this.options.bounds = undefined;
    },

    changeTargetViewToBounds: function(bounds) {
        if (bounds.isValid) {
            this.options.bounds = bounds;
            this.options.zoom = undefined;
            this.options.center = undefined;
        } else {
            throw 'Invalid bounds: ' + bounds;
        }
    },

    _oldStyle: {}

});

L.gohome = function (opt) {
    return new L.Control.Gohome(opt);
};

addCSS();

function addCSS() {
    // UPGRADE -añadir estilos por defecto
}

// })();
/** 
 * [uxleaflet/client]
 * L.Controls.BoxSelection closure.
 * OJO: No borrar todavía. Es una alternativa a L.BoxZoom 
 * 
 * OJO: Ejemplo en el que se basa este código usaba nuevas instrucciones ECMA6.
 * Son incompatibles con jslint uado por tarea gulp.
 */
(function() {

    

    if (!window.L) {
        throw new Error('L.Control.FeatureSelection needs Leaflet');
    }

    /**
     * @class L.Control.FeatureSelection 
     */
    L.Control.FeatureSelection = L.Control.extend({
        includes: L.Mixin.Events,

        options: {
            className: ''
        },

        _button: null,
        _restriction: null,

        initialize: function(options) {
            if (!window.L.Map.SelectArea) {
                throw new Error('L.Control.FeatureSelection needs L.Map.SelectArea (bower: leaflet-select-area');
            }
            if (L.Control.initialize) {
                L.Control.initialize.apply(this, arguments);
            }
            L.Util.setOptions(this, options);

        },

        onAdd: function(map) {
            this._map = map;

            var className = (this._className || '') + ' leaflet-control-boxselection',
                container = L.DomUtil.create('div', className + ' leaflet-bar');
            var classNamePrefix = ' leaflet-control-boxselection'; // leaflet-select-control

            var title = this.options.title || 'Select features on map';
            title = 'IN DEVELOPMENT  --  Select features on map';
            console.warn(title); // DELETE this line when ...
            this._button = this._createButton('', title, className, container, this.goHome, this);

            var result = document.querySelector('.info .result') || $('<div></div>');
            // on select
            map.on({
                'areaselected': this.areaSelectedPerformed,
                'areaselecttoggled': this.updateButton
            });

            // no necesario. Se seleccionará sin necesidad de ctrl
            // L.DomEvent.on(document.querySelector('#restriction'), 'change', toggleRestriction);
            // L.DomEvent.on(document.querySelector('#shift-key'), 'change', toggleShiftKey);
            // L.DomEvent.on(document.querySelector('#ctrl-key'), 'change', toggleCtrlKey);

            this._map.selectArea.setControlKey(false);

            // enable
            this.updateButton();

            return container;
        },

        areaSelectedPerformed: function(evt) {
            // Esto depende de los objetos a seleccionar.
            // L.Util.requestAnimFrame(function() {
            //     map.eachLayer(function(pointLayer) {
            //         if (pointLayer instanceof L.CircleMarker) {
            //             pointLayer.setStyle({
            //                 color: evt.bounds.contains(pointLayer.getLatLng()) ? '#0f0' : '#f00'
            //             });
            //         }
            //     });
            // });
            var sInner = evt.bounds.toBBoxString().split(',').join(',\n');
            // result.innerHTML = '<pre>' + sInner + '</pre>';
            console.info(sInner);
        },

        _createButton: function(html, title, className, container, fn, context) {
            var _this = this;
            var link = L.DomUtil.create('a', className + ' leaflet-bar-part', container);
            link.innerHTML = html;
            link.href = '#';
            link.title = title;

            var stop = L.DomEvent.stopPropagation;

            L.DomEvent
                .on(link, 'click', function() {
                    _this._areaSelectToggled();
                })
                .on(link, 'mousedown', stop)
                .on(link, 'dblclick', stop)
                .on(link, 'click', L.DomEvent.preventDefault);

            return link;
        },

        updateButton: function() {
            if (this._button) {
                L.DomUtil[this._map.selectArea.enabled() ? 'addClass' : 'removeClass'](this._button, 'active');
            }
        },

        toggleRestriction: function() {
            var map = this._map;
            if (this._restriction) {
                map.removeLayer(this._restriction);
                map.selectArea.setValidate();
                this._restriction = null;
            } else {
                var bounds = map.getBounds().pad(-0.25);
                this._restriction = L.rectangle(bounds, {
                    weight: 2,
                    color: '#0ff',
                    fillOpacity: 0,
                    clickable: false,
                    opacity: 0.7
                }).addTo(map);
                map.selectArea.setValidate(function(p) {
                    return bounds.contains(map.layerPointToLatLng(p));
                });
            }
        },

        _areaSelectToggled: function() {
            if (this._map.selectArea.enabled()) {
                L.DomUtil.removeClass(this._button, 'active');
                this._map.selectArea.disable();
                console.info('Select area disabled');
            } else {
                L.DomUtil.addClass(this._button, 'active');
                this._map.selectArea.enable();
                console.info('Select area enabled');
            }
        },

        toggleCtrlKey: function() {
            this._map.selectArea.setControlKey(document.querySelector('#ctrl-key').checked);
        },

        toggleShiftKey: function() {
            this._map.selectArea.selectArea.setShiftKey(document.querySelector('#shift-key').checked);
        },

        _oldStyle: {}

    });

    L.boxSelection = function (opt) {
        return new L.Control.BoxSelection(opt);
    };

})();


/**
 * [uxleaflet/client]
 * Editable. B version. 
 * (Es posible que no sea necesaria, al igual que no lo es l-editable.js)
 * 
 */
L.Editable = L.Class.extend({

    _dev_version: '0.9.0',
    _clazzName: 'L.Editable',

    includes: [L.Mixin.Events],

    statics: {
        FORWARD: 1,
        BACKWARD: -1
    },

    options: {
        zIndex: 1000,
        polygonClass: L.Polygon,
        polylineClass: L.Polyline,
        markerClass: L.Marker,
        drawingCSSClass: 'leaflet-editable-drawing'
    },

    initialize: function(map, options) {
        L.setOptions(this, options);
        this._lastZIndex = this.options.zIndex;
        this.map = map;
        this.editLayer = this.createEditLayer();
        this.featuresLayer = this.createFeaturesLayer();
        this.newClickHandler = this.createNewClickHandler();
        this.forwardLineGuide = this.createLineGuide();
        this.backwardLineGuide = this.createLineGuide();
    },

    fireAndForward: function(type, e) {
        e = e ||  {};
        e.editTools = this;
        this.fire(type, e);
        this.map.fire(type, e);
    },

    createLineGuide: function() {
        var options = L.extend({ dashArray: '5,10', weight: 1 }, this.options.lineGuideOptions);
        return L.polyline([], options);
    },

    createVertexIcon: function(options) {
        return L.Browser.touch ? new L.Editable.TouchVertexIcon(options) : new L.Editable.VertexIcon(options);
    },

    createNewClickHandler: function() {
        return L.marker(this.map.getCenter(), {
            icon: this.createVertexIcon({ className: 'leaflet-div-icon leaflet-drawing-icon' }),
            opacity: 0,
            zIndexOffset: this._lastZIndex
        });
    },

    createEditLayer: function() {
        return this.options.editLayer ||  new L.LayerGroup().addTo(this.map);
    },

    createFeaturesLayer: function() {
        return this.options.featuresLayer ||  new L.LayerGroup().addTo(this.map);
    },

    moveForwardLineGuide: function(latlng) {
        if (this.forwardLineGuide._latlngs.length) {
            this.forwardLineGuide._latlngs[1] = latlng;
            this.forwardLineGuide.redraw();
        }
    },

    moveBackwardLineGuide: function(latlng) {
        if (this.backwardLineGuide._latlngs.length) {
            this.backwardLineGuide._latlngs[1] = latlng;
            this.backwardLineGuide.redraw();
        }
    },

    anchorForwardLineGuide: function(latlng) {
        this.forwardLineGuide._latlngs[0] = latlng;
        this.forwardLineGuide.redraw();
    },

    anchorBackwardLineGuide: function(latlng) {
        this.backwardLineGuide._latlngs[0] = latlng;
        this.backwardLineGuide.redraw();
    },

    attachForwardLineGuide: function() {
        this.editLayer.addLayer(this.forwardLineGuide);
    },

    attachBackwardLineGuide: function() {
        this.editLayer.addLayer(this.backwardLineGuide);
    },

    detachForwardLineGuide: function() {
        this.forwardLineGuide._latlngs = [];
        this.editLayer.removeLayer(this.forwardLineGuide);
    },

    detachBackwardLineGuide: function() {
        this.backwardLineGuide._latlngs = [];
        this.editLayer.removeLayer(this.backwardLineGuide);
    },

    updateNewClickHandlerZIndex: function() {
        this._lastZIndex += 2;
        this.newClickHandler.setZIndexOffset(this._lastZIndex);
    },

    registerForDrawing: function(editor) {
        this.map.on('mousemove touchmove', editor.onMouseMove, editor);
        if (this._drawingEditor) this.unregisterForDrawing(this._drawingEditor);
        this._drawingEditor = editor;
        this.editLayer.addLayer(this.newClickHandler);
        this.newClickHandler.on('click', editor.onNewClickHandlerClicked, editor);
        if (L.Browser.touch) this.map.on('click', editor.onTouch, editor);
        L.DomUtil.addClass(this.map._container, this.options.drawingCSSClass);
        this.updateNewClickHandlerZIndex();
    },

    unregisterForDrawing: function(editor) {
        editor = editor || this._drawingEditor;
        this.editLayer.removeLayer(this.newClickHandler);
        if (!editor) return;
        this.map.off('mousemove touchmove', editor.onMouseMove, editor);
        this.newClickHandler.off('click', editor.onNewClickHandlerClicked, editor);
        if (L.Browser.touch) this.map.off('click', editor.onTouch, editor);
        if (editor !== this._drawingEditor) return;
        delete this._drawingEditor;
        if (editor.drawing) editor.cancelDrawing();
        L.DomUtil.removeClass(this.map._container, this.options.drawingCSSClass);
    },

    stopDrawing: function() {
        this.unregisterForDrawing();
    },

    connectCreatedToMap: function(layer) {
        return this.featuresLayer.addLayer(layer);
    },

    startPolyline: function(latlng, options) {
        var line = this.createPolyline([], options);
        this.connectCreatedToMap(line);
        var editor = line.enableEdit();
        editor.startDrawingForward();
        if (latlng) editor.newPointForward(latlng);
        return line;
    },

    startPolygon: function(latlng, options) {
        var polygon = this.createPolygon([], options);
        this.connectCreatedToMap(polygon);
        var editor = polygon.enableEdit();
        editor.startDrawingForward();
        if (latlng) editor.newPointForward(latlng);
        return polygon;
    },

    startMarker: function(latlng, options) {
        latlng = latlng ||  this.map.getCenter();
        var marker = this.createMarker(latlng, options);
        this.connectCreatedToMap(marker);
        var editor = marker.enableEdit();
        editor.startDrawing();
        return marker;
    },

    startHole: function(editor, latlng) {
        editor.newHole(latlng);
    },

    extendMultiPolygon: function(multi) {
        var polygon = this.createPolygon([]);
        multi.addLayer(polygon);
        polygon.multi = multi;
        var editor = polygon.enableEdit();
        editor.startDrawingForward();
        return polygon;
    },

    createPolyline: function(latlngs, options) {
        options = L.Util.extend({ editOptions: { editTools: this } }, options);
        var line = new this.options.polylineClass(latlngs, options);
        this.fireAndForward('editable:created', { layer: line });
        return line;
    },

    createPolygon: function(latlngs, options) {
        options = L.Util.extend({ editOptions: { editTools: this } }, options);
        var polygon = new this.options.polygonClass(latlngs, options);
        this.fireAndForward('editable:created', { layer: polygon });
        return polygon;
    },

    createMarker: function(latlng, options) {
        options = L.Util.extend({ editOptions: { editTools: this } }, options);
        var marker = new this.options.markerClass(latlng, options);
        this.fireAndForward('editable:created', { layer: marker });
        return marker;
    }

});

L.Map.addInitHook(function() {

    this.whenReady(function() {
        if (this.options.editable !== false) {
            // no está explicitamente deshabilitado
            this.editTools = new L.Editable(this, this.options.editOptions);
        }
    });

});

L.Editable.VertexIcon = L.DivIcon.extend({

    _clazzName: 'L.Editable.VertexIcon',
    options: {
        iconSize: new L.Point(8, 8)
    }

});

L.Editable.TouchVertexIcon = L.Editable.VertexIcon.extend({

    _clazzName: 'L.Editable.TouchVertexIcon',
    options: {
        iconSize: new L.Point(20, 20)
    }

});


L.Editable.VertexMarker = L.Marker.extend({

    _clazzName: 'L.Editable.VertexMarker',
    options: {
        draggable: true,
        className: 'leaflet-div-icon leaflet-vertex-icon'
    },

    initialize: function(latlng, latlngs, editor, options) {
        this.latlng = latlng;
        this.latlngs = latlngs;
        this.editor = editor;
        L.Marker.prototype.initialize.call(this, latlng, options);
        this.options.icon = this.editor.tools.createVertexIcon({ className: this.options.className });
        this.latlng.__vertex = this;
        this.editor.editLayer.addLayer(this);
        this.setZIndexOffset(editor.tools._lastZIndex + 1);
    },

    onAdd: function(map) {
        L.Marker.prototype.onAdd.call(this, map);
        this.on('drag', this.onDrag);
        this.on('dragstart', this.onDragStart);
        this.on('dragend', this.onDragEnd);
        this.on('click', this.onClick);
        this.on('contextmenu', this.onContextMenu);
        this.on('mousedown touchstart', this.onMouseDown);
        this.addMiddleMarkers();
    },

    onRemove: function(map) {
        if (this.middleMarker) this.middleMarker.delete();
        delete this.latlng.__vertex;
        this.off('drag', this.onDrag);
        this.off('dragstart', this.onDragStart);
        this.off('dragend', this.onDragEnd);
        this.off('click', this.onClick);
        this.off('contextmenu', this.onContextMenu);
        this.off('mousedown touchstart', this.onMouseDown);
        L.Marker.prototype.onRemove.call(this, map);
    },

    onDrag: function(e) {
        e.vertex = this;
        this.editor.onVertexMarkerDrag(e);
        var iconPos = L.DomUtil.getPosition(this._icon),
            latlng = this._map.layerPointToLatLng(iconPos);
        this.latlng.lat = latlng.lat;
        this.latlng.lng = latlng.lng;
        this.editor.refresh();
        if (this.middleMarker) {
            this.middleMarker.updateLatLng();
        }
        var next = this.getNext();
        if (next && next.middleMarker) {
            next.middleMarker.updateLatLng();
        }
    },

    onDragStart: function(e) {
        e.vertex = this;
        this.editor.onVertexMarkerDragStart(e);
    },

    onDragEnd: function(e) {
        e.vertex = this;
        this.editor.onVertexMarkerDragEnd(e);
    },

    onClick: function(e) {
        e.vertex = this;
        this.editor.onVertexMarkerClick(e);
    },

    onContextMenu: function(e) {
        e.vertex = this;
        this.editor.onVertexMarkerContextMenu(e);
    },

    onMouseDown: function(e) {
        e.vertex = this;
        this.editor.onVertexMarkerMouseDown(e);
    },

    delete: function() {
        var next = this.getNext(); // Compute before changing latlng
        this.latlngs.splice(this.latlngs.indexOf(this.latlng), 1);
        this.editor.editLayer.removeLayer(this);
        this.editor.onVertexDeleted({ latlng: this.latlng, vertex: this });
        if (next) next.resetMiddleMarker();
    },

    getIndex: function() {
        return this.latlngs.indexOf(this.latlng);
    },

    getLastIndex: function() {
        return this.latlngs.length - 1;
    },

    getPrevious: function() {
        if (this.latlngs.length < 2) return;
        var index = this.getIndex(),
            previousIndex = index - 1;
        if (index === 0 && this.editor.CLOSED) previousIndex = this.getLastIndex();
        var previous = this.latlngs[previousIndex];
        if (previous) return previous.__vertex;
    },

    getNext: function() {
        if (this.latlngs.length < 2) return;
        var index = this.getIndex(),
            nextIndex = index + 1;
        if (index === this.getLastIndex() && this.editor.CLOSED) nextIndex = 0;
        var next = this.latlngs[nextIndex];
        if (next) return next.__vertex;
    },

    addMiddleMarker: function(previous) {
        previous = previous ||  this.getPrevious();
        if (previous && !this.middleMarker) this.middleMarker = this.editor.addMiddleMarker(previous, this, this.latlngs, this.editor);
    },

    addMiddleMarkers: function() {
        if (this.editor.tools.options.skipMiddleMarkers) return;
        var previous = this.getPrevious();
        if (previous) {
            this.addMiddleMarker(previous);
        }
        var next = this.getNext();
        if (next) {
            next.resetMiddleMarker();
        }
    },

    resetMiddleMarker: function() {
        if (this.middleMarker) this.middleMarker.delete();
        this.addMiddleMarker();
    },

    _initInteraction: function() {
        L.Marker.prototype._initInteraction.call(this);
        L.DomEvent.on(this._icon, 'touchstart', function(e) { this._fireMouseEvent(e); }, this);
    }

});

L.Editable.mergeOptions({
    vertexMarkerClass: L.Editable.VertexMarker
});

L.Editable.MiddleMarker = L.Marker.extend({

    _clazzName: 'L.Editable.MiddleMarker',
    options: {
        opacity: 0.5,
        className: 'leaflet-div-icon leaflet-middle-icon'
    },

    initialize: function(left, right, latlngs, editor, options) {
        this.left = left;
        this.right = right;
        this.editor = editor;
        this.latlngs = latlngs;
        L.Marker.prototype.initialize.call(this, this.computeLatLng(), options);
        this._opacity = this.options.opacity;
        this.options.icon = this.editor.tools.createVertexIcon({ className: this.options.className });
        this.editor.editLayer.addLayer(this);
        try {
            this.setVisibility();
        } catch (err) {
            // FIXME - ver qué falla en setVisibility tras un arrastre.
            console.error('err interno MiddleMarker', err);
        }
    },

    setVisibility: function() {
        var leftPoint = this._map.latLngToContainerPoint(this.left.latlng),
            rightPoint = this._map.latLngToContainerPoint(this.right.latlng),
            size = L.point(this.options.icon.options.iconSize);
        if (leftPoint.distanceTo(rightPoint) < size.x * 3) {
            this.hide();
        } else {
            this.show();
        }
    },

    show: function() {
        this.setOpacity(this._opacity);
    },

    hide: function() {
        this.setOpacity(0);
    },

    updateLatLng: function() {
        this.setLatLng(this.computeLatLng());
        this.setVisibility();
    },

    computeLatLng: function() {
        var leftPoint = this.editor.map.latLngToContainerPoint(this.left.latlng),
            rightPoint = this.editor.map.latLngToContainerPoint(this.right.latlng),
            y = (leftPoint.y + rightPoint.y) / 2,
            x = (leftPoint.x + rightPoint.x) / 2;
        return this.editor.map.containerPointToLatLng([x, y]);
    },

    onAdd: function(map) {
        L.Marker.prototype.onAdd.call(this, map);
        this.on('mousedown touchstart', this.onMouseDown);
        map.on('zoomend', this.setVisibility, this);
    },

    onRemove: function(map) {
        delete this.right.middleMarker;
        this.off('mousedown touchstart', this.onMouseDown);
        map.off('zoomend', this.setVisibility, this);
        L.Marker.prototype.onRemove.call(this, map);
    },

    onMouseDown: function(e) {
        this.editor.onMiddleMarkerMouseDown(e, this);
        this.latlngs.splice(this.index(), 0, e.latlng);
        this.editor.refresh();
        var marker = this.editor.addVertexMarker(e.latlng, this.latlngs);
        marker.dragging._draggable._onDown(e.originalEvent); // Transfer ongoing dragging to real marker
        this.delete();
    },

    delete: function() {
        this.editor.editLayer.removeLayer(this);
    },

    index: function() {
        return this.latlngs.indexOf(this.right.latlng);
    },

    _initInteraction: function() {
        L.Marker.prototype._initInteraction.call(this);
        L.DomEvent.on(this._icon, 'touchstart', function(e) { this._fireMouseEvent(e); }, this);
    }

});

L.Editable.mergeOptions({
    middleMarkerClass: L.Editable.MiddleMarker
});

L.Editable.BaseEditor = L.Class.extend({

    _clazzName: 'L.Editable.BaseEditor',
    initialize: function(map, feature, options) {
        L.setOptions(this, options);
        this.map = map;
        this.feature = feature;
        this.feature.editor = this;
        this.editLayer = new L.LayerGroup();
        this.tools = this.options.editTools || map.editTools;
    },

    enable: function() {
        if (this._enabled) return this;
        this.tools.editLayer.addLayer(this.editLayer);
        this.onEnable();
        this._enabled = true;
        this.feature.on('remove', this.disable, this);

        console.warn('habilitando dragging en feature ???? ');
        this.feature.dragging.enable();
        if (this._getEvents) {
            this.feature.on(this._getEvents(), this);
        }

        return this;
    },

    disable: function() {
        this.feature.off('remove', this.disable, this);
        this.editLayer.clearLayers();
        this.tools.editLayer.removeLayer(this.editLayer);
        this.onDisable();
        delete this._enabled;
        if (this.drawing) this.cancelDrawing();

        console.info('deshabilitando dragging en feature ???? ');
        this.feature.dragging.disable();

        return this;
    },

    fireAndForward: function(type, e) {
        e = e ||  {};
        e.layer = this.feature;
        this.feature.fire(type, e);
        if (this.feature.multi) this.feature.multi.fire(type, e);
        this.tools.fireAndForward(type, e);
    },

    onEnable: function() {
        this.fireAndForward('editable:enable');
    },

    onDisable: function() {
        this.fireAndForward('editable:disable');
    },

    onEditing: function() {
        this.fireAndForward('editable:editing');
    },

    onStartDrawing: function() {
        this.fireAndForward('editable:drawing:start');
    },

    onEndDrawing: function() {
        this.fireAndForward('editable:drawing:end');
    },

    onCancelDrawing: function() {
        this.fireAndForward('editable:drawing:cancel');
    },

    onCommitDrawing: function() {
        this.fireAndForward('editable:drawing:commit');
    },

    startDrawing: function() {
        if (!this.drawing) this.drawing = L.Editable.FORWARD;
        this.tools.registerForDrawing(this);
        this.onStartDrawing();
    },

    commitDrawing: function() {
        this.onCommitDrawing();
        this.endDrawing();
    },

    cancelDrawing: function() {
        this.onCancelDrawing();
        this.endDrawing();
    },

    endDrawing: function() {
        this.drawing = false;
        this.tools.unregisterForDrawing(this);
        this.onEndDrawing();
    },

    onMouseMove: function(e) {
        if (this.drawing) {
            this.tools.newClickHandler.setLatLng(e.latlng);
        }
    },

    onTouch: function(e) {
        this.onMouseMove(e);
        if (this.drawing) this.tools.newClickHandler._fireMouseEvent(e);
    },

    onNewClickHandlerClicked: function(e) {
        this.fireAndForward('editable:drawing:click', e);
    },

    isNewClickValid: function(latlng) {
        return true;
    }

});

L.Editable.MarkerEditor = L.Editable.BaseEditor.extend({

    _clazzName: 'L.Editable.MarkerEditor',
    enable: function() {
        if (this._enabled) return this;
        L.Editable.BaseEditor.prototype.enable.call(this);
        this.feature.dragging.enable();
        this.feature.on('dragstart', this.onEditing, this);
        return this;
    },

    disable: function() {
        L.Editable.BaseEditor.prototype.disable.call(this);
        this.feature.dragging.disable();
        this.feature.off('dragstart', this.onEditing, this);
        return this;
    },

    onMouseMove: function(e) {
        if (this.drawing) {
            L.Editable.BaseEditor.prototype.onMouseMove.call(this, e);
            this.feature.setLatLng(e.latlng);
            this.tools.newClickHandler._bringToFront();
        }
    },

    onNewClickHandlerClicked: function(e) {
        if (!this.isNewClickValid(e.latlng)) return;
        // Send event before finishing drawing
        L.Editable.BaseEditor.prototype.onNewClickHandlerClicked.call(this, e);
        this.commitDrawing();
    }

});

L.Editable.PathEditor = L.Editable.BaseEditor.extend({

    _clazzName: 'L.Editable.PathEditor',
    CLOSED: false,
    MIN_VERTEX: 2,

    enable: function() {
        if (this._enabled) return this;
        L.Editable.BaseEditor.prototype.enable.call(this);
        if (this.feature) {
            this.initVertexMarkers();
        }
        return this;
    },

    disable: function() {
        return L.Editable.BaseEditor.prototype.disable.call(this);
    },

    initVertexMarkers: function() {
        // groups can be only latlngs (for polyline or symple polygon,
        // or latlngs plus many holes, in case of a complex polygon)
        var latLngGroups = this.getLatLngsGroups();
        for (var i = 0; i < latLngGroups.length; i++) {
            this.addVertexMarkers(latLngGroups[i]);
        }
    },

    getLatLngsGroups: function() {
        return [this.getLatLngs()];
    },

    getLatLngs: function() {
        return this.feature.getLatLngs();
    },

    reset: function() {
        this.editLayer.clearLayers();
        this.initVertexMarkers();
    },

    addVertexMarker: function(latlng, latlngs) {
        return new this.tools.options.vertexMarkerClass(latlng, latlngs, this);
    },

    addVertexMarkers: function(latlngs) {
        for (var i = 0; i < latlngs.length; i++) {
            this.addVertexMarker(latlngs[i], latlngs);
        }
    },

    addMiddleMarker: function(left, right, latlngs) {
        return new this.tools.options.middleMarkerClass(left, right, latlngs, this);
    },

    onVertexMarkerClick: function(e) {
        var index = e.vertex.getIndex();
        if (e.originalEvent.ctrlKey) {
            this.onVertexMarkerCtrlClick(e);
        } else if (e.originalEvent.altKey) {
            this.onVertexMarkerAltClick(e);
        } else if (e.originalEvent.shiftKey) {
            this.onVertexMarkerShiftClick(e);
        } else if (index >= this.MIN_VERTEX - 1 && index === e.vertex.getLastIndex() && this.drawing === L.Editable.FORWARD) {
            this.commitDrawing();
        } else if (index === 0 && this.drawing === L.Editable.BACKWARD && this._drawnLatLngs.length >= this.MIN_VERTEX) {
            this.commitDrawing();
        } else if (index === 0 && this.drawing === L.Editable.FORWARD && this._drawnLatLngs.length >= this.MIN_VERTEX && this.CLOSED) {
            this.commitDrawing(); // Allow to close on first point also for polygons
        } else {
            this.onVertexRawMarkerClick(e);
        }
    },

    onVertexRawMarkerClick: function(e) {
        if (!this.vertexCanBeDeleted(e.vertex)) return;
        e.vertex.delete();
        this.refresh();
    },

    vertexCanBeDeleted: function(vertex) {
        return vertex.latlngs.length > this.MIN_VERTEX;
    },

    onVertexDeleted: function(e) {
        this.fireAndForward('editable:vertex:deleted', e);
    },

    onVertexMarkerCtrlClick: function(e) {
        this.fireAndForward('editable:vertex:ctrlclick', e);
    },

    onVertexMarkerShiftClick: function(e) {
        this.fireAndForward('editable:vertex:shiftclick', e);
    },

    onVertexMarkerAltClick: function(e) {
        this.fireAndForward('editable:vertex:altclick', e);
    },

    onVertexMarkerContextMenu: function(e) {
        this.fireAndForward('editable:vertex:contextmenu', e);
    },

    onVertexMarkerMouseDown: function(e) {
        this.fireAndForward('editable:vertex:mousedown', e);
    },

    onMiddleMarkerMouseDown: function(e) {
        this.fireAndForward('editable:middlemarker:mousedown', e);
    },

    onVertexMarkerDrag: function(e) {
        this.fireAndForward('editable:vertex:drag', e);
    },

    onVertexMarkerDragStart: function(e) {
        this.fireAndForward('editable:vertex:dragstart', e);
    },

    onVertexMarkerDragEnd: function(e) {
        this.fireAndForward('editable:vertex:dragend', e);
    },

    startDrawing: function() {
        if (!this._drawnLatLngs) this._drawnLatLngs = this.getLatLngs();
        L.Editable.BaseEditor.prototype.startDrawing.call(this);
    },

    startDrawingForward: function() {
        this.startDrawing();
        this.tools.attachForwardLineGuide();
    },

    endDrawing: function() {
        L.Editable.BaseEditor.prototype.endDrawing.call(this);
        this.tools.detachForwardLineGuide();
        this.tools.detachBackwardLineGuide();
        delete this._drawnLatLngs;
    },

    addLatLng: function(latlng) {
        if (this.drawing === L.Editable.FORWARD) this._drawnLatLngs.push(latlng);
        else this._drawnLatLngs.unshift(latlng);
        this.refresh();
        this.addVertexMarker(latlng, this._drawnLatLngs);
    },

    newPointForward: function(latlng) {
        this.addLatLng(latlng);
        this.tools.anchorForwardLineGuide(latlng);
        if (!this.tools.backwardLineGuide._latlngs[0]) {
            this.tools.anchorBackwardLineGuide(latlng);
        }
    },

    newPointBackward: function(latlng) {
        this.addLatLng(latlng);
        this.tools.anchorBackwardLineGuide(latlng);
    },

    onNewClickHandlerClicked: function(e) {
        if (!this.isNewClickValid(e.latlng)) return;
        if (this.drawing === L.Editable.FORWARD) this.newPointForward(e.latlng);
        else this.newPointBackward(e.latlng);
        L.Editable.BaseEditor.prototype.onNewClickHandlerClicked.call(this, e);
    },

    onMouseMove: function(e) {
        if (this.drawing) {
            L.Editable.BaseEditor.prototype.onMouseMove.call(this, e);
            this.tools.moveForwardLineGuide(e.latlng);
            this.tools.moveBackwardLineGuide(e.latlng);
        }
    },

    refresh: function() {
        this.feature.redraw();
        this.onEditing();
    },

    /* Dragable methods for path. Not implemented in editable-0-7 github 
       onMove, _getEvents, onDragStart, onDrag, onDragEnd */

    onMove: function(e) {
        // 🍂namespace Editable
        // 🍂section Drawing events
        // 🍂event editable:drawing:move: Event
        // Fired when `move` mouse while drawing, while dragging a marker, and while dragging a vertex.
        this.fireAndForward('editable:drawing:move', e);
    },

    _getEvents: function() {
        return {
            dragstart: this.onDragStart,
            drag: this.onDrag,
            dragend: this.onDragEnd,
            remove: this.disable
        };
    },

    onDragStart: function(e) {
        this.onEditing();

        this.editLayer.clearLayers();

        // 🍂namespace Editable
        // 🍂event editable:dragstart: Event
        // Fired before a path feature is dragged.
        this.fireAndForward('editable:dragstart', e);
    },

    onDrag: function(e) {
        this.onMove(e);
        // 🍂namespace Editable
        // 🍂event editable:drag: Event
        // Fired when a path feature is being dragged.
        this.fireAndForward('editable:drag', e);
    },

    onDragEnd: function(e) {
        this.initVertexMarkers();
        // 🍂namespace Editable
        // 🍂event editable:dragend: Event
        // Fired after a path feature has been dragged.
        this.fireAndForward('editable:dragend', e);
    }

});

L.Editable.PolylineEditor = L.Editable.PathEditor.extend({

    _clazzName: 'L.Editable.PolylineEditor',
    startDrawingBackward: function() {
        this.drawing = L.Editable.BACKWARD;
        this.startDrawing();
        this.tools.attachBackwardLineGuide();
    },

    continueBackward: function() {
        this.tools.anchorBackwardLineGuide(this.getFirstLatLng());
        this.startDrawingBackward();
    },

    continueForward: function() {
        this.tools.anchorForwardLineGuide(this.getLastLatLng());
        this.startDrawingForward();
    },

    getLastLatLng: function() {
        return this.getLatLngs()[this.getLatLngs().length - 1];
    },

    getFirstLatLng: function() {
        return this.getLatLngs()[0];
    }

});

L.Editable.PolygonEditor = L.Editable.PathEditor.extend({

    _clazzName: 'L.Editable.PolygonEditor',
    CLOSED: true,
    MIN_VERTEX: 3,

    getLatLngsGroups: function() {
        var groups = L.Editable.PathEditor.prototype.getLatLngsGroups.call(this);
        if (this.feature._holes) {
            for (var i = 0; i < this.feature._holes.length; i++) {
                groups.push(this.feature._holes[i]);
            }
        }
        return groups;
    },

    startDrawingForward: function() {
        L.Editable.PathEditor.prototype.startDrawingForward.call(this);
        this.tools.attachBackwardLineGuide();
    },

    addNewEmptyHole: function() {
        var holes = Array();
        if (!this.feature._holes) {
            this.feature._holes = [];
        }
        this.feature._holes.push(holes);
        return holes;
    },

    newHole: function(latlng) {
        this._drawnLatLngs = this.addNewEmptyHole();
        this.startDrawingForward();
        if (latlng) this.newPointForward(latlng);
    },

    checkContains: function(latlng) {
        return this.feature._containsPoint(this.map.latLngToLayerPoint(latlng));
    },

    vertexCanBeDeleted: function(vertex) {
        if (vertex.latlngs === this.getLatLngs()) return L.Editable.PathEditor.prototype.vertexCanBeDeleted.call(this, vertex);
        else return true; // Holes can be totally deleted without removing the layer itself
    },

    isNewClickValid: function(latlng) {
        if (this._drawnLatLngs !== this.getLatLngs()) return this.checkContains(latlng);
        return true;
    },

    onVertexDeleted: function(e) {
        L.Editable.PathEditor.prototype.onVertexDeleted.call(this, e);
        if (!e.vertex.latlngs.length && e.vertex.latlngs !== this.getLatLngs()) {
            this.feature._holes.splice(this.feature._holes.indexOf(e.vertex.latlngs), 1);
        }
    }

});

L.Map.mergeOptions({
    polylineEditorClass: L.Editable.PolylineEditor
});

L.Map.mergeOptions({
    polygonEditorClass: L.Editable.PolygonEditor
});

L.Map.mergeOptions({
    markerEditorClass: L.Editable.MarkerEditor
});

var EditableMixin = {

    createEditor: function(map) {
        map = map ||  this._map;
        var Klass = this.options.editorClass ||  this.getEditorClass(map);
        return new Klass(map, this, this.options.editOptions);
    },

    enableEdit: function() {
        console.warn('enabling edition ... ');
        if (!this.editor) this.createEditor();
        if (this.multi) this.multi.onEditEnabled();
        return this.editor.enable();
    },

    editEnabled: function() {
        return this.editor && this.editor._enabled;
    },

    disableEdit: function() {
        if (this.editor) {
            if (this.multi) this.multi.onEditDisabled();
            this.editor.disable();
            delete this.editor;
        }
    },

    toggleEdit: function() {
        if (this.editEnabled()) {
            this.disableEdit();
        } else {
            this.enableEdit();
        }
    }

};

L.Polyline.include(EditableMixin);
L.Polygon.include(EditableMixin);
L.Marker.include(EditableMixin);

L.Polyline.include({

    _containsPoint: function(p, closed) { // Copy-pasted from Leaflet
        var i, j, k, len, len2, dist, part,
            w = this.options.weight / 2;

        if (L.Browser.touch) {
            w += 10; // polyline click tolerance on touch devices
        }

        for (i = 0, len = this._parts.length; i < len; i++) {
            part = this._parts[i];
            for (j = 0, len2 = part.length, k = len2 - 1; j < len2; k = j++) {
                if (!closed && (j === 0)) {
                    continue;
                }

                dist = L.LineUtil.pointToSegmentDistance(p, part[k], part[j]);

                if (dist <= w) {
                    return true;
                }
            }
        }
        return false;
    },

    getEditorClass: function(map) {
        return map.options.polylineEditorClass;
    }

});
L.Polygon.include({

    _containsPoint: function(p) { // Copy-pasted from Leaflet
        var inside = false,
            part, p1, p2,
            i, j, k,
            len, len2;

        // TODO optimization: check if within bounds first

        if (L.Polyline.prototype._containsPoint.call(this, p, true)) {
            // click on polygon border
            return true;
        }

        // ray casting algorithm for detecting if point is in polygon

        for (i = 0, len = this._parts.length; i < len; i++) {
            part = this._parts[i];

            for (j = 0, len2 = part.length, k = len2 - 1; j < len2; k = j++) {
                p1 = part[j];
                p2 = part[k];

                if (((p1.y > p.y) !== (p2.y > p.y)) &&
                    (p.x < (p2.x - p1.x) * (p.y - p1.y) / (p2.y - p1.y) + p1.x)) {
                    inside = !inside;
                }
            }
        }

        return inside;
    },

    getEditorClass: function(map) {
        return map.options.polygonEditorClass;
    }

});

L.Marker.include({

    getEditorClass: function(map) {
        return map.options.markerEditorClass;
    }

});

var MultiEditableMixin = {

    enableEdit: function() {
        this.eachLayer(function(layer) {
            layer.multi = this;
            layer.enableEdit();
        }, this);
    },

    disableEdit: function() {
        this.eachLayer(function(layer) {
            layer.disableEdit();
        });
    },

    toggleEdit: function(e) {
        if (!e.layer.editor) {
            this.enableEdit(e);
        } else {
            this.disableEdit();
        }
    },

    onEditEnabled: function() {
        if (!this._editEnabled) {
            this._editEnabled = true;
            this.fire('editable:multi:edit:enabled');
        }
    },

    onEditDisabled: function() {
        if (this._editEnabled) {
            this._editEnabled = false;
            this.fire('editable:multi:edit:disabled');
        }
    },

    editEnabled: function() {
        return !!this._editEnabled;
    }

};
L.MultiPolygon.include(MultiEditableMixin);
L.MultiPolyline.include(MultiEditableMixin);


/// end extensions and enhacement for leaflet 0.7
/** 
 * [uxleaflet/client]
 * https://github.com/rowanwins/leaflet-easyPrint
 */
(function() {
    
    
    if (!window.L) {
        throw new Error('EasyPrint needs Leaflet');
    }

    /**
     * EasyPrint control class for Leaflet
     */
    L.Control.EasyPrint = L.Control.extend({
        options: {
            title: 'Print map',
            position: 'topleft'
        },
        printPage: function () {
            var htmlElementsToHide;
            if (this.options.elementsToHide) {
                htmlElementsToHide = document.querySelectorAll(this.options.elementsToHide);

                for (var i = 0; i < htmlElementsToHide.length; i++) {
                    htmlElementsToHide[i].className = htmlElementsToHide[i].className + ' _epHidden';
                }
            }
        this._map.fire('beforePrint');
            window.print();
            this._map.fire('afterPrint');
            if (this.options.elementsToHide) {
                htmlElementsToHide = document.querySelectorAll(this.options.elementsToHide);
                for (var j = 0; j < htmlElementsToHide.length; j++) {
                    htmlElementsToHide[j].className = htmlElementsToHide[j].className.replace(' _epHidden', '');
                }
            }
        },
        onAdd: function() {
            var container = L.DomUtil.create('div', 'leaflet-control-easyPrint leaflet-bar leaflet-control');

            this.link = L.DomUtil.create('a', 'leaflet-control-easyPrint-button leaflet-bar-part', container);
            this.link.id = 'leafletEasyPrint';
            this.link.title = this.options.title;

            L.DomEvent.addListener(this.link, 'click', this.printPage, this);
            L.DomEvent.disableClickPropagation(container);

            return container;
        }

    });

    /** Shortcut to new L.Control.EasyPrint.
     *  Add custom css to header 
     */
    L.easyPrint = function(options) {
        addCSS();
        return new L.Control.EasyPrint(options);
    };

    // private functinos

   

    function addCSS() {
        var css = document.createElement('style');
        css.type = 'text/css';
        css.innerHTML = '.leaflet-control-easyPrint a {' +
            'background-image: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTI7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8cGF0aCBkPSJNMTI4LDMyaDI1NnY2NEgxMjhWMzJ6IE00ODAsMTI4SDMyYy0xNy42LDAtMzIsMTQuNC0zMiwzMnYxNjBjMCwxNy42LDE0LjM5OCwzMiwzMiwzMmg5NnYxMjhoMjU2VjM1Mmg5NiAgIGMxNy42LDAsMzItMTQuNCwzMi0zMlYxNjBDNTEyLDE0Mi40LDQ5Ny42LDEyOCw0ODAsMTI4eiBNMzUyLDQ0OEgxNjBWMjg4aDE5MlY0NDh6IE00ODcuMTk5LDE3NmMwLDEyLjgxMy0xMC4zODcsMjMuMi0yMy4xOTcsMjMuMiAgIGMtMTIuODEyLDAtMjMuMjAxLTEwLjM4Ny0yMy4yMDEtMjMuMnMxMC4zODktMjMuMiwyMy4xOTktMjMuMkM0NzYuODE0LDE1Mi44LDQ4Ny4xOTksMTYzLjE4Nyw0ODcuMTk5LDE3NnoiIGZpbGw9IiMwMDAwMDAiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K);' +
            'background-size:16px 16px;' +
            'cursor: pointer;' +
        '}' +
        '._epHidden{' +
            'display:none!important;' +
        '}' +
        '@media print {' +
            'html {padding: 0px!important;}' +
            '.leaflet-control-easyPrint-button{display: none!important;}' +
        '}';
        document.body.appendChild(css);
    }

})();
/* 
 * [uxleaflet/client]
 * Requerido por editor de geometrías. Pendiente de añadir como script externo en HEAD 
   https://github.com/Leaflet/Path.Drag.js/blob/gh-pages/src/Path.Drag.js */



/* A Draggable that does not update the element position
and takes care of only bubbling to targetted path in Canvas mode. */
L.PathDraggable = L.Draggable.extend({

    initialize: function(path) {
        this._path = path;
        this._canvas = path._map.getRenderer && (path._map.getRenderer(path) instanceof L.Canvas);
        var element = this._canvas ? this._path._map.getRenderer(this._path)._container : this._path._path;
        L.Draggable.prototype.initialize.call(this, element, element, true);
    },

    _updatePosition: function() {
        var e = { originalEvent: this._lastEvent };
        this.fire('drag', e);
    },

    _onDown: function(e) {
        var first = e.touches ? e.touches[0] : e;
        this._startPoint = new L.Point(first.clientX, first.clientY);
        if (this._canvas && !this._path._containsPoint(this._path._map.mouseEventToLayerPoint(first))) { return; }
        L.Draggable.prototype._onDown.call(this, e);
    }

});


L.Handler.PathDrag = L.Handler.extend({

    initialize: function(path) {
        this._path = path;
    },

    getEvents: function() {
        return {
            dragstart: this._onDragStart,
            drag: this._onDrag,
            dragend: this._onDragEnd
        };
    },

    addHooks: function() {
        if (!this._draggable) { this._draggable = new L.PathDraggable(this._path); }
        this._draggable.on(this.getEvents(), this).enable();
        L.DomUtil.addClass(this._draggable._element, 'leaflet-path-draggable');
    },

    removeHooks: function() {
        this._draggable.off(this.getEvents(), this).disable();
        L.DomUtil.removeClass(this._draggable._element, 'leaflet-path-draggable');
    },

    moved: function() {
        return this._draggable && this._draggable._moved;
    },

    _onDragStart: function() {
        this._startPoint = this._draggable._startPoint;
        this._path
            .closePopup()
            .fire('movestart')
            .fire('dragstart');
    },

    _onDrag: function(e) {
        var path = this._path,
            event = (e.originalEvent.touches && e.originalEvent.touches.length === 1 ? e.originalEvent.touches[0] : e.originalEvent),
            newPoint = L.point(event.clientX, event.clientY),
            latlng = path._map.layerPointToLatLng(newPoint);

        this._offset = newPoint.subtract(this._startPoint);
        this._startPoint = newPoint;

        this._path.eachLatLng(this.updateLatLng, this);
        path.redraw();

        e.latlng = latlng;
        e.offset = this._offset;
        path.fire('move', e)
            .fire('drag', e);
    },

    _onDragEnd: function(e) {
        if (this._path._bounds) this.resetBounds();
        this._path.fire('moveend')
            .fire('dragend', e);
    },

    latLngToLayerPoint: function(latlng) {
        // Same as map.latLngToLayerPoint, but without the round().
        var projectedPoint = this._path._map.project(L.latLng(latlng));
        return projectedPoint._subtract(this._path._map.getPixelOrigin());
    },

    updateLatLng: function(latlng) {
        var oldPoint = this.latLngToLayerPoint(latlng);
        oldPoint._add(this._offset);
        var newLatLng = this._path._map.layerPointToLatLng(oldPoint);
        latlng.lat = newLatLng.lat;
        latlng.lng = newLatLng.lng;
    },

    resetBounds: function() {
        this._path._bounds = new L.LatLngBounds();
        this._path.eachLatLng(function(latlng) {
            this._bounds.extend(latlng);
        });
    }

});

L.Path.include({

    eachLatLng: function(callback, context) {
        context = context || this;
        var loop = function(latlngs) {
            for (var i = 0; i < latlngs.length; i++) {
                if (L.Util.isArray(latlngs[i])) loop(latlngs[i]);
                else callback.call(context, latlngs[i]);
            }
        };
        loop(this.getLatLngs ? this.getLatLngs() : [this.getLatLng()]);
    }

});

L.Path.addInitHook(function() {

    this.dragging = new L.Handler.PathDrag(this);
    if (this.options.draggable) {
        this.once('add', function() {
            this.dragging.enable();
        });
    }

});


/**
 * L.LocalTileLayer hace uso de Tiles en local.
 * No se implementa como clase hija de L.TileLayer sino que se hackea L.TileLayer
 * para que tenga en cuenta la funcionalidad de tiles en local.
 * carga los tiles desde un url o desde localstorge.
 */
(function() {

    if (!L.Map) return;

    var ERR_TILE = '';
    var NOT_FOUND_TILE = '';

    L.TileLayer.DEFAULT_LS_KEY = 'currentlocaltiles'; // key for localStorage 
    L.TileLayer.LOCAL_MAX_VIEW_ZOOM = 16; // Zoom for view when current layer in map 

    var _tileLayerInitialize = L.TileLayer.prototype.initialize;
    L.TileLayer.prototype.initialize = function() {
        _tileLayerInitialize.apply(this, arguments);

        var url = arguments[0] || '__';
        var parts = url.split('_');
        // check if '_$local_[TILE_FILE_NAME]_{z}/{x}/{y}';
        // {z}/{x}/{y} must match with tile organization in file.
        var localItem = parts[1]; // part of a local layer description
        if (localItem === '$local') {
            this.options.maxNativeZoom = L.TileLayer.LOCAL_MAX_VIEW_ZOOM;
            this.options.minZoom = 4;
            this._isLocalLayer = true;
            if (!this._localTiles) {
                var jsonName = parts[2] || L.TileLayer.DEFAULT_LS_KEY;
                var sContent = localStorage.getItem(jsonName);
                this._isUsingLocalTiles = true;
                if (sContent) {
                    console.info('Detected offline layer from localStorage: ' + jsonName);
                    this.changeTileDataFromJson(sContent);
                } else {
                    console.info('Detected offline layer: ' + jsonName);
                    var jsonPathFileName = './sampledata/tiles-' + jsonName + '.json';
                    this.changeTileDataFromUrl(jsonPathFileName);
                }
            }
        }

        // eliminar cuando ya se puedan generar los json con todos los tiles de una zona
        if (this._url && this._url.indexOf('172.') > 0) {
            if (this._url.indexOf('smara/')) {
                this._defaultView = { zoom: 16, center: { lat: 26.7420, lng: -11.7006 } };
            }
        }

    };

    /**
     * It include methods for LayerControl. 
     * It allow management of unique local layer.
     */
    L.Control.Layers.include({
        /* */
        setLocalTilesFromLocalstorage: function(key) {
            var sData = localStorage.getItem(key);
            if (sData && this._localLayer) {
                this._localLayer.changeTileDataFromJson(sData);
                this._map.update();
            }
        },
        /* */
        setLocalTilesFromUrl: function(jsonUrl) {
            if (jsonUrl && this._localLayer) {
                this._localLayer.changeTileDataFromUrl(jsonUrl);
                this._map.update();
            }
        }
    });

    /**
     * This method is implemented only for LocalTileLayers changeTileDataFromUrl
     */
    L.TileLayer.prototype.changeTileDataFromUrl = function(jsonPathFileName) {
        if (!this._isLocalLayer) {
            throw 'This layer is not a Local TileLayer';
        }
        var _thisLayer = this;
        getJson(jsonPathFileName,
            function(jsonData) {
                try {
                    var tiles = _thisLayer._localTiles = JSON.parse(jsonData);
                    var n = 0;
                    for (var key in tiles) {
                        n += (key.indexOf('/') > 0) ? 1 : 0;
                    }
                    console.info('Loaded tiles offline: ' + jsonPathFileName + '\n Tile count:' + n +
                        '\n Map View: ', tiles.mapview);
                } catch (err) {
                    console.info('Fail parsing json file container of tiles: ' + jsonPathFileName + '\n', err);
                }
            },
            function(err) {
                console.info('Fail response. ' + jsonPathFileName, err);
            }
        );
    };

    /**
     * 
     */
    L.TileLayer.prototype.changeTileDataFromJson = function(tileSetJson) {
        try {
            var tiles = this._localTiles = JSON.parse(tileSetJson);
            var n = 0;
            for (var key in tiles) {
                n += (key.indexOf('/') > 0) ? 1 : 0;
            }
            console.info('Loaded tiles offline from localstorage\n Tile count:' + n +
                '\n Map View: ', tiles.mapview);
        } catch (err) {
            console.info('Fail parsing json content \n', err);
        }
    };

    /**
     * return map view for most top level and center on bounding box tiles
     */
    L.TileLayer.prototype.getHomeInfo = function() {
        if (this._isUsingLocalTiles) {
            return this._localTiles && this._localTiles.mapview || {};
        } else {
            return this._defaultView || {};
        }
    };

    var _tileLayerGetTileUrl = L.TileLayer.prototype.getTileUrl;
    L.TileLayer.prototype.getTileUrl = function(tilePoint) {
        if (!this._isUsingLocalTiles) {
            if (!this._url) {
                this._url = '//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
            }

            return _tileLayerGetTileUrl.apply(this, arguments);
        }

        // check if '_$local_[TILE_FILE_NAME]_{z}/{x}/{y}';
        var url = L.Util.template(this._url, L.extend({
            s: this._getSubdomain(tilePoint),
            z: tilePoint.z,
            x: tilePoint.x,
            y: tilePoint.y
        }, this.options));

        var entry = url.split('_')[3]; //  '...l_{z}/{x}/{y}';
        if (entry) {
            entry = entry.split('.')[0]; // remove posible extension
            var srcData = this._localTiles && (this._localTiles[entry] || NOT_FOUND_TILE) || ERR_TILE;
            return srcData;
        }
    };

    /* Static function. Utility implemented in L.TileLayer
     * Returns a file containg image tiles grouped in a TileSet.
     * @param {*} url 
     * @param {*} resolve 
     * @param {*} reject 
     */
    L.TileLayer.getJson = getJson;

    /**
     * Pendiente de reemplazar por $http (que asegure devolver JSON)
     * @param {*} url 
     * @param {*} resolve 
     * @param {*} reject 
     */
    function getJson(url, resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 300) {
                var data = xhr.response;
                if (data[0] === '{') {
                    // valid JSON
                    resolve(data);
                } else {
                    // not expected data
                    reject('Invalid json. Expected start with \'{\'. Response start with: ' + data.substring(0, 20));
                }
            } else {
                reject('Invalid request for ' + url, xhr.statusText);
            }
        };
        xhr.onerror = function() {
            // internal error
            reject(xhr.statusText);
        };
        xhr.send(null);
    }

})(); // LocalTileLayer TESTING


/**
 * LocalTileLayerSet representa un conjunto de tiles para uso en navagación offline.
 * Los tiles estarán guardados en memoria local
 * - Podrán ser descargados en un único fichero en formato JSON.
 * - Podrán ser descargados uno a uno desde el servidor para formar en memoria un objeto javascript
 *    que será guardado en formato JSON en localstorage.
 * 
 * Depende de UxMap.js
 */
(function() {

    if (!L.Map) return;

    // Static values
    var MIN_DOWNLOAD_ZOOM = 12;
    var DEFAULT_LS_KEY = 'currentlocaltiles'; // key for localStorage

    // Classes

    /**
     * 
     * @param {*} key 
     * @param {*} url 
     */
    function TileInfo(key, url) {
        this.key = key;
        this.url = url;
        this.data = null;

        /**
         * 
         */
        this.load = function(sucessCallback, errorCallback) {
            var _this = this;

            var parts = this.url.split('.');
            var ext = parts.length === 1 ? 'png' : parts[parts.length - 1];

            var xhr = new XMLHttpRequest();
            xhr.responseType = 'arraybuffer';
            xhr.open('GET', url);
            xhr.onload = function () {
                if (xhr.status >= 200 && xhr.status < 300) {
                    convertArrayToUrlData(xhr.response, ext, function (urlData) {
                        _this.data = urlData;
                        sucessCallback(_this);
                    });
                } else {
                    errorCallback('not found ' + url, xhr.statusText);
                }
            };
            xhr.onerror = function() {
                // internal error
                errorCallback(xhr.statusText);
            };
            xhr.send(null);
        };

        /**
         * Store the arrayBuffer data in dataUrl format (using base64 encoding)
         */
        function convertArrayToUrlData(arrayBuffer, imageType, sucessCallback) {

            var prefixImage = 'data:image/' + imageType + ';base64,';
            var blob = new Blob([arrayBuffer], { type: 'application/octet-binary' });
            var reader = new FileReader();
            
            reader.onload = function(evt) {
                var b64Data = evt.target.result.split(',');
                if (b64Data[0].startsWith('data')) {
                    var dataUrl = prefixImage + b64Data[1];
                    sucessCallback(dataUrl);
                } else {
                    console.error('interval error: invalid data as base64');
                }
            };
            reader.readAsDataURL(blob);
        }

    }

    /**
     * LocalTileSet keep image data for a range or tiles bounding by a center and current-zoom parameters 
     * and a zoom range from 5 to MAX_LEVEL.
     * Current-zoom must be greater or equal than MIN_DOWNLOAD_ZOOM
     */
    L.LocalTileSet = L.Class.extend({

        options: {

        },

        _refTileLayer: null,

        _localTileLayer: null,

        _zoom: null,
        _center: null,
        _tileInfos: [],

        /**
         * Convert to json:
         * { 'mapview': ((center and zoom), '11/1/1': 'data:bas64...', '11/1/2': 'data:bas64...', )}
         */
        tileSetToJson: function() {
            var lat = this._center.lat || this._center[1] || 0.00;
            var lng = this._center.lng || this._center[0] | 0.00;
            var obj = {};
            obj.mapview = { 'zoom': this._zoom, 'center': { 'lat': lat, 'lng': lng } };
            for (var i = 0; i < this._tileInfos.length; i += 1) {
                var tileInfo = this._tileInfos[i];
                obj[tileInfo.key] = tileInfo.data;
            }
            return JSON.stringify(obj, null, 2); // pretty print tab:2
        },

        initialize: function(localTileLayer, refTileLayer) {
            this._localTileLayer = localTileLayer;
            if (refTileLayer instanceof L.TileLayer) {
                this._refTileLayer = refTileLayer;
            } else {
                throw 'argument exception: it is needed a TileLayer';
            }
        },

        /**
         * updateTileRange from a map (its current tileLayer), selecting all tiles
         * included in the current view from a min zoom to a max zoom,
         * and set home center and zoom.
         */
        updateTileRange: function(minLevel, maxLevel, map) {

            // set home location
            this._center = map.getCenter();
            this._zoom = map.getZoom();

            // reset tileInfos
            this._tileInfos = [];
            var latlngBounds = map.getBounds(); // in latlng

            for (var z = minLevel; z <= maxLevel; z += 1) {
                var pixelBounds = this.getPixelBounds(map, z, latlngBounds);
                var tileSize = this._refTileLayer._getTileSize();

                var tileBounds = L.bounds(
                    pixelBounds.min.divideBy(tileSize)._floor(),
                    pixelBounds.max.divideBy(tileSize)._floor());

                var zoomTileInfos = this._getTileInfosFrom(tileBounds, z);
                this._tileInfos = this._tileInfos.concat(zoomTileInfos);
            }

        },

        /**
         * Copiado de leaflet 0.7.7. 
         * FIXME - Pendiente de optimizar. Sobra el uso de :container y fragment.
         */
        _getTileInfosFrom: function(bounds, zoom) {
            var queue = [];
            var center = bounds.getCenter();

            var j, i, point;
            for (j = bounds.min.y; j <= bounds.max.y; j++) {
                for (i = bounds.min.x; i <= bounds.max.x; i++) {
                    point = new L.Point(i, j);
                    queue.push(point);
                }
            }

            var tilesToLoad = queue.length;

            // if its the first batch of tiles to load
            console.info('Descarga desde zoom: ' + zoom + ', cantidad: ' + tilesToLoad);

            if (tilesToLoad === 0) { return []; }

            // load tiles in order of their distance to center
            queue.sort(function(a, b) {
                return a.distanceTo(center) - b.distanceTo(center);
            });

            var tileInfos = [];
            for (i = 0; i < tilesToLoad; i++) {
                var tilePoint = queue[i];
                tilePoint.z = zoom;
                var key = tilePoint.z + '/' + tilePoint.x + '/' + tilePoint.y;
                var tileUrl = this._refTileLayer.getTileUrl(tilePoint);
                this._tileInfos.push(new TileInfo(key, tileUrl));
                console.info('* Tile desde: ' + tileUrl);
            }
            return tileInfos;
        },

        startLoading: function(options, successCallback, progressCallback) {
            var tileInfos = this._tileInfos;
            var total = tileInfos.length;
            var remain = total;

            function oneLess() {
                remain -= 1;
                if (remain <= 0) {
                    successCallback();
                }
            }

            var okis = 0;
            var fails = 0;

            function Promisse2() {
                this.success = function () {
                    progressCallback(okis + 1, fails, total);
                    okis += 1;
                    oneLess();
                };
                this.reject = function () {
                    oneLess();
                };
            }
            var promisse2 = new Promisse2();
            for (var i = 0; i < total; i += 1) {
                var tileInfo = tileInfos[i];
                tileInfo.load(promisse2.success, promisse2.reject);
            }
            console.info('Downloading started for bb centered in ' + this.center);
        },

        getPixelBounds: function(map, zoom, latlngBounds) {
            var sw0 = map.options.crs.latLngToPoint(latlngBounds.getSouthWest(), zoom);

            var bottomLeft = this.project(map, zoom, latlngBounds.getSouthWest());
            var topRight = this.project(map, zoom, latlngBounds.getNorthEast());
            return new L.Bounds(bottomLeft, topRight);
        },

        project: function(map, zoom, latlng) { // (LatLng[, Number]) -> Point
            return map.options.crs.latLngToPoint(L.latLng(latlng), zoom);
        },

        getTileCount: function() {
            var child = this._tileInfos.length;
        },

        _0: ''
    });

    /**
     * L.Control.LocalTileControl is a control that manage CotnrolLayers adding a special TileLayer whose source
     * data is obtained from JSON (accessed by url) or localstorage content (accessed by fixed key name).
     */
    L.Control.LocalTileControl = L.Control.extend({
        options: {
            title: 'Reset Local base tile layer',
            position: 'topright'
        },

        onAdd: function() {
            var container = L.DomUtil.create('div', 'leaflet-control-localtiles leaflet-bar leaflet-control');
            container.style.position = 'relative';
            var _thisControl = this;

            this.progressLabel = L.DomUtil.create('div', 'leaflet-control-localtiles-progress leaflet-bar-part', container);
            /**  leaflet-control-localtiles-progress */
            this.progressLabel.style.position = 'absolute';
            this.progressLabel.style.display = 'none';
            this.progressLabel.style.right = '36px';
            this.progressLabel.style.left = 'auto';
            this.progressLabel.style.width = '70px';
            this.progressLabel.style.textAlign = 'center';
            this.progressLabel.style.float = 'left';
            this.progressLabel.style.backgroundColor = '#e0e0e0';
            this.progressLabel.style.color = '#ff7040';

            this.link = L.DomUtil.create('a', 'leaflet-control-localtiles-button leaflet-bar-part', container);
            this.link.title = this.options.title;

            L.DomEvent.addListener(this.link, 'click', function() { resetTiles(_thisControl); }, this);
            L.DomEvent.disableClickPropagation(container);

            return container;
        },

        disable: function() {
            this.link.classList.add('leaflet-disabled');
            this.progressLabel.style.display = 'block';
            this.progressLabel.innerHTML = 'downloading...';
        },

        enable: function() {
            this.link.classList.remove('leaflet-disabled');
            this.progressLabel.style.display = 'none';
        },

        setProgressText: function(text) {
            this.progressLabel.innerHTML = text;
        },

        resetTiles: function() {
            resetTiles.apply(this, arguments);
        },

        _refresDefaultLocalLayer: function(sJson) {
            var mainLayerControl = this._map._mainLayerControl;
            if (!mainLayerControl) {
                console.error('this map is not a UX map. Not found mainLayerControl');
                return;
            }
            var localLayer = this._map._mainLayerControl._localLayer;
            if (localLayer) {
                localLayer.changeTileDataFromJson(sJson);
                this._map.setZoom(this._map.getZoom()); // this._map._update();
            }
        }

    });

    L.LocalTileSet.MIN_DOWNLOAD_ZOOM = MIN_DOWNLOAD_ZOOM;
    L.Control.LocalTileControl.recalculateTileset = recalculateTileset;

    // nueva opción para L.Map
    L.Map.mergeOptions({
        localtiles: false, // trye || 'my-name' || urlName:'my-name' // access name in localstorage
    });

    L.Map.addInitHook(function() {
        if (this.options.localtiles) {
            var DEFAULT_NAME = 'localtiles';
            // probar --- obtención de name
            var name = (typeof this.options.localtiles === 'string') ? this.options.localtiles : (this.options.localtiles.urlName || DEFAULT_NAME);
            this.positionControl = new L.Control.LocalTileControl({ keyname: name });
            this.addControl(this.positionControl);
        }
    });

    //
    // internal functions
    // 

    /**
     * It is called from clic event in a L.LocalTileControl.
     * this ask confirmation to user to continue reseting tiles and home location
     * @param {*} lControl 
     */
    function resetTiles(lControl) {
        var map = lControl && lControl._map;
        if (!map) {
            console.error('Error interno. Falta referencia a mapa en Control LocalTileControl');
            return;
        }
        var currentResolution = map.getZoom();
        if (currentResolution < MIN_DOWNLOAD_ZOOM) {
            alert('Zoom demasiado lejano: ' + currentResolution + '\nAl menos debe ser ' + MIN_DOWNLOAD_ZOOM);
            return;
        }

        var minResolution = 6;
        var maxResolution = 17;
        // calcular tiles necesarios para el 'envelope' actual hasta un nivel de 18

        var tileset = recalculateTileset(minResolution, maxResolution, map);

        // msotrar un cuadro de diálogo para indicar lo que se va a hacer.
        var result = window.confirm('WARN: Current stored tiles will be deleted. \n' +
            'Then, it will be loaded ' + tileset._tileInfos.length + ' tiles replacing old tiles for offset navigation',
            'Offline tile replacement');
        if (result === false) {
            // no continue
            return;
        }
        var jsonName = prompt('Enter \'new\' word of a name for searching in public/sampledata/files-NAME.json \n (salonica25, smara, smara-topo)', 'new');
        if (!jsonName) {
            return;
        }

        if (jsonName === 'new') {
            // desactivar botón llamador
            lControl.disable();
            // carga de nuevos tiles
            var tileInfos = tileset._tileInfos;
            var LS_KEY = L.TileLayer.DEFAULT_LS_KEY;
            // inicio descarga de tiles en segundo plano.
            tileset.startLoading({},
                function() { // success/end
                    lControl.setProgressText('OK: ' + tileset._tileInfos.length + ' tiles');
                    var s = tileset.tileSetToJson();
                    console.info('Json tileSet have a size in bytes of ' + s.length);
                    var oldValue = localStorage.getItem(LS_KEY);
                    try {
                        // try store with a key in localStorage
                        localStorage.removeItem(LS_KEY);
                        localStorage.setItem(LS_KEY, s);
                        alert('local tiles downloaded: ' + tileInfos.length);
                        lControl._refresDefaultLocalLayer(s);
                        console.info('local base layer refreshed');
                    } catch (err) {
                        if (oldValue) localStorage.setItem(LS_KEY, oldValue);
                        alert('Error saving tileSet in localstorage\n\n' + err.message);
                        try {
                            var blob = new Blob([s], { type: 'text/JSON' });
                            // try store in a local folder (default is system 'download' folder)
                            L.Util.saveAs(blob, LS_KEY + '.json');
                            alert('WARN. json has been downloaded in local folder');
                        } catch (err2) {
                            alert('Error saving tileSet in local folder\n\n' + err2.message);
                        }
                    }
                    lControl.enable(); //.link.classList.remove('leaflet-disabled');
                },
                function(loaded, fails, total) {
                    var left = total - loaded;
                    lControl.setProgressText('Left ' + left);
                });

        } else {
            var jsonPathFileName = './sampledata/tiles-' + jsonName + '.json';
            console.info('Probando cargar tiles desde ' + jsonPathFileName);
            var oLayer = map._mainLayerControl._localLayer;
            if (oLayer) {
                oLayer.changeTileDataFromUrl(jsonPathFileName);
            }
        }

        console.error('AVISO. Sin implementar reseteado de tiles para navegación offline');
    }

    /**
     * Recalculate all tiles needed for a range of zoom and current boundingBox showed in map.
     * NOTE: Current zoom in map is limited to 16 (MIN_DOWNLOAD_ZOOM)
     * @param {*} minRes 
     * @param {*} maxRes 
     * @param {*} map 
     */
    function recalculateTileset(minRes, maxRes, map) {

        if (!map._mainLayerControl) { console.error('Invalid leaflet. No mainLayercontrol found'); return; }
        if (!map._mainLayerControl._localLayer) { console.error('Invalid leaflet. No locallayer defined'); return; }

        var localLayer = map._mainLayerControl._localLayer;
        var currentLayer = getCurrentNoLocalBaseLayer(map);
        var rnd = new Date().getMilliseconds();
        var tileSet = new L.LocalTileSet(localLayer, currentLayer);
        tileSet.updateTileRange(minRes, maxRes, map);
        return tileSet;

    }

    function getCurrentNoLocalBaseLayer(map) {
        // TODO - obtener la capa base actual que no se Local.
        var first = null;
        for (var key in map._layers) {
            var oLayer = map._layers[key];
            if (oLayer instanceof L.TileLayer) {
                if (first === null) {
                    first = oLayer;
                }
                // TODO - cómo saber si esta capa es la actual.
                // si es la base actual then
                //   return oLayer;
            }
        }
        return first;
    }

    // TODO - añadir css a 
    // .leaflet-control-container .leaflet-control-localtiles a {
    //    background-size: 16px 16px;
    //    cursor: pointer;
    // }
    // .leaflet-control-container .leaflet-control-localtiles a:before {
    //    content: '\f02c';
    //    font-size: 20px;
    // }

})(); // LocalTileLayer TESTING
// Limit leaflet map zoom to a list of variants
// Written by Ilya Zverev, licensed WTFPL

// DESACTIVADO por defecto. No es compatible con el plugin de zoom 'continuo' usado por adf-widget-hmi.
//  Se puede activar según capa base. Probar en UxMap.js, linea 236


L.Map.mergeOptions({
    zooms: undefined // Ejemplo: [1, 2, 3, 4, 5, 6, 7, 8, 9, 12, 15, 18] 
});

L.Map.include({
    _limitZoom: function(zoom) {
        var zooms = this.options.zooms;
        var snap;
        if (!zooms || !('length' in zooms) || !zooms.length) {
            var min = this.getMinZoom();
            var max = this.getMaxZoom();
            snap = L.Browser.any3d ? this.options.zoomSnap : 1;
            if (snap) {
                zoom = Math.round(zoom / snap) * snap;
            }
            return Math.max(min, Math.min(max, zoom));
        } else {
            var z, d = 100,
                i, dist;
            var dz = -1,
                dd = 100,
                dir = zoom - this._zoom;
            snap = L.Browser.any3d ? this.options.zoomSnap : 1;
            if (snap) {
                zoom = Math.round(zoom / snap) * snap;
            }
            for (i = 0; i < zooms.length; i++) {
                dist = Math.abs(zooms[i] - zoom);
                if (dist < d) {
                    z = zooms[i];
                    d = dist;
                }
                if (dir * (zooms[i] - this._zoom) > 0 && dist < dd) {
                    dz = zooms[i];
                    dd = dist;
                }
            }
            return dz < 0 ? z : dz;
        }
    }
});
/* 
 * [uxleaflet/client]
 * No aparece en github. Viene 'minificado' en algunos proyectos de prueba 
 * Requerido por l-editable-b.js */

/*
 * @class Evented
 * @aka L.Evented
 * @inherits Class
 *
 * A set of methods shared between event-powered classes (like `Map` and `Marker`). Generally, events allow you to execute some function when something happens with an object (e.g. the user clicks on the map, causing the map to fire `'click'` event).
 *
 * @example
 *
 * ```js
 * map.on('click', function(e) {
 * 	alert(e.latlng);
 * } );
 * ```
 *
 * Leaflet deals with event listeners by reference, so if you want to add a listener and then remove it, define it as a function:
 *
 * ```js
 * function onClick(e) { ... }
 *
 * map.on('click', onClick);
 * map.off('click', onClick);
 * ```
 */


L.Evented = L.Class.extend({

    
    /* @method on(type: String, fn: Function, context?: Object): this
     * Adds a listener function (`fn`) to a particular event type of the object. You can optionally specify the context of the listener (object the this keyword will point to). You can also pass several space-separated types (e.g. `'click dblclick'`).
     *
     * @alternative
     * @method on(eventMap: Object): this
     * Adds a set of type/listener pairs, e.g. `{click: onClick, mousemove: onMouseMove}`
     */
    on: function(types, fn, context) {

        // types can be a map of types/handlers
        if (typeof types === 'object') {
            for (var type in types) {
                // we don't process space-separated events here for performance;
                // it's a hot path since Layer uses the on(obj) syntax
                this._on(type, types[type], fn);
            }

        } else {
            // types can be a string of space-separated words
            types = L.Util.splitWords(types);

            for (var i = 0, len = types.length; i < len; i++) {
                this._on(types[i], fn, context);
            }
        }

        return this;
    },

    /* @method off(type: String, fn?: Function, context?: Object): this
     * Removes a previously added listener function. If no function is specified, it will remove all the listeners of that particular event from the object. Note that if you passed a custom context to `on`, you must pass the same context to `off` in order to remove the listener.
     *
     * @alternative
     * @method off(eventMap: Object): this
     * Removes a set of type/listener pairs.
     *
     * @alternative
     * @method off: this
     * Removes all listeners to all events on the object.
     */
    off: function(types, fn, context) {

        if (!types) {
            // clear all listeners if called without arguments
            delete this._events;

        } else if (typeof types === 'object') {
            for (var type in types) {
                this._off(type, types[type], fn);
            }

        } else {
            types = L.Util.splitWords(types);

            for (var i = 0, len = types.length; i < len; i++) {
                this._off(types[i], fn, context);
            }
        }

        return this;
    },

    // attach listener (without syntactic sugar now)
    _on: function(type, fn, context) {
        this._events = this._events || {};

        /* get/init listeners for type */
        var typeListeners = this._events[type];
        if (!typeListeners) {
            typeListeners = [];
            this._events[type] = typeListeners;
        }

        if (context === this) {
            // Less memory footprint.
            context = undefined;
        }
        var newListener = { fn: fn, ctx: context },
            listeners = typeListeners;

        // check if fn already there
        for (var i = 0, len = listeners.length; i < len; i++) {
            if (listeners[i].fn === fn && listeners[i].ctx === context) {
                return;
            }
        }

        listeners.push(newListener);
    },

    _off: function(type, fn, context) {
        var listeners,
            i,
            len;

        if (!this._events) { return; }

        listeners = this._events[type];

        if (!listeners) {
            return;
        }

        if (!fn) {
            // Set all removed listeners to noop so they are not called if remove happens in fire
            for (i = 0, len = listeners.length; i < len; i++) {
                listeners[i].fn = L.Util.falseFn;
            }
            // clear all listeners for a type if function isn't specified
            delete this._events[type];
            return;
        }

        if (context === this) {
            context = undefined;
        }

        if (listeners) {

            // find fn and remove it
            for (i = 0, len = listeners.length; i < len; i++) {
                var l = listeners[i];
                if (l.ctx !== context) { continue; }
                if (l.fn === fn) {

                    // set the removed listener to noop so that's not called if remove happens in fire
                    l.fn = L.Util.falseFn;

                    if (this._firingCount) {
                        /* copy array in case events are being fired */
                        this._events[type] = listeners = listeners.slice();
                    }
                    listeners.splice(i, 1);

                    return;
                }
            }
        }
    },

    // @method fire(type: String, data?: Object, propagate?: Boolean): this
    // Fires an event of the specified type. You can optionally provide an data
    // object — the first argument of the listener function will contain its
    // properties. The event can optionally be propagated to event parents.
    fire: function(type, data, propagate) {
        if (!this.listens(type, propagate)) { return this; }

        var event = L.Util.extend({}, data, { type: type, target: this });

        if (this._events) {
            var listeners = this._events[type];

            if (listeners) {
                this._firingCount = (this._firingCount + 1) || 1;
                for (var i = 0, len = listeners.length; i < len; i++) {
                    var l = listeners[i];
                    l.fn.call(l.ctx || this, event);
                }

                this._firingCount--;
            }
        }

        if (propagate) {
            // propagate the event to parents (set with addEventParent)
            this._propagateEvent(event);
        }

        return this;
    },

    // @method listens(type: String): Boolean
    // Returns `true` if a particular event type has any listeners attached to it.
    listens: function(type, propagate) {
        var listeners = this._events && this._events[type];
        if (listeners && listeners.length) { return true; }

        if (propagate) {
            // also check parents for listeners if event propagates
            for (var id in this._eventParents) {
                if (this._eventParents[id].listens(type, propagate)) { return true; }
            }
        }
        return false;
    },

    // @method once(…): this
    // Behaves as [`on(…)`](#evented-on), except the listener will only get fired once and then removed.
    once: function(types, fn, context) {

        if (typeof types === 'object') {
            for (var type in types) {
                this.once(type, types[type], fn);
            }
            return this;
        }

        var handler = L.bind(function() {
            this
                .off(types, fn, context)
                .off(types, handler, context);
        }, this);

        // add a listener that's executed once and removed after that
        return this
            .on(types, fn, context)
            .on(types, handler, context);
    },

    // @method addEventParent(obj: Evented): this
    // Adds an event parent - an `Evented` that will receive propagated events
    addEventParent: function(obj) {
        this._eventParents = this._eventParents || {};
        this._eventParents[L.stamp(obj)] = obj;
        return this;
    },

    // @method removeEventParent(obj: Evented): this
    // Removes an event parent, so it will stop receiving propagated events
    removeEventParent: function(obj) {
        if (this._eventParents) {
            delete this._eventParents[L.stamp(obj)];
        }
        return this;
    },

    _propagateEvent: function(e) {
        for (var id in this._eventParents) {
            this._eventParents[id].fire(e.type, L.extend({ layer: e.target }, e), true);
        }
    }
});

var proto = L.Evented.prototype;

// aliases; we should ditch those eventually

// @method addEventListener(…): this
// Alias to [`on(…)`](#evented-on)
proto.addEventListener = proto.on;

// @method removeEventListener(…): this
// Alias to [`off(…)`](#evented-off)

// @method clearAllEventListeners(…): this
// Alias to [`off()`](#evented-off)
proto.removeEventListener = proto.clearAllEventListeners = proto.off;

// @method addOneTimeEventListener(…): this
// Alias to [`once(…)`](#evented-once)
proto.addOneTimeEventListener = proto.once;

// @method fireEvent(…): this
// Alias to [`fire(…)`](#evented-fire)
proto.fireEvent = proto.fire;

// @method hasEventListeners(…): Boolean
// Alias to [`listens(…)`](#evented-listens)
proto.hasEventListeners = proto.listens;

L.Mixin = { Events: proto };
/**
 * [uxleaflet/client]
 * L.Control.UxEdition.
 * Basado en el ejemplo incluido en index.html de Leaflet.Editable
 * 
 * No es usado. Se está suando l-draw.js
 * 
 */
(function() {

    

    if (!L.Control) {
        console.error('L.Control.Edition requires Leaflet');
        return;
    }

    /* Custom styling */
    L.Editable.VertexIcon.prototype.options.iconSize = new L.Point(14, 14);

    /**
     * Main Control as container for edition buttons: 
     * AddPolyline, AddPolygon, AddMarker, and DeleteGeom.
     */
    L.Control.UxEdition = L.Control.extend({
        options: {
            position: 'topleft',
            addPolygonText: '',
            addPolylineText: '',
            addMarkerText: '',
            deleteGeomText: '',
            onFeatureCommited: null, // en pruebas
            cssClass: ''
        },
        onAdd: function(map) {
            var container = L.DomUtil.create('div', 'leaflet-control leaflet-bar');

            // usar options para establecer qué botones son visibles
            //var buttonClazzes = [L.NewMarkerControl, L.NewLineControl, L.NewPolygonControl, L.DeleteGeomControl];
            var buttonClazzes = [L.NewPolygonControl, L.DeleteGeomControl];

            this._buttons = [];
            for (var i = 0; i < buttonClazzes.length; i++) {
                var Clazz = buttonClazzes[i];
                var bto = new Clazz();
                bto.onFeatureCommitedListener = this.options.onFeatureCommited;
                this._buttons.push(bto);
                container.appendChild(bto._createLink(map));
            }
            return container;
        },
        setLayer: function(layer) {
            for (var i = 0; i < this._buttons.length; i++) {
                this._buttons[i].layerGroup = layer;
            }
            for (var key in layer) {
                var lyr = layer[key];
                if (lyr.enableEdit) {
                    lyr.enableEdit();
                    lyr.on('dblclick', L.DomEvent.stop).on('dblclick', this.toggleEdit);
                }
            }
        }
    });

    L.BaseEditControl = L.Control.extend({
        options: {
            position: 'topleft',
            title: 'Edit control',
            innerText: 'o'
        },
        _commitedAction: 'added',
        layerGroup: undefined,
        onAdd: function(map) {
            this._map = map;
            var container = L.DomUtil.create('div', 'leaflet-control leaflet-bar');
            var link = this._createLink(map);
            container.appendChild(link);
            return container;
        },
        isActive: function() {
            return this._link && this._link.classList.contains('active');
        },
        setActive: function(opt) {
            if (!opt) {
                this._link.setAttribute('title', this.options.title);
                this._link.classList.remove('active');
                this._link.style.backgroundColor = '';
                this._link.style.color = '';
            } else {
                this._link.setAttribute('title', this.options.cancelTitle);
                this._link.classList.add('active');
                var color = window.getComputedStyle(this._link).color;
                this._link.style.backgroundColor = color;
                this._link.style.color = '#ffffff'; /* blanco o negro, según tema */
            }
        },
        _createLink: function(map) {
            var link = L.DomUtil.create('a', this.options.cssClass || '');
            link.href = '#';
            link.title = this.options.title;
            link.innerHTML = this.options.innerText;
            this._link = link;
            var _this = this;
            L.DomEvent.on(link, 'click', L.DomEvent.stop)
                .on(link, 'click', function() {
                    var lastGeom = _this._onClick(map);
                    var id = lastGeom && lastGeom._leaflet_id;
                    if (id) {
                        // add to layer group
                        _this.layerGroup[id] = lastGeom;
                    }
                });
            this._link = link;
            return link;
        },
        _onClick: null, // must return a edittool
        _toggle: function() {
            var next = !this.isActive();
            this.setActive(next);
            console.debug('starting tool from: ' + this.options.title);
            return next;
        },
        _featureCommitted: function(evt) {
            evt.action = this._commitedAction;
            console.info('feature commited ', evt);
            if (this.onFeatureCommitedListener) {
                this.onFeatureCommitedListener(evt);
            }
        },
        onFeatureCommitedListener: null,
        _featureCanceled: function(lyr) {
            var id = lyr._leaflet_id;
            if (!lyr._deleting) {
                lyr._deleting = true;
                var map = lyr._map;
                // standard remove
                map.removeLayer(lyr);
                map._onResize();
                delete this.layerGroup[id];
            }
        }
    });

    L.DeleteGeomControl = L.BaseEditControl.extend({
        options: {
            title: 'Delete geometries',
            cancelTitle: 'Stop deletiing',
            innerText: '\uf1f8',
            /* awesome fa-trash */
            //innerText: '\uf12d', /* awesome fa-eraser */
            cssClass: 'delete-edit-control'
        },

        _commitedAction: 'deleted',

        _onClick: function(map) {
            var isActive = this._toggle();
            for (var key in this.layerGroup) {
                var lyr = this.layerGroup[key];
                if (isActive) {
                    this._addOnclick(lyr);
                } else {
                    this._removeOnclick(lyr);
                }
            }
        },

        _addOnclick: function(lyr) {
            if (lyr.editor) {
                var _this = this;
                lyr.on('click', L.DomEvent.stop).on('click', function() {
                    // map layer clicked (included in _this.map)
                    var id = this._leaflet_id;
                    if (id !== undefined) {
                        var map = this._map;
                        // standard remove
                        map.removeLayer(this);
                        map._onResize();
                        // internal ref deletion
                        delete _this.layerGroup[id];
                        // notification
                        _this._featureCommitted({ layer: this });
                        console.debug('deleted feature ' + id);
                    } else {
                        console.warn('clicked object is not a leaflet layer: ' + this);
                    }
                }, lyr);
            }
        },

        _removeOnclick: function(lyr) {
            if (lyr.editor) {
                lyr.off('click', L.DomEvent.stop).off('click');
            }
        }

    });

    L.NewLineControl = L.BaseEditControl.extend({
        options: {
            title: 'Create a new line',
            cancelTitle: 'Cancel line',
            innerText: '\\/\\',
            cssClass: 'newline-edit-control'
        },
        _onClick: function(map) {
            var isActive = this._toggle();
            return map.editTools.startPolyline();
        }
    });

    L.NewPolygonControl = L.BaseEditControl.extend({
        options: {
            title: 'Create a new polygon',
            cancelTitle: 'Cancel polygon',
            innerText: '▰',
            cssClass: 'newpolygon-edit-control'
        },
        _onClick: function(map) {
            var isActive = this._toggle();
            if (isActive) {
                var poly = map.editTools.startPolygon();
                poly.on('editable:drawing:commit', this._featureCommitted, this);
                poly.on('editable:drawing:commit', function(evt) { this.setActive(false); }, this);
                poly.on('editable:drawing:cancel', function(evt) {
                    this.setActive(false);
                    this._featureCanceled(poly);
                }, this);
                return poly;
            } else {
                map.editTools.stopDrawing();
            }
        }
    });

    L.NewMarkerControl = L.BaseEditControl.extend({
        options: {
            title: 'Add a new marker',
            cancelTitle: 'Cancel marker',
            innerText: '🖈',
            cssClass: 'newmarker-edit-control'
        },
        _onClick: function(map) {
            var isActive = this._toggle();
            return map.editTools.startMarker();
        }
    });

})(); /* L.Control.Edition */


// naming of leaflet classes
L.Class.prototype.toString = function () {  return 'Class: ' + this._clazzName; };

L.Map.prototype._clazzName = 'Map';
L.Polygon.prototype._clazzName = 'Polygon';
L.Polygon.prototype.toString = function () {
    
    return L.Polyline.prototype.toString.call(this) + ' ' + JSON.stringify(this._latlng);
};

L.Circle.prototype._clazzName = 'Circle';
L.Point.prototype._clazzName = 'Point';
L.Path.prototype._clazzName = 'Path';
L.Marker.prototype._clazzName = 'Marker';
L.Polyline.prototype._clazzName = 'Polyline';
/**
 * [uxleaflet/client]
 * Matrix transform path for SVG/VML
 * TODO: adapt to Leaflet 0.8 upon release
 * 
 * (this code allow drag editable geometries in leaflet)
 */



if (L.Browser.svg) { // SVG transformation

    L.Path.include({

        /**
         * Reset transform matrix
         */
        _resetTransform: function() {
            this._container.setAttributeNS(null, 'transform', '');
        },

        /**
         * Applies matrix transformation to SVG
         * @param {Array.<Number>} matrix
         */
        _applyTransform: function(matrix) {
            this._container.setAttributeNS(null, 'transform',
                'matrix(' + matrix.join(' ') + ')');
        }

    });

} else { // VML transform routines

    L.Path.include({

        /**
         * Reset transform matrix
         */
        _resetTransform: function() {
            if (this._skew) {
                // super important! workaround for a 'jumping' glitch:
                // disable transform before removing it
                this._skew.on = false;
                this._container.removeChild(this._skew);
                this._skew = null;
            }
        },

        /**
         * Applies matrix transformation to VML
         * @param {Array.<Number>} matrix
         */
        _applyTransform: function(matrix) {
            var skew = this._skew;

            if (!skew) {
                skew = this._createElement('skew');
                this._container.appendChild(skew);
                skew.style.behavior = 'url(#default#VML)';
                this._skew = skew;
            }

            // handle skew/translate separately, cause it's broken
            var mt = matrix[0].toFixed(8) + ' ' + matrix[1].toFixed(8) + ' ' +
                matrix[2].toFixed(8) + ' ' + matrix[3].toFixed(8) + ' 0 0';
            var offset = Math.floor(matrix[4]).toFixed() + ', ' +
                Math.floor(matrix[5]).toFixed() + '';

            var s = this._container.style;
            var l = parseFloat(s.left);
            var t = parseFloat(s.top);
            var w = parseFloat(s.width);
            var h = parseFloat(s.height);

            if (isNaN(l)) l = 0;
            if (isNaN(t)) t = 0;
            if (isNaN(w) || !w) w = 1;
            if (isNaN(h) || !h) h = 1;

            var origin = (-l / w - 0.5).toFixed(8) + ' ' + (-t / h - 0.5).toFixed(8);

            skew.on = 'f';
            skew.matrix = mt;
            skew.origin = origin;
            skew.offset = offset;
            skew.on = true;
        }

    });
}

// Renderer-independent
L.Path.include({

    /**
     * Check if the feature was dragged, that'll supress the click event
     * on mouseup. That fixes popups for example
     *
     * @param  {MouseEvent} e
     */
    _onMouseClick: function(e) {
        if ((this.dragging && this.dragging.moved()) ||
            (this._map.dragging && this._map.dragging.moved())) {
            return;
        }

        this._fireMouseEvent(e);
    }
});
/**
 * Leaflet vector features drag functionality
 * @preserve
 */


/**
 * Drag handler
 * @class L.Path.Drag
 * @extends {L.Handler}
 */
L.Handler.PathDrag = L.Handler.extend( 
    /** @lends  L.Path.Drag.prototype */
    {

    /**
     * @param  {L.Path} path
     * @constructor
     */
    initialize: function(path) {

        /**
         * @type {L.Path}
         */
        this._path = path;

        /**
         * @type {Array.<Number>}
         */
        this._matrix = null;

        /**
         * @type {L.Point}
         */
        this._startPoint = null;

        /**
         * @type {L.Point}
         */
        this._dragStartPoint = null;

    },

    /**
     * Enable dragging
     */
    addHooks: function() {
        this._path.on('mousedown', this._onDragStart, this);
        L.DomUtil.addClass(this._path._container, 'leaflet-path-draggable');
    },

    /**
     * Disable dragging
     */
    removeHooks: function() {
        this._path.off('mousedown', this._onDragStart, this);
        L.DomUtil.removeClass(this._path._container, 'leaflet-path-draggable');
    },

    /**
     * @return {Boolean}
     */
    moved: function() {
        return this._path._dragMoved;
    },

    /**
     * Start drag
     * @param  {L.MouseEvent} evt
     */
    _onDragStart: function(evt) {
        this._startPoint = evt.containerPoint.clone();
        this._dragStartPoint = evt.containerPoint.clone();
        this._matrix = [1, 0, 0, 1, 0, 0];

        this._path._map
            .on('mousemove', this._onDrag, this)
            .on('mouseup', this._onDragEnd, this);
        this._path._dragMoved = false;
    },

    /**
     * Dragging
     * @param  {L.MouseEvent} evt
     */
    _onDrag: function(evt) {
        var x = evt.containerPoint.x;
        var y = evt.containerPoint.y;

        var dx = x - this._startPoint.x;
        var dy = y - this._startPoint.y;

        if (!this._path._dragMoved && (dx || dy)) {
            this._path._dragMoved = true;
            this._path.fire('dragstart');
        }

        this._matrix[4] += dx;
        this._matrix[5] += dy;

        this._startPoint.x = x;
        this._startPoint.y = y;

        this._path._applyTransform(this._matrix);
        this._path.fire('drag');
        L.DomEvent.stop(evt.originalEvent);
    },

    /**
     * Dragging stopped, apply
     * @param  {L.MouseEvent} evt
     */
    _onDragEnd: function(evt) {
        L.DomEvent.stop(evt);
        // undo container transform
        this._path._resetTransform();
        // apply matrix
        this._transformPoints(this._matrix);

        this._path._map
            .off('mousemove', this._onDrag, this)
            .off('mouseup', this._onDragEnd, this);

        // consistency
        this._path.fire('dragend', {
            distance: Math.sqrt(
                L.LineUtil._sqDist(this._dragStartPoint, evt.containerPoint)
            )
        });

        this._matrix = null;
        this._startPoint = null;
        this._dragStartPoint = null;
    },

    /**
     * Applies transformation, does it in one sweep for performance,
     * so don't be surprised about the code repetition.
     *
     * [ x ]   [ a  b  tx ] [ x ]   [ a * x + b * y + tx ]
     * [ y ] = [ c  d  ty ] [ y ] = [ c * x + d * y + ty ]
     *
     * @param {Array.<Number>} matrix
     */
    _transformPoints: function(matrix) {
        var path = this._path;
        var i, len, latlng;

        var px = L.point(matrix[4], matrix[5]);

        var crs = path._map.options.crs;
        var transformation = crs.transformation;
        var scale = crs.scale(path._map.getZoom());
        var projection = crs.projection;

        var diff = transformation.untransform(px, scale)
            .subtract(transformation.untransform(L.point(0, 0), scale));

        // console.time('transform');

        // all shifts are in-place
        if (path._point) { // L.Circle
            path._latlng = projection.unproject(
                projection.project(path._latlng)._add(diff));
            path._point._add(px);
        } else if (path._originalPoints) { // everything else
            for (i = 0, len = path._originalPoints.length; i < len; i++) {
                latlng = path._latlngs[i];
                path._latlngs[i] = projection
                    .unproject(projection.project(latlng)._add(diff));
                path._originalPoints[i]._add(px);
            }
        }

        // holes operations
        if (path._holes) {
            for (i = 0, len = path._holes.length; i < len; i++) {
                for (var j = 0, len2 = path._holes[i].length; j < len2; j++) {
                    latlng = path._holes[i][j];
                    path._holes[i][j] = projection
                        .unproject(projection.project(latlng)._add(diff));
                    path._holePoints[i][j]._add(px);
                }
            }
        }

        // console.timeEnd('transform');

        path._updatePath();
    }

});

L.Path.prototype.__initEvents = L.Path.prototype._initEvents;
L.Path.prototype._initEvents = function() {
    this.__initEvents();

    if (this.options.draggable) {
        if (this.dragging) {
            this.dragging.enable();
        } else {
            this.dragging = new L.Handler.PathDrag(this);
            this.dragging.enable();
        }
    } else if (this.dragging) {
        this.dragging.disable();
    }
};
(function() {

    // listen and propagate dragstart on sub-layers
    L.FeatureGroup.EVENTS += ' dragstart';

    function wrapMethod(klasses, methodName, method) {
        for (var i = 0, len = klasses.length; i < len; i++) {
            var klass = klasses[i];
            klass.prototype['_' + methodName] = klass.prototype[methodName];
            klass.prototype[methodName] = method;
        }
    }

    /**
     * @param {L.Polygon|L.Polyline} layer
     * @return {L.MultiPolygon|L.MultiPolyline}
     */
    var ext2 = {
        addLayer: function (layer) {
            if (this.hasLayer(layer)) {
                return this;
            }
            layer
                .on('drag', this._onDrag, this)
                .on('dragend', this._onDragEnd, this);
            return this._addLayer.call(this, layer);
        },

        /**
         * @param  {L.Polygon|L.Polyline} layer
         * @return {L.MultiPolygon|L.MultiPolyline}
         */
        removeLayer: function (layer) {
            if (!this.hasLayer(layer)) {
                return this;
            }
            layer
                .off('drag', this._onDrag, this)
                .off('dragend', this._onDragEnd, this);
            return this._removeLayer.call(this, this);
        }
    };

    // duck-type methods to listen to the drag events
    wrapMethod([L.MultiPolygon, L.MultiPolyline], 'addLayer', ext2.addLayer);
    wrapMethod([L.MultiPolygon, L.MultiPolyline], 'removeLayer', ext2.removeLayer);

    var dragMethods = {
        _onDrag: function(evt) {
            var layer = evt.target;
            this.eachLayer(function(otherLayer) {
                if (otherLayer !== layer) {
                    otherLayer._applyTransform(layer.dragging._matrix);
                }
            });

            this._propagateEvent(evt);
        },

        _onDragEnd: function(evt) {
            var layer = evt.target;

            this.eachLayer(function(otherLayer) {
                if (otherLayer !== layer) {
                    otherLayer._resetTransform();
                    otherLayer.dragging._transformPoints(layer.dragging._matrix);
                }
            });

            this._propagateEvent(evt);
        }
    };

    L.MultiPolygon.include(dragMethods);
    L.MultiPolyline.include(dragMethods);

})();
// TODO: dismiss that on Leaflet 0.8.x release

L.Polygon.include(
    /** @lends L.Polygon.prototype */
    {

    /**
     * @return {L.LatLng}
     */
    getCenter: function() {
        var i, j, len, p1, p2, f, area, x, y,
            points = this._parts[0];

        // polygon centroid algorithm; only uses the first ring if there are multiple

        area = x = y = 0;

        for (i = 0, len = points.length, j = len - 1; i < len; j = i++) {
            p1 = points[i];
            p2 = points[j];

            f = p1.y * p2.x - p2.y * p1.x;
            x += (p1.x + p2.x) * f;
            y += (p1.y + p2.y) * f;
            area += f * 3;
        }

        return this._map.layerPointToLatLng([x / area, y / area]);
    }

});


// It allows diasbling from options if L.EditToolbar.Edit exists.

/**
 * Static flag for move markers
 * @type {Boolean}
 */
L.EditToolbar.Edit.MOVE_MARKERS = false;

L.EditToolbar.Edit.include(
    /** @lends L.EditToolbar.Edit.prototype */
    {

    /**
     * @override
     */
    initialize: function(map, options) {
        L.EditToolbar.Edit.MOVE_MARKERS = !!options.selectedPathOptions.moveMarkers;
        this._initialize(map, options);
    },

    /**
     * @param  {L.Map}  map
     * @param  {Object} options
     */
    _initialize: L.EditToolbar.Edit.prototype.initialize

});


/**
 * Mainly central marker routines
 */

L.Edit.SimpleShape.include(
    /** @lends L.Edit.SimpleShape.prototype */
    {

    /**
     * Put move marker into center
     */
    _updateMoveMarker: function() {
        if (this._moveMarker) {
            this._moveMarker.setLatLng(this._getShapeCenter());
        }
    },

    /**
     * Shape centroid
     * @return {L.LatLng}
     */
    _getShapeCenter: function() {
        return this._shape.getBounds().getCenter();
    },

    /**
     * @override
     */
    _createMoveMarker: function() {
        if (L.EditToolbar.Edit.MOVE_MARKERS) {
            this._moveMarker = this._createMarker(this._getShapeCenter(),
                this.options.moveIcon);
        }
    }

});

/**
 * Override this if you don't want the central marker
 * @type {Boolean}
 */
L.Edit.SimpleShape.mergeOptions({
    moveMarker: false
});
/**
 * Dragging routines for circle
 */

L.Edit.Circle.include(
    /** @lends L.Edit.Circle.prototype */
    {

    /**
     * @override
     */
    addHooks: function() {
        if (this._shape._map) {
            this._map = this._shape._map;
            if (!this._markerGroup) {
                this._enableDragging();
                this._initMarkers();
            }
            this._shape._map.addLayer(this._markerGroup);
        }
    },

    /**
     * @override
     */
    removeHooks: function() {
        if (this._shape._map) {
            for (var i = 0, l = this._resizeMarkers.length; i < l; i++) {
                this._unbindMarker(this._resizeMarkers[i]);
            }

            this._disableDragging();
            this._resizeMarkers = null;
            this._map.removeLayer(this._markerGroup);
            delete this._markerGroup;
        }

        this._map = null;
    },

    /**
     * @override
     */
    _createMoveMarker: L.Edit.SimpleShape.prototype._createMoveMarker,

    /**
     * Change
     * @param  {L.LatLng} latlng
     */
    _resize: function(latlng) {
        var center = this._shape.getLatLng();
        var radius = center.distanceTo(latlng);

        this._shape.setRadius(radius);

        this._updateMoveMarker();
    },

    /**
     * Adds drag start listeners
     */
    _enableDragging: function() {
        if (!this._shape.dragging) {
            this._shape.dragging = new L.Handler.PathDrag(this._shape);
        }
        this._shape.dragging.enable();
        this._shape
            .on('dragstart', this._onStartDragFeature, this)
            .on('dragend', this._onStopDragFeature, this);
    },

    /**
     * Removes drag start listeners
     */
    _disableDragging: function() {
        this._shape.dragging.disable();
        this._shape
            .off('dragstart', this._onStartDragFeature, this)
            .off('dragend', this._onStopDragFeature, this);
    },

    /**
     * Start drag
     * @param  {L.MouseEvent} evt
     */
    _onStartDragFeature: function() {
        this._shape._map.removeLayer(this._markerGroup);
        this._shape.fire('editstart');
    },

    /**
     * Dragging stopped, apply
     * @param  {L.MouseEvent} evt
     */
    _onStopDragFeature: function() {
        var center = this._shape.getLatLng();

        //this._moveMarker.setLatLng(center);
        this._resizeMarkers[0].setLatLng(this._getResizeMarkerPoint(center));

        // show resize marker
        this._shape._map.addLayer(this._markerGroup);
        this._updateMoveMarker();
        this._fireEdit();
    }
});
/**
 * Dragging routines for poly handler
 */

L.Edit.Rectangle.include(
    /** @lends L.Edit.Rectangle.prototype */
    {

    /**
     * @override
     */
    addHooks: function() {
        if (this._shape._map) {
            if (!this._markerGroup) {
                this._enableDragging();
                this._initMarkers();
            }
            this._shape._map.addLayer(this._markerGroup);
        }
    },

    /**
     * @override
     */
    removeHooks: function() {
        if (this._shape._map) {
            this._shape._map.removeLayer(this._markerGroup);
            this._disableDragging();
            delete this._markerGroup;
            delete this._markers;
        }
    },

    /**
     * @override
     */
    _resize: function(latlng) {
        // Update the shape based on the current position of
        // this corner and the opposite point
        this._shape.setBounds(L.latLngBounds(latlng, this._oppositeCorner));
        this._updateMoveMarker();
    },

    /**
     * @override
     */
    _onMarkerDragEnd: function(e) {
        this._toggleCornerMarkers(1);
        this._repositionCornerMarkers();

        L.Edit.SimpleShape.prototype._onMarkerDragEnd.call(this, e);
    },

    /**
     * Adds drag start listeners
     */
    _enableDragging: function() {
        if (!this._shape.dragging) {
            this._shape.dragging = new L.Handler.PathDrag(this._shape);
        }
        this._shape.dragging.enable();
        this._shape
            .on('dragstart', this._onStartDragFeature, this)
            .on('dragend', this._onStopDragFeature, this);
    },

    /**
     * Removes drag start listeners
     */
    _disableDragging: function() {
        this._shape.dragging.disable();
        this._shape
            .off('dragstart', this._onStartDragFeature, this)
            .off('dragend', this._onStopDragFeature, this);
    },

    /**
     * Start drag
     * @param  {L.MouseEvent} evt
     */
    _onStartDragFeature: function() {
        this._shape._map.removeLayer(this._markerGroup);
        this._shape.fire('editstart');
    },

    /**
     * Dragging stopped, apply
     * @param  {L.MouseEvent} evt
     */
    _onStopDragFeature: function() {
        var polygon = this._shape;
        for (var i = 0, len = polygon._latlngs.length; i < len; i++) {
            // update marker
            var marker = this._resizeMarkers[i];
            marker.setLatLng(polygon._latlngs[i]);

            // this one's needed to update the path
            marker._origLatLng = polygon._latlngs[i];
            if (marker._middleLeft) {
                marker._middleLeft.setLatLng(this._getMiddleLatLng(marker._prev, marker));
            }
            if (marker._middleRight) {
                marker._middleRight.setLatLng(this._getMiddleLatLng(marker, marker._next));
            }
        }
        // this._moveMarker.setLatLng(polygon.getBounds().getCenter());

        // show vertices
        this._shape._map.addLayer(this._markerGroup);
        this._updateMoveMarker();

        this._repositionCornerMarkers();
        this._fireEdit();
    }
});
/**
 * Dragging routines for poly handler
 */

L.Edit.PolyVerticesEdit.include(
    /** @lends L.Edit.PolyVerticesEdit.prototype */
    {

    // store methods to call them in overrides
    __createMarker: L.Edit.PolyVerticesEdit.prototype._createMarker,
    __removeMarker: L.Edit.PolyVerticesEdit.prototype._removeMarker,

    /**
     * @override
     */
    addHooks: function() {
        var poly = this._poly;
        poly.setStyle(poly.options.editing);
        if (this._poly._map) {
            if (!this._markerGroup) {
                this._enableDragging();
                this._initMarkers();
                // Create center marker
                this._createMoveMarker();
            }
            this._poly._map.addLayer(this._markerGroup);
        }
    },

    /**
     * @override
     */
    _createMoveMarker: function() {
        if (L.EditToolbar.Edit.MOVE_MARKERS && (this._poly instanceof L.Polygon)) {
            this._moveMarker = new L.Marker(this._getShapeCenter(), {
                icon: this.options.moveIcon
            });
            this._moveMarker.on('mousedown', this._delegateToShape, this);
            this._markerGroup.addLayer(this._moveMarker);
        }
    },

    /**
     * Start dragging through the marker
     * @param  {L.MouseEvent} evt
     */
    _delegateToShape: function(evt) {
        var poly = this._shape || this._poly;
        var marker = evt.target;
        poly.fire('mousedown', L.Util.extend(evt, {
            containerPoint: L.DomUtil.getPosition(marker._icon)
                .add(poly._map._getMapPanePos())
        }));
    },

    /**
     * Polygon centroid
     * @return {L.LatLng}
     */
    _getShapeCenter: function() {
        return this._poly.getCenter();
    },

    /**
     * @override
     */
    removeHooks: function() {
        var poly = this._poly;
        poly.setStyle(poly.options.original);
        if (this._poly._map) {
            this._poly._map.removeLayer(this._markerGroup);
            this._disableDragging();
            delete this._markerGroup;
            delete this._markers;
        }
    },

    /**
     * Adds drag start listeners
     */
    _enableDragging: function() {
        if (!this._poly.dragging) {
            this._poly.dragging = new L.Handler.PathDrag(this._poly);
        }
        this._poly.dragging.enable();
        this._poly
            .on('dragstart', this._onStartDragFeature, this)
            .on('dragend', this._onStopDragFeature, this);
    },

    /**
     * Removes drag start listeners
     */
    _disableDragging: function() {
        this._poly.dragging.disable();
        this._poly
            .off('dragstart', this._onStartDragFeature, this)
            .off('dragend', this._onStopDragFeature, this);
    },

    /**
     * Start drag
     * @param  {L.MouseEvent} evt
     */
    _onStartDragFeature: function(evt) {
        this._poly._map.removeLayer(this._markerGroup);
        this._poly.fire('editstart');
    },

    /**
     * Dragging stopped, apply
     * @param  {L.MouseEvent} evt
     */
    _onStopDragFeature: function(evt) {
        // var polygon = this._poly;
        for (var i = 0, len = this._latlngs.length; i < len; i++) {
            // update marker
            var marker = this._markers[i];
            marker.setLatLng(this._latlngs[i]);

            // this one's needed to update the path
            marker._origLatLng = this._latlngs[i];
            if (marker._middleLeft) {
                marker._middleLeft.setLatLng(this._getMiddleLatLng(marker._prev, marker));
            }
            if (marker._middleRight) {
                marker._middleRight.setLatLng(this._getMiddleLatLng(marker, marker._next));
            }
        }

        // show vertices
        this._poly._map.addLayer(this._markerGroup);
        L.Edit.SimpleShape.prototype._updateMoveMarker.call(this);
        this._fireEdit();
    },

    /**
     * Copy from simple shape
     */
    _updateMoveMarker: L.Edit.SimpleShape.prototype._updateMoveMarker,

    /**
     * @override
     */
    _createMarker: function(latlng, index) {
        var marker = this.__createMarker(latlng, index);
        marker
            .on('dragstart', this._hideMoveMarker, this)
            .on('dragend', this._showUpdateMoveMarker, this);
        return marker;
    },

    /**
     * @override
     */
    _removeMarker: function(marker) {
        this.__removeMarker(marker);
        marker
            .off('dragstart', this._hideMoveMarker, this)
            .off('dragend', this._showUpdateMoveMarker, this);
    },

    /**
     * Hide move marker while dragging a vertex
     */
    _hideMoveMarker: function() {
        if (this._moveMarker) {
            this._markerGroup.removeLayer(this._moveMarker);
        }
    },

    /**
     * Show and update move marker
     */
    _showUpdateMoveMarker: function() {
        if (this._moveMarker) {
            this._markerGroup.addLayer(this._moveMarker);
            this._updateMoveMarker();
        }
    }

});

/**
 * @type {L.DivIcon}
 */
L.Edit.PolyVerticesEdit.prototype.options.moveIcon = new L.DivIcon({
    iconSize: new L.Point(8, 8),
    className: 'leaflet-div-icon leaflet-editing-icon leaflet-edit-move'
});

/**
 * Override this if you don't want the central marker
 * @type {Boolean}
 */
L.Edit.PolyVerticesEdit.mergeOptions({
    moveMarker: false
});
/* FileSaver.js
 * A saveAs() FileSaver implementation.
 * 1.3.2
 * 2016-06-16 18:25:19
 *
 * By Eli Grey, http://eligrey.com
 * License: MIT
 *   See https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md
 */

/*global self */
/*jslint bitwise: true, indent: 4, laxbreak: true, laxcomma: true, smarttabs: true, plusplus: true */

/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */


L.Util.saveAs = (function(view) {
    
    // IE <10 is explicitly unsupported
    if (typeof view === 'undefined' || typeof navigator !== 'undefined' && /MSIE [1-9]\./.test(navigator.userAgent)) {
        return;
    }
    
    var is_safari = /constructor/i.test(view.HTMLElement) || view.safari;
    var is_chrome_ios = /CriOS\/[\d]+/.test(navigator.userAgent);
    var force_saveable_type = 'application/octet-stream';
    var arbitrary_revoke_timeout = 1000 * 40; // in ms

    // only get URL when necessary in case Blob.js hasn't overridden it yet
    function get_URL () {
        return view.URL || view.webkitURL || view;
    }
    
    function throw_outside(ex) {
        (view.setImmediate || view.setTimeout)(function() {
            throw ex;
        }, 0);
    }
        
    function revoke(file) {
        var revoker = function() {
            if (typeof file === 'string') { // file is an object URL
                get_URL().revokeObjectURL(file);
            } else { // file is a File
                file.remove();
            }
        };
        setTimeout(revoker, arbitrary_revoke_timeout);
    }

    function dispatch(filesaver, event_types, event) {
        event_types = [].concat(event_types);
        var i = event_types.length;
        while (i--) {
            var listener = filesaver['on' + event_types[i]];
            if (typeof listener === 'function') {
                try {
                    listener.call(filesaver, event || filesaver);
                } catch (ex) {
                    throw_outside(ex);
                }
            }
        }
    }

    function auto_bom(blob) {
        // prepend BOM for UTF-8 XML and text/* types (including HTML)
        // note: your browser will automatically convert UTF-16 U+FEFF to EF BB BF
        if (/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
            return new Blob([String.fromCharCode(0xFEFF), blob], { type: blob.type });
        }
        return blob;
    }

    function FileSaver(blob, name, no_auto_bom) {
        if (!no_auto_bom) {
            blob = auto_bom(blob);
        }
        // First try a.download, then web filesystem, then object URLs
        var filesaver = this;
        var type = blob.type;
        var force = type === force_saveable_type;
        var object_url;
        
        function dispatch_all() {
            dispatch(filesaver, 'writestart progress write writeend'.split(' '));
        }
        // on any filesys errors revert to saving with object URLs
            
        filesaver.readyState = filesaver.INIT;

        // Test a.download
        // the Blob API is fundamentally broken as there is no 'downloadfinished' event to subscribe to
        var doc = view.document;
        var save_link = doc.createElementNS('http://www.w3.org/1999/xhtml', 'a');
        var can_use_save_link = 'download' in save_link;
        if (can_use_save_link) {
            object_url = get_URL().createObjectURL(blob);
            setTimeout(function() {
                save_link.href = object_url;
                save_link.download = name;
                var event = new MouseEvent('click');
                save_link.dispatchEvent(event);
                dispatch_all();
                revoke(object_url);
                filesaver.readyState = filesaver.DONE;
            });
            return;
        }

        // Test FileReader
        if ((is_chrome_ios || (force && is_safari)) && view.FileReader) {
            // Safari doesn't allow downloading of blob urls
            var reader = new FileReader();
            reader.onloadend = function() {
                var url = is_chrome_ios ? reader.result : reader.result.replace(/^data:[^;]*;/, 'data:attachment/file;');
                var popup = view.open(url, '_blank');
                if (!popup) view.location.href = url;
                url = undefined; // release reference before dispatching
                filesaver.readyState = filesaver.DONE;
                dispatch_all();
            };
            reader.readAsDataURL(blob);
            filesaver.readyState = filesaver.INIT;
            return;
        }
        
        // don't create more object URLs than needed
        if (!object_url) {
            object_url = get_URL().createObjectURL(blob);
        }
        if (force) {
            view.location.href = object_url;
        } else {
            var opened = view.open(object_url, '_blank');
            if (!opened) {
                // Apple does not allow window.open, see https://developer.apple.com/library/safari/documentation/Tools/Conceptual/SafariExtensionGuide/WorkingwithWindowsandTabs/WorkingwithWindowsandTabs.html
                view.location.href = object_url;
            }
        }
        filesaver.readyState = filesaver.DONE;
        dispatch_all();
        revoke(object_url);
       
    }

    // exported function
    function saveAs(blob, name, no_auto_bom) {
        return new FileSaver(blob, name || blob.name || 'download', no_auto_bom);
    }

    // IE 10+ (native saveAs)
    if (typeof navigator !== 'undefined' && navigator.msSaveOrOpenBlob) {
        return function(blob, name, no_auto_bom) {
            name = name || blob.name || 'download';

            if (!no_auto_bom) {
                blob = auto_bom(blob);
            }
            return navigator.msSaveOrOpenBlob(blob, name);
        };
    }

    var FS_proto = FileSaver.prototype;
    FS_proto.abort = function() {};
    FS_proto.readyState = FS_proto.INIT = 0;
    FS_proto.WRITING = 1;
    FS_proto.DONE = 2;

    FS_proto.error =
        FS_proto.onwritestart =
        FS_proto.onprogress =
        FS_proto.onwrite =
        FS_proto.onabort =
        FS_proto.onerror =
        FS_proto.onwriteend =
        null;

    return saveAs;
}(
    typeof self !== 'undefined' && self ||
    typeof window !== 'undefined' && window 
));

angular.module('opengate-angular-js')
    .service('$schemaFormUtils', ['$provisionDatastreamsUtils', '$api', '$q',
        function ($provisionDatastreamsUtils, $api, $q) {
            

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
                form = form.filter(function (value) {
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
                    _keys.forEach(function (key) {
                        var obj = schema[key];
                        if (!withoutHelper) {
                            if (obj === 'string' && typeof schema.format === 'undefined' && typeof schema.enum === 'undefined') {
                                schema.format = 'helperdialog';
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

                this.updateForm = function (form) {
                    form = angular.copy(form);
                };


                this.addField = function ($item, creationMode, withoutHelper) {
                    var defered = $q.defer();
                    var promise = defered.promise;

                    if (typeof $item.schema.$ref === 'string') {
                        var path = '$.' + $item.schema.$ref.split('#')[1];
                        path = path.replace(/[\/]/g, '.');
                        $api().basicTypesSearchBuilder().withPath(path).execute().then(function (response) {
                            $item.schema = response.data;
                            addToSchema($item, creationMode, withoutHelper);
                            defered.resolve();
                        }).catch(function (err) {
                            console.error(err);
                            defered.reject(err);
                        });
                    } else {
                        addToSchema($item, creationMode, withoutHelper);
                        defered.resolve();
                    }
                    return promise;
                };

                this.addFields = function (fields, creationMode, withoutHelper) {
                    var promisses = [];
                    if (Array.isArray(fields) && fields.length > 0) {
                        fields.forEach(function (field) {
                            promisses.push(_this.addField(field, creationMode, withoutHelper));
                        });
                        return $q.all(promisses).catch(function (err) {
                            console.error(err);
                        });
                    } else {
                        throw new Error("fields must be an array");
                    }
                };

                this.removeField = function (field) {
                    delete schema.properties[field];
                    schema.required.splice(schema.required.indexOf(field), 1);
                    identifiers.splice(identifiers.indexOf(field), 1);
                    form = removeFieldToForm(field, form);
                };

                this.getSchema = function () {
                    return schema;
                };

                this.getForm = function () {
                    return form;
                };

                this.getIdentifiers = function () {
                    return identifiers;
                };
            }

            return {
                addFieldToForm: addFieldToForm,
                removeFieldToForm: removeFieldToForm,
                getSchemaFormCreator: function () {
                    return new SchemaFormCreator();
                },
                getSchemaFormCreatorFromDatamodel: function (options) {
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
                    } else {
                        defered.reject("First parameter must be an array of datastreams identifier");
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
                        .then(function (response) {
                            var datamodels = response.data.datamodels;
                            if (!fromAllDatamodels) {
                                datamodels = $provisionDatastreamsUtils.filterForCoreDatamodelsCatalog(datamodels);
                            }

                            var rd = datamodels.reduce(function (first, next) {
                                var categories = [];
                                if (next.categories) {
                                    return first.concat(next.categories.reduce(function (first, next) {
                                        if (next.datastreams)
                                            return first.concat(next.datastreams);
                                        return first;
                                    }, categories));
                                }
                                return first;
                            }, []);
                            var datastreams = rd.reduce(function (first, ds) {
                                first[ds.identifier] = ds;
                                return first;
                            }, []);
                            var promisses = [];
                            customfields.forEach(function (identifier) {
                                var confDatastream = datastreams[identifier];
                                if (typeof confDatastream === 'undefined') {
                                    console.error('Datastream ' + identifier + ' no exists or not is custom.');
                                } else {
                                    promisses.push(schemaFormCreator.addField(confDatastream, undefined, withoutHelper));
                                }
                            });
                            if (promisses.length > 0) {
                                $q.all(promisses).then(function () {
                                    defered.resolve(schemaFormCreator);
                                }).catch(function (err) {
                                    console.error(err);
                                    defered.reject(err);
                                });
                            }

                        })
                        .catch(function (err) {
                            console.error(err);
                            defered.reject(err);
                        });
                    return promise;
                }
            };

        }
    ]);
angular.module('opengate-angular-js').config(["schemaFormProvider", "schemaFormDecoratorsProvider", "sfPathProvider", "sfBuilderProvider", function(schemaFormProvider, schemaFormDecoratorsProvider, sfPathProvider, sfBuilderProvider) {
    
    var helper = function(name, schema, options) {
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

    var customUiSelect = function(name, schema, options) {
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
}]);
/**
 * Created by Monica on 12/09/2016.
 */


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
        $scope.$on('destroy', function() {
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


angular.module('opengate-angular-js').controller('helperUiSelectController', ['$scope', '$element', '$attrs', function($scope, $element, $attrs) {
    var $ctrl = this;
    $ctrl.$helper_keys = {};
    $ctrl.labelError = $ctrl.labelError ? $ctrl.labelError : 'Parameter is required';
    $ctrl.labelText = $ctrl.labelText ? $ctrl.labelText : 'Parameter';

    $ctrl.helperTagTransform = function(newTag) {
        return {
            key: 'custom',
            value: newTag
        };
    };

    $ctrl._onCopy = function(copy_obj) {
        $ctrl.$helper_keys = copy_obj.$helper_keys;
        $ctrl.have_helper_keys = true;
        if ($ctrl.helperModel && $ctrl.helperModel.length > 0) {
            $ctrl.$helper_keys["'" + $ctrl.labelText + "' default"] = $ctrl.helperModel;
        }
    };

    $ctrl.$onChanges = function(changesObj) {
        //console.log(JSON.stringify(changesObj));
        if (changesObj && changesObj.selectedKeys && changesObj.selectedKeys.currentValue) {
            if (Object.keys(changesObj.selectedKeys.currentValue).length > 0) {
                $ctrl.$helper_keys = changesObj.selectedKeys.currentValue;
                $ctrl.have_helper_keys = true;
            } else {
                $ctrl.$helper_keys = {};
                $ctrl.have_helper_keys = false;
            }
        }
    };

    $ctrl.$onInit = function() {
        if (!$ctrl.helperCtrl.onMulti) {
            $ctrl.helperCtrl.onMulti = [];
        }
        $ctrl.helperCtrl.onMulti.push($ctrl._onCopy);

        if (!$ctrl.helperCtrl.componentsIds) {
            $ctrl.helperCtrl.componentsIds = [];
        }
        $ctrl.helperCtrl.componentsIds.push($ctrl.labelText);

        $ctrl.have_helper_keys = false;
    };

    $ctrl.clean = function() {
        $ctrl.$helper_keys = {};
        $ctrl.have_helper_keys = false;
    };
}]);

angular.module('opengate-angular-js').component('helperUiSelect', {
    templateUrl: 'helper/views/custom.ui.select.helper.html',
    transclude: {
        input: '?helperUiSelectInput'
            //,custom: '?helperUiSelectCustom'
    },
    require: {
        helperCtrl: '^^helperDialog'
    },
    controller: 'helperUiSelectController',
    bindings: {
        id: '@',
        name: '@',
        labelText: '@',
        helperModel: '=',
        required: '<',
        multiple: '<',
        labelError: '@',
        selectedKeys: '<'
    }

});


angular.module('opengate-angular-js')
    .directive('customUiSelect', ['$compile', 'Filter',
        function($compile, Filter) {
            var button = angular.element('<div title="Toggle Advanced/Basic filter search" ng-click="complex()" style="cursor:pointer" class="custom-ui-select-button input-group-addon"><i class="fa fa-filter"></i><i class="filter-icon fa fa-bold text-muted"></i></div>');
            var container = angular.element('<div class="custom-ui-select-container input-group"></div>');
            var style = angular.element('<style title="custom-ui-select-no-multiple">.custom-ui-select-no-multiple .ui-select-search[placeholder=""]{display:none}</style>');


            var setRefresh = function(obj, fnc) {
                var choices = obj.querySelectorAll('ui-select-choices');
                choices.attr('refresh', fnc);
                choices.attr('refresh-delay', '0');
            };

            return {
                require: 'uiSelect',
                scope: true,
                bindToController: true,
                controller: ["$scope", "$element", "$attrs", "$q", "$timeout", function($scope, $element, $attrs, $q, $timeout) {
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

                                        $scope.$apply();
                                    } else {
                                        uiConfig.collection.splice(0, uiConfig.collection.length);

                                        if (data.statusCode !== 204) {
                                            //toastr.error('Loading error');
                                            // console.error(JSON.stringify(data));
                                        } else {
                                            //   console.log(JSON.stringify(data));
                                        }
                                        $scope.$apply();
                                    }

                                }
                            ).catch(function(err) {
                                console.error(err);
                                $attrs.$$button.querySelectorAll('.filter-icon').removeClass('fa-spinner').removeClass('fa-spin').addClass('fa-filter');
                            });
                        }

                    }
                }],
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
                        templateAttributes.$$style = style.clone();
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

                        var head = angular.element('html head');
                        if ($attrs.$$style && head.find('style[title="custom-ui-select-no-multiple"]').length === 0)
                            head.append($attrs.$$style);

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



angular.module('opengate-angular-js').controller('uiSelectResourceTypeController', ['$scope', '$element', '$attrs', '$api', function($scope, $element, $attrs, $api) {
    var ctrl = this;
    ctrl.ownConfig = {
        builder: $api().resourceTypeSearchBuilder(),
        filter: function(search) {},
        rootKey: 'resourceType',
        collection: [],
        customSelectors: $api().resourceTypeSearchBuilder()
    };

    ctrl.resourceTypeSelected = function($item, $model) {
        var returnObj = {};
        returnObj.$item = $item;
        returnObj.$model = $model;
        ctrl.onSelectItem(returnObj);
    };

    ctrl.resourceTypeRemove = function($item, $model) {
        ctrl.onRemove($item, $model);
    };
}]);

angular.module('opengate-angular-js').component('uiSelectResourceType', {

    templateUrl: 'custom-ui-select/views/ui.select.resourceType.html',
    controller: 'uiSelectResourceTypeController',
    bindings: {
        onSelectItem: '&',
        onRemove: '&',
        resourceType: '=',
        multiple: '<',
        required: '=',
        uiSelectMatchClass: '@?'
    }

});



angular.module('opengate-angular-js').controller('uiSelectFaStylesController', ['$scope', 'faStylesService', '$window', function($scope, faStylesService, $window) {
    var ctrl = this;

    ctrl.availableIcons = faStylesService.getStyles();
    var intervalIconsid = -1;
    ctrl.maxIcons = 50;
    ctrl.onOpenClose = function(isOpen) {
        ctrl.maxIcons = 50;
        $window.clearInterval(intervalIconsid);
        if (isOpen) {
            intervalIconsid = $window.setInterval(function() {
                ctrl.maxIcons = ctrl.maxIcons + 50;

                if (ctrl.maxIcons > Object.keys(ctrl.availableIcons).length) {
                    $window.clearInterval(intervalIconsid);
                }
                $scope.$apply();
            }, 500);
        }
    };

    ctrl.iconSelected = function($item, $model) {
        var returnObj = {};
        returnObj.$item = $item;
        returnObj.$model = $model;
        ctrl.onSelectItem(returnObj);
    };

    ctrl.iconRemove = function($item, $model) {
        ctrl.onRemove($item, $model);
    };
}]);

angular.module('opengate-angular-js').component('uiSelectFaStyles', {

    templateUrl: 'custom-ui-select/views/ui.select.icon.html',
    controller: 'uiSelectFaStylesController',
    bindings: {
        onSelectItem: '&',
        onRemove: '&',
        required: '=',
        allowClear: '=',
        disabled: '=',
        icon: '=',
        title: '@',
        label: '=',
        uiSelectMatchClass: '@?'
    }

});



angular.module('opengate-angular-js').controller('customUiSelectTicketController', ['$scope', '$element', '$attrs', '$api', function($scope, $element, $attrs, $api) {
    var ctrl = this;
    ctrl.ownConfig = {
        builder: $api().ticketsSearchBuilder(),
        filter: function(search) {
            return {
                'or': [
                    { 'like': { 'provision.administration.identifier': search } },
                    { 'like': { 'provision.ticket.specificType': search } },
                    { 'like': { 'provision.ticket.name': search } },
                    { 'like': { 'provision.ticket.type': search } },
                    { 'like': { 'provision.ticket.entity': search } }
                ]
            };
        },
        rootKey: 'tickets',
        collection: [],
        customSelectors: $api().ticketsSearchBuilder()
    };

    ctrl.ticketSelected = function($item, $model) {
        var returnObj = {};
        returnObj.$item = $item;
        returnObj.$model = $model;
        ctrl.onSelectItem(returnObj);
    };

    ctrl.ticketRemove = function($item, $model) {
        ctrl.onRemove($item, $model);
    };
}]);

angular.module('opengate-angular-js').component('customUiSelectTicket', {

    templateUrl: 'custom-ui-select/views/custom.ui.select.ticket.html',
    controller: 'customUiSelectTicketController',
    bindings: {
        onSelectItem: '&',
        onRemove: '&',
        ticket: '=',
        multiple: '<',
        required: '=',
        uiSelectMatchClass: '@?'
    }

});



angular.module('opengate-angular-js').controller('customUiSelectSubscriptionController', ['$scope', '$element', '$attrs', '$api', '$entityExtractor', '$translate', '$doActions', '$jsonFinderHelper', 'jsonPath',
    function($scope, $element, $attrs, $api, $entityExtractor, $translate, $doActions, $jsonFinderHelper, jsonPath) {
        var ctrl = this;
        ctrl.ownConfig = {
            builder: $api().subscriptionsSearchBuilder().provisioned(),
            filter: function(search) {
                var filter = {
                    'or': [
                        { 'like': { 'provision.device.communicationModules[].subscription.identifier': search } },
                        { 'like': { 'device.communicationModules[].subscription.identifier': search } }
                    ]
                };
                if (!!ctrl.specificType) {
                    filter = {
                        'and': [
                            filter,
                            {
                                'or': [{
                                        'eq': {
                                            'device.communicationModules[].subscription.specificType': ctrl.specificType
                                        }
                                    },
                                    {
                                        'eq': {
                                            'provision.device.communicationModules[].subscription.specificType': ctrl.specificType
                                        }
                                    }
                                ]
                            }
                        ]
                    };
                }

                if (ctrl.excludeDevices) {
                    if (filter.and) {
                        filter.and.push({
                            'eq': {
                                'resourceType': 'entity.subscription'
                            }
                        });
                    } else {
                        filter = {
                            'and': [
                                filter,
                                {
                                    'eq': {
                                        'resourceType': 'entity.subscription'
                                    }
                                }
                            ]
                        };
                    }
                }
                if (ctrl.organization && typeof ctrl.organization === 'string') {
                    if (filter.and) {
                        filter.and.push({
                            'eq': {
                                'provision.administration.organization': ctrl.organization
                            }
                        });
                    } else {
                        filter = {
                            'and': [
                                filter,
                                {
                                    'eq': {
                                        'provision.administration.organization': ctrl.organization
                                    }
                                }
                            ]
                        };
                    }
                }
                if (ctrl.channel && typeof ctrl.channel === 'string') {
                    if (filter.and) {
                        filter.and.push({
                            'eq': {
                                'provision.administration.channel': ctrl.channel
                            }
                        });
                    } else {
                        filter = {
                            'and': [
                                filter,
                                {
                                    'eq': {
                                        'provision.administration.channel': ctrl.channel
                                    }
                                }
                            ]
                        };
                    }
                }

                return filter;
            },
            rootKey: 'devices',
            collection: [],
            customSelectors: $api().subscriptionsSearchBuilder().provisioned(),
            processingData: $entityExtractor.extractSubscriptions,
            specificType: ctrl.specificType,
            organization: ctrl.organization,
            channel: ctrl.channel
        };

        ctrl.entitySelected = function($item, $model) {
            var returnObj = {};
            returnObj.$item = $item;
            returnObj.$model = $model;
            ctrl.onSelectItem(returnObj);
        };

        ctrl.entityRemove = function($item, $model) {
            ctrl.onRemove($item, $model);
        };


        if (!ctrl.actions) {
            ctrl.actions = [{
                title: $translate.instant('FORM.LABEL.NEW'),
                icon: 'glyphicon glyphicon-plus-sign',
                action: function() {
                    $doActions.executeModal('createSubscription', {}, function(result) {
                        if (result && result.length > 0) {
                            ctrl.entity = !ctrl.entity ? [] : ctrl.entity;
                            ctrl.entity.push({
                                provision: {
                                    administration: {
                                        identifier: {
                                            _current: {
                                                value: result[0].identifier
                                            }
                                        }
                                    },
                                    subscription: {
                                        identifier: {
                                            _current: {
                                                value: result[0].identifier
                                            }
                                        }
                                    }
                                }
                            });
                        }
                    });
                },
                permissions: 'manageEntity'
            }, {
                title: $translate.instant('BUTTON.TITLE.EXECUTE_OPERATION'),
                icon: 'glyphicon glyphicon-flash',
                action: function() {
                    $doActions.executeModal('executeOperation', {
                        keys: jsonPath(ctrl.entity, '$..' + $jsonFinderHelper.subscription.provisioned.getPath('identifier') + '._current.value') || [],
                        entityType: 'SUBSCRIPTION'
                    });
                },
                disable: function() {
                    return !ctrl.entity || ctrl.entity.length === 0;
                },
                permissions: 'executeOperation'
            }];
        }

        if (ctrl.required !== undefined) {
            ctrl.ngRequired = ctrl.required;
        }
    }
]);

angular.module('opengate-angular-js').component('customUiSelectSubscription', {

    templateUrl: 'custom-ui-select/views/custom.ui.select.subscription.html',
    controller: 'customUiSelectSubscriptionController',
    bindings: {
        onSelectItem: '&',
        onRemove: '&',
        entity: '=',
        specificType: '@',
        organization: '@',
        channel: '@',
        multiple: '<',
        ngRequired: '<',
        required: '<',
        excludeDevices: '=',
        action: '=?',
        uiSelectMatchClass: '@?'
    }

});



angular.module('opengate-angular-js').controller('customUiSelectSubscriberController', ['$scope', '$element', '$attrs', '$api', '$entityExtractor',
    function($scope, $element, $attrs, $api, $entityExtractor) {

        var ctrl = this;
        ctrl.ownConfig = {
            builder: $api().subscribersSearchBuilder().provisioned(),
            filter: function(search) {
                var filter = {
                    'or': [
                        { 'like': { 'provision.device.communicationModules[].subscriber.identifier': search } },
                        { 'like': { 'device.communicationModules[].subscriber.identifier': search } },
                        { 'like': { 'provision.device.communicationModules[].subscriber.mobile.icc': search } }
                    ]
                };
                if (!!ctrl.specificType) {
                    filter = {
                        'and': [
                            filter,
                            {
                                'or': [{
                                        'eq': {
                                            'device.communicationModules[].subscriber.specificType': ctrl.specificType
                                        }
                                    },
                                    {
                                        'eq': {
                                            'provision.device.communicationModules[].subscriber.specificType': ctrl.specificType
                                        }
                                    }
                                ]
                            }
                        ]
                    };
                }

                if (ctrl.excludeDevices) {
                    if (filter.and) {
                        filter.and.push({
                            'eq': {
                                'resourceType': 'entity.subscriber'
                            }
                        });
                    } else {
                        filter = {
                            'and': [
                                filter,
                                {
                                    'eq': {
                                        'resourceType': 'entity.subscriber'
                                    }
                                }
                            ]
                        };
                    }
                }

                if (ctrl.organization) {
                    if (filter.and) {
                        filter.and.push({
                            'eq': {
                                'provision.administration.organization': ctrl.organization
                            }
                        });
                    } else {
                        filter = {
                            'and': [
                                filter,
                                {
                                    'eq': {
                                        'provision.administration.organization': ctrl.organization
                                    }
                                }
                            ]
                        };
                    }
                }
                if (ctrl.channel) {
                    if (filter.and) {
                        filter.and.push({
                            'eq': {
                                'provision.administration.channel': ctrl.channel
                            }
                        });
                    } else {
                        filter = {
                            'and': [
                                filter,
                                {
                                    'eq': {
                                        'provision.administration.channel': ctrl.channel
                                    }
                                }
                            ]
                        };
                    }
                }

                return filter;
            },
            rootKey: 'devices',
            collection: [],
            customSelectors: $api().subscribersSearchBuilder().provisioned(),
            processingData: $entityExtractor.extractSubscribers,
            specificType: ctrl.specificType,
            organization: ctrl.organization,
            channel: ctrl.channel
        };

        ctrl.entitySelected = function($item, $model) {
            var returnObj = {};
            returnObj.$item = $item;
            returnObj.$model = $model;
            ctrl.onSelectItem(returnObj);
        };

        ctrl.entityRemove = function($item, $model) {
            ctrl.onRemove($item, $model);
        };

        if (ctrl.required !== undefined) {
            ctrl.ngRequired = ctrl.required;
        }
    }
]);

angular.module('opengate-angular-js').component('customUiSelectSubscriber', {

    templateUrl: 'custom-ui-select/views/custom.ui.select.subscriber.html',
    controller: 'customUiSelectSubscriberController',
    bindings: {
        onSelectItem: '&',
        onRemove: '&',
        entity: '=',
        organization: '@',
        channel: '@',
        specificType: '@',
        multiple: '<',
        ngRequired: '<',
        required: '<',
        excludeDevices: '=',
        uiSelectMatchClass: '@?'
    }

});



angular.module('opengate-angular-js').controller('customUiSelectServiceGroupController', ['$scope', '$element', '$attrs', '$api', '$q',
    function($scope, $element, $attrs, $api, $q) {
        var ctrl = this;

        var builder = $api().serviceGroupSearchBuilder();
        if (!!ctrl.entityType && ctrl.entityType.toUpperCase() !== 'DEVICE') {
            builder.withEntityType(ctrl.entityType.toUpperCase());
        } else {
            builder.withEntityType('GATEWAY');
        }

        var savedSearch;
        ctrl.ownConfig = {
            builder: builder,
            filter: function(search) {
                savedSearch = search;
            },
            rootKey: 'serviceGroups',
            collection: [],
            simpleMode: true,
            customSelectors: builder,
            processingData: function(result, serviceGroups) {
                var serviceGroupsFormatted = serviceGroups.map(function(item) {
                    return {
                        name: item
                    };
                });

                if (savedSearch) {
                    serviceGroupsFormatted = serviceGroupsFormatted.filter(function(tmp) {
                        return tmp.name.toLowerCase().indexOf(savedSearch.trim().toLowerCase()) !== -1;
                    });
                }

                var deferred = $q.defer();

                deferred.resolve(serviceGroupsFormatted);

                return deferred.promise;
            }
        };

        ctrl.serviceGroupSelected = function($item, $model) {
            if (ctrl.multiple) {
                var identifierTmp = [];

                angular.forEach(ctrl.serviceGroup, function(sgTmp) {
                    identifierTmp.push(sgTmp.name);
                });

                ctrl.ngModel = identifierTmp;
            } else {
                ctrl.ngModel = $item.name;
            }

            if (ctrl.onSelectItem) {
                var returnObj = {};
                returnObj.$item = $item;
                returnObj.$model = $model;
                ctrl.onSelectItem(returnObj);
            }
        };

        ctrl.serviceGroupRemove = function($item, $model) {
            if (ctrl.onRemove) {
                ctrl.onRemove($item, $model);
            }

            if (ctrl.multiple) {
                if (ctrl.ngModel && ctrl.ngModel.indexOf($item.name) !== -1) {
                    ctrl.ngModel.splice(ctrl.ngModel.indexOf($item.name), 1);
                }
            } else {
                ctrl.ngModel = undefined;
            }
        };


        ctrl.$onChanges = function(changesObj) {
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
                        ctrl.serviceGroup = [];

                        angular.forEach(identifier, function(idTmp) {
                            ctrl.serviceGroup.push({
                                name: idTmp
                            });
                        });
                    }

                } else {
                    ctrl.serviceGroup = [{
                        name: ctrl.identifier
                    }];
                }
            } else {
                ctrl.serviceGroup = [];
            }
        }
    }
]);

angular.module('opengate-angular-js').component('customUiSelectServiceGroup', {

    templateUrl: 'custom-ui-select/views/custom.ui.select.servicegroup.html',
    controller: 'customUiSelectServiceGroupController',
    bindings: {
        onSelectItem: '&',
        onRemove: '&',
        serviceGroup: '=',
        entityType: '<?',
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



angular.module('opengate-angular-js').controller('customUiSelectProvisionDatastreamController', ['$api', '$q', '$provisionDatastreamsUtils',
    function ($api, $q, $provisionDatastreamsUtils) {
        var ctrl = this;
        ctrl.filter = 'provision.';

        ctrl.ownConfig = {
            builder: $api().datamodelsSearchBuilder(),
            filter: function (search) {
                ctrl.lastSearch = search;
                var filter = $provisionDatastreamsUtils.getFilter();
                if (ctrl.allowedResourceTypes) {
                    var allowedResourceTypes = ctrl.allowedResourceTypes.replace("\s*,\s*", ",").split(",");
                    filter.and.push({
                        'in': {
                            'datamodels.allowedResourceTypes': allowedResourceTypes
                        }
                    });
                }

                if (ctrl.organization && ctrl.organization.length > 0) {
                    if (!filter.and) {
                        filter.and = [];
                    }
                    filter.and.push({
                        'eq': {
                            'datamodels.organizationName': ctrl.organization
                        }
                    });
                }

                if (search) {
                    var orFilter = {
                        or: [{
                                'like': {
                                    'datamodels.categories.datastreams.identifier': search
                                }
                            },
                            {
                                'like': {
                                    'datamodels.categories.datastreams.name': search
                                }
                            }
                        ]
                    };
                    filter.and.push(orFilter);
                }
                return filter;
            },
            rootKey: 'datamodels',
            collection: [],
            processingData: function (data, collection) {
                return $q(function (ok) {
                    var _datastreams = [];
                    var datamodels = data.data.datamodels;
                    datamodels = $provisionDatastreamsUtils.filterForCoreDatamodelsCatalog(datamodels);
                    angular.forEach(datamodels, function (datamodel, key) {
                        var categories = datamodel.categories;
                        var _datamodel = {
                            identifier: datamodel.identifier,
                            description: datamodel.description,
                            name: datamodel.name,
                            organization: datamodel.organizationName
                        };
                        angular.forEach(categories, function (category, key) {
                            var datastreams = category.datastreams;
                            if (datastreams) {
                                var _category = {
                                    identifier: category.identifier
                                };
                                angular.forEach(datastreams
                                    .filter(function (ds) {
                                        if (/^(provision\.).*/.test(ds.identifier)) {
                                            return (ds.identifier.indexOf(ctrl.lastSearch) > -1 && !!ctrl.lastSearch.length) || !ctrl.lastSearch;
                                        }
                                        return false;
                                    }),
                                    function (datastream, key) {
                                        var _datastream = angular.copy(datastream);
                                        _datastream.datamodel = _datamodel;
                                        _datastream.category = _category;
                                        _datastreams.push(_datastream);
                                    });
                            }
                        });
                    });
                    angular.copy(_datastreams, collection);
                    ok(collection);
                });
            },
            customSelectors: $api().datamodelsSearchBuilder()
        };

        ctrl.datastreamSelected = function ($item, $model) {
            var returnObj = {};
            returnObj.$item = $item;
            returnObj.$model = $model;
            ctrl.onSelectItem(returnObj);
        };

        ctrl.datastreamRemove = function ($item, $model) {
            var returnObj = {};
            returnObj.$item = $item;
            returnObj.$model = $model;
            ctrl.onRemove(returnObj);
        };
    }
]);

angular.module('opengate-angular-js').component('customUiSelectProvisionDatastream', {
    templateUrl: 'custom-ui-select/views/custom.ui.select.datastream.html',
    controller: 'customUiSelectProvisionDatastreamController',
    bindings: {
        onSelectItem: '&',
        onRemove: '&',
        datastream: '=',
        multiple: '<',
        required: '=',
        organization: '=',
        allowedResourceTypes: '=',
        uiSelectMatchClass: '@?'
    }

});



angular.module('opengate-angular-js').controller('customUiSelectOrganizationController', ['$scope', '$element', '$attrs', '$api', 'Authentication', '$q',
    function($scope, $element, $attrs, $api, Authentication, $q) {
        var ctrl = this;

        var savedSearch;
        ctrl.ownConfig = {
            builder: $api().newOrganizationFinder().findByDomainAndWorkgroup(Authentication.getUser().domain, Authentication.getUser().workgroup),
            filter: function(search) {
                savedSearch = search;
            },
            rootKey: undefined,
            collection: [],
            isGet: true,
            simpleMode: true,
            customSelectors: $api().newOrganizationFinder().findByDomainAndWorkgroup(Authentication.getUser().domain, Authentication.getUser().workgroup),
            processingData: function(result, organizations) {
                var organizationsFormatted = organizations;
                if (savedSearch) {
                    organizationsFormatted = organizations.filter(function(tmp) {
                        return tmp.name.toLowerCase().indexOf(savedSearch.trim().toLowerCase()) !== -1;
                    });
                }

                var deferred = $q.defer();

                deferred.resolve(organizationsFormatted);

                return deferred.promise;
            }
        };

        ctrl.organizationSelected = function($item, $model) {
            if (ctrl.multiple) {
                var identifierTmp = [];

                angular.forEach(ctrl.organization, function(organizationTmp) {
                    identifierTmp.push(organizationTmp.name);
                });

                ctrl.ngModel = identifierTmp;
            } else {
                ctrl.ngModel = $item.name;
            }

            if (ctrl.onSelectItem) {
                var returnObj = {};
                returnObj.$item = $item;
                returnObj.$model = $model;
                ctrl.onSelectItem(returnObj);
            }
        };

        ctrl.organizationRemove = function($item, $model) {
            if (ctrl.onRemove) {
                ctrl.onRemove($item, $model);
            }

            if (ctrl.multiple) {
                if (ctrl.ngModel && ctrl.ngModel.indexOf($item.name) !== -1) {
                    ctrl.ngModel.splice(ctrl.ngModel.indexOf($item.name), 1);
                }
            } else {
                ctrl.ngModel = undefined;
            }
        };


        ctrl.$onChanges = function(changesObj) {
            if (changesObj && changesObj.identifier) {
                mapIdentifier(changesObj.identifier.currentValue);
            }
        };

        if (ctrl.required !== undefined) {
            ctrl.ngRequired = ctrl.required;
        }

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
                        ctrl.organization = [];

                        angular.forEach(identifier, function(idTmp) {
                            ctrl.organization.push({
                                name: idTmp
                            });
                        });
                    }

                } else {
                    ctrl.organization = [{
                        name: ctrl.identifier
                    }];
                }
            } else {
                ctrl.organization = [];
            }
        }
    }
]);

angular.module('opengate-angular-js').component('customUiSelectOrganization', {

    templateUrl: 'custom-ui-select/views/custom.ui.select.organization.html',
    controller: 'customUiSelectOrganizationController',
    bindings: {
        onSelectItem: '&',
        onRemove: '&',
        organization: '=',
        identifier: '<?',
        multiple: '<',
        ngRequired: '<',
        required: '<',
        label: '<',
        action: '<?',
        disabled: '<?',
        ngModel: '=?',
        uiSelectMatchClass: '@?'
    }

});



angular.module('opengate-angular-js').controller('customUiSelectOgtypeListController', ['$scope', '$element', '$attrs', '$api', '$q', function($scope, $element, $attrs, $api, $q) {
    var ctrl = this;
    var builder = $api().basicTypesSearchBuilder();
    if (ctrl.path) {
        builder = builder.withPath(ctrl.path);
    }
    ctrl.ownConfig = {
        builder: builder.build().execute(),
        filter: function(search) {},
        rootKey: 'enum',
        collection: [],
        isGet: true,
        customSelectors: builder.build().execute(),
        path: ctrl.path
    };

    ctrl.elementSelected = function($item, $model) {
        if (ctrl.multiple) {
            var identifierTmp = [];

            angular.forEach(ctrl.element, function(element) {
                identifierTmp.push(element);
            });

            ctrl.ngModel = identifierTmp;
        } else {
            ctrl.ngModel = $item;
        }

        if (ctrl.onSelectItem) {
            var returnObj = {};
            returnObj.$item = $item;
            returnObj.$model = $model;
            ctrl.onSelectItem(returnObj);
        }
    };

    ctrl.elementRemove = function($item, $model) {
        if (ctrl.onRemove) {
            ctrl.onRemove($item, $model);
        }
        ctrl.ngModel = undefined;
    };


    ctrl.$onChanges = function(changesObj) {
        if (changesObj && changesObj.identifier) {
            mapIdentifier(changesObj.identifier.currentValue);
        }
    };

    if (ctrl.required !== undefined) {
        ctrl.ngRequired = ctrl.required;
    }

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
                    ctrl.element = [];

                    angular.forEach(identifier, function(idTmp) {
                        ctrl.element.push({
                            name: idTmp
                        });
                    });
                }

            } else {
                ctrl.element = [{
                    name: ctrl.identifier
                }];
            }
        } else {
            ctrl.element = [];
        }
    }
}]);

angular.module('opengate-angular-js').component('customUiSelectOgtypeList', {

    templateUrl: 'custom-ui-select/views/custom.ui.select.ogtypelist.html',
    controller: 'customUiSelectOgtypeListController',
    bindings: {
        onSelectItem: '&',
        onRemove: '&',
        element: '=',
        identifier: '<?',
        path: '@?',
        multiple: '<',
        ngRequired: '<',
        required: '<',
        label: '=',
        placeholder: '@',
        action: '=?',
        disabled: '<?',
        ngModel: '=?',
        uiSelectMatchClass: '@?'
    }


});



angular.module('opengate-angular-js').controller('customUiSelectEntityController', ['$scope', '$element', '$attrs', '$api',
    function($scope, $element, $attrs, $api) {
        var ctrl = this;

        var selectBuilder = $api().newSelectBuilder();
        var SE = $api().SE;

        selectBuilder.add(SE.element('provision.administration.identifier', [{
            field: 'value'
        }]));
        selectBuilder.add(SE.element('provision.administration.organization', [{
            field: 'value'
        }]));
        selectBuilder.add(SE.element('provision.administration.channel', [{
            field: 'value'
        }]));
        selectBuilder.add(SE.element('resourceType', [{
            field: 'value'
        }]));
        selectBuilder.add(SE.element('provision.device.identifier', [{
            field: 'value'
        }]));
        selectBuilder.add(SE.element('provision.device.specificType', [{
            field: 'value'
        }]));
        selectBuilder.add(SE.element('provision.device.operationalStatus', [{
            field: 'value'
        }]));
        selectBuilder.add(SE.element('provision.device.communicationModules[].specificType', [{
            field: 'value'
        }]));
        selectBuilder.add(SE.element('provision.device.communicationModules[].subscription.specificType', [{
            field: 'value'
        }]));
        selectBuilder.add(SE.element('provision.device.communicationModules[].subscriber.specificType', [{
            field: 'value'
        }]));

        selectBuilder.add(SE.element('provision.asset.identifier', [{
            field: 'value'
        }]));
        selectBuilder.add(SE.element('provision.asset.specificType', [{
            field: 'value'
        }]));

        ctrl.ownConfig = {
            builder: $api().entitiesSearchBuilder().select(selectBuilder),
            filter: function(search) {
                return {
                    'or': [
                        { 'like': { 'provision.administration.identifier': search } },
                        { 'like': { 'provision.device.specificType': search } },
                        { 'like': { 'device.specificType': search } },
                        { 'like': { 'provision.entity.specificType': search } },
                        { 'like': { 'provision.device.communicationModules[].specificType': search } }
                    ]
                };
            },
            rootKey: 'entities',
            collection: [],
            customSelectors: $api().entitiesSearchBuilder()
        };

        ctrl.entitySelected = function($item, $model) {
            if (ctrl.multiple) {
                var identifierTmp = ctrl.ngModel || [];

                angular.forEach(ctrl.entity, function(entityTmp) {
                    identifierTmp.push(entityTmp.provision.administration.identifier._current.value);
                });

                ctrl.ngModel = identifierTmp;
            } else {
                ctrl.ngModel = $item.provision.administration.identifier._current.value;
            }

            if (ctrl.onSelectItem) {
                var returnObj = {};
                returnObj.$item = $item;
                returnObj.$model = $model;
                ctrl.onSelectItem(returnObj);
            }
        };

        ctrl.entityRemove = function($item, $model) {
            if (ctrl.onRemove) {
                ctrl.onRemove($item, $model);
            }

            if (ctrl.multiple) {
                if (ctrl.ngModel && ctrl.ngModel.indexOf($item.provision.administration.identifier._current.value) !== -1) {
                    ctrl.ngModel.splice(ctrl.ngModel.indexOf($item.provision.administration.identifier._current.value), 1);
                }
            } else {
                ctrl.ngModel = undefined;
            }
        };

        ctrl.$onChanges = function(changesObj) {
            if (changesObj && changesObj.identifier) {
                mapIdentifier(changesObj.identifier.currentValue);
            }
        };

        if (ctrl.required !== undefined) {
            ctrl.ngRequired = ctrl.required;
        }

        if (ctrl.identifier) {
            mapIdentifier(ctrl.identifier);
        }

        function mapIdentifier(identifierSource) {
            var identifier = identifierSource;

            if (identifier) {
                if (identifier._current) {
                    identifier = identifier._current.value;
                }

                if (ctrl.multiple) {
                    if (angular.isArray(identifier)) {
                        ctrl.entity = [];

                        angular.forEach(identifier, function(idTmp) {
                            ctrl.entity.push({
                                provision: {
                                    administration: {
                                        identifier: {
                                            _current: { value: idTmp }
                                        }
                                    }
                                }
                            });
                        });
                    }
                } else {
                    ctrl.entity = [{
                        provision: {
                            administration: {
                                identifier: {
                                    _current: { value: ctrl.identifier }
                                }
                            }
                        }
                    }];
                }
            } else {
                ctrl.entity = [];
            }
        }
    }
]);

angular.module('opengate-angular-js').component('customUiSelectEntity', {

    templateUrl: 'custom-ui-select/views/custom.ui.select.entity.html',
    controller: 'customUiSelectEntityController',
    bindings: {
        onSelectItem: '&',
        onRemove: '&',
        entity: '=',
        identifier: '<?',
        multiple: '<',
        ngRequired: '<',
        required: '<',
        label: '<',
        action: '<?',
        disabled: '<?',
        ngModel: '=?',
        uiSelectMatchClass: '@?'
    }

});



angular.module('opengate-angular-js').controller('customUiSelectDomainController', ['$scope', '$element', '$attrs', '$api', function($scope, $element, $attrs, $api) {
    var ctrl = this;
    ctrl.ownConfig = {
        builder: $api().domainsSearchBuilder(),
        rootKey: 'domains',
        collection: [],
        filter: function(search) {
            return {
                'or': [{
                        'like': {
                            'domain.name': search
                        }
                    },
                    {
                        'like': {
                            'domain.description': search
                        }
                    }
                ]
            };
        },
        customSelectors: $api().domainsSearchBuilder()
    };

    ctrl.domainSelected = function($item, $model) {
        var returnObj = {};
        returnObj.$item = $item;
        returnObj.$model = $model;
        ctrl.onSelectItem(returnObj);
    };

    ctrl.domainRemove = function($item, $model) {
        ctrl.onRemove($item, $model);
    };
}]);

angular.module('opengate-angular-js').component('customUiSelectDomain', {

    templateUrl: 'custom-ui-select/views/custom.ui.select.domain.html',
    controller: 'customUiSelectDomainController',
    bindings: {
        onSelectItem: '&',
        onRemove: '&',
        domain: '=',
        multiple: '<',
        required: '=',
        label: '=',
        uiSelectMatchClass: '@?'
    }

});



angular.module('opengate-angular-js').controller('customUiSelectDeviceController', ['$scope', '$element', '$attrs', '$api', '$translate', '$doActions', '$jsonFinderHelper', 'jsonPath', '_',
    function($scope, $element, $attrs, $api, $translate, $doActions, $jsonFinderHelper, jsonPath, _) {
        var selectBuilder = $api().newSelectBuilder();
        var SE = $api().SE;

        selectBuilder.add(SE.element('provision.administration.identifier', [{
            field: 'value'
        }]));
        selectBuilder.add(SE.element('provision.administration.organization', [{
            field: 'value'
        }]));
        selectBuilder.add(SE.element('provision.administration.channel', [{
            field: 'value'
        }]));
        selectBuilder.add(SE.element('resourceType', [{
            field: 'value'
        }]));
        selectBuilder.add(SE.element('provision.device.identifier', [{
            field: 'value'
        }]));
        selectBuilder.add(SE.element('provision.device.specificType', [{
            field: 'value'
        }]));
        selectBuilder.add(SE.element('provision.device.operationalStatus', [{
            field: 'value'
        }]));

        selectBuilder.add(SE.element('provision.device.communicationModules[].specificType', [{
            field: 'value'
        }]));
        selectBuilder.add(SE.element('provision.device.communicationModules[].subscription.specificType', [{
            field: 'value'
        }]));
        selectBuilder.add(SE.element('provision.device.communicationModules[].subscriber.specificType', [{
            field: 'value'
        }]));

        var ctrl = this;
        ctrl.ownConfig = {
            builder: $api().devicesSearchBuilder().select(selectBuilder),
            filter: function(search) {
                var filter = {
                    'or': [{
                            'like': {
                                'provision.administration.identifier': search
                            }
                        },
                        {
                            'like': {
                                'provision.device.specificType': search
                            }
                        },
                        {
                            'like': {
                                'device.specificType': search
                            }
                        }
                    ]
                };

                if (!!ctrl.specificType) {
                    filter = {
                        'and': [
                            filter,
                            {
                                'or': [{
                                        'eq': {
                                            'device.specificType': ctrl.specificType
                                        }
                                    },
                                    {
                                        'eq': {
                                            'provision.device.specificType': ctrl.specificType
                                        }
                                    }
                                ]
                            }
                        ]
                    };
                }

                return filter;
            },
            rootKey: 'devices',
            collection: [],
            customSelectors: $api().devicesSearchBuilder(),
            specificType: ctrl.specificType
        };

        ctrl.deviceSelected = function($item, $model) {
            if (ctrl.multiple) {
                var identifierTmp = [];

                angular.forEach(ctrl.device, function(deviceTmp) {
                    identifierTmp.push(deviceTmp.provision.administration.identifier._current.value);
                });

                ctrl.ngModel = identifierTmp;
            } else {
                ctrl.ngModel = $item.provision.administration.identifier._current.value;
            }

            if (ctrl.onSelectItem) {
                var returnObj = {};
                returnObj.$item = $item;
                returnObj.$model = $model;
                ctrl.onSelectItem(returnObj);
            }
        };

        ctrl.deviceRemove = function($item, $model) {
            if (ctrl.onRemove) {
                ctrl.onRemove($item, $model);
            }

            if (ctrl.multiple) {
                if (ctrl.ngModel && ctrl.ngModel.indexOf($item.provision.administration.identifier._current.value) !== -1) {
                    ctrl.ngModel.splice(ctrl.ngModel.indexOf($item.provision.administration.identifier._current.value), 1);
                }
            } else {
                ctrl.ngModel = undefined;
            }

        };

        ctrl.editDevice = function(deviceData) {
            var deviceFinder = $api().devicesSearchBuilder().filter({
                "and": [{
                    "eq": {
                        "provision.device.identifier": deviceData.provision.administration.identifier._current.value || deviceData.identifier
                    }
                }]
            });

            deviceFinder.build().execute()
                .then(function(result) {
                    if (result.statusCode === 204) {
                        $translate('TOASTR.ENTITY_NOT_FOUND', {
                            identifier: entityId
                        }).
                        then(function(translatedMessage) {
                            toastr.error(translatedMessage);
                        });
                    } else {
                        $doActions.executeModal('editDevice', angular.copy(result.data.devices[0]));
                    }
                })
                .catch(function(err) {
                    $translate('TOASTR.CANNOT_GET_ENTITY_INFO').
                    then(function(translatedMessage) {
                        toastr.error(translatedMessage);
                    });
                });
        };

        // Actions que finalmente se mostrarán en el control
        ctrl._actions = [{
            title: $translate.instant('FORM.LABEL.NEW'),
            icon: 'glyphicon glyphicon-plus-sign',
            action: function() {
                var actionData = {};
                if (!!ctrl.specificType) {
                    actionData = {
                        resourceType: {
                            _current: {
                                value: 'entity.device'
                            }
                        },
                        provision: {
                            device: {
                                specificType: {
                                    _current: {
                                        value: ctrl.specificType
                                    }
                                }
                            }
                        }
                    };
                }
                $doActions.executeModal('createDevice', actionData, function(result) {
                    if (result && result.length > 0) {
                        ctrl.device = !ctrl.device ? [] : ctrl.device;
                        ctrl.device.push({
                            provision: {
                                administration: {
                                    identifier: {
                                        _current: {
                                            value: result[0].identifier
                                        }
                                    }
                                },
                                device: {
                                    identifier: {
                                        _current: {
                                            value: result[0].identifier
                                        }
                                    }
                                }
                            }
                        });
                    }
                });
            },
            permissions: 'manageEntity'
        }];

        if (!ctrl.actions) {
            ctrl._actions.push({
                title: $translate.instant('BUTTON.TITLE.EXECUTE_OPERATION'),
                icon: 'glyphicon glyphicon-flash',
                action: function() {
                    $doActions.executeModal('executeOperation', {
                        keys: jsonPath(ctrl.device, '$..' + $jsonFinderHelper.provisioned.getPath('identifier') + '._current.value') || [],
                        entityType: 'GATEWAY'
                    });
                },
                disable: function() {
                    return !ctrl.device || ctrl.device.length === 0;
                },
                permissions: 'executeOperation'
            });
        } else {
            var operationTemplateBuilder = function(operationSelected) {
                return {
                    title: $translate.instant('BUTTON.TITLE.EXECUTE_OPERATION'),
                    icon: 'glyphicon glyphicon-flash',
                    action: function() {
                        $doActions.executeModal('executeOperation', {
                            keys: jsonPath(ctrl.device, '$..' + $jsonFinderHelper.provisioned.getPath('identifier') + '._current.value') || [],
                            entityType: 'GATEWAY',
                            operation: operationSelected ? operationSelected.trim().toUpperCase() : undefined
                        });
                    },
                    disable: function() {
                        return !ctrl.device || ctrl.device.length === 0;
                    },
                    permissions: 'executeOperation'
                };
            };

            angular.forEach(ctrl.actions, function(operationAction) {
                var operationActionFinal = operationTemplateBuilder(operationAction.operation);
                operationActionFinal.title = operationAction.title || operationActionFinal.title;
                operationActionFinal.icon = operationAction.icon || operationActionFinal.icon;

                ctrl._actions.push(operationActionFinal);
            });
        }

        ctrl.$onChanges = function(changesObj) {
            if (changesObj && changesObj.identifier) {
                mapIdentifier(changesObj.identifier.currentValue);
            }
        };

        if (ctrl.required !== undefined) {
            ctrl.ngRequired = ctrl.required;
        }

        if (ctrl.identifier) {
            mapIdentifier(ctrl.identifier);
        }

        function mapIdentifier(identifierSource) {
            var identifier = identifierSource;

            if (identifier) {
                if (identifier._current) {
                    identifier = identifier._current.value;
                }
                if (ctrl.multiple) {
                    if (angular.isArray(identifier)) {
                        ctrl.device = [];

                        angular.forEach(identifier, function(idTmp) {
                            ctrl.device.push({
                                provision: {
                                    administration: {
                                        identifier: {
                                            _current: {
                                                value: idTmp
                                            }
                                        }
                                    },
                                    device: {
                                        identifier: {
                                            _current: {
                                                value: idTmp
                                            }
                                        }
                                    }
                                }
                            });
                        });
                    }
                } else {
                    ctrl.device = [{
                        provision: {
                            administration: {
                                identifier: {
                                    _current: {
                                        value: ctrl.identifier
                                    }
                                }
                            },
                            device: {
                                identifier: {
                                    _current: {
                                        value: ctrl.identifier
                                    }
                                }
                            }
                        }
                    }];
                }
            } else {
                ctrl.device = [];
            }
        }
    }
]);

angular.module('opengate-angular-js').component('customUiSelectDevice', {

    templateUrl: 'custom-ui-select/views/custom.ui.select.device.html',
    controller: 'customUiSelectDeviceController',
    bindings: {
        onSelectItem: '&',
        onRemove: '&',
        device: '=',
        identifier: '<?',
        multiple: '<',
        ngRequired: '<',
        required: '<',
        label: '=',
        actions: '=?',
        specificType: '@?',
        disabled: '<?',
        ngModel: '=?',
        uiSelectMatchClass: '@?'
    }

});



angular.module('opengate-angular-js').controller('customUiSelectDatastreamController', ['$api', '$q', 'Authentication', function($api, $q, Authentication) {
    var ctrl = this;
    ctrl.ownConfig = {
        builder: $api().datamodelsSearchBuilder(),
        limit: 5,
        filter: function(search) {
            ctrl.lastSearch = search;

            var finalFilter = {};
            if (ctrl.resourceTypes && angular.isArray(ctrl.resourceTypes) && ctrl.resourceTypes.length > 0) {
                finalFilter.and = [{ in: {
                        'datamodels.allowedResourceTypes': ctrl.resourceTypes
                    }
                }];
            }
            if (ctrl.organization && ctrl.organization.length > 0) {
                if (!finalFilter.and) {
                    finalFilter.and = [];
                }
                finalFilter.and.push({
                    'eq': {
                        'datamodels.organizationName': ctrl.organization
                    }
                });
            }

            if (!search) {
                if (Authentication && Authentication.user && Authentication.user.domain && (!ctrl.organization || ctrl.organization.length <= 0)) {
                    if (!finalFilter.and) {
                        finalFilter.and = [];
                    }

                    finalFilter.and.push({
                        'eq': {
                            'datamodels.organizationName': Authentication.user.domain
                        }
                    });
                }
                return finalFilter;
            } else {
                var quickSearchFilter = {
                    'or': [{
                            'like': {
                                'datamodels.categories.datastreams.identifier': search
                            }
                        },
                        {
                            'like': {
                                'datamodels.categories.datastreams.name': search
                            }
                        },
                        {
                            'like': {
                                'datamodels.identifier': search
                            }
                        },
                        {
                            'like': {
                                'datamodels.name': search
                            }
                        },
                        {
                            'like': {
                                'datamodels.description': search
                            }
                        },
                        {
                            'like': {
                                'datamodels.version': search
                            }
                        }
                    ]
                };

                if (finalFilter.and) {
                    finalFilter.and.push(quickSearchFilter);
                } else {
                    return quickSearchFilter;
                }
                return finalFilter;
            }


        },
        rootKey: 'datamodels',
        collection: [],
        processingData: function(data, collection) {
            return $q(function(C_ok) {
                var _datastreams = [];
                var datamodels = data.data.datamodels;
                angular.forEach(datamodels, function(datamodel, key) {
                    var categories = datamodel.categories;
                    var _datamodel = {
                        identifier: datamodel.identifier,
                        description: datamodel.description,
                        name: datamodel.name,
                        organization: datamodel.organizationName
                    };
                    angular.forEach(categories, function(category, key) {
                        var datastreams = category.datastreams;
                        if (datastreams) {
                            var _category = {
                                identifier: category.identifier
                            };
                            angular.forEach(datastreams
                                .filter(function(ds) {
                                    return (ds.identifier.toLowerCase().indexOf(ctrl.lastSearch.toLowerCase()) > -1 && !!ctrl.lastSearch.length) || !ctrl.lastSearch;
                                }),
                                function(datastream, key) {
                                    var _datastream = angular.copy(datastream);
                                    _datastream.datamodel = _datamodel;
                                    _datastream.category = _category;

                                    if (ctrl.postFilter) {
                                        var filter = ctrl.postFilter(_datastream);

                                        if (!filter) {
                                            _datastreams.push(_datastream);
                                        }
                                    } else {
                                        _datastreams.push(_datastream);
                                    }
                                });
                        }
                    });
                });
                angular.copy(_datastreams, collection);
                C_ok(collection);
            });
        },
        customSelectors: $api().datamodelsSearchBuilder()
    };

    ctrl.datastreamSelected = function($item, $model) {
        if (ctrl.multiple) {
            var identifierTmp = ctrl.ngModel || [];

            angular.forEach(ctrl.datastream, function(datastreamTmp) {
                identifierTmp.push(datastreamTmp.identifier);
            });

            ctrl.ngModel = identifierTmp;
        } else {
            ctrl.ngModel = $item.identifier;
        }

        if (ctrl.onSelectItem) {
            var returnObj = {};
            returnObj.$item = $item;
            returnObj.$model = $model;
            ctrl.onSelectItem(returnObj);
        }
    };

    ctrl.datastreamRemove = function($item, $model) {
        if (ctrl.onRemove) {
            var returnObj = {};
            returnObj.$item = $item;
            returnObj.$model = $model;
            ctrl.onRemove(returnObj);
        }

        if (ctrl.multiple) {
            if (ctrl.ngModel && ctrl.ngModel.indexOf($item.identifier) !== -1) {
                ctrl.ngModel.splice(ctrl.ngModel.indexOf($item.identifier), 1);
            }
        } else {
            ctrl.ngModel = undefined;
        }
    };

    ctrl.$onChanges = function(changesObj) {
        if (changesObj && changesObj.identifier) {
            mapIdentifier(changesObj.identifier.currentValue);
        }
    };

    if (ctrl.required !== undefined) {
        ctrl.ngRequired = ctrl.required;
    }

    if (ctrl.identifier) {
        mapIdentifier(ctrl.identifier);
    }

    function mapIdentifier(identifierSource) {
        var identifier = identifierSource;

        if (identifier) {
            if (identifier._current) {
                identifier = identifier._current.value;
            }

            if (ctrl.multiple) {
                if (angular.isArray(identifier)) {
                    ctrl.datastream = [];

                    angular.forEach(identifier, function(idTmp) {
                        ctrl.datastream.push({
                            identifier: idTmp

                        });
                    });
                }
            } else {
                ctrl.datastream = [{
                    identifier: ctrl.identifier

                }];
            }
        } else {
            ctrl.datastream = [];
        }
    }

    if (!ctrl.maxResults) {
        ctrl.maxResults = 100;
    }
}]);

angular.module('opengate-angular-js').component('customUiSelectDatastream', {
    templateUrl: 'custom-ui-select/views/custom.ui.select.datastream.html',
    controller: 'customUiSelectDatastreamController',
    bindings: {
        onSelectItem: '&',
        onRemove: '&',
        datastream: '=',
        multiple: '<',
        maxResults: '<',
        ngRequired: '<',
        required: '<',
        postFilter: '<',
        resourceTypes: '=',
        organization: '=',
        placeholder: '=',
        uiSelectMatchClass: '@?',
        identifier: '<?',
        ngModel: '=?'
    }
});



angular.module('opengate-angular-js').controller('customUiSelectChannelController', ['$scope', '$element', '$attrs', '$api',
    function($scope, $element, $attrs, $api) {
        var ctrl = this;
        ctrl.ownConfig = {
            builder: $api().channelsSearchBuilder(),
            filter: function(search) {
                var filter = {
                    'or': [{
                        'like': {
                            'provision.channel.identifier': search
                        }
                    }, {
                        'like': {
                            'provision.channel.description': search
                        }
                    }, {
                        'like': {
                            'provision.administration.organization': search
                        }
                    }]
                };

                if (!!ctrl.organization) {
                    filter = {
                        'and': [
                            filter,
                            {
                                'eq': {
                                    'provision.administration.organization': ctrl.organization
                                }
                            }
                        ]
                    };
                }

                return filter;
            },
            rootKey: 'channels',
            collection: [],
            customSelectors: $api().channelsSearchBuilder()
        };

        ctrl.channelSelected = function($item, $model) {
            if (ctrl.multiple) {
                var identifierTmp = [];

                angular.forEach(ctrl.channel, function(channelTmp) {
                    identifierTmp.push(channelTmp.provision.administration.identifier._current.value);
                });

                ctrl.ngModel = identifierTmp;
            } else {
                ctrl.ngModel = $item.provision.administration.identifier._current.value;
            }

            if (ctrl.onSelectItem) {
                var returnObj = {};
                returnObj.$item = $item;
                returnObj.$model = $model;
                ctrl.onSelectItem(returnObj);
            }
        };

        ctrl.channelRemove = function($item, $model) {
            if (ctrl.onRemove) {
                ctrl.onRemove($item, $model);
            }

            if (ctrl.multiple) {
                if (ctrl.ngModel && ctrl.ngModel.indexOf($item.provision.administration.identifier._current.value) !== -1) {
                    ctrl.ngModel.splice(ctrl.ngModel.indexOf($item.provision.administration.identifier._current.value), 1);
                }
            } else {
                ctrl.ngModel = undefined;
            }
        };


        ctrl.$onChanges = function(changesObj) {
            if (changesObj) {
                if (changesObj.identifier) {
                    mapIdentifier(changesObj.identifier.currentValue);
                }

                if (changesObj.organization) {
                    ctrl.ngModel = undefined;
                    ctrl.channel = [];
                }
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
                        ctrl.channel = [];

                        angular.forEach(identifier, function(idTmp) {
                            ctrl.channel.push({
                                provision: {
                                    administration: {
                                        identifier: {
                                            _current: {
                                                value: idTmp
                                            }
                                        },
                                        organization: {
                                            _current: {
                                                value: ctrl.organization
                                            }
                                        }
                                    },
                                    channel: {
                                        identifier: {
                                            _current: {
                                                value: idTmp
                                            }
                                        }
                                    }
                                }
                            });
                        });
                    }

                } else {
                    ctrl.channel = [{
                        provision: {
                            administration: {
                                identifier: {
                                    _current: {
                                        value: identifier
                                    }
                                },
                                organization: {
                                    _current: {
                                        value: ctrl.organization
                                    }
                                }
                            },
                            channel: {
                                identifier: {
                                    _current: {
                                        value: identifier
                                    }
                                }
                            }
                        }
                    }];
                }
            } else {
                ctrl.channel = [];
            }
        }
    }
]);

angular.module('opengate-angular-js').component('customUiSelectChannel', {

    templateUrl: 'custom-ui-select/views/custom.ui.select.channel.html',
    controller: 'customUiSelectChannelController',
    bindings: {
        onSelectItem: '&',
        onRemove: '&',
        channel: '=',
        organization: '<?',
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



angular.module('opengate-angular-js').controller('customUiSelectBundleController', ['$scope', '$element', '$attrs', '$api', '$q', function($scope, $element, $attrs, $api, $q) {
    var ctrl = this;

    ctrl.ownConfig = {
        builder: $api().bundlesSearchBuilder(),
        filter: function(search) {
            ctrl.lastSearch = search;

            if (!search) {
                return {};
            } else {
                return {
                    'or': [
                        { 'like': { 'bundles.name': search } },
                        { 'like': { 'bundles.version': search } },
                        { 'like': { 'bundles.description': search } }
                    ]
                };
            }
        },
        rootKey: 'bundles',
        collection: [],
        customSelectors: $api().bundlesSearchBuilder()
    };

    ctrl.bundleSelected = function($item, $model) {
        var returnObj = {};
        returnObj.$item = $item;
        returnObj.$model = $model;
        ctrl.onSelectItem(returnObj);
    };

    ctrl.bundleRemove = function($item, $model) {
        var returnObj = {};
        returnObj.$item = $item;
        returnObj.$model = $model;
        ctrl.onRemove(returnObj);
    };
}]);

angular.module('opengate-angular-js').component('customUiSelectBundle', {
    templateUrl: 'custom-ui-select/views/custom.ui.select.bundle.html',
    controller: 'customUiSelectBundleController',
    bindings: {
        onSelectItem: '&',
        onRemove: '&',
        bundle: '=',
        multiple: '<',
        required: '=',
        uiSelectMatchClass: '@?'
    }
});



angular.module('opengate-angular-js').controller('customUiSelectAssetController', ['$scope', '$element', '$attrs', '$api', '$doActions', '$translate', '$jsonFinderHelper', 'jsonPath',
    function($scope, $element, $attrs, $api, $doActions, $translate, $jsonFinderHelper, jsonPath) {
        var selectBuilder = $api().newSelectBuilder();
        var SE = $api().SE;

        selectBuilder.add(SE.element('provision.administration.identifier', [{
            field: 'value'
        }]));
        selectBuilder.add(SE.element('provision.administration.organization', [{
            field: 'value'
        }]));
        selectBuilder.add(SE.element('provision.administration.channel', [{
            field: 'value'
        }]));
        selectBuilder.add(SE.element('resourceType', [{
            field: 'value'
        }]));
        selectBuilder.add(SE.element('provision.asset.identifier', [{
            field: 'value'
        }]));
        selectBuilder.add(SE.element('provision.asset.name', [{
            field: 'value'
        }]));
        selectBuilder.add(SE.element('provision.asset.specificType', [{
            field: 'value'
        }]));

        var ctrl = this;
        ctrl.ownConfig = {
            builder: $api().assetsSearchBuilder().select(selectBuilder),
            filter: function(search) {
                var filter = {
                    'or': [{
                            'like': {
                                'provision.administration.identifier': search
                            }
                        },
                        {
                            'like': {
                                'provision.asset.specificType': search
                            }
                        },
                        {
                            'like': {
                                'asset.specificType': search
                            }
                        }
                    ]
                };

                if (!!ctrl.specificType) {
                    filter = {
                        'and': [
                            filter,
                            {
                                'or': [{
                                        'eq': {
                                            'asset.specificType': ctrl.specificType
                                        }
                                    },
                                    {
                                        'eq': {
                                            'provision.asset.specificType': ctrl.specificType
                                        }
                                    }
                                ]
                            }
                        ]
                    };
                }

                return filter;
            },
            rootKey: 'assets',
            collection: [],
            customSelectors: $api().assetsSearchBuilder(),
            specificType: ctrl.specificType
        };

        ctrl.assetSelected = function($item, $model) {
            if (ctrl.multiple) {
                var identifierTmp = [];

                angular.forEach(ctrl.asset, function(assetTmp) {
                    identifierTmp.push(assetTmp.provision.administration.identifier._current.value);
                });

                ctrl.ngModel = identifierTmp;
            } else {
                ctrl.ngModel = $item.provision.administration.identifier._current.value;
            }

            if (ctrl.onSelectItem) {
                var returnObj = {};
                returnObj.$item = $item;
                returnObj.$model = $model;
                ctrl.onSelectItem(returnObj);
            }
        };

        ctrl.assetRemove = function($item, $model) {
            if (ctrl.onRemove) {
                ctrl.onRemove($item, $model);
            }

            if (ctrl.multiple) {
                if (ctrl.ngModel && ctrl.ngModel.indexOf($item.provision.administration.identifier._current.value) !== -1) {
                    ctrl.ngModel.splice(ctrl.ngModel.indexOf($item.provision.administration.identifier._current.value), 1);
                }
            } else {
                ctrl.ngModel = undefined;
            }
        };

        if (!ctrl.actions) {
            ctrl.actions = [{
                title: $translate.instant('FORM.LABEL.NEW'),
                icon: 'glyphicon glyphicon-plus-sign',
                action: function() {
                    var actionData = {};
                    if (!!ctrl.specificType) {
                        actionData = {
                            resourceType: {
                                _current: {
                                    value: 'entity.asset'
                                }
                            },
                            provision: {
                                asset: {
                                    specificType: {
                                        _current: {
                                            value: ctrl.specificType
                                        }
                                    }
                                }
                            }
                        };
                    }
                    $doActions.executeModal('createAsset', actionData, function(result) {
                        if (result && result.length > 0) {
                            ctrl.asset = !ctrl.asset ? [] : ctrl.asset;
                            ctrl.asset.push({
                                provision: {
                                    administration: {
                                        identifier: {
                                            _current: {
                                                value: result[0].identifier
                                            }
                                        }
                                    },
                                    asset: {
                                        identifier: {
                                            _current: {
                                                value: result[0].identifier
                                            }
                                        }
                                    }
                                }
                            });
                        }
                    });
                },
                permissions: 'manageEntity'
            }];
        }

        ctrl.$onChanges = function(changesObj) {
            if (changesObj && changesObj.identifier) {
                mapIdentifier(changesObj.identifier.currentValue);
            }
        };

        if (ctrl.required !== undefined) {
            ctrl.ngRequired = ctrl.required;
        }

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
                        ctrl.asset = [];

                        angular.forEach(identifier, function(idTmp) {
                            ctrl.asset.push({
                                provision: {
                                    administration: {
                                        identifier: {
                                            _current: {
                                                value: idTmp
                                            }
                                        }
                                    },
                                    asset: {
                                        identifier: {
                                            _current: {
                                                value: idTmp
                                            }
                                        }
                                    }
                                }
                            });
                        });
                    }

                } else {
                    ctrl.asset = [{
                        provision: {
                            administration: {
                                identifier: {
                                    _current: {
                                        value: ctrl.identifier
                                    }
                                }
                            },
                            asset: {
                                identifier: {
                                    _current: {
                                        value: ctrl.identifier
                                    }
                                }
                            }
                        }
                    }];
                }
            } else {
                ctrl.asset = [];
            }
        }
    }
]);

angular.module('opengate-angular-js').component('customUiSelectAsset', {

    templateUrl: 'custom-ui-select/views/custom.ui.select.asset.html',
    controller: 'customUiSelectAssetController',
    bindings: {
        onSelectItem: '&',
        onRemove: '&',
        asset: '=',
        identifier: '<?',
        multiple: '<',
        ngRequired: '<',
        required: '<',
        label: '=',
        action: '=?',
        specificType: '@?',
        disabled: '<?',
        ngModel: '=?',
        uiSelectMatchClass: '@?'
    }

});



angular.module('opengate-angular-js').controller('customUiSelectAreaController', ['$scope', '$element', '$attrs', '$api', '$q', function($scope, $element, $attrs, $api, $q) {
    var ctrl = this;

    var andFilter;
    if (ctrl.organization) {
        andFilter = [{ 'eq': { 'areas.organization': ctrl.organization } }];
    }

    ctrl.ownConfig = {
        builder: $api().areasSearchBuilder(),
        filter: function(search) {
            ctrl.lastSearch = search;

            if (andFilter) {
                if (search) {
                    andFilter.push({
                        'or': [
                            { 'like': { 'areas.name': search } },
                            { 'like': { 'areas.organization': search } }
                        ]
                    });
                }

                return {
                    'and': andFilter
                };
            } else {
                if (!search) {
                    return {};
                } else {
                    return {
                        'or': [
                            { 'like': { 'areas.name': search } },
                            { 'like': { 'areas.organization': search } }
                        ]
                    };
                }
            }
        },
        rootKey: 'areas',
        collection: [],
        customSelectors: $api().areasSearchBuilder()
    };

    ctrl.areaSelected = function($item, $model) {
        var returnObj = {};
        returnObj.$item = $item;
        returnObj.$model = $model;
        ctrl.onSelectItem(returnObj);
    };

    ctrl.areaRemove = function($item, $model) {
        var returnObj = {};
        returnObj.$item = $item;
        returnObj.$model = $model;
        ctrl.onRemove(returnObj);
    };
}]);

angular.module('opengate-angular-js').component('customUiSelectArea', {
    templateUrl: 'custom-ui-select/views/custom.ui.select.area.html',
    controller: 'customUiSelectAreaController',
    bindings: {
        onSelectItem: '&',
        onRemove: '&',
        area: '=',
        multiple: '<',
        required: '=',
        organization: '<',
        uiSelectMatchClass: '@?'
    }
});
angular.module('opengate-angular-js')
    .service('$provisionDatastreamsUtils', [function() {
        

        var internal_catalog = ["internal", "provisionSubscriber", "provisionGeneric", "provisionDevice", "provisionAsset", "provisionSubscription", "ticket", "provisionGenericChannel", "provisionGenericOrganization", "provisionGenericIdentifier"];

        var filter = {
            and: [{
                    like: {
                        'datamodels.categories.datastreams.identifier': '^(provision\.).*'
                    }
                }
                /*,
                {
                    like: {
                        'datamodels.categories.datastreams.identifier': '^(?!provision\.administration\.).*'
                    }
                },
                {
                    like: {
                        'datamodels.categories.datastreams.identifier': '^(?!provision\.device\.).*'
                    }
                },
                {
                    like: {
                        'datamodels.categories.datastreams.identifier': '^(?!provision\.asset\.).*'
                    }
                }*/
            ]
        };

        function filterForCoreDatamodelsCatalog(datamodels) {
            return datamodels.filter(function(datamodel) {
                return internal_catalog.indexOf(datamodel.identifier) === -1;
            });
        }

        function getFilter() {
            return angular.copy(filter);
        }

        function getCoreDatamodelsCatalog() {
            return angular.copy(internal_catalog);
        }

        return {
            getCoreDatamodelsCatalog: getCoreDatamodelsCatalog,
            filterForCoreDatamodelsCatalog: filterForCoreDatamodelsCatalog,
            getFilter: getFilter
        };
    }]);

angular.module('opengate-angular-js').service('$oguxThemes', [
    function() {
        var themeCompositionTheme = 'light';
        var themeCompositionColor = 'orange';
        var themeComposition = themeCompositionTheme + ' ' + themeCompositionColor;

        var themes = [{
            'name': 'default'
        }, {
            'name': 'light'
        }];

        var colorThemes = {
            'red': {
                'id': 'red',
                'sample': '#f44336',
                'sampleType': 'normal',
                'rgba': 'rgba(244, 67, 54, 0.5)',
                'name': 'COLOR.RED',
                'theme': ['light', 'default', 'fresh', 'freshdark', 'traversed', 'traversed-dark'],
                'url': ['css/themes/bootstrap-material-design_red.css']
            },
            'neon-red': {
                'id': 'neon-red',
                'sample': '#f44336',
                'sampleType': 'neon',
                'rgba': 'rgba(244, 67, 54, 0.5)',
                'name': 'COLOR.NEON_RED',
                'theme': ['light', 'fresh', 'traversed'],
                'url': ['css/themes/bootstrap-material-design_neon-red.css']
            },
            'darkneon-red': {
                'id': 'darkneon-red',
                'sample': '#f44336',
                'sampleType': 'neon',
                'rgba': 'rgba(244, 67, 54, 0.5)',
                'name': 'COLOR.DARK_NEON_RED',
                'theme': ['default', 'freshdark', 'traversed-dark'],
                'url': ['css/themes/bootstrap-material-design_darkneon-red.css']
            },
            'pink': {
                'id': 'pink',
                'sample': '#e91e63',
                'rgba': 'rgba(233, 30, 99, 0.5)',
                'name': 'COLOR.PINK',
                'theme': ['light', 'default', 'fresh', 'freshdark', 'traversed', 'traversed-dark'],
                'url': ['css/themes/bootstrap-material-design_pink.css']
            },
            'purple': {
                'id': 'purple',
                'sample': '#9c27b0',
                'rgba': 'rgba(156, 39, 176, 0.5)',
                'name': 'COLOR.PURPLE',
                'theme': ['light', 'fresh', 'traversed'],
                'url': ['css/themes/bootstrap-material-design_purple.css']
            },
            'deeppurple': {
                'id': 'deeppurple',
                'sample': '#673ab7',
                'rgba': 'rgba(103, 10, 183, 0.5)',
                'name': 'COLOR.DEEP_PURPLE',
                'theme': ['light', 'fresh', 'traversed'],
                'url': ['css/themes/bootstrap-material-design_deeppurple.css']
            },
            'indigo': {
                'id': 'indigo',
                'sample': '#3f51b5',
                'rgba': 'rgba(63, 81, 181, 0.5)',
                'name': 'COLOR.INDIGO',
                'theme': ['light', 'fresh', 'traversed'],
                'url': ['css/themes/bootstrap-material-design_indigo.css']
            },
            'blue': {
                'id': 'blue',
                'sample': '#2196f3',
                'rgba': 'rgba(33, 150, 243, 0.5)',
                'name': 'COLOR.BLUE',
                'theme': ['light', 'default', 'fresh', 'freshdark', 'traversed', 'traversed-dark'],
                'url': ['css/themes/bootstrap-material-design_blue.min.css']
            },
            'neon-blue': {
                'id': 'neon-blue',
                'sample': '#2196f3',
                'sampleType': 'neon',
                'rgba': 'rgba(33, 150, 243, 0.5)',
                'name': 'COLOR.NEON_BLUE',
                'theme': ['light', 'fresh', 'traversed'],
                'url': ['css/themes/bootstrap-material-design_neon-blue.css']
            },
            'darkneon-blue': {
                'id': 'darkneon-blue',
                'sample': '#2196f3',
                'sampleType': 'neon',
                'rgba': 'rgba(33, 150, 243, 0.5)',
                'name': 'COLOR.DARK_NEON_BLUE',
                'theme': ['default', 'freshdark', 'traversed-dark'],
                'url': ['css/themes/bootstrap-material-design_darkneon-blue.css']
            },
            'lightblue': {
                'id': 'lightblue',
                'sample': '#03a9f4',
                'rgba': 'rgba(3, 169, 244, 0.5)',
                'name': 'COLOR.LIGTH_BLUE',
                'theme': ['light', 'default', 'fresh', 'freshdark', 'traversed', 'traversed-dark'],
                'url': ['css/themes/bootstrap-material-design_lightblue.css']
            },
            'cyan': {
                'id': 'cyan',
                'sample': '#00bcd4',
                'rgba': 'rgba(0, 188, 212, 0.5)',
                'name': 'COLOR.CYAN',
                'theme': ['light', 'default', 'fresh', 'freshdark', 'traversed', 'traversed-dark'],
                'url': ['css/themes/bootstrap-material-design_cyan.min.css']
            },
            'teal': {
                'id': 'teal',
                'sample': '#009688',
                'rgba': 'rgba(0, 150, 136, 0.5)',
                'name': 'COLOR.TEAL',
                'theme': ['light', 'default', 'fresh', 'freshdark', 'traversed', 'traversed-dark'],
                'url': ['css/themes/bootstrap-material-design_teal.min.css']
            },
            'neon-teal': {
                'id': 'neon-teal',
                'sample': '#009688',
                'sampleType': 'neon',
                'rgba': 'rgba(0, 150, 136, 0.5)',
                'name': 'COLOR.NEON_TEAL',
                'theme': ['light', 'fresh', 'traversed'],
                'url': ['css/themes/bootstrap-material-design_neon-teal.css']
            },
            'darkneon-teal': {
                'id': 'darkneon-teal',
                'sample': '#009688',
                'sampleType': 'neon',
                'rgba': 'rgba(0, 150, 136, 0.5)',
                'name': 'COLOR.DARK_NEON_TEAL',
                'theme': ['default', 'freshdark', 'traversed-dark'],
                'url': ['css/themes/bootstrap-material-design_darkneon-teal.css']
            },
            'green': {
                'id': 'green',
                'sample': '#4caf50',
                'rgba': 'rgba(76, 175, 80, 0.5)',
                'name': 'COLOR.GREEN',
                'theme': ['light', 'default', 'fresh', 'freshdark', 'traversed', 'traversed-dark'],
                'url': ['css/themes/bootstrap-material-design_green.min.css']
            },
            'neon-green': {
                'id': 'neon-green',
                'sample': '#4caf50',
                'sampleType': 'neon',
                'rgba': 'rgba(76, 175, 80, 0.5)',
                'name': 'COLOR.NEON_GREEN',
                'theme': ['light', 'fresh', 'traversed'],
                'url': ['css/themes/bootstrap-material-design_neon-green.css']
            },
            'darkneon-green': {
                'id': 'darkneon-green',
                'sample': '#4caf50',
                'sampleType': 'neon',
                'rgba': 'rgba(76, 175, 80, 0.5)',
                'name': 'COLOR.DARK_NEON_GREEN',
                'theme': ['default', 'freshdark', 'traversed-dark'],
                'url': ['css/themes/bootstrap-material-design_darkneon-green.css']
            },
            'lightgreen': {
                'id': 'lightgreen',
                'sample': '#8bc34a',
                'rgba': 'rgba(139, 195, 74, 0.5)',
                'name': 'COLOR.LIGHT_GREEN',
                'theme': ['light', 'default', 'fresh', 'freshdark', 'traversed', 'traversed-dark'],
                'url': ['css/themes/bootstrap-material-design_lightgreen.min.css']
            },
            'lime': {
                'id': 'lime',
                'sample': '#cddc39',
                'rgba': 'rgba(205, 220, 57, 0.5)',
                'name': 'COLOR.LIME',
                'theme': ['default', 'freshdark', 'traversed-dark'],
                'url': ['css/themes/bootstrap-material-design_lime.min.css']
            },
            'yellow': {
                'id': 'yellow',
                'sample': '#ffeb3b',
                'rgba': 'rgba(255, 235, 59, 0.5)',
                'name': 'COLOR.YELLOW',
                'theme': ['default', 'freshdark', 'traversed-dark'],
                'url': ['css/themes/bootstrap-material-design_yellow.min.css']
            },
            'amber': {
                'id': 'amber',
                'sample': '#ffc107',
                'rgba': 'rgba(255, 193, 7, 0.5)',
                'name': 'COLOR.AMBER',
                'theme': ['default', 'freshdark', 'traversed-dark'],
                'url': ['css/themes/bootstrap-material-design_amber.min.css']
            },
            'neon-orange': {
                'id': 'neon-orange',
                'sample': '#ff9800',
                'sampleType': 'neon',
                'rgba': 'rgba(255, 152, 0, 0.5)',
                'name': 'COLOR.NEON_ORANGE',
                'theme': ['light', 'fresh', 'traversed'],
                'url': ['css/themes/bootstrap-material-design_neon-orange.css']
            },
            'darkneon-orange': {
                'id': 'darkneon-orange',
                'sample': '#ff9800',
                'sampleType': 'neon',
                'rgba': 'rgba(255, 152, 0, 0.5)',
                'name': 'COLOR.DARK_NEON_ORANGE',
                'theme': ['default', 'freshdark', 'traversed-dark'],
                'url': ['css/themes/bootstrap-material-design_darkneon-orange.css']
            },
            'orange': {
                'id': 'orange',
                'sample': '#ff9800',
                'rgba': 'rgba(255, 152, 0, 0.5)',
                'name': 'COLOR.ORANGE',
                'theme': ['light', 'default', 'fresh', 'freshdark', 'traversed', 'traversed-dark'],
            },
            'deeporange': {
                'id': 'deeporange',
                'sample': '#ff5722',
                'rgba': 'rgba(255, 87, 34, 0.5)',
                'name': 'COLOR.DEEP_ORANGE',
                'theme': ['light', 'default', 'fresh', 'freshdark', 'traversed', 'traversed-dark'],
                'url': ['css/themes/bootstrap-material-design_deeporange.min.css']
            },
            'brown': {
                'id': 'brown',
                'sample': '#795548',
                'rgba': 'rgba(121, 85, 72, 0.5)',
                'name': 'COLOR.BROWN',
                'theme': ['light', 'fresh', 'traversed'],
                'url': ['css/themes/bootstrap-material-design_brown.min.css']
            },
            'grey': {
                'id': 'grey',
                'sample': '#9e9e9e',
                'rgba': 'rgba(33, 150, 243, 1)',
                'name': 'COLOR.GREY',
                'theme': ['light', 'default', 'fresh', 'freshdark', 'traversed', 'traversed-dark'],
                'url': ['css/themes/bootstrap-material-design_grey.min.css']
            },
            'neon-grey': {
                'id': 'neon-grey',
                'sample': '#9e9e9e',
                'sampleType': 'neon',
                'rgba': 'rgba(33, 150, 243, 1)',
                'name': 'COLOR.NEON_GREY',
                'theme': ['light', 'fresh', 'traversed'],
                'url': ['css/themes/bootstrap-material-design_neon-grey.css']
            },
            'darkneon-grey': {
                'id': 'darkneon-grey',
                'sample': '#9e9e9e',
                'sampleType': 'neon',
                'rgba': 'rgba(33, 150, 243, 1)',
                'name': 'COLOR.DARK_NEON_GREY',
                'theme': ['default', 'freshdark', 'traversed-dark'],
                'url': ['css/themes/bootstrap-material-design_darkneon-grey.css']
            },
            'bluegrey': {
                'id': 'bluegrey',
                'sample': '#607d8b',
                'rgba': 'rgba(96, 125, 139, 0.5)',
                'name': 'COLOR.BLUE_GREY',
                'theme': ['light', 'default', 'fresh', 'freshdark', 'traversed', 'traversed-dark'],
                'url': ['css/themes/bootstrap-material-design_bluegrey.min.css']
            },
            'darkgrey': {
                'id': 'darkgrey',
                'sample': '#2D2D2D',
                'rgba': 'rgba(45, 45, 45, 0.5)',
                'name': 'COLOR.DARK_GREY',
                'theme': ['light', 'fresh', 'traversed'],
                'url': ['css/themes/bootstrap-material-design_darkgrey.min.css']
            }
        };


        return {
            setThemeComposition: function(_themeComposition) {
                themeComposition = _themeComposition;
                var tc = themeComposition.split(' ');
                themeCompositionTheme = tc[0];
                themeCompositionColor = tc[1];
            },
            colors: function() {
                var availableColors = {};

                angular.forEach(colorThemes, function(config, color) {
                    if (!config.hidden) {
                        availableColors[color] = config;
                    }
                });

                return availableColors;
            },
            themes: function() {
                return themes;
            },
            getColorConfig: function(colorId) {
                if (colorThemes[colorId]) {
                    return colorThemes[colorId];
                } else {
                    return undefined;
                }
            },
            getColorsKeys: function() {
                return Object.keys(colorThemes);
            },
            colorsByTheme: function(theme) {
                var themeColors = [];
                angular.forEach(colorThemes, function(config, color) {
                    if (!config.hidden && config.theme.indexOf(theme) !== -1) {
                        themeColors.push(config);
                    }
                });
                return themeColors;
            },
            getThemeFromThemeComposition: function() {
                return themeCompositionTheme;
            },
            getColorFromThemeComposition: function() {
                return colorThemes[themeCompositionColor];
            },
            getColorsCombinationFromTheme: function() {
                var scheme = new ColorScheme;
                scheme.from_hex(colorThemes[themeCompositionColor].sample.substring(1));
                scheme.scheme('analogic');
                scheme.distance(1.0);
                scheme.add_complement(true);
                scheme.variation('light');

                return scheme.colors();
            }
        };
    }
]);


angular.module('opengate-angular-js')
    .service('$ogapi', function () {
        function OgApiService() {
            var ogapi;
            this.api = function () {
                if (typeof ogapi !== "undefined") return ogapi;
                else throw new Error("Must invoke create([options]) function before api() function");
            };
            this.create = function (options) {
                return (ogapi = new window.OpenGateAPI(options));
            };
            this.release = function () {
                ogapi = undefined;
                return this;
            };
        }
        return new OgApiService();
    });

angular.module('opengate-angular-js').service('$ogapiErrorParser', ['jsonPath',
    // EXAMPLE
    // [{
    //     "code": 20481,
    //     "message": "Filter path does not exists",
    //     "context": [{
    //         "name": "Filter field path",
    //         "value": "datamodel.organizationName"
    //     }]
    // }]

    function(jsonPath) {
        return {
            toString: function(error, errorSeparatorString) {
                if (error.data && !angular.isString(error.data)) {
                    var errorMessage = '';
                    var errors = jsonPath(error, '$..message');

                    for (var i = 0; i < errors.length; i++) {
                        errorMessage += errors[i] + (errorSeparatorString ? errorSeparatorString : '\n');
                    }

                    return errorMessage;
                } else if (error.data && angular.isString(error.data)) {
                    return error.data;
                } else {
                    return error;
                }
            },
            toStringArray: function(error) {
                var errorMessage = jsonPath(error, '$..message');
                return errorMessage;
            }
        };
    }
]);


angular.module('opengate-angular-js')
    .service('$jsonFinderHelper', ['jsonPath',
        function(jsonPath) {
            JsonFinderHelper.prototype.jsonPath = jsonPath;
            return {
                administration: new JsonFinderHelper(),
                provisioned: new ProvisionJsonFinderHelper(),
                collected: new CollectedJsonFinderHelper(),
                subscriber: {
                    collected: new SubscriberCollectedJsonFinderHelper(),
                    provisioned: new SubscriberProvisionJsonFinderHelper()
                },
                subscription: {
                    collected: new SubscriptionCollectedJsonFinderHelper(),
                    provisioned: new SubscriptionProvisionJsonFinderHelper()
                },
                asset: {
                    collected: new AssetCollectedJsonFinderHelper(),
                    provisioned: new AssetProvisionJsonFinderHelper()
                },
                human: {
                    collected: new HumanCollectedJsonFinderHelper(),
                    provisioned: new HumanProvisionJsonFinderHelper()
                },
                ticket: {
                    provisioned: new TicketProvisionJsonFinderHelper()
                }
            };
        }
    ]);

JsonFinderHelper.prototype.getOriginalPath = function(field) {
    if (!this.fields[field]) throw new Error('Field <' + field + '> not found. Available:' + JSON.stringify(Object.keys(this.fields)));
    return this.fields[field];
};

JsonFinderHelper.prototype.getPath = function(field) {
    return this.getOriginalPath(field).replace('[]', '[*]');
};

JsonFinderHelper.prototype.getAmpliaPath = function(field) {
    if (!this.fields[field]) throw new Error('Field <' + field + '> not found. Available:' + JSON.stringify(Object.keys(this.fields)));
    return this.fields[field];
};
JsonFinderHelper.prototype.findOne = function(data, field) {
    return this.findAll(data, field)[0];
};
JsonFinderHelper.prototype.findAll = function(data, field) {
    return this.jsonPath(data, this.getPath(field) + '._current.value') || [];
};

function JsonFinderHelper() {
    Object.defineProperty(this, 'fields', {
        value: {
            'identifier': 'provision.administration.identifier',
            'organization': 'provision.administration.organization',
            'serviceGroup': 'provision.administration.serviceGroup',
            'channel': 'provision.administration.channel',
            'feed': 'provision.administration.defaultFeed',
            'plan': 'provision.administration.plan',
            'resourceType': 'resourceType'
        },
        writable: false
    });
}

CollectedJsonFinderHelper.prototype = new JsonFinderHelper();

function CollectedJsonFinderHelper() {
    Object.defineProperty(this, 'fields', {
        value: {
            'specificType': 'device.specificType',
            'location': 'device.location',
            'entityLocation': 'entity.location',
            'name': 'device.name',
            'description': 'device.description',
            'operationalStatus': 'device.operationalStatus',
            'serialNumber': 'device.serialNumber',
            'topologyPath': 'device.topology.path',
            'clock': 'device.clock',
            'identifier': 'device.identifier',
            'model': 'device.model',
            'software': 'device.software',
            'trustedBoot': 'device.trustedBoot',
            'image': 'device.image',

            'related': 'device.related',

            'commsModule': 'provision.device.communicationModules[]',

            'commsModuleIdentifier': 'provision.device.communicationModules[].identifier',
            'commsModuleSpecificType': 'provision.device.communicationModules[].specificType',
            'commsModuleImei': 'provision.device.communicationModules[].mobile.imei',
            'imei': 'provision.device.communicationModules[].mobile.imei',
            'pac': 'provision.device.communicationModules[].sigfox.pac',

            'subscriberIdentifier': 'device.communicationModules[].subscriber.identifier',
            'subscriberSerialNumber': 'device.communicationModules[].subscriber.serialNumber',
            'subscriberSpecificType': 'device.communicationModules[].subscriber.specificType',
            'subscriberName': 'device.communicationModules[].subscriber.name',
            'subscriberDescription': 'device.communicationModules[].subscriber.description',

            'subscriptionIdentifier': 'device.communicationModules[].subscription.identifier',
            'subscriptionSpecificType': 'device.communicationModules[].subscription.specificType',
            'subscriptionName': 'device.communicationModules[].subscription.name',
            'subscriptionDescription': 'device.communicationModules[].subscription.description',
            'subscriptionImsi': 'device.communicationModules[].subscription.mobile.imsi',
            'imsi': 'device.communicationModules[].subscription.mobile.imsi',
            'subscriptionMsisdn': 'device.communicationModules[].subscription.mobile.msisdn',
            'msisdn': 'device.communicationModules[].subscription.mobile.msisdn',
            'subscriptionMsisdnVoice': 'device.communicationModules[].subscription.mobile.voice.msisdn',
            'subscriptionAddress': 'device.communicationModules[].subscription.address',
            'address': 'device.communicationModules[].subscription.address',
            'subscriptionHomeOperator': 'device.communicationModules[].subscription.mobile.homeOperator',
            'homeOperator': 'device.communicationModules[].subscription.mobile.homeOperator',
            'subscriptionRegisteredOperator': 'device.communicationModules[].subscription.mobile.registeredOperator',
            'registereOperator': 'device.communicationModules[].subscription.mobile.registeredOperator',
            'sigfoxDeviceType': 'device.communicationModules[].subscription.sigfox.deviceType'
        },
        writable: false
    });
}

ProvisionJsonFinderHelper.prototype = new CollectedJsonFinderHelper();

ProvisionJsonFinderHelper.prototype.getPath = function(field) {
    var path = JsonFinderHelper.prototype.getPath.call(this, field);
    if (!path.startsWith('provision.')) {
        path = 'provision.' + path;
    }
    return path;
};
ProvisionJsonFinderHelper.prototype.getAmpliaPath = function(field) {
    var path = JsonFinderHelper.prototype.getAmpliaPath.call(this, field);
    if (!path.startsWith('provision.')) {
        path = 'provision.' + path;
    }
    return path;
};
ProvisionJsonFinderHelper.prototype.getOriginalPath = function(field) {
    var path = JsonFinderHelper.prototype.getOriginalPath.call(this, field);
    if (!path.startsWith('provision.')) {
        path = 'provision.' + path;
    }
    return path;
};


function ProvisionJsonFinderHelper() {
    Object.defineProperty(this, 'fields', {
        value: Object.assign({},
            this.fields, {
                'adState': 'provision.device.administrativeState',
                'certificates': 'provision.device.certificates',
                'subscriberAdState': 'device.communicationModules[].subscriber.administrativeState',
                'subscriptionAdState': 'device.communicationModules[].subscription.administrativeState',
                'subscriberIcc': 'provision.device.communicationModules[].subscriber.mobile.icc',
                'icc': 'provision.device.communicationModules[].subscriber.mobile.icc'
            }),
        writable: false
    });
}

SubscriberCollectedJsonFinderHelper.prototype = new CollectedJsonFinderHelper();
SubscriberCollectedJsonFinderHelper.prototype.getPath = function(field) {
    var path = CollectedJsonFinderHelper.prototype.getPath.call(this, field);
    return path.replace('device.communicationModules[*].subscriber', '');
};

SubscriberCollectedJsonFinderHelper.prototype.getOriginalPath = function(field) {
    var path = CollectedJsonFinderHelper.prototype.getOriginalPath.call(this, field);
    return path.replace('device.communicationModules[].subscriber', '');
};

SubscriberProvisionJsonFinderHelper.prototype = new ProvisionJsonFinderHelper();
SubscriberProvisionJsonFinderHelper.prototype.getPath = function(field) {
    var path = ProvisionJsonFinderHelper.prototype.getPath.call(this, field);
    return path.replace('device.communicationModules[*].subscriber', '');
};
SubscriberProvisionJsonFinderHelper.prototype.getOriginalPath = function(field) {
    var path = ProvisionJsonFinderHelper.prototype.getOriginalPath.call(this, field);
    return path.replace('device.communicationModules[].subscriber', '');
};


SubscriptionCollectedJsonFinderHelper.prototype = new CollectedJsonFinderHelper();
SubscriptionCollectedJsonFinderHelper.prototype.getPath = function(field) {
    var path = CollectedJsonFinderHelper.prototype.getPath.call(this, field);
    return path.replace('device.communicationModules[*].subscription', '');
};
SubscriptionCollectedJsonFinderHelper.prototype.getOriginalPath = function(field) {
    var path = CollectedJsonFinderHelper.prototype.getOriginalPath.call(this, field);
    return path.replace('device.communicationModules[].subscription', '');
};

SubscriptionProvisionJsonFinderHelper.prototype = new ProvisionJsonFinderHelper();
SubscriptionProvisionJsonFinderHelper.prototype.getPath = function(field) {
    var path = ProvisionJsonFinderHelper.prototype.getPath.call(this, field);
    return path.replace('device.communicationModules[*].subscription', '');
};

SubscriptionProvisionJsonFinderHelper.prototype.getOriginalPath = function(field) {
    var path = ProvisionJsonFinderHelper.prototype.getOriginalPath.call(this, field);
    return path.replace('device.communicationModules[*].subscription', '');
};

////////////////////////////
AssetCollectedJsonFinderHelper.prototype = new CollectedJsonFinderHelper();

AssetCollectedJsonFinderHelper.prototype.getPath = function(field) {
    var path = CollectedJsonFinderHelper.prototype.getPath.call(this, field);
    return path.replace('device.', 'asset.');
};

AssetCollectedJsonFinderHelper.prototype.getOriginalPath = function(field) {
    var path = CollectedJsonFinderHelper.prototype.getOriginalPath.call(this, field);
    return path.replace('device.', 'asset.');
};

function AssetCollectedJsonFinderHelper() {
    Object.defineProperty(this, 'fields', {
        value: Object.assign({},
            this.fields, {
                'image': 'asset.image'
            }),
        writable: false
    });
}

AssetProvisionJsonFinderHelper.prototype = new ProvisionJsonFinderHelper();
AssetProvisionJsonFinderHelper.prototype.getPath = function(field) {
    var path = ProvisionJsonFinderHelper.prototype.getPath.call(this, field);
    return path.replace('device.', 'asset.');
};
AssetProvisionJsonFinderHelper.prototype.getOriginalPath = function(field) {
    var path = ProvisionJsonFinderHelper.prototype.getOriginalPath.call(this, field);
    return path.replace('device.', 'asset.');
};


function AssetProvisionJsonFinderHelper() {
    Object.defineProperty(this, 'fields', {
        value: Object.assign({},
            this.fields, {
                'image': 'provision.asset.image'
            }),
        writable: false
    });
}

////////////////////////////
TicketProvisionJsonFinderHelper.prototype = new ProvisionJsonFinderHelper();
TicketProvisionJsonFinderHelper.prototype.getPath = function(field) {
    var path = ProvisionJsonFinderHelper.prototype.getPath.call(this, field);
    return path.replace('device.', 'ticket.');
};
TicketProvisionJsonFinderHelper.prototype.getOriginalPath = function(field) {
    var path = ProvisionJsonFinderHelper.prototype.getOriginalPath.call(this, field);
    return path.replace('device.', 'ticket.');
};


function TicketProvisionJsonFinderHelper() {
    Object.defineProperty(this, 'fields', {
        value: Object.assign({},
            this.fields, {
                'identifier': 'provision.ticket.identifier',
                'name': 'provision.ticket.name',
                'label': 'provision.ticket.label',
                'type': 'provision.ticket.type',
                'severity': 'provision.ticket.severity',
                'priority': 'provision.ticket.priority',
                'reporter': 'provision.ticket.reporter',
                'owner': 'provision.ticket.owner',
                'assignee': 'provision.ticket.assignee',
                'status': 'provision.ticket.status',
                'section': 'provision.ticket.section',
                'entity': 'provision.ticket.entity',
                'creationDate': 'provision.ticket.creationDate',
                'reporterDate': 'provision.ticket.reporterDate',
                'assignedDate': 'provision.ticket.assignedDate',
                'answeredDate': 'provision.ticket.answeredDate',
                'updatedDate': 'provision.ticket.updatedDate',
                'restorationDate': 'provision.ticket.restorationDate',
                'resolutionDate': 'provision.ticket.resolutionDate',
                'closedDate': 'provision.ticket.closedDate',
                'specificType': 'provision.ticket.specificType'
            }),
        writable: false
    });
}
////////////////////////////
HumanCollectedJsonFinderHelper.prototype = new AssetCollectedJsonFinderHelper();

HumanCollectedJsonFinderHelper.prototype.getPath = function(field) {
    var path = AssetCollectedJsonFinderHelper.prototype.getPath.call(this, field);
    var result = path.replace('asset.', 'human.');
    return result.replace('device.', 'human.');
};
HumanCollectedJsonFinderHelper.prototype.getOriginalPath = function(field) {
    var path = AssetCollectedJsonFinderHelper.prototype.getOriginalPath.call(this, field);
    var result = path.replace('asset.', 'human.');
    return result.replace('device.', 'human.');
};

function HumanCollectedJsonFinderHelper() {
    Object.defineProperty(this, 'fields', {
        value: Object.assign({},
            this.fields, {
                'surname': 'human.surname',
                'surname2': 'human.surname2',
                'birthdate': 'human.birthdate'
            }),
        writable: false
    });
}

HumanProvisionJsonFinderHelper.prototype = new AssetProvisionJsonFinderHelper();

HumanProvisionJsonFinderHelper.prototype.getPath = function(field) {
    var path = AssetProvisionJsonFinderHelper.prototype.getPath.call(this, field);
    var result = path.replace('asset.', 'human.');
    return result.replace('device.', 'human.');
};
HumanProvisionJsonFinderHelper.prototype.getOriginalPath = function(field) {
    var path = AssetProvisionJsonFinderHelper.prototype.getOriginalPath.call(this, field);
    var result = path.replace('asset.', 'human.');
    return result.replace('device.', 'human.');
};


function HumanProvisionJsonFinderHelper() {
    Object.defineProperty(this, 'fields', {
        value: Object.assign({},
            this.fields, {
                'surname': 'provision.human.surname',
                'surname2': 'provision.human.surname2',
                'birthdate': 'provision.human.birthdate'
            }),
        writable: false
    });
}
////////////////////////////

function SubscriberProvisionJsonFinderHelper() {
    Object.defineProperty(this, 'fields', {
        value: Object.assign({},
            this.fields, {
                'adState': 'device.communicationModules[].subscriber.administrativeState',
                'identifier': 'device.communicationModules[].subscriber.identifier',
                'specificType': 'device.communicationModules[].subscriber.specificType',
            }),
        writable: false
    });
}

function SubscriberCollectedJsonFinderHelper() {}

function SubscriptionCollectedJsonFinderHelper() {}

function SubscriptionProvisionJsonFinderHelper() {
    Object.defineProperty(this, 'fields', {
        value: Object.assign({},
            this.fields, {
                'adState': 'device.communicationModules[].subscription.administrativeState',
                'identifier': 'device.communicationModules[].subscription.identifier',
                'specificType': 'device.communicationModules[].subscription.specificType',
            }),
        writable: false
    });
}


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
angular.module('opengate-angular-js')
    .factory('faStylesService', ['$http', FaStylesService]);
/**   
 *  FaStyles is a service for FontAwesome styles
 * 
 */
function FaStylesService($http) {
    

    var FA_STYLES = {};
    var FA_DISCRIMINATOR_TEXT = 'font-awesome'; // text containg in all css with FA styles

    // async task. It fill FA_STYLES
    asyncInitFaStyles(FA_DISCRIMINATOR_TEXT);

    //
    return {
        /* return all fa styles existing at now */
        getStyles: function () {
            return FA_STYLES;
        },

        /**  */
        getChar: getChar
    };

    ///
    /// Internal functions
    ///

    /**
     * return a hex representation of a Char from a cssSelector (starting with dot, without dot, or without .fa-)
     * @param {*} cssSelector  (example  .fa-info-circle, fa-info-circle, info-circle)
     */
    function getChar(cssSelector) {
        if (!cssSelector) {
            return "";
        }
        cssSelector = name + '';
        if (cssSelector.startsWith('.fa-') === false) {
            if (cssSelector.startsWith('fa-')) {
                cssSelector = '.' + cssSelector;
            } else {
                cssSelector = '.fa-' + cssSelector;
            }
        }
        return FA_STYLES[name] || '';
    }


    /**
     * mapping with keys as -fa-circle-info, fa-pepe, fa-xxxx and
     * as value a unicode character
     */
    function asyncInitFaStyles(faDiscriminatorText) {

        var sheets = document.styleSheets;
        for (var i = 0; i < sheets.length; i++) {
            var sheet = document.styleSheets[i];
            if (sheet.href && sheet.href.indexOf(faDiscriminatorText) > 0) {
                try {
                    addSelectorsFromCss(sheet.href);
                } catch (err) {
                    console.error('WARN: Error httpRequesting file from ' + sheet.href, err);
                }
            }
        }
    }

    /**
     * httpRequest from url, extratc -fa- selectors with text content and mix with old  FA_STYLES items. 
     * @param {*} url 
     */
    function addSelectorsFromCss(url) {
        $http({
            method: 'GET',
            url: url
        }).then(function successCallback(response) {
            var moreFaStyles = extractFaStyles(response);
            // mix new css selctors with old content
            FA_STYLES = angular.extend(FA_STYLES, moreFaStyles);
        }, function errorCallback(err) {
            console.error('WARN: Error retrieving file from ' + url, err);
        });
    }

    /**
     *  Return a dictionoary where key is css awesome ids and values are unicode content
     *  for a character.
     *  They are be selected all cssSelectors staring with '.fa-'
     *  @param {resp} response of angular.$http
     */
    function extractFaStyles(resp) {

        var faStyles = {};

        var cssFileContent = resp.data || '';
        // all rules end with '}';
        var rules = cssFileContent.split('}');

        for (var i = 0; i < rules.length; i++) {
            var rule = rules[i];
            var parts = rule.split('{');
            if (parts.length !== 2) {
                continue;
            }

            // Get the value of 'content'
            var sValue = parts[1];
            if (sValue.indexOf('content') === -1) {
                // sin contenido
                continue;
            }
            var sValueParts = sValue.split('"');
            if (sValueParts.length !== 3) {
                // solo se acepta una pareja de comillas en todo el "valor"
                continue;
            }
            var unicodeText = sValueParts[1].substring(1);

            // get all selectors starting with .fa
            var cssSelectors = parts[0].trim(); // eliminado :before
            var items = cssSelectors.split(',');

            // add each selector with unicodeText as value
            for (var j = 0; j < items.length; j++) {
                var cssSelector = items[j].split(':')[0].trim();
                // only selected if start with '.fa-'
                if (cssSelector.startsWith('.fa-')) {
                    faStyles[cssSelector.substring(1)] = unicodeText;
                }
            }

        }
        return faStyles;
    }

}
angular.module('opengate-angular-js')
    .service('$entityQratingUtils', [function() {
        

        function calculate(entityData) {
            var sumPerformances = 0,
                totalMedidas = 0,
                maxScore = 0,
                score = 0,
                qPerformance = 0,
                avgPerformance = 0;

            angular.forEach(entityData, function(dp) {
                var scoring = jsonPath(dp, "_value._current.scoring");
                if (scoring) {
                    sumPerformances += scoring[0].performance;
                    var curMaxScore = scoring[0].qrating.max_score;
                    if (curMaxScore > 0) {
                        score += (curMaxScore * scoring[0].performance) / 100;

                        maxScore += curMaxScore;
                    }

                    totalMedidas++;
                }
            });

            if (totalMedidas > 0 && sumPerformances > 0 && maxScore > 0) {
                avgPerformance = sumPerformances / totalMedidas;
                qPerformance = (score * 100) / maxScore;

                return {
                    qPerformance: qPerformance,
                    avgPerformance: avgPerformance,
                    medidas: totalMedidas,
                    maxScore: maxScore,
                    score: score
                };
            } else {
                return null;
            }
        }

        function calculateFlattened(entityData) {
            var sumPerformances = 0,
                totalMedidas = 0,
                maxScore = 0,
                score = 0,
                qPerformance = 0,
                avgPerformance = 0;

            angular.forEach(entityData, function(dp, key) {
                if (dp._value && dp._value._current && dp._value._current.scoring && dp._value._current.scoring.qrating && dp._value._current.scoring.performance) {
                    var scoring = dp._value._current.scoring;
                    sumPerformances += scoring.performance;
                    var curMaxScore = scoring.qrating.max_score;
                    if (curMaxScore > 0) {
                        score += (curMaxScore * scoring.performance) / 100;

                        maxScore += curMaxScore;
                    }

                    totalMedidas++;
                }
            });

            if (totalMedidas > 0 && sumPerformances > 0 && maxScore > 0) {
                avgPerformance = sumPerformances / totalMedidas;
                qPerformance = (score * 100) / maxScore;

                return {
                    qPerformance: qPerformance,
                    avgPerformance: avgPerformance,
                    medidas: totalMedidas,
                    maxScore: maxScore,
                    score: score
                };
            } else {
                return null;
            }
        }

        return {
            calculate: calculate,
            calculateFlattened: calculateFlattened
        };
    }]);


angular.module('opengate-angular-js')
    .service('$entityFlattenedExtractor', ['$jsonFinderHelper', function($jsonFinderHelper) {
        function genericExtractor(entityList, element) {
            var resultList = [];

            if (entityList && entityList.length > 0) {
                var resultsFound = {};
                angular.forEach(entityList, function(entityData, idx) {
                    if (entityData[$jsonFinderHelper.provisioned.getAmpliaPath(element + 'Identifier')] ||
                        entityData[$jsonFinderHelper.collected.getAmpliaPath(element + 'Identifier')]) {
                        // Recorrer cada uno de los item para sacar los de subscriber
                        angular.forEach(entityData, function(itemData, item) {
                            if (item.startsWith('provision.device.communicationModules[].' + element) ||
                                item.startsWith('device.communicationModules[].' + element)) {
                                angular.forEach(itemData, function(value, itemIdx) {
                                    if (value._index) {
                                        if (!resultsFound[idx]) {
                                            resultsFound[idx] = {};

                                            resultsFound[idx].$device = entityData;
                                        }
                                        resultsFound[idx][item] = value;
                                    }
                                });
                            } else if (item.startsWith('provision.administration') || item === 'resourceType') {
                                if (!resultsFound[idx]) {
                                    resultsFound[idx] = {};

                                    resultsFound[idx].$device = entityData;
                                }

                                resultsFound[idx][item] = itemData;
                            }
                        });
                    }
                });

                // De todos los leidos hacemos
                angular.forEach(resultsFound, function(entities, entitiesKey) {
                    resultList.push(entities);
                });
            }

            return resultList;
        }

        function extractSubscribers(entityList, destinationList) {
            var subscribersLists = genericExtractor(entityList, 'subscriber');
            if (destinationList) {
                destinationList = subscribersLists;
            }

            return subscribersLists;
        }

        function extractSubscriptions(entityList, destinationList) {
            var subscriptionList = genericExtractor(entityList, 'subscription');
            if (destinationList) {
                destinationList = subscriptionList;
            }

            return subscriptionList;
        }

        return {
            extractSubscribers: extractSubscribers,
            extractSubscriptions: extractSubscriptions
        };
    }])
    .service('$entityExtractor', ['$q', function($q) {
        function genericExtractor(entityList, element) {
            var resultList = [];

            if ((entityList && entityList.length > 0) || entityList && entityList.length > 0) {
                angular.forEach(entityList, function(entityData, idx) {
                    var finalData = null;
                    var entityIdentifier = null;

                    // Provision data
                    if (entityData.provision.device && entityData.provision.device.communicationModules &&
                        entityData.provision.device.communicationModules.length > 0) {
                        // Recorrer cada uno de los item para sacar los de subscriber
                        angular.forEach(entityData.provision.device.communicationModules, function(commData, commIdx) {
                            if (commData[element]) {
                                if (!finalData) {
                                    finalData = {
                                        provision: {}
                                    };
                                } else if (!finalData.provision) {
                                    finalData.provision = {};
                                }

                                finalData.provision[element] = commData[element];

                                if (finalData.provision[element].identifier) {
                                    entityIdentifier = angular.copy(finalData.provision[element].identifier);
                                }
                            }
                        });
                    }

                    // Collection data
                    if (entityData.device && entityData.device.communicationModules &&
                        entityData.device.communicationModules.length > 0) {
                        // Recorrer cada uno de los item para sacar los de subscriber
                        angular.forEach(entityData.device.communicationModules, function(commData, commIdx) {
                            if (commData[element]) {
                                if (!finalData) {
                                    finalData = {};
                                }

                                finalData[element] = commData[element];
                            }
                        });
                    }

                    // completar informacion de caja si hay datos
                    if (finalData[element] || finalData.provision[element]) {


                        // Se coge el documento entero
                        finalData.$device = entityData;

                        // administration data
                        if (entityData.provision.administration) {
                            if (!finalData.provision) {
                                finalData.provision = {};
                            }
                            finalData.provision.administration = entityData.provision.administration;

                            if (entityIdentifier) {
                                finalData.provision.administration.identifier = entityIdentifier;
                            }
                        }

                    }

                    if (finalData) {
                        resultList.push(finalData);
                    }

                });
            }

            return resultList;
        }

        function extractSubscribers(entityList, destinationList) {
            var final;
            if (entityList && entityList.devices) {
                final = genericExtractor(entityList.devices, 'subscriber');
            } else if (entityList && entityList.data && entityList.data.devices) {
                final = genericExtractor(entityList.data.devices, 'subscriber');
            }

            if (destinationList) {
                angular.copy(final, destinationList);
            }

            var finalEntityData = {
                subscribers: final
            };
            return $q(function(ok) {
                ok(destinationList || finalEntityData);
            });
        }

        function extractSubscriptions(entityList, destinationList) {
            var final;
            if (entityList && entityList.devices) {
                final = genericExtractor(entityList.devices, 'subscription');
            } else if (entityList && entityList.data && entityList.data.devices) {
                final = genericExtractor(entityList.data.devices, 'subscription');
            }

            if (destinationList) {
                angular.copy(final, destinationList);
            }

            var finalEntityData = {
                subscriptions: final
            };
            return $q(function(ok) {
                ok(destinationList || finalEntityData);
            });

        }

        return {
            extractSubscribers: extractSubscribers,
            extractSubscriptions: extractSubscriptions
        };
    }]);


angular.module('opengate-angular-js')
    .service('$dataFormatter', [
        function () {
            return new DataFormatter();
        }
    ]);

DataFormatter.prototype.format = function (value) {
    if (this.isDataUrl(value)) {
        return (new DataUrlFormatter()).format(value);
    }
    return value;
};

function DataFormatter() {
    this.dataurl_regex = /^\s*data:([a-z]+\/[a-z]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i;
    this.isDataUrl = function (value) {
        if (typeof value !== 'string') return false;
        return !!value.match(this.dataurl_regex);
    };
}

DataUrlFormatter.prototype = new DataFormatter();
DataUrlFormatter.prototype.format = function (value) {
    return '<img alt="image" class="datastreamImage" src="' + value + '"/>';
};

function DataUrlFormatter() {}


angular.module('opengate-angular-js')

.filter('communicationsInterface', function() {
        return function(input) {

            var output = input;

            switch (output) {
                case 'COMMUNICATIONS_MODULE':
                    return 'Communications module';
                case 'SUBSCRIPTION':
                    return 'Mobile line';
                case 'SUBSCRIBER':
                    return 'SIM';
                case 'HOME_OPERATOR':
                    return 'Home Operator';
                case 'REGISTER_OPERATOR':
                    return 'Register Operator';
                case 'ADDRESS':
                    return 'IP';
                case 'SOFTWARE':
                    return 'Software';
                case 'HARDWARE':
                    return 'Hardware';
                case 'entityKey':
                    return 'Identifier';
                default:
                    return output;
            }
        };
    })
    .filter('dateNames', function() {
        var days = {
            'MON': 'Monday',
            'TUE': 'Tuesday',
            'WED': 'Wednesday',
            'THU': 'Thursday',
            'FRI': 'Friday',
            'SAT': 'Saturday',
            'SUN': 'Sunday'
        };
        var months = {
            'JAN': 'January',
            'FEB': 'February',
            'MAR': 'March',
            'APR': 'April',
            'MAY': 'May',
            'JUN': 'June',
            'JUL': 'July',
            'AUG': 'August',
            'SEP': 'September',
            'OCT': 'October',
            'NOV': 'November',
            'DEC': 'December'
        };

        return function(input) {
            return (days[input] || months[input]) || input;
        };
    })

.filter('icons', function() {
        return function(input, optional1, optional2) {
            var output = 'fa fa-info';
            if (input === 'list') {
                output = 'fa fa-list';
            }
            if (input === 'ban') {
                output = 'fa fa-ban';
            }
            if (input === 'laptop') {
                output = 'fa fa-laptop';
            }
            if (input === 'spin') {
                output = 'fa fa-spinner fa-spin';
            }
            if (input === 'unit') {
                output = 'fa fa-plus-square';
            }
            if (input === 'tags') {
                output = 'fa fa-tags';
            }
            return output;
        };

    })
    .filter('codeErrors', function() {
        var errors = {
            '1004': 'At least one valid reference to an entity is required',
            '1005': 'At least one valid reference to an entity is required',
            '1017': 'Tag is not valid. Please, check it.'
        };

        return function(input) {
            return { code: input.code, message: errors[input.code] || input.message };
        };
    })
    .filter('wapiErrors', function() {
        var errors = {
            '-1': 'Connection problems',
            '413': 'Upload size exceeded'
        };

        return function(status, partialMessage) {
            var finalMessage = '';
            if (!angular.isUndefined(partialMessage)) {
                finalMessage = partialMessage + ' (' + (errors[status] ? errors[status] : 'Code: ' + status) + ')';
            } else {
                finalMessage = (errors[status] ? errors[status] : 'Code: ' + status);
            }
            return finalMessage;
        };
    })
    .filter('textlength', function() {
        return function(input, optional1) {
            var maxLength = 30;
            if (optional1 && angular.isNumber(optional1)) {
                maxLength = optional1;
            }

            if (input && input.length > maxLength) {
                return input.substring(0, maxLength) + '...';
            } else {
                return input;
            }
        };
    }).filter('compactid', function() {
        return function(input) {
            if (input && input.indexOf('.') > -1) {
                return input.substring(input.lastIndexOf('.') + 1);
            }
            return input;
        };
    });


/**
 * Edits by Ryan Hutchison
 * Credit: https://github.com/paulyoder/angular-bootstrap-show-errors */

angular.module('opengate-angular-js')
    .directive('showErrors', ['$timeout', '$interpolate', function($timeout, $interpolate) {
        var linkFn = function(scope, el, attrs, formCtrl) {
            var inputEl, inputName, inputNgEl, options, showSuccess, toggleClasses,
                initCheck = false,
                showValidationMessages = false,
                blurred = false;

            options = scope.$eval(attrs.showErrors) || {};
            showSuccess = options.showSuccess || false;
            inputEl = el[0].querySelector('.form-control[name]') || el[0].querySelector('[name]');
            inputNgEl = angular.element(inputEl);
            inputName = $interpolate(inputNgEl.attr('name') || '')(scope);

            if (!inputName) {
                throw 'show-errors element has no child input elements with a \'name\' attribute class';
            }

            var reset = function() {
                return $timeout(function() {
                    el.removeClass('has-error');
                    el.removeClass('has-success');
                    showValidationMessages = false;
                }, 0, false);
            };

            scope.$watch(function() {
                return formCtrl[inputName] && formCtrl[inputName].$invalid;
            }, function(invalid) {
                return toggleClasses(invalid);
            });

            scope.$on('show-errors-check-validity', function(event, name) {
                if (angular.isUndefined(name) || formCtrl.$name === name) {
                    initCheck = true;
                    showValidationMessages = true;

                    return toggleClasses(formCtrl[inputName].$invalid);
                }
            });

            scope.$on('show-errors-reset', function(event, name) {
                if (angular.isUndefined(name) || formCtrl.$name === name) {
                    return reset();
                }
            });

            toggleClasses = function(invalid) {
                el.toggleClass('has-error', showValidationMessages && invalid);
                if (showSuccess) {
                    return el.toggleClass('has-success', showValidationMessages && !invalid);
                }
            };
        };

        return {
            restrict: 'A',
            require: '^form',
            compile: function(elem, attrs) {
                if (attrs.showErrors.indexOf('skipFormGroupCheck') === -1) {
                    if (!(elem.hasClass('form-group') || elem.hasClass('input-group'))) {
                        throw 'show-errors element does not have the \'form-group\' or \'input-group\' class';
                    }
                }
                return linkFn;
            }
        };
    }]);


angular.module('opengate-angular-js')
    .directive('elemReady', ["$parse", function($parse) {
        return {
            restrict: 'A',
            link: function($scope, elem, attrs) {
                elem.ready(function() {
                    $scope.$apply(function() {
                        var func = $parse(attrs.elemReady);
                        func($scope);
                    });
                });
            }
        };
    }]);


angular.module('opengate-angular-js').directive('disallowSpaces', function() {
    return {
        restrict: 'A',
        link: function($scope, $element) {
            $element.bind('input', function() {
                window.$(this).val(window.$(this).val().replace(/ /g, ''));
            });
        }
    };
});



angular.module('opengate-angular-js').controller('fieldOptionsController', ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
    var ctrl = this;
}]);

angular.module('opengate-angular-js').component('fieldOptions', {

    templateUrl: 'components/views/fieldOptions.html',
    controller: 'fieldOptionsController',
    bindings: {
        multiple: '<',
        required: '<',
        loading: '<'
    }

});



angular.module('opengate-angular-js').controller('customUiMapController', ['$scope', 'mapUxService', 'geocodingService', 'Authentication', '$timeout',
    function ($scope, mapUxService, geocodingService, Authentication, $timeout) {
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

        $ctrl.reloadingInfo = false;
        $ctrl.getInfo = function () {
            $ctrl.reloadingInfo = true;
            $ctrl.location.country = undefined; // Pais
            $ctrl.location.region = undefined; // Comunidad
            $ctrl.location.province = undefined; // provincia
            $ctrl.location.town = undefined; // ciudad
            $ctrl.location.postal = undefined;
            $ctrl.location.address = undefined;
            $ctrl.display_name = undefined;
            if ($ctrl.map.markers.marker) {
                geocodingService.reverseSearch($ctrl.map.markers.marker.lat, $ctrl.map.markers.marker.lng, 18,
                    function (err, data) {
                        $ctrl.reloadingInfo = false;
                        if (data && data.address) {
                            $ctrl.location.country = data.address.country || undefined; // Pais
                            $ctrl.location.region = data.address.state || undefined; // Comunidad
                            $ctrl.location.province = data.address.county || undefined; // provincia
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


        $ctrl.searchCoords = function () {
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

            mapUxService.getMapWithId($ctrl.map.id, function (map) {
                map.invalidateSize();
                map.fireEvent('focus');
            });
        };

        $ctrl.applyCoords = function () {
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

            mapUxService.getMapWithId($ctrl.map.id, function (map) {
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
            $scope.$on('leafletDirectiveMarker.' + $ctrl.map.id + '.click', function (event, args) {
                args.leafletObject._map.invalidateSize();

                if (!args.leafletObject.getPopup()._isOpen) {
                    removeMarker();
                }

            }));

        events.push(
            $scope.$on('leafletDirectiveMap.' + $ctrl.map.id + '.focus', function (event, args) {
                args.leafletObject.invalidateSize();
            }));

        events.push(
            $scope.$on('leafletDirectiveMap.' + $ctrl.map.id + '.click', function (event, args) {
                args.leafletObject.invalidateSize();

                if (!$ctrl.disabled) {
                    var latlng = args.leafletEvent.latlng;
                    delete $ctrl.map.markers.marker;
                    setPosition(latlng.lat, latlng.lng, args.leafletObject._zoom);

                    $ctrl.getInfo();
                }
            }));

        events.push(
            $scope.$on('leafletDirectiveMarker.' + $ctrl.map.id + '.dragend', function (event, args) {
                var point = args.leafletEvent.target._leaflet_events.dragend[0].context._latlng;
                delete $ctrl.map.markers.marker;
                setPosition(point.lat, point.lng, args.leafletObject._zoom);

                $ctrl.getInfo();
            })
        );

        function setPosition(lat, lng, zoom) {
            if (!$ctrl.location.position) {
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
                        getMessageScope: function () {
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
                if ($ctrl.location.position) {
                    delete $ctrl.location.position;
                }

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
        $timeout(function () {
            $ctrl.showMap = true;
            $scope.$apply();
            mapUxService.getMapWithId($ctrl.map.id, function (map) {
                map.invalidateSize();
                map.fireEvent('focus');
            });
        }, 500);

        //clear events
        $ctrl.$onDestroy = function () {
            angular.forEach(events, function (eventToDestroy) {
                eventToDestroy();
            });
        };
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
        onlyMap: '='
    }

});



angular.module('opengate-angular-js').controller('actionButtonController', ['$scope', '$element', '$attrs', function($scope, $element, $attrs) {
    var $ctrl = this;

    $ctrl.onAction = function(action) {
        if (!action.disable || !action.disable()) {
            action.action();
        }
    };

}]);

angular.module('opengate-angular-js').component('actionButton', {

    templateUrl: 'components/views/action.button.html',
    controller: 'actionButtonController',
    bindings: {
        actions: '<'
    }

});})(window);