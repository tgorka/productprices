import {Get, Post, Put, Delete, Route, Body, Query, Header, Path, SuccessResponse, Controller, Request } from "tsoa";

import  { Product } from "../../shared/interfaces";
import config from "../../config";

@Route("v1/prices")
export class ProductsController {

  /**
   * Controller constructor.
   *
   * @constructor
   */
  constructor() {
  }

  /**
   * Get list of the entities
   * @return {Promise<Product[]>} list of the products
   */
  @Get("")
  public async list(): Promise<Product[]> {
    return [];
  }

  /**
   * Get entry details
   * @return {Promise<Product>} product detail
   */
  @Get("{id}")
  public async get(@Path("id") id: string): Promise<Product> {
    return { _id: "", name: "", price: 0 };
  }

  /**
   * Update entry details
   * @return {Promise<Product>} product detail
   */
  @Put("{id}")
  public async update(@Path("id") id: string): Promise<Product> {
    return { _id: "", name: "", price: 0 };
  }

  /**
   * Create new entity
   * @return {Promise<Product>} product detail
   */
  @Post("")
  public async create(): Promise<Product> {
    return { _id: "", name: "", price: 0 };
  }

  /**
   * Delete entry
   * @return {Promise<void>} product detail
   */
  @Delete("{id}")
  public async delete(@Path("id") id: string): Promise<void> {
    return;
  }

}
