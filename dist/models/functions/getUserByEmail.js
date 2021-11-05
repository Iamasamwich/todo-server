"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getUserDetailsByEmail = function (conn, email) {
    var m = 'SELECT * FROM user WHERE email = ?;';
    var p = email;
    return conn.send(m, p)
        .then(function (resp) {
        if (resp.length === 0)
            throw ({ status: 404, message: 'user not found' });
        return resp[0];
    });
};
exports.default = getUserDetailsByEmail;
