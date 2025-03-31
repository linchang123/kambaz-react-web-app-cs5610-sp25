import { createSlice } from "@reduxjs/toolkit";
// import { enrollments } from "../Database";

const initialState = {
    enrollments: [],
  };

const enrollmentsSlice = createSlice({
name: "enrollments",
initialState,
reducers: {
    setEnrollments: (state, action ) => {
      state.enrollments = action.payload;
    },
    addEnrollment: (state, {payload: enrollment}) => {
        // const newCourse: any = {...enrollment,
        //     _id: uuidv4(),
        //     user: enrollment.user,
        //     description: course.description
        // }
        state.enrollments = [...state.enrollments, enrollment] as any;
    },
    deleteEnrollment: (state, { payload: enrollment }) => {
    state.enrollments = state.enrollments.filter(
        (e: any) => !(e.course === enrollment.course && e.user === enrollment.user));
    },
    // updateCourse: (state, { payload: course }) => {
    //   state.courses = state.courses.map((c: any) =>
    //     c._id === course._id ? course : c
    //   ) as any;
    // },
    // editEnollment: (state, { payload: enrollmentId }) => {
    //   state.enrollments = state.enrollments.map((e: any) =>
    //     e._id === enrollmentId ? { ...e, editing: true } : e
    //   ) as any;
    // },
  },
});
export const { addEnrollment, deleteEnrollment, setEnrollments } =
enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
