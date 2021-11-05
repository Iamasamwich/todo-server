"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = __importDefault(require("./db"));
var checkUserIsLoggedIn_1 = __importDefault(require("./functions/checkUserIsLoggedIn"));
var getTodoFromDB_1 = __importDefault(require("./functions/getTodoFromDB"));
var getTodoStepFromDB_1 = __importDefault(require("./functions/getTodoStepFromDB"));
var updateTodoStepInDB_1 = __importDefault(require("./functions/updateTodoStepInDB"));
var updateTodoStepModel = function (req) {
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
        if (!req.params.stepId)
            throw ({ status: 406, message: 'no stepid' });
        if (isNaN(Number(req.params.stepId)))
            throw ({ status: 406, message: 'invalid stepid' });
        if (!req.body)
            throw ({ status: 406, message: 'no body' });
        if (!req.body.step)
            throw ({ status: 406, message: 'no step' });
        if (typeof (req.body.step) !== 'string')
            throw ({ status: 406, message: 'invalid step' });
        if (typeof (req.body.done) !== 'boolean')
            throw ({ status: 406, message: 'invalid done' });
        return;
    })
        .then(function () { return (0, getTodoFromDB_1.default)(conn, req.params.todoId); })
        .then(function (todo) {
        if (todo.userId !== req.session.userId)
            throw ({ status: 401, message: 'not authorised' });
        return;
    })
        .then(function () { return (0, getTodoStepFromDB_1.default)(conn, req.params.stepId); })
        .then(function () { return (0, updateTodoStepInDB_1.default)(conn, req); })
        .then(function () { return (0, getTodoStepFromDB_1.default)(conn, req.params.stepId); })
        .then(function (step) { return ({ status: 202, message: 'todo step updated', step: step }); })
        .finally(function () {
        conn.end();
    });
};
exports.default = updateTodoStepModel;
