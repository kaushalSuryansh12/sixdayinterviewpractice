import React, { useState } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  isEditing?: boolean;
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
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.isEditing ? (
              <input 
              type="text"
              defaultValue={todo.text}
              onBlur={(e) => updateTodo(todo.id, e.target.value)}
              />
            ) : (
              <span 
                style={{
                  textDecoration: todo.completed ? "line-through" : "none", 
                  cursor: "pointer",
                }}
                onClick={() => toggleEdit(todo.id)}
              >
                {todo.text}
              </span>
            )}
            <button onClick={(e) => 
               { e.stopPropagation(); // To prevent event building
              deleteTodo(todo.id); }}
               style={{ marginLeft: "10px" }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );

}

export default App;