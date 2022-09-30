const { Schema, model } = require('mongoose');
const itemSchema = require('./Item');
const commentSchema = require('./Comment');


const collectionSchema = new Schema(
   {
      collectionName: {
         type: String
      },
      collectionDescription: {
         type: String
      },
      username: {
         type: String
      },
      items: [itemSchema],
      // items: [
      //    {
      //       type: Schema.Types.ObjectId,
      //       ref: 'Item'
      //    }
      // ],
      comments: [commentSchema]
      // comments: [
      //    {
      //       type: Schema.Types.ObjectId,
      //       ref: 'Comment'
      //    }
      // ]
   },
   {
      toJSON: {
         getters: true
      }
   }
);

collectionSchema.virtual('itemCount').get(function () {
   return this.items.length;
});

collectionSchema.virtual('commentCount').get(function () {
   return this.comments.length;
});

const Collection = model('Collection', collectionSchema);

module.exports = Collection;
