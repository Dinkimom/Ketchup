/*global chrome*/

import React, { useState } from "react";
import "./App.css";

const App = ({ isExt }) => {
  const [on, setOn] = useState(false);

  const handleToggleOn = () => {
    setOn(!on);
  };

  return (
    <div className="App">
      <button onClick={handleToggleOn}>{on ? "Off" : "On"}</button>
    </div>
  );
};

export default App;
