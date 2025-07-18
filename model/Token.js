const mongoose = require("mongoose");
const tokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: "1d" }, // auto delete after 1 day
});
module.exports = mongoose.model("Token", tokenSchema);
