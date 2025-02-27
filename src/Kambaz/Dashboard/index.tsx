import {useState} from "react";
import { Link } from "react-router-dom";
import {Row, Col, Card} from "react-bootstrap";
// import * as db from "../Database";
import { useSelector, useDispatch } from "react-redux";
import { addCourse, updateCourse, deleteCourse } from "./courseReducer";
import { addEnrollment, deleteEnrollment } from "./enrollmentReducer";
import { v4 as uuidv4 } from "uuid";

export default function Dashboard(
  // { courses, course, setCourse, addNewCourse,
  // deleteCourse, updateCourse }: {
  // courses: any[]; course: any; setCourse: (course: any) => void;
  // addNewCourse: () => void; deleteCourse: (course: any) => void;
  // updateCourse: () => void; }
) {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    // const { enrollments } = db;
    const {enrollments} = useSelector((state: any) => state.enrollmentsReducer);
    const { courses } = useSelector((state: any) => state.coursesReducer);
    const dispatch = useDispatch();
    const defaultCourseInfo = {
      _id: "0", name: "New Course", number: "New Number",
      startDate: "2023-09-10", endDate: "2023-12-15",
      image: "/images/reactjs.jpg", description: "New Description"
    }
    const [course, setCourse] = useState(defaultCourseInfo);
    const [courseView, setCourseView] = useState(false);
    
    const addNewCourse = () => {
      dispatch(addCourse(course));
      setCourse(defaultCourseInfo);
    }
    const updateExistingCourse = () => {
      dispatch(updateCourse(course));
      setCourse(defaultCourseInfo);
    }
    const deleteExistingCourse = (cid: any) => {
      dispatch(deleteCourse(cid));
    }
    return (
        <div id="wd-dashboard">
          <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
          {currentUser.role === "FACULTY" && (
            <div id="wd-dashboard-new-course-section">
              <h5>New Course
                <button className="btn btn-primary float-end"
                        id="wd-add-new-course-click"
                        onClick={addNewCourse} > Add </button>
                <button className="btn btn-warning float-end me-2"
                    onClick={updateExistingCourse} id="wd-update-course-click">
                  Update
                </button>
              </h5>
          <br />
          <input    value={course.name} className="form-control mb-2" onChange={(e) => setCourse({ ...course, name: e.target.value }) }  />
          <textarea value={course.description} className="form-control" onChange={(e) => setCourse({ ...course, description: e.target.value }) } />
          <hr />
          </div>)}
          <DashboardTitle currentUser={currentUser}  courses={courses} enrollments={enrollments} courseView={courseView} setCourseView={setCourseView}/>
           <hr />
          <div id="wd-dashboard-courses">
            <Row xs={1} md={5} className="g-4">
            {courseView && courses.map((course: any) => (
            <Col className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Card.Img src="/images/reactJS.png" variant="top" width="100%" height={160} />
                <Card.Body className="card-body">
                  <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    {course.name} </Card.Title>
                  <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                    {course.description} </Card.Text>
                  {/* <Button variant="primary"> Go </Button> */}
                  <CourseEnrollmentButton courses={courses} course={course} enrollments={enrollments} currentUser={currentUser}/>
                </Card.Body>
              </Card>
            </Col>
          ))}

              {courses.filter((c: any) => enrollments.some((enrollment: { user: any; course: any; }) => enrollment.user === currentUser._id && enrollment.course === c._id && !courseView)).map((c: any) => (
                <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                  <Card>
                    <Link to={`/Kambaz/Courses/${c._id}/Home`}
                          className="wd-dashboard-course-link text-decoration-none text-dark" >
                      <img src="/images/reactJS.png" width="100%" height={160} />
                      <div className="card-body">
                        <h5 className="wd-dashboard-course-title card-title">
                        {c.name} </h5>
                        <p className="wd-dashboard-course-title card-text overflow-y-hidden" style={{ maxHeight: 100 }}>
                      {c.description} </p>
                        <button className="btn btn-primary"> Go </button>
                        {currentUser.role === "FACULTY" && (
                        <span id="wd-dashboard-course-control-buttons">
                          <button onClick={(event) => {
                                    event.preventDefault();
                                    deleteExistingCourse(c._id);
                                  }} className="btn btn-danger float-end"
                                  id="wd-delete-course-click">
                                  Delete
                          </button>
                          <button id="wd-edit-course-click"
                            onClick={(event) => {
                              event.preventDefault();
                              setCourse(c);
                            }}
                            className="btn btn-warning me-2 float-end" >
                            Edit
                          </button>
                        </span>)}
                      </div>
                    </Link>
                  </Card>
                </Col>
                ))}
            </ Row>
          </div>
      </div>);
}


function DashboardTitle({currentUser, courses, enrollments, courseView, setCourseView}:{currentUser: any, courses: any, enrollments: any, courseView: boolean, setCourseView: (view: boolean) => void;}) {
  if (currentUser.role == "STUDENT") {
    const enrolledCourses = courses.filter((c: any) => enrollments.some((enrollment: { user: any; course: any; }) => enrollment.user === currentUser._id && enrollment.course === c._id))
    const handleClick = () => {setCourseView(!courseView)};
    return(<div className="d-flex justify-content-between">
            {courseView ? (<h2 id="wd-dashboard-enrolled">All Courses ({courses.length})</h2>) : (<h2 id="wd-dashboard-enrolled">Enrolled Courses ({enrolledCourses.length})</h2>)}
            <button id="wd-dashboard-enrollments-button" onClick={handleClick} className="btn btn-primary">Enrollments</button>
            
    </div>);
  } else {
    <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
  }
}

function CourseEnrollmentButton({currentUser, enrollments, courses, course}: {currentUser: any, enrollments: any, courses: any, course: any}) {
  const enrolledCourses = courses.filter((c: any) => enrollments.some((enrollment: { user: any; course: any; }) => enrollment.user === currentUser._id && enrollment.course === c._id));
  const dispatch = useDispatch();
  if (enrolledCourses.find((c: any) => c._id === course._id)) {
    const enrollment = {user: currentUser._id, course: course._id};
    return(<button className="btn btn-danger" onClick={() => {dispatch(deleteEnrollment(enrollment))}}>Unenroll</button>);
  } else {
    const enrollment = {_id: uuidv4(), user: currentUser._id, course: course._id}
    return (<button className="btn btn-success" onClick={() => {dispatch(addEnrollment(enrollment))}}>Enroll</button>)
  }
}

// export default function Dashboard() {
//     var courses = [
//         {
//             courseName: "React JS",
//             courseNum: 1234,
//             courseTitle: "Learn ReactJS Front end",
//             courseImgSrc: "/images/reactJS.png"
//         },
//         {
//             courseName: "Express JS",
//             courseNum: 4567,
//             courseTitle: "Learn ExpressJS server",
//             courseImgSrc: "/images/expressJS.png"
//         },
//         {
//             courseName: "Node JS",
//             courseNum: 7890,
//             courseTitle: "Learn NodeJS",
//             courseImgSrc: "/images/nodeJS.png"
//         },
//         {
//             courseName: "MongoDB",
//             courseNum: 4678,
//             courseTitle: "Learn database management",
//             courseImgSrc: "/images/mongoDB.png"
//         },
//         {
//             courseName: "Spring boot",
//             courseNum: 6372,
//             courseTitle: "Learn Springboot",
//             courseImgSrc: "/images/springBoot.png"
//         },
//         {
//             courseName: "HTML",
//             courseNum: 3451,
//             courseTitle: "Learn HTML",
//             courseImgSrc: "/images/HTML.png"
//         },
//         {
//             courseName: "CSS",
//             courseNum: 8356,
//             courseTitle: "Learn CSS styling",
//             courseImgSrc: "/images/CSS.jpg"
//         },
//         {
//             courseName: "Data Structures",
//             courseNum: 4561,
//             courseTitle: "Learn data structures",
//             courseImgSrc: "/images/dataStructures.png"
//         },
//         {
//             courseName: "Algorithms",
//             courseNum: 6532,
//             courseTitle: "Learn Algorithms",
//             courseImgSrc: "/images/algorithms.jpg"
//         },
//         {
//             courseName: "Mobile Development",
//             courseNum: 4452,
//             courseTitle: "Learn Swift and Kotlin",
//             courseImgSrc: "/images/mobileDevelopment.jpg"
//         }
//     ];
//   return (
//     <div id="wd-dashboard">
//       <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
//       <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
//       <div id="wd-dashboard-courses" className="row">
//         <div className="row row-cols-1 row-cols-md-5 g-4">
//             {
//                 courses.map((course) => (
//                     <Course courseName={course.courseName} 
//                     courseNum={course.courseNum} 
//                     courseTitle={course.courseTitle}
//                     courseImgSrc={course.courseImgSrc}/>
//                 ))
//             }
//         </div>
//       </div>
//     </div>
// );}

// const Course = ({courseName, courseNum, courseTitle, courseImgSrc}: courseProps) => {
//     var courseLink = "/Kambaz/Courses/" + String(courseNum) + "/Home";
//     return (
//         <div className="wd-dashboard-course col" style={{width: "270px"}}>
//             <div className="card rounded-3 overflow-hidden">
//                 <Link to={courseLink}
//                         className="wd-dashboard-course-link text-decoration-none text-dark" >
//                     <img src={courseImgSrc} width="100%" height={160} />
//                     <div className="card-body">
//                     <h5 className="wd-dashboard-course-title card-title"> {courseName} </h5>
//                     <p className="wd-dashboard-course-title card-text">
//                         {courseTitle}  </p>
//                     <button className="btn btn-primary"> Go </button>
//                     </div>
//                 </Link>
//             </div>
//         </div>
//     );
// };

// interface courseProps {
//     courseName: string;
//     courseNum: number;
//     courseTitle: string;
//     courseImgSrc: string;
// };