import React, { createContext, useContext, useReducer } from "react";

const Context = createContext();
const DispatchContext = createContext();
const _ContextHub = createContext();

function StateHub(props) {
  const { children, reducer, initialState, contextHub } = props;

  // initialize useReducer
  const [state, dispatch] = useReducer(reducer, initialState);

  if (reducer !== undefined) {
    if (state === undefined) {
      throw new Error("initialState is undefined");
    }
  }

  if (state !== undefined) {
    if (reducer === undefined) {
      throw new Error("reducer is undefined");
    }
  }

  const hub = contextHub === undefined ? "ContextHubx" : contextHub;

  return (
    <Context.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <_ContextHub.Provider value={hub}>{children}</_ContextHub.Provider>
      </DispatchContext.Provider>
    </Context.Provider>
  );
}

// checkProvideState
function checkProvideState() {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("State must be used within a Provider");
  }
  return context;
}
// checkProvideDispatch
function checkProvideDispatch() {
  const context = useContext(DispatchContext);
  if (context === undefined) {
    throw new Error("Dispatch must be used within a Provider");
  }
  return context;
}
// useContextHub
function useContextHub() {
  const context = useContext(_ContextHub);
  if (context === undefined) {
    throw new Error(
      "'checkProvideContextHub' - Dispatch must be used within a Provider",
    );
  }
  return context;
}

/* 
The state and dispatch separation is annoying!
const state = useCountState()
const dispatch = useCountDispatch()
--------------------------
>> This is the solution.
*/
function useStateHub() {
  return [checkProvideState(), checkProvideDispatch()];
}

/*
To support React < 16.8.0, where the Context needs to be consumed by class
components, here the render-prop based API for context consumers: 
*/
function StateHubConsumer(props) {
  const { children } = props;

  return (
    <Context.Consumer>
      {(context) => {
        if (context === undefined) {
          throw new Error("Consumer must be used within a Provider");
        }
        return children(context);
      }}
    </Context.Consumer>
  );
}

export { StateHub, useStateHub, useContextHub, StateHubConsumer };
