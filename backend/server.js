//=============================== LOAD ALL LIBRARIES ===============================//
let express = require("express");
let multer = require("multer");
let cors = require("cors");

//=============================== INITIALIZE LIBRARIES ===============================//
let app = express();

// setting for multer, for now we are saving upload files to local uploads directory
let upload = multer({ dest: __dirname + "/uploads" });
app.use("/uploads", express.static("uploads"));

// setting for cors, do not touch, frontend is on localhost3000
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

//=============================== GET ENDPOINTS ===============================//
app.get("/test", (req, res) => {
  res.send("Backend connected");
});

//=============================== LISTENER ===============================//
app.listen("4000", () => {
  console.log("Server up");
});
