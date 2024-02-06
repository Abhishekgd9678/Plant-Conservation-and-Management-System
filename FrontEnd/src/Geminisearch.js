import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyBSzG62B8QyXQ5WNMu2WVsrLTWrXx1mDig");

    async function run(prompt) {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        
        const result = await model.generateContent(prompt);

        const response = result.response;

        const text = response.text();
        return text;
    }

export default run;