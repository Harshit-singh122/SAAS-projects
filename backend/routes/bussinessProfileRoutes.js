import express from 'express';
import multer from 'multer';
import { clerkMiddleware } from '@clerk/express';
import path from 'path';
import { createBusinessProfile, updateBusinessProfile, getBusinessProfile } from '../controllers/bussinessProfileController.js';

const bussinessProfileRouter = express.Router();

bussinessProfileRouter.use(clerkMiddleware());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(process.cwd(), 'uploads') );
    },
    filename: function (req, file, cb) {
        const unique = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext=path.extname(file.originalname);
        cb(null,   `bussiness-${unique}${ext}`);
    }
}); 

const upload = multer({ storage: storage });

//create 
bussinessProfileRouter.post('/', upload.fields([
    { name: 'logoName', maxCount: 1 },
    { name: 'stampName', maxCount: 1 },
    { name: 'signatureNameMeta', maxCount: 1 }
]), createBusinessProfile);

//update
bussinessProfileRouter.put('/:id', upload.fields([
    { name: 'logoName', maxCount: 1 },
    { name: 'stampName', maxCount: 1 },
    { name: 'signatureNameMeta', maxCount: 1 }
]), updateBusinessProfile);

//get
bussinessProfileRouter.get('/me', getBusinessProfile);

export default bussinessProfileRouter;