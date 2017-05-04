import { browser, element, by } from 'protractor';

export class ProductpricesPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root .brand-logo')).getText();
  }
}
