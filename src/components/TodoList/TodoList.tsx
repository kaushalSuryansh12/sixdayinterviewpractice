import React, { useState, useEffect } from "react";
import TodoItem from "../TodoItem/TodoItem";

interface Todo {
    id: number;
    text: string;
    completed: boolean;
    isEditing?: boolean;
}

interface TodoListProps {
    todos: Todo[];
    filteredTodos: Todo[];
    editText: string;
    setEditText: (value: string) => void;
    toggleEdit: (id: number) => void;
    toggleTodo: (id: number) => void;
    updateTodo: (id: number, updatedText: string) => void;
    deleteTodo: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({
    todos,
    filteredTodos,
    editText,
    setEditText,
    toggleEdit,
    toggleTodo,
    updateTodo,
    deleteTodo
}) => {
    return(
        <ul>
            { filteredTodos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    editText={editText}
                    setEditText={setEditText}
                    toggleTodo={toggleTodo}
                    toggleEdit={toggleEdit}
                    updateTodo={updateTodo}
                    deleteTodo={deleteTodo}
                />
            ))
            }
        </ul>
    );
};

export default TodoList;