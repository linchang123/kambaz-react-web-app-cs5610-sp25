import { useState } from "react";
export default function ArrayStateVariable() {
  const [array, setArray] = useState([1, 2, 3, 4, 5]);
  const addElement = () => {
    setArray([...array, Math.floor(Math.random() * 100)]);
  };
  const deleteElement = (index: number) => {
    setArray(array.filter((_, i) => i !== index));
  };
  return (
    <div id="wd-array-state-variables" className="ms-2">
      <h2>Array State Variable</h2>
      <button className="btn btn-success" onClick={addElement}>Add Element</button>
      <ul className="list-group mt-2">
        {array.map((item, index) => (
          <li key={index} className="border list-unstyled w-25 rounded fs-3 pt-1 ps-3" style={{}}>
            {item}
            <button className="btn btn-danger float-end m-2" onClick={() => deleteElement(index)}
                    id="wd-delete-element-click">
              Delete</button>
          </li>
        ))}
      </ul>
      <hr/>
    </div>
  );
}
