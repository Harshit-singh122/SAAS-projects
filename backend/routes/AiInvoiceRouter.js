import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import 'dotenv/config';

const router = express.Router();

router.post('/generate', async (req, res) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("Missing GEMINI_API_KEY in .env file");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    
    // ✅ FIX: Using 'gemini-2.0-flash-lite-001'
    // This model is explicitly listed in your JSON output, so it CANNOT give a 404.
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

    const { prompt } = req.body;
    console.log("Processing AI Invoice (2.0 Flash Lite)...");

    const result = await model.generateContent(`
      Extract invoice details from this text and return ONLY valid JSON.
      Do not include markdown formatting like \`\`\`json.
      Structure: { "client": { "name": "string", "email": "string" }, "items": [{ "description": "string", "quantity": number, "price": number }], "dueDate": "YYYY-MM-DD" }
      Text: "${prompt}"
    `);
    
    const response = await result.response;
    const text = response.text();
    
    const cleanText = text.replace(/```json|```/g, '').trim();
    const invoiceData = JSON.parse(cleanText);

    res.json({ data: invoiceData });

  } catch (error) {
    console.error("AI FAILED:", error);
    
    // If you hit a 429 (Rate Limit), we send a specific message
    if (error.message.includes("429")) {
       return res.status(429).json({ 
         message: "AI is busy (Rate Limit). Please wait 1 minute.", 
         error: "Quota Exceeded" 
       });
    }

    res.status(500).json({ 
      message: "AI Generation Failed", 
      error: error.message 
    });
  }
});

export default router;