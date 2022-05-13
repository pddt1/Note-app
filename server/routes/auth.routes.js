const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controllers");
module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
    //loi o day verifySignUp
    app.post(
      "/api/auth/signup",
      [
        verifySignUp.checkDuplicateUsername
      ],
      controller.signup
    );
    app.post("/api/auth/signin", controller.signin);
  };