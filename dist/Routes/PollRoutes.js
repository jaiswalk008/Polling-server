"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PollController_1 = __importDefault(require("../Controllers/PollController"));
const AuthMiddleware_1 = __importDefault(require("../Middleware/AuthMiddleware"));
const router = (0, express_1.Router)();
router.post('', AuthMiddleware_1.default, PollController_1.default.createPoll);
router.get('', AuthMiddleware_1.default, PollController_1.default.getAllPolls);
router.get('/:pollId', PollController_1.default.getPollDetails);
router.patch('', AuthMiddleware_1.default, PollController_1.default.updateVotes);
exports.default = router;
