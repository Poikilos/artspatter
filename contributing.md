# ArtSpatter Development

This document explains how to maintain the code.

In MongoDB, collections operate similarly to tables.

Mongoose operates MongoDB similarly to a relational database.


## Running without building
- In a terminal, run `cd client && yarn start`
  - Run it as a service usually though. For a production environment,
    build the React app instead.


## Symbols
(Use the fontawesome react component aka `fortawesome/*`. See
<https://fontawesome.com/how-to-use/on-the-web/using-with/react>):

Common code necessary for each js or jsx file:
```JavaScript
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome
```

To only import the symbols you use into your final bundle (React
bundle), import them one at a time:
```JavaScript
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
```

Globally import:
(See <https://fontawesome.com/how-to-use/on-the-web/using-with/react>)

Adjustments
(See <https://fontawesome.com/how-to-use/on-the-web/using-with/react>)
- `size`: This property of `FontAwesomeIcon` determines the size
  relative to `font-size`: xs, sm, lg, 2x, 3x, 5x, 7x, 10x
  - <https://fontawesome.com/how-to-use/on-the-web/styling/sizing-icons>
  - Using the  `font-size` style property directly is also possible.

Effects
(See <https://fontawesome.com/how-to-use/on-the-web/using-with/react>)
- `rotation={90}` or 180, 270
- `transform={{ rotate: 42 }}` or any arbitrary angle
- `flip="vertical"` or horizontal or both
- `icon="spinner" spin` (or pulse)
- `border` (void attribute)
- `pull="left"` (or right)
- `mask={['far', 'circle']}`
- Layering:
```JSX
<span className="fa-layers fa-fw">
  <FontAwesomeIcon icon="square" color="green" />
  <FontAwesomeIcon icon="check" inverse transform="shrink-6" />
</span>
```
- Using SVG Symbols
```JSX
<FontAwesomeIcon icon="coffee" symbol />
<FontAwesomeIcon icon="coffee" symbol="beverage-icon" />
```
- Define a custom class (store an icon prefix and name for reuse)
  (See <https://fontawesome.com/how-to-use/on-the-web/using-with/react>)

### Imperative Code
```JavaScript
const element = <FontAwesomeIcon icon={faCoffee} />
ReactDOM.render(element, document.body)
```

### Installed packs
- [x] fontawesome-svg-core
- [x] free-solid-svg-icons (fas)
- [x] react-fontawesome
- [ ] free-brands-svg-icons (fab)
- [ ] free-regular-svg-icons (far)

### Pro-only
(code to avoid with the free version)

NOTE: solid, light, regular, and duotone are pro-only:
pro-solid-svg-icons, pro-regular-svg-icons, pro-light-svg-icons,

pro-duotone-svg-icons
```JSX
// Light:
<FontAwesomeIcon icon={["fal", "coffee"]} />
// Regular:
<FontAwesomeIcon icon={["far", "coffee"]} />
// Solid
<FontAwesomeIcon icon={["fas", "coffee"]} />
// ...or, omit as FontAwesome defaults to solid, so no need to prefix:
<FontAwesomeIcon icon="coffee" />
// Brand:
<FontAwesomeIcon icon={["fab", "github"]} />
```

import multiple styles of same icon:
```JSX
import { faCoffee as fasFaCoffee } from '@fortawesome/pro-solid-svg-icons'
import { faCoffee as farFaCoffee } from '@fortawesome/pro-regular-svg-icons'
```


## response codes
(See <https://moz.com/learn/seo/http-status-codes>)
- 1xx: Informational responses: "The server is thinking through the request"
- 2xx: completed successfully
  - Example: `res.status(200).send({successful: true, message: "Processing is complete!"});`
- 3xx: Redirection
- 4xx: Client errors (page not found)
- 5xx: could not complete request
  - Example: `res.status(500).send({successful: false, message: err.message});`


## Upload

### artspatter user-submitted data
- `uploads/postimages/` (unpublished) - selected via `multer` in `post.routes.js`
- `public/user/${uid}/` (published)
- `public/thumbs/user/${uid}/` (published thumbmnails)


### Upload part 1: React.js frontend
- App.jsx:
  - It shows a link to the upload form in the navbar.
  - It calls the Upload component (client/components/upload.component.js)
    which shows the form.
- The user fills in the form and presses submit.
- If the Upload component determines that the data is valid, the Upload
  component calls the UploadService (client/services/upload.service.js)
  - The Upload service uses axios to post the data to the `API_URL + "/api/upload"`
    (see Upload part 2).

### Upload part 2: Node.js backend
- The route recieves the data (routes/post.routes.js)
  - The route calls controller.uploadPost (controllers/post.controller.js)
    - uploadPost saves the data, or shows an error if it
      determines it is invalid.
      - Mongoose saves the data (or provides an error if uploadPost let
        data through that breaks database rules such as unique fields).


## Registration
- (client/src/components/register.component.js) form
  - posts to (auth.routes.js) /api/auth/signup
    - calls (middlewares/verifySignup.js) verifySignup.*
      (new ones must be added to the list in auth.routes.js
      - do not proceed if a check fails
    - calls (controllers/auth.controller) controller.signup
      - calls (models/user.model.js) mongoose User model
        - writes to mongodb

## Debugging
- React errors appear the **browser console**.
- Node errors appear as standard output.

### Acceptable warnings
- `The Components object is deprecated. It will soon be removed`
  This is due to Selenium IDE, not ArtSpatter. It appears on every
  website when you have Selenium IDE installed.


## Database
### IDs are text for cross-site support
IDs must be strings for cross-site synchronized data (for example,
uid should be unique and auto-incremented, but the user table may
contain users from other sites--therefore, the uid is the text form of
the mongoose-sequence id, and may contain "@" then a base URL of
another installation.

The id is used instead of usernames, since usernames may change, and
that would cause problems with friend requests. Another solution would
be a GUID, but id.toString()+atSiteStr is shorter.

### Collection dependencies
The software must initialize collections in this order
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
