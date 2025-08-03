// AiModel.js
import { GoogleGenerativeAI } from "@google/generative-ai";

// This line reads the key you set in .env.local after you restart the server.
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

export async function generateCourseStructure(userInput) {
  // CORRECTED: Use the latest, most stable model name.
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

  const prompt = `
    Generate a course structure in JSON format with the following details:
    - Category: ${userInput.category}
    - Topic: ${userInput.topic}
    - Description: ${userInput.description}
    - Level: ${userInput.difficulty}
    - Duration: ${userInput.duration} hours
    - Chapters: ${userInput.chapters}

    The response must be ONLY the JSON object, without any extra text, explanations, or markdown formatting.

    Format:
    {
      "courseName": "...", "description": "...", "category": "...", "topic": "...",
      "level": "...", "duration": "...", "numberOfChapters": ...,
      "chapters": [{"chapterName": "...", "about": "...", "duration": "..."}]
    }
  `;

  let rawTextResponse = '';

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;

    if (response.promptFeedback?.blockReason) {
      throw new Error(`Request was blocked: ${response.promptFeedback.blockReason}`);
    }
    if (response.candidates[0].finishReason !== 'STOP') {
        throw new Error(`The model stopped generating for an unexpected reason: ${response.candidates[0].finishReason}`);
    }

    rawTextResponse = response.text();

    const startIndex = rawTextResponse.indexOf('{');
    const endIndex = rawTextResponse.lastIndexOf('}');
    
    if (startIndex === -1 || endIndex === -1) {
      throw new Error("Could not find a valid JSON object in the AI's response.");
    }
    
    const jsonString = rawTextResponse.substring(startIndex, endIndex + 1);
    return JSON.parse(jsonString);

  } catch (error) {
    console.error("--- RAW AI RESPONSE ---");
    console.error(rawTextResponse);
    console.error("--- ERROR DETAILS ---");
    console.error(error);
    
    throw new Error(`Failed to get a valid course structure from the AI. Reason: ${error.message}`);
  }
}

export async function generateCodeFromStructure(courseJson) {
  // CORRECTED: Use the latest, most stable model name.
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
  const prompt = `Based on this course JSON, generate a detailed Python tutorial in Markdown format:\n\n${JSON.stringify(courseJson, null, 2)}`;
  
  try {
      const result = await model.generateContent(prompt);
      const response = result.response;
      if (response.promptFeedback?.blockReason) {
        throw new Error(`Request was blocked: ${response.promptFeedback.blockReason}`);
      }
      return response.text();
  } catch(error) {
      console.error("Error generating final course code:", error);
      throw new Error(`Failed to generate the final course content. Reason: ${error.message}`);
  }
}
