import express from 'express';
import multer from 'multer';
import { clerkMiddleware } from '@clerk/express';
import path from 'path';

import {
  createBusinessProfile,
  updateBusinessProfile,
  getBusinessProfile
} from '../controllers/bussinessProfileController.js';

const bussinessProfileRouter = express.Router(); // ✅ THIS WAS MISSING

bussinessProfileRouter.use(clerkMiddleware());

// Multer config
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(process.cwd(), 'uploads'));
  },
  filename(req, file, cb) {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `business-${unique}${ext}`);
  },
});

const upload = multer({ storage });

// Create
bussinessProfileRouter.post(
  '/',
  upload.fields([
    { name: 'logoName', maxCount: 1 },
    { name: 'stampName', maxCount: 1 },
    { name: 'signatureNameMeta', maxCount: 1 },
  ]),
  createBusinessProfile
);

// Update
bussinessProfileRouter.put(
  '/:id',
  upload.fields([
    { name: 'logoName', maxCount: 1 },
    { name: 'stampName', maxCount: 1 },
    { name: 'signatureNameMeta', maxCount: 1 },
  ]),
  updateBusinessProfile
);

// Get
bussinessProfileRouter.get('/me', getBusinessProfile);

export default bussinessProfileRouter;
