const express = require("express");
const app = express();
const port = 8080;
const cors = require("cors");

require("dotenv").config();
const recordsRouter = require("./routes/recordsRouter");
const usersRouter = require("./routes/usersRouter");
const authRouter = require("./routes/authRouter");
const path = require("path");

const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
// Connect to DBongodb
const strConn = process.env.DB_CONNECTION;
mongoose
  .connect(strConn, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connection to cloud database established!"))
  .catch((err) => console.log("[ERROR] DB connection failed", err));

/**EXPRESS MIDDLEWARE */
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/images", express.static("images"));

/**ROUTES */
app.use("/users", usersRouter);
app.use("/records", recordsRouter);
app.use("/login", authRouter);

// Error Handling
app.use(function errorHandler(err, req, res, next) {
  res.status(err.status || 500).send({
    error: {
      message: err.message,
    },
  });
});
