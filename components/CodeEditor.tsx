
import React from 'react';

interface CodeEditorProps {
  code: string;
  onCodeChange: (newCode: string) => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ code, onCodeChange }) => {
  return (
    <div className="w-full h-full flex-grow flex flex-col bg-gray-800 rounded-lg border border-gray-700 shadow-lg">
      <textarea
        value={code}
        onChange={(e) => onCodeChange(e.target.value)}
        className="w-full h-full bg-transparent text-gray-300 font-mono text-sm p-4 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 flex-grow"
        placeholder="HTML code will appear here..."
        spellCheck="false"
      />
    </div>
  );
};
