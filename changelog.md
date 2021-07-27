# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).


## [git] - 2021-07-26
### Changed
- Change the default API_PORT (set in .env) from 8085 (formerly 5000) to 56765.
- Change the client origin from http://localhost:3000 to http://localhost:54445


## [git] - 2020-12-23
### Added
- (readme and contributing) Document the process of installing and
  running.

### Changed
- Switch to yarn.
  - Improve related documentation.

### Removed
- Remove npm-related documentation from contributing and readme files.


## [git] - 2020-12-22
### Changed
- Release 0.9.0


## [git] - 2020-12-13
### Added
- store c time (creation Date)


## [git] - 2020-12-12
### Added
- `node-thumbnail` to add thumbnails (Only save posts
  when the file is a real image, according to whether
  the thumbnail operation reports success).

### Fixed
- `fs` and `mv` to save uploads properly.
- Install filesystem and thumbnailing libraries using npm.
- Move processable images to the public directory and generate
  thumbnails upon upload, saving paths to the database.


## [git] - 2020-12-11
### Fixed
- Refactor html: Migrate most or all to Tailwind and semantic HTML.
- Fix use of multer for uploads.
- Install and implement `tailwind-navbar-react`


## [git] - 2020-12-11
### Added
- Install the react-infinite-scroll-component using npm.

### Changed
- Change code to semantic HTML.

### Fixed
- Install tailwind-navbar-react using npm.
- Implement it to redo the website’s nav for responsiveness.
- refactor html, migrate most to Tailwind and semantic HTML


## [git] - 2020-12-10
### Added
Create a logo.

### Changed
- Split the nav code into a separate component.

### Fixed
- Make a link load the upload form.
- Change className in several cases to use Tailwind.


## [git] - 2020-12-09
### Added
- Install multer for processing image uploads.
- Code a new route and new API feature that saves the image then adds
  metadata for it in the database.
- Create a new upload form that sends data to the new backend route.


## [git] - 2020-12-06
### Added
- placeholder for post system
- tests
- Create a PrivacySchema to determine on which profile fields the user
  can change the privacy level (not yet added to git).
- Script the loading of initial data necessary to operate the site and
  to test the functionality, utilizing all models except Vote.

### Changed
- No longer hard-code settings (See readme).
- Refine posting, voting, VoteType, flagging, FlagType, section,
  category, role, and user models (not yet added to git).


## [git] - 2020-12-05
### Added
- (backend) Implement numerical id using node-sequence.
- (frontend) errorLeaf function (and reporting module)
  - encapsulate error message formatting code.
- (backend) Create scripts to clear the database.
- (backend) Create functions to load initial database entries to make site usable.

### Fixed
- (frontend) Fix error reporting (React will not accept an error object
  as a state value--use new errorLeaf function).


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
