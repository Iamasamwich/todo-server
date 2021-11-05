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
var deleteStepModel_1 = __importDefault(require("../../models/deleteStepModel"));
var deleteUserFromDB_1 = __importDefault(require("../../models/functions/deleteUserFromDB"));
var getTodosModel_1 = __importDefault(require("../../models/getTodosModel"));
describe('deleteStepModel', function () {
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
    var testTodos = [];
    test('it adds a test user with a todo and steps', function () {
        req.body = { name: 'deleteStepModel test', email: 'deleteStepModel test', pword: 'test' };
        return (0, addUserModel_1.default)(req)
            .then(function () {
            req.body = { todo: 'deleteStepModel test', done: false, dueDate: '2021-12-01' };
            return (0, addTodoModel_1.default)(req);
        })
            .then(function (resp) {
            testTodos.push(resp.todo);
            req.body = { step: 'deleteStepModel test 1', done: false };
            req.params.todoId = String(testTodos[0].id);
            return (0, addTodoStepModel_1.default)(req);
        })
            .then(function () {
            req.body = { step: 'deleteStepModel test 2', done: false };
            return (0, addTodoStepModel_1.default)(req);
        })
            .then(function () {
            req.params = {};
            req.body = {};
            return (0, getTodosModel_1.default)(req);
        })
            .then(function (resp) {
            testTodos = resp.todos;
        });
    });
    test('it deletes a step', function () {
        req.params = { todoId: String(testTodos[0].id), stepId: String(testTodos[0].steps[0].id) };
        return (0, deleteStepModel_1.default)(req)
            .then(function (resp) {
            expect(resp.status).toBe(202);
            expect(resp.message).toBe('step deleted');
            return;
        })
            .then(function () {
            req.body = {};
            req.params = {};
            return (0, getTodosModel_1.default)(req);
        })
            .then(function (resp) {
            expect(resp.todos.length).toBe(1);
            expect(resp.todos[0].steps.length).toBe(1);
            expect(resp.todos[0].steps[0].id).toBe(testTodos[0].steps[1].id);
            expect(resp.todos[0].steps[0].step).toBe('deleteStepModel test 2');
        });
    });
    test('it 404s if the step doesnt exist', function () {
        req.params = { todoId: String(testTodos[0].id), stepId: String(testTodos[0].steps[0].id) };
        return (0, deleteStepModel_1.default)(req)
            .catch(function (err) {
            expect(err.status).toBe(404);
            expect(err.message).toBe('step not found');
        });
    });
    test('it 401s if the user is not logged in', function () {
        return (0, deleteStepModel_1.default)(req2)
            .catch(function (err) {
            expect(err.status).toBe(401);
            expect(err.message).toBe('not authorised');
        });
    });
    test('it 401s if the todo doesnt belong to the owner', function () {
        req2.body = { name: 'deleteStepModel test 2', email: 'deleteStepModel test 2', pword: 'test' };
        return (0, addUserModel_1.default)(req2)
            .then(function () {
            req2.params = { stepId: String(testTodos[0].steps[0].id), todoId: String(testTodos[0].id) };
            return (0, deleteStepModel_1.default)(req2);
        })
            .catch(function (err) {
            expect(err.status).toBe(401);
            expect(err.message).toBe('not authorised');
        });
    });
    test('it 406s if there are no params', function () {
        var req3 = {
            session: req2.session
        };
        return (0, deleteStepModel_1.default)(req3)
            .catch(function (err) {
            expect(err.status).toBe(406);
            expect(err.message).toBe('invalid');
        });
    });
    test('it 406s if the todoId is not valid', function () {
        req.params = {};
        return (0, deleteStepModel_1.default)(req)
            .catch(function (err) {
            expect(err.status).toBe(406);
            expect(err.message).toBe('invalid');
        })
            .then(function () {
            req.params.todoId = 'hello';
            return (0, deleteStepModel_1.default)(req);
        })
            .catch(function (err) {
            expect(err.status).toBe(406);
            expect(err.message).toBe('invalid');
        });
    });
    test('it 406s if the stepId is not valid', function () {
        req.params.todoId = String(testTodos[0].id);
        return (0, deleteStepModel_1.default)(req)
            .catch(function (err) {
            expect(err.status).toBe(406);
            expect(err.message).toBe('invalid');
            req.params.stepId = 'hello';
            return (0, deleteStepModel_1.default)(req);
        })
            .catch(function (err) {
            expect(err.status).toBe(406);
            expect(err.message).toBe('invalid');
        });
    });
    test('clean up tests', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, deleteUserFromDB_1.default)('deleteStepModel test')];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (0, deleteUserFromDB_1.default)('deleteStepModel test 2')];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
