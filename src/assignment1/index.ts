const init = () => {
  // 1. Create a canvas and retrieve its WebGL context
  const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
  const gl = canvas.getContext("webgl");

  // 2. Create and compile a vertex and frame shader program
  const vertexShaderCode =
    "attribute vec2 coordinates; \
   void main(void) { gl_Position = vec4(coordinates, 0.0, 1.0); }";
  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vertexShaderCode);
  gl.compileShader(vertexShader);

  const fragmentShaderCode =
    "void main(void) { gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0); }";
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, fragmentShaderCode);
  gl.compileShader(fragmentShader);

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);
  gl.useProgram(shaderProgram);

  // 3. Define the geometry, store it in buffers to send them to the GPU
  const vertices = [-0.5, 0.5, -0.5, -0.5, 0.0, -0.5];
  const vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  // 4. Associate the shader programs to the buffers created earlier
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  const coord = gl.getAttribLocation(shaderProgram, "coordinates");
  gl.vertexAttribPointer(coord, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(coord);

  // 5. Request drawing the geometry defined in buffers using the shaders in the programs
  gl.clearColor(0.5, 0.5, 0.5, 0.9);
  gl.enable(gl.DEPTH_TEST);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
};

document.addEventListener("DOMContentLoaded", () => {
  init();
});
