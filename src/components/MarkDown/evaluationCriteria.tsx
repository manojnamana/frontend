import React from "react";
import remarkGfm from 'remark-gfm';
import { unified } from 'unified';
import markdown from 'remark-parse';
import remarkHtml from 'remark-html';
import { Stack } from "@mui/material";

const EvaluteMarkDown: React.FC<{ markdownStr: any }> = ({ markdownStr }) => {
  const convertMarkdownToHtml = (markdownStr: string) => {
    const htmlContent = unified()
      .use(markdown)
      .use(remarkGfm)  
      .use(remarkHtml)
      .processSync(markdownStr)
      .toString();
    return htmlContent;
  };

  const html = convertMarkdownToHtml(markdownStr);

  return (
    <Stack ml={1}>

        {/* Render the parsed HTML content */}
        <div
          className="prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: html }}
        />

    </Stack>
  );
};

export default EvaluteMarkDown;
