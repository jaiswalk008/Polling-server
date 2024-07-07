"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserRoutes_1 = __importDefault(require("./UserRoutes"));
const PollRoutes_1 = __importDefault(require("./PollRoutes"));
const CommentRoutes_1 = __importDefault(require("./CommentRoutes"));
const app = (0, express_1.Router)();
app.use(UserRoutes_1.default);
app.use('/poll', PollRoutes_1.default);
app.use('/comment', CommentRoutes_1.default);
exports.default = app;
