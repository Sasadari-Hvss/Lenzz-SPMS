require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/member");
const companyRoutes = require("./routes/company");
const projectRoutes = require("./routes/project");
const listRoute = require("./routes/listRoute");
const TimeLineRoute = require("./routes/TimeLineRoute");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
var nodemailer = require("nodemailer");
MONGO_URI =
  "mongodb+srv://lenzz:lenzz@cluster0.wff0qit.mongodb.net/practise1?retryWrites=true&w=majority";
// express app

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
// middleware
app.use(express.json());

mongoose.set("strictQuery", true);
// routes

app.use("/api/user", userRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/project", projectRoutes);
const taskRoute = require("./routes/taskRoute");
app.use("/api/list", listRoute);
app.use("/api/TimeLine", TimeLineRoute);

app.use(taskRoute);
app.use(listRoute);
// connect to db
const fileRouter = require("./routes/file");
app.use(fileRouter);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
