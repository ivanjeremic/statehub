import React from 'react';
import { render } from 'react-dom';

import { createHub } from '../../src';

const DemoHub = createHub({
  initialState: { title: 'Welcome to StateHub' },
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

function Demo() {
  const [state, dispatch] = DemoHub.use();

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

function MainApp() {
  return (
    <DemoHub.Provider>
      <Demo />
    </DemoHub.Provider>
  );
}

render(<MainApp />, document.querySelector('#demo'));
