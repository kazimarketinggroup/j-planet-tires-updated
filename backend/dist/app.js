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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const routes_1 = __importDefault(require("./app/routes"));
const dbConnect_1 = __importDefault(require("./app/config/dbConnect"));
const app = (0, express_1.default)();
const allowedOrigins = [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:3000',
    'https://jplanettire.net',
    'https://www.jplanettire.net',
    'https://www.jplanettire.com',
];
const isAllowedOrigin = (origin) => allowedOrigins.includes(origin) ||
    origin === process.env.FRONTEND_URL ||
    /^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(origin);
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        // Allow requests with no origin (Postman, mobile apps, curl, etc.)
        if (!origin) {
            return callback(null, true);
        }
        if (isAllowedOrigin(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error(`Origin ${origin} is not allowed by CORS`));
        }
    },
    credentials: true, // Required if you use cookies or Authorization headers
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
// ──────────────────────────────────────────────────────────────
//                     OTHER MIDDLEWARE & ROUTES
// ──────────────────────────────────────────────────────────────
app.use(express_1.default.json());
const ensureDatabaseConnection = (_req, _res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, dbConnect_1.default)();
        next();
    }
    catch (error) {
        next(error);
    }
});
// All API routes under /api
app.use('/api', ensureDatabaseConnection, routes_1.default);
// Health check / welcome route
app.get('/', (req, res) => {
    res.send('J Planet API is running');
});
// Global error handler (should be last)
app.use(globalErrorHandler_1.default);
exports.default = app;
