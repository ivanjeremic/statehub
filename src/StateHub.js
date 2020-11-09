import React, { createContext, useContext, useReducer } from "react";

const createHub = (options) => {
  const Context = createContext();
  const Dispatch = createContext();
  const Methods = createContext();

  const StateContainer = (Context) => {
    const context = useContext(Context);
    return context;
  };

  const DispatchContainer = (Dispatch) => {
    const context = useContext(Dispatch);
    return context;
  };

  const MethodsContainer = (Methods) => {
    const context = useContext(Methods);
    return context;
  };

  let dispatcher;

  return {
    use: () => {
      return [StateContainer(Context), DispatchContainer(Dispatch)];
    },
    methods: () => {
      return MethodsContainer(Methods);
    },
    Provider: ({ children }) => {
      const [state, dispatch] = useReducer(options?.reducer, options?.state);

      dispatcher = dispatch;

      return (
        <Context.Provider value={state}>
          <Dispatch.Provider value={dispatch}>
            <Methods.Provider value={options?.methods}>
              {children}
            </Methods.Provider>
          </Dispatch.Provider>
        </Context.Provider>
      );
    },
    Consumer: ({ children }) => {
      return (
        <Methods.Consumer>
          {(methods) => (
            <Context.Consumer>
              {(context) => {
                if (context === undefined) {
                  throw new Error("Consumer must be used within a Provider");
                }
                return children(context, dispatcher, methods);
              }}
            </Context.Consumer>
          )}
        </Methods.Consumer>
      );
    },
  };
};

export { createHub };
