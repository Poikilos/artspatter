const { authJwt } = require("../middlewares");
const controller = require("../controllers/post.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
  
    app.post("/api/post/save", controller.savePost);

    app.get("/api/post/all", controller.getAll);

    /*
    app.get("/api/post/user", [authJwt.verifyToken], controller.userPosts);
  
    app.get(
      "/api/post/mod",
      [authJwt.verifyToken, authJwt.isModerator],
      controller.moderatorPosts
    );
  
    app.get(
      "/api/post/admin",
      [authJwt.verifyToken, authJwt.isAdmin],
      controller.adminPosts
    );
    */
  };
  