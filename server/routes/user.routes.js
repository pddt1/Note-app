const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controllers");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/post", [authJwt.verifyToken], controller.addNote);
  app.get("/api/retrive", [authJwt.verifyToken], controller.retriveNote);
  app.delete("/api/:nid", [authJwt.verifyToken], controller.deleteNote);
  
};