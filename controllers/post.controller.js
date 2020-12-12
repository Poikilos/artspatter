// showNext(req, res, )
const path = require("path");
const multer = require("multer");
const config = require("../config/auth.config");
const db = require("../models");
const authJwt = require("../middlewares/authJwt");
const User = db.user;
const Post = db.post;
// const reporting = require("../reporting");



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
//formerly  = (req, res) => {
exports.uploadPost = (req, res) => {

  // See <https://code.tutsplus.com/tutorials/file-upload-with-multer-in-node--cms-32088>:

  console.log('post Body: ', req.body);
  // console.log('post res: ', res) // really long, but confirmed to be a ServerResponse
  // console.log('error: ', error)
  // var img = fs.readFileSync(req.file.path);
  // var encode_image = img.toString('base64');
  // ^ to save to database, see https://code.tutsplus.com/tutorials/file-upload-with-multer-in-node--cms-32088

  /*
  res.json({
    message: "We recieved your data",
  });
   */
  // const file = req.file; // TODO: (fix?) null for some reason
  // ^ See 
  console.log('post req.file: ', req.file);
  console.log('post req.body.file: ', req.body.file);
  
  const file = req.body.file;
  // req.file is the file
  const originalImageDir = file.destination;
  // req.body will hold the text fields, if there were any
  const originalImageName = file.filename;
  const originalImagePath = file.path;
  authJwt.getDecodedToken(req, res, (decoded, err) => {
    if (err) {
      console.log("err: ", err);
      // res.err = err;
      res.send(err);
      return;
    }
    console.log("decoded: ", decoded);
    const uid = decoded.uid;
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
    const thisV = req.body.title;
  
    post.save((err) => {
      if (err) {
        console.log(`+Post ${thisV} by ${uid} (generated) error`, err);
        res.send(err);
        return;
      }
      console.log(`+Post ${thisV} by ${uid} (generated)`);
      post.uid = uid;
      post.save(err => {
        if (err) {
          console.log("  *", err);
          res.send(err);
          return;
        }
        console.log(`  * saved a post "${post.title}" in ${post.cid} at ${post.originalImagePath}`);
      });
    });
  });
  //TODO: const remoteImageName = req.file.originalname;
  // ^ See multer documentation
  
  
};

// See https://www.youtube.com/watch?v=jwVCgueYcgE
  