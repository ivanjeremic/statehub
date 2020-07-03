import React, { useState } from "react";
import { render } from "react-dom";

import { StateHub, useStateHub, useContextHub } from "../../src";

function reducer(state, action) {
  switch (action.type) {
    case "CHANGENAME": {
      return {
        myname: "HAHA",
      };
    }
    default:
      return state;
  }
}

function Demo() {
  const [state, dispatch] = useStateHub();
  const [title, setTitle] = useContextHub();

  const [text, setText] = useState("");

  return (
    <div className="App">
      <h1>{state.myname}</h1>
      <h1>{title}</h1>
      <button onClick={(e) => setTitle("Kalimero")}>Logg</button>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={() => dispatch({ type: "CHANGENAME", text })}>
        Change
      </button>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}

function MainApp() {
  const [title, setTitle] = React.useState("");

  return (
    <StateHub
      reducerState={{ myname: "Ivan" }}
      reducer={reducer}
      contextHub={[title, setTitle]}
    >
      <Demo />
    </StateHub>
  );
}

render(
  <MainApp />,
  document.querySelector("#demo"),
);
