const hexToRgb = (hex) => {
  const parseRgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  const rgb = {
    red: parseInt(parseRgb[1], 16),
    green: parseInt(parseRgb[2], 16),
    blue: parseInt(parseRgb[3], 16),
  };
  rgb.red /= 256;
  rgb.green /= 256;
  rgb.blue /= 256;
  return rgb;
};

const RECTANGLE = "RECTANGLE";
const TRIANGLE = "TRIANGLE";

const RED_HEX = "#FF0000";
const RED_RGB = hexToRgb(RED_HEX);
const BLUE_HEX = "#0000FF";
const BLUE_RGB = hexToRgb(BLUE_HEX);

let shapes = [
  {
    type: RECTANGLE,
    position: {
      x: 200,
      y: 100,
    },
    dimensions: {
      width: 50,
      height: 50,
    },
    color: BLUE_RGB,
  },
  {
    type: TRIANGLE,
    position: {
      x: 300,
      y: 100,
    },
    dimensions: {
      width: 50,
      height: 50,
    },
    color: RED_RGB,
  },
];

let gl;
let attributeCoords;
let uniformColor;
let bufferCoords;

const init = () => {
  // get a reference to the canvas and WebGL context
  const canvas = document.querySelector("#canvas");

  // Register event listeners
  canvas.addEventListener("mousedown", onCanvasMouseDown, false);
  document
    .querySelector("#addShape")
    .addEventListener("click", onAddShapeButtonClick);
  document
    .querySelector("#clearCanvas")
    .addEventListener("click", onClearCanvasButtonClick);

  gl = canvas.getContext("webgl");

  // create and use a GLSL program
  const program = createProgramFromScripts(
    gl,
    "#vertex-shader-2d",
    "#fragment-shader-2d"
  );
  gl.useProgram(program);

  // get reference to GLSL attributes and uniforms
  attributeCoords = gl.getAttribLocation(program, "a_coords");
  const uniformResolution = gl.getUniformLocation(program, "u_resolution");
  uniformColor = gl.getUniformLocation(program, "u_color");

  // initialize coordinate attribute to send each vertex to GLSL program
  gl.enableVertexAttribArray(attributeCoords);

  // initialize coordinate buffer to send array of vertices to GPU
  bufferCoords = gl.createBuffer();

  // configure canvas resolution and clear the canvas
  gl.uniform2f(uniformResolution, gl.canvas.width, gl.canvas.height);
  clearCanvas();
};

const clearCanvas = () => {
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);
};

const render = () => {
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferCoords);
  gl.vertexAttribPointer(attributeCoords, 2, gl.FLOAT, false, 0, 0);

  shapes.forEach((shape) => {
    gl.uniform4f(
      uniformColor,
      shape.color.red,
      shape.color.green,
      shape.color.blue,
      1
    );

    switch (shape.type) {
      case RECTANGLE:
        renderRectangle(gl, shape);
        break;
      case TRIANGLE:
        renderTriangle(gl, shape);
        break;
      default:
        console.error("Rendering unhandled shape type", shape);
    }
  });
};

const buildShape = (type, center) => {
  let x = parseInt(document.getElementById("x").value);
  let y = parseInt(document.getElementById("y").value);
  const width = parseInt(document.getElementById("width").value);
  const height = parseInt(document.getElementById("height").value);
  const colorHex = document.getElementById("color").value;
  const colorRgb = hexToRgb(colorHex);

  if (center) {
    x = center.position.x;
    y = center.position.y;
  }

  return {
    type,
    position: {
      x,
      y,
    },
    dimensions: {
      width,
      height,
    },
    color: colorRgb,
  };
};

const addRectangle = (center) => {
  const rectangle = buildShape(RECTANGLE, center);
  shapes.push(rectangle);
  render();
};

const addTriangle = (center) => {
  const triangle = buildShape(TRIANGLE, center);
  shapes.push(triangle);
  render();
};

const addShape = (center) => {
  const shape = document.querySelector("input[name='shape']:checked").value;

  switch (shape) {
    case RECTANGLE:
      addRectangle(center);
      break;
    case TRIANGLE:
      addTriangle(center);
      break;
    default:
      console.error("Adding unhandled shape type", shape);
  }
};

const onCanvasMouseDown = (event) => {
  const boundingRectangle = canvas.getBoundingClientRect();
  const x = event.clientX - boundingRectangle.left;
  const y = event.clientY - boundingRectangle.top;
  const center = { position: { x, y } };
  addShape(center);
};

const onAddShapeButtonClick = (event) => {
  event.preventDefault();
  event.stopPropagation();
  addShape();
};

const onClearCanvasButtonClick = (event) => {
  event.preventDefault();
  event.stopPropagation();
  shapes = [];
  clearCanvas();
};
