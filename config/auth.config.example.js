module.exports = {
    secret: 'ThisIsN0Secret!',
    // ^ Don't actually use ThisIsN0Secret, because it is in the public repo.
    //   Make a new auth.config.js with your own unique secret, then
    //   don't change it!
    //   - Why unique: Authentication is done by the user's server,
    //     so their encrypted stuff shouldn't be accessible if cached
    //     on a federated server.
    //   - Why don't change it: If you change it, passwords and other
    //     fields are still encrypted using the old key, so they become
    //     inaccessible--and you won't know which fields used which key.
};
