// @ts-nocheck
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const StyledMarkdown = styled('div')(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  lineHeight: 1.6,
  '& h1': {
    ...theme.typography.h4,
    margin: theme.spacing(2, 0),
  },
  '& h2': {
    ...theme.typography.h5,
    margin: theme.spacing(1.5, 0),
  },
  '& h3': {
    ...theme.typography.h6,
    margin: theme.spacing(1, 0),
  },
  '& p': {
    ...theme.typography.body1,
    margin: theme.spacing(1, 0),
  },
  '& ul': {
    listStyleType: 'disc',
    paddingLeft: theme.spacing(4),
    margin: theme.spacing(1, 0),
  },
  '& li': {
    ...theme.typography.body1,
    marginBottom: theme.spacing(0.5),
  },
  '& a': {
    color: theme.palette.primary.main,
    textDecoration: 'underline',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  '& code': {
    fontFamily: theme.typography.fontFamilyMono,
    backgroundColor: theme.palette.action.hover,
    padding: theme.spacing(0.2, 0.4),
    borderRadius: theme.shape.borderRadius,
  },
}));

const MarkdownRenderer: React.FC<{ markdown: string }> = ({ markdown }) => {
  return (
    <StyledMarkdown style={{marginLeft:10}}>
      <ReactMarkdown
        components={{
          h1: ({ node, ...props }) => <Typography variant="h4" gutterBottom {...props} />,
          h2: ({ node, ...props }) => <Typography variant="h5" gutterBottom {...props} />,
          h3: ({ node, ...props }) => <Typography variant="h6" gutterBottom {...props} />,
          p: ({ node, ...props }) => <Typography variant="body1" {...props} />,
          a: ({ node, ...props }) => <Link {...props} />,
          li: ({ node, ...props }) => <li {...props} />,
          code: ({ node, inline, ...props }) => (
            <Typography
              component="code"
              variant="body2"
              sx={{
                fontFamily: 'Monospace',
                backgroundColor: 'action.hover',
                padding: '2px 4px',
                borderRadius: 1,
              }}
              {...props}
            />
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </StyledMarkdown>
  );
};

export default MarkdownRenderer;
