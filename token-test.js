var jwt = require("jsonwebtoken");
var token = jwt.sign({ foo: "bar" }, "wellmsSuperSecret", {
  expiresIn: "1s",
  no,
});

console.log(token);
