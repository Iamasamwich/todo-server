"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var convertDateFormat_1 = __importDefault(require("./convertDateFormat"));
var sanitiseString_1 = __importDefault(require("./sanitiseString"));
var addTodoToDB = function (conn, req) {
    var m = "INSERT INTO todo SET ?";
    var p = {
        todo: (0, sanitiseString_1.default)(req.body.todo),
        userId: req.session.userId,
        dueDate: (0, convertDateFormat_1.default)(req.body.dueDate),
        done: req.body.done
    };
    return conn.send(m, p);
};
exports.default = addTodoToDB;
