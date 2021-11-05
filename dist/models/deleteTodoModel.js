"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = __importDefault(require("./db"));
var checkUserIsLoggedIn_1 = __importDefault(require("./functions/checkUserIsLoggedIn"));
var deleteTodoFromDB_1 = __importDefault(require("./functions/deleteTodoFromDB"));
var getTodoFromDB_1 = __importDefault(require("./functions/getTodoFromDB"));
var deleteTodoModel = function (req) {
    var conn = new db_1.default();
    return (0, checkUserIsLoggedIn_1.default)(req)
        .then(function () {
        if (!req.params)
            throw ({ status: 406, message: 'invalid params' });
        if (!req.params.todoId)
            throw ({ status: 406, message: 'no todoId' });
        if (isNaN(Number(req.params.todoId)))
            throw ({ status: 406, message: 'invalid todoId' });
        return;
    })
        .then(function () { return (0, getTodoFromDB_1.default)(conn, req.params.todoId); })
        .then(function (todo) {
        if (todo.userId !== req.session.userId)
            throw ({ status: 401, message: 'not authorised' });
        return todo.id;
    })
        .then(function (todoId) { return (0, deleteTodoFromDB_1.default)(conn, todoId); })
        .then(function () { return ({ status: 202, message: 'todo deleted' }); })
        .finally(function () {
        conn.end();
    });
};
exports.default = deleteTodoModel;
