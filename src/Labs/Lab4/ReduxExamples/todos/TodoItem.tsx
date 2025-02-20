import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";

export default function TodoItem({todo}: { todo: { id: number; title: string } }) {
    const dispatch = useDispatch();
    return (
      <li key={todo.id} className="list-group-item">
        <button onClick={() => dispatch(deleteTodo(todo.id))} className="float-end btn btn-danger ms-2"
                id="wd-delete-todo-click"> Delete </button>
        <button onClick={() => dispatch(setTodo(todo))} className="float-end btn btn-primary"
                id="wd-set-todo-click"> Edit </button>
        {todo.title}    
     </li>);}