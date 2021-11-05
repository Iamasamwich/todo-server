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
var express_1 = __importDefault(require("express"));
var express_session_1 = __importDefault(require("express-session"));
var supertest_1 = __importDefault(require("supertest"));
var db_1 = __importDefault(require("../../models/db"));
var deleteUserFromDB_1 = __importDefault(require("../../models/functions/deleteUserFromDB"));
var getUserByEmail_1 = __importDefault(require("../../models/functions/getUserByEmail"));
var routes_1 = __importDefault(require("../../routes"));
var app = (0, express_1.default)();
;
app.use(express_1.default.json());
app.use((0, express_session_1.default)({
    secret: 'backflips are for crickets',
    resave: false,
    saveUninitialized: true,
    cookie: {
        sameSite: false,
        secure: false,
        maxAge: 12096000000
    }
}));
var userId;
var loggedIn;
app.use(function (req, res, next) {
    req.session.userId = userId;
    req.session.loggedIn = loggedIn;
    next();
});
app.use(express_1.default.static('public'));
app.use(routes_1.default);
describe('todoStep routes', function () {
    var testTodos;
    test('it creates a test user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var test, conn;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app)
                        .post('/user')
                        .send({ email: 'todostep test user', name: 'todostep test user', pword: 'test' })];
                case 1:
                    test = _a.sent();
                    expect(test.status).toBe(201);
                    conn = new db_1.default();
                    return [2 /*return*/, (0, getUserByEmail_1.default)(conn, 'todostep test user')
                            .then(function (resp) {
                            userId = resp.id;
                            loggedIn = true;
                        })
                            .finally(function () {
                            conn.end();
                        })];
            }
        });
    }); });
    test('it creates a todo for the user', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app)
                        .post('/todo')
                        .send({
                        todo: 'todostep test todo',
                        done: false,
                        dueDate: '2021-12-01'
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); });
    test('it gets the todos', function () { return __awaiter(void 0, void 0, void 0, function () {
        var test;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app)
                        .get('/todo')];
                case 1:
                    test = _a.sent();
                    testTodos = test.body.todos;
                    return [2 /*return*/];
            }
        });
    }); });
    test('it lets you add a step', function () { return __awaiter(void 0, void 0, void 0, function () {
        var test;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app)
                        .post('/todo/' + String(testTodos[0].id) + '/step')
                        .send({
                        step: 'todostep test step',
                        done: false
                    })];
                case 1:
                    test = _a.sent();
                    expect(test.status).toBe(201);
                    expect(test.body.status).toBe(201);
                    expect(test.body.message).toBe('todo step added');
                    expect(test.body.step.step).toBe('todostep test step');
                    expect(test.body.step.done).toBeFalsy();
                    expect(test.body.step.todoId).toBe(testTodos[0].id);
                    expect(test.body.step.id).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
    test('when you get the todos the step is there', function () { return __awaiter(void 0, void 0, void 0, function () {
        var test;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app)
                        .get('/todo')];
                case 1:
                    test = _a.sent();
                    expect(test.body.todos[0].steps.length).toBe(1);
                    expect(test.body.todos[0].steps[0].step).toBe('todostep test step');
                    expect(test.body.todos[0].steps[0].done).toBeFalsy();
                    testTodos = test.body.todos;
                    return [2 /*return*/];
            }
        });
    }); });
    test('you can update a step', function () { return __awaiter(void 0, void 0, void 0, function () {
        var test;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app)
                        .put("/todo/" + String(testTodos[0].id) + "/step/" + String(testTodos[0].steps[0].id))
                        .send({ step: 'updated todo step', done: true })];
                case 1:
                    test = _a.sent();
                    expect(test.status).toBe(202);
                    expect(test.body.status).toBe(202);
                    expect(test.body.message).toBe('todo step updated');
                    expect(test.body.step.id).toBe(testTodos[0].steps[0].id);
                    expect(test.body.step.step).toBe('updated todo step');
                    expect(test.body.step.todoId).toBe(testTodos[0].id);
                    expect(test.body.step.done).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
    test('DELETE /todo/id/step/id deletes a step', function () { return __awaiter(void 0, void 0, void 0, function () {
        var test;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app)
                        .delete("/todo/" + testTodos[0].id + "/step/" + testTodos[0].steps[0].id)];
                case 1:
                    test = _a.sent();
                    expect(test.status).toBe(202);
                    expect(test.body.status).toBe(202);
                    expect(test.body.message).toBe('step deleted');
                    return [2 /*return*/];
            }
        });
    }); });
    test('PUT /todo/id/step/id throws an error', function () { return __awaiter(void 0, void 0, void 0, function () {
        var test;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    loggedIn = false;
                    userId = '';
                    return [4 /*yield*/, (0, supertest_1.default)(app)
                            .put('/todo/' + String(testTodos[0].id + '/step/' + String(testTodos[0].steps[0].id)))
                            .send({ step: 'this shouldnt work', done: true })];
                case 1:
                    test = _a.sent();
                    expect(test.status).toBe(401);
                    expect(test.body.status).toBe(401);
                    expect(test.body.message).toBe('not authorised');
                    return [2 /*return*/];
            }
        });
    }); });
    test('POST /todo/id/step throws an error', function () { return __awaiter(void 0, void 0, void 0, function () {
        var test;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app)
                        .post("/todo/" + String(testTodos[0].id) + "/step")
                        .send({ step: 'this should not work' })];
                case 1:
                    test = _a.sent();
                    expect(test.status).toBe(401);
                    expect(test.body.status).toBe(401);
                    expect(test.body.message).toBe('not authorised');
                    return [2 /*return*/];
            }
        });
    }); });
    test('DELETE /todo/id/step/id throws an error', function () { return __awaiter(void 0, void 0, void 0, function () {
        var test;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app)
                        .delete("/todo/" + String(testTodos[0].id) + "/step/" + String(testTodos[0].steps[0].id))];
                case 1:
                    test = _a.sent();
                    expect(test.status).toBe(401);
                    expect(test.body.status).toBe(401);
                    expect(test.body.message).toBe('not authorised');
                    return [2 /*return*/];
            }
        });
    }); });
    test('clean up tests', function () {
        return (0, deleteUserFromDB_1.default)('todostep test user');
    });
});
