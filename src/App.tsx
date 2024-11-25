import React, { useState } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const App: React.FC = () => {

  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
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

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>To-Do List</h1>
      <input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} placeholder="Add a new task" />
      <button 
        onClick={addTodo}>
          Add
      </button>
      <ul>
        {todos.map((todo) => (
          <li 
            key={todo.id} 
            onClick={() => toggleTodo(todo.id)} 
            style={{
              textDecoration: todo.completed ? "line-through" : "none", cursor: "pointer",
            }}
          >{todo.text}</li>
        ))}
      </ul>
    </div>
  );

}

export default App;