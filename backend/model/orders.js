const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderModelSchema = new Schema({

 orderDescription:{
    type:String,
    default:""
 },
 products:[],

},{
    timestamps:true
});
orderModelSchema.index({ "orderDescription": "text" });
// Compile model from schema
const OrderModel = mongoose.model("orders", orderModelSchema);
module.exports = OrderModel;