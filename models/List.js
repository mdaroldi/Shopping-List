var mongoose = require('mongoose');

var ListSchema = new mongoose.Schema({
    title: String,
    slug: String,
    items: [String]
});

module.exports = mongoose.model('List', ListSchema);