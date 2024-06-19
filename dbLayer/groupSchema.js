const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const {ItemSchema} = require('./tcode/slidesSchema');

const GroupSchema = new Schema({

name: {
        type: String,
        required: true
      },	
description:{ //===============> ** required 
          type: String ,
          required:true , 
          },
//3          
items:{ //===============> ** required
        type: [ItemSchema] ,
        required:true ,
        },

});
//This is where we can change the table/collection name
const GroupModel = mongoose.model('group', GroupSchema);

module.exports = GroupModel;