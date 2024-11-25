import React, { useState, useEffect } from "react";

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
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>To-Do List</h1>
      <input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} placeholder="Add a new task" />
      <button 
        onClick={addTodo}>
          Add
      </button>
      
      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id}>
            {todo.isEditing ? (
              <input 
              type="text"
              value={editText} // Use controlled input
              onChange={(e) => setEditText(e.target.value )} // Update temporory state
              onBlur={(e) => updateTodo(todo.id, editText)} // Save the updated text
              />
            ) : (
              <span 
                style={{
                  textDecoration: todo.completed ? "line-through" : "none", 
                  cursor: "pointer",
                }}
                onClick={() => {
                  setEditText(todo.text);
                  toggleEdit(todo.id);
                }}
              >
                {todo.text}
              </span>
            )}
            <button onClick={(e) => 
            {
              e.stopPropagation();
              toggleTodo(todo.id);
            }}
            style={{ marginLeft: "10px" }}>Complete</button>
            <button onClick={(e) => 
               { e.stopPropagation(); // To prevent event building
              deleteTodo(todo.id); }}
               style={{ marginLeft: "10px" }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
      </div>
    </div>
  );

}

export default App;