import FormVector3 from "@common/components/form/FormVector3";
import React from "react";

import { CameraSettings } from "../../Camera";
import FieldOfView from "./FieldOfView";

const DEFAULT_TARGET: Canvas3D.Vector3 = { x: 0, y: 0, z: 0 };
const DEFAULT_ROTATION: Canvas3D.Vector3 = { x: 0, y: 0, z: 0 };

interface Props {
  cameraSettings: CameraSettings;
  onChange(cameraSettings: CameraSettings): void;
}

interface State {
  lookAtEnabled: boolean;
}

class CameraSettingsForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      lookAtEnabled: Boolean(props.cameraSettings.target),
    };
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  renderLookAtToggle() {
    return (
      <div className="form-row">
        <div className="form-group col-md-12">
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="look-at-toggle"
              checked={this.state.lookAtEnabled}
              onChange={this.toggleLookAt}
            />
            <label className="form-check-label" htmlFor="look-at-toggle">
              Enable "Look At" (disables key controls)
            </label>
          </div>
        </div>
      </div>
    );
  }

  private readonly toggleLookAt = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { checked } = event.target;
    this.setState({
      lookAtEnabled: checked,
    });
    const { onChange, cameraSettings } = this.props;
    if (checked) {
      onChange({
        ...cameraSettings,
        target: cameraSettings.target || DEFAULT_TARGET,
      });
    } else {
      onChange({
        ...cameraSettings,
        target: undefined,
        rotation: cameraSettings.rotation || DEFAULT_ROTATION,
      });
    }
  };

  render() {
    const { lookAtEnabled } = this.state;
    const {
      fovDegrees,
      translation,
      rotation,
      target,
    } = this.props.cameraSettings;

    return (
      <form>
        {this.renderLookAtToggle()}
        <FieldOfView fieldOfView={fovDegrees} onChange={this.onFOVUpdate} />
        <FormVector3
          disabled={!lookAtEnabled}
          title="Target"
          value={target || DEFAULT_TARGET}
          step={5}
          onChange={this.onVectorUpdate("target")}
        />
        <FormVector3
          title="Translation"
          value={translation}
          step={5}
          onChange={this.onVectorUpdate("translation")}
        />
        <FormVector3
          disabled={lookAtEnabled}
          title="Rotation"
          value={rotation || DEFAULT_ROTATION}
          step={2}
          onChange={this.onVectorUpdate("rotation")}
        />
      </form>
    );
  }

  private readonly onVectorUpdate = (
    key: "translation" | "target" | "rotation"
  ) => (value: Canvas3D.Vector3) => {
    const { onChange, cameraSettings } = this.props;
    onChange({ ...cameraSettings, [key]: value });
  };

  private readonly onFOVUpdate = (fovDegrees: number) => {
    const { onChange, cameraSettings } = this.props;
    onChange({ ...cameraSettings, fovDegrees });
  };

  private readonly handleKeyDown = (event: KeyboardEvent) => {
    // These keys should only change translation when not focused on target. For future assignment work
    if (this.props.cameraSettings.target !== undefined) {
      return;
    }

    const fast = event.shiftKey;
    let xBase = 0;
    let yBase = 0;
    let zBase = 0;
    switch (event.key) {
      case "W":
      case "w":
        zBase = -1;
        break;
      case "A":
      case "a":
        xBase = -1;
        break;
      case "S":
      case "s":
        zBase = 1;
        break;
      case "D":
      case "d":
        xBase = 1;
        break;
      case " ":
        yBase = 1;
        break;
      case "Control":
        yBase = -1;
        break;
    }

    if (xBase !== 0 || yBase !== 0 || zBase !== 0) {
      event.preventDefault();
      event.stopPropagation();
      this.handleMove(xBase, yBase, zBase, fast);
    }
  };

  private readonly handleMove = (
    x: number,
    y: number,
    z: number,
    fast: boolean
  ) => {
    const multFactor = fast ? 5 : 2;
    const { cameraSettings, onChange } = this.props;
    const translation = {
      x: cameraSettings.translation.x += x * multFactor,
      y: cameraSettings.translation.y += y * multFactor,
      z: cameraSettings.translation.z += z * multFactor,
    };
    onChange({
      ...cameraSettings,
      translation,
    });
  };
}

export default CameraSettingsForm;
