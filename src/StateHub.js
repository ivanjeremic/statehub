import React, { createContext, useContext, useReducer } from "react";

const Context = createContext();
const DispatchContext = createContext();

function StateHub(props) {
  const { children, reducer, initialState } = props;
  // initialize useReducer
  const [state, dispatch] = useReducer(reducer, initialState);

  /* const provideContextValue = () => {
    if (state === undefined) {
      throw new Error(
        "initialState is undefined, set an initialState in your StateHub provider."
      );
    }
    return state;
  };

  const provideDispatchContextValue = () => {
    if (dispatch === undefined) {
      throw new Error(
        "No Reducer set, define a reducer in your StateHub provider."
      );
    }
    return dispatch;
  }; */

  return (
    <Context.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </Context.Provider>
  );
}

function checkProvideState() {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("State must be used within a Provider");
  }
  return context;
}

function checkProvideDispatch() {
  const context = useContext(DispatchContext);
  if (context === undefined) {
    throw new Error("Dispatch must be used within a Provider");
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
function Consumer(props) {
  const { children } = props;

  return (
    <Context.Consumer>
      {context => {
        if (context === undefined) {
          throw new Error("Consumer must be used within a Provider");
        }
        return children(context);
      }}
    </Context.Consumer>
  );
}

export { StateHub, useStateHub, Consumer };
