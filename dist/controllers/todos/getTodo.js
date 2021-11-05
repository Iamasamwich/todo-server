"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var getTodoModel_1 = __importDefault(require("../../models/getTodoModel"));
var getTodo = function (req, res) {
    return (0, getTodoModel_1.default)(req)
        .then(function (resp) {
        var todoNoUser = {
            id: resp.todo.id,
            todo: resp.todo.todo,
            done: resp.todo.done,
            dueDate: resp.todo.dueDate,
            steps: resp.todo.steps
        };
        return { status: resp.status, message: resp.message, todo: todoNoUser };
    })
        .then(function (resp) { return res.status(resp.status).json(resp); })
        .catch(function (err) { return res.status(err.status).json(err); });
};
exports.default = getTodo;
