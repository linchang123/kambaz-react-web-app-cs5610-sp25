import ModulesControls from "./ModulesControls";
import { BsGripVertical } from "react-icons/bs";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import { useParams } from "react-router";
// import * as db from "../../Database";
import { useState } from "react";
// import { v4 as uuidv4 } from "uuid";
import { addModule, editModule, updateModule, deleteModule }
  from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import { IoMdArrowDropdown } from "react-icons/io";

export default function Modules() {
    const { cid } = useParams();
    const { modules } = useSelector((state: any) => state.modulesReducer);
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    // const [modules, setModules] = useState<any[]>(db.modules);
    const [moduleName, setModuleName] = useState("");
    // const addModule = () => {
    //   setModules([ ...modules, { _id: uuidv4(), name: moduleName, course: cid, lessons: [] } ]);
    //   setModuleName("");
    // };
    // const deleteModule = (moduleId: string) => {
    //   setModules(modules.filter((m) => m._id !== moduleId));
    // };
    // const editModule = (moduleId: string) => {
    //   setModules(modules.map((m) => (m._id === moduleId ? { ...m, editing: true } : m)));
    // };
    // const updateModule = (module: any) => {
    //   setModules(modules.map((m) => (m._id === module._id ? module : m)));
    // };
  
    return (
      <div>
        <ModulesControls setModuleName={setModuleName} moduleName={moduleName} addModule={() => {
          dispatch(addModule({ name: moduleName, course: cid }));
          setModuleName("");}} />
          <br /><br /><br /><br />
        <ul id="wd-modules" className="list-group rounded-0">
        {modules
          .filter((module: any) => module.course === cid)
          .map((module: any) => (
          <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary">
              {currentUser.role === "FACULTY" && (<BsGripVertical className="me-2 fs-3" />)}
              {currentUser.role === "STUDENT" && (<IoMdArrowDropdown className="me-2 fs-3"/>)}
              { // if the module's editing field is False, the module's name will be displayed
              !module.editing && module.name
              }
              { // if the module's editing field is True, the input field for editing the module name is displayed
              module.editing && (
                <input className="form-control w-50 d-inline-block"
                      onChange={(e) => dispatch(
                        updateModule({ ...module, name: e.target.value })
                      )}
                      onKeyDown={(e) => {
                        // when the "Enter" key is pressed on the keyboard, the module's editing field is set to False
                        // and the editor window will be hidden
                        if (e.key === "Enter") {
                          dispatch(updateModule({ ...module, editing: false }));
                        }
                      }}
                      defaultValue={module.name}/>
              )}
              {currentUser.role == "FACULTY" && (<ModuleControlButtons moduleId={module._id} deleteModule={(moduleId) => {
                    dispatch(deleteModule(moduleId));}} editModule={(moduleId) => dispatch(editModule(moduleId))}/>)}
            </div>
            {module.lessons && (
              <ul className="wd-lessons list-group rounded-0">
                {module.lessons.map((lesson: any) => (
                  <li className="wd-lesson list-group-item p-3 ps-1">
                    <LessonControl lessonName={lesson.name}/>
                  </li>
                ))}
              </ul>)}
          </li>))}
        </ul>

        {/* <ul id="wd-modules" className="list-group rounded-0">
          <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary"> 
              <BsGripVertical className="me-2 fs-3" />
              Week 1
               <ModuleControlButtons/>
            </div>
            <ul className="wd-lessons list-group rounded-0">
              <li className="wd-lesson list-group-item p-3 ps-1">
                <BsGripVertical className="me-2 fs-3" />
                LEARNING OBJECTIVES 
                <LessonControlButtons/>
              </li>
              <li className="wd-lesson list-group-item p-3 ps-1">
                <BsGripVertical className="me-2 fs-3" />
                Introduction to the course 
                <LessonControlButtons/>
                </li>
              <li className="wd-lesson list-group-item p-3 ps-1">
                <BsGripVertical className="me-2 fs-3" />
                Learn what is Web Development 
                <LessonControlButtons/>
                </li>
              <li className="wd-lesson list-group-item p-3 ps-1">
                <BsGripVertical className="me-2 fs-3" />
                LESSON 1 
                <LessonControlButtons/>
              </li>
              <li className="wd-lesson list-group-item p-3 ps-1"> 
                <BsGripVertical className="me-2 fs-3" />
                LESSON 2 
                <LessonControlButtons/>
              </li>
            </ul>
          </li>
          <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" />
              Week 2
              <ModuleControlButtons/> 
            </div>
            <ul className="wd-lessons list-group rounded-0">
              <li className="wd-lesson list-group-item p-3 ps-1">
                <BsGripVertical className="me-2 fs-3" />LEARNING OBJECTIVES <LessonControlButtons/></li>
              <li className="wd-lesson list-group-item p-3 ps-1"> 
                <BsGripVertical className="me-2 fs-3" />
                LESSON 1 <LessonControlButtons/></li>
              <li className="wd-lesson list-group-item p-3 ps-1"> 
                <BsGripVertical className="me-2 fs-3" />
                LESSON 2 <LessonControlButtons/></li>
            </ul>
          </li>
        </ul>  */}
      </div>

  );}

const LessonControl = ({ lessonName }: { lessonName: string }) => {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  if (currentUser.role === "FACULTY"){
    return (
      <div className="wd-modules-lesson-control-buttons">
          <BsGripVertical className="me-2 fs-3" /> 
          {lessonName} 
          <LessonControlButtons />
      </div>
    );
  } else {
    return (
      <div className="wd-modules-lesson-title ps-3">{lessonName}</div>
    );
  }
}
