![ink-text-autocomplete demo](https://res.cloudinary.com/de2rfv7q2/image/upload/v1748621734/n7jnnldbnvbwch6u1u9p.gif)

# ink-text-autocomplete

An Ink component for adding autocomplete functionality to text inputs in command-line interfaces. Built with React and Ink.

## Installation

Install the package using npm, yarn, or pnpm:

```bash
npm install ink-text-autocomplete
# or yarn add ink-text-autocomplete
# or pnpm add ink-text-autocomplete
```

This package has `react`, `ink`, and `ink-text-input` as peer dependencies. Make sure you have them installed in your project.

```bash
npm install react ink ink-text-input
```

## Usage

Here's a basic example of how to use the `AutoComplete` component in your Ink application:

```tsx
import React, { useState } from 'react';
import { render, Text } from 'ink';
import AutoComplete from 'ink-text-autocomplete';

const Example = () => {
  const [selected, setSelected] = useState<string | null>(null);

  const suggestions = ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig'];

  return (
    <>
      <AutoComplete
        suggestions={suggestions}
        onSelect={suggestion => {
          setSelected(suggestion);
          console.log('Selected:', suggestion); // Log outside Ink render
        }}
        placeholder="Enter a fruit..."
      />
      {selected && <Text>You selected: {selected}</Text>}
    </>
  );
};

render(<Example />);
```

## Props

| Prop              | Type                               | Default         | Description                                                                 |
| :---------------- | :--------------------------------- | :-------------- | :-------------------------------------------------------------------------- |
| `suggestions`     | `string[] \| (() => string[])`     | Required        | An array of possible suggestions or a function returning an array.          |
| `onSelect`        | `(suggestion: string) => void`     | Required        | Callback function invoked when a suggestion is selected or input is submitted. |
| `activationKey`   | `string`                           | `"tab"`         | The key that toggles the suggestion list visibility and cycles suggestions. |
| `selectKey`       | `string`                           | `" "`           | The key that selects the currently highlighted suggestion.                    |
| `placeholder`     | `string`                           | `"Type something..."` | Placeholder text for the text input.                                        |
| `multiWord`       | `boolean`                          | `true`          | If `true`, autocomplete applies only to the last word typed. If `false`, it applies to the whole input. |
| `submitKey`       | `string`                           | `"enter"`       | The key that submits the current input value via `onSelect`.              |
| `suggestionProps` | `(suggestion: string, isHighlighted: boolean) => TextProps` | `undefined`     | Optional function to customize the `Text` component props for each suggestion. |

## Development

If you wish to contribute or build the library locally:

To install dependencies:

```bash
bun install
```

To run the example (requires `bun install` first):

```bash
bun dev
```

To build the library:

```bash
bun build
```

This project uses Bun for development scripts. It was created using `bun init` in bun v1.2.13. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

## License

[MIT License](LICENSE) (Commonly used for Ink components, add LICENSE file if applicable)
