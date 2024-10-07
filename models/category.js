const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const categorySchema = new mongoose.Schema({
    categoryId: Number,
    categoryName: {
        type: String,
        required: true,
        unique: true
    }
});

categorySchema.plugin(AutoIncrement, { inc_field: 'categoryId' });

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;