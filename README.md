# Figma gradient to Tailwind CSS

 <p align="center">
    This project is a simple function that takes a background string you get when inspecting a gradient in figma and converts it to a JIT background class for Tailwind CSS. 
    <br />
    <br />
</p>

[![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)
[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)

<img src="./images/figma-string.png" width='auto' height='800' style='object-fit: contain' >

<br>

### Installation

```bash
npm install figma-gradient-to-tailwind
yarn add figma-gradient-to-tailwind
pnpm add figma-gradient-to-tailwind
```

<br>

### Usage

```js
import { format } from 'figma-gradient-to-tailwind';

const figmaGradient =
  'background: linear-gradient(180deg, #FFFFFF 0%, #000000 100%);';
const fomattedClassName = format(figmaGradient);

// RESULT: bg-[linear-gradient(180deg,#FFFFFF_0%,#000000_100%)]
```

### Support

This package supports the following gradient types:

- linear-gradient
- radial-gradient
- conic-gradient

You can also have a string which chain multiple gradients together:

```js
const figmaGradient =
  'background: linear-gradient(180deg, #FFFFFF 0%, #000000 100%), radial-gradient(50% 50% at 50% 50%, #FFFFFF 0%, #000000 100%);';
```
