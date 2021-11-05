"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var updatePasswordInDB = function (conn, newPword, userId) {
    var m = "\n    UPDATE user\n    SET pword = ?\n    WHERE id = ?\n  ";
    var p = [newPword, userId];
    return conn.send(m, p);
};
exports.default = updatePasswordInDB;
