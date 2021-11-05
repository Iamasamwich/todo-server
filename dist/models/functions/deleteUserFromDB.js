"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = __importDefault(require("../db"));
var deleteUserFromDB = function (email) {
    var conn = new db_1.default();
    var m = "DELETE FROM user WHERE email = ?";
    var p = email;
    return conn.send(m, p)
        .then(function () { return ({ status: 202, message: 'user deleted' }); })
        .finally(function () {
        conn.end();
    });
};
exports.default = deleteUserFromDB;
