import { getScriptContentsById } from "@common/setup/getScriptContentsById";
import { RefObject, useEffect, useRef, useState } from "react";

import Scene from "../Scene";

interface UseSceneOptions {
  fragmentId: string;
  vertexId: string;
}

interface UseStateValues {
  scene: Scene | null;
  canvasRef: RefObject<HTMLCanvasElement>;
}

export const useScene = (options: UseSceneOptions): UseStateValues => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [scene, setScene] = useState<Scene | null>(null);
  const [hasRendered, setHasRendered] = useState(false);

  // Rebuild scene if options or canvas reference is modified
  useEffect(() => {
    const { current } = canvasRef;
    if (!hasRendered) {
      setHasRendered(true);
    } else if (current !== null) {
      setScene(
        Scene.init(
          canvasRef.current,
          getScriptContentsById(options.vertexId),
          getScriptContentsById(options.fragmentId)
        )
      );
    }
  }, [options.fragmentId, options.vertexId, canvasRef.current]);

  return { scene, canvasRef };
};
