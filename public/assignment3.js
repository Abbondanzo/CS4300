const createProgramFromScripts = (
  gl,
  vertexShaderElementId,
  fragmentShaderElementId
) => {
  // Get the strings for our GLSL shaders
  const vertexShaderSource = document.querySelector(vertexShaderElementId).text;
  const fragmentShaderSource = document.querySelector(fragmentShaderElementId)
    .text;

  // Create GLSL shaders, upload the GLSL source, compile the shaders
  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vertexShaderSource);
  gl.compileShader(vertexShader);

  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, fragmentShaderSource);
  gl.compileShader(fragmentShader);

  // Link the two shaders into a program
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  return program;
};

const RECTANGLE = "RECTANGLE";
const shapes = [
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
    color: {
      red: Math.random(),
      green: Math.random(),
      blue: Math.random(),
    },
  },
];

let gl;
let attributeCoords;
let uniformColor;
let bufferCoords;

const init = () => {
  // get a reference to the canvas and WebGL context
  const canvas = document.querySelector("#canvas");
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

    if (shape.type === RECTANGLE) {
      renderRectangle(shape);
    }
  });
};

const renderRectangle = (rectangle) => {
  const x1 = rectangle.position.x - rectangle.dimensions.width / 2;
  const y1 = rectangle.position.y - rectangle.dimensions.height / 2;
  const x2 = rectangle.position.x + rectangle.dimensions.width / 2;
  const y2 = rectangle.position.y + rectangle.dimensions.height / 2;

  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([x1, y1, x2, y1, x1, y2, x1, y2, x2, y1, x2, y2]),
    gl.STATIC_DRAW
  );

  gl.drawArrays(gl.TRIANGLES, 0, 6);
};

const addRectangle = (e) => {
  // Prevent form button from submitting
  e.preventDefault();
  e.stopPropagation();

  const x = parseInt(document.getElementById("x").value);
  const y = parseInt(document.getElementById("y").value);
  const width = parseInt(document.getElementById("width").value);
  const height = parseInt(document.getElementById("height").value);

  const rectangle = {
    type: RECTANGLE,
    position: {
      x: x,
      y: y,
    },
    dimensions: {
      width,
      height,
    },
    color: {
      red: Math.random(),
      green: Math.random(),
      blue: Math.random(),
    },
  };

  shapes.push(rectangle);
  render();
};
