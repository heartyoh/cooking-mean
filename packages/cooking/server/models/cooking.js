'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    path = require('path'),
    Schema = mongoose.Schema;

// var thumbnail = require('mongoose-thumbnail');
// var thumbnailPlugin = thumbnail.thumbnailPlugin;
// var make_upload_to_model = thumbnail.make_upload_to_model;

// var uploads_base = path.join(__dirname, "uploads");
// var uploads = path.join(uploads_base, "u");

/**
 * Cooking Schema
 */

var CookingSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    image: {
        type: String
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

// CookingSchema.plugin(thumbnailPlugin, {
//     name: "photo",
//     format: "png",
//     size: 80,
//     inline: false,
//     save: true,
//     upload_to: make_upload_to_model(uploads, 'photos'),
//     relative_to: uploads_base
// });

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
