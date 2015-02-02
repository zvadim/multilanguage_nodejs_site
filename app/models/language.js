var mongoose = require('mongoose');

module.exports = mongoose.model('Language', {
    text : String,
    done : Boolean
});