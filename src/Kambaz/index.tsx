import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KambazNavigation from "./Navigation";
// import * as userClient from "./Account/client";
// import * as courseClient from "./Courses/client";
import Session from "./Account/Session";
import Courses from "./Courses";
import "./styles.css";
// import * as db from "./Database";
// import { useState } from "react";
// import { v4 as uuidv4 } from "uuid";
import ProtectedRoute from "./Account/ProtectedRoute";
// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";

export default function Kambaz() {
  // const defaultCourseInfo = {
  //   _id: "0", name: "New Course", number: "New Number",
  //   startDate: "2023-09-10", endDate: "2023-12-15",
  //   image: "/images/reactjs.jpg", description: "New Description"
  // }
  // const [courses, setCourses] = useState<any[]>([]);
  // const [courses, setCourses] = useState<any[]>(db.courses);
  // const [course, setCourse] = useState<any>(defaultCourseInfo);
  // const addNewCourse = async () => {
  //   try {
  //     const newCourse = await userClient.createCourse(course);
  //     setCourses([...courses, newCourse ]);
  //     setCourse(defaultCourseInfo);
  //   } catch (error: any) {
  //     alert("course is not added");
  //   }
  // };
  // const deleteCourse = async (courseId: string) => {
  //   await courseClient.deleteCourse(courseId);
  //   setCourses(courses.filter((course) => course._id !== courseId));
  // };
  // const updateCourse = async () => {
  //   await courseClient.updateCourse(course);
  //   setCourses(
  //     courses.map((c) => {
  //       if (c._id === course._id) {
  //         return course;
  //       } else {
  //         return c;
  //       }
  //     })
  //   );
  //   setCourse(defaultCourseInfo)
  // };
  // const { currentUser } = useSelector((state: any) => state.accountReducer);
  // const fetchCourses = async () => {
  //   try {
  //     const courses = await userClient.findMyCourses();
  //     setCourses(courses);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // useEffect(() => {
  //   fetchCourses();
  // }, [currentUser]);

    return (
      <Session>
        {/**
         * Wrap the Kambaz application with <Session> component
         * so that it renders before all other components to check if anyone is signed in.
         * Once it figures out, it will store the result in the store and let the rest
         * of the components render
         */}
        <div id="wd-kambaz">
        {/* <h1>Kambaz</h1> */}
          <KambazNavigation/>
          <div className="wd-main-content-offset p-3">
            <Routes>
              <Route path="/" element={<Navigate to="Dashboard" />} />
              <Route path="/Account/*" element={<Account />} />
              {/**
               * Use "ProtectedRoute" component to protect the Dashboard and Courses routes so that users
               * will only be able to navigate there if they are signed in.
               */}
              <Route path="/Dashboard" element={<ProtectedRoute><Dashboard 
                // courses={courses}
                // course={course}
                // setCourse={setCourse}
                // addNewCourse={addNewCourse}
                // deleteCourse={deleteCourse}
                // updateCourse={updateCourse}
                />
                </ProtectedRoute>} />
              <Route path="/Courses/:cid/*" element={<ProtectedRoute><Courses 
              //courses={courses}
              /></ProtectedRoute>} />
              <Route path="/Calendar" element={<h1>Calendar</h1>} />
              <Route path="/Inbox" element={<h1>Inbox</h1>} />
            </Routes>
          </div>
        </div>
      </Session>
      
  );}
  