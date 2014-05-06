'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Cooking Schema
 */

var CookingSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    image_url: {
        type: String,
        default: '',
        trim: false
    },
    title: {
        type: String,
        default: '',
        trim: false
    },
    description: {
        type: String,
        default: '',
        trim: false
    },
    title_align: {
        type: String,
        default: 'R',
        trim: false
    },
    content: Array,
    rank: Number,
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

/**
 * Validations
 */
CookingSchema.path('title').validate(function(title) {
    return title.length;
}, 'Title cannot be blank');

/**
 * Statics
 */
CookingSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Cooking', CookingSchema);
