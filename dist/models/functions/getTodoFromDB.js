"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var getTodoSteps_1 = __importDefault(require("./getTodoSteps"));
;
var getTodoFromDB = function (conn, todoId) {
    var m = "SELECT * FROM todo WHERE id = ?;";
    var p = Number(todoId);
    return conn.send(m, p)
        .then(function (resp) {
        if (resp.length === 0)
            throw ({ status: 404, message: 'todo not found' });
        return (0, getTodoSteps_1.default)(conn, resp[0]);
    });
};
exports.default = getTodoFromDB;
