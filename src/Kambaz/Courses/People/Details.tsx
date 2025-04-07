import { useEffect, useState } from "react";
import { FaCheck, FaUserCircle } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { useParams, useNavigate } from "react-router";
// import { Link } from "react-router-dom";
import * as client from "../../Account/client";
import { FaPencil } from "react-icons/fa6";
import { FormControl } from "react-bootstrap";
export default function PeopleDetails() {
  const { uid} = useParams();
  const [user, setUser] = useState<any>({});
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [editing, setEditing] = useState(false);
  const saveUser = async () => {
    if (name === user.name && email === user.email && role === user.role) {
        setEditing(false);
        return};
    const [firstName, lastName] = name.split(" ");
    const updatedUser = { ...user, firstName, lastName, role, email };
    await client.updateUser(updatedUser);
    setEditing(false);
    setUser(updatedUser);
    navigate(-1);
  };
  const deleteUser = async (uid: string) => {
    await client.deleteUser(uid);
    navigate(-1);
  };
  const fetchUser = async () => {
    if (!uid) return;
    const user = await client.findUserById(uid);
    setUser(user);
  };
  useEffect(() => {
    if (uid) fetchUser();
  }, [uid]);
  if (!uid) return null;
  return (
    <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
      <button onClick={() => navigate(-1)} className="btn position-fixed end-0 top-0 wd-close-details">
        <IoCloseSharp className="fs-1" /> </button>
      <div className="text-center mt-2"> <FaUserCircle className="text-secondary me-2 fs-1" /> </div><hr />
      <div className="text-danger fs-4 wd-name"> 
      {!editing && (
          <FaPencil onClick={() => {
            setName(user.firstName + " " + user.lastName);
            setEmail(user.email);
            setRole(user.role);
            setEditing(true)}}
              className="float-end fs-5 mt-2 wd-edit" /> )}
        {editing && (
          <FaCheck onClick={() => saveUser()}
              className="float-end fs-5 mt-2 me-2 wd-save" /> )}
        {!editing && (
          <div className="wd-name"
               onClick={() => setEditing(true)}>
        {user.firstName} {user.lastName} </div>)}
        {user && editing && (
          <FormControl className="w-50 wd-edit-name"
            defaultValue={`${user.firstName} ${user.lastName}`}
            onChange={(e) => {
                if (e.target.value !== ""){
                setName(e.target.value)
                }}}
            onKeyDown={(e) => {
              if (e.key === "Enter") { saveUser(); }}}/>)}
      </div>
      <div className={editing ? "my-3 d-flex align-items-center" : ""}>
        <b className="float-start me-2">Roles:</b>           
        {editing ? (<select value={role} onChange={(e) =>{
                    if (e.target.value !== ""){
                    setRole(e.target.value)
                    }}}
                className="form-select w-50 wd-select-role" >
            <option value="STUDENT" selected={"STUDENT" === user.role} >Students</option>
            <option value="TA" selected={"TA" === user.role}>Assistants</option> 
            <option value="FACULTY" selected={"FACULTY" === user.role}>Faculty</option>
            <option value="ADMIN" selected={"ADMIN" === user.role}>Administrators</option>
        </select>)
        : (<span className="wd-roles">         {user.role}         </span> )}
      </div>
      <div className={editing ? "d-flex align-items-center" : ""}>
        <b>Email:</b>
        {editing ? (<FormControl className="w-75 wd-edit-email ms-2 mb-2"
            defaultValue={`${user.email}`}
            onChange={(e) => {
                if (e.target.value !== ""){
                setEmail(e.target.value)
                }}}
            onKeyDown={(e) => {
              if (e.key === "Enter") { saveUser(); }}}/>) : (<span className="wd-email">      {user.email}      </span>)}
      </div>
      <b>Login ID:</b>        <span className="wd-login-id">      {user.loginId}      </span> <br />
      <b>Section:</b>         <span className="wd-section">       {user.section}      </span> <br />
      <b>Total Activity:</b>  <span className="wd-total-activity">{user.totalActivity}</span> 
      <hr />
      <button onClick={() => deleteUser(uid)} className="btn btn-danger float-end wd-delete" > Delete </button>
      <button onClick={() => navigate(-1)}
              className="btn btn-secondary float-start float-end me-2 wd-cancel" > Cancel </button>

    </div> ); }