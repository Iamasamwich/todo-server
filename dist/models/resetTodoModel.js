"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = __importDefault(require("./db"));
var checkUserIsLoggedIn_1 = __importDefault(require("./functions/checkUserIsLoggedIn"));
var getTodoFromDB_1 = __importDefault(require("./functions/getTodoFromDB"));
var getUserDetails_1 = __importDefault(require("./functions/getUserDetails"));
var resetTodo_1 = __importDefault(require("./functions/resetTodo"));
var resetTodoModel = function (req) {
    var conn = new db_1.default();
    return (0, checkUserIsLoggedIn_1.default)(req)
        .then(function (resp) {
        if (!resp)
            throw ({ status: 401, message: 'Not Authorised' });
        return;
    })
        .then(function () {
        if (!req.params)
            throw ({ status: 406, message: 'no params' });
        if (!req.params.todoId)
            throw ({ status: 406, message: 'no todo id' });
        if (isNaN(Number(req.params.todoId)))
            throw ({ status: 406, message: 'invalid todo id' });
        return;
    })
        .then(function () { return (0, getUserDetails_1.default)(conn, req.session.userId); })
        .then(function () { return (0, getTodoFromDB_1.default)(conn, req.params.todoId); })
        .then(function (todo) {
        if (todo.userId !== req.session.userId)
            throw ({ status: 401, message: 'not authorised' });
        return todo;
    })
        .then(function (todo) { return (0, resetTodo_1.default)(conn, todo); })
        .then(function () { return (0, getTodoFromDB_1.default)(conn, req.params.todoId); })
        .then(function (todo) { return ({ status: 202, message: 'todo reset', todo: todo }); })
        .finally(function () {
        conn.end();
    });
};
exports.default = resetTodoModel;
