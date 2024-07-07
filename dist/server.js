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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const socket_io_1 = require("socket.io");
const index_1 = __importDefault(require("./Routes/index"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: process.env.ORIGIN,
    }
});
app.use((0, cors_1.default)({
    origin: process.env.ORIGIN,
}));
app.use(body_parser_1.default.json());
app.use(index_1.default);
// Socket.IO event handling
io.on('connection', (socket) => {
    // console.log('User connected:', socket.id);
    socket.on('newComment', (data) => {
        io.emit('newComment', data);
    });
    socket.on('vote', (data) => {
        io.emit('vote', data);
    });
});
(function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(process.env.MONGODB_SRV);
            server.listen(process.env.PORT, () => console.log(`server is running on ${process.env.PORT}`));
        }
        catch (error) {
            console.log(error);
        }
    });
})();
