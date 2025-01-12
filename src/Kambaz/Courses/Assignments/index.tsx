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
        <input placeholder="Search for Assignments"
               id="wd-search-assignment" />
        <button id="wd-add-assignment-group">+ Group</button>
        <button id="wd-add-assignment">+ Assignment</button>
        <h3 id="wd-assignments-title">
          ASSIGNMENTS 40% of Total <button>+</button> </h3>
        <ul id="wd-assignment-list">
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
    assignmentDue
}: assignmentProps) => {
    return (
        <li className="wd-assignment-list-item">
            <a href="#/Kambaz/Courses/1234/Assignments/123"
               className="wd-assignment-link" >
              {assignmentTitle}
            </a> 
            <p>Multiple Modules | Not Available until {assignmentAvailable} | 
                Due {assignmentDue} | 100pts
            </p>
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