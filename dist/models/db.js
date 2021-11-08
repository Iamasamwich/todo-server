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
var mysql_1 = __importDefault(require("mysql"));
var dotenv = __importStar(require("dotenv"));
dotenv.config();
;
var Conn = /** @class */ (function () {
    function Conn() {
        this.config = {
            host: process.env.DBPATH,
            user: process.env.DBUSER,
            password: process.env.DBPASS,
            database: process.env.DBNAME,
            dateStrings: true
        };
        this.conn = mysql_1.default.createConnection(this.config);
    }
    ;
    Conn.prototype.send = function (message, payload) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.conn.query(message, payload, function (err, res) {
                if (err) {
                    console.log(err);
                    console.log('message: ', message);
                    console.log('payload: ', payload);
                    reject({ status: 500, message: 'server error' });
                }
                else {
                    resolve(res);
                }
                ;
            });
        });
    };
    ;
    Conn.prototype.end = function () {
        this.conn.end();
    };
    ;
    return Conn;
}());
;
exports.default = Conn;
