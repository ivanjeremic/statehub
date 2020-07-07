# StateHub - Easy Context API for React JS

<p align="center">
    <img src="https://i.gyazo.com/ae444147bc31116599b52ab0138b97d7.png">
</p>

![npm](https://img.shields.io/npm/v/statehub)
![npm](https://img.shields.io/npm/dw/statehub)

[> Support added for Class Consumers more here <](#support-for-class-components)

#### Wrap the `StateHub` Provider around your App/Component then add an `initialState` and a `reducer` as Props, That's it!

##### **_You don't have to use `reducers` if you don't want to!_** Just use the `contextHub` Prop with values since `StateHub` has two hooks for accessing data, `useStateHub` & `useContextHub` first is used to access the state from the `initialState` wich can be manipulated by the `reducer`, second is to access any data or functions you put in the `contextHub` Prop, read more about `useContextHub` [> HERE <](#usecontexthub-hook).

```javascript
import React from 'react';
import { StateHub } from 'statehub';
import { reducer } from './reducers/reducer';

export default function Example() {
  return (
    <StateHub initialState={{ name: 'Ivan', age: 31 }} reducer={reducer}>
      <IneedStateComponent />
    </StateHub>
  );
}
```

### Use the state within your `IneedStateComponent` with the `useStateHub` hook.

```javascript
import React from 'react';
import { useStateHub, StateHub } from 'statehub';

export default function IneedStateComponent() {
  const [state, dispatch] = useStateHub();

  return <h1>{state.name}</h1>;
}
```

## Full Example

```javascript
import React from 'react';
import { useStateHub, StateHub } from 'statehub';

function reducer(state, action) {
  switch (action.type) {
    case 'CHANGENAME': {
      return {
        name: 'Peter',
      };
    }
    default:
      return state;
  }
}

function AppComponent() {
  const [state, dispatch] = useStateHub();

  // Dispatch function to change the State of 'name'.
  const changeName = () => dispatch({ type: 'CHANGENAME' });

  // Now we use the function from above in the onClick event to change the State.
  return (
    <div>
      <h1>{state.name}</h1>
      <button onClick={changeName}>Change</button>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}

export default function Example() {
  return (
    <StateHub initialState={{ name: 'Ivan' }} reducer={reducer}>
      <AppComponent />
    </StateHub>
  );
}
```

## useContextHub() hook

With `useContextHub` you can access all kind of data & functions, all you need is to use the `contextHub` Prop in the `StateHub` Provider, it is optional but also nice to have because you can fast prototype and test state with `useState` for example before you start adding a `reducer` or maybe useState is all you need in a specific component then you would simply pass your state to your component like this:

```javascript
const [title, setTitle] = React.useState('');

<StateHub contextHub={{ title, setTitle }}>
  <IneedStateCompnent />
</StateHub>;
```

You can access the above example like this:

`const { title, setTitle } = useContextHub();`

##Or you can put also an object here with any data like this:

```javascript
const [title, setTitle] = React.useState('');

<StateHub contextHub={{ title, setTitle, name: 'Peter' }}>
  <IneedStateCompnent />
</StateHub>;
```

You can access the above example like this:

`const { title, setTitle, name } = useContextHub();`

#You can also use them all together:

```javascript
import React from 'react';
import { StateHub } from 'statehub';
import { reducer } from './reducers/reducer';

function App() {
  const [title, setTitle] = React.useState('My Title');

  return (
    <StateHub
      initialState={{ name: 'Ivan' }}
      reducer={reducer}
      contextHub={{ title, setTitle }}
    >
      <Demo />
    </StateHub>
  );
}
```

#Support for Class Components:

To support React < 16.8.0, where the Context needs to be consumed by class
components here the render-prop based API for context consumers:

Because StateHub provides 2 Hooks for consuming data it also has
2 Consumers to use data, `StateHubConsumer` & `ContextHubConsumer`

To Access values from the `initialState` use `StateHubConsumer`

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

To Access values from the `contextHub` Prop use `ContextHubConsumer`

```javascript
import React from 'react';
import { ContextHubConsumer } from 'statehub';

function App() {
  return (
    <ContextHubConsumer>
      {({ title, subtitle }) => (
        <div>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
      )}
    </ContextHubConsumer>
  );
}
```

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo
[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package
[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo
