let signup = (req, res, dbo) => {
  //signupType is either "users" or "merchants"
  let signupType = req.body.signupType;
  console.log("signupType: ", signupType);

  let username = req.body.username;
  let password = req.body.password;
  let email = req.body.email;
  let region = req.body.region;
  let userType = req.body.signupType;

  if (
    username === undefined ||
    password === undefined ||
    email === undefined ||
    region === undefined ||
    userType === undefined
  ) {
    return res.send(JSON.stringify({ success: false }));
  }

  //checking against database to see if email already in use
  dbo.collection(signupType).findOne({ email }, (err, user) => {
    if (err) {
      //if database returns error, signup process ends here
      console.log("There was an error at signup: ", err);
      return res.send(JSON.stringify({ success: false, err }));
    }

    if (user !== null) {
      //if there is not already a user with that name, return err false
      console.log("duplicated name");
      return res.send(JSON.stringify({ success: false, err }));
    }
    //if all goes well, user, pw and email are added to db
    dbo.collection(signupType).insertOne({
      username,
      password,
      email,
      region,
      userType,
      cart: [],
      purchased: [],
      inventory: [],
      salesHistory: []
    });
    res.send(
      JSON.stringify({
        success: true,
        user: {
          username,
          password,
          email,
          region,
          userType,
          cart: [],
          purchased: [],
          inventory: [],
          salesHistory: []
        }
      })
    );
  });
};

let login = (req, res, dbo) => {
  console.log("Login hit");

  //loginType is either "users" or "merchants"
  let signupType = req.body.signupType;
  let username = req.body.username;
  let enteredPassword = req.body.password;
  console.log("credentials", signupType, username, enteredPassword);

  if (username === undefined || enteredPassword === undefined) {
    return res.send(JSON.stringify({ success: false }));
  }

  dbo.collection(signupType).findOne({ username }, (err, user) => {
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
      console.log("LOGIN SUCCESS******");

      //password match. login success. generate session ID
      let sid = generateSID();
      dbo.collection("cookies").insertOne({ username, sid });
      res.cookie("sid", sid);
      return res.send(JSON.stringify({ success: true, user }));
    }
    //default: no login

    console.log("DEFAULT RESPONSE");

    res.send(JSON.stringify({ success: false }));
  });
};

let usernameTaken = () => {
  //signupType is either "users" or "merchants"
  let signupType = req.body.signupType;
  let username = req.body.username;
  dbo.collection(signupType).findOne({ username }, (err, user) => {
    if (user.username === username) {
      return res.send(JSON.stringify({ success: false }));
    }
    return res.send(JSON.stringify({ success: true }));
  });
};

let autoLogin = (req, res, dbo) => {
  let sid = req.cookie.sid;
  let signupType = req.body.signupType;
  console.log("sid", sid);
  dbo.collection("cookies").findOne({ sid }, (err, sid) => {
    if (err || sid === null) {
      return res.send(JSON.stringify({ success: false }));
    }
    if (sid !== null) {
      dbo
        .collection(signupType)
        .findOne({ username: sid.username }, (err, user) => {
          return res.send(JSON.stringify({ success: true, user }));
        });
    }
  });
};

let generateSID = () => {
  return Math.floor(Math.random() * 100000000);
};

module.exports.signup = signup;
module.exports.login = login;
module.exports.usernameTaken = usernameTaken;
module.exports.autoLogin = autoLogin;
