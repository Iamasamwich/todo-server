"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ping = function (req, res) {
    if (req.session &&
        req.session.userId &&
        req.session.loggedIn)
        return res.status(200).json({ status: 200, message: 'ok' });
    return res.status(200).json({ status: 200, message: 'unknown' });
};
exports.default = ping;
