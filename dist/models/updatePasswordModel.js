"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = __importDefault(require("./db"));
var checkUserIsLoggedIn_1 = __importDefault(require("./functions/checkUserIsLoggedIn"));
var compareHash_1 = __importDefault(require("./functions/compareHash"));
var getUserDetails_1 = __importDefault(require("./functions/getUserDetails"));
var makeHash_1 = __importDefault(require("./functions/makeHash"));
var updatePasswordInDB_1 = __importDefault(require("./functions/updatePasswordInDB"));
var updatePasswordModel = function (req) {
    var conn = new db_1.default();
    return (0, checkUserIsLoggedIn_1.default)(req)
        .then(function (resp) {
        if (!resp)
            throw ({ status: 401, message: 'Not Authorised' });
        return;
    })
        .then(function () {
        if (!req.body)
            throw ({ status: 406, message: 'no body' });
        if (!req.body.pword)
            throw ({ status: 406, message: 'no password' });
        if (typeof (req.body.pword) !== 'string')
            throw ({ status: 406, message: 'invalid password' });
        if (!req.body.newPword)
            throw ({ status: 406, message: 'no new password' });
        if (typeof (req.body.newPword) !== 'string')
            throw ({ status: 406, message: 'invalid new password' });
        return;
    })
        .then(function () { return (0, getUserDetails_1.default)(conn, req.session.userId); })
        .then(function (user) { return (0, compareHash_1.default)(user.pword, req.body.pword); })
        .then(function (pwordMatch) {
        if (pwordMatch === false)
            throw ({ status: 401, message: 'Password Incorrect' });
        return;
    })
        .then(function () { return (0, makeHash_1.default)(req.body.newPword); })
        .then(function (newPword) { return (0, updatePasswordInDB_1.default)(conn, newPword, req.session.userId); })
        .then(function () { return ({ status: 202, message: 'Password Updated' }); })
        .finally(function () {
        conn.end();
    });
};
exports.default = updatePasswordModel;
