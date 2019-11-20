//=============================== LOAD ALL LIBRARIES ===============================//
let express = require("express");
let multer = require("multer");
let cors = require("cors");
let MongoClient = require("mongodb").MongoClient;
let ObjectID = require("mongodb").ObjectID;
let login = require("./login.js");
let cart = require("./cart.js");

//=============================== INITIALIZE LIBRARIES ===============================//
let app = express();
// setting for multer, for now we are saving upload files to local uploads directory
let upload = multer({
  dest: __dirname + "/uploads"
});
app.use("/uploads", express.static("uploads"));
// setting for cors, do not touch, frontend is on localhost3000
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// settings for mongo
let dbo;
let url =
  "mongodb+srv://lulul:123@cluster0-jjd2c.mongodb.net/test?retryWrites=true&w=majority";
app.use("/", express.static("build"));

MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
  dbo = db.db("AliBay");
});

//=============================== GET ENDPOINTS ===============================//

//=============================== POST ENDPOINTS ===============================//

app.post("/signup", upload.none(), (req, res) => {
  console.log("accessing");
  login.signup(req, res, dbo);
});

app.post("/login", upload.none(), (req, res) => {
  login.login(req, res, dbo);
});

//this endpoint is used to check if a username has been taken
app.post("/username-taken", upload.none(), (req, res) => {
  login.usernameTaken();
});

app.post("/add-product", upload.array("files"), (req, res) => {
  console.log("-------------------------------------");
  console.log("Uploaded PRODUCT");
  let media = req.files;
  let productName = req.body.name;
  let username = req.body.sellerName;
  let descriptionHeader = req.body.descriptionHeader;
  let descriptionText = req.body.descriptionText;
  let location = req.body.location;
  let inventory = req.body.inventory;
  let date = new Date();
  date = date.toLocaleDateString;
  let ratings = {};
  let posts = [];
  let tags = req.body.tags;
  let category = req.body.category;
  console.log(req);
  console.log("-------------------------------------");
  console.log("MEDIA");
  console.log(media);

  //always push default
  console.log("image is default");
  let frontendPath = ["/uploads/default.png"];
  posts.push(frontendPath);

  if (media !== undefined) {
    for (let i = 0; i < media.length; i++) {
      console.log("Uploaded file " + media[i]);
      let frontendPath = "/uploads/" + media[i].filename;
      posts.push(frontendPath);
    }
  }
  //find sellerID from merchants database
  dbo.collection("merchants").findOne({ username }),
    (err, user) => {
      sellerName = user._id;
    };
  dbo.collection("items").insertOne({
    productName,
    username,
    descriptionHeader,
    descriptionText,
    location,
    inventory,
    date,
    ratings,
    posts,
    tags,
    category
  });
});

app.post("/rating", upload.none(), (req, res) => {
  let rating = req.body.rating;
  let id = req.body.id;
  let username = req.body.username;
  dbo.collection("items").findOne({ _id: ObjectID(id) }, (err, item) => {
    let ratings = [...item.ratings];
    let keys = Object.keys(ratings);
    keys = keys.filter(key => {
      return key === username;
    });
    if (keys.length === 0) {
      ratings[username] = rating;
      dbo
        .collection("items")
        .updateOne({ _id: ObjectID(id) }, { $set: { ratings } });
      return res.send(JSON.stringify({ succes: true }));
    } else {
      return res.send(JSON.stringify({ succes: false }));
    }
  });
});

app.post("/add-to-cart", upload.none(), (req, res) => {
  cart.addToCart(req, res, dbo);
});

app.post("/remove-from-cart", upload.none(), (req, res) => {
  cart.removeFromCart(req, res, dbo);
});

app.post("/cart", upload.none(), (req, res) => {
  cart.cart(req, res, dbo);
});

app.post("/search", upload.none(), (req, res) => {
  let productName = req.body.productName;
  let tags = req.body.tags;
  tags = tags.map(tag => {
    return new RegExp(tag);
  });
  dbo
    .collection("items")
    .find({ productName: new RegExp(productName), tags: { $in: tags } })
    .toArray((err, array) => {
      if (err) {
        return res.send(JSON.stringify({ success: false }));
      }
      console.log("item: ", array);
      return res.send(JSON.stringify({ array }));
    });
});

app.post("/renderCategory", upload.none(), (req, res) => {
  //name of the category
  let category = req.body.category;
  // //page number of items being displayed
  // let pageNo = req.body.offset;
  // //max number of items being displayed
  // let max = req.body.max;
  // //give the sort parameter (quantity, price, whatever). Has to match the parameter name in the database
  // let sortParam = req.body.sortParam;
  // //give sort direction. Asc is 1, desc is -1
  // let direction = req.body.direction;
  // let currentPage = pageNo * max;
  // let sort = {};
  // sort[sortParam] = direction;
  dbo
    .collection("items")
    .find({ category })
    // .sort(sort)
    // .limit(max)
    // .skip(currentPage)
    .toArray((err, items) => {
      if (err) {
        console.log("Error getting product list");
        return res.send(JSON.stringify({ success: false }));
      }
      return res.send(JSON.stringify({ items }));
    });
});

app.post("/product-page", upload.none(), (req, res) => {
  let id = req.body.id;
  console.log("id: ", id);
  dbo.collection("items").findOne({ _id: ObjectID(id) }, (err, item) => {
    if (err) {
      console.log("Error returning item from database");
      return res.send(JSON.stringify({ success: false }));
    }
    console.log("Item: ", item);
    res.send(JSON.stringify({ success: true, item }));
  });
});

//app.post("/merchant-invetory");

//see the list of sold things
//app.post("/sales-record")

app.post("/confirm-payement", upload.none(), (req, res) => {
  let id = req.body.id;
  dbo.collection("users").findOne({ username }, (err, user) => {
    let cart = [...user.cart];
    let purchased = [...user.purchased];
    let ids = cart.map(item => {
      return ObjectID(item._id);
    });
    dbo
      .collection("items")
      .updateMany({ _id: { $in: ids } }, { $inc: { inventory: -1 } });
    // dbo
    //   .collection("items")
    //   .find({ _id: { $in: ids } })
    //   .toArray((err, items) => {
    //     items = items.map(item => {
    //       return item.inventory - 1;
    //     });
    //   });
    cart.forEach(item => {
      purchased.push(item);
    });
    cart = [];
    dbo
      .collection("users")
      .updateOne({ _id: ObjectID(user._id) }, { $set: { cart, purchased } });
  });
  return res.send(JSON.stringify({ success: true, items }));
});

//app.post("/purchase-history")

//=============================== LISTENER ===============================//
app.listen("4000", () => {
  console.log("Server up");
});
