
import React from 'react';

interface HtmlPreviewProps {
  htmlContent: string;
}

export const HtmlPreview: React.FC<HtmlPreviewProps> = ({ htmlContent }) => {
  return (
    <div className="w-full h-full bg-white rounded-lg overflow-hidden border border-gray-700 shadow-lg flex-grow">
      <iframe
        srcDoc={htmlContent}
        title="Live HTML Preview"
        className="w-full h-full border-0"
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
};
