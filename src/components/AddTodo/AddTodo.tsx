import React, { useState, useEffect } from "react"; 

interface AddTodoProps {
    newTodo: string;
    setNewTodo: (value: string) => void;
    addTodo: () => void;
};

const AddTodo: React.FC<AddTodoProps> = ({ newTodo, setNewTodo, addTodo }) => {
    return (
        <div>
            <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new task"
            />
            <button onClick={addTodo}>Add</button>
        </div>
    )
}

export default AddTodo;