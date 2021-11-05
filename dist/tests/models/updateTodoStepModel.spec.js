"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var addTodoModel_1 = __importDefault(require("../../models/addTodoModel"));
var addTodoStepModel_1 = __importDefault(require("../../models/addTodoStepModel"));
var addUserModel_1 = __importDefault(require("../../models/addUserModel"));
var deleteUserFromDB_1 = __importDefault(require("../../models/functions/deleteUserFromDB"));
var getTodosModel_1 = __importDefault(require("../../models/getTodosModel"));
var updateTodoStepModel_1 = __importDefault(require("../../models/updateTodoStepModel"));
describe('updateTodoStepModel', function () {
    var req = {
        body: {},
        session: {},
        params: {}
    };
    var req2 = {};
    var testTodos;
    test('it creates a user with todos with steps', function () {
        req.body = {
            name: 'update todo step test',
            email: 'update todo step test',
            pword: 'test'
        };
        return (0, addUserModel_1.default)(req)
            .then(function () {
            req.body = {
                todo: 'update todo step test',
                dueDate: '2021-11-12',
                done: false
            };
            return (0, addTodoModel_1.default)(req);
        })
            .then(function () { return (0, getTodosModel_1.default)(req); })
            .then(function (resp) {
            testTodos = resp.todos;
        })
            .then(function () {
            req.params.todoId = String(testTodos[0].id);
            req.body = {
                step: 'update step test',
                done: false
            };
            return (0, addTodoStepModel_1.default)(req);
        })
            .then(function () { return (0, getTodosModel_1.default)(req); })
            .then(function (resp) {
            testTodos = resp.todos;
            return;
        });
    });
    test('it 401s with no session', function () {
        return (0, updateTodoStepModel_1.default)(req2)
            .catch(function (err) {
            expect(err.status).toBe(401);
            expect(err.message).toBe('not authorised');
        });
    });
    test('it 406s with no params', function () {
        req2.session = req.session;
        return (0, updateTodoStepModel_1.default)(req2)
            .catch(function (err) {
            expect(err.status).toBe(406);
            expect(err.message).toBe('no params');
        });
    });
    test('it 406s with no todoId in params', function () {
        req.params = {};
        return (0, updateTodoStepModel_1.default)(req)
            .catch(function (err) {
            expect(err.status).toBe(406);
            expect(err.message).toBe('no todoid');
        });
    });
    test('it 406s if todoId is not a "number"', function () {
        req.params.todoId = 'hello';
        return (0, updateTodoStepModel_1.default)(req)
            .catch(function (err) {
            expect(err.status).toBe(406);
            expect(err.message).toBe('invalid todoid');
        });
    });
    test('it 406s with no stepId in params', function () {
        req.params.todoId = String(testTodos[0].id);
        return (0, updateTodoStepModel_1.default)(req)
            .catch(function (err) {
            expect(err.status).toBe(406);
            expect(err.message).toBe('no stepid');
        });
    });
    test('it 406s if the stepId is not a "number"', function () {
        req.params.stepId = 'hello';
        return (0, updateTodoStepModel_1.default)(req)
            .catch(function (err) {
            expect(err.status).toBe(406);
            expect(err.message).toBe('invalid stepid');
        });
    });
    test('it 406s with no body', function () {
        req.params.stepId = String(testTodos[0].steps[0].id);
        delete req.body;
        return (0, updateTodoStepModel_1.default)(req)
            .catch(function (err) {
            expect(err.status).toBe(406);
            expect(err.message).toBe('no body');
        });
    });
    test('it 406s with no step in body', function () {
        req.body = {};
        return (0, updateTodoStepModel_1.default)(req)
            .catch(function (err) {
            expect(err.status).toBe(406);
            expect(err.message).toBe('no step');
        });
    });
    test('it 406s with step not string', function () {
        req.body.step = 1;
        return (0, updateTodoStepModel_1.default)(req)
            .catch(function (err) {
            expect(err.status).toBe(406);
            expect(err.message).toBe('invalid step');
        });
    });
    test('it 406s without a done of true or false', function () {
        req.body = {
            step: 'updated todo step'
        };
        return (0, updateTodoStepModel_1.default)(req)
            .catch(function (err) {
            expect(err.status).toBe(406);
            expect(err.message).toBe('invalid done');
        });
    });
    test('it wont let you update someone elses todo step', function () {
        var req2 = {
            session: {},
            params: {},
            body: { name: 'should fail', email: 'should fail', pword: 'test' }
        };
        return (0, addUserModel_1.default)(req2)
            .then(function () {
            req2.params = {
                todoId: String(testTodos[0].id),
                stepId: String(testTodos[0].steps[0].id)
            };
            req2.body = {
                done: true,
                step: 'this shouldnt work'
            };
            return (0, updateTodoStepModel_1.default)(req2);
        })
            .catch(function (err) {
            expect(err.status).toBe(401);
            expect(err.message).toBe('not authorised');
        });
    });
    test('it 404s if there is no step to update', function () {
        req.params.stepId = '1';
        req.body.done = true;
        return (0, updateTodoStepModel_1.default)(req)
            .catch(function (err) {
            expect(err.status).toBe(404);
            expect(err.message).toBe('step not found');
        });
    });
    test('it updates a todo step', function () {
        req.body.step = 'updated step test';
        req.params.stepId = String(testTodos[0].steps[0].id);
        return (0, updateTodoStepModel_1.default)(req)
            .then(function (resp) {
            expect(resp.status).toBe(202);
            expect(resp.message).toBe('todo step updated');
            expect(resp.step).toBeTruthy();
            expect(resp.step.step).toBe('updated step test');
            expect(resp.step.done).toBeTruthy();
            expect(resp.step.todoId).toBe(testTodos[0].id);
            expect(resp.step.id).toBe(testTodos[0].steps[0].id);
        })
            .then(function () { return (0, getTodosModel_1.default)(req); })
            .then(function (resp) {
            var todo = resp.todos[0];
            var step = todo.steps[0];
            expect(step.done).toBeTruthy();
            expect(step.step).toBe('updated step test');
        });
    });
    test('clean up tests', function () {
        (0, deleteUserFromDB_1.default)('update todo step test');
        (0, deleteUserFromDB_1.default)('should fail');
        return;
    });
});
