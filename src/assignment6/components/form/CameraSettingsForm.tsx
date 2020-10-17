import FormVector3 from "@common/components/form/FormVector3";
import React from "react";

import { CameraSettings } from "../../Camera";

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
      lookAtEnabled: true,
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
              Toggle "Look At"
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
        rotation: undefined,
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
    const { translation, rotation, target } = this.props.cameraSettings;

    return (
      <form>
        {this.renderLookAtToggle()}
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

  private readonly handleKeyDown = (event: KeyboardEvent) => {
    const fast = event.shiftKey;
    let xModifier = 0;
    let yModifier = 0;
    switch (event.key) {
      case "w":
        xModifier = 2;
        break;
      case "a":
        break;
      case "s":
        xModifier = -2;
        break;
      case "d":
        break;
    }
  };
}

export default CameraSettingsForm;
