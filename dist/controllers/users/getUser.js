"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var getUserModel_1 = __importDefault(require("../../models/getUserModel"));
var getUser = function (req, res) {
    return (0, getUserModel_1.default)(req)
        .then(function (resp) {
        return {
            status: resp.status,
            message: resp.message,
            user: {
                email: resp.user.email,
                name: resp.user.name
            }
        };
    })
        .then(function (resp) { return res.status(resp.status).json(resp); })
        .catch(function (err) { return res.status(err.status).json(err); });
};
exports.default = getUser;
