import React from 'react';
import { FileUpload } from './FileUpload';
import { SparklesIcon } from './icons';

interface PromptControlsProps {
  prompt: string;
  onPromptChange: (newPrompt: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  onFileLoad: (content: string, fileName: string) => void;
  fileName: string;
}

export const PromptControls: React.FC<PromptControlsProps> = ({
  prompt,
  onPromptChange,
  onSubmit,
  isLoading,
  onFileLoad,
  fileName,
}) => {
  return (
    <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
            <h2 className="text-lg font-semibold text-gray-300">Controls</h2>
            <p className="text-sm text-gray-400 truncate max-w-xs">File: {fileName}</p>
        </div>
        <FileUpload onFileLoad={onFileLoad} isLoading={isLoading} />
      </div>

      <textarea
        value={prompt}
        onChange={(e) => onPromptChange(e.target.value)}
        // FIX: Removed double quotes within the placeholder string to fix a strange parsing error where "Welcome" was being interpreted as a JSX property.
        placeholder="Tell the AI what changes to make... e.g., 'Change the heading to say Welcome and make the button color blue.'"
        className="w-full h-32 bg-gray-900/70 border border-gray-600 rounded-lg p-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none transition-colors"
        disabled={isLoading}
      />
      <button
        onClick={onSubmit}
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-900"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </>
        ) : (
          <>
            <SparklesIcon className="h-5 w-5" />
            Generate Edits
          </>
        )}
      </button>
    </div>
  );
};