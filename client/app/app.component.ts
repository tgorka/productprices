import { Component } from "@angular/core";

import { createPage, createPageInfo, Page, PageInfo, Product, Sort } from "./app.interface";
import { AppService } from "./app.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public products: Product[];
  public loadingIndicator: boolean = false;

  public editing = {};
  public page: Page = createPage();
  public sorts: Sort[] = [];
  public search: string = '';

  constructor(private appService: AppService) {
    this.setPage(createPageInfo());
  }

  /**
   * Populate the table with new data based on the page number
   * @param page The page to select
   */
  public setPage(pageInfo: PageInfo): void {
    this.page.pageNumber = pageInfo.offset;
    this.fetchData();
  }

  public onSort(event): void {
    this.sorts = event.sorts;
    this.fetchData();
  }

  public updateFilter(event): void {
    this.search = event.target.value;
    this.fetchData();
  }

  public newValue(): void {
    console.log('new')
    this.products = [{ _id: "", name: "", info: "", price: "" }, ...this.products];
    this.editing[""] = { _id: "" };
    /*this.loadingIndicator = true;
    this.appService.createData(this.editing[""]).subscribe(updatedProduct => {
      this.editing[""] = undefined;
      this.fetchData();
      this.loadingIndicator = false;
    });*/
  }

  public saveValue(row): void {
    this.loadingIndicator = true;
    let newValue = Object.assign({ name: row.name, price: row.price, info: row.price }, this.editing[row._id]);
    this.appService.updateData(newValue).subscribe(updatedProduct => {
      this.products[row.$$index] = updatedProduct;
      this.editing[row._id] = undefined;
      this.loadingIndicator = false;
    });
  }

  public removeValue(row): void {
    this.loadingIndicator = true;
    row.one(row._id).remove().subscribe(removedProduct => {
      this.fetchData();
      this.loadingIndicator = false;
    });
  }

  private fetchData(): void {
    this.loadingIndicator = true;
    this.appService.getData(this.page, this.sorts, this.search).subscribe(pagedData => {
      this.page = pagedData.page;
      this.products = pagedData.products;
      this.sorts = pagedData.sorts;
      this.loadingIndicator = false;
    });
  }

}
