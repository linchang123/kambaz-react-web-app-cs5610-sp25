{/**
    This exercise illustrates using useState() with string state variables.
    */}
import { useState } from "react";
export default function StringStateVariables() {
  const [firstName, setFirstName] = useState("John");
  return (
    <div>
      <h2>String State Variables</h2>
      <p>{firstName}</p>
      <input
        className="form-control"
        defaultValue={firstName} // the input field's value is initialized to the "firstName" state variable
        onChange={(e) => setFirstName(e.target.value)}/>
        {/** the "onChange" attribute invokes the "setFirstName()" mutator function to 
          update "firstName" state variable.
         * the "e.target.value" contains the value of the input field and is used to update the current
         value of the state variable.*/}
<hr/></div>);}
