const render = (): HTMLDivElement => {
  const formGroup = document.createElement("div");
  formGroup.className = "form-group col-md-6";

  // Label
  const label = document.createElement("label");
  label.className = "col-form-label";
  label.textContent = "Shape:";
  formGroup.appendChild(label);

  // Line break
  formGroup.appendChild(document.createElement("br"));

  // Form inputs
  const shapeTypes: ShapeType[] = ["RECTANGLE", "TRIANGLE", "STAR", "CIRCLE"];
  shapeTypes.forEach((shapeType) => {
    const formCheck = document.createElement("div");
    formCheck.className = "form-check form-check-inline";
    //
    const id = `radio-${shapeType.toLowerCase()}`;
    const input = document.createElement("input");
    input.id = id;
    input.name = "shape";
    input.className = "form-check-input";
    input.type = "radio";
    input.value = shapeType;
    input.checked = shapeType === "RECTANGLE";
    //
  });

  return formGroup;

  // <div class="form-group col-md-6">
  //         <label class="col-form-label">Shape:</label>
  //         <br />
  //         <div class="form-check form-check-inline">
  //           <input
  //             id="radio-rectangle"
  //             name="shape"
  //             class="form-check-input"
  //             type="radio"
  //             value="RECTANGLE"
  //             checked
  //           />
  //           <label class="form-check-label" for="radio-rectangle"
  //             >Rectangle</label
  //           >
  //         </div>
  //         <div class="form-check form-check-inline">
  //           <input
  //             id="radio-triangle"
  //             name="shape"
  //             class="form-check-input"
  //             type="radio"
  //             value="TRIANGLE"
  //           />
  //           <label class="form-check-label" for="radio-triangle"
  //             >Triangle</label
  //           >
  //         </div>
  //       </div>
};
