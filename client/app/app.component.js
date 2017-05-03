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
var app_interface_1 = require("./app.interface");
var app_service_1 = require("./app.service");
var AppComponent = (function () {
    function AppComponent(appService) {
        this.appService = appService;
        this.loadingIndicator = false;
        this.editing = {};
        this.page = app_interface_1.createPage();
        this.sorts = [];
        this.search = '';
        this.setPage(app_interface_1.createPageInfo());
    }
    /**
     * Populate the table with new data based on the page number
     * @param page The page to select
     */
    AppComponent.prototype.setPage = function (pageInfo) {
        this.page.pageNumber = pageInfo.offset;
        this.fetchData();
    };
    AppComponent.prototype.onSort = function (event) {
        this.sorts = event.sorts;
        this.fetchData();
    };
    AppComponent.prototype.updateFilter = function (event) {
        this.search = event.target.value;
        this.fetchData();
    };
    AppComponent.prototype.updateValue = function (event, cell, cellValue, row) {
        /*console.log('edit', event, cell, cellValue, row)
        this.loadingIndicator = true;
        this.editing[row.$$index + '-' + cell] = false;
        this.products[row.$$index][cell] = event.target.value;
        this.appService.updateData(this.products[row.$$index]).subscribe(updatedProduct => {
          this.products[row.$$index] = updatedProduct;
          this.loadingIndicator = false;
        })*/
    };
    AppComponent.prototype.newValue = function () {
        console.log('new');
        this.products.push({ _id: "", name: "", info: "", price: "" });
        this.editing[""] = { _id: "" };
        /*this.loadingIndicator = true;
        this.appService.createData(this.editing[""]).subscribe(updatedProduct => {
          this.editing[""] = undefined;
          this.fetchData();
          this.loadingIndicator = false;
        });*/
    };
    AppComponent.prototype.saveValue = function (row) {
        var _this = this;
        this.loadingIndicator = true;
        var newValue = Object.assign({ name: row.name, price: row.price, info: row.price }, this.editing[row._id]);
        this.appService.updateData(newValue).subscribe(function (updatedProduct) {
            _this.products[row.$$index] = updatedProduct;
            _this.editing[row._id] = undefined;
            _this.loadingIndicator = false;
        });
    };
    AppComponent.prototype.removeValue = function (row) {
        var _this = this;
        this.loadingIndicator = true;
        row.one(row._id).remove().subscribe(function (removedProduct) {
            _this.fetchData();
            _this.loadingIndicator = false;
        });
    };
    AppComponent.prototype.fetchData = function () {
        var _this = this;
        this.loadingIndicator = true;
        this.appService.getData(this.page, this.sorts, this.search).subscribe(function (pagedData) {
            _this.page = pagedData.page;
            _this.products = pagedData.products;
            _this.sorts = pagedData.sorts;
            _this.loadingIndicator = false;
        });
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.scss']
    }),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppComponent);
exports.AppComponent = AppComponent;

//# sourceMappingURL=app.component.js.map
