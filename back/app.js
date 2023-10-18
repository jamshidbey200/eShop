const express = require("express");
const { ErrorHandler } = require("./utils/ErrorHandler");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3300",
    credentials: true,
  })
);
app.use("/", express.static(path.join("uploads")));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// routes
app.use("/api/v1", require("./controller/user"));

app.use(ErrorHandler);

module.exports = app;
