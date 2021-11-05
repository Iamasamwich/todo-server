"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var getTodoSteps_1 = __importDefault(require("./getTodoSteps"));
;
var getTodosFromDB = function (conn, userId) {
    var m = "SELECT * FROM todo WHERE userId = ?;";
    var p = userId;
    return conn.send(m, p)
        .then(function (todos) {
        return Promise.all(todos.map(function (todo) {
            return (0, getTodoSteps_1.default)(conn, todo);
        }));
    });
};
exports.default = getTodosFromDB;
