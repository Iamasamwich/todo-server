"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var logOutModel_1 = __importDefault(require("../../models/logOutModel"));
describe('logOutModel', function () {
    test('it logs the user out', function () {
        var req = {
            session: {
                userId: 'test user id',
                loggedIn: true
            }
        };
        return (0, logOutModel_1.default)(req)
            .then(function () {
            expect(req.session.loggedIn).toBe(false);
            expect(req.session.userId).toBeUndefined();
        });
    });
});
