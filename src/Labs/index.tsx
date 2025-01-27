/**Components can import other components to aggregate the code snippets
 of the components into larger, more complex HTML content.
*/
import Lab1 from "./Lab1"; 
import { Route, Routes, Navigate } from "react-router";
import TOC from "./TOC";
import Lab2 from "./Lab2";
import Lab3 from "./Lab3";

export default function Labs() {
  return (
    <div id="wd-labs">
      <h1>Chang Lin - Section 1</h1>
      <h1>Labs</h1>
      {/* <Lab1 />
        {/* The Lab1 function is invoked with the HTML syntax <Lab1/>
        which is replaced by HTML the function returns implemented in the
        Lab1 function */}
      <TOC />
      <Routes>
        <Route path="/" element={<Navigate to="Lab1" />} />
        <Route path="Lab1" element={<Lab1 />} />
        <Route path="Lab2/*" element={<Lab2 />} />
        <Route path="Lab3/*" element={<Lab3 />} />
      </Routes>
    </div>
);}

