import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
// import { useState } from "react";
import { useSelector } from "react-redux";

export default function TodoList() {
    // const [todos, setTodos] = useState([
    //     { id: "1", title: "Learn React" },
    //     { id: "2", title: "Learn Node"  }]);
    //   const [todo, setTodo] = useState({ id: "-1", title: "Learn Mongo" });
    //   const addTodo = (todo: any) => {
    //     const newTodos = [ ...todos, { ...todo,
    //       id: new Date().getTime().toString() }];
    //     setTodos(newTodos);
    //     setTodo({id: "-1", title: ""});
    //   };
    //   const deleteTodo = (id: string) => {
    //     const newTodos = todos.filter((todo) => todo.id !== id);
    //     setTodos(newTodos);
    //   };
    //   const updateTodo = (todo: any) => {
    //     const newTodos = todos.map((item) =>
    //       (item.id === todo.id ? todo : item));
    //     setTodos(newTodos);
    //     setTodo({id: "-1", title: ""});
    //   };
    
  const { todos } = useSelector((state: any) => state.todosReducer);
  return (
    <div className="ms-2">
      <h2>Todo List</h2>
      <ul className="list-group w-25">
        <TodoForm />
        {todos.map((todo: any) => (
          <TodoItem todo={todo} />
        ))}
        {/* <TodoForm
            todo={todo}
            setTodo={setTodo}
            addTodo={addTodo}
            updateTodo={updateTodo}/>
            {todos.map((todo) => (
            <TodoItem
                todo={todo}
                deleteTodo={deleteTodo}
                setTodo={setTodo} />
            ))} */}

        {/* <li className="list-group-item">
          <button onClick={() => addTodo(todo)} className="float-end btn btn-success ms-2"
                  id="wd-add-todo-click">Add</button>
          <button onClick={() => updateTodo(todo)} className="float-end btn btn-warning"
                  id="wd-update-todo-click">
            Update </button>
          <input value={todo.title}
            onChange={(e) =>
              setTodo({ ...todo,
                title: e.target.value })
            }
          />
        </li>
        {todos.map((todo) => (
          <li key={todo.id} className="list-group-item">
            <button onClick={() => deleteTodo(todo.id)} className="float-end btn btn-danger ms-2"
                    id="wd-delete-todo-click">
              Delete </button>
            <button onClick={() => setTodo(todo)} className="float-end btn btn-primary"
                    id="wd-set-todo-click">
              Edit </button>
            {todo.title}
          </li>
        ))} */}
      </ul>
      <hr/>
    </div>
  );
}
