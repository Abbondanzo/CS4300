import React, { useEffect } from "react";
import { useScene } from "../hooks/useScene";

interface Props {
  shapes: BasicCanvas.Shape[];
  onClick: (translation: BasicCanvas.Translation) => void;
}

const Canvas = ({ shapes, onClick }: Props) => {
  const { scene, canvasRef } = useScene({
    fragmentId: "fragment-shader-2d",
    vertexId: "vertex-shader-2d",
  });

  useEffect(() => {
    if (scene) {
      scene.render(shapes);
    }
  }, [scene, shapes]);

  const onMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const boundingRectangle = (event.target as HTMLCanvasElement).getBoundingClientRect();
    const x = event.clientX - boundingRectangle.left;
    const y = event.clientY - boundingRectangle.top;
    onClick({ x, y });
  };
  return (
    <canvas
      id="canvas"
      width="500px"
      height="300px"
      onMouseDown={onMouseDown}
      ref={canvasRef}
    ></canvas>
  );
};

export default Canvas;
