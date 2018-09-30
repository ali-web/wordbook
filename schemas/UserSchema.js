var mongoose = require('mongoose');

module.exports = (() => {
    const UserSchema = {
        username: String,
        password: String,
        created_at: {type: Date, default: Date.now}
    };

    return UserSchema;
})();