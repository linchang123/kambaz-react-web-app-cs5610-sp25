import axios from "axios";
export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;

export const unenrollCourse = async (enrollmentId: string) => {
    const { data } = await axios.delete(`${ENROLLMENTS_API}/${enrollmentId}`);
    return data;
  };
export const unenrollUserFromCourse = async (userId: string, courseId: string) => {
  const payload = {userId, courseId};
  const {data} = await axios.put(`${ENROLLMENTS_API}/unenroll`, payload);
  return data;
}
export const enrollUserFromCourse = async (userId: string, courseId: string) => {
  const payload = {userId, courseId};
  const {data} = await axios.put(`${ENROLLMENTS_API}/enroll`, payload);
  return data;
}