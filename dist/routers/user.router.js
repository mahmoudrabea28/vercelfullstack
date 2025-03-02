"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var express_1 = require("express");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var express_async_handler_1 = __importDefault(require("express-async-handler"));
var user_model_1 = require("../models/user.model");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var router = (0, express_1.Router)();
router.get("/seed", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var foodCount;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_model_1.UserModel.countDocuments()];
            case 1:
                foodCount = _a.sent();
                if (foodCount > 0) {
                    res.send("seed is already done");
                    return [2 /*return*/];
                }
                return [4 /*yield*/, user_model_1.UserModel.create(user_model_1.UserModel)];
            case 2:
                _a.sent();
                res.send("seed is done");
                return [2 /*return*/];
        }
    });
}); }));
// router.post("/login", (req, res) => {
//     const { email, password } = req.body;
//     const user = sample_users.find(user => user.email === email &&
//         user.password === password)
//     if (user) {
//         res.send(generateTokenResponse(user));
//     } else {
//         res.status(400).send("user name or password is invalid!")
//     }
// })
// router.post(
//     "/login",
//     asyncHandler(async (req, res) => {
//         const { email, password } = req.body;
//         const user = await UserModel.findOne({ email, password });
//         if (user) {
//             res.send(generateTokenResponse(user));
//         } else {
//             res.status(400).send("Username or password is invalid!");
//         }
//     })
// );
router.post("/login", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, user_model_1.UserModel.findOne({ email: email, password: password })];
            case 2:
                user = _b.sent();
                if (user) { // && (await bcrypt.compare(password,user.password))
                    res.send(generateTokenResponse(user));
                }
                else {
                    res.status(400).send("Username or password is invalid!");
                }
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                console.error("Error during login:", error_1);
                res.status(500).send("Internal server error");
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); }));
var generateTokenResponse = function (user) {
    var secret = process.env.JWT_SECRET || "fallbackinsecuresecret"; //Use env variable.
    if (secret === "fallbackinsecuresecret") {
        console.warn("Using insecure fallback jwt secret. Please set the JWT_SECRET environment variable.");
    }
    var token = jsonwebtoken_1.default.sign({
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin,
    }, secret, {
        expiresIn: "30d",
    });
    return __assign(__assign({ id: user.id, email: user.email, name: user.name, address: user.address, isAdmin: user.isAdmin }, user.toObject()), { token: token });
};
router.post('/register', (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, email, password, address, user, encryptedPassword, newUser, dbUser;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, email = _a.email, password = _a.password, address = _a.address;
                return [4 /*yield*/, user_model_1.UserModel.findOne({ email: email })];
            case 1:
                user = _b.sent();
                if (user) {
                    res.status(400)
                        .send('User is already exist, please login!');
                    return [2 /*return*/];
                }
                return [4 /*yield*/, bcryptjs_1.default.hash(password, 10)];
            case 2:
                encryptedPassword = _b.sent();
                newUser = {
                    id: '',
                    name: name,
                    email: email.toLowerCase(),
                    password: password,
                    address: address,
                    isAdmin: false
                };
                return [4 /*yield*/, user_model_1.UserModel.create(newUser)];
            case 3:
                dbUser = _b.sent();
                res.send(generateTokenResponse(dbUser));
                return [2 /*return*/];
        }
    });
}); }));
// const generateTokenResponse = (user: any) => {
//     const token = jwt.sign(
//         {
//             email: user.email,
//             isAdmin: user.isAdmin,
//         },
//         "SomeRandomText",
//         {
//             expiresIn: "30d",
//         }
//     );
//     user.token = token;
//     return user;
// };
exports.default = router;
