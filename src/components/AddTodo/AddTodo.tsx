import React, { useState, useEffect } from "react"; 
import styles from "./AddTodo.module.css";

interface AddTodoProps {
    newTodo: string;
    setNewTodo: (value: string) => void;
    addTodo: (value: boolean) => void;
};

const AddTodo: React.FC<AddTodoProps> = ({ newTodo, setNewTodo, addTodo }) => {
    return (
        <div className={styles.addTodoContainer}>
            <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new task"
                className={styles.AddTodoInput}
            />
            <button onClick={() => addTodo(false)} className={styles.addTodoButton}>Add</button>
            <button onClick={() => addTodo(true)} className={styles.priorityButton}>Priority</button>
        </div>
    )
}

export default AddTodo;