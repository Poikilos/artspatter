const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });

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
  
    app.post("/api/post/upload", upload.single('image'), controller.uploadPost);

    app.get("/api/post/all", controller.getPublicPosts);
  };
  