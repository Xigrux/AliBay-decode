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

// settings for mongo
let dbo = undefined;
let url =
  "mongodb+srv://lulul:123@cluster0-jjd2c.mongodb.net/test?retryWrites=true&w=majority";
MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
  dbo = db.db("alibay");
});

//=============================== GET ENDPOINTS ===============================//
app.get("/test", (req, res) => {
  res.send("Backend connected");
});

app.get("/testdb", (req, res) => {
  dbo
    .collection("test")
    .find({ _id: ObjectID("5dd21fe11c9d44000054cab8") })
    .toArray((error, test) => {
      if (error) {
        res.send(JSON.stringify({ success: false }));
      } else {
        res.send(JSON.stringify(test));
      }
    });
});

//=============================== POST ENDPOINTS ===============================//

//add here

//=============================== LISTENER ===============================//
app.listen("4000", () => {
  console.log("Server up");
});
