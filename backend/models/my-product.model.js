const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    product_name:{type: String,required: true},
    product_price:{type: Number,required: true},
}, {
    timestamps:true
});

const Product = mongoose.model('MyProducts', productSchema);

module.exports = Product;