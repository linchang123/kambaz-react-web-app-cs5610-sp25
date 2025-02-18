import { useState } from "react";
export default function ObjectStateVariable() {
  const [person, setPerson] = useState({ name: "Peter", age: 24 });
  {/** declare "person" object state variable with initial property values "name" and "age"
     */}
  return (
    <div>
      <h2>Object State Variables</h2>
      <pre>{JSON.stringify(person, null, 2)}</pre>
      <input
        defaultValue={person.name} // input field value default to "person" object state variable's name property
        onChange={(e) => setPerson({ ...person, name: e.target.value })}
        // As the user types in the input fields, the "onChange" attribute passes the events to update the
        // "person" object's name property using the "setPerson()" mutator function.
        // "person" object is updated by creating new objects copied from the previous object value using the
        // spreader operator (...) and then overriding the "name" and "age" property with the event object's
        // "target" value
      />
      <input
        defaultValue={person.age}
        onChange={(e) => setPerson({ ...person,
                                     age: parseInt(e.target.value) })}
      />
      <hr/>
    </div>
  );
}
