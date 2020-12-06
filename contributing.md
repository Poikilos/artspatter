# ArtSpatter Development

This document explains how to maintain the code.


## Registration
- (client/src/components/register.component.js) form
  - posts to (auth.routes.js) /api/auth/signup
    - calls (middlewares/verifySignup.js) verifySignup.*
      (new ones must be added to the list in auth.routes.js
      - do not proceed if a check fails
    - calls (controllers/auth.controller) controller.signup
      - calls (models/user.model.js) mongoose User model
        - writes to mongodb

## Database
### IDs are text for cross-site support
IDs must be strings for cross-site synchronized data (for example,
uid should be unique and auto-incremented, but the user table may
contain users from other sites--therefore, the uid is the text form of
the node-sequence id, and may contain "@" then a base URL of
another installation.

The id is used instead of usernames, since usernames may change, and
that would cause problems with friend requests. Another solution would
be a GUID, but id.toString()+atSiteStr is shorter.

### Collection ("table") dependencies
The software must initialize tables in this order
(indented items are dependencies):
- PrivacyLevel
- Role
  - `*cids` Category.cid
  - `*rids` Role.rid
- FlagType
  - PrivacyLevel.pln
- Section
  - PrivacyLevel.pln
- User (initial user is "admin" and has "admin" and "moderator" roles)
  - `roles` [Role._id]
  - `showFtns` [FlagType]
  - `friends` [User.uid]
  - `pendingFriends` [User.uid]
  - `parent` User.uid
  - `privacy_levels` [PrivacyLevel.ftn]
  - PrivacyLevel.pln
- Category
  - Section.sid
  - User.uid
  - `pln` PrivacyLevel.pln
  - `showFields` index is PrivacyLevel.pln
    (denormalized for speed)
- VoteType
  - VoteType.vtn
  - PrivacyLevel.pln

#### No required entries
(only added for testing)

- Flag
  - User.uid
  - FlagType.ftn
- Post (see `initialTestPost`)
  - User.uid
  - Category.cid
  - FlagType.ftn
  - PrivacyLevel.pln
- Vote
  - User.uid
  - Post.pid
  - site (no table yet--may be foreign key in future versions)
  - VoteType.vtn

## Tailwind
Tailwind generates some of the css, so:

> Don’t change tailwind.output.css since your changes will be wiped out 
> the next time you start up the dev server or run a production build. 
> Instead, put changes in src/tailwind.css and restart the server/re-run 
> the build.

-<https://daveceddia.com/tailwind-create-react-app/>


## Using VSCode
- Open the server.code-workspace
- If you have changed the PORT setting (the React frontend web
  interface port as set in client/.env), open .vscode/launch.json and 
  change the port number in the URL. Also change the port number in the
  proxy URL in package.json.
- In the Run menu, choose "npm start" 


## WIP
### VSCode client workspace
- Open the "client" folder as the workspace folder
  (VSCode will then use the configuration in client/.vscode/).
### VSCode Chrome debugging.
- Press F5 (shortcut for Run, Chrome)
  - The first time:
    - It will need to install the Chrome plugin. It will show it, so push install by it.
    - Then press F5 again
    - You will have to click

- install npm "npm commands for VSCode" by Florian Knopp
  - find in VSCode: Ctrl+P, ext install npm


