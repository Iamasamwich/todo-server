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
var addTodoStepModel_1 = __importDefault(require("../../models/addTodoStepModel"));
var addUserModel_1 = __importDefault(require("../../models/addUserModel"));
var deleteUserFromDB_1 = __importDefault(require("../../models/functions/deleteUserFromDB"));
var getTodoModel_1 = __importDefault(require("../../models/getTodoModel"));
var getTodosModel_1 = __importDefault(require("../../models/getTodosModel"));
describe('getTodoModel', function () {
    var req = {
        session: {},
        params: {},
        body: {}
    };
    var req2 = {
        session: {},
        params: {},
        body: {}
    };
    var testTodos;
    test('it creates a user with todos', function () {
        req.body = {
            email: 'getTodoModel test',
            name: 'getTodoModel test',
            pword: 'test'
        };
        return (0, addUserModel_1.default)(req)
            .then(function () {
            req.body = {
                todo: 'getTodoModel test todo',
                done: false,
                dueDate: '2021-11-01'
            };
            return (0, addTodoModel_1.default)(req);
        })
            .then(function () { return (0, getTodosModel_1.default)(req); })
            .then(function (resp) {
            testTodos = resp.todos;
            req.params = {
                todoId: testTodos[0].id
            };
            req.body = {
                step: 'getTodoModel test step',
                done: false
            };
            return (0, addTodoStepModel_1.default)(req);
        });
    });
    test('it 406s if the todoId is not a "number"', function () {
        req.body = {};
        req.params = {
            todoId: 'hello'
        };
        return (0, getTodoModel_1.default)(req)
            .catch(function (err) {
            expect(err.status).toBe(406);
            expect(err.message).toBe('invalid todoid');
        });
    });
    test('it gets the todo', function () {
        req.params.todoId = testTodos[0].id;
        return (0, getTodoModel_1.default)(req)
            .then(function (resp) {
            expect(resp.status).toBe(200);
            expect(resp.message).toBe('todo fetched');
            expect(resp.todo.id).toBe(testTodos[0].id);
            expect(resp.todo.userId).toBe(req.session.userId);
            expect(resp.todo.done).toBeFalsy();
            expect(resp.todo.todo).toBe('getTodoModel test todo');
            expect(resp.todo.dueDate).toBe('2021-11-01');
            expect(resp.todo.steps.length).toBe(1);
            expect(resp.todo.steps[0].step).toBe('getTodoModel test step');
            expect(resp.todo.steps[0].done).toBeFalsy();
            expect(resp.todo.steps[0].todoId).toBe(testTodos[0].id);
        });
    });
    test('it 401s without user logged in', function () {
        return (0, getTodoModel_1.default)(req2)
            .catch(function (err) {
            expect(err.status).toBe(401);
            expect(err.message).toBe('not authorised');
        });
    });
    test('it 401s if the user doesnt match the userId of the todo', function () {
        req2.session.userId = 'hello';
        req2.session.loggedIn = true;
        req2.params.todoId = testTodos[0].id;
        return (0, getTodoModel_1.default)(req2)
            .catch(function (err) {
            expect(err.status).toBe(401);
            expect(err.message).toBe('not authorised');
        });
    });
    test('it 406s without a todoId in params', function () {
        req.params = {};
        return (0, getTodoModel_1.default)(req)
            .catch(function (err) {
            expect(err.status).toBe(406);
            expect(err.message).toBe('no todoId');
        });
    });
    test('clean up tests', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, deleteUserFromDB_1.default)('getTodoModel test')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
