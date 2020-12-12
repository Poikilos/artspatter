// showNext(req, res, )

const multer = require("multer");
const config = require("../config/auth.config");
const db = require("../models");
const path = require('path');
var mv = require('mv');
var fs = require('fs');
const authJwt = require("../middlewares/authJwt");

const projectDir = path.dirname(__dirname);
const clientDir = projectDir + "/client";
const PUBLIC_DIR = clientDir + "/public";

const User = db.user;
const Post = db.post;
const { nanoid } = require("nanoid");
var thumb = require('node-thumbnail').thumb;
// const reporting = require("../reporting");

function getDotExt(getExtPath) {
  var ext = /^.+\.([^.]+)$/.exec(getExtPath);
  return (ext != null ? ("." + ext[1]) : "");
}

function removeExt(removeExtPath) {
  dotExt = getDotExt(removeExtPath);
  return removeExtPath.substring(0, removeExtPath.length - dotExt.length);
}

exports.getPublicPosts = (req, res) => {

  collection.find(query).stream()
  .on('data', function(doc){
    res.json({
      title: doc.title,
      message: doc.body,
      realRelPath: doc.realRelPath, // full size image
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
  
  const file = req.file;
  // req.file is the file, or supposted to be.
  const originalImageDir = file.destination;
  // req.body will hold the text fields, if there were any
  const originalImageName = file.filename;
  const oldPath = file.path;
  /*
  for (const property in file) {
    console.log(`${property}: ${file[property]}`);
  }
  */
  authJwt.getDecodedToken(req, res, (decoded, err) => {
    if (err) {
      console.log("err: ", err);
      // res.err = err;
      res.send({message: err.message});
      return;
    }
    console.log("decoded: ", decoded);
    const uid = decoded.uid;
    const usersRel = "/user";
    const usersPath = PUBLIC_DIR + usersRel;
    if (!fs.existsSync(usersPath)){
      fs.mkdirSync(usersPath);
    }
    // const userDir = usersPath + "/" + uid;
    const userRel = usersRel + "/" + uid;
    if (!fs.existsSync(PUBLIC_DIR + userRel)){
      fs.mkdirSync(PUBLIC_DIR + userRel);
    }
    const realRel = userRel + "/" + file.filename;
    const realPath = PUBLIC_DIR + realRel;

    if (!fs.existsSync(PUBLIC_DIR + "/thumbs")){
      fs.mkdirSync(PUBLIC_DIR + "/thumbs");
    }

    const thumbsRel = "/thumbs/user"
    if (!fs.existsSync(PUBLIC_DIR + thumbsRel)){
      fs.mkdirSync(PUBLIC_DIR + thumbsRel);
    }

    // const thumbsPath = PUBLIC_DIR + thumbsRel;
    const uThumbsRel = thumbsRel + "/" + uid;
    const uThumbsPath = PUBLIC_DIR + uThumbsRel;
    if (!fs.existsSync(uThumbsPath)){
      fs.mkdirSync(uThumbsPath);
    }
    var dotExt = getDotExt(file.filename);;
    // ^ https://stackoverflow.com/a/190933/4541104 CC BY-SA zangw April 7, 2016
    const thumbRel = uThumbsRel + "/" + nanoid() + dotExt;
    console.log(`Using thumbRel path: ${thumbRel}`)
    const thumbPath = PUBLIC_DIR + thumbRel;
    let oldThumbPath = uThumbsPath + "/" + removeExt(file.filename) + "_thumb.png"
    
    const thisV = req.body.title;
    // res.send({message: `preparing image...`});
    console.log(`  - preparing thumbPath ${thumbPath} from oldPath ${oldPath}...`)
    thumb({
      source: oldPath, // could be a filename: dest/path/image.jpg
      destination: uThumbsPath,
      width: 128,
      height: 128,
      concurrency: 4,
      overwrite: true,
    }, function(files, err, stdout, stderr) {
      if (err) {

        console.log(`  - Generating a thumbnail failed for oldPath ${oldPath}: `, err);
        // console.log(stdout);
        // console.log(stderr);
        res.send({message: err.message});
        fs.unlinkSync(oldPath);
        return;
      }
      
      console.log("  - moving...", files);
      if (files.length < 1) {
        if (fs.existsSync(oldThumbPath)) {
          console.log(`** Resuming processing "${oldThumbPath}"`)
        }
        else {
          console.log(`  - Generating a thumbnail got 0 for oldPath ${oldPath}: FAILED`, err);
          // console.log(stdout);
          // console.log(stderr);
          res.send({message: "Generating a got 0."});
          fs.unlinkSync(oldPath);
          return;
        }
      }
      else {
        oldThumbPath = files[0].dstPath;
      }
      //const thumbnail = files[0];
      console.log("moving \"", oldThumbPath, "\" to \"", thumbPath, "\"...");
      mv(oldThumbPath, thumbPath, {mkdirp: true}, function(err) {
        // done. it first created all the necessary directories, and then
        // tried fs.rename, then falls back to using ncp to copy the dir
        // to dest and then rimraf to remove the source dir
        if (err) {
          console.log(`+Post ${thisV} by ${uid} failed with a moving error: `, err);
          res.send({message: err.message});
          fs.unlinkSync(oldPath);
          return
        }
        console.log("moving \"", oldPath, "\" to \"", PUBLIC_DIR + realRel, "\"...");
        mv(oldPath, PUBLIC_DIR + realRel, {mkdirp: true}, function(err) {
          //res.send("saving...");
          const post = new Post({
            active: true,
            uid: 0, // TODO: change this
            title: req.body.title,
            cid: "art",
            ftn: 0,
            pln: 7,
            thumb: thumbRel,
            oldPath: oldPath,
            realRelPath: realRel,
            cononicalName: file.originalname,
            body: req.body.description,
            //TODO: remoteImageName: req.body.remoteImageName,
          });
          post.save((err) => {
            if (err) {
              console.log(`+Post ${thisV} by ${uid} failed with an error: `, err);
              res.send({message: err.message});
              return;
            }
            console.log(`+Post ${thisV} by ${uid}...`);
            post.uid = uid;
            post.save(err => {
              if (err) {
                console.log("  *", err);
                res.send({message: err.message});
                return;
              }
              console.log(`  * uid ${post.uid} saved a post "${post.title}" in ${post.cid} at ${post.realRelPath} with thumbPath ${thumbPath}.`);
              res.send({message: "Processing is complete!"});
            });
          });
        });
      });
    });

    

    
  });
  //TODO: const remoteImageName = req.file.originalname;
  // ^ See multer documentation
  
  
};

// See https://www.youtube.com/watch?v=jwVCgueYcgE
  