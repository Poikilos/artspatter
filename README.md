# ArtSpatter
Art Community Management System by Jake Gustafson

The table models and schemas are in `./models`. Some of them are denormalized
for performance (Drkušić, 2016).

Comments in the code marked "(future)" are not for the 8-week project,
but are being considered for future versions.


## Configuration
(These steps are only necessary if downloaded from git--These pieces are
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
- Create your `client/.env` similar to defaults below--PORT default
  comes from "npm start" internally which uses the PORT environment 
  variable (API_URL's port must match API_PORT in `.env`):
```
PORT=3000
API_URL=http://localhost:5000/api
```
- Create your `.env` similar to the defaults below (CLIENT_ORIGIN must
  match PORT in client/.env):
```
API_PORT = 5000
CLIENT_ORIGIN = http://localhost:3000
```


## Development
For how to maintain the code, see contributing.md.


## Citation Style

Some of the references are cited in the code as opposed to this page.
Using markdown format, `*` denotes italics where specified by APA 7,
since this file and the code are plain text files (though this file
will change the markings to italics if viewed in a markdown viewer or
if converted to another format such as HTML or PDF).


## References
- BezKoder. (2019a, October 19). Node.js + MongoDB: User authentication & authorization with JWT. *BezKoder*. https://bezkoder.com/node-js-mongodb-auth-jwt/
- BezKoder. (2019b, October 19). React JWT authentication (Without Redux) example. *BezKoder*. https://bezkoder.com/react-jwt-auth/
- Drkušić, E. (2016, March 17). *Denormalization: When, why, and how*. Vertabelo Data Modeler. https://vertabelo.com/blog/denormalization-when-why-and-how/
- *Mongoose relationships tutorial*. (n.d.). Vegibit. https://vegibit.com/mongoose-relationships-tutorial/
- *Mongoose v5.10.15: SchemaTypes*. (n.d.). Mongoose. https://mongoosejs.com/docs/schematypes.html
