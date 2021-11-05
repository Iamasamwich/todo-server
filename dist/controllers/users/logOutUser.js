"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var logOutModel_1 = __importDefault(require("../../models/logOutModel"));
var logOutUser = function (req, res) {
    return (0, logOutModel_1.default)(req)
        .then(function (resp) { return res.status(resp.status).json(resp); });
};
exports.default = logOutUser;
