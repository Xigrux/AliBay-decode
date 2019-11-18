let signup = (req, res, dbo) => {
  console.log("inside");
  //signupType is either "users" or "merchants"
  let signupType = req.body.signupType;
  let username = req.body.username;
  let password = req.body.password;
  let email = req.body.email;
  let region = req.body.region;
  //checking against database to see if email already in use
  dbo.collection(signupType).findOne({ email }, (err, user) => {
    if (err) {
      //if database returns error, signup process ends here
      console.log("There was an error at signup: ", err);
      return res.send(JSON.stringify({ success: false, err }));
    }
    if (user !== null) {
      //if there is not already a user with that name, return err false
      return res.send(JSON.stringify({ success: false, err }));
    }
    //if all goes well, user, pw and email are added to db
    dbo.collection(signupType).insertOne({ username, password, email, region });
    res.send({ success: true });
  });
};

let login = (req, res, dbo) => {
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

let generateSID = () => {
  return Math.floor(Math.random() * 100000000);
};

module.exports.signup = signup;
module.exports.login = login;
module.exports.usernameTaken = usernameTaken;
