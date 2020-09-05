import React from 'react';
import { render } from 'react-dom';

import { StateHub, useStateHub, createHub } from '../../src';

const DemoHub = createHub({
  initialState: { name: 'AppTwostore' },
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

function Demo() {
  const [state, dispatch] = useStateHub(DemoHub);

  // Dispatch function to change the State of 'name'.
  const changenameHandler = () => {
    dispatch({ type: 'CHANGENAME' });
  };

  return (
    <div className='App'>
      <h1>{`${state.name}AppTwo`}</h1>
      <button type='button' onClick={changenameHandler}>
        Change
      </button>
    </div>
  );
}

function MainApp() {
  return (
    <StateHub hub={DemoHub}>
      <Demo />
    </StateHub>
  );
}

render(<MainApp />, document.querySelector('#demo'));
