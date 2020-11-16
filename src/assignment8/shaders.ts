export interface ProgramParameters {
  program: WebGLProgram;
  attribLocations: { [key: string]: number };
  uniformLocations: { [key: string]: WebGLUniformLocation };
}

export const initializeShaderProgram = (gl: WebGLRenderingContext) => {
  const vertexShaderCode = document.getElementById("vertex-shader").textContent;
  const fragmentShaderCode = document.getElementById("fragment-shader")
    .textContent;

  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vertexShaderCode);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fragmentShaderCode);

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  return shaderProgram;
};

const loadShader = (
  gl: WebGLRenderingContext,
  type: number,
  source: string
) => {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return shader;
};

export const getProgramParameters = (
  gl: WebGLRenderingContext,
  shaderProgram: WebGLProgram
): ProgramParameters => {
  return {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
      textureCoord: gl.getAttribLocation(shaderProgram, "aTextureCoord"),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(
        shaderProgram,
        "uProjectionMatrix"
      ),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, "uModelViewMatrix"),
    },
  };
};
