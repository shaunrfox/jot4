import * as React from "react";
import { useNavigate } from "@remix-run/react";
import { useRef, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { StyleProps } from "~/utils/styled";
import Box, { BoxProps } from "~/components/Box";
import { Command } from "./command";
import { useDebounce } from "~/hooks/use-debounce";

export type SearchCommandProps = BoxProps & {
  styleProps?: StyleProps;
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
};

interface SearchResult {
  id: string;
  title: string;
  content: string;
}

const SearchButton = styled.button`
  position: fixed;
  right: 20px;
  bottom: 20px;
  background-color: #4a5568;
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);

  &:hover {
    background-color: #2d3748;
  }
`;

const ResultTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
`;

const ResultContent = styled.p`
  margin: 4px 0 0;
  font-size: 14px;
  color: #718096;
`;

const extractTextFromContent = (content: any): string => {
  if (typeof content === "string") return content;
  if (typeof content === "object" && content !== null) {
    if (Array.isArray(content.content)) {
      return content.content.map(extractTextFromContent).join(" ");
    }
    if (typeof content.text === "string") return content.text;
  }
  return "";
};

const HighlightedText = styled.span`
  background-color: yellow;
  font-weight: bold;
`;

const highlightText = (text: string, highlight: string) => {
  if (!highlight.trim()) {
    return <span>{text}</span>;
  }
  const regex = new RegExp(`(${highlight})`, "gi");
  const parts = text.split(regex);
  return (
    <span>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <HighlightedText key={i}>{part}</HighlightedText>
        ) : (
          part
        ),
      )}
    </span>
  );
};

export type SearchCommandProps = BoxProps & {
  styleProps?: StyleProps;
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
};

export function SearchCommand({ isOpen, setOpen }: SearchCommandProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultRefs = useRef<(HTMLDivElement | null)[]>([]);

  // clear the query when the search opens
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!isOpen);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [isOpen, setOpen]);

  React.useEffect(() => {
    if (debouncedQuery.length === 0) {
      setResults([]);
      return;
    }

    const searchPages = async () => {
      try {
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(debouncedQuery)}`,
        );
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Network response was not ok: ${errorText}`);
        }
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }

        // Process the content if it is in Tiptap's JSON format
        const processedResults = data.results.map((result: any) => ({
          ...result,
          content: extractTextFromContent(result.content),
        }));

        setResults(processedResults);
        console.log("processedResults", processedResults);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setResults([]);
      }
    };

    searchPages();
  }, [debouncedQuery]);

  useEffect(() => {
    if (isOpen) {
      // Focus the input when the command palette opens
      inputRef.current?.focus();
      // Announce to screen readers
      const announcement = document.createElement("div");
      announcement.textContent =
        "Search interface opened. Type to search pages.";
      announcement.setAttribute("aria-live", "polite");
      document.body.appendChild(announcement);

      // Remove the announcement after it's been read
      setTimeout(() => {
        document.body.removeChild(announcement);
      }, 1000);
    }
  }, [isOpen]);

  useEffect(() => {
    // Reset selected index when results change
    setSelectedIndex(0);
  }, [results]);

  useEffect(() => {
    if (results.length > 0) {
      resultRefs.current[selectedIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedIndex, results]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    let testId;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prevIndex) =>
          prevIndex < results.length - 1 ? prevIndex + 1 : prevIndex,
        );
        testId = results[selectedIndex].id;
        console.log("selectedIndex", selectedIndex);
        console.log("result ID", testId);
        console.log("ID type", typeof testId);
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : prevIndex,
        );
        testId = results[selectedIndex].id;
        console.log("selectedIndex", selectedIndex);
        console.log("result ID", testId);
        console.log("ID type", typeof testId);
        break;
      case "Enter":
        e.preventDefault();
        if (results[selectedIndex]) {
          handleResultClick(results[selectedIndex]);
        }
        break;
      case "Escape":
        setOpen(false);
        break;
    }
  };

  const handleResultClick = (result: SearchResult) => {
    setOpen(false);
    navigate(`/page/${result.id.$oid}`);
  };

  return (
    <Command isOpen={isOpen} onClose={() => setOpen(false)}>
      <Command.Input
        ref={inputRef}
        placeholder="Search pages..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        aria-label="Search pages"
      />
      <Command.List>
        {results.length === 0 && query !== "" && (
          <Command.Empty>No results found.</Command.Empty>
        )}
        {results.map((result, index) => (
          <Command.Item
            key={`${result.id}-${index}`}
            onClick={() => handleResultClick(result)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleResultClick(result);
              }
            }}
            ref={(el) => (resultRefs.current[index] = el)}
            tabIndex={0}
            style={{
              backgroundColor:
                index === selectedIndex ? "rgba(0, 0, 0, 0.1)" : "transparent",
              cursor: "pointer",
            }}
          >
            <div>
              <ResultTitle>{highlightText(result.title, query)}</ResultTitle>
              <ResultContent>
                {highlightText(result.content.substring(0, 100), query)}...
              </ResultContent>
            </div>
          </Command.Item>
        ))}
      </Command.List>
    </Command>
  );
}

// Helper function to extract text from Tiptap content
function extractTextFromTiptapContent(content) {
  // Implement the logic to extract text from Tiptap's JSON content
  // This is a simplified example and may need to be adjusted based on your content structure
  let text = "";
  content.content.forEach((node) => {
    if (node.type === "text") {
      text += node.text;
    } else if (node.content) {
      text += extractTextFromTiptapContent(node);
    }
  });
  return text;
}
