import React, { useState } from "react";
import { render, Text } from "ink";
import AutoComplete from "../main";

const fruits = ["banana", "blueberry", "blackberry", "cherry", "clementine"];

const App = () => {
  const [done, setDone] = useState(false);
  const [fruit, setFruit] = useState("");
  const handleSelect = (selected: string) => {
    console.log(`You selected: ${selected}`);
    setFruit(selected);
  };

  return (
    <>
      <Text>Fruit Picker:{fruit}</Text>
      {!done ? (
        <AutoComplete
          suggestions={fruits}
          onSelect={handleSelect}
          onComplete={() => setDone(true)}
          placeholder="Type a fruit..."
          activationKey="tab"
          selectKey=" "
          multiWord={true}
        />
      ) : (
        <Text>Done 🎉</Text>
      )}
    </>
  );
};

render(<App />);
