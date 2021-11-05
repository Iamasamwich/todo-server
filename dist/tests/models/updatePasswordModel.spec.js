"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var addUserModel_1 = __importDefault(require("../../models/addUserModel"));
var deleteUserFromDB_1 = __importDefault(require("../../models/functions/deleteUserFromDB"));
var logInModel_1 = __importDefault(require("../../models/logInModel"));
var updatePasswordModel_1 = __importDefault(require("../../models/updatePasswordModel"));
describe('updatePasswordModel', function () {
    var req = {
        session: {},
        body: {},
    };
    test('it 401s if the user is not logged in', function () {
        return (0, updatePasswordModel_1.default)(req)
            .catch(function (err) {
            expect(err.status).toBe(401);
            expect(err.message).toBe('Not Authorised');
        });
    });
    test('it creates a test user', function () {
        req.body = {
            name: 'updatePasswordModel test',
            email: 'updatePasswordModel test',
            pword: 'test'
        };
        return (0, addUserModel_1.default)(req);
    });
    test('it 406s with no body', function () {
        delete req.body;
        return (0, updatePasswordModel_1.default)(req)
            .catch(function (err) {
            expect(err.status).toBe(406);
            expect(err.message).toBe('no body');
        });
    });
    test('it 406s with no pword', function () {
        req.body = {};
        return (0, updatePasswordModel_1.default)(req)
            .catch(function (err) {
            expect(err.status).toBe(406);
            expect(err.message).toBe('no password');
        });
    });
    test('it 406s with a non-string pword', function () {
        req.body.pword = 1;
        return (0, updatePasswordModel_1.default)(req)
            .catch(function (err) {
            expect(err.status).toBe(406);
            expect(err.message).toBe('invalid password');
        });
    });
    test('it 406s with no new password', function () {
        req.body.pword = 'updated';
        return (0, updatePasswordModel_1.default)(req)
            .catch(function (err) {
            expect(err.status).toBe(406);
            expect(err.message).toBe('no new password');
        });
    });
    test('it 406s with a non-string new pword', function () {
        req.body.newPword = 1;
        return (0, updatePasswordModel_1.default)(req)
            .catch(function (err) {
            expect(err.status).toBe(406);
            expect(err.message).toBe('invalid new password');
        });
    });
    test('it 401s if the pwords dont match', function () {
        req.body = {
            pword: 'wrong password',
            newPword: 'updated'
        };
        return (0, updatePasswordModel_1.default)(req)
            .catch(function (err) {
            expect(err.status).toBe(401);
            expect(err.message).toBe('Password Incorrect');
        });
    });
    test('you can update the pword', function () {
        req.body = {
            pword: 'test',
            newPword: 'updated'
        };
        return (0, updatePasswordModel_1.default)(req)
            .then(function (resp) {
            expect(resp.status).toBe(202);
            expect(resp.message).toBe('Password Updated');
        });
    });
    test('you can log in with the updated password', function () {
        delete req.session.loggedIn;
        delete req.session.userId;
        req.body = {
            email: 'updatePasswordModel test',
            pword: 'updated'
        };
        return (0, logInModel_1.default)(req)
            .then(function (resp) {
            expect(resp.status).toBe(200);
            expect(resp.message).toBe('logged in');
        });
    });
    test('clean up tests', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, deleteUserFromDB_1.default)('updatePasswordModel test')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
