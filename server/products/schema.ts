import * as mongoose from "mongoose";
const Schema = mongoose.Schema;


const productsSchema = new Schema({

  // Schema meta properties (starting with '_')
  _created: {type: Date, default: Date.now},
  _modified: {type: Date, default: Date.now},
  _deactivated: {type: Date, default: null},

  // Schema properties
  name: {type: String, required: true, index: true},
  info: {type: String, default: null},
  price: {type: Number, required: true, index: true},

});


export default mongoose.model('products', productsSchema);
