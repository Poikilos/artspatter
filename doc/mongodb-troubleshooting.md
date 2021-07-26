If you see "Error: couldn't connect to server 127.0.0.1:27017, connection attempt failed: SocketException: Error connecting to 127.0.0.1:27017 :: caused by :: Connection refused", continue steps below.

Try `tail -n 100 /var/log/mongodb/mongod.log`. If you see `Failed to unlink socket file`, mongod was started as root and should not have been (See <https://stackoverflow.com/q/29813648/4541104>):
- `sudo killall mongod`
- `sudo rm /tmp/mongodb-27017.sock`
- `sudo systemctl start mongod`


If mongod.log has "IllegalOperation: Attempted to create a lock file on a read-only directory: /var/lib/mongodb" then:
`sudo chown -R mongodb:mongodb /var/lib/mongodb`


If mondog.log has `{"t":{"$date":"2021-07-26T15:33:45.860-04:00"},"s":"F",  "c":"-",        "id":23091,   "ctx":"initandlisten","msg":"Fatal assertion","attr":{"msgid":4671205,"file":"src/mongo/db/storage/wiredtiger/wiredtiger_kv_engine.cpp","line":656}}`

See [Failed to start WiredTiger after system upgrade](https://www.mongodb.com/community/forums/t/failed-to-start-wiredtiger-after-system-upgrade/13088/5) says to go to [migration steps](https://docs.mongodb.com/manual/release-notes/4.4-upgrade-replica-set/).

The process requires an earlier mongo binary. Go to <https://www.mongodb.com/try/download/community> and choose the correct version and OS, then choose tgz and click "copy link".

All versioned commands below depend on your OS (See URL above to get the correct URLs) before continuing!

If you had 3.6, you'll get:
`** IMPORTANT: UPGRADE PROBLEM: Found an invalid featureCompatibilityVersion document (ERROR: BadValue: Invalid value for version, found 3.6, expected '4.2' or '4.0'. Contents of featureCompatibilityVersion document in admin.system.version: { _id: "featureCompatibilityVersion", version: "3.6" }. See https://docs.mongodb.com/manual/release-notes/4.2-compatibility/#feature-compatibility.). If the current featureCompatibilityVersion is below 4.0, see the documentation on upgrading at https://docs.mongodb.com/manual/release-notes/4.2/#upgrade-procedures.`, so:
Continue the following steps to upgrade all the way from 3.6.

You'll need two terminals, one to run mongod and one to run mongo. Both should run as the mongodb user. You can't switch to the mongodb user, so you must first:
- Install `sudo` if you don't have it yet.
- Change `/var/lib/mongodb` in the steps below to your data path if it differs.

You need 4 for this usually, such as if you used an old version on Ubuntu 18.04 prior to updating to the latest 18.04 package.
- Skip the 3.6 part unless you have an even earlier database version than 3.6:

In the first terminal:
```
sudo su -
cd /tmp
wget https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-ubuntu1404-3.6.23.tgz
tar -xf mongodb-linux-x86_64-ubuntu1404-3.6.23.tgz
cd /tmp/mongodb-linux-x86_64-ubuntu1404-3.6.23/bin
#See <https://docs.mongodb.com/manual/release-notes/4.2/#upgrade-procedures> (The URL is from the 4.2 error message shown above)
sudo -u mongodb ./mongod --dbpath /var/lib/mongodb
```

In the second terminal:
```
cd /tmp/mongodb-linux-x86_64-ubuntu1404-3.6.23/bin
sudo -u mongodb ./mongo
db.adminCommand( { getParameter: 1, featureCompatibilityVersion: 1 } )
```

If it is 3.6 (see <https://docs.mongodb.com/manual/release-notes/4.2-upgrade-standalone/> as per the previous article), press Ctrl+C to exit, go to the first terminal, Ctrl+C to exit mongo and mongod, then:

In the first terminal:
```
cd /tmp
wget https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-ubuntu1404-4.0.26.tgz
tar -xf mongodb-linux-x86_64-ubuntu1404-4.0.26.tgz
cd /tmp/mongodb-linux-x86_64-ubuntu1404-4.0.26/bin
#If mongod says "./mongod: /usr/lib/x86_64-linux-gnu/libcurl.so.4: version `CURL_OPENSSL_3' not found (required by ./mongod)" then:
sudo apt-get update && sudo apt-get install libcurl3
# then try again:
sudo -u mongodb ./mongod --dbpath /var/lib/mongodb
```
- With that running, go to the second terminal
  (See <https://docs.mongodb.com/manual/release-notes/4.2-upgrade-standalone/>):
```
cd /tmp/mongodb-linux-x86_64-ubuntu1404-4.0.26/bin
sudo -u mongodb ./mongo
db.adminCommand( { getParameter: 1, featureCompatibilityVersion: 1 } )
#^ if it is lower than 4.0, then:
db.adminCommand( { setFeatureCompatibilityVersion: "4.0" } )
```

Press Ctrl+C to close mongo.

In the first terminal, press Ctrl+C to close mongod then:
```

```

In the second terminal
(Continue <https://docs.mongodb.com/manual/release-notes/4.2-upgrade-standalone/>):
```
cd /tmp/mongodb-linux-x86_64-ubuntu1804-4.2.15/bin
sudo -u mongodb ./mongo
db.adminCommand( { setFeatureCompatibilityVersion: "4.2" } )
```

Press Ctrl+C to exit mongo.

In the first terminal, press Ctrl+C to stop mongod 4.2.

Next, upgrade further as per the 5.x error message:
> See https://docs.mongodb.com/master/release-notes/4.4-compatibility/#feature-compatibility. :: caused by :: Invalid value for featureCompatibilityVersiondocument in admin.system.version, found 4.2, expected '4.4' or '4.9' or '5.0. See https://docs.mongodb.com/master/release-notes/4.4-compatibility/#feature-compatibility.). If the current featureCompatibilityVersion is below 4.4, see the documentation on upgrading at https://docs.mongodb.com/master/release-notes/4.4/#upgrade-procedures.

```
cd /tmp
wget https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-ubuntu1804-4.4.7.tgz
tar -xf mongodb-linux-x86_64-ubuntu1804-4.4.7.tgz
cd /tmp/mongodb-linux-x86_64-ubuntu1804-4.4.7/bin
sudo -u mongodb ./mongod --dbpath /var/lib/mongodb
```

In the second terminal
(Continue <https://docs.mongodb.com/master/release-notes/4.4/#upgrade-procedures>):
```
cd /tmp/mongodb-linux-x86_64-ubuntu1804-4.4.7/bin
sudo -u mongodb ./mongo
db.adminCommand( { setFeatureCompatibilityVersion: "4.4" } )
```

Press Ctrl+C to exit mongo.

In the first terminal, press Ctrl+C to stop mongod 4.4.

You can see that the process is the same for every upgrade except for the value of "setFeatureCompatibilityVersion". Continue until you get to the version you want. MongoDB server version 5.0.x can be next, since it accepts a 4.4 database (tested on 5.0.1).

Downgrading to libcurl3 probably removed the packaged version of mongod. Go back to the readme and follow the steps to install a recent mongodb from the mongodb.org repository and to enable and start it.
