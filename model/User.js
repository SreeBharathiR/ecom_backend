const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hashed with bcrypt
  role: { type: String, enum: ["customer", "admin"], default: "customer" },
  googleId: { type: String }, // for passport OAuth
  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("User", userSchema);
