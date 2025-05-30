import React, { useState } from "react";
import { render, type Text } from "ink";
import { AutoComplete } from "../src";

const Example = () => {
  const [selected, setSelected] = useState<string | null>(null);

  const suggestions = [
    "apple",
    "banana",
    "cherry",
    "date",
    "elderberry",
    "fig",
  ];

  return (
    <>
      <AutoComplete
        suggestions={suggestions}
        onSelect={(suggestion) => {
          setSelected(suggestion);
          console.log("Selected:", suggestion); // Log outside Ink render
        }}
        placeholder="Enter a fruit..."
      />
      {selected && <Text>You selected: {selected}</Text>}
    </>
  );
};

render(<Example />);
