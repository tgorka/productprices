"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var protractor_1 = require("protractor");
var ProductpricesPage = (function () {
    function ProductpricesPage() {
    }
    ProductpricesPage.prototype.navigateTo = function () {
        return protractor_1.browser.get('/');
    };
    ProductpricesPage.prototype.getParagraphText = function () {
        return protractor_1.element(protractor_1.by.css('app-root h1')).getText();
    };
    return ProductpricesPage;
}());
exports.ProductpricesPage = ProductpricesPage;

//# sourceMappingURL=app.po.js.map
