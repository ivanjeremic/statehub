import React, { createContext, useContext, useReducer } from 'react';

const CheckProvideState = (ThisContext) => {
  const context = useContext(ThisContext);
  return context;
};

const CheckProvideDispatch = (ThisDispatch) => {
  const context = useContext(ThisDispatch);
  return context;
};

const CheckProvideMethods = (ThisMethods) => {
  const context = useContext(ThisMethods);
  return context;
};

const createHub = (options) => {
  const ThisContext = createContext({});
  const ThisDispatch = createContext({});
  const ThisMethods = createContext({});

  let dispatcher;

  return {
    use: () => {
      return [
        CheckProvideState(ThisContext),
        CheckProvideDispatch(ThisDispatch),
        CheckProvideMethods(ThisMethods),
      ];
    },
    methods: () => {
      return CheckProvideMethods(ThisMethods);
    },
    Provider: ({ children }) => {
      const [state, dispatch] = useReducer(options?.reducer, options?.state);

      dispatcher = dispatch;

      return (
        <ThisContext.Provider value={state}>
          <ThisDispatch.Provider value={dispatch}>
            <ThisMethods.Provider value={options?.methods}>
              {children}
            </ThisMethods.Provider>
          </ThisDispatch.Provider>
        </ThisContext.Provider>
      );
    },
    Consumer: ({ children }) => {
      return (
        <ThisMethods.Consumer>
          {(methods) => (
            <ThisContext.Consumer>
              {(context) => {
                if (context === undefined) {
                  throw new Error('Consumer must be used within a Provider');
                }
                return children(context, dispatcher, methods);
              }}
            </ThisContext.Consumer>
          )}
        </ThisMethods.Consumer>
      );
    },
  };
};

export { createHub };
