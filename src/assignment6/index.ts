import ReactDOM from "react-dom";

import App from "./components/App";

// Assign some functions to window
document.addEventListener("DOMContentLoaded", () => {
  const domContainer = document.getElementById("assignment-6-container");
  ReactDOM.render(App(), domContainer);
});
