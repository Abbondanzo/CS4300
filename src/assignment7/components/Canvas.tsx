import React, { useEffect, useState } from "react";

import { useScene } from "../hooks/useScene";
import Camera, { CameraSettings } from "../webgl/Camera";
import Light, { LightSettings } from "../webgl/Light";

interface Props {
  shapes: Canvas3D.Shape[];
  cameraSettings: CameraSettings;
  lightSettings: LightSettings;
  onClick: (translation: Canvas3D.Translation) => void;
}

const Canvas = ({ shapes, cameraSettings, lightSettings, onClick }: Props) => {
  const { scene, canvasRef } = useScene({
    fragmentId: "fragment-shader-3d",
    vertexId: "vertex-shader-3d",
  });
  const [camera, setCamera] = useState(Camera.fromSettings(cameraSettings));
  const [light, setLight] = useState(Light.fromSettings(lightSettings));

  // Rebuild camera each time settings change
  useEffect(() => {
    setCamera(Camera.fromSettings(cameraSettings));
  }, [setCamera, cameraSettings]);

  // Rebuild light source each time settings change
  useEffect(() => {
    setLight(Light.fromSettings(lightSettings));
  }, [setLight, lightSettings]);

  useEffect(() => {
    if (scene) {
      scene.render(shapes, camera, light);
    }
  }, [scene, camera, light, shapes]);

  const onMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const boundingRectangle = (event.target as HTMLCanvasElement).getBoundingClientRect();
    const x = Math.round(
      event.clientX - boundingRectangle.left - boundingRectangle.width / 2
    );
    const y = -Math.round(
      event.clientY - boundingRectangle.top - boundingRectangle.height / 2
    );
    const translation = { x, y, z: -150 };
    onClick(translation);
  };
  return (
    <canvas
      id="canvas"
      width="570px"
      height="300px"
      className="mb-3"
      onMouseDown={onMouseDown}
      ref={canvasRef}
    ></canvas>
  );
};

export default Canvas;
