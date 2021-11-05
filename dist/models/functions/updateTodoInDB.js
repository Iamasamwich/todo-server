"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var convertDateFormat_1 = __importDefault(require("./convertDateFormat"));
var sanitiseString_1 = __importDefault(require("./sanitiseString"));
var updateTodoInDB = function (conn, todo, req) {
    var m = "\n    UPDATE todo\n    SET ?\n    WHERE id = ?;\n  ";
    var p = [
        {
            done: req.body.done,
            todo: (0, sanitiseString_1.default)(req.body.todo),
            dueDate: (0, convertDateFormat_1.default)(req.body.dueDate)
        },
        todo.id
    ];
    return conn.send(m, p);
};
exports.default = updateTodoInDB;
