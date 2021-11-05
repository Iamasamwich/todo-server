"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var addUserToDB_1 = __importDefault(require("./functions/addUserToDB"));
var checkIfUserInDB_1 = __importDefault(require("./functions/checkIfUserInDB"));
var logUserIn_1 = __importDefault(require("./functions/logUserIn"));
var db_1 = __importDefault(require("./db"));
var addUserModel = function (req) {
    var conn = new db_1.default();
    return Promise.resolve()
        .then(function () {
        if (!req.body)
            throw ({ status: 406, message: 'no body' });
        if (!req.body.email)
            throw ({ status: 406, message: 'no email' });
        if (typeof (req.body.email) !== 'string')
            throw ({ status: 406, message: 'invalid email' });
        if (!req.body.name)
            throw ({ status: 406, message: 'no name' });
        if (typeof (req.body.name) !== 'string')
            throw ({ status: 406, message: 'invalid name' });
        if (!req.body.pword)
            throw ({ status: 406, message: 'no password' });
        if (typeof (req.body.pword) !== 'string')
            throw ({ status: 406, message: 'invalid password' });
        return;
    })
        .then(function () { return (0, checkIfUserInDB_1.default)(conn, req.body.email); })
        .then(function (resp) {
        if (resp) {
            throw ({ status: 409, message: 'user already exists' });
        }
        ;
        return;
    })
        .then(function () { return (0, addUserToDB_1.default)(conn, req); })
        .then(function (userId) { return (0, logUserIn_1.default)(req, userId); })
        .then(function () { return ({ status: 201, message: 'user created' }); })
        .finally(function () {
        conn.end();
    });
};
exports.default = addUserModel;
