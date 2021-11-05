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
var logInModel_1 = __importDefault(require("../../models/logInModel"));
var deleteUserFromDB_1 = __importDefault(require("../../models/functions/deleteUserFromDB"));
describe('logInModel', function () {
    var req = { body: {}, session: {} };
    test('create a test account', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    req.body = {
                        email: 'test email', name: 'test name', pword: 'test pword'
                    };
                    return [4 /*yield*/, (0, addUserModel_1.default)(req)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); });
    test('it 406s with an invalid body', function () {
        delete req.session.userId;
        delete req.session.loggedIn;
        delete req.body;
        return (0, logInModel_1.default)(req)
            .catch(function (err) {
            expect(err.status).toBe(406);
            expect(err.message).toBe('no body');
        });
    });
    test('it 406s with no email', function () {
        req.body = {};
        return (0, logInModel_1.default)(req)
            .catch(function (err) {
            expect(err.status).toBe(406);
            expect(err.message).toBe('no email');
        });
    });
    test('it 406s with email not a string', function () {
        req.body.email = 1;
        return (0, logInModel_1.default)(req)
            .catch(function (err) {
            expect(err.status).toBe(406);
            expect(err.message).toBe('invalid email');
        });
    });
    test('it 406s with no password', function () {
        req.body.email = 'loginModel test';
        return (0, logInModel_1.default)(req)
            .catch(function (err) {
            expect(err.status).toBe(406);
            expect(err.message).toBe('no password');
        });
    });
    test('it 406s without a string pword', function () {
        req.body.pword = 1;
        return (0, logInModel_1.default)(req)
            .catch(function (err) {
            expect(err.status).toBe(406);
            expect(err.message).toBe('invalid password');
        });
    });
    test('it 404s with an non-existant email', function () {
        req.body = {
            email: 'incorrect email',
            pword: 'pword'
        };
        return (0, logInModel_1.default)(req)
            .catch(function (err) {
            expect(err.status).toBe(404);
            expect(err.message).toBe('user not found');
        });
    });
    test('it 401s with an incorrect password', function () {
        req.body = {
            email: 'test email',
            pword: 'incorrect pword'
        };
        return (0, logInModel_1.default)(req)
            .catch(function (err) {
            expect(err.status).toBe(401);
            expect(err.message).toBe('not authorised');
        });
    });
    test('lets you log in', function () {
        req.body = {
            email: 'test email',
            pword: 'test pword'
        };
        return (0, logInModel_1.default)(req)
            .then(function (resp) {
            expect(resp.status).toBe(200);
            expect(resp.message).toBe('logged in');
            expect(req.session.userId).toBeTruthy();
            expect(req.session.loggedIn).toBe(true);
        });
    });
    test('clean up the tests', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, deleteUserFromDB_1.default)('test email')];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); });
});
