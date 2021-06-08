//!MIDDLEWARE
// const express = require("express");
// let app = express();
// //?middleware function here
// function middleware1(req, res, next) {
//   console.log("iam middleware");
//   next();
// }
// app.get("/", middleware1, (req, res) => {
//   console.log("successfully i have rendered");
//   res.send("<h1>hello express app</h1>");
//   res.end();
// });

// let port = 1000;
// app.listen(port, (err) => {
//   if (err) throw err;
//   console.log("my local server is running on port number" + port);
// });
//!date middleware
// const express = require("express");
// let app = express();
// function middleware(req, res, next) {
//   console.log("iam express app");
//   next();
// }
// function GetCurrentTime(req, res, next) {
//   let date = new Date().toLocaleDateString();
//   console.log(date);
//   next();
// }
// app.use(GetCurrentTime);
// app.use(middleware);
// //app.use(express.static(__dirname + "/public"));
// app.get("/", middleware, GetCurrentTime, (req, res) => {
//   console.log("successfully i have rendered");
//   res.send("<h1>hello iam poojitha</h1>");
//   //res.send("index.html");
// });
// let port = 1000;
// app.listen(port, (err) => {
//   if (err) throw err;
//   console.log("my local server is running on port number 1000");
// });
//!Router level middleware
//const { Router } = require("express");
// const express = require("express");
// let app = express();
// let router = express.Router();
// function IamRouterLevelMiddleware(req, res, next) {
//   console.log("iam router level middle ware");
//   next();
// }
// router.use(IamRouterLevelMiddleware);
// router.get("/", (req, res) => {
//   console.log("iam after middleware");
//   res.send("ok");
// });

// app.use("/", router);
// let port = 2000;

// app.listen(port, (err) => {
//   if (err) throw err;
//   console.log("my local server is running on port number" + port);
// });
//!Built-in-middleware
// const express = require("express");
// let app = express();
// app.use(express.static(__dirname + "/public"));
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// let port = 2000;
// app.listen(port, (err) => {
//   if (err) throw err;
//   console.log("my server is running on local host" + port);
// });
//!error handling middleware
// const express = require("express");
// let app = express();
// app.use(express.static(__dirname + "/public"));
// app.use(express.urlencoded({ extended: false }));//?const URLENCODED=application/x-www-form-urlencoded
// app.use(express.json());//?serve json file //application/json
// app.get("/index", (req, res) => {
//   res.send("index");
// });
// app.use((err, req, res, next) => {
//   res.status(err.status || 500);
//   next();
// });
// app.use((req, res, next) => {
//   let error = new Error("page not found");
//   res.send(error.message);
//   next();
// });
// let port = 2000;
// app.listen(port, (err) => {
//   if (err) throw err;
//   console.log("my server is running on local host" + port);
// });
//!third party middleware
// const express = require("express");
// const cors = require("cors");
// let app = express();
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());
// app.use(cors());
// let port = 2000;
// app.get("/", (req, res) => {
//   let users = [
//     {
//       name: "mani",
//       company: "qspiders",
//     },
//     {
//       name: "manu",
//       company: "jspiders",
//     },
//   ];
//   res.status(201).json(users);
// });
// app.listen(port, (err) => {
//   if (err) throw err;
//   console.log("my local server is running on host " + port);
// });
//?......................................
const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
let app = express();

//**MONGODB Connection */
let db_name = "mongodb://localhost:27017/ExpressCRUD";
mongoose.connect(
  db_name,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) throw err;
    console.log("successfully database connected");
  }
);

//?middleware function here
//? =================all all Routes Path here =====================
// let post = require("./Routes/post");

//!set default template engine into express app for rendering dynamic templates
app.set("view engine", "handlebars");
app.engine("handlebars", exphbs());
//!views or template engine is for server side rendering

app.use(express.static(__dirname + "/public")); //server static files
app.use(express.static(__dirname + "/node_modules")); //server static files

//parse REQUEST BODY from form
app.use(express.urlencoded({ extended: true })); //encoding form body and parsed data

// override with POST having ?_method=DELETE and POST
app.use(methodOverride("_method"));

//for home page
app.get("/", (req, res) => {
  res.render("./home");
});

//all routes should call here
app.use("/posts", require("./Routes/post"));

let PORT = 2000;
app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`my local server is working on port number ${PORT}`);
});
