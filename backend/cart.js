let ObjectID = require("mongodb").ObjectID;
let addToCart = (req, res, dbo) => {
  console.log("in add cart");
  let itemId = req.body.productId;
  let userId = req.body.userId;
  console.log("user id:", userId);
  let quantity = req.body.quantity;
  let cart = req.body.cart.split(","); //this returns as string
  cart.push(itemId);
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
  let userId = req.body.userId;
  console.log("cart before split:", cart);
  cart = cart.split(",");
  console.log("cart after split:", cart);
  ids = cart.map(item => {
    return ObjectID(cart);
  });
  dbo
    .collection("items")
    .find({ _id: ObjectID(userId) })
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
