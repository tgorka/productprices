import { Body, Controller, Delete, Get, Header, Path, Post, Put, Query, Request, Route, SuccessResponse } from "tsoa";

import { Count, Product } from "../../shared/interfaces";
import schema from "./schema";

@Route("v1/products")
export class ProductsController {

  /**
   * Get count of the entities
   * @param search the value for filtering the results
   * @return {Promise<Count>} count of the products
   */
  @Get("count")
  public async count(@Query("search") search: string = ""): Promise<Count> {
    search = search.trim();
    return { count: await schema.find((search) ? { $text: { $search: search } } : {}).count() };
  }

  /**
   * Get list of the entities
   * @param search the value for filtering the results
   * @param sort the value for ordering the results
   * @param limit the values results
   * @param offset for the limit
   * @return {Promise<Product[]>} list of the products
   */
  @Get("")
  public async list(@Query("search") search: string = "",
                    @Query("sort") sort: string = "_created",
                    @Query("limit") limit: number = 10,
                    @Query("offset") offset: number = 0,): Promise<Product[]> {
    search = search.trim();
    return schema.find((search) ? { $text: { $search: search } } : {}).sort(sort).skip(offset).limit(limit).exec();
  }

  /**
   * Get entry details
   * @param id of the entity
   * @return {Promise<Product>} product detail
   */
  @Get("{id}")
  public async get(@Path("id") id: string): Promise<Product> {
    return schema.findById(id).exec();
  }

  /**
   * Update entry details
   * @param id of the entity
   * @param product data to update
   * @return {Promise<Product>} product detail
   */
  @Put("{id}")
  public async update(@Path("id") id: string, @Body() product: Product): Promise<Product> {
    product._id = id;
    return schema.findByIdAndUpdate(id, product).exec();
  }

  /**
   * Create new entity
   * @param product data to create
   * @return {Promise<Product>} product detail
   */
  @Post("")
  public async create(@Body() product: Product): Promise<Product> {
    product._id = undefined;
    return new schema(product).save();
  }

  /**
   * Delete entry
   * @param id of the entity
   * @return {Promise<void>} when done
   */
  @Delete("{id}")
  public async delete(@Path("id") id: string): Promise<void> {
    return schema.findByIdAndRemove(id).exec();
  }

  /**
   * Clean all the entries
   * @return {Promise<void>} when done
   */
  @Delete("")
  public async clean(): Promise<void> {
    return schema.find({}).remove().exec();
  }

}
