import React from "react";
import NavBar from "./NavBar";

const App = () => {
  return (
    <div style={{ width: 540, margin: "0 auto", textAlign: "center" }}>
      <NavBar title="WebGL Transformations" />
      <canvas id="canvas" width="500px" height="300px"></canvas>
      form
    </div>
  );
};

export default App;
