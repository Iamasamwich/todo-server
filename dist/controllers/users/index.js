"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var addUser_1 = __importDefault(require("./addUser"));
var logInUser_1 = __importDefault(require("./logInUser"));
var logOutUser_1 = __importDefault(require("./logOutUser"));
var ping_1 = __importDefault(require("./ping"));
var updatePassword_1 = __importDefault(require("./updatePassword"));
var getUser_1 = __importDefault(require("./getUser"));
var updateUser_1 = __importDefault(require("./updateUser"));
var users = {
    addUser: addUser_1.default,
    logInUser: logInUser_1.default,
    logOutUser: logOutUser_1.default,
    ping: ping_1.default,
    updatePassword: updatePassword_1.default,
    getUser: getUser_1.default,
    updateUser: updateUser_1.default
};
exports.default = users;
