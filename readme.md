# ArtSpatter
Art Community Management System by Jake Gustafson

The table models and schemas are in `./models`. Some of them are denormalized
for performance (Drkušić, 2016).

Comments in the code marked "(future)" are not for the 8-week project,
but are being considered for future versions.

This is only the API (server) but contains general information. For
information specific to the React.js client (the service on the port
that browsers access), see `client/readme.md`.

## Requires
- mongodb
  - Fedora: See
    <https://fedoramagazine.org/how-to-get-mongodb-server-on-fedora/>
  - 18.04 LTS (Bionic Beaver): See
    <https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/>
  - Enable and run:
    - `sudo systemctl enable mongod --now`
  - Verify:
    - `sudo systemctl status mongod`
    - `mongo` is the command to run the mongo shell, which is another
      way to verify it is working, but you must be running the `mongod`
      service first.


## Installing
### GNU+Linux systems
- Install, enable and run MongoDB (See "Requires").
- Install git and dependencies:
  - Fedora: `sudo dnf install git nodejs yarn`
  - Debian 10: The nodejs version is too old (~10) but 12 is required, so:
    - See <https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-debian-10>
      and follow the instructions for Node 12.x.
      - install the latest yarn as per the instructions that the nodesource installer shows.
  - Debian >10 or Ubuntu: `sudo apt-get update && sudo apt-get install git nodejs`
    - Says "You may also need development tools to build native addons" so:
      `sudo apt-get install gcc g++ make`
    - As of 2020-12-23, Debian 10.7 has node 13.x which is not compatible
      with the current version of postcss that yarn provides. If you have
      this problem, you can switch to Node 14 using the NodeSource
      repository (See
      <https://linuxize.com/post/how-to-install-node-js-on-debian-10/>:
    ```
curl -sL https://deb.nodesource.com/setup_14.x | sudo bash -
```
    - Run `echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list`
    - Install yarn as instructed by the setup_14.x output, such as:
      ```
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install yarn
```
- Get the ArtSpatter source code:
  `git clone https://github.com/poikilos/artspatter`
- Get the project-specific dependencies:
```
cd artspatter && yarn
cd client && yarn
```
- Run: proceed to "Usage"


## Usage
Note that on Fedora, the Node.js command is `node`, and on Ubuntu it is
`nodejs` on Ubuntu 18.04 and at least some earlier versions and possibly
later versions.

### GNU+Linux systems
- Install and start MongoDB, and then install ArtSpatter
  (see "Installing").
- In a terminal, cd to the root of the repo and run `yarn start-watch`
  - run it as a service usually though.
- Next, you must build and run the react client.

To run the test environment without building the react client, see
contributing.md.


## Configuration

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
  comes from `yarn start` internally which uses the PORT environment
  variable (API_URL's port must match API_PORT in the client one):
```
PORT = 3000
API_URL = http://localhost:5000
```
- Create your `.env` similar to the defaults below (The CLIENT_ORIGIN's
  port must match PORT in the server one):
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

Therefore, only federate with sites you trust. The following exploits
and likely more can result from federating with a server that wants to
do harm. There is no way around this. There may be ways to mitigate
some issues, but likely not for most or all of these issues and similar
ones. ArtSpatter can only provide code, and you are responsible for the
code on your own server. However, neither you nor ArtSpatter has any
control over the code running on another server.

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
- BezKoder. (2019a, October 19). Node.js + MongoDB: User authentication
  & authorization with JWT. *BezKoder*.
  https://bezkoder.com/node-js-mongodb-auth-jwt/
- BezKoder. (2019b, October 19). React JWT authentication (Without
  Redux) example. *BezKoder*. https://bezkoder.com/react-jwt-auth/
- Drkušić, E. (2016, March 17). *Denormalization: When, why, and how*.
  Vertabelo Data Modeler.
  https://vertabelo.com/blog/denormalization-when-why-and-how/
- *Mongoose relationships tutorial*. (n.d.). Vegibit.
  https://vegibit.com/mongoose-relationships-tutorial/
- *Mongoose v5.10.15: SchemaTypes*. (n.d.). Mongoose.
  https://mongoosejs.com/docs/schematypes.html
