"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var resetTodo = function (conn, todo) {
    var m = "\n    UPDATE todo\n    SET ?\n    WHERE id = ?;\n  ";
    var p = [
        {
            done: false
        },
        todo.id
    ];
    conn.send(m, p)
        .then(function () {
        Promise.all(todo.steps.map(function (step) {
            var m = "\n        UPDATE todoStep\n        SET done = false\n        WHERE id = ?\n      ";
            var p = step.id;
            return conn.send(m, p);
        }));
        return;
    });
};
exports.default = resetTodo;
