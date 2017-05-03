import { Body, Controller, Delete, Get, Header, Path, Post, Put, Query, Request, Route, SuccessResponse } from "tsoa";

import * as request from "request";
import * as zlib from "zlib";
import * as xml2js from "xml2js";
import * as jsonpath from "jsonpath";
import * as winston from "winston";

import config from "../../config";
import schema from "../products/schema";

const PARSER = new xml2js.Parser();

@Route("v1/prices")
export class PricesController {

  public providers: any[] = [
    {
      name: "matrixcatalog-promo-7290696200003",
      url: "http://matrixcatalog.co.il/CompetitionRegulationsFiles/latest/7290696200003/Promo7290696200003-065-201704301816-001.xml.gz",
      path: {
        item: "$..Sale",
        name: "$..ItemCode",
        info: "$..PromotionDescription",
        price: "$..DiscountedPrice"
      }
    }, {
      name: "matrixcatalog-promo-7290661400001",
      url: "http://matrixcatalog.co.il/CompetitionRegulationsFiles/latest/7290661400001/Promo7290661400001-076-201705032013-001.xml.gz",
      path: {
        item: "$..Sale",
        name: "$..ItemCode",
        info: "$..PromotionDescription",
        price: "$..DiscountedPrice"
      }
    }, {
      name: "pricesprodpublic-price-7290027600007-001",
      url: `http://${config.server.host}:${config.server.port}/assets/Price7290027600007-001-201705032030.gz`,
      path: {
        item: "$..Item",
        name: "$..ItemName",
        info: "$..ManufacturerItemDescription",
        price: "$..ItemPrice"
      }
    }, {
      name: "pricesprodpublic-price-7290027600007-010",
      url: `http://${config.server.host}:${config.server.port}/assets/Price7290027600007-010-201512270230.gz`,
      path: {
        item: "$..Item",
        name: "$..ItemName",
        info: "$..ManufacturerItemDescription",
        price: "$..ItemPrice"
      }
    },
  ];

  /**
   * Parse all embedded url for the prices
   * @returns {Promise<void>} when parsing finish
   */
  @Get("")
  public async parseUrl(): Promise<void> {
    for (var i = 0; i < this.providers.length; i++) {
      let provider = this.providers[i];
      let xml = "";
      winston.log("info", `Fetching ${provider.name}.`);
      request({ url: provider.url })
        .pipe(zlib.createGunzip()) // unzip
        .on("data", (data) => {
          xml += data;
        })
        .on("end", () => this.parseXml(xml, provider));
    }
  }

  public parseXml(xml: string, provider: any): void {
    winston.log("debug", `Fetched from ${provider.name}. XML: ${xml}`);
    PARSER.parseString(xml, (err, result) => {
      if (err) {
        console.log("[PARSING] ", err);
        return;
      }
      this.parseJson(result, provider);
    })
  }

  public parseJson(json: any, provider: any): void {
    let results = jsonpath.query(json, provider.path.item);
    results = (!results || results.length == 0) ? [] : results[0];
    Promise.all(results
      .map(data => this.parseSingleElement(data, provider))
      .map(data => this.storeValue(data, provider)))
      .then(data => {
        winston.log("info", `Fetched, parsed and sored ${data.length} items.`);
      });
  }

  public parseSingleElement(json: any, provider: any): any {
    return {
      name: this.parseValue(json, provider.path.name),
      info: this.parseValue(json, provider.path.info),
      price: this.parseValue(json, provider.path.price),
    }
  }

  private parseValue(json: any, path: string): string {
    let value = jsonpath.value(json, path);
    return (!value || value.length == 0) ? null : value[0];
  }

  public async storeValue(value: any, provider: any): Promise<any> {
    winston.log("debug", `Store value ${provider.name}: ${JSON.stringify(value)}`);
    return schema.findOneAndUpdate(value, value, { upsert: true, returnNewDocument: true }).exec();
  }

}
