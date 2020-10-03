// import { getElementValue } from "@common/form/getElementValue";
// import {
//   buildRectangle,
//   buildTriangle,
// } from "@common/model/basicShapeBuilders";
// import { hexToRgb } from "@common/util/hexToRgb";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

// import Scene from "./Scene";

// const RED_HEX = "#FF0000";
// const RED_RGB = hexToRgb(RED_HEX);
// const BLUE_HEX = "#0000FF";
// const BLUE_RGB = hexToRgb(BLUE_HEX);

// let shapes: BasicCanvas.Shape[] = [
//   buildRectangle({
//     position: {
//       x: 200,
//       y: 100,
//     },
//     dimensions: {
//       width: 50,
//       height: 50,
//     },
//     color: BLUE_RGB,
//   }),
//   buildTriangle({
//     position: {
//       x: 300,
//       y: 100,
//     },
//     dimensions: {
//       width: 50,
//       height: 50,
//     },
//     color: RED_RGB,
//   }),
// ];

// let scene: Scene;

// const init = () => {
//   scene = new Scene("#canvas", "#vertex-shader-2d", "#fragment-shader-2d");
//   const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
//   canvas.addEventListener("mousedown", onCanvasMouseDown, false);
// };

// const addShape = (position?: BasicCanvas.Position) => {
//   const shapeType = getElementValue("input[name='shape']:checked");
//   const x = parseInt(getElementValue("#x"));
//   const y = parseInt(getElementValue("#y"));
//   const width = parseInt(getElementValue("#width"));
//   const height = parseInt(getElementValue("#height"));
//   const colorRgb = hexToRgb(getElementValue("#color"));
//   // Shared shape config
//   const config = {
//     position: position || { x, y },
//     dimensions: { width, height },
//     color: colorRgb,
//   };
//   switch (shapeType) {
//     case "RECTANGLE":
//       shapes.push(buildRectangle(config));
//       scene.render(shapes);
//       break;
//     case "TRIANGLE":
//       shapes.push(buildTriangle(config));
//       scene.render(shapes);
//       break;
//     default:
//       console.error("Adding unhandled shape type", shapeType);
//   }
// };

// const onCanvasMouseDown = (event: MouseEvent) => {
//   const boundingRectangle = (event.target as HTMLCanvasElement).getBoundingClientRect();
//   const x = event.clientX - boundingRectangle.left;
//   const y = event.clientY - boundingRectangle.top;
//   addShape({ x, y });
// };

// const onAddShapeButtonClick = (event: MouseEvent) => {
//   event.preventDefault();
//   event.stopPropagation();
//   addShape();
// };

// const onClearCanvasButtonClick = (event: MouseEvent) => {
//   event.preventDefault();
//   event.stopPropagation();
//   shapes = [];
//   scene.clearCanvas();
// };

// Assign some functions to window
document.addEventListener("DOMContentLoaded", () => {
  // init();
  // scene.render(shapes);

  // document
  //   .querySelector("#addShape")
  //   .addEventListener("click", onAddShapeButtonClick);
  // document
  //   .querySelector("#clearCanvas")
  //   .addEventListener("click", onClearCanvasButtonClick);

  const domContainer = document.getElementById("assignment-4-container");
  ReactDOM.render(App(), domContainer);
});
