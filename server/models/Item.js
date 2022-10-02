const { Schema } = require('mongoose');

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

module.exports = itemSchema;

