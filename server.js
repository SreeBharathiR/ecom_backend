const dotenv = require("dotenv");
dotenv.config();
const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const router = require("./routes");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const path = require("path");
const errorHandler = require("./middlewares/errorHandler");
require("./config/passportConfig");
const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("DB Connected"))
  .catch((error) => console.log("Error on DB Connection ", error.message));

app.use(
  session({
    secret: "secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/api", router);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(errorHandler);
app.get("/favicon.ico", (req, res) => res.status(204).end());

app.get("/", (req, res) => {
  res.status(200).json({ message: "New Server in this port with get method" });
});

app.use((req, res, next) => {
  const error = new Error(`${req.originalUrl} is not available in the server.`);
  error.statusCode = 404;
  next(error);
});

app.listen(process.env.PORT, () => {
  console.log("Server is running...");
});
