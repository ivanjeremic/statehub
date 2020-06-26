# StateHub

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

![alt text](https://i.gyazo.com/ae444147bc31116599b52ab0138b97d7.png)

### Wrap the 'StateHub' Provider around your App/Component then add an 'initialState' and a 'Reducer' as props. That's it! More details & CodeSandbox links below.

```javascript
import React from "react";
import { StateHub } from "statehub";
import { reducer } from "./reducers/reducer";

export default function Example() {
  return (
    <StateHub initialState={{ name: "Ivan", age: 31 }} reducer={reducer}>
      <IneedStateComponent />
    </StateHub>
  );
}
```

## Full Example

```javascript
import React from "react";
import { useStateHub, StateHub } from "statehub";

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

  // Dispatch function to change the State of 'myname'.
  const changeName = () => dispatch({ type: "CHANGENAME" });

  // Now we use the function from above in the onClick event to change the State.
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
