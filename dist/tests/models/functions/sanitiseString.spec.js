"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sanitiseString_1 = __importDefault(require("../../../models/functions/sanitiseString"));
describe('sanitiseString', function () {
    test('it lets a normal message go through', function () {
        var test = (0, sanitiseString_1.default)('hello this is normal');
        expect(test).toBe('hello this is normal');
        return;
    });
    test('it removes characters other than a-z A-Z 0-9 space .,', function () {
        var test = (0, sanitiseString_1.default)('hello ./@#&*!(,');
        expect(test).toBe('hello .,');
        return;
    });
    test('it strips the preceding and trailing spaces if there is one', function () {
        var test = (0, sanitiseString_1.default)('   hello   ');
        expect(test).toBe('hello');
        var test2 = (0, sanitiseString_1.default)(' hello .    ');
        expect(test2).toBe('hello .');
    });
});
