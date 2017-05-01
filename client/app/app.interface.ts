import { Product } from "../../shared/interfaces";
export * from "../../shared/interfaces";

export interface PagedProducts {
  products: Product[];
  page: Page;
  sorts: Sort[];
  search: string;
}

/**
 * An object used to get page information from the server
 */
export interface Page {
  /**
   * The number of elements in the page
   */
  size: number;
  /**
   * The total number of elements
   */
  totalElements: number;
  /**
   * The total number of pages
   */
  totalPages: number;
  /**
   * The current page number
   */
  pageNumber: number;
}

export type Dir = "asc" | "dsc";

export interface Sort {
  prop: string;
  dir: Dir;
}

export interface PageInfo {
  offset: number;
}

export function createPage(): Page {
  return { size: 10, totalElements: 0, totalPages: 0, pageNumber: 0 };
}
export function createPageInfo(): PageInfo {
  return { offset: 0 };
}
