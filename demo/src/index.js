import React, { Component } from "react";
import { render } from "react-dom";

import { StateHub, useStateHub, useDispatch } from "../../src";

function reducer(state, action) {
  switch (action.type) {
    case "CHANGENAME": {
      return {
        myname: "HAHA"
      };
    }
    default:
      return state;
  }
}

function AppComponent() {
  const { state } = useStateHub();
  const dispatch = useDispatch();

  const changeName = () => dispatch({ type: "CHANGENAME" });

  return (
    <div className="App">
      <h1>{state.myname}</h1>
      <button onClick={changeName}>Change</button>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}

export default function Demo() {
  return (
    <StateHub initialState={{ myname: "Ivan" }} reducer={reducer}>
      <AppComponent />
    </StateHub>
  );
}

render(<Demo />, document.querySelector("#demo"));
