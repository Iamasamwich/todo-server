"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var convertDateFormat = function (date) {
    var splitDate = date.split('-');
    var twoDigits = function (str) {
        var num = Number(str);
        return num < 10 ? '0' + num : num.toString();
    };
    return [splitDate[0], twoDigits(splitDate[1]), twoDigits(splitDate[2])].join('-');
};
exports.default = convertDateFormat;
