const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productModelSchema = new Schema({
name:{
type:String,
},
description:{
type:String,
default:""
},
price:{
    type:Number,
    default:0

},
quantity:{
    type:Number,
    default:100
}
 
},{
    timestamps:true
});

// Compile model from schema
const ProductModel = mongoose.model("products", productModelSchema);
module.exports = ProductModel;