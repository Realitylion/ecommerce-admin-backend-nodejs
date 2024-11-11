const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const productSchema = new mongoose.Schema({
    productId: Number,
    productName: String,
    productPrice: Number,
    productDescription: String,
    productImageUrl: String,
    categoryName: String,
    categoryId: { type: mongoose.Schema.Types.Number, ref: 'Category' }
});

productSchema.plugin(AutoIncrement, { inc_field: 'productId' });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;