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
var deleteTodoModel_1 = __importDefault(require("../../models/deleteTodoModel"));
var deleteUserFromDB_1 = __importDefault(require("../../models/functions/deleteUserFromDB"));
var getTodosModel_1 = __importDefault(require("../../models/getTodosModel"));
describe('deleteTodoModel', function () {
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
    var testTodos = [];
    test('create a user with todos', function () {
        req.body = { name: 'deleteTodoModel test', email: 'deleteTodoModel test', pword: 'test' };
        return (0, addUserModel_1.default)(req)
            .then(function () {
            req.body = { todo: 'deleteTodoModel test', dueDate: '2021-12-01', done: false };
            return (0, addTodoModel_1.default)(req);
        })
            .then(function (resp) {
            testTodos.push(resp.todo);
        });
    });
    test('it 406s with no params', function () {
        var req3 = {
            session: req.session
        };
        return (0, deleteTodoModel_1.default)(req3)
            .catch(function (err) {
            expect(err.status).toBe(406);
            expect(err.message).toBe('invalid params');
        });
    });
    test('it 406s with no todoId', function () {
        req.params = {};
        return (0, deleteTodoModel_1.default)(req)
            .catch(function (err) {
            expect(err.status).toBe(406);
            expect(err.message).toBe('no todoId');
        });
    });
    test('it 401s if the wrong user tries to delete a todo', function () {
        req2.body = { name: 'deleteTodoModel test 2', email: 'deleteTodoModel test 2', pword: 'test' };
        return (0, addUserModel_1.default)(req2)
            .then(function () {
            req2.params.todoId = String(testTodos[0].id);
            return (0, deleteTodoModel_1.default)(req2);
        })
            .catch(function (err) {
            expect(err.status).toBe(401);
            expect(err.message).toBe('not authorised');
        });
    });
    test('it deletes the todo', function () {
        req.body = {};
        req.params = {
            todoId: String(testTodos[0].id)
        };
        return (0, deleteTodoModel_1.default)(req)
            .then(function (resp) {
            expect(resp.status).toBe(202);
            expect(resp.message).toBe('todo deleted');
            return;
        })
            .then(function () { return (0, getTodosModel_1.default)(req); })
            .then(function (resp) {
            expect(resp.todos.length).toBe(0);
        });
    });
    test('it wont delete a nonexistant todo', function () {
        return (0, deleteTodoModel_1.default)(req)
            .catch(function (err) {
            expect(err.status).toBe(404);
            expect(err.message).toBe('todo not found');
        });
    });
    test('it 406s without a "number" as todoId in params', function () {
        req.params.todoId = 'hello';
        return (0, deleteTodoModel_1.default)(req)
            .catch(function (err) {
            expect(err.status).toBe(406);
            expect(err.message).toBe('invalid todoId');
        });
    });
    test('clean up tests', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, deleteUserFromDB_1.default)('deleteTodoModel test')];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (0, deleteUserFromDB_1.default)('deleteTodoModel test 2')];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
