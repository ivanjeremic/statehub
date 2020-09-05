import React, { createContext, useContext, useReducer } from 'react';

function StateHub(props) {
  const { children, hub } = props;

  const { ThisContext, ThisDispatch, ThisHub } = hub;

  let ContextContainer = ThisContext;
  let DispatchContainer = ThisDispatch;

  // initialize useReducer
  const [state, dispatch] = useReducer(ThisHub?.reducer, ThisHub?.initialState);

  if (typeof ThisHub?.reducer !== undefined) {
    if (typeof state === undefined) {
      throw new Error('initialState is undefined');
    }
  }

  if (typeof state !== undefined) {
    if (typeof ThisHub?.reducer === undefined) {
      throw new Error('reducer is undefined');
    }
  }

  return (
    <ContextContainer.Provider value={state}>
      <DispatchContainer.Provider value={dispatch}>
        {children}
      </DispatchContainer.Provider>
    </ContextContainer.Provider>
  );
}
// CheckProvideState
const CheckProvideState = (ThisContext) => {
  const context = useContext(ThisContext);
  if (context === undefined) {
    throw new Error('State must be used within a Provider');
  }
  return context;
};

// CheckProvideDispatch
const CheckProvideDispatch = (ThisDispatch) => {
  const context = useContext(ThisDispatch);
  if (context === undefined) {
    throw new Error('Dispatch must be used within a Provider');
  }
  return context;
};

/* 
The state and dispatch separation is annoying!
const state = useCountState()
const dispatch = useCountDispatch()
--------------------------
>> This is the solution.
*/
const useStateHub = (hub) => {
  const { ThisContext, ThisDispatch } = hub;
  return [CheckProvideState(ThisContext), CheckProvideDispatch(ThisDispatch)];
};

function createHub(hub) {
  return {
    ThisContext: createContext(),
    ThisDispatch: createContext(),
    ThisHub: hub,
  };
}

export { StateHub, useStateHub, createHub };
