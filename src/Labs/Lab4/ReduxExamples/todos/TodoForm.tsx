import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";

export default function TodoForm() {
    const { todo } = useSelector((state: any) => state.todosReducer);
    const dispatch = useDispatch();

    return (
      <li className="list-group-item">
        <button onClick={() => dispatch(addTodo(todo))} className="float-end btn btn-success ms-2"
                id="wd-add-todo-click"> Add </button>
        <button onClick={() => dispatch(updateTodo(todo))} className="float-end btn btn-warning"
                id="wd-update-todo-click"> Update </button>
        <input value={todo.title}
          onChange={ (e) => dispatch(setTodo({ ...todo, title: e.target.value })) }/>
      </li>
  );}
  