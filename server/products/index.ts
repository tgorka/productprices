import {Get, Post, Put, Delete, Route, Body, Query, Header, Path, SuccessResponse, Controller, Request } from "tsoa";

import  { Product } from "../../shared/interfaces";
import config from "../../config";
import schema from "./schema";

@Route("v1/products")
export class ProductsController {

  /**
   * Get list of the entities
   * @return {Promise<Product[]>} list of the products
   */
  @Get("")
  public async list(@Query("search") search: string = null,
                    @Query("sort") sort: string = "_created",
                    @Query("limit") limit: number = 10,
                    @Query("offset") offset: number = 0,
  ): Promise<Product[]> {
    return schema.find({}).sort(sort).skip(offset).limit(limit).exec();
  }

  /**
   * Get entry details
   * @return {Promise<Product>} product detail
   */
  @Get("{id}")
  public async get(@Path("id") id: string): Promise<Product> {
    return schema.findById(id).exec();
  }

  /**
   * Update entry details
   * @return {Promise<Product>} product detail
   */
  @Put("{id}")
  public async update(@Path("id") id: string, @Body() product: Product): Promise<Product> {
    return schema.findByIdAndUpdate(id, product).exec();
  }

  /**
   * Create new entity
   * @return {Promise<Product>} product detail
   */
  @Post("")
  public async create(@Body() product: Product): Promise<Product> {
    return new schema(product).save();
  }

  /**
   * Delete entry
   * @return {Promise<void>} product detail
   */
  @Delete("{id}")
  public async delete(@Path("id") id: string): Promise<void> {
    return schema.findByIdAndRemove(id).exec();
  }

}
