import { useEffect, useState } from "react";
import { FaPlus, FaUserCircle } from "react-icons/fa";
import * as coursesClient from "../client";
import * as userClient from "../../Account/client";
// import * as db from "../../Database";
import { useParams } from "react-router-dom";
import FacultyFeatures from "../../Account/FacultyFeatures";
import { Modal } from "react-bootstrap";

export default function PeopleTable() {
  const { cid } = useParams();
  // const { users, enrollments } = db;
  const [users, setUsers] = useState<any[]>([]);
  const [enrolledUsers, setEnrolledUsers] = useState<any>([])
  const fetchAllUsers = async () => {
    try {
      const users = await userClient.findAllUsers();
      setUsers(users);
    }catch (error: any) {
      alert("error occur in fetching all users");
    }
  }
  const fetchEnrolledUsers = async () => {
    try {
      const enrolledUsers = await coursesClient.findUsersForCourse(cid as string);
      // setEnrolledUsers([...enrolledUsers]);
      setEnrolledUsers(enrolledUsers);
    } catch (error: any) {
      alert("error occurs in fetching enrolled student")
    }
  };
  const handleUnenroll = async (userId: string) => {
    await userClient.unenrollFromCourse(userId, cid || "");
    // setEnrolledUsers((prev: any[]) => prev.filter(user => user._id !== userId));
    await fetchEnrolledUsers();
    // setTimeout(fetchEnrolledUsers, 500); 
  };
  const handleEnroll = async (userId: string) => {
    await userClient.enrollIntoCourse(userId, cid || "");
    // setEnrolledUsers((prev: any[]) => prev.filter(user => user._id !== userId));
    // setTimeout(fetchEnrolledUsers, 500); 
    await fetchEnrolledUsers();
  };
  useEffect(() => {
    fetchEnrolledUsers();
  }, []);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = async() => {
    await fetchAllUsers();
    setShow(true)};
 return (
  <div id="wd-people-table" className="display-block">
    {/* <PeopleDetails /> */}
    <FacultyFeatures>
      <button data-bs-toggle="modal" data-bs-target="#wd-manage-enrollment-dialog" 
    type="button" className="float-end m-3 btn btn-danger btn-lg" onClick={handleShow}>
      <FaPlus/> Manage Enrollment
      </button>
    </FacultyFeatures>
   <table className="table table-striped">
    <thead>
     <tr><th>Name</th><th>Login ID</th><th>Section</th><th>Role</th><th>Last Activity</th><th>Total Activity</th></tr>
    </thead>
    <tbody>
    {enrolledUsers
    // .filter((usr) =>
    //   enrollments.some((enrollment) => enrollment.user === usr._id && enrollment.course === cid)
    // )
    .map((user: any) => (
      <tr key={user._id}>
        <td className="wd-full-name text-nowrap">
          {/* <Link to={`/Kambaz/Account/Users/${user._id}`} className="text-decoration-none"> */}
            <FaUserCircle className="me-2 fs-1 text-secondary" />
            <span className="wd-first-name">{user.firstName + " "}</span>
            <span className="wd-last-name">{user.lastName}</span>
          {/* </Link> */}
        </td>
        <td className="wd-login-id">{user.loginId}</td>
        <td className="wd-section">{user.section}</td>
        <td className="wd-role">{user.role}</td>
        <td className="wd-last-activity">{user.lastActivity}</td>
        <td className="wd-total-activity">{user.totalActivity}</td>
      </tr>
    ))}

    </tbody>
   </table>
   <EnrollmentEditor show={show} handleClose={handleClose} dialogTitle="Manage Enrollment" 
   enrolledStudents={enrolledUsers} users={users} handleUnenroll={handleUnenroll} handleEnroll={handleEnroll}/>
  </div> );}


export function EnrollmentEditor({ show, handleClose, dialogTitle, enrolledStudents, users, handleUnenroll, handleEnroll}: {
  show: boolean; handleClose: () => void; dialogTitle: string; enrolledStudents: any; users: any; 
  handleUnenroll: (courseId: string) => void; handleEnroll: (courseId: string) => void;
  }) {
  return (
   <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
     <Modal.Title>{dialogTitle}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <table>
        <tbody>
          {users.map((user: any) => (
            <tr className="my-5 text-nowrap">
              <td>{`${user.firstName} ${user.lastName}`}</td>
              <td className="ps-5">{`${user.loginId}`}</td>
              <td className="text-center">
                  {enrolledStudents.some((student: any) => student._id === user._id) ? 
                  (<button className="ms-5 btn btn-md btn-danger text-nowrap" onClick={() => handleUnenroll(user._id)}>Unenroll Student </button>): 
                 ( <button className="ms-5 btn btn-md btn-success" onClick={() => handleEnroll(user._id)}>Enroll Student</button>)}
                
              </td>
            </tr>

          ))}
        </tbody>
      </table>
    </Modal.Body>
    {/* <Modal.Footer>
     <Button variant="secondary" onClick={handleClose}> Close </Button>
    </Modal.Footer> */}
   </Modal>
 );}
/**
 * {
 * <tr><td className="wd-full-name text-nowrap">
      <FaUserCircle className="me-2 fs-1 text-secondary" />
      <span className="wd-first-name">Tony</span>{" "}
      <span className="wd-last-name">Stark</span></td>
      <td className="wd-login-id">001234561S</td>
      <td className="wd-section">S101</td>
      <td className="wd-role">STUDENT</td>
      <td className="wd-last-activity">2020-10-01</td>
      <td className="wd-total-activity">10:21:32</td> </tr>

      <tr><td className="wd-full-name text-nowrap">
      <FaUserCircle className="me-2 fs-1 text-secondary" />
      <span className="wd-first-name">Eddie</span>{" "}
      <span className="wd-last-name">Brock</span></td>
      <td className="wd-login-id">001234562S</td>
      <td className="wd-section">S101</td>
      <td className="wd-role">STUDENT</td>
      <td className="wd-last-activity">2020-11-02</td>
      <td className="wd-total-activity">15:32:43</td> </tr>

      <tr><td className="wd-full-name text-nowrap">
      <FaUserCircle className="me-2 fs-1 text-secondary" />
      <span className="wd-first-name">Bruce</span>{" "}
      <span className="wd-last-name">Wayne</span></td>
      <td className="wd-login-id">001234563S</td>
      <td className="wd-section">S101</td>
      <td className="wd-role">STUDENT</td>
      <td className="wd-last-activity">2020-10-02</td>
      <td className="wd-total-activity">23:32:43</td> </tr>

      <tr><td className="wd-full-name text-nowrap">
      <FaUserCircle className="me-2 fs-1 text-secondary" />
      <span className="wd-first-name">Steve</span>{" "}
      <span className="wd-last-name">Rogers</span></td>
      <td className="wd-login-id">001234564S</td>
      <td className="wd-section">S101</td>
      <td className="wd-role">STUDENT</td>
      <td className="wd-last-activity">2020-11-05</td>
      <td className="wd-total-activity">13:16:25</td> </tr>

      <tr><td className="wd-full-name text-nowrap">
      <FaUserCircle className="me-2 fs-1 text-secondary" />
      <span className="wd-first-name">Natasha</span>{" "}
      <span className="wd-last-name">Romanoff</span></td>
      <td className="wd-login-id">001234565S</td>
      <td className="wd-section">S101</td>
      <td className="wd-role">TA</td>
      <td className="wd-last-activity">2020-12-01</td>
      <td className="wd-total-activity">15:12:37</td> </tr>

      <tr><td className="wd-full-name text-nowrap">
      <FaUserCircle className="me-2 fs-1 text-secondary" />
      <span className="wd-first-name">Thor</span>{" "}
      <span className="wd-last-name">Odinson</span></td>
      <td className="wd-login-id">001234566S</td>
      <td className="wd-section">S101</td>
      <td className="wd-role">STUDENT</td>
      <td className="wd-last-activity">2020-12-13</td>
      <td className="wd-total-activity">34:01:29</td> </tr>}
 */