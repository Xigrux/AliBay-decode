//=============================== LOAD ALL LIBRARIES ===============================//
let express = require("express");
let multer = require("multer");
let cors = require("cors");
let MongoClient = require("mongodb").MongoClient;
let ObjectID = require("mongodb").ObjectID;

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
  //signupType is either "users" or "merchants"
  let signupType = req.body.signupType;
  let username = req.body.username;
  let password = req.body.password;
  let email = req.body.email;
  //checking against database to see if email already in use
  dbo.collection(signupType).findOne({ email }, (err, user) => {
    if (err) {
      //if database returns error, signup process ends here
      console.log("There was an error at signup: ", err);
      return res.send(JSON.stringify({ success: false, err }));
    }
    if (user === null) {
      //if there is not already a user with that name, return err false
      return res.send(JSON.stringify({ success: false, err }));
    }
    //if all goes well, user, pw and email are added to db
    dbo.collection(signupType).insertOne({ username, password, email });
    res.send({ success: true });
  });
});

app.post("/login", upload.none(), (req, res) => {
  //loginType is either "users" or "merchants"
  let loginType = req.body.signupType;
  let username = req.body.username;
  let enteredPassword = req.body.password;
  dbo.collection(signupType).findOne({ username }), (err, user) => {
    if (err) {
      //if database returns error, login process ends here
      console.log("There was an error at login: ", err);
      return res.send(JSON.stringify({ success: false, err }));
    }
    if (user === null) {
      //if there is no user with that name, return err false
      return res.send(JSON.stringify({ success: false, err }));
    }
    if (user.password === enteredPassword) {
      //password match. login success. generate session ID
      let sid = generateSID();
      dbo.collection("cookies").insertOne({ username, sid });
      return res.send(JSON.stringify({ success: true }));
    }
    //default: no login
    res.send(JSON.stringify({ success: false }));
  };
});

//this endpoint is used to check if a username has been taken
app.post("/username-taken", upload.none(), (req, res) => {
  //signupType is either "users" or "merchants"
  let signupType = req.body.signupType;
  let username = req.body.username;
  dbo.collection(signupType).findOne({ username }, (err, user) => {
    if (user.username === username) {
      return res.send(JSON.stringify({ success: false }));
    }
    return res.send(JSON.stringify({ success: true }));
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
