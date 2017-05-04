import { Component } from "@angular/core";
import { toast } from "angular2-materialize";

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
    this.products = [{ _id: "", name: "", info: "", price: "" }, ...this.products];
    this.editing[""] = { _id: "" };
  }

  public saveValue(row): void {
    this.loadingIndicator = true;
    let newValue = Object.assign({ name: row.name, price: row.price, info: row.price }, this.editing[row._id]);
    this.appService.updateData(newValue).subscribe(updatedProduct => {
      this.products[row.$$index] = updatedProduct;
      delete this.editing[row._id];
      this.fetchData();
      this.loadingIndicator = false;
    }, err => {
      err = (err.data) ? err.data : err;
      let param = err.errors;
      if (param) {
        param = Object.keys(param).map(key => `${key}: ${param[key]}`).join(" ");
      }
      let msg = err.message || param || "Error during performing action.";
      toast(msg, 4000);
      this.loadingIndicator = false;
    });
  }

  public removeValue(row): void {
    this.loadingIndicator = true;
    row.one(row._id).remove().subscribe(removedProduct => {
      this.fetchData();
      this.loadingIndicator = false;
    }, err => {
      err = (err.data) ? err.data : err;
      let msg = err.message || "Error during performing action.";
      toast(msg, 4000);
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
    }, err => {
      err = (err.data) ? err.data : err;
      let msg = err.message || "Error during performing action.";
      toast(msg, 4000);
      this.loadingIndicator = false;
    });
  }

}
