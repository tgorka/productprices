"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ngx_restangular_1 = require("ngx-restangular");
var Observable_1 = require("rxjs/Observable");
var AppService = (function () {
    function AppService(api) {
        this.api = api;
    }
    AppService.prototype.getData = function (page, sorts, search) {
        var _this = this;
        var query = {};
        query.search = search || "";
        query.limit = page.size;
        query.offset = page.pageNumber * page.size;
        if (!sorts || sorts.length == 0) {
            query.sort = "_created";
        }
        else {
            var sort = sorts[0];
            query.sort = "" + (sort.dir === "asc" ? "" : "-") + sort.prop;
        }
        return Observable_1.Observable.fromPromise(Promise.all([
            this.api.all("products").getList(query).toPromise().then(function (data) { return data; }, function () { return []; }),
            this.api.all("products").get("count", query).toPromise().then(function (data) { return data; }, function () { return { count: 0 }; })
        ])).map(function (data) { return _this.getPagedProducts(data[0], page, sorts, search, data[1].count); });
    };
    AppService.prototype.updateData = function (product) {
        var id = product._id;
        product._id = undefined;
        if (!id) {
            return Observable_1.Observable.of(this.api.all("products").customPOST(product));
        }
        else {
            return Observable_1.Observable.of(this.api.all("products").one(id).customPUT(product));
        }
    };
    AppService.prototype.createData = function (product) {
        product._id = undefined;
        return Observable_1.Observable.of(this.api.all("products").customPOST(product));
    };
    AppService.prototype.getPagedProducts = function (data, page, sorts, search, count) {
        page.totalElements = count;
        var pagedData = {
            products: data,
            page: page,
            sorts: sorts,
            search: search,
        };
        return pagedData;
    };
    return AppService;
}());
AppService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [ngx_restangular_1.Restangular])
], AppService);
exports.AppService = AppService;

//# sourceMappingURL=app.service.js.map
