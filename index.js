const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");


const CONNECTION_URL = mongoose
  .connect(
    "mongodb+srv://sandhya:sandhya@cluster0.trov7.mongodb.net/?retryWrites=true&w=majority"
  )
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err.reason);
  });


const employeeRoute = require("./routes/employee.route");
const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cors());
app.use(express.static(path.join(__dirname, "dist/mean-stack-crud-app")));
app.use("/", express.static(path.join(__dirname, "dist/mean-stack-crud-app")));
app.use("/api", employeeRoute);


const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log("Connected to port " + port);
});


app.use((req, res, next) => {
  next(createError(404));
});


app.use(function (err, req, res, next) {
  console.error(err.message); 
  if (!err.statusCode) err.statusCode = 500; 
  res.status(err.statusCode).send(err.message); 
});
