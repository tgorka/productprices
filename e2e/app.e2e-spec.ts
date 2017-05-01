import { ProductpricesPage } from './app.po';

describe('productprices App', () => {
  let page: ProductpricesPage;

  beforeEach(() => {
    page = new ProductpricesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
