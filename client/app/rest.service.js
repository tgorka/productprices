"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var environment_1 = require("../environments/environment");
var ngx_restangular_1 = require("ngx-restangular");
var APP_HEADERS = {};
var token = null;
var watchAuth = function () {
    APP_HEADERS["Authorization"] = (token) ? "bearer " + token : undefined;
};
/**
 * Function for setting the default restangular configuration.
 * API url, set authorization header if needed
 */
function RestangularConfigFactory(RestangularProvider) {
    watchAuth();
    RestangularProvider.setBaseUrl(environment_1.environment.apiUrl);
    RestangularProvider.addFullRequestInterceptor(function (element, operation, path, url, headers, params) {
        return {
            headers: Object.assign({}, headers, APP_HEADERS)
        };
    });
}
exports.RestangularConfigFactory = RestangularConfigFactory;
;
/**
 * Module with configuration that will be used for calling the server
 * @type {ModuleWithProviders}
 */
exports.APIModule = ngx_restangular_1.RestangularModule.forRoot([], RestangularConfigFactory);

//# sourceMappingURL=rest.service.js.map
