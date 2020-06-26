import React, { createContext, useContext, useReducer } from "react";

const Context = createContext({});

function StateHub(props) {
  const { children, reducer, initialState } = props;

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ initialState, state, dispatch }}>
      {children}
    </Context.Provider>
  );
}

const useStateHub = () => useContext(Context);

const Consumer = ({ children }) => {
  return <Context.Consumer>{children}</Context.Consumer>;
};

export { StateHub, useStateHub, Consumer };
