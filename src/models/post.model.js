const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  weight: {
    type: Number,
    required: true,
  },
  size: {
    type: Number,
    required: true,
    enum: [140, 145, 150, 155, 160, 165, 170, 175, 180, 185, 190],
  },
  style: {
    type: String,
    required: true,
    enum: ["Freeride", "Freestyle", "Piste", "Polyvalent"],
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  bookings: [
    {
      type: Schema.Types.ObjectId,
      ref: "Booking",
    },
  ],
  isAvailable: {
    type: Boolean,
    required: true,
    default: true,
  },
  shop: {
    type: Schema.Types.ObjectId,
    ref: "Shop",
    required: true,
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
