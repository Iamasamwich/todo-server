"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var deleteStepFromDB = function (conn, stepId) {
    var m = "\n    DELETE FROM todoStep\n    WHERE id = ?;\n  ";
    var p = Number(stepId);
    return conn.send(m, p);
};
exports.default = deleteStepFromDB;
