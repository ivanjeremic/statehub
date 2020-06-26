import React, { createContext, useContext, useReducer } from "react";

const Context = createContext();
const DispatchContext = createContext();

function StateHub(props) {
  const { children, reducer, initialState } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ initialState, state }}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </Context.Provider>
  );
}

function useStateHub() {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("State must be used within a Provider");
  }
  return context;
}

function useDispatch() {
  const context = useContext(DispatchContext);
  if (context === undefined) {
    throw new Error("Dispatch must be used within a Provider");
  }
  return context;
}

/**
If you need to support React < 16.8.0, or you think the Context needs to be consumed by class
components, then here's how you could do something similar with the render-prop based API for context consumers: 
*/
function Consumer({ children }) {
  return (
    <Context.Consumer>
      {context => {
        if (context === undefined) {
          throw new Error("CountConsumer must be used within a CountProvider");
        }
        return children(context);
      }}
    </Context.Consumer>
  );
}

export { StateHub, useStateHub, useDispatch, Consumer };
