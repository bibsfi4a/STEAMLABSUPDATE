
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function editHtml(originalHtml: string, instructions: string): Promise<string> {
  const systemInstruction = `You are an expert HTML editor. The user will provide you with a block of HTML code and a set of instructions.
Your task is to apply the requested changes to the HTML and return the complete, modified HTML code.
You must only output the raw HTML code itself, with no additional explanations, comments, or markdown formatting like \`\`\`html\`.`;

  const prompt = `
Here is the HTML code:
---
${originalHtml}
---

Here are my instructions:
---
${instructions}
---

Please provide the full, updated HTML code.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction
      }
    });
    
    // Clean up potential markdown code fences that the model might still add
    let cleanedText = response.text.trim();
    if (cleanedText.startsWith('```html')) {
        cleanedText = cleanedText.substring(7);
    }
    if (cleanedText.endsWith('```')) {
        cleanedText = cleanedText.substring(0, cleanedText.length - 3);
    }
    
    return cleanedText.trim();

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get a response from the AI model.");
  }
}
