let addToCart = (req, res, dbo) => {
  let itemId = req.body.itemNo;
  let userId = req.body.userId;
  let cart = req.body.cart;
  cart.push(itemId);
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
  let cart = req.body.cart;
  ids = cart.map(item => {
    return ObjectID(cart);
  });
  dbo.collection("items").find({ _id: { $in: ids } }).toArray((err, items) => {
    if (err) {
      return res.send(JSON.stringify({ success: false }));
    }
    return res.send(JSON.stringify({ success: true, items }));
  });
};

module.exports.cart = cart;
module.exports.removeFromCart = removeFromCart;
module.exports.addToCart = addToCart;
