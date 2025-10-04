import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

const MarkdownRenderer = ({ content }) => {
  if (!content) {
    return <p className="text-gray-500">No content to display.</p>;
  }

  // Define custom components for rendering specific Markdown elements
  const components = {
    // Custom rendering for code blocks with syntax highlighting
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter
          style={vscDarkPlus} // You can change the theme here
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
    // Custom rendering for lists to match your design
    ul: ({ children }) => <ul className="list-disc ml-6">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal ml-6">{children}</ol>,
    li: ({ children }) => <li className="my-1 leading-relaxed">{children}</li>,
    h1: ({ children }) => <h1 className="text-4xl font-extrabold mt-8 mb-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl font-bold mt-6 mb-3 border-b pb-2">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-semibold mt-5 mb-2">{children}</h3>,
    p: ({ children }) => <p className="my-3 leading-relaxed">{children}</p>,
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
  };

  return (
    <div className="prose max-w-none text-left">
      <ReactMarkdown
        components={components}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
