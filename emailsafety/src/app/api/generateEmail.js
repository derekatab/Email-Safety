
const { GoogleGenerativeAI } = require("@google/generative-ai");


const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
    temperature: 1.25,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  export default async function run() {
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
            role: "user",
            parts: [
              {text: "Output only the email, do not include any text that is not the email.\nCreate false details within the email leaving only the recipient name as a fillable field.\nIf there are other people referred in the email, use terms such as \"co-worker\", \"colleague\", \"worker\"\nUse dates at most a month before today's date (January 18th, 2025).\nIn place of newline characters put \n\nWrite an email using ONLY ONE of the following themes:\n1. Issue regarding medical insurance not working \n2. A complaint filed against the recipient of the email\n\n"},
            ],
          },
      ],
    });

  const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
  return(result.response.text());
}