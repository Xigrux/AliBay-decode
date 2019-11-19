let addToCart = (req, res, dbo) => {
  let itemId = req.body.itemNo;
  let userId = req.body.userId;
  dbo.collection("users").findOne({ _id: ObjectID(userId) }), (err, user) => {
    if (err) {
      return res.send(JSON.stringify({ success: false }));
    }
    let cart = [...user.cart];
    cart.push(itemId);
    dbo
      .collection("users")
      .updateOne({ _id: ObjectID(user._id) }, { $set: { cart } });
    return res.send(JSON.stringify({ success: true }));
  };
};

let removeFromCart = (req, res, dbo) => {
  let itemId = req.body.itemNo;
  let userId = req.body.userId;
  dbo.collection("users").findOne({ _id: ObjectID(userId) }), (err, user) => {
    if (err) {
      return res.send(JSON.stringify({ success: false }));
    }
    let cart = [...user.cart];
    let i = cart.indexOf(itemId);
    cart.splice(i, 1);
    dbo
      .collection("users")
      .updateOne({ _id: ObjectID(user._id) }, { $set: { cart } });
    cart = returnCart(user);
    return res.send(JSON.stringify({ success: true, cart }));
  };
};

let cart = (req, res, dbo) => {
  let userId = req.body.userId;
  dbo.collection("users").findOne({ _id: ObjectID(userId) }), (err, user) => {
    if (err) {
      return res.send(JSON.stringify({ success: false }));
    }
    let cart = returnCart(user, dbo);
    return res.send(JSON.stringify({ success: true, cart }));
  };
};

let returnCart = (user, dbo) => {
  user.cart.map(item => {
    return dbo.collection("items").findOne({ _id: ObjectID(item) }), (
      err,
      item
    ) => {
      return { itemName: item.name, itemPrice: item.price, itemId: item.id };
    };
  });
};

module.exports.cart = cart;
module.exports.removeFromCart = removeFromCart;
module.exports.addToCart = addToCart;
