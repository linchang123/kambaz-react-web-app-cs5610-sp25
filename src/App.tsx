import Labs from "./Labs";
import Kambaz from "./Kambaz";
import store from "./Kambaz/store";
import { Provider } from "react-redux";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
// import './App.css'

/**
 the App component is the top most, root component that is the entry point 
 to the React Web application. 
 */
 export default function App() {
  /**
   The computation of the user interface starts by invoking and evaluating App() 
   */
  return (
    <HashRouter>
      <Provider store={store}>
        <div>
          <Routes>
            <Route path="/" element={<Navigate to="Kambaz" />} />
            <Route path="/Labs/*" element={<Labs />} />
            <Route path="/Kambaz/*" element={<Kambaz />} />
          </Routes>
        </div>
      </Provider>
    </HashRouter>
    
);}

