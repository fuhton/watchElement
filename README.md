<p align="center">
  ⌚️ 🗻 watchElement
  <br/>
  <br/>
  <a href="https://www.npmjs.org/package/watchelement">
    <img src="https://img.shields.io/npm/v/watchelement.svg?style=flat" alt="npm">
  </a>
  <a href="https://travis-ci.org/fuhton/watchelement">
    <img src="https://travis-ci.org/fuhton/watchelement.svg?branch=master" alt="travis">
  </a>
</p>

# watchElement

> A React HOC for managing component visibility by watching external DOM elements

- **Small** ~1kb (~650b + ~350b) footprint
- **Watching** Keeps watch of the DOM and will toggle based on
- **Convenient** Provider and HOC work behind the scenes

## Table of Contents

- [Install](#install)
- [Support](#support)
- [Usage](#usage)
- [Examples](#examples)
- [API](#api)
- [Roadmap](#roadmap)
- [License](#license)

### Install

This project uses [node](http://nodejs.org) and [npm](https://npmjs.com).

```sh
npm install --save watchElement
```

Then with a module bundler like [webpack](https://webpack.js.org) or another bundling solution:

```js
import WatchElementProvider from 'watchElement/provider';
```

### Support

watchElement relys on [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) to keep track of the elements within the DOM. All modern browsers are supported by this spec, but developers are encouraged to review the browser support list before implementing this library into their project.

### Usage

```js
import WatchElementProvider from 'watchElement/provider';
import WatchElementHOC from 'watchElement/hoc';

const Check = () => <div>Display me!</div>;
const WrappedCheck = WatchElement('.check')(Check);

const App = () => (
  <div>
    <WrappedCheck />
  </div>
);

ReactDOM.render(
  <WatchElementProvider>
    <App />
  </WatchElementProvider>,
  document.getElementById('root')
);
```

### Examples

Soon...

### API

Soon...


### Roadmap

- [ ] Create API documentation
- [X] Allow definition of root mutation element


### Reporting Issues

Found a problem? Want a new feature? Open a [clear and descriptive issue](../../issues/new).

### License

MIT © [Nicholas Smith](https://fuhton.com)
