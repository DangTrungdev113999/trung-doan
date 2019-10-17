const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: String,
  price: {type: Number},
  // salePrice: {type: Number, default: 0},
  // attribute: {
  //   size: [{type: String}],
  //   color: [{type: String}],
  // },
  // category: [
  //   {id: {type: Schema.Types.ObjectId, ref: "category"} }
  // ],
  // description: {type: String, default: null},
  // createdAt: { type: Number, default: Date.now },
  // updatedAt: { type: Number, default: null },
  // deletedAt: {  type: Number, default: null  }
})   // collecyion: "..." not change name collection

const Product  = mongoose.model('product', ProductSchema);

module.exports = Product;