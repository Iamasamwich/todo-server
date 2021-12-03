"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controllers_1 = __importDefault(require("../controllers"));
var routes = (0, express_1.Router)();
routes.get('/ping', controllers_1.default.users.ping);
routes.post('/user', controllers_1.default.users.addUser);
routes.put('/user/password', controllers_1.default.users.updatePassword);
routes.get('/user', controllers_1.default.users.getUser);
routes.put('/user', controllers_1.default.users.updateUser);
routes.post('/login', controllers_1.default.users.logInUser);
routes.put('/login', controllers_1.default.users.logOutUser);
routes.get('/todo', controllers_1.default.todos.getTodos);
routes.get('/todo/:todoId', controllers_1.default.todos.getTodo);
routes.post('/todo', controllers_1.default.todos.addTodo);
routes.put('/todo/:todoId', controllers_1.default.todos.updateTodo);
routes.put('/todo/:todoId/reset', controllers_1.default.todos.resetTodo);
routes.delete('/todo/:todoId', controllers_1.default.todos.deleteTodo);
routes.post('/todo/:todoId/step', controllers_1.default.todoSteps.addStep);
routes.put('/todo/:todoId/step/:stepId', controllers_1.default.todoSteps.updateStep);
routes.delete('/todo/:todoId/step/:stepId', controllers_1.default.todoSteps.deleteStep);
routes.all('*', function (req, res) {
    res.status(404).json({ status: 404, message: '404' });
});
exports.default = routes;
