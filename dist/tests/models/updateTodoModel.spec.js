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
var getTodosModel_1 = __importDefault(require("../../models/getTodosModel"));
var updateTodoModel_1 = __importDefault(require("../../models/updateTodoModel"));
describe('updateTodoModel', function () {
    var testTodos;
    var testTodos2;
    var req = {
        session: {},
        body: {},
        params: {}
    };
    var req2 = {
        session: {},
        body: {},
        params: {}
    };
    var req3 = {};
    test('it creates a test user with todos', function () {
        req.body = {
            email: 'update todo test',
            name: 'update todo test',
            pword: 'test'
        };
        return (0, addUserModel_1.default)(req)
            .then(function () {
            req.body = {
                todo: 'update todo test',
                dueDate: '2021-10-21',
                done: false
            };
            return (0, addTodoModel_1.default)(req);
        })
            .then(function () { return (0, getTodosModel_1.default)(req); })
            .then(function (resp) {
            testTodos = resp.todos;
            return;
        });
    });
    test('it creates a second user with todos', function () {
        req2.body = {
            email: 'update todo test 2',
            name: 'update todo test 2',
            pword: 'test'
        };
        return (0, addUserModel_1.default)(req2)
            .then(function () {
            req2.body = {
                todo: 'update todo test 2',
                dueDate: '2021-1-21',
                done: false
            };
            return (0, addTodoModel_1.default)(req2);
        })
            .then(function () { return (0, getTodosModel_1.default)(req2); })
            .then(function (resp) {
            testTodos2 = resp.todos;
            return;
        });
    });
    test('it 406s with no params', function () {
        var req4 = {
            session: req.session
        };
        return (0, updateTodoModel_1.default)(req4)
            .catch(function (err) {
            expect(err.status).toBe(406);
            expect(err.message).toBe('no params');
        });
    });
    test('it 401s with no session', function () {
        return (0, updateTodoModel_1.default)(req3)
            .catch(function (err) {
            expect(err.status).toBe(401);
            expect(err.message).toBe('not authorised');
        });
    });
    test('it 406s with no todoId in params', function () {
        return (0, updateTodoModel_1.default)(req)
            .catch(function (err) {
            expect(err.status).toBe(406);
            expect(err.message).toBe('no todoid');
        });
    });
    test('it 406s without a number as the todoId in params', function () {
        req.params.todoId = 'hello';
        return (0, updateTodoModel_1.default)(req)
            .catch(function (err) {
            expect(err.status).toBe(406);
            expect(err.message).toBe('invalid todoid');
        });
    });
    test('it 406s with no body', function () {
        req.params.todoId = String(testTodos[0].id);
        delete req.body;
        return (0, updateTodoModel_1.default)(req)
            .catch(function (err) {
            expect(err.status).toBe(406);
            expect(err.message).toBe('no body');
        });
    });
    test('it 406s with no todo', function () {
        req.body = {};
        return (0, updateTodoModel_1.default)(req)
            .catch(function (err) {
            expect(err.status).toBe(406);
            expect(err.message).toBe('no todo');
        });
    });
    test('it 406s with no dueDate', function () {
        req.body.todo = 'updated test todo';
        return (0, updateTodoModel_1.default)(req)
            .catch(function (err) {
            expect(err.status).toBe(406);
            expect(err.message).toBe('no dueDate');
        });
    });
    test('it 406s with no done', function () {
        req.body.dueDate = '2021-12-02';
        return (0, updateTodoModel_1.default)(req)
            .catch(function (err) {
            expect(err.status).toBe(406);
            expect(err.message).toBe('invalid done');
        });
    });
    test('it 406s with wrong todo type', function () {
        req.body.done = true;
        req.body.todo = 1;
        return (0, updateTodoModel_1.default)(req)
            .catch(function (err) {
            expect(err.status).toBe(406);
            expect(err.message).toBe('invalid todo');
        });
    });
    test('it 406s with invalid dueDate', function () {
        req.body.todo = 'updated test todo';
        req.body.dueDate = 'hello';
        return (0, updateTodoModel_1.default)(req)
            .catch(function (err) {
            expect(err.status).toBe(406);
            expect(err.message).toBe('invalid duedate');
        });
    });
    test('it 404s if the todo doesnt exist', function () {
        req.params.todoId = '1';
        req.body = {
            todo: 'test todo update',
            done: false,
            dueDate: '2021-10-21'
        };
        return (0, updateTodoModel_1.default)(req)
            .catch(function (err) {
            expect(err.status).toBe(404);
            expect(err.message).toBe('todo not found');
        });
    });
    test('it 401s if the todo doesnt belong to the user', function () {
        req.params.todoId = String(testTodos2[0].id);
        req.body = {
            todo: 'test update should fail',
            dueDate: '2022-11-11',
            done: false
        };
        return (0, updateTodoModel_1.default)(req)
            .catch(function (err) {
            expect(err.status).toBe(401);
            expect(err.message).toBe('not authorised');
        });
    });
    test('it updates a todo', function () {
        req.params.todoId = String(testTodos[0].id);
        req.body = {
            todo: 'test user 1 todo 1 updated',
            done: true,
            dueDate: '3000-01-1'
        };
        return (0, updateTodoModel_1.default)(req)
            .then(function (resp) {
            expect(resp.status).toBe(202);
            expect(resp.message).toBe('todo updated');
            expect(resp.todo).toBeTruthy();
            expect(resp.todo.userId).toBeTruthy();
            expect(resp.todo.todo).toBe('test user 1 todo 1 updated');
            expect(resp.todo.dueDate).toBe('3000-01-01');
            expect(resp.todo.done).toBeTruthy();
            expect(resp.todo.id).toBe(testTodos[0].id);
            expect(resp.todo.steps).toStrictEqual([]);
        });
    });
    test('it sanitises the todo', function () {
        req.body = {
            todo: '     test updated todo 123<>?,.   /)(*&^  ',
            done: false,
            dueDate: '2021-11-01'
        };
        return (0, updateTodoModel_1.default)(req)
            .then(function (resp) {
            expect(resp.todo.todo).toBe('test updated todo 123,.');
        });
    });
    test('clean up test', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, deleteUserFromDB_1.default)('update todo test')];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (0, deleteUserFromDB_1.default)('update todo test 2')];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
