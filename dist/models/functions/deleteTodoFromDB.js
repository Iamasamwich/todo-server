"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var deleteTodoFromDB = function (conn, todoId) {
    var m = "\n    DELETE FROM todo\n    WHERE id = ?;\n  ";
    var p = todoId;
    return conn.send(m, p);
};
exports.default = deleteTodoFromDB;
