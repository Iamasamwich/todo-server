"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var addUserModel_1 = __importDefault(require("../../models/addUserModel"));
var deleteUserFromDB_1 = __importDefault(require("../../models/functions/deleteUserFromDB"));
var getUserModel_1 = __importDefault(require("../../models/getUserModel"));
describe('getUserModel', function () {
    var req = { session: {}, body: {} };
    test('it 401s if the user is not logged in', function () {
        return (0, getUserModel_1.default)(req)
            .catch(function (err) {
            expect(err.status).toBe(401);
            expect(err.message).toBe('not authorised');
        });
    });
    test('create a test user', function () {
        req.body = { email: 'test getuser', name: 'test getuser', pword: 'test' };
        return (0, addUserModel_1.default)(req);
    });
    test('it gets the users details', function () {
        (0, getUserModel_1.default)(req)
            .then(function (resp) {
            expect(resp.status).toBe(200);
            expect(resp.message).toBe('user fetched');
            expect(resp.user.id).toBeTruthy();
            expect(resp.user.id).toBe(req.session.userId);
            expect(resp.user.email).toBe('test getuser');
            expect(resp.user.name).toBe('test getuser');
            expect(resp.user.pword).toBeTruthy();
            expect(resp.user.pword).not.toBe('test');
        });
    });
    test('clean up tests', function () {
        return (0, deleteUserFromDB_1.default)('test getuser');
    });
});
