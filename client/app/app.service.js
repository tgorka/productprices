"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
var data = [
    { id: 1, name: 'State Street Bridge', info: 'Julia Kuo', price: 54 },
    { id: 2, name: 'State Street Bridge', info: 'Julia Kuo', price: 1 },
    { id: 3, name: 'State Street Bridge', info: 'Julia Kuo', price: 234 },
    { id: 4, name: 'Big Heart/Bad Attitude', info: 'Jake Lawrence', price: 54 },
    { id: 5, name: 'Big Heart/Bad Attitude', info: 'Jake Lawrence', price: 1 },
    { id: 6, name: 'YIKES', info: 'Jake Lawrence', price: 54 },
    { id: 7, name: 'YIKES', info: 'Jake Lawrence', price: 23488.99 },
    { id: 8, name: 'Welcome to Heck', info: 'Jake Lawrence', price: 54 },
    { id: 9, name: 'OKAY!', info: 'Jake Lawrence', price: 54 },
    { id: 10, name: 'HEAD', info: 'Alexander Medvedev', price: 54 },
    { id: 11, name: 'Dino Fart', info: 'RTSkulls', price: 54 },
    { id: 12, name: 'Dino Fart', info: 'RTSkulls', price: 1 },
    { id: 13, name: 'Dino Fart', info: 'RTSkulls', price: 234 },
    { id: 14, name: 'Dino Fart', info: 'RTSkulls', price: 23488.99 },
    { id: 15, name: 'That\' a...', info: 'Mathijs Vissers', price: 54 },
    { id: 16, name: 'That\' a...', info: 'Mathijs Vissers', price: 23488.99 },
    { id: 17, name: 'Cry Berry', info: 'Sabrina Pearcy', price: 54 },
    { id: 18, name: '4EVR', info: 'lunchboxdomainbrain', price: 54 },
];
var AppService = (function () {
    function AppService() {
    }
    AppService.prototype.getData = function (page, sorts, search) {
        /*const offset = (page - 1) * limit;
    
        let products;
        if (sortBy) {
          products = data
            .sort((product1: Product, product2: Product) => {
              switch (sortType) {
                case 0:
                case 1:
                  return typeof (product1[sortBy]) === 'number' ?
                    product1[sortBy] - product2[sortBy] :
                    String.prototype.localeCompare.call(product1[sortBy], product2[sortBy]);
                case 2:
                  return typeof (product1[sortBy]) === 'number' ?
                    product2[sortBy] - product1[sortBy] :
                    String.prototype.localeCompare.call(product2[sortBy], product1[sortBy]);
              }
            })
            .slice(offset, offset + limit);
        } else {
          products = data.slice(offset, offset + limit);
        }*/
        var _this = this;
        return Observable_1.Observable.of(data).map(function (data) { return _this.getPagedProducts(data, page, sorts, search); });
    };
    AppService.prototype.updateData = function (product) {
        return Observable_1.Observable.of(product);
    };
    AppService.prototype.getPagedProducts = function (data, page, sorts, search) {
        page.totalElements = data.length;
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
    core_1.Injectable()
], AppService);
exports.AppService = AppService;

//# sourceMappingURL=app.service.js.map
