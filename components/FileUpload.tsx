
import React, { useRef } from 'react';
import { UploadIcon } from './icons';

interface FileUploadProps {
  onFileLoad: (content: string, fileName: string) => void;
  isLoading: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileLoad, isLoading }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        onFileLoad(text, file.name);
      };
      reader.readAsText(file);
    }
    // Reset file input to allow uploading the same file again
    event.target.value = '';
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".html"
        className="hidden"
        disabled={isLoading}
      />
      <button
        onClick={handleClick}
        disabled={isLoading}
        className="bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-500 text-white font-bold py-3 px-6 rounded-lg flex items-center gap-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-900"
      >
        <UploadIcon className="h-5 w-5" />
        <span>Upload HTML File</span>
      </button>
    </div>
  );
};
