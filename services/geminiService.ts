import { GoogleGenAI, Type } from "@google/genai";
import { DocumentType, VerificationResult } from "../types";
import { fileToBase64 } from "./utils";

// Initialize Gemini Client
// Note: API Key must be provided via environment variable process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const validateDocumentWithGemini = async (
  file: File,
  expectedType: DocumentType
): Promise<VerificationResult> => {
  try {
    const base64Data = await fileToBase64(file);

    const prompt = `
      You are an expert identity document verification system for Indian documents. 
      Analyze the provided image strictly.
      
      The user claims this image is a: ${expectedType}.
      
      1. Verify if the visual appearance, layout, fonts, and holograms match a valid ${expectedType}.
      2. Check for signs of manipulation, blurriness, or if it is a completely different object.
      3. Return a confidence score between 0 and 1.
      4. Provide a concise reason for your decision.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: file.type,
              data: base64Data,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isValid: {
              type: Type.BOOLEAN,
              description: "True if the document matches the expected type and looks authentic.",
            },
            confidence: {
              type: Type.NUMBER,
              description: "Confidence score from 0.0 to 1.0.",
            },
            detectedType: {
              type: Type.STRING,
              description: "The type of document actually detected (e.g., 'Credit Card', 'Unknown', 'PAN Card').",
            },
            reason: {
              type: Type.STRING,
              description: "A short explanation of why the document is valid or invalid.",
            },
          },
          required: ["isValid", "confidence", "detectedType", "reason"],
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from AI");
    }

    const result = JSON.parse(text) as VerificationResult;
    return result;

  } catch (error) {
    console.error("Gemini Validation Error:", error);
    throw new Error("Failed to validate document. Please try again.");
  }
};