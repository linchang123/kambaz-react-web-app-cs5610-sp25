// import {Link} from "react-router";
import { useLocation } from "react-router";
// import Nav from "react-bootstrap/Nav";

export default function TOC() {
    const { pathname } = useLocation();
    return (
      // <ul>
      //   <li><Link to="/Labs">Labs</Link></li>
      //   <li><Link to="/Labs/Lab1">Lab 1</Link></li>
      //   <li><Link to="/Labs/Lab2">Lab 2</Link></li>
      //   <li><Link to="/Labs/Lab3">Lab 3</Link></li>
      //   <li><Link to="/Kambaz">Kambaz</Link></li>
      // </ul>
      // <Nav variant="pills">
      //   <Nav.Item>
      //     <Nav.Link href="#/Labs">Lab 1</Nav.Link>
      //   </Nav.Item>
      //   <Nav.Item>
      //     <Nav.Link href="#/Labs/Lab1">Lab 1</Nav.Link>
      //   </Nav.Item>
      //   <Nav.Item>
      //     <Nav.Link href="#/Labs/Lab2">Lab 2</Nav.Link>
      //   </Nav.Item>
      //   <Nav.Item>
      //     <Nav.Link href="#/Labs/Lab3">Lab 3</Nav.Link>
      //   </Nav.Item>
      //   <Nav.Item>
      //     <Nav.Link href="#/Kambaz">Kambaz</Nav.Link>
      //   </Nav.Item>
      //   <Nav.Item>
      //     <Nav.Link id="wd-github" href="https://github.com/linchang123/kambaz-react-web-app-cs5610-sp25">My GitHub</Nav.Link>
      //   </Nav.Item>
      // </Nav>
      <ul className="nav nav-pills" id="wd-toc">
        <li className="nav-item"><a id="wd-a"  href="#/Labs" className="nav-link">Labs</a></li>
        <li className="nav-item"><a id="wd-a1" href="#/Labs/Lab1"
            className={`nav-link ${pathname.includes("Lab1") ? "active" : ""}`}>Lab 1</a></li>
        <li className="nav-item"><a id="wd-a2" href="#/Labs/Lab2"
            className={`nav-link ${pathname.includes("Lab2") ? "active" : ""}`}>Lab 2</a></li>
        <li className="nav-item"><a id="wd-a3" href="#/Labs/Lab3"
            className={`nav-link ${pathname.includes("Lab3") ? "active" : ""}`}>Lab 3</a></li>
        <li className="nav-item"><a id="wd-k" href="#/Kambaz" className="nav-link">Kambaz</a></li>
        <li className="nav-item"><a id="wd-github" href="https://github.com/jannunzi" target="_blank"
            className="nav-link">My GitHub</a></li>
    </ul>

    );
  }
  