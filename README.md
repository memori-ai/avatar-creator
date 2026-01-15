# @memori.ai/avatar-creator

A simple avatar creator component for [AIsuru](https://www.aisuru.com).

## Installation

```sh
npm i @memori.ai/avatar-creator
```

## Usage

Import the component and its styles:

```ts
import AvatarCreator from '@memori.ai/avatar-creator';
import '@memori.ai/avatar-creator/style.css';
```

Use it in your React application:

```jsx
<AvatarCreator avatars={avatars} lang="en" onSelect={console.log} />
```

### Props

```ts
interface Avatars {
  FEMALE: string[]
  MALE: string[]
}
```

| Name | Type | Description |
| --- | --- | --- |
| avatars | `Avatars` | Array of avatars to choose from, divided by gender |
| lang | string | Language code for the component (`en` or `it`) |
| onSelect | (avatarURL: string) => void | Callback function when an avatar is selected |


## Development

Install [Bun](https://bun.com) and run the following command to install the dependencies:

To install dependencies:

```bash
bun install
```

To start the development server:

```bash
bun dev
```

To run the linter, check the formatting and the import sorting:

```bash
bun lint
```

And automatically fix relative issues (only safe fixes):

```bash
bun fix
```

This project was created using `bun init` in bun v1.3.5. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
