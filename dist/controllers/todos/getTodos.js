"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var getTodosModel_1 = __importDefault(require("../../models/getTodosModel"));
var getTodos = function (req, res) {
    return (0, getTodosModel_1.default)(req)
        .then(function (resp) {
        var todosNoUser = resp.todos.map(function (todo) {
            return {
                id: todo.id,
                todo: todo.todo,
                dueDate: todo.dueDate,
                done: todo.done,
                steps: todo.steps
            };
        });
        return { status: resp.status, message: resp.message, todos: todosNoUser };
    })
        .then(function (resp) { return res.status(resp.status).json(resp); })
        .catch(function (err) { return res.status(err.status).json(err); });
};
exports.default = getTodos;
