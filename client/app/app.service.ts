import { Injectable } from '@angular/core';

import { DatatableSortType } from 'ng2-md-datatable';

import { Product, PagedProducts, Page, Sort } from './app.interface';
import { Observable } from "rxjs/Observable";

const data: Product[] = [
  { _id: '1', name: 'State Street Bridge', info: 'Julia Kuo', price: 54 },
  { _id: '2', name: 'State Street Bridge', info: 'Julia Kuo', price: 1 },
  { _id: '3', name: 'State Street Bridge', info: 'Julia Kuo', price: 234 },
  { _id: '4', name: 'Big Heart/Bad Attitude', info: 'Jake Lawrence', price: 54 },
  { _id: '5', name: 'Big Heart/Bad Attitude', info: 'Jake Lawrence', price: 1 },
  { _id: '6', name: 'YIKES', info: 'Jake Lawrence', price: 54 },
  { _id: '7', name: 'YIKES', info: 'Jake Lawrence', price: 23488.99 },
  { _id: '8', name: 'Welcome to Heck', info: 'Jake Lawrence', price: 54 },
  { _id: '9', name: 'OKAY!', info: 'Jake Lawrence', price: 54 },
  { _id: '10', name: 'HEAD', info: 'Alexander Medvedev', price: 54 },
  { _id: '11', name: 'Dino Fart', info: 'RTSkulls', price: 54 },
  { _id: '12', name: 'Dino Fart', info: 'RTSkulls', price: 1 },
  { _id: '13', name: 'Dino Fart', info: 'RTSkulls', price: 234 },
  { _id: '14', name: 'Dino Fart', info: 'RTSkulls', price: 23488.99 },
  { _id: '15', name: 'That\' a...', info: 'Mathijs Vissers', price: 54 },
  { _id: '16', name: 'That\' a...', info: 'Mathijs Vissers', price: 23488.99 },
  { _id: '17', name: 'Cry Berry', info: 'Sabrina Pearcy', price: 54 },
  { _id: '18', name: '4EVR', info: 'lunchboxdomainbrain', price: 54 },
];

@Injectable()
export class AppService {

  public getData(page: Page, sorts: Sort[], search: string): Observable<PagedProducts> {
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

    return Observable.of(data).map(data => this.getPagedProducts(data, page, sorts, search));
  }

  public updateData(product: Product): Observable<Product> {
    return Observable.of(product);
  }

  private getPagedProducts(data: any, page: Page, sorts: Sort[], search: string): PagedProducts {
    page.totalElements = data.length;
    let pagedData: PagedProducts = {
      products: data,
      page: page,
      sorts: sorts,
      search: search,
    };

    return pagedData;
  }

}
