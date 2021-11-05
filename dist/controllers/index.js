"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var users_1 = __importDefault(require("./users"));
var todos_1 = __importDefault(require("./todos"));
var todoSteps_1 = __importDefault(require("./todoSteps"));
exports.default = {
    users: users_1.default,
    todos: todos_1.default,
    todoSteps: todoSteps_1.default
};
