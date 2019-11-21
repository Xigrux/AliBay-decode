let ObjectID = require("mongodb").ObjectID;
let addToCart = (req, res, dbo) => {
  console.log("in add cart");
  let itemId = req.body.productId;
  let userId = req.body.userId;
  console.log("user id:", userId);
  let quantity = 1;
  let cart = req.body.cart.split(","); //this returns as string
  cart.push({ item: itemId, quantity });
  console.log("updated cart: ", cart);
  dbo
    .collection("users")
    .updateOne({ _id: ObjectID(userId) }, { $set: { cart } });
  return res.send(JSON.stringify({ success: true, cart }));
};

let removeFromCart = (req, res, dbo) => {
  let itemId = req.body.itemNo;
  let userId = req.body.userId;
  let cart = req.body.cart;
  let i = cart.indexOf(itemId);
  cart.splice(i, 1);
  dbo
    .collection("users")
    .updateOne({ _id: ObjectID(userId) }, { $set: { cart } });
  return res.send(JSON.stringify({ success: true, cart }));
};

let cart = (req, res, dbo) => {
  console.log("in cart");
  let cart = req.body.cart;
  console.log("cart before split:", cart);
  cart = cart.split(",");
  console.log("cart after split:", cart);
  ids = cart.map(item => {
    console.log("item in map: ", item);
    return ObjectID(item);
  });
  dbo
    .collection("items")
    .find({ _id: { $in: ids } })
    .toArray((err, items) => {
      if (err) {
        return res.send(JSON.stringify({ success: false }));
      }
      return res.send(JSON.stringify({ success: true, items }));
    });
};

module.exports.cart = cart;
module.exports.removeFromCart = removeFromCart;
module.exports.addToCart = addToCart;
