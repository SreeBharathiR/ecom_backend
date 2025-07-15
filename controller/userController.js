const User = require("../model/User");
const bcrypt = require("bcryptjs");

exports.createUser = async (req, res, next) => {
  try {
    const { name, email, password, role = "customer" } = req.body;

    if (!name || !email || !password) {
      const error = new Error("Missing required data");
      error.statusCode = 400;
      throw error;
    }

    // Check if user already exists by email
    const existingUser = await User.findOne({ email: email });
    console.log(existingUser);
    if (existingUser) {
      const error = new Error("User already exists");
      error.statusCode = 400;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
      role: role || "customer",
    });

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    next(error);
  }
};

exports.updateUserProfile = async (req, res, next) => {
  try {
    const updates = req.body;
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
      runValidators: true,
    }).select("-password");
    res.json({ message: "Profile updated", user: updatedUser });
  } catch (error) {
    next(error);
  }
};

//admin
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    next(error);
  }
};
