import React, { useState } from "react";

const FieldComponent = ({ field, fieldIndex, setFeildsData }) => {
  const [fieldData, setFieldData] = useState(field);

  const Options = ["String", "Number", "Boolean", "Object"];
  const HandleFieldNameChange = (e) => {
    setFieldData({ ...fieldData, name: e.target.value });
    setFeildsData(fieldData, fieldIndex);
  };
  const HandleTypeChange = (e) => {
    const type = e.target.value;
    if (type === "Object") {
      setFieldData({
        ...fieldData,
        type: type,
        objectData: [{ name: "addName", type: "String", required: false }],
      });
    } else {
      if (fieldData.objectData) {
        delete fieldData.objectData;
      }
      setFieldData({ ...fieldData, type: type });
    }
    setFeildsData(fieldData, fieldIndex);
  };
  const HandleRequiredChange = () => {
    setFieldData({ ...fieldData, required: !fieldData.required });
    setFeildsData(fieldData, fieldIndex);
  };
  const HandleDeleteField = () => {
    setFeildsData("deleteField", fieldIndex);
  };
  const HandleFieldsdata = (fobjectFeldData, objectFieldIndex) => {
    if (fieldData === "deleteField") {
      const newCreatedFields = [...fieldData.objectData];
      newCreatedFields.splice(objectFieldIndex, 1);
      setFieldData({ ...fieldData, objectData: newCreatedFields });
      setFeildsData(fieldData, fieldIndex);
    } else {
      const newCreatedFields = [...fieldData.objectData];
      newCreatedFields[objectFieldIndex] = fobjectFeldData;
      setFieldData({ ...fieldData, objectData: newCreatedFields });
      setFeildsData(fieldData, fieldIndex);
    }
  };

  const HandleAddObjectField = () => {
    setFieldData({
      ...fieldData,
      objectData: [
        ...fieldData.objectData,
        { name: "addName", type: "String", required: false },
      ],
    });
    setFeildsData(fieldData, fieldIndex);
  };
  return (
    <div className="feild-wrapper">
      <div className="field-content">
        <h2>{fieldIndex + 1}.</h2>
        <span>
          <div className="name-type-wrapper">
            <input
              type="text"
              value={fieldData.name}
              onChange={(e) => HandleFieldNameChange(e)}
            />
            <select
              name="type"
              value={fieldData.type}
              onChange={(e) => HandleTypeChange(e)}
            >
              {Options.map((option, optionIndex) => (
                <option key={optionIndex} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="field-options">
            <div
              className="required-btn"
              onClick={() => HandleRequiredChange()}
            >
              Required:
              <span
                style={{
                  justifyContent: fieldData.required
                    ? "flex-end"
                    : "flex-start",
                  backgroundColor: fieldData.required ? "#aa068c" : "#252525",
                }}
                className="required-btn-slider"
              >
                {" "}
                <span />{" "}
              </span>
            </div>
            {fieldData.type === "Object" && (
              <button
                className="add-btn"
                onClick={() => HandleAddObjectField()}
              >
                +
              </button>
            )}
            <button onClick={() => HandleDeleteField()}> Delete</button>
          </div>
        </span>
      </div>
      {fieldData.type === "Object" &&
        fieldData.objectData.length > 0 &&
        fieldData.objectData.map((objectField, objectFieldIndex) => (
          <div className="object-field-wrapper" key={objectFieldIndex}>
            <FieldComponent
              field={objectField}
              fieldIndex={objectFieldIndex}
              key={objectFieldIndex}
              setFeildsData={(val, fIndex) => HandleFieldsdata(val, fIndex)}
            />
          </div>
        ))}
    </div>
  );
};

export default FieldComponent;
