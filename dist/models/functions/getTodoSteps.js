"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
;
var getTodoSteps = function (conn, todo) {
    var m = 'SELECT * FROM todoStep WHERE todoId = ?;';
    var p = todo.id;
    return conn.send(m, p)
        .then(function (steps) {
        return __assign(__assign({}, todo), { steps: steps });
    });
};
exports.default = getTodoSteps;
