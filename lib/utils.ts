import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Define types for our code fence functions
interface Filename {
  name: string;
  extension: string;
}

interface TextPart {
  type: "text";
  content: string;
}

interface FirstCodeFencePart {
  type: "first-code-fence";
  content: string;
  language: string;
  filename: Filename;
}

interface FirstCodeFenceGeneratingPart {
  type: "first-code-fence-generating";
  content: string;
  language: string;
  filename: Filename;
}

type CodeFencePart = TextPart | FirstCodeFencePart | FirstCodeFenceGeneratingPart;

interface CodeBlock {
  code: string;
  language: string;
  filename?: Filename;
}

/**
 * Extracts the first code block from a markdown string
 */
export function extractFirstCodeBlock(content: string): CodeBlock | undefined {
  // Match code blocks with language specification and optional filename
  const codeBlockRegex = /```([a-zA-Z]+)\{filename=([^.]+)\.([a-zA-Z0-9]+)\}([\s\S]*?)```/;

  const match = content.match(codeBlockRegex);
  if (match) {
    return {
      code: match[4].trim(),
      language: match[1],
      filename: {
        name: match[2],
        extension: match[3],
      },
    };
  }

  // Fallback to match code blocks without filename
  const simpleCodeBlockRegex = /```([a-zA-Z]+)([\s\S]*?)```/;
  const simpleMatch = content.match(simpleCodeBlockRegex);
  if (simpleMatch) {
    return {
      code: simpleMatch[2].trim(),
      language: simpleMatch[1],
    };
  }

  return undefined;
}

/**
 * Splits content by the first code fence, identifying if it's generating or complete
 */
export function splitByFirstCodeFence(content: string): CodeFencePart[] {
  // Check if the content is still generating (ends without closing fence)
  const generatingRegex = /```([a-zA-Z]+)\{filename=([^.]+)\.([a-zA-Z0-9]+)\}([\s\S]*)$/;
  const generatingMatch = content.match(generatingRegex);
  
  if (generatingMatch && generatingMatch.index !== undefined) {
    const beforeGenerating = content.substring(0, generatingMatch.index);
    const result: CodeFencePart[] = [];
    
    if (beforeGenerating) {
      result.push({
        type: "text",
        content: beforeGenerating,
      });
    }
    
    result.push({
      type: "first-code-fence-generating",
      content: generatingMatch[4],
      language: generatingMatch[1],
      filename: {
        name: generatingMatch[2],
        extension: generatingMatch[3],
      },
    });
    
    return result;
  }
  
  // Check for complete code fence
  const completeRegex = /```([a-zA-Z]+)\{filename=([^.]+)\.([a-zA-Z0-9]+)\}([\s\S]*?)```/;
  const completeMatch = content.match(completeRegex);
  
  if (completeMatch && completeMatch.index !== undefined) {
    const beforeComplete = content.substring(0, completeMatch.index);
    const afterComplete = content.substring(completeMatch.index + completeMatch[0].length);
    
    const result: CodeFencePart[] = [];
    
    if (beforeComplete) {
      result.push({
        type: "text",
        content: beforeComplete,
      });
    }
    
    result.push({
      type: "first-code-fence",
      content: completeMatch[4],
      language: completeMatch[1],
      filename: {
        name: completeMatch[2],
        extension: completeMatch[3],
      },
    });
    
    if (afterComplete) {
      result.push({
        type: "text",
        content: afterComplete,
      });
    }
    
    return result;
  }
  
  // No code fence found, return entire content as text
  return [
    {
      type: "text",
      content,
    },
  ];
}