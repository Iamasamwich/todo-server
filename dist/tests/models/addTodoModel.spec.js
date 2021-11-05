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
var addTodoModel_1 = __importDefault(require("../../models/addTodoModel"));
var addUserModel_1 = __importDefault(require("../../models/addUserModel"));
var deleteUserFromDB_1 = __importDefault(require("../../models/functions/deleteUserFromDB"));
describe('addTodoModel', function () {
    var req = {
        body: {},
        session: {}
    };
    test('it 401s without a session', function () {
        return (0, addTodoModel_1.default)(req)
            .catch(function (err) {
            expect(err.status).toBe(401);
            expect(err.message).toBe('not authorised');
        });
    });
    test('it 401s without a userId in session', function () {
        req.session.loggedIn = true;
        return (0, addTodoModel_1.default)(req)
            .catch(function (err) {
            expect(err.status).toBe(401);
            expect(err.message).toBe('not authorised');
        });
    });
    test('it 401s without loggedIn true in session', function () {
        req.session.userId = 'test id';
        delete req.session.loggedIn;
        return (0, addTodoModel_1.default)(req)
            .catch(function (err) {
            expect(err.status).toBe(401);
            expect(err.message).toBe('not authorised');
        });
    });
    test('it 404s if the user doesnt exist', function () {
        req.session.loggedIn = true;
        return (0, addTodoModel_1.default)(req)
            .catch(function (err) {
            expect(err.status).toBe(404);
            expect(err.message).toBe('user not found');
        });
    });
    test('add user for testing', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    delete req.session.loggedIn;
                    delete req.session.userId;
                    req.body = {
                        email: 'add user test email',
                        name: 'test name',
                        pword: 'test pword'
                    };
                    return [4 /*yield*/, (0, addUserModel_1.default)(req)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); });
    test('it 406s without a body', function () {
        delete req.body;
        return (0, addTodoModel_1.default)(req)
            .catch(function (err) {
            expect(err.status).toBe(406);
            expect(err.message).toBe('invalid body');
        });
    });
    test('it 406s without a todo in body', function () {
        req.body = {};
        return (0, addTodoModel_1.default)(req)
            .catch(function (err) {
            expect(err.status).toBe(406);
            expect(err.message).toBe('no todo');
        });
    });
    test('it 406s if the todo isnt a string', function () {
        req.body = {
            todo: 1,
            dueDate: '2021-10-11',
            done: false
        };
        return (0, addTodoModel_1.default)(req)
            .catch(function (err) {
            expect(err.status).toBe(406);
            expect(err.message).toBe('invalid todo');
        });
    });
    test('it 406s if there is no due date', function () {
        req.body.todo = 'test todo';
        delete req.body.dueDate;
        return (0, addTodoModel_1.default)(req)
            .catch(function (err) {
            expect(err.status).toBe(406);
            expect(err.message).toBe('no dueDate');
        });
    });
    test('it 406s if the date is the wrong format', function () {
        req.body.dueDate = 'wrong format';
        return (0, addTodoModel_1.default)(req)
            .catch(function (err) {
            expect(err.status).toBe(406);
            expect(err.message).toBe('invalid date');
        });
    });
    test('it 406s if there isnt done in the body', function () {
        req.body.dueDate = '2021-10-11';
        delete req.body.done;
        return (0, addTodoModel_1.default)(req)
            .catch(function (err) {
            expect(err.status).toBe(406);
            expect(err.message).toBe('invalid done');
        });
    });
    test('it adds a todo', function () {
        req.body.done = false;
        return (0, addTodoModel_1.default)(req)
            .then(function (resp) {
            expect(resp.status).toBe(201);
            expect(resp.message).toBe('todo added');
            expect(resp.todo.todo).toBe('test todo');
            expect(resp.todo.done).toBeFalsy();
            expect(resp.todo.dueDate).toBe('2021-10-11');
            expect(resp.todo.steps).toStrictEqual([]);
            expect(resp.todo.id).toBeTruthy();
        });
    });
    test('it strips the non a-zA-Z0-9 ., characters out and extra spaces', function () {
        req.body = {
            todo: '   test todo 2 @#$%^&,. ',
            dueDate: '2021-11-11',
            done: false
        };
        return (0, addTodoModel_1.default)(req)
            .then(function (resp) {
            expect(resp.todo.id).toBeTruthy();
            expect(resp.todo.todo).toBe('test todo 2 ,.');
            expect(resp.todo.dueDate).toBe('2021-11-11');
            expect(resp.todo.done).toBe(0);
            expect(resp.todo.steps).toStrictEqual([]);
        });
    });
    test('clean up test user', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, deleteUserFromDB_1.default)('add user test email')];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); });
});
