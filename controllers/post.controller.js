// showNext(req, res, )
const path = require("path");
const multer = require("multer");
const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Post = db.post;
// const reporting = require("../reporting");

// See <https://code.tutsplus.com/tutorials/file-upload-with-multer-in-node--cms-32088>:
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
    // path.extname(file.originalname));
  }
});
const upload = multer({
  storage: storage,
  limits:{fileSize: 1000000},
}); //.single("myImage");

exports.getPublicPosts = (req, res) => {

  collection.find(query).stream()
  .on('data', function(doc){
    res.json({
      title: doc.title,
      message: doc.body,
      originalImagePath: doc.originalImagePath, // full size image
    });
  })
  .on('error', function(err){
    res.status(500).send({
      message: err,
    });
  })
  .on('end', function(){
    res.status(200).send("Done.");
  });
  // res.status(200).send("not yet implemented");
  res.json({
    message: "We recieved your data",
  });
};
// (BezKoder, 2019a)
  
exports.uploadPost = (req, res) => {
  console.log('post Body: ', req.body);

  // var img = fs.readFileSync(req.file.path);
  // var encode_image = img.toString('base64');
  // ^ to save to database, see https://code.tutsplus.com/tutorials/file-upload-with-multer-in-node--cms-32088
  
  /*
  res.json({
    message: "We recieved your data",
  });
   */
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  const originalImageDir = req.file.destination;
  const originalImageName = req.file.filename;
  const originalImagePath = req.file.path;
  //TODO: const remoteImageName = req.file.originalname;
  // ^ See multer documentation
  
  const post = new Post({
    active: true,
    uid: 0, // TODO: change this
    title: req.body.title,
    cid: "art",
    ftn: 0,
    pln: 7,
    thumb: null,
    originalImagePath: originalImageName,  //relative to uploads
    body: req.body.description,
    //TODO: remoteImageName: req.body.remoteImageName,
  });
  post.save((err) => {
    if (err) {
      console.log(`+Post ${thisV} by ${adminUid} (generated) error`, err);
      return;
    }
    console.log(`+Post ${thisV} by ${adminUid} (generated)`);
    post.uid = adminUid;
    post.save(err => {
      if (err) {
        console.log("  *", err);
        return;
      }
      console.log(`  * saved a post "${post.title}" in ${post.cid} at ${post.originalImagePath}`);
    });
  });
};

// See https://www.youtube.com/watch?v=jwVCgueYcgE
  