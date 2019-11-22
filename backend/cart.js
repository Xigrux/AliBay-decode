let ObjectID = require("mongodb").ObjectID;

let addToCart = (req, res, dbo) => {
  let update = JSON.parse(req.body.update);
  let itemId = req.body.productId;
  let userId = req.body.userId;
  let quantity = parseInt(req.body.quantity);
  let item = { itemId, quantity };
  if (update) {
    dbo
      .collection("users")
      .updateOne(
        { _id: ObjectID(userId), "cart.itemId": itemId },
        { $inc: { "cart.$.quantity": quantity } }
      );

    return res.send(JSON.stringify({ success: true, item }));
  } else {
    dbo
      .collection("users")
      .updateOne({ _id: ObjectID(userId) }, { $push: { cart: item } });

    return res.send(JSON.stringify({ success: true, item }));
  }

  console.log("in add item before return");
};

let removeFromCart = (req, res, dbo) => {
  console.log("in removeFromCart");
  let update = JSON.parse(req.body.update);
  let quantity = parseInt(req.body.quantity);
  let userId = req.body.userId;
  let itemId = req.body.productId;
  console.log("in update", update);
  console.log("in quantity", quantity);
  console.log("in userId", userId);
  console.log("in itemId", itemId);
  let item = { itemId, quantity };

  if (update) {
    dbo
      .collection("users")
      .updateOne(
        { _id: ObjectID(userId), "cart.itemId": itemId },
        { $inc: { "cart.$.quantity": quantity * -1 } }
      );

    return res.send(JSON.stringify({ success: true, item }));
  } else {
    dbo
      .collection("users")
      .updateOne({ _id: ObjectID(userId) }, { $pull: { cart: item } });

    return res.send(JSON.stringify({ success: true, item }));
  }
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
