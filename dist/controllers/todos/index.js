"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var addTodo_1 = __importDefault(require("./addTodo"));
var getTodo_1 = __importDefault(require("./getTodo"));
var getTodos_1 = __importDefault(require("./getTodos"));
var updateTodo_1 = __importDefault(require("./updateTodo"));
var deleteTodo_1 = __importDefault(require("./deleteTodo"));
var resetTodo_1 = __importDefault(require("./resetTodo"));
var todos = {
    addTodo: addTodo_1.default,
    getTodo: getTodo_1.default,
    getTodos: getTodos_1.default,
    updateTodo: updateTodo_1.default,
    deleteTodo: deleteTodo_1.default,
    resetTodo: resetTodo_1.default
};
exports.default = todos;
