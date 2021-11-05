"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getTodoStepFromDB = function (conn, stepId) {
    var m = 'SELECT * FROM todoStep WHERE id = ?;';
    var p = Number(stepId);
    return conn.send(m, p)
        .then(function (resp) {
        if (resp.length === 0)
            throw ({ status: 404, message: 'step not found' });
        return resp[0];
    });
};
exports.default = getTodoStepFromDB;
