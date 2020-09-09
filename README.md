# StateHub - Easy Context API for React JS

<p align="center">
    <img src="https://i.gyazo.com/ae444147bc31116599b52ab0138b97d7.png">
</p>

![npm](https://img.shields.io/npm/v/statehub)
![npm](https://img.shields.io/npm/dw/statehub)

Everything starts with creating a new StateHub with `createHub`, and this StateHub is everything you will ever need in your components, no other unnecessary imports!

```javascript
import { createHub } from 'statehub';

export const DemoHub = createHub({
  state: { title: 'Welcome to StateHub' },
  reducer: (state, action) => {
    switch (action.type) {
      case 'CHANGE_TITLE': {
        return {
          title: 'This is the changed StateHub title.',
        };
      }
      default:
        return state;
    }
  },
  methods: {
    LogSomething: function () {
      console.log('Hello Statehub');
    },
    AlertSomething: function () {
      alert('StateHub Alert!');
    },
  },
});
```

Now wrap your App with the Provider who comes with the DemoHub you created before.

\*As you can see the API is very clean everything you ever `import` is your created StateHub and nothing more.

```javascript
import React from 'react';
import { DemoHub } from '../hubs/DemoHub';

export default function Index() {
  return (
    <DemoHub.Provider>
      <App />
    </DemoHub.Provider>
  );
}
```

Now you can use the state in your component.

And again you can see, everything you need is coming from your created StateHub, no other imports are required except your DemoHub.

```javascript
import React from 'react';
import { DemoHub } from '../hubs/DemoHub';

function App() {
  const [state, dispatch, methods] = DemoHub.use(); // call .use() to use the state.

  return (
    <div>
      <h2>{state.title}</h2>
      <button onClick={() => dispatch({ type: 'CHANGE_TITLE' })}>
        Change Title
      </button>

      <h2>Method Example 1:</h2>
      <button type='button' onClick={methods.LogSomething}>
        Log something to the console
      </button>

      <h2>Method Example 2:</h2>
      <button type='button' onClick={methods.AlertSomething}>
        Trigger alert
      </button>
    </div>
  );
}

export default App;
```

state & reducer is optional that means you can create StateHub's with methods only and retrieve them directly where needed by calling `YourHub.methods()`.

```javascript
import React from 'react';
import { DemoHub } from '../hubs/DemoHub';

function App() {
  const { LogSomething, AlertSomething } = DemoHub.methods();

  return (
    <div>
      <h2>Method Example 1:</h2>
      <button type='button' onClick={LogSomething}>
        Log something to the console
      </button>

      <h2>Method Example 2:</h2>
      <button type='button' onClick={AlertSomething}>
        Trigger alert
      </button>
    </div>
  );
}

export default App;
```

You can use as many StateHubs as you want.

```javascript
import React from 'react';
import App from '../components/App';
import { AuthHub, DatabaseHub, ResponsiveHub, ModalHub } from '../hubs/DemoHub';

export default function Index() {
  return (
    <AuthHub.Provider>
      <DatabaseHub.Provider>
        <ResponsiveHub.Provider>
          <ModalHub.Provider>
            <App />
          </ModalHub.Provider>
        </ResponsiveHub.Provider>
      </DatabaseHub.Provider>
    </AuthHub.Provider>
  );
}
```

Support for Class Components:

To support React < 16.8.0, where the Context needs to be consumed by class
components here the render-prop based API for context consumers:

```javascript
import React from 'react';
import { DemoHub } from '../hubs/DemoHub';

class App extends React.Component {
  render() {
    return (
      <DemoHub.Consumer>
        {(state, dispatch, methods) => (
          <div>
            <h2>{state.title}</h2>
            <button onClick={() => dispatch({ type: 'CHANGE_TITLE' })}>
              Change Title
            </button>

            <h2>Method Example 1:</h2>
            <button type='button' onClick={methods.LogSomething}>
              Log something to the console
            </button>

            <h2>Method Example 2:</h2>
            <button type='button' onClick={methods.AlertSomething}>
              Trigger alert
            </button>
          </div>
        )}
      </DemoHub.Consumer>
    );
  }
}
```

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo
[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package
[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo
