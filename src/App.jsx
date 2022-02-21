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


  //status変更
  const [selectedValue, setSelectedValue] = useState('notStarted');


  //formの入力値を受け取る関数
  const handleInputChange = (e) => {
    setTodo(e.target.value);
  }

  //todo作成の関数
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (todo !== "") {
      setTodos([
        ...todos,   //状態の現在の値をコピー
        {
          id: todos.length + 1,
          title: todo.trim(),
          status: "notStarted"
        }
      ]);
    }
    //formの値を空にする
    setTodo("");
  }

  //status変更の値取得
  // const handleStatusChange = (e, todo) => {
  //   setTodo({ ...todo, status: setSelectedValue(e.target.value)});
  //   setTodo({ ...todo });
  // }
  const handleStatusChange = (e) => {
    setSelectedValue(e.target.value)
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

  //「編集」ボタンがクリックされたときに処理する機能
  const handleEditClick = (todo) => {
    setIsEditing(true);   //編集時はtrue
    setCurrentTodo({ ...todo }); //currentTodoをクリックされたtodoアイテムに設定
  }

  //編集入力の値を取得し、新しい状態を設定する関数
  const handleEditInputChange = (e) => {
    //新しい状態の値を、現在編集入力ボックスにあるものに設定
    setCurrentTodo({ ...currentTodo, title: e.target.value });
  }

  //フォームが送信されたときにToDoアイテムを実際に更新するhandleUpdateTodo関数を呼び出す
  const handleEditFormSubmit = (e) => {
    e.preventDefault();
    //handleUpdateTodo関数を呼び出す-currentTodo.idとcurrentTodoオブジェクトを引数として渡す
    handleUpdateTodo(currentTodo.id, currentTodo);
  }

  //ToDoアイテムを編集する機能
  //todos配列にtodo.idが関数に渡すIDと一致するかどうかを確認、IDが一致する場合は、2番目のパラメーター（updatedTodo）を使用して更新されたtodoオブジェクトを渡し、それ以外の場合は、古いtodoを使用
  const handleUpdateTodo = (id, updatedTodo) => {
    const updatedItem = todos.map((todo) => {
      return todo.id === id ? updatedTodo : todo;
    });
    //この関数はonSubmit関数内で使用されるため、編集をfalseに設定、データが送信され、編集が終了したことを意味する
    setIsEditing(false);
    setTodos(updatedItem); //更新されたtodoでtodos状態を更新する
  }

  return (
    <>
        {isEditing ?(
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
            <button type="submit" className="btn btn-success mx-1">編集する</button>
            <button onClick={() => setIsEditing(false)} className="btn btn-info">キャンセル</button>
          </form>
        ) : (
          <form onSubmit={handleFormSubmit}>
            <h2>Add Todo</h2>
            <label htmlFor="todo" className="mr-2">ToDo : </label>
            <input
            name="todo"
            type="text"
            placeholder="新しいtodoを作成する"
            value={todo}
            onChange={handleInputChange}  //handleInputChange formの入力値を受け取る関数
            />
            <button type="submit" className="btn btn-primary mx-2">作成</button>
          </form>
        )}

        <div>
          <h1>ToDo List</h1>
          <ul>
            {todos.map((todo) => (
              <li key={todo.id} className="my-2">
                {todo.title}
                <select value={selectedValue} onChange={handleStatusChange}>
                  <option value='notStarted'>未着手</option>
                  <option value='inProgress'>進行中</option>
                  <option value='done'>完了</option>
                </select>
                {/**handleEditClick関数 todoオブジェクトを引数として渡す*/}
                <button className="btn btn-success mx-2" onClick={() => handleEditClick(todo)}>編集</button>
                <button className="btn btn-danger" onClick={() => handleDeleteClick(todo.id)}>削除</button>
              </li>
            ))}
          </ul>
        </div>
    </>
  );
};

export default App;
