"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("../Controllers/UserController"));
const AuthMiddleware_1 = __importDefault(require("../Middleware/AuthMiddleware"));
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage();
const uploads = (0, multer_1.default)({ storage });
const router = (0, express_1.Router)();
router.post('/signup', UserController_1.default.signup);
router.post('/login', UserController_1.default.login);
router.get('/', AuthMiddleware_1.default, UserController_1.default.getUser);
router.post('/profilePhoto', AuthMiddleware_1.default, uploads.array("profilePhoto"), UserController_1.default.updateProfilePhoto);
exports.default = router;
