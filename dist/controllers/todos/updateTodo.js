"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var updateTodoModel_1 = __importDefault(require("../../models/updateTodoModel"));
var updateTodo = function (req, res) {
    return (0, updateTodoModel_1.default)(req)
        .then(function (resp) {
        var td = resp.todo;
        var updatedTodoRes = {
            id: td.id,
            todo: td.todo,
            done: td.done,
            dueDate: td.dueDate,
            steps: td.steps
        };
        return { status: resp.status, message: resp.message, todo: updatedTodoRes };
    })
        .then(function (resp) { return res.status(resp.status).json(resp); })
        .catch(function (err) { return res.status(err.status).json(err); });
};
exports.default = updateTodo;
