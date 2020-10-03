import { renderCircle } from "@common/render/circle";
import { renderRectangle } from "@common/render/rectangle";
import { renderStar } from "@common/render/star";
import { renderTriangle } from "@common/render/triangle";
import { createProgramFromScripts } from "@common/setup/createProgramFromScripts";
import m3 from "@common/util/m3";

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
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
  }

  render(shapes: BasicCanvas.Shape[]) {
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.bufferCoords);
    this.gl.vertexAttribPointer(
      this.attributeCoords,
      2,
      this.gl.FLOAT,
      false,
      0,
      0
    );

    shapes.forEach((shape) => {
      this.gl.uniform4f(
        this.uniformColor,
        shape.color.red,
        shape.color.green,
        shape.color.blue,
        1
      );

      // compute transformation matrix
      const canvas = this.gl.canvas as HTMLCanvasElement;
      let matrix = m3.projection(canvas.clientWidth, canvas.clientHeight);
      matrix = m3.translate(matrix, shape.translation.x, shape.translation.y);
      matrix = m3.rotate(matrix, shape.rotation.z);
      matrix = m3.scale(matrix, shape.scale.x, shape.scale.y);

      // apply transformation matrix.
      this.gl.uniformMatrix3fv(this.uniformMatrix, false, matrix);

      switch (shape.type) {
        case "RECTANGLE":
          renderRectangle(this.gl, shape as Rectangle);
          break;
        case "TRIANGLE":
          renderTriangle(this.gl, shape as Triangle);
          break;
        case "CIRCLE":
          renderCircle(this.gl, shape as Circle);
          break;
        case "STAR":
          renderStar(this.gl, shape as Star);
          break;
        default:
          console.error("Rendering unhandled shape type", shape);
      }
    });
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
