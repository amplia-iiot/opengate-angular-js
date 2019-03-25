'use strict';

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
                },
                channel: new ChannelProvisionJsonFinderHelper()

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
    return this.jsonPath(data, this.getPath(field) + '.._current.value') || [];
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
            'assetSpecificType': 'asset.specificType',

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
            'subscriptionIcc': 'device.communicationModules[].subscription.mobile.icc',
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
            'sigfoxDeviceType': 'device.communicationModules[].subscription.sigfox.deviceType',

            'radiusUserName': 'provision.device.communicationModules[].subscription.mobile.radius.userName',
            'radiusUserPassword': 'provision.device.communicationModules[].subscription.mobile.radius.userPassword',
            'radiusFramedIpNetmask': 'provision.device.communicationModules[].subscription.mobile.radius.framedIpNetmask'
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


{
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
    return path.replace('device.communicationModules[*].subscriber', '');
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

ChannelProvisionJsonFinderHelper.prototype = new JsonFinderHelper();


function ChannelProvisionJsonFinderHelper() {
    Object.defineProperty(this, 'fields', {
        value: Object.assign({},
            this.fields, {
                'identifier': 'provision.channel.identifier',
                'description': 'provision.channel.description',
                'certificates': 'provision.channel.certificates'

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