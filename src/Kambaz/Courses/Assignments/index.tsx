import AssignmentsControlButtons from "./AssignmentsControlButtons";
import AssignmentsControls from "./AssignmentsControls";
// import assignmentProps from "./AssignmentProps";
import { IoMdArrowDropdown } from "react-icons/io";
import { BsGripVertical } from "react-icons/bs";
import { FaFilePen } from "react-icons/fa6";
import { Row, Col } from "react-bootstrap";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaCheckCircle, FaCircle } from "react-icons/fa";
import { useParams } from "react-router";
// import * as db from "../../Database";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function Assignments() {
    const { cid } = useParams();
    // const assignments = db.assignments;
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { assignments } = useSelector((state: any) => state.assignmentsReducer);
    const [assignmentId, setAssignmentId] = useState(uuidv4());
    return (
      <div id="wd-assignments">
        <div className="text-nowrap">
        {currentUser.role === "FACULTY" && (<AssignmentsControls assignmentId={assignmentId} setAssignmentId={setAssignmentId}/>)}
        </div>
        <div id="wd-assignments-title" className="wd-title p-3 ps-2 bg-secondary fs-5 fw-bolder mt-5">
            {currentUser.role === "FACULTY" && (<BsGripVertical className="me-2 fs-3" />)}
            <IoMdArrowDropdown className="me-2 fs-3"/>
            ASSIGNMENTS
            {currentUser.role === "FACULTY" && (<AssignmentsControlButtons/>)}
        </div>
        <ul id="wd-assignment-list" className="list-group rounded-0">

          {/* {
            assignments.map((assignment) => (
                <Assignment assignmentTitle={assignment.assignmentTitle} 
                assignmentAvailable={assignment.assignmentAvailable}
                assignmentDue={assignment.assignmentDue}
                assignmentURL={assignment.assignmentURL}
                assignmentDetails={assignment.assignmentDetails}
                assignmentPoints={assignment.assignmentPoints}
                />
            ))
          } */}
          {assignments
          .filter((assignment: any) => assignment.course === cid)
          .map((assignment: any) => (
            <Assignment assignmentTitle={assignment.title} 
            assignmentAvailable={formatDate(assignment.availableFromDate) + "at 12:00am"} 
            assignmentDue={formatDate(assignment.dueDate) + " at 11:59pm"}
            assignmentURL={"#/Kambaz/Courses/" + cid + "/Assignments/" + assignment._id}
            assignmentPoints={assignment.points}
            // assignmentDetails=""
            // assignmentPoints={100}
            />
          ))}
        </ul>
        {assignments.filter((assignment: any) => assignment.course === cid).map((assignment: any) => (
            <div>{assignment.title}</div>
        ))}
      </div>
  );}
  
const Assignment = 
// ({assignmentTitle, assignmentAvailable,assignmentDue, assignmentURL}: assignmentProps) 
    ({assignmentTitle, assignmentAvailable,assignmentDue, assignmentURL, assignmentPoints}: {
        assignmentTitle: string;
        assignmentAvailable:string;
        assignmentDue: string;
        assignmentURL: string;
        assignmentPoints: number;
    }) => {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
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
             {currentUser.role === "FACULTY" && (<BsGripVertical className="my-3 me-2 fs-3" style={{minWidth: "30px"}}/>)}
             <FaFilePen className="m-3 fs-3 "style={{minWidth: "30px"}}/>
             <div className="ms-3" style={{width: "90%"}}>
                 <a href={assignmentURL}
                  className="wd-assignment-link fw-bold text-black text-decoration-none fs-5" >
                  {assignmentTitle}
                 </a> 
                 <p className="m-0">
                     <span className="text-danger">Multiple Modules</span> | <span className="fw-bold">Not Available until </span>{assignmentAvailable} | 
                     {currentUser.role === "FACULTY" && (<br/>)}
                     <span className="fw-bold"> Due</span> {assignmentDue} | {assignmentPoints} pts
                 </p>

             </div>
             {currentUser.role === "FACULTY" && (<div className="d-flex align-items-center ms-3" style={{minWidth: "68px"}}>
                 <Row>
                     <Col><GreenCheckmark/></Col>
                     <Col><IoEllipsisVertical className="fs-4" /></Col>
                 </Row>
             </div>)}
        </li>
    );
};

function GreenCheckmark() {
  return (
    <span className="me-1">
      <FaCheckCircle
        className="text-success me-1 position-absolute fs-2" />
      <FaCircle className="text-white me-1 fs-6" />
    </span>
);}

function formatDate(date: string) {
    const dateTime = date + " 12:00:00";
    const customDate = new Date(dateTime); 
    const options: Intl.DateTimeFormatOptions = {
        month: 'long',
        day: 'numeric'
    };
    const formattedDate: string = customDate.toLocaleDateString(undefined, options);
    return formattedDate;
}