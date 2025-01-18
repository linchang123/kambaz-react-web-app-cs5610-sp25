import AssignmentsControlButtons from "./AssignmentsControlButtons";
import AssignmentsControls from "./AssignmentsControls";
import { IoMdArrowDropdown } from "react-icons/io";
import { BsGripVertical } from "react-icons/bs";
import { FaFilePen } from "react-icons/fa6";
import { Row, Col } from "react-bootstrap";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaCheckCircle, FaCircle } from "react-icons/fa";

export default function Assignments() {
    var assignments = [
        {
            assignmentTitle: "A1 - ENV + HTML",
            assignmentAvailable: "May 6 at 12:00am",
            assignmentDue: "May 13 at 11:59pm",
            assignmentURL: "",
            assignmentPoints: 0,
            assignmentDetails: ""
        },
        {
            assignmentTitle: "A2 - CSS + BOOTSTRAP",
            assignmentAvailable: "May 13 at 12:00am",
            assignmentDue: "May 20 at 11:59pm",
            assignmentURL: "",
            assignmentPoints: 0,
            assignmentDetails: ""
        },
        {
            assignmentTitle: "A3 - JAVASCRIPT + REACT",
            assignmentAvailable: "May 20 at 12:00am",
            assignmentDue: "May 27 at 11:59pm",
            assignmentURL: "",
            assignmentPoints: 0,
            assignmentDetails: ""
        }
    ];
    return (
      <div id="wd-assignments">
        <div className="text-nowrap">
            <AssignmentsControls/>
        </div>
        <div id="wd-assignments-title" className="wd-title p-3 ps-2 bg-secondary fs-5 fw-bolder mt-5">
            <BsGripVertical className="me-2 fs-3" />
            <IoMdArrowDropdown className="me-2 fs-3"/>
            ASSIGNMENTS
            <AssignmentsControlButtons/>
        </div>
        <ul id="wd-assignment-list" className="list-group rounded-0">
          {
            assignments.map((assignment) => (
                <Assignment assignmentTitle={assignment.assignmentTitle} 
                assignmentAvailable={assignment.assignmentAvailable}
                assignmentDue={assignment.assignmentDue}
                assignmentURL={assignment.assignmentURL}
                assignmentDetails={assignment.assignmentDetails}
                assignmentPoints={assignment.assignmentPoints}
                />
            ))
          }
        </ul>
      </div>
  );}
  
const Assignment = ({assignmentTitle, assignmentAvailable,
    assignmentDue}: assignmentProps) => {
    return (
        <li className="wd-assignment-list-item list-group-item p-3 ps-1 d-flex align-items-center">
        {/*<li className="wd-assignment-list-item list-group-item p-3 ps-1">
             <Row>
                <Col xs={1}>
                    <BsGripVertical className="me-2 fs-3 position-relative" style={{ top: "20%" }}/>
                </Col>
                <Col xs={1}>
                    <FaFilePen className="me-2 fs-3 position-relative" style={{ top: "20%" }}/>
                </Col>
                <Col xs={8}>
                    <a href="#/Kambaz/Courses/1234/Assignments/123"
                    className="wd-assignment-link fw-bold text-black text-decoration-none fs-5" >
                    {assignmentTitle}
                    </a> 
                    <p className="m-0">
                        <span className="text-danger">Multiple Modules</span> | <span className="fw-bold">Not Available until </span>{assignmentAvailable} |
                        <span className="fw-bold">Due</span> {assignmentDue} | 100pts
                    </p>
                </Col>
                <Col xs={1} >
                    <GreenCheckmark/>
                   
                </Col>
                <Col>
                    <IoEllipsisVertical className="fs-4"/>
                </Col>
            </Row>
        */}
             <BsGripVertical className="my-3 me-2 fs-3" style={{minWidth: "30px"}}/>
             <FaFilePen className="my-3 fs-3 "style={{minWidth: "30px"}}/>
             <div className="ms-3" style={{width: "90%"}}>
                 <a href="#/Kambaz/Courses/1234/Assignments/123"
                  className="wd-assignment-link fw-bold text-black text-decoration-none fs-5" >
                  {assignmentTitle}
                 </a> 
                 <p className="m-0">
                     <span className="text-danger">Multiple Modules</span> | <span className="fw-bold">Not Available until </span>{assignmentAvailable} | <br/>
                     <span className="fw-bold">Due</span> {assignmentDue} | 100pts
                 </p>

             </div>
             <div className="d-flex align-items-center ms-3" style={{minWidth: "68px"}}>
                 <Row>
                     <Col><GreenCheckmark/></Col>
                     <Col><IoEllipsisVertical className="fs-4" /></Col>
                 </Row>
             </div>
        </li>
    );
};


interface assignmentProps {
    assignmentTitle: string;
    assignmentURL: string;
    assignmentPoints: number;
    assignmentAvailable: string;
    assignmentDue: string;
    assignmentDetails: string;
};

function GreenCheckmark() {
  return (
    <span className="me-1">
      <FaCheckCircle
        className="text-success me-1 position-absolute fs-2" />
      <FaCircle className="text-white me-1 fs-6" />
    </span>
);}