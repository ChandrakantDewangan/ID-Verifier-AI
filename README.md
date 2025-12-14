# ID Verifier AI

An intelligent identity document verification system powered by **Google Gemini 2.5 Flash**. This application allows users to upload images of identity documents (PAN Card, Aadhar Card, Driving License, etc.) and uses advanced AI vision capabilities to verify if the uploaded image matches the expected document type and checks for authenticity markers.

## 🚀 Features

*   **Multi-Document Support**: Verify PAN Cards, Aadhar Cards, Driving Licenses, Voter IDs, and Passports.
*   **AI-Powered Analysis**: Uses Gemini 2.5 Flash (Multimodal) to analyze visual patterns, fonts, holograms, and layout.
*   **Real-time Validation**: Instant feedback on document validity with a confidence score.
*   **Detailed Insights**: Provides a reason for acceptance or rejection (e.g., "Blurry image", "Wrong document type", "Valid format").
*   **Secure & Private**: Processing happens via the secure Gemini API.
*   **Responsive UI**: Built with React and Tailwind CSS for a seamless experience on mobile and desktop.

## 🛠️ Tech Stack

*   **Frontend**: React (v19), TypeScript
*   **Styling**: Tailwind CSS
*   **AI Model**: Google Gemini 2.5 Flash via `@google/genai` SDK
*   **Icons**: Lucide React

## 📋 Prerequisites

To use this application, you need a valid **Google Gemini API Key**.

1.  Get an API key from [Google AI Studio](https://aistudio.google.com/).
2.  Ensure the environment has the `API_KEY` variable set securely.

## 🏗️ Architecture

1.  **User Selection**: User selects the document type (e.g., PAN Card) they intend to upload.
2.  **Image Upload**: User uploads an image file (JPG, PNG, WEBP).
3.  **Preprocessing**: Image is converted to Base64 format.
4.  **AI Inference**: The image and the expected type (e.g., "PAN Card") are sent to Gemini 2.5 Flash.
    *   *Prompt Engineering*: The model is instructed to act as an expert verification system, strictly checking for visual markers, layout, and fonts specific to Indian identity documents.
5.  **Response Parsing**: The AI returns a structured JSON object containing:
    *   `isValid`: Boolean
    *   `confidence`: 0.0 - 1.0
    *   `detectedType`: String
    *   `reason`: String
6.  **Result Display**: The UI displays a color-coded card (Green/Yellow/Red) based on the validation result.

## ⚠️ Disclaimer

This tool is for **demonstration and preliminary verification purposes only**. It uses Generative AI to analyze visual features and should **not** be used as the sole source of truth for critical KYC (Know Your Customer) or legal identity verification processes. It does not access government databases to verify the actual data (e.g., name/number match).