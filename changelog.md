# Changelog


## [git] - 2020-11-28
### Added
- JWT Authentication

### Changed
- Rename index.js to server.js.


## [git] - 2020-11-27
### Added
- eslint

### Changed
- Rename jsx files to use jsx extension (helps with linting).
- Switch to airbnb coding style.

### Fixed
- Remove duplicate dependency in react (resolves issue #13).
- (quality.py) Properly handle both stdout and stderr.

### Removed
- jshint

## [git] - 2020-11-25
### Added
- quality.py
- Add placeholders for per-category and per-role priveleges to roles:
  Allow CRUD granularly (C, R, U, or D separately) for posts in given
  categories and users in given roles.

### Changed
- (quality.py run_command) detect string or array, `decode()` bytestring
- (quality.py run_command) accept a file stream for screen+file output
- (quality.py run_command) fix infinite loop: check output&return
  separately
- Rename foreign keys and primary keys with same names.
- Rearrange indexes and keys for performance.


## [unreleased] - 2020-11-24
### Added
- `friends` to user table


## [git] - 2020-11-21
### Added
- `value` for Ballot (how much the ballot promotes or demotes the post)

### Changed
- Rename BallotName to caption.
- Rename Marking to FlagType.
- Rename Ballot to VoteType.
- Change `FlagUserMarking` and `VoteUserID` to each use a compound index
  (the fields are no longer necessary).
- Make the case same for the model name and the model constant
  (Mongoose Query Population v3.3.1, n.d.).

### Fixed
- Make Mongoose model names lowercase.
- Name the const correctly for Post.

### Removed
- Rename `BallotID` to `n`


## [git] - 2020-11-19
### Changed
- Rename  Ballot ~~Reaction~~ 


## [git] - 2020-11-17
### Changed
- Rename "Rating" to "Flag"
- Rename "Level" to "Marking"
- Rename "RoleName" to "title"


## [git] - 2020-11-16
### Added
- Finish the DigitalOcean [Getting Started with the MERN
  Stack](https://www.digitalocean.com/community/tutorials/getting-started-with-the-mern-stack)
  tutorial (add custom React components "client/src/App.js" loads them
  via the `./components/Todo` component).


## [git] - 2020-11-11
### Fixed
- Change "yarn" to "npm" in the concurrently command in package.json. 
  RESOLVES: Yarn is installed, but running it through npx produces an
  error: See `screenshots/2020-11-11_npx_yarn--error.txt`.
- Change "DB = ‘mongodb://<USER\>:<PASSWORD\>@ds039950.mlab.com:39950/todo’"
  in the `.env` file.
  RESOLVES: MongoNetworkError: failed to connect to server (See
  `2020-11-11_mongod_error.txt`)

## References
- *Mongoose Query Population v3.3.1*. (n.d.). https://mongoosejs.com/docs/3.3.x/docs/populate.html
