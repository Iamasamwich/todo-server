"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var logInModel_1 = __importDefault(require("../../models/logInModel"));
var loginUser = function (req, res) {
    return (0, logInModel_1.default)(req)
        .then(function (resp) {
        return res.status(200).json(resp);
    })
        .catch(function (err) { return res.status(err.status).json(err); });
};
exports.default = loginUser;
