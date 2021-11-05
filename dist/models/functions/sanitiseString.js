"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sanitiseString = function (input) {
    var regex = new RegExp('[^a-zA-Z0-9 .,]', 'g');
    return input.replace(regex, '').trim();
};
exports.default = sanitiseString;
