"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = __importDefault(require("./db"));
var compareHash_1 = __importDefault(require("./functions/compareHash"));
var logUserIn_1 = __importDefault(require("./functions/logUserIn"));
var getUserByEmail_1 = __importDefault(require("./functions/getUserByEmail"));
var logInModel = function (req) {
    var conn = new db_1.default();
    var userId;
    return Promise.resolve()
        .then(function () {
        if (!req.body)
            throw ({ status: 406, message: 'no body' });
        if (!req.body.email)
            throw ({ status: 406, message: 'no email' });
        if (typeof (req.body.email) !== 'string')
            throw ({ status: 406, message: 'invalid email' });
        if (!req.body.pword)
            throw ({ status: 406, message: 'no password' });
        if (typeof (req.body.pword) !== 'string')
            throw ({ status: 406, message: 'invalid password' });
        return;
    })
        .then(function () { return (0, getUserByEmail_1.default)(conn, req.body.email); })
        .then(function (user) {
        userId = user.id;
        return (0, compareHash_1.default)(user.pword, req.body.pword);
    })
        .then(function (resp) {
        if (!resp) {
            throw ({ status: 401, message: 'not authorised' });
        }
        ;
        return (0, logUserIn_1.default)(req, userId);
    })
        .then(function () { return ({ status: 200, message: 'logged in' }); })
        .finally(function () {
        conn.end();
    });
};
exports.default = logInModel;
