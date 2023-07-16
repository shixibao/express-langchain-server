var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/login', function (req, res, next) {
  const { password, username } = req.body;
  const send = { code: 0, data: {}, msg: "" };
  if (username === "admin" && password === "123456") {
    send["data"] = {
      token: "admin",
    };
  } else if (username === "user" && password === "123456") {
    send["data"] = {
      token: "user",
    };
  } else if (username === "test" && password === "123456") {
    send["data"] = {
      token: "test",
    };
  } else {
    send["code"] = 201;
    send["msg"] = "Wrong username or password";
  }
  res.send(send);
});

router.get('/info', function (req, res, next) {
  const headers = req.header;
  const ajaxHeadersTokenKey = "x-token";
  let result = {
    code: 0,
    data: {
      id: 2,
      name: "Users",
      avatar: "",
      roles: ["user"],
    },
  };


  res.send(result)

});

module.exports = router;
