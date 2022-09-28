const { Schema, model } = require('mongoose');

const itemSchema = new Schema(
  {
    itemName: {
      type: String,
      required: true
    },
    itemImage: {
      type: String,
      required: true
    },
    itemDescription: {
      type: String
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

const Item = model('Item', itemSchema);

module.exports = Item;

