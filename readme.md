# ArtSpatter
Art Community Management System by Jake Gustafson

To report issues, see https://github.com/poikilos/artspatter/issues (Use the search box to see if your issue is listed before adding a new one).

The table models and schemas are in `./models`. Some of them are denormalized
for performance (Drkušić, 2016).

Comments in the code marked "(future)" are not from the 8-week project,
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
  - Debian 10 (Buster):
    - Add the mongodb.org repo for a recent version rather than the version packaged with Debian:
      <https://docs.mongodb.com/manual/tutorial/install-mongodb-on-debian/> Continue those instructions in the following steps below.
    - `sudo apt-get install -y mongodb-org`
    - Set permissions. If the paths in `/etc/mongod.conf` differ from the defaults, change the paths below to match the conf file.
```

sudo mkdir -p /var/lib/mongodb
sudo mkdir -p /var/log/mongodb
sudo chown -R mongodb:mongodb /var/lib/mongodb
sudo chown -R mongodb:mongodb /var/log/mongodb
```
  - Enable and run:
    - `sudo systemctl enable mongod --now`
  - Verify:
    - `sudo systemctl status mongod`
    - `mongo` is the command to run the mongo shell, which is another
      way to verify it is working, but you must be running the `mongod`
      service first. Run it as the mongodb, otherwise root or some other user may create lock files, socket files or data that will later prevent the service from starting (since the service runs mongod as the mongodb user).
    - If you have errors, see doc/mongodb-troubleshooting.md

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
- Complete the steps in the "Configuration" section below.
- In a terminal, cd to the root of the repo and run `yarn start-watch`
  - run it as a service usually though.
- Next, you must build and run the react client.

To run the test environment without building the react client, see
contributing.md.

Go to http://example.com:56765/api/show/all (replace example.com with the address).
It should say something like "Welcome to the a new ArtSpatter website."
- If using the IP address but not the address works, ensure you've completed the DNS Setup in the "API Configuration" section first.
- If changing http to https results in a certificate error, ensure you've completed the certificate setup in the "API Configuration" section first.

## API Configuration

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

Next, complete the "Client Configuration" section of [asclient](https://github.com/poikilos/asclient).

- Create your `.env` similar to the defaults below (The CLIENT_ORIGIN's
  port must match PORT in the server one. However, `CLIENT_ORIGIN` is being deprecated
  to support a public API--See [https:/]() for the status of this issue):
```
API_PORT = 56765
CLIENT_ORIGIN = http://localhost:54445
```
- If you have a firewall, allow the port:
  - Debian 10: `sudo ufw allow 56765/tcp`

Next, complete DNS configuration as follows.

For Mail-in-a-box:
- Set namecheap or other DNS provider to Custom DNS to allow your server to manage DNS.
- Go to box.example.com/admin, replacing box.example.com with your Mail-in-a-box (MIAB) subdomain.
  - Log in as the MIAB admin.
  - Go to System, Custom DNS to add a new record.
  - Choose the domain from the list.
  - In the subdomain box type something like "_artspatter._tcp"
  - For "Type" choose SRV (service record)
  -  such as (including the trailing '.'):
    `10 10 56765 artspatter.example.com.` except:
    - Change the "api" part to your subdomain you typed in the subdomain box above it.
    - Change the "example.com" part to your domain you chose from the list.

Certificate setup
(For MIAB, adding the domain to its management system as follows will do the certificate automatically):
- Make a /home/user-data/www/custom.yaml such as:
```
artspatter.example.com:
  proxies:
    /: localhost:56765
```
- Add a mailbox or alias such as support@example.com
- Add a mailbox or alias such as support@artspatter.example.com
- Reload the custom configuration: Go to Web, hit any "Change" button, then "Update".

## Development
For how to maintain the code or setup an IDE, see contributing.md.


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
- Sending you database entries without marking the `'@' + API_URL` after
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
