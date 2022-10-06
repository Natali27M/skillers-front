import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {docco, monokai, atomOneDark, androidstudio} from 'react-syntax-highlighter/dist/esm/styles/hljs';

const CodeSnippet = ({data}) => {
    return (
        <SyntaxHighlighter language="java" style={androidstudio} showLineNumbers={true}>
            {data}
        </SyntaxHighlighter>
    );
};

export {CodeSnippet};