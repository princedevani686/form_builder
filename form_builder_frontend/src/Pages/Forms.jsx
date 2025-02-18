import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import SignatureCanvas from 'react-signature-canvas';
const fieldTypes = [
  { type: "text", label: "Text Input" },
  { type: "textarea", label: "Text Area" },
  { type: "number", label: "Number Input" },
  { type: "select", label: "Dropdown" },
  { type: "radio", label: "Radio Buttons" },
  { type: "checkbox", label: "Checkboxes" },
  { type: "date", label: "Date Picker" },
  { type: "file", label: "File Upload" },
  { type: "signature", label: "Signature Fields" },
];

const DraggableField = ({ field }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "FIELD",
    item: field,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} className="p-2 border bg-light mb-2 w-100" style={{ opacity: isDragging ? 0.5 : 1 }}>
      {field.label}
    </div>
  );
};

const DroppableField = ({ field, index, moveField, handleLabelChange, handleOptionAdd, handleOptionRemove, handleDelete }) => {
  const [, drag] = useDrag(() => ({
    type: "FORM_FIELD",
    item: { index },
  }));

  const [, drop] = useDrop(() => ({
    accept: "FORM_FIELD",
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveField(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  }));

  return (
    <div ref={(node) => drag(drop(node))} className="d-flex align-items-center gap-2 p-2 bg-white w-100 position-relative">
      <input
        type="text"
        className="form-control mx-2"
        value={field.label}
        onChange={(e) => handleLabelChange(field.id, e.target.value)}
        style={{ width: "150px" }}
      />
      {field.type === "text" && <input type="text" className="form-control" />} {/* text input */}
      {field.type === "textarea" && <textarea className="form-control"></textarea>}   {/* text area */}
      {field.type === "number" && <input type="number" className="form-control" />} {/* number input */}
      {/* drop down button */}
      {field.type === "select" && (
        <div className="d-flex justify-content-between align-items-center w-100">
          <select className="form-control w-75">
            <option>Option 1</option>
            <option>Option 2</option>
            {field.options.map((opt, i) => (
              <option key={i}>{opt}</option>
            ))}
          </select>
          <div className="d-flex">
            <button className="btn btn-sm btn-secondary mx-1 d-flex align-items-center justify-content-center" style={{ width: "22px", height: "22px", padding: "0", fontSize: "12px" }} onClick={() => handleOptionAdd(field.id)}>
              <i className="fa-solid fa-plus"></i>
            </button>
            <button className="btn btn-sm btn-danger d-flex align-items-center justify-content-center" style={{ width: "22px", height: "22px", padding: "0", fontSize: "12px" }} onClick={() => handleOptionRemove(field.id)} disabled={field.options.length === 0}>
              <i className="fa-solid fa-minus"></i>
            </button>
          </div>
        </div>
      )}
      {/* radio button */}
      {field.type === "radio" && (
        <div className="d-flex justify-content-between align-items-center w-100 mt-1">
          <div>
            <label className="me-2">
              <input type="radio" className="mx-1" name={`radio-${field.id}`} /> Option 1
            </label>
            <label className="me-2">
              <input type="radio" className="mx-1" name={`radio-${field.id}`} /> Option 2
            </label>
            {field.options.map((opt, i) => (
              <label key={i} className="me-2">
                <input type="radio" className="mx-1" name={`radio-${field.id}`} /> {opt}
              </label>
            ))}
          </div>
          <div className="d-flex">
            <button className="btn btn-sm btn-secondary mx-1 d-flex align-items-center justify-content-center" style={{ width: "22px", height: "22px", padding: "0", fontSize: "12px" }} onClick={() => handleOptionAdd(field.id)}>
              <i className="fa-solid fa-plus"></i>
            </button>
            <button className="btn btn-sm btn-danger d-flex align-items-center justify-content-center" style={{ width: "22px", height: "22px", padding: "0", fontSize: "12px" }} onClick={() => handleOptionRemove(field.id)} disabled={field.options.length === 0}>
              <i className="fa-solid fa-minus"></i>
            </button>
          </div>
        </div>
      )}
      {/* checkbox */}
      {field.type === "checkbox" && (
        <div className="d-flex justify-content-between align-items-center w-100 mt-1">
          <div>
            <label className="me-2">
              <input type="checkbox" className="mx-1" /> Option 1
            </label>
            <label className="me-2">
              <input type="checkbox" className="mx-1" /> Option 2
            </label>
            {field.options.map((opt, i) => (
              <label key={i} className="me-2">
                <input type="checkbox" className="mx-1" /> {opt}
              </label>
            ))}
          </div>
          <div className="d-flex">
            <button className="btn btn-sm btn-secondary mx-1 d-flex align-items-center justify-content-center" style={{ width: "22px", height: "22px", padding: "0", fontSize: "12px" }} onClick={() => handleOptionAdd(field.id)}>
              <i className="fa-solid fa-plus"></i>
            </button>
            <button className="btn btn-sm btn-danger d-flex align-items-center justify-content-center" style={{ width: "22px", height: "22px", padding: "0", fontSize: "12px" }} onClick={() => handleOptionRemove(field.id)} disabled={field.options.length === 0}>
              <i className="fa-solid fa-minus"></i>
            </button>
          </div>
        </div>
      )}

      {field.type === "date" && <input type="date" className="form-control" />}   {/* date picker */}
      {field.type === "file" && <input type="file" className="form-control" />}   {/* file upload */}
      {field.type === "signature" && (
        <div>
          <SignatureCanvas
            penColor="black"
            canvasProps={{ width: 400, height: 100, className: "border" }}
          />
        </div>
      )}
      {/* Delete Icon */}
      <i
        className="fa-solid fa-xmark text-white rounded-circle bg-danger position-absolute"
        style={{ cursor: "pointer", fontSize: "10px", marginTop: "-38px", marginLeft: "3px", padding: "2px" }}
        onClick={() => handleDelete(field.id)}
      ></i>
    </div>
  );
};

const DroppableForm = ({ fields, setFields, saveForm }) => {
  const [, drop] = useDrop(() => ({
    accept: "FIELD",
    drop: (item) =>
      setFields((prevFields) => [...prevFields, { ...item, id: Date.now(), label: item.label, options: [] }]),
  }));

  const moveField = (fromIndex, toIndex) => {
    setFields((prevFields) => {
      const updatedFields = [...prevFields];
      const [movedField] = updatedFields.splice(fromIndex, 1);
      updatedFields.splice(toIndex, 0, movedField);
      return updatedFields;
    });
  };

  const handleLabelChange = (id, newLabel) => {
    setFields((prevFields) =>
      prevFields.map((field) => (field.id === id ? { ...field, label: newLabel } : field))
    );
  };
  const handleOptionAdd = (id) => {
    setFields((prevFields) =>
      prevFields.map((field) =>
        field.id === id ? { ...field, options: [...field.options, `Option ${field.options.length + 3}`] } : field
      )
    );
  };
  const handleDelete = (id) => {
    setFields((prevFields) => prevFields.filter((field) => field.id !== id));
  };
  const handleOptionRemove = (id) => {
    setFields((prevFields) =>
      prevFields.map((field) =>
        field.id === id
          ? { ...field, options: field.options.slice(0, -1) }
          : field
      )
    );
  };


  return (
    <div ref={drop} className="border p-3 bg-white w-100" style={{ minHeight: "440px" }}>
      <div className="d-flex flex-column gap-3">
        {fields.map((field, index) => (
          <DroppableField
            key={field.id}
            field={field}
            index={index}
            moveField={moveField}
            handleLabelChange={handleLabelChange}
            handleOptionAdd={handleOptionAdd}
            handleOptionRemove={handleOptionRemove}
            handleDelete={handleDelete}
          />
        ))}
      </div>
      <button className="btn btn-primary mt-3" onClick={saveForm}>Save Form</button>
    </div>
  );
};
const FormPreview = ({ savedFields }) => {
  return (
    <div className="mt-3">
      <h3>Saved Form</h3>
      {savedFields.map((field, index) => (
        <div key={index} className="mb-3">
          <label>{field.label}</label>
          {field.type === "text" && <input type="text" className="form-control" />}
          {field.type === "number" && <input type="number" className="form-control" />}
          {field.type === "date" && <input type="date" className="form-control" />}
          {field.type === "checkbox" && <input type="checkbox" className="form-check-input" />}
          {field.type === "radio" && <input type="radio" className="form-check-input" />}
        </div>
      ))}
    </div>
  );
};

const Forms = () => {
  const [fields, setFields] = useState([]);
  const [savedFields, setSavedFields] = useState(null);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-3 col-sm-12">
            <h4 className="fw-bolder text-center mb-3">Form Fields</h4>
            <div className="d-flex flex-wrap justify-content-center">
              {fieldTypes.map((field, index) => (
                <DraggableField key={index} field={field} />
              ))}
            </div>
          </div>
          <div className="col-md-8 col-sm-12">
            <h4 className="fw-bolder text-center mb-3">Drop Fields Here</h4>
            {/* <DroppableForm fields={fields} setFields={setFields} saveForm={() => setSavedFields(fields)} /> */}
            {!savedFields ? (
              <DroppableForm fields={fields} setFields={setFields} saveForm={() => setSavedFields(fields)} />
            ) : (
              <FormPreview savedFields={savedFields} />
            )}
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default Forms;