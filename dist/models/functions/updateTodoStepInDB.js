"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var updateTodoStepInDB = function (conn, req) {
    var m = "\n    UPDATE todoStep \n    SET ? \n    WHERE id = ?;\n  ";
    var p = [{
            step: req.body.step,
            done: req.body.done
        }, Number(req.params.stepId)];
    return conn.send(m, p);
};
exports.default = updateTodoStepInDB;
