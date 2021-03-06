"use strict";
var aurelia_configuration_1 = require("./aurelia-configuration");
exports.AureliaConfiguration = aurelia_configuration_1.AureliaConfiguration;
function configure(aurelia, configCallback) {
    var instance = aurelia.container.get(aurelia_configuration_1.AureliaConfiguration);
    var promise = null;
    // Do we have a callback function?
    if (configCallback !== undefined && typeof (configCallback) === 'function') {
        promise = Promise.resolve(configCallback(instance));
    }
    else {
        promise = Promise.resolve();
    }
    // Don't load the config until the configCallback has completed.
    return promise
        .then(function () {
        return instance.loadConfig();
    });
}
exports.configure = configure;
