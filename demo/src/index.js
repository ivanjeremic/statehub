import React, { useState } from 'react';
import { render } from 'react-dom';

import { StateHub, useStateHub, useContextHub } from '../../src';

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

function Demo() {
  const [state, dispatch] = useStateHub();
  const [title, setTitle] = useContextHub();

  // Dispatch function to change the State of 'name'.
  const changeName = () => dispatch({ type: 'CHANGENAME' });

  return (
    <div className='App'>
      <h1>{state.name}</h1>
      <h1>{title}</h1>
      <button onClick={(e) => setTitle('From UseState')}>Logg</button>
      <button onClick={changeName}>changeName</button>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}

function MainApp() {
  const [title, setTitle] = React.useState('Marion');

  return (
    <StateHub
      initialState={{ name: 'Ivan' }}
      reducer={reducer}
      contextHub={[title, setTitle]}
    >
      <Demo />
    </StateHub>
  );
}

render(<MainApp />, document.querySelector('#demo'));
