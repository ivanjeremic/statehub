import React, { useState } from "react";
import { render } from "react-dom";

import { createHub } from "../../src";

const DemoHub = createHub({
  state: { title: "Welcome to StateHub" },
  reducer: (state, action) => {
    switch (action.type) {
      case "CHANGE_TITLE": {
        return {
          title: "This is the changed StateHub title.",
        };
      }
      default:
        return state;
    }
  },
  methods: {
    LogSomething: function () {
      console.log("Hello Statehub");
    },
    AlertSomething: function () {
      alert("StateHub Alert!");
    },
    useDemoHook: function () {
      const [buttonText, setButtonText] = useState("useDemoHook");
      return [buttonText, setButtonText];
    },
  },
});

export default class StateHubClassComp extends React.Component {
  render() {
    return (
      <DemoHub.Consumer>
        {(state, dispatch, methods) => (
          <div>
            <h2>{state.title}</h2>
            <button onClick={() => dispatch({ type: "CHANGE_TITLE" })}>
              Change Title
            </button>

            <h2>Method Example 1:</h2>
            <button type="button" onClick={methods.LogSomething}>
              Log something to the console
            </button>

            <h2>Method Example 2:</h2>
            <button type="button" onClick={methods.AlertSomething}>
              Trigger alert
            </button>
          </div>
        )}
      </DemoHub.Consumer>
    );
  }
}

function Demo() {
  const [state, dispatch] = DemoHub.use();
  const { LogSomething, AlertSomething, useDemoHook } = DemoHub.methods();
  const [buttonText, setButtonText] = useDemoHook();

  return (
    <div>
      <StateHubClassComp />
      <hr />
      <h2>{state.title}</h2>
      <button onClick={() => dispatch({ type: "CHANGE_TITLE" })}>
        Change Title
      </button>

      <h2>Method Example 1:</h2>
      <button type="button" onClick={LogSomething}>
        Log something to the console
      </button>

      <h2>Method Example 2:</h2>
      <button type="button" onClick={AlertSomething}>
        Trigger alert
      </button>

      <h2>Method Custom Hook example 3:</h2>
      <button type="button" onClick={() => setButtonText("Hooked!")}>
        {buttonText}
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

render(<MainApp />, document.querySelector("#demo"));
