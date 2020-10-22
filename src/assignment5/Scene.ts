import { renderShape } from "@common/render/3d";
import { createProgramFromScripts } from "@common/setup/createProgramFromScripts";
import { degreesToRadians } from "@common/util/degrees";
import m4 from "@common/util/m4";

const DIMENSIONS = 3;

export default class Scene {
  private readonly gl: WebGLRenderingContext;
  private readonly attributeCoords: number;
  private readonly uniformMatrix: WebGLUniformLocation;
  private readonly uniformColor: WebGLUniformLocation;
  private readonly bufferCoords: WebGLBuffer;

  private constructor(
    canvas: HTMLCanvasElement,
    vertexShaderSource: string,
    fragmentShaderSource: string
  ) {
    this.gl = canvas.getContext("webgl");

    // create and use a GLSL program
    const program = createProgramFromScripts(
      this.gl,
      vertexShaderSource,
      fragmentShaderSource
    );
    this.gl.useProgram(program);

    // get reference to GLSL attributes and uniforms
    this.attributeCoords = this.gl.getAttribLocation(program, "a_coords");
    this.uniformMatrix = this.gl.getUniformLocation(program, "u_matrix");
    this.uniformColor = this.gl.getUniformLocation(program, "u_color");

    // initialize coordinate attribute to send each vertex to GLSL program
    this.gl.enableVertexAttribArray(this.attributeCoords);

    // initialize coordinate buffer to send array of vertices to GPU
    this.bufferCoords = this.gl.createBuffer();

    // configure canvas resolution and clear the canvas
    const uniformResolution = this.gl.getUniformLocation(
      program,
      "u_resolution"
    );
    this.gl.uniform2f(
      uniformResolution,
      this.gl.canvas.width,
      this.gl.canvas.height
    );
    this.clearCanvas();
  }

  private clearCanvas() {
    this.gl.clearColor(0, 0, 0, 0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
  }

  render(shapes: Canvas3D.Shape[], fieldOfViewDegrees: number) {
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.bufferCoords);

    this.gl.vertexAttribPointer(
      this.attributeCoords,
      DIMENSIONS,
      this.gl.FLOAT,
      false,
      0,
      0
    );

    this.gl.enable(this.gl.CULL_FACE);
    this.gl.enable(this.gl.DEPTH_TEST);

    if (shapes.length === 0) {
      this.clearCanvas();
      return;
    }

    const canvas = this.gl.canvas as HTMLCanvasElement;
    const aspect = canvas.clientWidth / canvas.clientHeight;
    const fov = degreesToRadians(fieldOfViewDegrees);
    const zNear = 1;
    const zFar = 2000;

    shapes.forEach((shape) => {
      this.gl.uniform4f(
        this.uniformColor,
        shape.color.red,
        shape.color.green,
        shape.color.blue,
        1
      );

      // compute transformation matrix
      const M = this.computeModelViewMatrix(shape, fov, aspect, zNear, zFar);
      this.gl.uniformMatrix4fv(this.uniformMatrix, false, M);

      renderShape(this.gl, shape);
    });
  }

  private computeModelViewMatrix(
    shape: Canvas3D.Shape,
    fieldOfViewRadians: number,
    aspect: number,
    zNear: number,
    zFar: number
  ) {
    let M = m4.perspective(fieldOfViewRadians, aspect, zNear, zFar);
    M = m4.translate(
      M,
      shape.translation.x,
      shape.translation.y,
      shape.translation.z
    );
    M = m4.xRotate(M, degreesToRadians(shape.rotation.x));
    M = m4.yRotate(M, degreesToRadians(shape.rotation.y));
    M = m4.zRotate(M, degreesToRadians(shape.rotation.z));
    M = m4.scale(M, shape.scale.x, shape.scale.y, shape.scale.z);
    return M;
  }

  /**
   * ========================================
   * Scenes are singletons
   * ========================================
   */
  private static instance?: Scene;
  static getInstance() {
    if (!Scene.instance) {
      throw new Error("Scene not initialized with call to `init`");
    }
    return Scene.instance;
  }
  static init(
    canvas: HTMLCanvasElement,
    vertexShaderSource: string,
    fragmentShaderSource: string
  ) {
    Scene.instance = new Scene(
      canvas,
      vertexShaderSource,
      fragmentShaderSource
    );
    return Scene.instance;
  }
}
