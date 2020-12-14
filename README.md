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
API_URL=http://localhost:5000
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

## Federating
After the 8-week project is complete, adding a feature to connect
multiple sites would be a useful feature.

### Security with Federating
Federated sites don't necessarily run by the same rules as your site.
Choosing federated sites wisely will protect the correct and fair
operation of your site.

Federating would result in a new range of security issues, since the
other site's API would handle how data is created rather than your
site's.

Here are some data manipulations that would affect your site:
- Post-dating the creation time would artificially boost posts.
- Sending you database entries without marking the '@' + API_URL after
  the id would hide the entry's origin and federate you with sites you
  didn't intend (your site would unknowingly store it as
  `uid + '@' + federatedSiteAPIURL` as long as the uid was not already
  present in your database [The mongoose unique setting hinders this
  unless they change the uid]).
- The other site could change the privacy level of posts, or place
  private user profile data in posts or other incorrect collections that
  the feature would recieve, process, and filter as if from that
  collection instead of the User collection.
- The site could manipulate flag count or self-flagging.
- They could send you thumbnails of an arbitrary size.


## References
- BezKoder. (2019a, October 19). Node.js + MongoDB: User authentication & authorization with JWT. *BezKoder*. https://bezkoder.com/node-js-mongodb-auth-jwt/
- BezKoder. (2019b, October 19). React JWT authentication (Without Redux) example. *BezKoder*. https://bezkoder.com/react-jwt-auth/
- Drkušić, E. (2016, March 17). *Denormalization: When, why, and how*. Vertabelo Data Modeler. https://vertabelo.com/blog/denormalization-when-why-and-how/
- *Mongoose relationships tutorial*. (n.d.). Vegibit. https://vegibit.com/mongoose-relationships-tutorial/
- *Mongoose v5.10.15: SchemaTypes*. (n.d.). Mongoose. https://mongoosejs.com/docs/schematypes.html
