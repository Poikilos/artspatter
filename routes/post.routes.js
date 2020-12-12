const multer  = require('multer');

const storage = multer.diskStorage({
  destination: "./uploads/postimages/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 100000000 },
}); //.array("image", 10); // for array, upload code below differs.
// ^ Mahad Ansar--August 17, 2020 https://stackoverflow.com/a/63453872/4541104
//   license: https://creativecommons.org/licenses/by-sa/4.0/

//const upload = multer({ dest: 'uploads/' });
// ^ moved to public/${uid}/${pid} later

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
  
    app.post("/api/post/upload", [/* authJwt.verifyToken,*/ upload.single('file')], controller.uploadPost);

    app.get("/api/post/all", controller.getPublicPosts);
  };
  