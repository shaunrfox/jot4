import * as React from "react";
import { useNavigate } from "@remix-run/react";
import { useRef, useEffect, useState } from "react";
import { StyleProps, themeHelper } from "~/utils/styled";
import Box, { BoxProps } from "~/components/Box";
import { useDebounce } from "~/hooks/use-debounce";
import Heading from "~/components/Heading";
import Text from "~/components/Text";
import styled from "@emotion/styled";
import { Input, InputProps } from "./Input";

interface CommandProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export type CommandBarProps = BoxProps & {
  styleProps?: StyleProps;
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
};

interface SearchResult {
  id: { $oid: string };
  title: string;
  content: string;
  updatedAt: string;
}

const CommandBarDialog = styled(Box)<BoxProps>(({ ...props }) =>
  themeHelper({
    position: "fixed",
    top: "10%",
    left: "50%",
    transform: "translateX(-50%)",
    width: "100%",
    maxWidth: "500px",
    background: "gray.0",
    borderRadius: 4,
    overflow: "hidden",
    boxShadow: "low_dark",
    zIndex: 1000,
  })(props),
);

const Skrim = styled(Box)<BoxProps>(({ ...props }) =>
  themeHelper({
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "gray.90",
    opacity: 0.5,
    zIndex: 999,
  })(props),
);

const CommandBarInput = styled(Box.withComponent("input"))<InputProps>(
  ({ ...props }) =>
    themeHelper({
      width: "100%",
      py: 6,
      px: 8,
      fontSize: 4,
      border: "none",
      borderBottom: "1px solid",
      borderColor: "gray.20",
      outline: "none",
      fontFamily: "default",
      backgroundColor: "gray.0",
      m: 0,
    })(props),
);

export function CommandBarWrapper({ isOpen, onClose, children }: CommandProps) {
  if (!isOpen) return null;

  return (
    <>
      <Skrim onClick={onClose} />
      <CommandBarDialog>{children}</CommandBarDialog>
    </>
  );
}

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

const highlightTextMatch = (text: string, highlight: string) => {
  if (!highlight.trim()) {
    return <span>{text}</span>;
  }
  const regex = new RegExp(`(${highlight})`, "gi");
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <Box
            as="span"
            key={i}
            sx={{
              backgroundColor: "yellow.10",
              fontWeight: "bold",
              color: "gray.90",
            }}
          >
            {part}
          </Box>
        ) : (
          part
        ),
      )}
    </>
  );
};

export const CommandBar = ({ isOpen, setOpen }: CommandBarProps) => {
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

  // open the command bar with cmd+k
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!isOpen);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [isOpen, setOpen]);

  // search the pages
  useEffect(() => {
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

  // focus the input when the command bar opens
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

  // reset the selected index when the results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [results]);

  // scroll the selected result into view
  useEffect(() => {
    if (results.length > 0) {
      resultRefs.current[selectedIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedIndex, results]);

  // handle the keyboard events for navigating the results
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // let testId;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prevIndex) =>
          prevIndex < results.length - 1 ? prevIndex + 1 : prevIndex,
        );
        // testId = results[selectedIndex].id;
        // console.log("selectedIndex", selectedIndex);
        // console.log("result ID", testId);
        // console.log("ID type", typeof testId);
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : prevIndex,
        );
        // testId = results[selectedIndex].id;
        // console.log("selectedIndex", selectedIndex);
        // console.log("result ID", testId);
        // console.log("ID type", typeof testId);
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

  // navigate to the page when a result is clicked
  const handleResultClick = (result: SearchResult) => {
    setOpen(false);
    const id = result.id.$oid;
    navigate(`/page/${id}`);
  };

  return (
    <CommandBarWrapper isOpen={isOpen} onClose={() => setOpen(false)}>
      <CommandBarInput
        ref={inputRef}
        placeholder="Search pages..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        aria-label="Search pages"
      />
      <Box
        as="ul"
        aria-label="Search results"
        sx={{
          maxHeight: "300px",
          overflowY: "auto",
          backgroundColor: "gray.10",
          listStyle: "none",
          p: 0,
          m: 0,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          li: {
            py: 6,
            px: 8,
          },
        }}
      >
        {results.length === 0 && query !== "" && (
          <Box
            as="li"
            sx={{
              color: "gray.40",
              fontSize: 2.5,
              textAlign: "center",
              backgroundColor: "gray.3",
            }}
          >
            No results found for &quot;
            <Box
              as="span"
              sx={{
                backgroundColor: "yellow.10",
                fontWeight: "bold",
                color: "gray.90",
              }}
            >
              {query}
            </Box>
            &quot;
          </Box>
        )}
        {results.map((result, index) => (
          <Box
            as="li"
            key={`${result.id}-${index}`}
            onClick={() => handleResultClick(result)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleResultClick(result);
              }
            }}
            ref={(el) => (resultRefs.current[index] = el)}
            tabIndex={0}
            sx={{
              backgroundColor: index === selectedIndex ? "gray.5" : "gray.0",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "blue.5",
              },
            }}
          >
            <Heading level={3}>
              {highlightTextMatch(result.title, query)}
            </Heading>
            <Text
              level={2.5}
              sx={{
                color: "gray.40",
              }}
            >
              {highlightTextMatch(result.content.substring(0, 100), query)}...
            </Text>
          </Box>
        ))}
      </Box>
    </CommandBarWrapper>
  );
};
