"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sanitiseString_1 = __importDefault(require("./sanitiseString"));
var addTodoStepToDB = function (conn, req) {
    var m = 'INSERT INTO todoStep SET ?;';
    var p = {
        todoId: Number(req.params.todoId),
        step: (0, sanitiseString_1.default)(req.body.step),
        done: req.body.done
    };
    return conn.send(m, p)
        .then(function (resp) { return resp.insertId; });
};
exports.default = addTodoStepToDB;
