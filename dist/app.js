"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var express_session_1 = __importDefault(require("express-session"));
var cors_1 = __importDefault(require("cors"));
var dotenv = __importStar(require("dotenv"));
var routes_1 = __importDefault(require("./routes"));
dotenv.config();
;
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, express_session_1.default)({
    secret: process.env.COOKIE,
    resave: false,
    saveUninitialized: true,
    cookie: {
        sameSite: false,
        secure: false,
        maxAge: 12096000000
    }
}));
app.use(function (req, res, next) {
    console.log('xxxxxxxxxxxxxxxxxxxxxx');
    console.log('source', req.ip);
    console.log('method', req.method);
    console.log('route', req.path);
    console.log('session id', req.session.id);
    console.log('yyyyyyyyyyyyyyyyyyyyyyyyy');
    next();
});
var whiteListOrigins = [
    'http://things-to-do-todo-app.herokuapp.com',
    'https://things-to-do-todo-app.herokuapp.com',
    'http://localhost:3000',
    'http://localhost:3001',
    'http://192.168.43.5:3001',
    "http://" + process.env.HOST + ":" + process.env.PORT,
    "http://" + process.env.HOST,
    undefined
];
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        if (whiteListOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            console.log('unacceptable origin --->', origin);
            callback(new Error('unacceptable origin: ' + origin));
        }
        ;
    },
    credentials: true
}));
app.use(express_1.default.static('public'));
app.use(routes_1.default);
app.listen(process.env.PORT, function () {
    console.log("listening on port " + process.env.PORT);
});
