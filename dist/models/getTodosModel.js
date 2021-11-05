"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = __importDefault(require("./db"));
var checkUserIsLoggedIn_1 = __importDefault(require("./functions/checkUserIsLoggedIn"));
var getTodosFromDB_1 = __importDefault(require("./functions/getTodosFromDB"));
var getTodosModel = function (req) {
    var conn = new db_1.default();
    return (0, checkUserIsLoggedIn_1.default)(req)
        .then(function (resp) {
        if (!resp)
            throw ({ status: 401, message: 'not authorised' });
        return;
    })
        .then(function () { return (0, getTodosFromDB_1.default)(conn, req.session.userId); })
        .then(function (todos) { return ({ status: 200, message: 'todos fetched', todos: todos }); })
        .finally(function () {
        conn.end();
    });
};
exports.default = getTodosModel;
