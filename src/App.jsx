import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
  }
});

  const [todo, setTodo] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function handleInputChange(e) {
    setTodo(e.target.value);
  }

  function handleEditInputChange(e) {
    setCurrentTodo({...currentTodo, text: e.target.value });
    console.log(currentTodo);
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    if (todo !== "") {
      setTodos([
        ...todos,
        {
          id: todos.length + 1,
          text: todo.trim()
        }
      ]);
    }
    setTodo("");
  }

  function handleEditFormSubmit(e) {
    e.preventDefault();

    handleUpdateTodo(currentTodo.id, currentTodo);
  }

  function handleDeleteClick(id) {
    const removeItem = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(removeItem);
  }

  function handleUpdateTodo(id, updatedTodo) {
    const updatedItem = todos.map((todo) => {
      return todo.id === id ? updatedTodo : todo;
    });
    setIsEditing(false);
    setTodos(updatedItem);
  }

  function handleEditClick(todo) {
    setIsEditing(true);
    setCurrentTodo({ ...todo });
  }

  return (
    <div className="App">
      {isEditing ? (
        <form onSubmit={handleEditFormSubmit}>
          <h2>Edit Todo</h2>
          <label htmlFor="editTodo">Edit todo: </label>
          <input
            name="editTodo"
            type="text"
            placeholder="todoを編集する"
            value={currentTodo.text}
            onChange={handleEditInputChange}
          />
          <button type="submit">更新</button>
          <button onClick={() => setIsEditing(false)}>キャンセル</button>
        </form>
      ) : (
      <form onSubmit={handleFormSubmit}>
        <h2>Add Todo</h2>
        <label htmlFor="todo">ToDo : </label>
        <input
        name="todo"
        type="text"
        placeholder="新しいtodoを作成する"
        value={todo}
        onChange={handleInputChange}
        />
        <button type="submit" class="btn btn-info mx-2">作成</button>
      </form>
      )}

    <ul className="todo-list my-2">
      {todos.map((todo) => (
        <li key={todo.id} className="my-2">
          {todo.text}
          <button class="btn btn-success ml-5" onClick={() => handleEditClick(todo)}>編集</button>
          <button class="btn btn-danger mx-2"onClick={() => handleDeleteClick(todo.id)}>削除</button>
        </li>
      ))}
    </ul>
  </div>
  );
}