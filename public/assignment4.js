const {
  createProgramFromScripts,
  hexToRgb,
  renderRectangle,
  renderTriangle,
} = webglUtils;

const RECTANGLE = "RECTANGLE";
const TRIANGLE = "TRIANGLE";

const RED_RGB = hexToRgb("#FF0000");
const BLUE_RGB = hexToRgb("#0000FF");

const ORIGIN = { x: 0, y: 0 };
const SIZE_ONE = { width: 1, height: 1 };

let shapes = [
  {
    type: RECTANGLE,
    position: ORIGIN,
    dimensions: SIZE_ONE,
    color: BLUE_RGB,
    translation: {
      x: 200,
      y: 100,
    },
    rotation: { z: 0 },
    scale: {
      x: 50,
      y: 50,
    },
  },
  {
    type: TRIANGLE,
    position: ORIGIN,
    dimensions: SIZE_ONE,
    color: RED_RGB,
    translation: {
      x: 300,
      y: 100,
    },
    rotation: { z: 0 },
    scale: {
      x: 50,
      y: 50,
    },
  },
];

let gl;
let attributeCoords;
let uniformMatrix;
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
  uniformMatrix = gl.getUniformLocation(program, "u_matrix");
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
    // set color
    gl.uniform4f(
      uniformColor,
      shape.color.red,
      shape.color.green,
      shape.color.blue,
      1
    );

    // compute transformation matrix
    let matrix = m3.projection(gl.canvas.clientWidth, gl.canvas.clientHeight);
    matrix = m3.translate(matrix, shape.translation.x, shape.translation.y);
    matrix = m3.rotate(matrix, shape.rotation.z);
    matrix = m3.scale(matrix, shape.scale.x, shape.scale.y);

    // apply transformation matrix
    gl.uniformMatrix3fv(uniformMatrix, false, matrix);

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
    translation: {
      x: 300,
      y: 100,
    },
    rotation: { z: 0 },
    scale: {
      width: 50,
      height: 50,
    },
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