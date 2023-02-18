const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const resetTokenPasswordSchema = new Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
});

const ResetTokenPassword = mongoose.model(
  "ResetTokenPassword",
  resetTokenPasswordSchema
);

module.exports = ResetTokenPassword;
