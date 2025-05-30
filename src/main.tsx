import React, { useState, useEffect, useMemo } from "react";
import { Box, Text, useInput, type TextProps } from "ink";
import TextInput from "ink-text-input";

export type AutoCompleteProps = {
  suggestions: string[] | (() => string[]);
  onSelect: (suggestion: string) => void;
  activationKey?: string;
  selectKey?: string;
  placeholder?: string;
  multiWord?: boolean;
  submitKey?: string;
  onComplete?: () => void;
  suggestionProps?: (suggestion: string, isHighlighted: boolean) => TextProps;
};

const AutoComplete = ({
  suggestions,
  onSelect,
  onComplete,
  selectKey = " ",
  activationKey = "tab",
  placeholder = "Type something...",
  multiWord = true,
  suggestionProps,
  submitKey = "enter",
}: AutoCompleteProps) => {
  const [query, setQuery] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [isSuggestionVisible, setIsSuggestionVisible] = useState(false);

  const suggestionList = useMemo(
    () => (typeof suggestions === "function" ? suggestions() : suggestions),
    [suggestions],
  );

  useEffect(() => {
    if (!isSuggestionVisible || query.trim() === "") {
      setFilteredSuggestions([]);
      setHighlightedIndex(-1);
      return;
    }
    const target = multiWord ? query.split(/\s+/).pop() || "" : query;
    const filtered = suggestionList.filter((item) =>
      item.toLowerCase().startsWith(target.toLowerCase()),
    );
    setFilteredSuggestions(filtered);
    setHighlightedIndex(filtered.length > 0 ? 0 : -1);
  }, [query, isSuggestionVisible, suggestionList, multiWord]);

  const applySuggestion = (s: string) => {
    const parts = multiWord ? query.match(/^(.*\s)?(?:\S+)?$/) : null;
    const newQuery = multiWord ? `${parts?.[1] || ""}${s} ` : s;

    setQuery(newQuery);
    onSelect(s);
    setFilteredSuggestions([]);
    setHighlightedIndex(-1);
    setIsSuggestionVisible(false);
  };

  useInput((input, key) => {
    if (key.return || (submitKey && input === submitKey)) {
      onSelect(query);
      onComplete?.();
      setIsSuggestionVisible(false);
      return;
    }

    if (key[activationKey as keyof typeof key]) {
      if (!isSuggestionVisible) {
        setIsSuggestionVisible(true);
      } else if (filteredSuggestions.length > 0) {
        setHighlightedIndex((prev) =>
          prev < filteredSuggestions.length - 1 ? prev + 1 : 0,
        );
      }
      return;
    }

    if (!isSuggestionVisible) return;
    if (input === selectKey) {
      if (highlightedIndex !== -1 && filteredSuggestions[highlightedIndex]) {
        applySuggestion(filteredSuggestions[highlightedIndex]);
      }
      return;
    }
    if (key.escape) {
      setIsSuggestionVisible(false);
      return;
    }
    if (key.upArrow) {
      if (filteredSuggestions.length > 0) {
        setHighlightedIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : filteredSuggestions.length - 1,
        );
      }
      return;
    } else if (key.downArrow) {
      if (filteredSuggestions.length > 0) {
        setHighlightedIndex((prevIndex) =>
          prevIndex < filteredSuggestions.length - 1 ? prevIndex + 1 : 0,
        );
      }
      return;
    }
  });
  return (
    <Box flexDirection="column">
      <Box marginRight={1}>
        <TextInput
          key={query}
          value={query}
          onChange={setQuery}
          placeholder={placeholder}
          focus
        />
      </Box>
      {isSuggestionVisible && filteredSuggestions.length > 0 && (
        <Box flexDirection="row" gap={1} flexWrap="wrap" marginLeft={2}>
          {filteredSuggestions.map((suggestion, index) => {
            const isHighlighted = index === highlightedIndex;
            const customProps = suggestionProps
              ? suggestionProps(suggestion, isHighlighted)
              : {};
            return (
              <Box
                key={suggestion + index}
                borderColor={isHighlighted ? "cyan" : undefined}
                paddingX={1}
              >
                <Text
                  {...customProps}
                  backgroundColor={isHighlighted ? "blue" : ""}
                  color={isHighlighted ? "black" : customProps.color || "white"}
                >
                  {suggestion}
                </Text>
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default AutoComplete;
