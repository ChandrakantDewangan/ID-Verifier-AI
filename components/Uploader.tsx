import React, { useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface UploaderProps {
  selectedFile: File | null;
  onFileSelect: (file: File) => void;
  onClear: () => void;
  isAnalyzing: boolean;
}

export const Uploader: React.FC<UploaderProps> = ({ 
  selectedFile, 
  onFileSelect, 
  onClear,
  isAnalyzing 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [selectedFile]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (isAnalyzing) return;
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  if (selectedFile && previewUrl) {
    return (
      <div className="relative w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="absolute top-2 right-2 z-10">
          <button
            onClick={onClear}
            disabled={isAnalyzing}
            className="rounded-full bg-white/90 p-1.5 text-gray-600 shadow-sm hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="flex h-64 w-full items-center justify-center bg-gray-100">
            <img 
                src={previewUrl} 
                alt="Document Preview" 
                className="h-full w-full object-contain"
            />
        </div>
        <div className="bg-gray-50 px-4 py-2 text-xs text-gray-500 flex justify-between items-center">
            <span className="truncate max-w-[200px]">{selectedFile.name}</span>
            <span>{(selectedFile.size / 1024).toFixed(1)} KB</span>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => fileInputRef.current?.click()}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={`group relative flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 transition-all hover:border-indigo-400 hover:bg-indigo-50 ${isAnalyzing ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={isAnalyzing}
        className="hidden"
      />
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="rounded-full bg-indigo-100 p-4 text-indigo-600 group-hover:scale-110 transition-transform duration-300">
          <Upload size={32} />
        </div>
        <div className="px-4">
          <p className="text-lg font-semibold text-gray-700">
            Click or drag to upload
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Supports JPG, PNG, WEBP
          </p>
        </div>
      </div>
    </div>
  );
};