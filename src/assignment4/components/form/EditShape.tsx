import React, { Component } from "react";

import { objectEquality } from "../../utils/objectEquality";

interface Props {
  activeShape: BasicCanvas.Shape;
  onUpdate: (shape: BasicCanvas.Shape) => void;
}

interface State {
  translation: BasicCanvas.Translation;
  scale: BasicCanvas.Scale;
  color: BasicCanvas.Color;
}

class EditShape extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      translation: props.activeShape.translation,
      scale: props.activeShape.scale,
      color: props.activeShape.color,
    };
  }

  componentDidUpdate() {
    this.checkEquality();
  }

  render() {
    return <div>Nothing</div>;
  }

  private checkEquality() {
    const { translation, scale, color } = this.props.activeShape;
    const newState: State = {
      translation,
      scale,
      color,
    };
    if (!objectEquality(this.state, newState)) {
      this.setState(newState);
    }
  }
}

export default EditShape;
