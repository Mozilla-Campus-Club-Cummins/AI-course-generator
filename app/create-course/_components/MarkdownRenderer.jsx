import React from 'react';

// This component takes a string of Markdown and converts it into styled HTML elements.
const MarkdownRenderer = ({ content }) => {
  if (!content) {
    return <p className="text-gray-500">No content to display.</p>;
  }

  // This is a simple parser that converts each line of Markdown into the correct HTML tag.
  const renderLine = (line, index) => {
    // Matches H1: # Title
    if (line.startsWith('# ')) {
      return <h1 key={index} className="text-4xl font-extrabold mt-8 mb-4">{line.substring(2)}</h1>;
    }
    // Matches H2: ## Subtitle
    if (line.startsWith('## ')) {
      return <h2 key={index} className="text-3xl font-bold mt-6 mb-3 border-b pb-2">{line.substring(3)}</h2>;
    }
    // Matches H3: ### Section
     if (line.startsWith('### ')) {
      return <h3 key={index} className="text-2xl font-semibold mt-5 mb-2">{line.substring(4)}</h3>;
    }
    // Matches bold text: **Bold**
    if (line.startsWith('**')) {
      return <p key={index} className="font-bold my-4 text-lg">{line.replace(/\*\*/g, '')}</p>;
    }
    // Matches list items: * Item or 1. Item
    if (line.startsWith('* ') || /^\d+\.\s/.test(line)) {
        const content = line.startsWith('* ') ? line.substring(2) : line.replace(/^\d+\.\s/, '');
        return <li key={index} className="ml-6 list-disc">{content}</li>;
    }
    // Matches a horizontal rule: ---
    if (line.trim() === '---') {
        return <hr key={index} className="my-8" />;
    }
    // Handles empty lines as breaks
    if (line.trim() === '') {
      return <br key={index} />;
    }
    // Treats anything else as a standard paragraph
    return <p key={index} className="my-3 leading-relaxed">{line}</p>;
  };

  return (
    <div className="prose max-w-none text-left">
      {content.split('\n').map(renderLine)}
    </div>
  );
};

export default MarkdownRenderer;
