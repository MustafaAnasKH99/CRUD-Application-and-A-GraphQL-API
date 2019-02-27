const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schemaForProduct = new Schema({
    name: String,
    parentCategoryId: String
})

module.exports = mongoose.model('Product', schemaForProduct);