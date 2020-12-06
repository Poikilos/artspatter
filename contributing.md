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


## Tailwind
Tailwind generates some of the css, so:

> Don’t change tailwind.output.css since your changes will be wiped out 
> the next time you start up the dev server or run a production build. 
> Instead, put changes in src/tailwind.css and restart the server/re-run 
> the build.

-<https://daveceddia.com/tailwind-create-react-app/>


## Using VSCode
- Open the server.code-workspace
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


