// import React from 'react';
// import ReactDOM from 'react-dom';

// const element = <h1>Hello world</h1>;

// //React.createElement
// //console.log(element); (convert jsx to java)
// ReactDOM.render(element,document.getElementById('root'));

import React, { useState } from "react";
import ReactDOM from "react-dom";
import App from "./App";

const Index = () => {
  const [showApp, setShowApp] = useState(false);

  return (
    <div>
      <h1>Hello world</h1>
      <button onClick={() => setShowApp(!showApp)}>
        {showApp ? "Close App" : "Open App"}
      </button>
      {showApp && <App />}
    </div>
  );
};

ReactDOM.render(<Index />, document.getElementById("root"));
