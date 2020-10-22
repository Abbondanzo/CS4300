import m4 from "@common/util/m4";

const UP = [0, 1, 0];
const Z_NEAR = 1;
const Z_FAR = 2000;

export interface CameraSettings {
  fovDegrees: number;
  translation: Canvas3D.Translation;
  rotation?: Canvas3D.Translation;
  target?: Canvas3D.Position;
}

export default class Camera {
  rotation: Canvas3D.Rotation;
  translation: Canvas3D.Translation;
  private target?: Canvas3D.Position;
  private fovRadians: number;

  constructor() {
    this.rotation = { x: 0, y: 0, z: 0 };
    this.translation = { x: 0, y: 0, z: 0 };
    this.fovRadians = m4.degToRad(60);
  }

  setTarget(position: Canvas3D.Position) {
    this.target = position;
  }

  removeTarget() {
    this.target = undefined;
  }

  getFOVDegrees() {
    return Math.round(m4.radToDeg(this.fovRadians));
  }

  setFOV(fovDegrees: number) {
    this.fovRadians = m4.degToRad(fovDegrees);
  }

  getViewProjectionMatrix(aspect: number) {
    const cameraMatrix = this.getCameraMatrix();
    const projectionMatrix = m4.perspective(
      this.fovRadians,
      aspect,
      Z_NEAR,
      Z_FAR
    );
    return m4.multiply(projectionMatrix, cameraMatrix);
  }

  private getCameraMatrix() {
    let cameraMatrix = m4.identity();
    if (this.target !== undefined) {
      cameraMatrix = this.applyTranslation(cameraMatrix);
      const cameraPosition = [
        cameraMatrix[12],
        cameraMatrix[13],
        cameraMatrix[14],
      ];
      cameraMatrix = m4.lookAt(cameraPosition, this.getTargetAsMatrix(), UP);
    } else {
      cameraMatrix = this.applyRotation(cameraMatrix);
      cameraMatrix = this.applyTranslation(cameraMatrix);
    }
    return m4.inverse(cameraMatrix);
  }

  private getTargetAsMatrix() {
    return [this.target.x, this.target.y, this.target.z];
  }

  private applyRotation(matrix: number[]) {
    matrix = m4.zRotate(matrix, m4.degToRad(this.rotation.z));
    matrix = m4.xRotate(matrix, m4.degToRad(this.rotation.x));
    matrix = m4.yRotate(matrix, m4.degToRad(this.rotation.y));
    return matrix;
  }

  private applyTranslation(matrix: number[]) {
    return m4.translate(
      matrix,
      this.translation.x,
      this.translation.y,
      this.translation.z
    );
  }

  static fromSettings(cameraSettings: CameraSettings): Camera {
    const camera = new Camera();
    camera.setFOV(cameraSettings.fovDegrees);
    camera.translation = cameraSettings.translation;
    if (cameraSettings.rotation) {
      camera.rotation = cameraSettings.rotation;
    }
    if (cameraSettings.target) {
      camera.setTarget(cameraSettings.target);
    }
    return camera;
  }
}
