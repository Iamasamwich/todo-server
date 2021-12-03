"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var resetTodoModel_1 = __importDefault(require("../../models/resetTodoModel"));
var resetTodo = function (req, res) {
    return (0, resetTodoModel_1.default)(req)
        .then(function (resp) {
        var td = resp.todo;
        var updatedTodo = {
            id: td.id,
            todo: td.todo,
            done: td.done,
            steps: td.steps,
            dueDate: td.dueDate
        };
        return {
            status: resp.status,
            message: resp.message,
            todo: updatedTodo
        };
    })
        .then(function (resp) { return res.status(resp.status).json(resp); })
        .catch(function (err) { return res.status(err.status).json(err); });
};
exports.default = resetTodo;
