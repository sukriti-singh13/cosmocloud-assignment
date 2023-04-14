import React, { useEffect, useState } from 'react'
import FieldComponent from './FieldComponent';

const HeroSection = () => {
  const [CreatedFields, setCreatedFields] = useState([]);

  const HandleAddField = () => {
    setCreatedFields(
      [...CreatedFields, 
      { name: "addName", type: "String", required: false }]
      )
  }

  const HandleFieldsdata = (fieldData,fIndex) => {
    const newCreatedFields = [...CreatedFields]
if (fieldData === "deleteField" ) {
  newCreatedFields.splice(fIndex, 1)

}else{
  newCreatedFields[fIndex] = fieldData
}
setCreatedFields(newCreatedFields)
  }
  return (
    <div className='app-container'>
      <div className="app-wrapper">
        <span><h5>Field name and type </h5> <button className='add-btn' onClick={() => HandleAddField()}>+</button></span>
        <div className="fields-wrapper" >
          {CreatedFields.map((field, fieldIndex) => (
           <FieldComponent field={field} fieldIndex={fieldIndex} key={fieldIndex} setFeildsData={(fieldData,fIndex)=>HandleFieldsdata(fieldData,fIndex)}/>

          ))}
        </div>

      </div>
    </div>
  )
}

export default HeroSection