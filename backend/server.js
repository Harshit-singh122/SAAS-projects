import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { clerkMiddleware } from '@clerk/express';
import { connectDB } from './config/db.js';
import path from 'path';

import invoiceRouter from './routes/invoiceRouter.js';
import bussinessProfileRouter from './routes/bussinessProfileRoutes.js';
import AiInvoiceRouter from './routes/AiInvoiceRouter.js';

const app = express();
const PORT = 4000;

// Middleware
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://saas-projects-git-main-harshit-singh122s-projects.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));


app.use(clerkMiddleware());
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// DB
connectDB();

// Static
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Routes
app.use('/api/invoice', invoiceRouter);
app.use('/api/business-profile', bussinessProfileRouter);
app.use('/api/ai-invoice', AiInvoiceRouter);

app.get('/', (req, res) => {
  res.send('API is working');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

});
