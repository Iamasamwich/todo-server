"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = __importDefault(require("./db"));
var checkUserIsLoggedIn_1 = __importDefault(require("./functions/checkUserIsLoggedIn"));
var deleteStepFromDB_1 = __importDefault(require("./functions/deleteStepFromDB"));
var getTodoFromDB_1 = __importDefault(require("./functions/getTodoFromDB"));
var deleteStepModel = function (req) {
    var conn = new db_1.default();
    return (0, checkUserIsLoggedIn_1.default)(req)
        .then(function (resp) {
        if (!resp)
            throw ({ status: 401, message: 'not authorised' });
        return;
    })
        .then(function () {
        if (!req.params)
            throw ({ status: 406, message: 'invalid' });
        if (!req.params.todoId)
            throw ({ status: 406, message: 'invalid' });
        if (isNaN(Number(req.params.todoId)))
            throw ({ status: 406, message: 'invalid' });
        if (!req.params.stepId)
            throw ({ status: 406, message: 'invalid' });
        if (isNaN(Number(req.params.stepId)))
            throw ({ status: 406, message: 'invalid' });
        return;
    })
        .then(function () { return (0, getTodoFromDB_1.default)(conn, req.params.todoId); })
        .then(function (todo) {
        if (todo.userId !== req.session.userId)
            throw ({ status: 401, message: 'not authorised' });
        var step = todo.steps.filter(function (step) {
            return step.id === Number(req.params.stepId);
        });
        if (step.length === 0)
            throw ({ status: 404, message: 'step not found' });
        return;
    })
        .then(function () { return (0, deleteStepFromDB_1.default)(conn, req.params.stepId); })
        .then(function () { return ({ status: 202, message: 'step deleted' }); })
        .finally(function () {
        conn.end();
    });
};
exports.default = deleteStepModel;
