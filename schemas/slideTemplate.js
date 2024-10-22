const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {SlidesSchema} = require('./slidesSchema');

const SlideTemplateSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 100
  },
  description: {
    type: String,
    required: false,
    maxlength: 500
  },
  slide: {
    type: SlidesSchema,
    required: true,
  },
}, { timestamps: true });

const SlideTemplate = mongoose.model('SlideTemplate', SlideTemplateSchema , 'slideTemplates');
module.exports = SlideTemplate;