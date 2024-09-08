import dotenv from "dotenv";
dotenv.config();
import * as fs from "fs";
import { GoogleGenerativeAI } from "@google/generative-ai";
import path from 'path';

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

function fileToGenerativePart(filePath, mimeType) {
    const fileData = fs.readFileSync(filePath).toString('base64');
    return {
        inlineData: fileData,
        mimeType,
    };
}

async function run() {
    try {
        // Update the model to the new one
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = "name of the flower";

        // Use an absolute path for the image file
        const absolutePath = path.resolve('images', 'images.jpeg');
        const imageParts = [fileToGenerativePart(absolutePath, 'image/jpeg')];

        // Generate content using the new model
        const result = await model.generateContent([prompt, ...imageParts]);
        const response = await result.response;

        // Make sure to handle the response correctly
        const text = await response.text();
        console.log(text);
    } catch (error) {
        console.error("Error generating content:", error);
    }
}

run();
