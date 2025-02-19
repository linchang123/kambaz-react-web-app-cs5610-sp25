{/**
    This exercise illustrates using useState() with number/integer state variables.
    */}
import { useState } from "react";
export default function Counter() {
//   let count = 7;
    const [count, setCount] = useState(7);
  console.log(count);
  return (
    <div id="wd-counter-use-state" className="ms-2">
      <h2 className="fw-bold">Counter: {count}</h2>
      <button
        // onClick={() => { count++; console.log(count); }}
        onClick={() => setCount(count + 1)}
        id="wd-counter-up-click"
        className="btn btn-success">
        Up
      </button>
      <button
        // onClick={() => { count--; console.log(count); }}
        onClick={() => setCount(count - 1)}
        id="wd-counter-down-click"
        className="btn btn-danger ms-2">
        Down
      </button>
<hr/></div>);}