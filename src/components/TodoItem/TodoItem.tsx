import React, { useState, useEffect } from "react";

interface Todo {
    id: number,
    text: string,
    completed: boolean;
    isEditing?: boolean;
}

interface TodoItemProps {
    todo: Todo;
    editText: string;
    setEditText: (value: string) => void;
    toggleTodo: (id: number) => void;
    toggleEdit: (id: number) => void;
    updateTodo: (id: number, updatedText: string) => void;
    deleteTodo: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
    todo,
    editText,
    setEditText,
    toggleTodo,
    toggleEdit,
    updateTodo,
    deleteTodo
}) => {
    return(
        <li>
            {todo.isEditing ? (
                <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onBlur={() => updateTodo(todo.id, editText )} 
                />
            ) : (
                <span
                    style={{ textDecoration: todo.completed ? "line-through" : "none", cursor: "pointer"}}
                    onClick={() => {
                        setEditText(todo.text);
                        toggleEdit(todo.id)
                    }}
                >
                    {todo.text}
                </span>
            )}
            <button onClick={() => toggleTodo(todo.id)}>Complete</button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </li>
    );
};

export default TodoItem;