const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dbConfig = require('./config/db.config');
// ^  // automatically imported
// const mongoose = require('mongoose');
const path = require('path');
// const routes = require('./routes/api');
var bcrypt = require("bcryptjs");
require('dotenv').config();

const app = express();

var corsOptions = {
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
}; 
app.use(cors(corsOptions));
// (BezKoder, 2019a)

const port = process.env.API_PORT || 8085;

app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
// as per BezKoder (2019a).
app.use(bodyParser.urlencoded({ extended: true }));

const db = require('./models');
const PrivacyLevel = db.privacylevel;
const Role = db.role;
const FlagType = db.flagtype;
const Section = db.section;
const User = db.user;
const Category = db.category;
const VoteType = db.votetype;
const Post = db.post;

// connect to the database
db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true, // (BezKoder, 2019a)
  })
  .then(() => {
    console.log('MongoDB is successfully connected.');
    initialPrivacyLevels();
    initialRoles();
    initialFlagTypes();
    initialSections();
    const adminUid = "1"; // The default starting number for node-sequence is 1
    initialUsers(adminUid); // TODO: do the work of initialCategories() ensuring admin user is owner
    initialCategories(adminUid);
    initialTestPosts(adminUid);  // sample content (not required)
    initialVoteTypes();
  })
  .catch((err) => {
    console.error('Connection error', err);
    process.exit(1);
  });


app.get('/', (req, res) => {
  res.json({ message: 'Welcome to an unnamed ArtSpatter instance.' });
});

// routes
require('./routes/auth.routes')(app);
// TODO: require('./posts/user.routes')(app);
require('./routes/user.routes')(app);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const future_notice = "will be displayed on federated sites"
                      + " (tentatively, in future versions with the feature)";

function initialPrivacyLevels() {
  // - number is used in profile (pln is value for privacy fields--see user.model.js)
  // - number must have same meaning for every site (caption may differ)
  PrivacyLevel.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      const entries = [
        [0, "Deleted", null],
        [1, "Archived", null],
        [2, "Private", null],
        [3, "Friends", null],
        [4, "Friends of Friends", null],
        [5, "Logged in to this site", null],
        [6, "Logged in to federation", future_notice],
        [7, "Public", future_notice],
      ];
      for (var index = 0; index < entries.length; index++) {
        var thisE = entries[index];
        let thisV = thisE[1]; // let forces scope to be code block so last value doesn't repeat
        new PrivacyLevel({
          pln: thisE[0],
          caption: thisE[1],
          description: thisE[2],
        }).save((err) => {
          if (err) {
            console.log(`+PrivacyLevel ${thisV} error`, err);
          }
          else {
            console.log(`+PrivacyLevel ${thisV}`);
          }
        });
      }
    }
  });
}

function initialRoles() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      // [active,rid,ccids,rcids,mcids,dcids,rrids,mrids,drids]
      const entries = [
        [true, "user"],
        [true, "moderator"],
        [true, "admin"],
      ];
      for (var index = 0; index < entries.length; index++) {
        var thisE = entries[index];
        let thisV = thisE[1]; // let forces scope to be code block so last value doesn't repeat
        new Role({
          active: thisE[0],
          rid: thisE[1],
        }).save((err) => {
          if (err) {
            console.log(`+Role ${thisV} error`, err);
          }
          else {
            console.log(`+Role ${thisV}`);
          }
        });
      }
    }
  });
}

function initialFlagTypes() {
  FlagType.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      var tldr = "This is only appropriate for mature audiences"
                 + " (may be misleading or provocative).";
      // [active,ftn,caption,description,pln]
      const entries = [
        [true, 0, "General Audiences", "This is appropriate for anyone.", 7],
        [true, 1, "Teen", "This is only appropriate for teens or older (may be shocking).", 5],
        [true, 2, "Mature", tldr, 5],
      ];
      for (var index = 0; index < entries.length; index++) {
        let thisE = entries[index];
        let thisV = thisE[1]; // let forces scope to be code block so last value doesn't repeat
        new FlagType({
          active: thisE[0],
          ftn: thisE[1],
          caption: thisE[2],
          description: thisE[3],
          pln: thisE[4],
        }).save((err) => {
          if (err) {
            console.log(`+FlagType ${thisV}, ${thisE[2]} error`, err);
          }
          else {
            console.log(`+FlagType ${thisV}, ${thisE[2]}`);
          }
        });
      }

    }
  });
}

function initialSections() {
  Section.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      // [active, sid, caption, pln]
      const entries = [
        [true, "art", "Art", 7],
        [true, "forum", "Discussions", 7],
      ];
      for (var index = 0; index < entries.length; index++) {
        var thisE = entries[index];
        let thisV = thisE[1]; // let forces scope to be code block so last value doesn't repeat
        new Section({
          active: thisE[0],
          sid: thisE[1],
          caption: thisE[2],
          pln: thisE[3],
        }).save((err) => {
          if (err) {
            console.log(`+Section ${thisV} error`, err);
          }
          else {
            console.log(`+Section ${thisV}`);
          }
        });
      }
    }
  });
}

function initialUsers(uid) {
  var error = null;
  let adminUid = uid;
  User.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      // [active,uid,username,email,pln,showFtns,display,password,overview]
      const entries = [
        [true, "1", "admin", null,  2, [0,1,2], "Admin", "password", "[The system generated this user.]"],
      ];
      for (var index = 0; index < entries.length; index++) {
        var thisE = entries[index];
        let thisV = thisE[1]; // let forces scope to be code block so last value doesn't repeat
        let passwordPlainText = thisE[7];
        const user = new User({
          active: thisE[0],
          uid: thisE[1],
          username: thisE[2],
          email: thisE[3],
          pln: thisE[4],
          showFtns: thisE[5],
          display: thisE[6],
          password: bcrypt.hashSync(passwordPlainText, 8),
          overview: thisE[8],
        });
        user.save((err) => {
          if (err) {
            console.log(`+User ${thisV} error`, err);
            return;
          }
          console.log(`+User ${thisV}`);
          Role.findOne({ rid: "admin" }, (err, role) => {
            if (err) {
              console.log("  * no role: ", err);
              return;
            }
            user.roles = [role._id];
            user.save(err => {
              if (err) {
                console.log("  *", err);
                return;
              }
              user.uid = user.user_id.toString();
              user.save(err => {
                if (err) {
                  console.log("  *", err);
                  return;
                }
                console.log(`  * saved admin as uid ${user.uid} with password ${passwordPlainText}`);
              });
            });
          });
        });
      }
    }
    else {
      error = err;
    }
  });
}

function initialCategories(uid) {
  // entries:
  // (active,cid,caption,sid,display,parent,uid,pln)
  // (true,"art", "Browse", "art" "gallery", null, "0", 7),
  // (true,"forum", "Discuss", "forum" "forum", null, "0", 7)
  let adminUid = uid;
  Category.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      //[active,cid,caption,   sid,display,     parent,uid,pln]
      const entries = [
        [true, "art", "Browse", "art", "gallery", null, adminUid, 7],
        [true,"forum","Discuss","forum","forum",  null, adminUid, 7],
      ];
      for (var index = 0; index < entries.length; index++) {
        let thisE = entries[index];
        let thisV = thisE[1]; // let forces scope to be code block so last value doesn't repeat
        new Category({
          active: thisE[0],
          cid: thisE[1],
          caption: thisE[2],
          sid: thisE[3],
          display: thisE[4],
          parent: thisE[5],
          uid: thisE[6],
          pln: thisE[7],
        }).save((err) => {
          if (err) {
            console.log(`+Category ${thisV} by ${adminUid} (generated) error`, err);
          }
          else {
            console.log(`+Category ${thisV} by ${adminUid} (generated)`);
          }
        });
      }
    }
  });
}

function initialVoteTypes() {
  // entries:
  
  VoteType.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      // [active,vtn,v,caption,pln]
      const entries = [
        [true, 1, 1, "Like", 7],
        [true, 2, -1, "Dislike", 7],
        [true, 3, -1, "Offensive", 7],
        [true, 4, -1, "Spam", 7],
      ];
      for (var index = 0; index < entries.length; index++) {
        var thisE = entries[index];
        let thisV = thisE[1]; // let forces scope to be code block so last value doesn't repeat
        new VoteType({
          active: thisE[0],
          vtn: thisE[1],
          v: thisE[2],
          caption: thisE[3],
          pln: thisE[4],
        }).save((err) => {
          if (err) {
            console.log(`+VoteType ${thisV} error`, err);
          }
          else {
            console.log(`+VoteType ${thisV}`);
          }
        });
      }
    }
  });
}

function initialTestPosts(uid) {
  const adminUid = uid;
  Post.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      //[active,    uid,   title,   cid,  ftn, pln,         thumb,         full, body]
      const entries = [
        [true, adminUid, "TestArt","art",  0,   7, "favicon.ico","favicon.ico", "This is an image description (generated by initialTestPost)."],
        [true, adminUid,"TestPost","forum",  0,   7,          null,         null, "This is the body of a forum post (generated by initialTestPost)."],
      ];
      for (var index = 0; index < entries.length; index++) {
        let thisE = entries[index];
        let thisV = thisE[2]; // let forces scope to be code block so last value doesn't repeat
        const post = new Post({
          active: thisE[0],
          uid: thisE[1],
          title: thisE[2],
          cid: thisE[3],
          ftn: thisE[4],
          pln: thisE[5],
          thumb: thisE[6],
          full: thisE[7],
          body: thisE[8],
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
            console.log(`  * saved a post "${post.title}" in ${post.cid}`);
          });
        });
      }
    }
  });
}
