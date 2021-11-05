"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = __importDefault(require("./db"));
var checkUserIsLoggedIn_1 = __importDefault(require("./functions/checkUserIsLoggedIn"));
var addTodoToDB_1 = __importDefault(require("./functions/addTodoToDB"));
var getUserDetails_1 = __importDefault(require("./functions/getUserDetails"));
var getTodoFromDB_1 = __importDefault(require("./functions/getTodoFromDB"));
var getTodoSteps_1 = __importDefault(require("./functions/getTodoSteps"));
;
;
var addTodoModel = function (req) {
    var conn = new db_1.default();
    return (0, checkUserIsLoggedIn_1.default)(req)
        .then(function (resp) {
        if (!resp)
            throw ({ status: 401, message: 'not authorised' });
        return (0, getUserDetails_1.default)(conn, req.session.userId);
    })
        .then(function () {
        if (!req.body)
            throw ({ status: 406, message: 'invalid body' });
        if (!req.body.todo)
            throw ({ status: 406, message: 'no todo' });
        if (!req.body.dueDate)
            throw ({ status: 406, message: 'no dueDate' });
        if (typeof (req.body.done) !== 'boolean')
            throw ({ status: 406, message: 'invalid done' });
        if (typeof (req.body.todo) !== 'string')
            throw ({ status: 406, message: 'invalid todo' });
        if (!req.body.dueDate.match(/^\d{4}-\d{1,2}-\d{1,2}$/))
            throw ({ status: 406, message: 'invalid date' });
        return;
    })
        .then(function () { return (0, addTodoToDB_1.default)(conn, req); })
        .then(function (resp) { return (0, getTodoFromDB_1.default)(conn, String(resp.insertId)); })
        .then(function (todo) { return (0, getTodoSteps_1.default)(conn, todo); })
        .then(function (todo) { return ({ status: 201, message: 'todo added', todo: todo }); })
        .finally(function () {
        conn.end();
    });
};
exports.default = addTodoModel;
