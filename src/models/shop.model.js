const mongoose = require("mongoose");
const { Schema } = mongoose;

const shopSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  address: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Shop = mongoose.model("Shop", shopSchema);

module.exports = Shop;
