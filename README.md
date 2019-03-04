# <kwc-color-picker>

Tile based color picker with customizable palette

 - What is it called?
     - kwc-color-picker
 - What is it made out of?
     - A set of colored tiles that when clicked, provides a selected value
 - What variants are needed?
     - Idle: hover styling is still here, but no selection is possible
     - Tiles: Different sizes and margin between them
 - How does it scale?
     - Tiles size are defined in pixels, and the rowSize defines the total width
 - What style variables are in use?
     - Colors: The list of colors available for selection
     - Outline: Can customize the style of the outline when over a light or dark color
- Anything to keep in mind?
     - If the display state of the element changes (i.e. it gets hidden/unhidden), you need to call notifyResize, otherwise the element will not properly render.
     - When the selected colour changes, the highlighting only animates if the Web Animations API is supported by the browser. To make the feature work in all browsers, use a [polyfill](https://github.com/web-animations/web-animations-js).

## Installation

```
yarn add @kano/kwc-color-picker
```

## Usage

```
import '@kano/kwc-color-picker/kwc-color-picker.js';

const tpl = html`
    <kwc-color-picker></kwc-color-picker>
`;
```
## API

## Development

Clone this repository and install the dependencies with `yarn`

Serve the demo with

```
yarn serve
```

Serve the tests with

```
yarn serve-test
```
