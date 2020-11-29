# ArtSpatter
Art Community Management System by Jake Gustafson

The table models and schemas are in `./models`. Some of them are denormalized
for performance (Drkušić, 2016).

Comments in the code marked "(future)" are not for the 8-week project,
but are being considered for future versions.


## Installation
(These steps are only necessary for future editions--These pieces are
included in the workspace.)
- Create your config/auth.config.js similar to:
```JavaScript
module.exports = {
    secret: 'this-is-no-secret', // change this in your instance.
};
```
- Create your config/db.config.js similar to:
```JavaScript
module.exports = {
  HOST: 'localhost', // 127.0.0.1
  PORT: '27017',
  DB: 'artspatter',
}
```


## Citation Style

Some of the references are cited in the code as opposed to this page.
Using markdown format, `*` denotes italics where specified by APA 7,
since this file and the code are plain text files (though this file
will change the markings to italics if viewed in a markdown viewer or
if converted to another format such as HTML or PDF).


## References
- BezKoder. (2019, October 19). Node.js + MongoDB: User authentication & authorization with JWT. BezKoder. https://bezkoder.com/node-js-mongodb-auth-jwt/
- Drkušić, E. (2016, March 17). *Denormalization: When, why, and how*. Vertabelo Data Modeler. https://vertabelo.com/blog/denormalization-when-why-and-how/
- *Mongoose relationships tutorial*. (n.d.). Vegibit. https://vegibit.com/mongoose-relationships-tutorial/
- *Mongoose v5.10.15: SchemaTypes*. (n.d.). Mongoose. https://mongoosejs.com/docs/schematypes.html
