const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    password:{type: String,required: true},
    birth_date:{type: Date,required: true},
    product_name:{type: String,required: true},
    product_price:{type: Number,required: true},
}, {
    timestamps:true
});

const Product = mongoose.model('BatterProducts', productSchema);

module.exports = Product;