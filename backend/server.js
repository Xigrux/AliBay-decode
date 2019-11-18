//=============================== LOAD ALL LIBRARIES ===============================//
let express = require("express");
let multer = require("multer");
let cors = require("cors");
let MongoClient = require("mongodb").MongoClient;
let ObjectID = require("mongodb").ObjectID;
let login = require("./login.js");

//=============================== INITIALIZE LIBRARIES ===============================//
let app = express();
// setting for multer, for now we are saving upload files to local uploads directory
let upload = multer({ dest: __dirname + "/uploads" });
app.use("/uploads", express.static("uploads"));
// setting for cors, do not touch, frontend is on localhost3000
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

let dbo;
let url =
  "mongodb+srv://XGD:RF6hIcElSxkoQPrI@cluster0-xc8we.mongodb.net/test?retryWrites=true&w=majority";
app.use("/", express.static("build"));
MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
  dbo = db.db("alibay");
});

app.post("/signup", upload.none(), (req, res) => {
  login.signup();
  login.login();
});

app.post("/login", upload.none(), (req, res) => {
  login.login();
});

//this endpoint is used to check if a username has been taken
app.post("/username-taken", upload.none(), (req, res) => {
  login.usernameTaken();
});

app.post("/post-item", upload.array("media"), (req, res) => {
  let media = req.files;
  let productName = req.body.name;
  let username = req.body.sellerName;
  let description = req.body.description;
  let location = req.body.location;
  let inventory = req.body.inventory;
  let date = new Date();
  let rating = null;
  let posts;
  if (media !== undefined) {
    for (let i = 0; i < media.length; i++) {
      console.log("Uploaded file " + media[i]);
      frontendPath = "/uploads/" + media[i].filename;
      posts.push(frontendPath);
    }
  } else {
    frontendPath = ["/uploads/default.png"];
  }
  //find sellerID from merchants database
  dbo.collection("merchants").findOne({ username }), (err, user) => {
    sellerName = user._id;
  };
  dbo.collection("items").insertOne({
    productName,
    username,
    description,
    location,
    inventory,
    date,
    rating,
    frontendPath
  });
});

//=============================== GET ENDPOINTS ===============================//
app.get("/test", (req, res) => {
  res.send("Backend connected");
});

//=============================== LISTENER ===============================//
app.listen("4000", () => {
  console.log("Server up");
});

let generateSID = () => {
  return Math.floor(Math.random() * 100000000);
};
