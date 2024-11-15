// RichTextInput.tsx
import React, { useState } from 'react';

interface RichTextInputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}

interface FormatButton {
  label: string;
  isActive: boolean;
  onClick: () => void;
  className: string;
}

const RichTextInput: React.FC<RichTextInputProps> = ({
  label,
  value,
  onChange,
  placeholder = "Enter your text",
  required = false,
}) => {
  const [isBold, setIsBold] = useState<boolean>(false);
  const [isItalic, setIsItalic] = useState<boolean>(false);
  const [isUnderline, setIsUnderline] = useState<boolean>(false);

  const formatButtons: FormatButton[] = [
    {
      label: 'B',
      isActive: isBold,
      onClick: () => setIsBold(!isBold),
      className: 'font-bold'
    },
    {
      label: 'I',
      isActive: isItalic,
      onClick: () => setIsItalic(!isItalic),
      className: 'italic'
    },
    {
      label: 'U',
      isActive: isUnderline,
      onClick: () => setIsUnderline(!isUnderline),
      className: 'underline'
    }
  ];

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="w-full space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center gap-1 p-2 bg-white border-b border-gray-300">
          <div className="flex items-center gap-1">
            <select 
              className="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                // Handle font change
              }}
            >
              <option>Open Sans</option>
              <option>Arial</option>
              <option>Times New Roman</option>
            </select>
            
            {formatButtons.map((button, index) => (
              <button
                key={index}
                onClick={button.onClick}
                type="button"
                className={`
                  px-3 py-1 text-sm border border-gray-300 rounded
                  ${button.isActive ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'}
                  ${button.className}
                `}
              >
                {button.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 ml-2 border-l border-gray-300 pl-2">
            {/* Alignment Buttons */}
            {['left', 'center', 'right'].map((align) => (
              <button
                key={align}
                type="button"
                className="p-1 hover:bg-gray-50 rounded"
                onClick={() => {
                  // Handle alignment
                }}
              >
                <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  {align === 'left' && <path d="M4 6h16M4 12h10M4 18h16" />}
                  {align === 'center' && <path d="M4 6h16M4 12h16M4 18h16" />}
                  {align === 'right' && <path d="M4 6h16M8 12h12M4 18h16" />}
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* Text Area */}
        <textarea
          value={value}
          onChange={handleTextChange}
          placeholder={placeholder}
          className={`
            w-full h-64 p-4 text-gray-700 resize-none focus:outline-none
            ${isBold ? 'font-bold' : ''}
            ${isItalic ? 'italic' : ''}
            ${isUnderline ? 'underline' : ''}
          `}
        />
      </div>
    </div>
  );
};

export default RichTextInput;