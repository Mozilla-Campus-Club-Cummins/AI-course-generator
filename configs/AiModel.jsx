// Import necessary packages
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config(); // Loads environment variables from a .env file

// Get the API key from the .env file
const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

// Check if the API key is available
if (!GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not defined in the .env file.");
}

// Initialize the Generative AI client
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// This is the prompt from your image
const prompt = `
Generate A Course Tutorial on Following Detail With field as Course Name,
Description, Along with Chapter Name, about, Duration.
Category: 'Programming', Topic: Python, Level:Basic, Duration:1.hours,
NoOf Chapters:5, in JSON format.
`;

/**
 * An asynchronous function to call the Gemini API and generate the course tutorial.
 */
async function generateCourseTutorial() {
    try {
        console.log("Sending prompt to Gemini API...");

        // Select the generative model
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        // Start a chat session with the model
        const chatSession = model.startChat({
            history: [],
            generationConfig: {
                // You can add generation config here if needed
            },
        });

        // Send the prompt to the chat session
        const result = await chatSession.sendMessage(prompt);
        const response = await result.response;
        let text = response.text();

        console.log("Received response from API.");

        // ---- Data Cleaning ----
        // AI responses can sometimes include markdown formatting like ```json ... ```
        // This code cleans it up before parsing.
        if (text.startsWith("```json")) {
            text = text.substring(7, text.length - 3).trim();
        } else if (text.startsWith("```")) {
            text = text.substring(3, text.length - 3).trim();
        }

        // ---- Parsing and Using the Data ----
        // Parse the cleaned text string into a JavaScript object
        const courseData = JSON.parse(text);

        console.log("\n--- Successfully Generated Course Tutorial ---");
        console.log(courseData);
        
        // Now you can use the data in your application
        console.log(`\nCourse Name: ${courseData.courseName}`);
        console.log(`First Chapter: ${courseData.chapters[0].chapterName}`);

        return courseData;

    } catch (error) {
        console.error("ERROR generating content:", error);
    }
}

// Run the function
generateCourseTutorial();
