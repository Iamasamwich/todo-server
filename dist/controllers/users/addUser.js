"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var addUserModel_1 = __importDefault(require("../../models/addUserModel"));
var addUser = function (req, res) {
    return (0, addUserModel_1.default)(req)
        .then(function (resp) { return res.status(resp.status).json(resp); })
        .catch(function (err) { return res.status(err.status).json(err); });
};
exports.default = addUser;
