"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = __importDefault(require("./db"));
var checkUserIsLoggedIn_1 = __importDefault(require("./functions/checkUserIsLoggedIn"));
var getTodoFromDB_1 = __importDefault(require("./functions/getTodoFromDB"));
var getTodoModel = function (req) {
    var conn = new db_1.default();
    return (0, checkUserIsLoggedIn_1.default)(req)
        .then(function (resp) {
        if (!resp)
            throw ({ status: 401, message: 'not authorised' });
        return;
    })
        .then(function () {
        if (!req.params.todoId)
            throw ({ status: 406, message: 'no todoId' });
        if (isNaN(Number(req.params.todoId)))
            throw ({ status: 406, message: 'invalid todoid' });
        return;
    })
        .then(function () { return (0, getTodoFromDB_1.default)(conn, req.params.todoId); })
        .then(function (todo) {
        if (todo.userId !== req.session.userId)
            throw ({ status: 401, message: 'not authorised' });
        return todo;
    })
        .then(function (todo) { return ({ status: 200, message: 'todo fetched', todo: todo }); })
        .finally(function () {
        conn.end();
    });
};
exports.default = getTodoModel;
