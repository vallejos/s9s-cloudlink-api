'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CloudlinkApi = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CloudlinkApiError = require('./CloudlinkApiError');

var _CloudlinkApiError2 = _interopRequireDefault(_CloudlinkApiError);

var _CloudlinkHttp = require('./CloudlinkHttp');

var _CloudlinkHttp2 = _interopRequireDefault(_CloudlinkHttp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * CloudlinkApi class
 * @property {{
 *  auth: object,
 *  cloud: string,
 *  server: {host:string,port:number,secure:boolean}
 * }} config
 */

var CloudlinkApi = exports.CloudlinkApi = function () {
    _createClass(CloudlinkApi, null, [{
        key: 'supportedClouds',


        /**
         * A list of supported cloud (Cloud providers) codes
         * @returns {string[]}
         */
        get: function get() {
            return ['aws', 'digitalocean'];
        }

        /**
         * CloudlinkApi constructor
         * @param {{}} config Configurations object (must include "auth" and "server" properties)
         * @throws {CloudlinkApiError}
         */

    }]);

    function CloudlinkApi(config) {
        _classCallCheck(this, CloudlinkApi);

        /* eslint max-statements: ["error", 20] */
        // noinspection JSValidateTypes

        this.config = config || {};
        if (!this.config.cloud) {
            throw new _CloudlinkApiError2.default('Missing "cloud" definition in config');
        }
        if (CloudlinkApi.supportedClouds.indexOf(this.config.cloud) === -1) {
            throw new _CloudlinkApiError2.default('"' + this.config.cloud + '" is not a supported cloud provider');
        }
        if (!this.config.server) {
            throw new _CloudlinkApiError2.default('Missing "server" object in config');
        }
        if (!this.config.server.host) {
            throw new _CloudlinkApiError2.default('Messing "server.host" in config');
        }
        if (!this.config.server.port) {
            this.config.server.port = 80;
        }
        if (!this.config.server.secure) {
            this.config.server.secure = false;
        }
        if (!this.config.auth) {
            throw new _CloudlinkApiError2.default('Missing "auth" object in config');
        }
    }

    /**
     * Returns a list of instances (Virtual machines)
     * @param {Array} [ids]
     * @returns {Promise}
     */


    _createClass(CloudlinkApi, [{
        key: 'listInstances',
        value: function listInstances() {
            var ids = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

            return _CloudlinkHttp2.default.request(this.config, 'listInstances', { ids: ids });
        }

        /**
         * Adds a new instance (Virtual machine)
         * @returns {Promise}
         * @param {Array} names New instance/s names
         * @param {string} region Region to create the instance/s at
         * @param {string} image Image/ami to create the instance/s from
         * @param {number} disk Disk size in GB
         * @param {string} size Diskspace size
         * @param {string} sshKeys SSH key to deploy to the new instance/s
         * @param {number|string} [subnet] Subnet id
         */

    }, {
        key: 'addInstance',
        value: function addInstance(names, region, image, disk, size, sshKeys, subnet) {
            return _CloudlinkHttp2.default.request(this.config, 'addInstance', {
                names: names,
                region: region,
                image: image,
                disk: disk,
                size: size,
                subnet: subnet,
                sshKeys: sshKeys
            });
        }

        /**
         * Deletes an instance/list of instances
         * @param instanceIds
         * @returns {Promise}
         */

    }, {
        key: 'deleteInstance',
        value: function deleteInstance(instanceIds) {
            return _CloudlinkHttp2.default.request(this.config, 'deleteInstance', {
                instanceIds: instanceIds
            });
        }

        /**
         * Returns the status of an instance (Virtual machine)
         * @param {string|number} instanceId The id of an instance
         * @returns {Promise}
         */

    }, {
        key: 'getInstanceStatus',
        value: function getInstanceStatus(instanceId) {
            return _CloudlinkHttp2.default.request(this.config, 'getInstanceStatus', {
                instanceId: instanceId
            });
        }

        /**
         * Returns a list of regions available on cloud provider
         * @returns {Promise}
         */

    }, {
        key: 'listRegions',
        value: function listRegions() {
            return _CloudlinkHttp2.default.request(this.config, 'listRegions', {});
        }

        /**
         * Returns a list of sizes available on cloud provider
         * @returns {Promise}
         */

    }, {
        key: 'listSizes',
        value: function listSizes() {
            return _CloudlinkHttp2.default.request(this.config, 'listSizes', {});
        }

        /**
         * Returns a list of distributions available on cloud provider
         * @param {{}} filters Filters object
         * @returns {Promise}
         */

    }, {
        key: 'listDistributions',
        value: function listDistributions() {
            var filters = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            return _CloudlinkHttp2.default.request(this.config, 'listDistributions', {
                filters: filters
            });
        }

        /**
         * Returns a list of volumes (Virtual/disks)
         * @returns {Promise}
         */

    }, {
        key: 'listVolumes',
        value: function listVolumes() {
            return _CloudlinkHttp2.default.request(this.config, 'listVolumes', {});
        }

        /**
         * Returns a list of SSH keys registered on cloud provider
         * @returns {Promise}
         */

    }, {
        key: 'listKeys',
        value: function listKeys() {
            return _CloudlinkHttp2.default.request(this.config, 'listKeys', {});
        }

        /**
         * Registers a new public key on cloud provider
         * @param {string} name Name of the new key
         * @param {string} publicKey Public key contents
         * @returns {Promise}
         */

    }, {
        key: 'addKey',
        value: function addKey(name, publicKey) {
            return _CloudlinkHttp2.default.request(this.config, 'addKey', {
                name: name,
                publicKey: publicKey
            });
        }

        /**
         * Deletes a key from cloud provider
         * @param {string|number} id Key name/id
         * @returns {Promise}
         */

    }, {
        key: 'deleteKey',
        value: function deleteKey(id) {
            return _CloudlinkHttp2.default.request(this.config, 'deleteKey', {
                id: id
            });
        }

        /**
         * Returns a list of VPCs (Virtual private network)
         * @param {{}} filters Filters object
         * @param {Array} ids Ids list
         * @returns {Promise}
         */

    }, {
        key: 'listVpcs',
        value: function listVpcs() {
            var filters = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
            var ids = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

            return _CloudlinkHttp2.default.request(this.config, 'listVpcs', {
                filters: filters,
                ids: ids
            });
        }

        /**
         * Creates a new VPC (Virtual private network)
         * @param cidr CIDR block, network range
         * @param tenancy Tenancy default/dedicated/host
         * @returns {Promise}
         */

    }, {
        key: 'addVpc',
        value: function addVpc(cidr, tenancy) {
            return _CloudlinkHttp2.default.request(this.config, 'addVpc', {
                cidr: cidr,
                tenancy: tenancy
            });
        }

        /**
         * Returns a list of subnets
         * @param ids
         * @param filters
         * @returns {Promise}
         */

    }, {
        key: 'listSubNets',
        value: function listSubNets() {
            var ids = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
            var filters = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

            return _CloudlinkHttp2.default.request(this.config, 'listSubNets', {
                ids: ids,
                filters: filters
            });
        }

        /**
         * Creates a new subnet within a VPC
         * @param cidr CIDR block, network range
         * @param vpcId VPC id
         * @returns {Promise}
         */

    }, {
        key: 'addSubNet',
        value: function addSubNet(cidr, vpcId) {
            return _CloudlinkHttp2.default.request(this.config, 'addSubNet', {
                cidr: cidr,
                vpcId: vpcId
            });
        }
    }]);

    return CloudlinkApi;
}();