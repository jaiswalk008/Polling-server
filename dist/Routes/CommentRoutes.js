"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthMiddleware_1 = __importDefault(require("../Middleware/AuthMiddleware"));
const CommentController_1 = __importDefault(require("../Controllers/CommentController"));
const router = (0, express_1.Router)();
router.post('/', AuthMiddleware_1.default, CommentController_1.default.createComment);
exports.default = router;
