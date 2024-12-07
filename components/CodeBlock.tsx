import React from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import { Box } from '@mui/material';

interface CodeBlockProps {
  language: string;
  value: string;
}

export default function CodeBlock({ language, value }: CodeBlockProps) {
  return (
    <Highlight
      theme={themes.nightOwl}
      code={value}
      language={language}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Box
          component="pre"
          sx={{
            p: 2,
            borderRadius: 1,
            overflow: 'auto',
            fontSize: '0.9rem',
            lineHeight: 1.5,
            ...style
          }}
          className={className}
        >
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              <span style={{ opacity: 0.5, marginRight: '1em' }}>{i + 1}</span>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </Box>
      )}
    </Highlight>
  );
} 