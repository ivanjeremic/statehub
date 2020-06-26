# statehub

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

## Example (Optional)

```javascript
// code away!

import React, { Component } from "react";
import { render } from "react-dom";

import { useStateHub, StateHub } from "../../src";

function reducer(state, action) {
  switch (action.type) {
    case "CHANGENAME": {
      return {
        myname: "Peter"
      };
    }
    default:
      return state;
  }
}

function AppComponent() {
  const { state, dispatch } = useStateHub();

  // Dispatch function to change the State.
  const changeName = () => dispatch({ type: "CHANGENAME" });

  return (
    <div>
      <h1>{state.myname}</h1>
      <button onClick={changeName}>Change</button>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}

export default function Example() {
  return (
    <StateHub initialState={{ myname: "Ivan" }} reducer={reducer}>
      <AppComponent />
    </StateHub>
  );
}
```

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo
[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package
[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo
