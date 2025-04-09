import {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import {Row, Col, Card} from "react-bootstrap";
// import * as db from "../Database";
import { useSelector, useDispatch } from "react-redux";
import * as courseClient from "../Courses/client";
import * as userClient from "../Account/client";
// import * as enrollmentClient from "../Dashboard/enrollmentClient";
// import { v4 as uuidv4 } from "uuid";
import { addCourse, updateCourse, deleteCourse, setCourses } from "./courseReducer";
// import { addEnrollment, deleteEnrollment, setEnrollments } from "./enrollmentReducer";
import FacultyFeatures from "../Account/FacultyFeatures";

export default function Dashboard(
  // { courses, 
  // course, 
  // setCourse, 
  // addNewCourse,
  // deleteCourse, 
  // updateCourse 
  // }: {
  // courses: any[]; 
  // course: any;
  // setCourse: (course: any) => void;
  // addNewCourse: () => void; 
  // deleteCourse: (course: any) => void;
  // updateCourse: () => void; 
  // }
) {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    // const { enrollments } = db;
    // const {enrollments} = useSelector((state: any) => state.enrollmentsReducer);
    const [allCourses, setAllCourses] = useState([]);
    const { courses } = useSelector((state: any) => state.coursesReducer);
    const dispatch = useDispatch();
    const defaultCourseInfo = {
      _id: "0", name: "New Course", number: "New Number",
      startDate: "2023-09-10", endDate: "2023-12-15",
      image: "/images/reactjs.jpg", description: "New Description"
    }
    const [course, setCourse] = useState({
      _id: "0", name: "New Course", number: "New Number",
      startDate: "2023-09-10", endDate: "2023-12-15",
      image: "/images/reactjs.jpg", description: "New Description"
    });
    const [courseView, setCourseView] = useState(false);

    const addNewCourse = async () => {
      try {
        // const newCourse = await userClient.createCourse(course);
        const newCourse = await courseClient.createCourse(course);
        dispatch(addCourse(newCourse));
        setCourse(defaultCourseInfo);
      } catch (error: any) {
        alert("course is not added");
      }
    };
    const updateExistingCourse = async () => {
      if (course._id === "0") {
        alert("Please select a course to update");
      }
      await courseClient.updateCourse(course);
      dispatch(updateCourse(course));
      setCourse(defaultCourseInfo);
    }
    const deleteExistingCourse = async (courseId: string) => {
      await courseClient.deleteCourse(courseId);
      dispatch(deleteCourse(courseId));
      setCourse(defaultCourseInfo);
    }
   
    const fetchCourses = async () => {
      try {
        // const courses = await userClient.findMyCourses();
        const courses = await userClient.findMyCourses();
        const allCourses = await courseClient.fetchAllCourses();
        dispatch(setCourses(courses));
        //dispatch(setCourses(db.courses));
        setAllCourses(allCourses);
      } catch (error) {
        console.error(error);
      }
    };
    useEffect(() => {
      fetchCourses();
      // fetchEnrollments();
    }, [currentUser, courseView]);
    return (
        <div id="wd-dashboard">
          <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
            <FacultyFeatures>
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
              </div>
          </FacultyFeatures>
          <DashboardTitle currentUser={currentUser}  courses={allCourses} enrolledCourses={courses} 
          courseView={courseView} setCourseView={setCourseView}/><hr/>
          <div id="wd-dashboard-courses">
            <Row xs={1} md={5} className="g-4 my-3">
            {courseView && allCourses.map((course: any) => (
            <Col className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Card.Img src="/images/reactJS.png" variant="top" width="100%" height={160} />
                <Card.Body className="card-body">
                  <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    {course.name} </Card.Title>
                  <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                    {course.description} </Card.Text>
                  {/* <Button variant="primary"> Go </Button> */}
                  <CourseEnrollmentButton course={course} currentUser={currentUser} fetchCourses={fetchCourses} courses={courses}/>
                </Card.Body>
              </Card>
            </Col>
          ))}

              {!courseView && (courses
              // .filter((c: any) => enrollments.some((enrollment: { user: any; course: any; }) => enrollment.user === currentUser._id && enrollment.course === c._id && !courseView))
              .map((c: any) => (
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
                        <FacultyFeatures>
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
                          </span>
                        </FacultyFeatures>
                      </div>
                    </Link>
                  </Card>
                </Col>
                )))}
            </ Row>
          </div>
      </div>);
}


function DashboardTitle({currentUser, courses, courseView, setCourseView, enrolledCourses}:{enrolledCourses: any, currentUser: any, courses: any, courseView: boolean, setCourseView: (view: boolean) => void;}) {
  // const enrolledCourses = courses.filter((c: any) => enrollments.some((enrollment: { user: any; course: any; }) => enrollment.user === currentUser._id && enrollment.course === c._id))
  if (currentUser.role == "STUDENT") {
    const handleClick = () => {setCourseView(!courseView)};
    return(<div className="d-flex justify-content-between">
            {courseView ? (<h2 id="wd-dashboard-enrolled">All Courses ({courses.length})</h2>) : (<h2 id="wd-dashboard-enrolled">Enrolled Courses ({enrolledCourses.length})</h2>)}
            <button id="wd-dashboard-enrollments-button" onClick={handleClick} className="btn btn-primary">Enrollments</button>
    </div>);
  } else {
    return (<h2 id="wd-dashboard-published">Published Courses ({enrolledCourses.length})</h2>);
  }
}

function CourseEnrollmentButton({currentUser, course, courses, fetchCourses}: {fetchCourses: () => void, currentUser: any, course: any, courses: any}) {
  const handleUnenroll = async () => {
    try {
      await userClient.unenrollFromCourse(currentUser._id, course._id);
      fetchCourses();
    } catch (error: any) {
      alert("enrollment cannot be deleted");
    }
  };
  const handleEnroll = async () => {
    try {
      await userClient.enrollIntoCourse(currentUser._id, course._id);
      fetchCourses();
    } catch (error: any) {
      alert("enrollment cannot be added");
    }
  };
  if (courses.find((c: any) => c._id === course._id)) {
    return(<button className="btn btn-danger" onClick={handleUnenroll}>Unenroll</button>);
  } else {
    return (<button className="btn btn-success" onClick={handleEnroll}>Enroll</button>)
  }
}
