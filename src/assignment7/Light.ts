import m4 from "@common/util/m4";

export interface LightSettings {
  direction: Canvas3D.Vector3;
}

export default class Light {
  direction: Canvas3D.Vector3;

  constructor() {
    this.direction = { x: 0, y: 0, z: 0 };
  }

  getNormalizedDirection() {
    const { x, y, z } = this.direction;
    const source = [x, y, z];
    return m4.normalize(source);
  }

  static fromSettings(settings: LightSettings): Light {
    const light = new Light();
    light.direction = settings.direction;
    return light;
  }
}
