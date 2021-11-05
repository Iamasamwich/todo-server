"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var addTodoStepModel_1 = __importDefault(require("../../models/addTodoStepModel"));
var addStep = function (req, res) {
    return (0, addTodoStepModel_1.default)(req)
        .then(function (resp) { return res.status(resp.status).json(resp); })
        .catch(function (err) { return res.status(err.status).json(err); });
};
exports.default = addStep;
