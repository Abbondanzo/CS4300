import React, { useEffect } from "react";
import { useScene } from "../hooks/useScene";

interface Props {
  shapes: Canvas3D.Shape[];
  onClick: (translation: Canvas3D.Translation) => void;
}

const Canvas = ({ shapes, onClick }: Props) => {
  const { scene, canvasRef } = useScene({
    fragmentId: "fragment-shader-3d",
    vertexId: "vertex-shader-3d",
  });

  useEffect(() => {
    if (scene) {
      scene.render(shapes);
    }
  }, [scene, shapes]);

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
      width="500px"
      height="300px"
      className="mb-3"
      onMouseDown={onMouseDown}
      ref={canvasRef}
    ></canvas>
  );
};

export default Canvas;
