"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var checkUserIsLoggedIn = function (req) {
    if (!req.session)
        return Promise.resolve(false);
    if (!req.session.loggedIn || !req.session.userId)
        return Promise.resolve(false);
    return Promise.resolve(true);
};
exports.default = checkUserIsLoggedIn;
