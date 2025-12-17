'use client';

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import styled from 'styled-components';

import style from './style';

interface CodeBlockProps {
  className?: string;
  language: string;
  children: string;
}

function CodeBlock({ className, language, children }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className={className}>
      <button
        className="copy-button"
        data-copied={copied}
        onClick={handleCopy}
        type="button"
      >
        {copied ? '✓ Copied!' : 'Copy'}
      </button>
      <SyntaxHighlighter
        customStyle={{
          margin: 0,
          padding: 0,
          borderRadius: '12px',
          background: 'inherit',
        }}
        language={language}
        style={oneLight}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
}

export default styled(CodeBlock)`
  ${style}
`;
