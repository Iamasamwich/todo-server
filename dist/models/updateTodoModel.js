"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = __importDefault(require("./db"));
var checkUserIsLoggedIn_1 = __importDefault(require("./functions/checkUserIsLoggedIn"));
var updateTodoInDB_1 = __importDefault(require("./functions/updateTodoInDB"));
var getTodoFromDB_1 = __importDefault(require("./functions/getTodoFromDB"));
var getUserDetails_1 = __importDefault(require("./functions/getUserDetails"));
var updateTodoModel = function (req) {
    var conn = new db_1.default();
    return (0, checkUserIsLoggedIn_1.default)(req)
        .then(function (resp) {
        if (!resp)
            throw ({ status: 401, message: 'not authorised' });
        return;
    })
        .then(function () {
        if (!req.params)
            throw ({ status: 406, message: 'no params' });
        if (!req.params.todoId)
            throw ({ status: 406, message: 'no todoid' });
        if (isNaN(Number(req.params.todoId)))
            throw ({ status: 406, message: 'invalid todoid' });
        if (!req.body)
            throw ({ status: 406, message: 'no body' });
        if (!req.body.todo)
            throw ({ status: 406, message: 'no todo' });
        if (!req.body.dueDate)
            throw ({ status: 406, message: 'no dueDate' });
        if (typeof (req.body.done) !== 'boolean')
            throw ({ status: 406, message: 'invalid done' });
        if (typeof (req.body.todo) !== 'string')
            throw ({ status: 406, message: 'invalid todo' });
        if (!req.body.dueDate.match(/^\d{4}-\d{1,2}-\d{1,2}$/))
            throw ({ status: 406, message: 'invalid duedate' });
        return;
    })
        .then(function () { return (0, getUserDetails_1.default)(conn, req.session.userId); })
        .then(function () { return (0, getTodoFromDB_1.default)(conn, req.params.todoId); })
        .then(function (todo) {
        if (todo.userId !== req.session.userId)
            throw ({ status: 401, message: 'not authorised' });
        return todo;
    })
        .then(function (todo) { return (0, updateTodoInDB_1.default)(conn, todo, req); })
        .then(function () { return (0, getTodoFromDB_1.default)(conn, req.params.todoId); })
        .then(function (todo) { return ({ status: 202, message: 'todo updated', todo: todo }); })
        .finally(function () {
        conn.end();
    });
};
exports.default = updateTodoModel;
