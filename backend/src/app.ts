import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import router from './app/routes';
import dbConnect from './app/config/dbConnect';


const app: Application = express();


const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  'https://jplanettire.net',
  'https://www.jplanettire.net',
  'https://www.jplanettire.com',
];

const isAllowedOrigin = (origin: string) =>
  allowedOrigins.includes(origin) ||
  origin === process.env.FRONTEND_URL ||
  /^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(origin);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (Postman, mobile apps, curl, etc.)
      if (!origin) {
        return callback(null, true);
      }

      if (isAllowedOrigin(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} is not allowed by CORS`));
      }
    },
    credentials: true,                        // Required if you use cookies or Authorization headers
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// ──────────────────────────────────────────────────────────────
//                     OTHER MIDDLEWARE & ROUTES
// ──────────────────────────────────────────────────────────────

app.use(express.json());

const ensureDatabaseConnection = async (_req: Request, _res: Response, next: NextFunction) => {
  try {
    await dbConnect();
    next();
  } catch (error) {
    next(error);
  }
};

// All API routes under /api
app.use('/api', ensureDatabaseConnection, router);

// Health check / welcome route
app.get('/', (req: Request, res: Response) => {
  res.send('J Planet API is running');
});

// Global error handler (should be last)
app.use(globalErrorHandler);

export default app;
