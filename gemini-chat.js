import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
dotenv.config();
import readline from "readline";

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout.out,
});

async function run() {
    const model = genAI.getGenerativeModel({model: "gemini-pro"});
    const chat = model.startChat({
        history: [],
        generationConfig: {
            maxOutputTokens: 500,
        }
    });

    async function askAndResponse() {
        rl.question("You: ", async(msg) =>{
            if(msg.toLowerCase() === "exit"){
                rl.close();
            }

            else{
                const result = await chat.sendMessage(msg);
                const response = await result.response;
                const text = await response.text();
                console.log("AI: ", text);
                askAndResponse();
            }
        });
    }

    askAndResponse();
}

run();