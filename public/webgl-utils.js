const _createProgramFromScripts = (
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

const _renderRectangle = (gl, rectangle) => {
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

const _renderTriangle = (gl, triangle) => {
  const x1 = triangle.position.x - triangle.dimensions.width / 2;
  const y1 = triangle.position.y + triangle.dimensions.height / 2;
  const x2 = triangle.position.x + triangle.dimensions.width / 2;
  const y2 = triangle.position.y + triangle.dimensions.height / 2;
  const x3 = triangle.position.x;
  const y3 = triangle.position.y - triangle.dimensions.height / 2;

  const float32Array = new Float32Array([x1, y1, x2, y2, x3, y3]);

  gl.bufferData(gl.ARRAY_BUFFER, float32Array, gl.STATIC_DRAW);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
};

const _hexToRgb = (hex) => {
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

const webglUtils = {
  createProgramFromScripts: _createProgramFromScripts,
  renderRectangle: _renderRectangle,
  renderTriangle: _renderTriangle,
  hexToRgb: _hexToRgb,
};
