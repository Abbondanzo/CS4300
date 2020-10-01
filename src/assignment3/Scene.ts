import { renderRectangle } from "@common/render/rectangle";
import { renderTriangle } from "@common/render/triangle";
import { createProgramFromScripts } from "@common/setup/createProgramFromScripts";

export default class Scene {
  private readonly gl: WebGLRenderingContext;
  private readonly attributeCoords: number;
  private readonly uniformColor: WebGLUniformLocation;
  private readonly bufferCoords: WebGLBuffer;

  constructor(canvasId: string, vertexId: string, fragmentId: string) {
    // get a reference to the canvas and WebGL context
    const canvas = document.querySelector(canvasId) as HTMLCanvasElement;

    this.gl = canvas.getContext("webgl");

    // create and use a GLSL program
    const program = createProgramFromScripts(this.gl, vertexId, fragmentId);
    this.gl.useProgram(program);

    // get reference to GLSL attributes and uniforms
    this.attributeCoords = this.gl.getAttribLocation(program, "a_coords");
    const uniformResolution = this.gl.getUniformLocation(
      program,
      "u_resolution"
    );
    this.uniformColor = this.gl.getUniformLocation(program, "u_color");

    // initialize coordinate attribute to send each vertex to GLSL program
    this.gl.enableVertexAttribArray(this.attributeCoords);

    // initialize coordinate buffer to send array of vertices to GPU
    this.bufferCoords = this.gl.createBuffer();

    // configure canvas resolution and clear the canvas
    this.gl.uniform2f(
      uniformResolution,
      this.gl.canvas.width,
      this.gl.canvas.height
    );
    this.clearCanvas();
  }

  clearCanvas() {
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

      switch (shape.type) {
        case "RECTANGLE":
          renderRectangle(this.gl, shape as Rectangle);
          break;
        case "TRIANGLE":
          renderTriangle(this.gl, shape as Triangle);
          break;
        default:
          console.error("Rendering unhandled shape type", shape);
      }
    });
  }
}
