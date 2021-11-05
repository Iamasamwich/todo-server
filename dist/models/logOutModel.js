"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logOutModel = function (req) {
    delete req.session.userId;
    req.session.loggedIn = false;
    return Promise.resolve({ status: 200, message: 'logged out' });
};
exports.default = logOutModel;
