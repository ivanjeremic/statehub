# StateHub - Easy Context API for React JS

<p align="center">
    <img src="https://i.gyazo.com/ae444147bc31116599b52ab0138b97d7.png">
</p>

![npm](https://img.shields.io/npm/v/statehub)
![npm](https://img.shields.io/npm/dw/statehub)

[> Support added for Class Consumers more here <](#support-for-class-components)

#### Everything starts with creating a new hub with `createHub`.

```javascript
import React from 'react';
import { createHub } from 'statehub';

export const DemoHub = createHub({
  initialState: { name: 'Alex' },
  reducer: (state, action) => {
    switch (action.type) {
      case 'CHANGENAME': {
        return {
          name: 'Peter',
        };
      }
      default:
        return state;
    }
  },
});
```

### Now wrap your app with the StateHub provider and pass your created hub in..

```javascript
import React from 'react';
import { StateHub } from 'statehub';
import { DemoHub } from '../hubs/DemoHub';

export default function App() {
  return (
    <StateHub hub={DemoHub}>
      <IneedStateComponent />
    </StateHub>
  );
}
```

## Now you can use the state in your component with the `useStateHub` hook.

```javascript
import React from 'react';
import { useStateHub } from 'statehub';
import { DemoHub } from '../hubs/DemoHub';

function IneedStateComponent() {
  const [state, dispatch] = useStateHub(DemoHub); // Define the hub.

  // Dispatch function to change the State of 'name'.
  const changeName = () => dispatch({ type: 'CHANGENAME' });

  // Now we use the function from above in the onClick event to change the State.
  return (
    <div>
      <h1>{state.name}</h1>
      <button onClick={changeName}>Change</button>
    </div>
  );
}

export default IneedStateComponent;
```

## You can use as manny hubs as you want.

```javascript
const [title, setTitle] = React.useState('');

<StateHub hub={AuthHub}>
  <StateHub hub={DatabaseHub}>
    <StateHub hub={ResponsiveHub}>
      <StateHub hub={ModalHub}>
        <App />
      </StateHub>
    </StateHub>
  </StateHub>
</StateHub>;
```

## createHub API:

in work...

## Support for Class Components:

To support React < 16.8.0, where the Context needs to be consumed by class
components here the render-prop based API for context consumers:

Because StateHub provides 2 Hooks for consuming data it also has
2 Consumers to use data, `StateHubConsumer` & `ContextHubConsumer`

To Access values from the `initialState` use the `StateHubConsumer`

```javascript
import React from 'react';
import { StateHubConsumer } from 'statehub';

function App() {
  return (
    <StateHubConsumer>
      {({ title, subtitle }) => (
        <div>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
      )}
    </StateHubConsumer>
  );
}
```

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo
[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package
[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo
