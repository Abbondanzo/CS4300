const getScriptById = (id: string): HTMLScriptElement => {
  return document.querySelector(id);
};

export const createProgramFromScripts = (
  gl: WebGLRenderingContext,
  vertexShaderElementId: string,
  fragmentShaderElementId: string
) => {
  // Get the strings for our GLSL shaders
  const vertexShaderSource = getScriptById(vertexShaderElementId).text;
  const fragmentShaderSource = getScriptById(fragmentShaderElementId).text;

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
