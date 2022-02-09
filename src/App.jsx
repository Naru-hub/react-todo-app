import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [todos, setTodos] = useState([]);

  //入力値を追跡
  const [todo, setTodo] = useState("");

  //編集モードかどうかをbool値で判断
  const [isEditing, setIsEditing] = useState(false);

  //編集するToDoアイテムがわかるように設定するオブジェクトの状態
  const [currentTodo, setCurrentTodo] = useState({});


  //formの入力値を受け取る関数
  const handleInputChange = (e) => {
    setTodo(e.target.value);
  }

  //todo作成の関数
  const handleFormSubmit = (e) => {
    if (todo !== "") {
      setTodos([
        ...todos,   //状態の現在の値をコピー
        {
          id: todos.length + 1,
          text: todo.trim(),
          status: "notStarted"
        }
      ]);
    }
    //formの値を空にする
    setTodo("");
  }


  //todosの配列からtodoを削除する関数
  const handleDeleteClick = (id) => {
    //todo.idとidが違う残りのtodoを抽出して返す
    const removeItem = todos.filter((todo) => {
      return todo.id !== id;
    });
    //removeItemは新しい配列を返す
    setTodos(removeItem);
  }

  //編集入力の値を取得し、新しい状態を設定する関数
  const handleEditInputChange = (e) => {
    //新しい状態の値を、現在編集入力ボックスにあるものに設定
    setCurrentTodo({ ...currentTodo, text: e.target.value });
    console.log(currentTodo);
  }

  return (
    <>
      <div>
        <h2>Add Todo</h2>
        <label htmlFor="todo" className="mr-2">ToDo : </label>
        <input
        name="todo"
        type="text"
        placeholder="新しいtodoを作成する"
        value={todo}
        onChange={handleInputChange}  //handleInputChange formの入力値を受け取る関数
        />
        <button onClick={() => handleFormSubmit(todo.id)} type="submit" className="btn btn-info mx-2">作成</button>
      </div>

      <div>
        <h1>ToDo List</h1>
        <ul>
          {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <button className="btn btn-danger mx-2" onClick={() => handleDeleteClick(todo.id)}>削除</button>
          </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default App;
