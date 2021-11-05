"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logUserIn = function (req, userId) {
    req.session.userId = userId;
    req.session.loggedIn = true;
    return;
};
exports.default = logUserIn;
