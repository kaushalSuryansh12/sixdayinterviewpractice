import React, { useState, useEffect } from "react";
import AddTodo from "./components/AddTodo/AddTodo";
import TodoList from "./components/TodoList/TodoList";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  isEditing?: boolean;
}

const App: React.FC = () => {

  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [newTodo, setNewTodo] = useState("");
  const [editText, setEditText] = useState("");

  //filter for completion, or pending
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");

  const filteredTodos = todos.filter(todo => {
    if(filter === "all") return todo;
    if(filter === "completed") return todo.completed;
    if(filter === "pending") return !todo.completed;
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false, isEditing: false }]);
      setNewTodo("");
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const toggleEdit = (id: number) => {
    setTodos(
      todos.map(todo => todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo)
    );
  };

  const updateTodo = (id: number, updatedText: string) => {
    setTodos(
      todos.map(todo => 
        todo.id === id ? { ...todo, text: updatedText, isEditing: false} : todo
      )
    )
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
    console.log("Id",id);
    console.log("Todos",todos);
  };

  return (
    <div style={{ padding: "25px", fontFamily: "Arial" }}>
      <h1> To-Do List</h1>
      <AddTodo newTodo={newTodo} setNewTodo={setNewTodo} addTodo={addTodo} />
      <TodoList 
        todos={todos}
        filteredTodos={filteredTodos}
        editText={editText}
        setEditText={setEditText}
        toggleTodo={toggleTodo}
        toggleEdit={toggleEdit}
        updateTodo={updateTodo}
        deleteTodo={deleteTodo}
      />
      <div>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
      </div>
    </div>
  );
}

export default App;