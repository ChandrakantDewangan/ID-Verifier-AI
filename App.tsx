import React, { useState } from 'react';
import { ScanLine, Loader2, CheckCircle2 } from 'lucide-react';
import { DocumentType, VerificationResult } from './types';
import { validateDocumentWithGemini } from './services/geminiService';
import { Uploader } from './components/Uploader';
import { ResultCard } from './components/ResultCard';

const DOCUMENT_OPTIONS = [
  { value: DocumentType.PAN_CARD, label: 'PAN Card' },
  { value: DocumentType.AADHAR_CARD, label: 'Aadhar Card' },
  { value: DocumentType.DRIVING_LICENSE, label: 'Driving License' },
  { value: DocumentType.VOTER_ID, label: 'Voter ID' },
  { value: DocumentType.PASSPORT, label: 'Passport' },
];

function App() {
  const [selectedType, setSelectedType] = useState<DocumentType>(DocumentType.PAN_CARD);
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleValidation = async () => {
    if (!file) return;

    setIsAnalyzing(true);
    setResult(null);
    setError(null);

    try {
      // Simulate network delay for better UX or actual API call time
      const data = await validateDocumentWithGemini(file, selectedType);
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred during validation.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-600 rounded-2xl shadow-lg mb-4">
            <ScanLine className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Document Validator
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Upload an ID document and let AI verify its authenticity and type.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="p-6 sm:p-8 space-y-8">
            
            {/* 1. Document Type Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Select Document Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {DOCUMENT_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                        setSelectedType(option.value);
                        setResult(null); // Clear result on type change
                    }}
                    disabled={isAnalyzing}
                    className={`
                      px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 border
                      ${selectedType === option.value 
                        ? 'bg-indigo-50 border-indigo-500 text-indigo-700 ring-1 ring-indigo-500' 
                        : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                      }
                      ${isAnalyzing ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Uploader Area */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Upload Document Image
              </label>
              <Uploader 
                selectedFile={file} 
                onFileSelect={setFile} 
                onClear={handleReset}
                isAnalyzing={isAnalyzing}
              />
            </div>

            {/* Action Buttons */}
            {file && !result && (
              <button
                onClick={handleValidation}
                disabled={isAnalyzing}
                className={`
                  w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl text-white font-semibold text-lg shadow-md transition-all
                  ${isAnalyzing 
                    ? 'bg-indigo-400 cursor-not-allowed' 
                    : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg active:transform active:scale-[0.98]'
                  }
                `}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Validating...
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={20} />
                    Verify Document
                  </>
                )}
              </button>
            )}

            {/* Error Message */}
            {error && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-100 text-red-700 text-sm flex items-center gap-2">
                <span className="font-bold">Error:</span> {error}
              </div>
            )}

            {/* Results Section */}
            {result && (
               <ResultCard result={result} expectedType={selectedType} />
            )}

          </div>
          
          {/* Footer Note */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
             <p className="text-xs text-center text-gray-500">
               AI Analysis performed using <strong>Gemini 2.5 Flash</strong>. 
               This tool helps in preliminary verification and should not be the sole source of truth for critical identity checks.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;