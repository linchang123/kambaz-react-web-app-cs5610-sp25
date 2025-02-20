import { configureStore } from "@reduxjs/toolkit";
{/**
  Import individual reducers to the store to make all states available to all components
  within the body of the Provider
   */}

import helloReducer from "../Lab4/ReduxExamples/HelloRedux/helloReducer";
import counterReducer from "../Lab4/ReduxExamples/CounterRedux/counterReducer";
import addReducer from "../Lab4/ReduxExamples/AddRedux/addReducer";
import todosReducer from "../Lab4/ReduxExamples/todos/todosReducer";


const store = configureStore({
  reducer: { 
    helloReducer,
    counterReducer,
    addReducer,
    todosReducer,
   },
});
export default store;