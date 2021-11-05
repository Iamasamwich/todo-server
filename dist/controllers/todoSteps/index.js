"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var addStep_1 = __importDefault(require("./addStep"));
var updateStep_1 = __importDefault(require("./updateStep"));
var deleteStep_1 = __importDefault(require("./deleteStep"));
var todoSteps = {
    addStep: addStep_1.default,
    updateStep: updateStep_1.default,
    deleteStep: deleteStep_1.default
};
exports.default = todoSteps;
