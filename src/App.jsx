import React, { useEffect, useState } from "react";
import "./App.css";
import { Button } from "react-bootstrap";

const App = () => {
  //todoをtodosの配列で持つ
  const [todos, setTodos] = useState([]);

  //入力値を追跡
  const [todo, setTodo] = useState("");

  //編集モードかどうかをbool値で判断
  const [isEditing, setIsEditing] = useState(false);
  //編集するToDoアイテムがわかるように設定するオブジェクトの状態
  const [currentTodo, setCurrentTodo] = useState({});

  //status別に新たにtodoを設定する
  const [filteredTodos, setFilteredTodos] = useState([]);
  //radioボタンの選択値を保持する
  const [radio, setRadio] = useState("all");

  //formの入力値を受け取る関数
  const handleInputChange = (e) => {
    setTodo(e.target.value);
  };

  //todo作成の関数
  const handleFormSubmit = () => {
    const status = ["未着手", "進行中", "完了"];
    if (todo !== "") {
      setTodos([
        ...todos, //状態の現在の値をコピー
        {
          id: todos.length + 1,
          title: todo.trim(),
          status: status[0],
        },
      ]);
    } else {
      alert("todoのタイトルを入力してください");
    }
    //formの値を空にする
    setTodo("");
  };

  //status変更(selectboxでの値変更処理)
  const handleStatusChange = (e, selectedId) => {
    //idで選択された配列を抽出
    const index = todos.findIndex((todo) => todo.id === selectedId);

    //selectboxで選択されたstatusの値をsetTodosに入れ設定する
    const todosList = [...todos];
    switch (e.target.value) {
      case "進行中": // 進行中
        todosList[index].status = "進行中";
        setTodos(todosList);
        break;
      case "完了": // 完了
        todosList[index].status = "完了";
        setTodos(todosList);
        break;
      default: //未着手
        todosList[index].status = "未着手";
        setTodos(todosList);
        break;
    }
  };

  //todosの配列からtodoを削除する関数
  const handleDeleteClick = (id) => {
    //todo.idとidが違う残りのtodoを抽出して返す
    const removeItem = todos.filter((todo) => {
      return todo.id !== id;
    });
    //removeItemは新しい配列を返す
    setTodos(removeItem);
  };

  //「編集」ボタンがクリックされたときに処理する機能
  const handleEditClick = (todo) => {
    setIsEditing(true); //編集時はtrue
    setCurrentTodo({ ...todo }); //currentTodoをクリックされたtodoアイテムに設定
  };

  //編集入力の値を取得し、新しい状態を設定する関数
  const handleEditInputChange = (e) => {
    //新しい状態の値を、現在編集入力ボックスにあるものに設定
    setCurrentTodo({ ...currentTodo, title: e.target.value });
  };

  //編集するボタンを押してToDoアイテムを実際に更新するhandleUpdateTodo関数を呼び出す
  const handleEditFormSubmit = () => {
    //handleUpdateTodo関数を呼び出す-currentTodo.idとcurrentTodoオブジェクトを引数として渡す
    handleUpdateTodo(currentTodo.id, currentTodo);
  };

  //ToDoアイテムを編集する機能
  //todos配列にtodo.idが関数に渡すIDと一致するかどうかを確認、IDが一致する場合は、2番目のパラメーター（updatedTodo）を使用して更新されたtodoオブジェクトを渡し、それ以外の場合は、古いtodoを使用
  const handleUpdateTodo = (id, updatedTodo) => {
    const updatedItem = todos.map((todo) => {
      return todo.id === id ? updatedTodo : todo;
    });
    //編集モードをfalseに設定、編集が終了したことを意味する
    setIsEditing(false);
    setTodos(updatedItem); //更新されたtodoでtodos状態を更新する
  };

  //ラジオボタンで設定されたtodoのstatusの値でfilterの条件を分け、新たなtodos配列を作る
  const handleFilterChange = (e) => {
    setRadio(e.target.value);
    switch (e.target.value) {
      case "未着手":
        const notStartedTodos = [...todos].filter(
          (todo) => todo.status === "未着手"
        );
        setFilteredTodos(notStartedTodos);
        break;
      case "進行中":
        const inprogressTodos = [...todos].filter(
          (todo) => todo.status === "進行中"
        );
        setFilteredTodos(inprogressTodos);
        break;
      case "完了":
        const doneTodos = [...todos].filter((todo) => todo.status === "完了");
        setFilteredTodos(doneTodos);
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };

  //filterした後のtodosに入っているtodoのstatusの値が変更された時に随時、変更を反映させる
  useEffect(() => {
    let filteredTodo = [];
    todos.map((todo) => {
      if (todo.status === radio) filteredTodo.push(todo);
    });
    setFilteredTodos(filteredTodo);
  }, [todos]);

  return (
    <>
      {isEditing ? (
        /** todo編集モード */
        <div className="todoForm">
          <h2 className="title">Edit Todo</h2>
          <label htmlFor="editTodo" className="todoLabel">
            Edit todo:{" "}
          </label>
          <input
            name="editTodo"
            type="text"
            placeholder="todoを編集する"
            className="inputForm"
            value={currentTodo.title}
            onChange={handleEditInputChange}
          />
          <Button
            type="button"
            onClick={(e) => handleEditFormSubmit(e)}
            className="editButton"
            variant="success"
          >
            編集する
          </Button>
          <Button onClick={() => setIsEditing(false)} variant="outline-info">
            キャンセル
          </Button>
        </div>
      ) : (
        /** todo作成モード */
        <div className="todoForm">
          <h2 className="title">Add Todo</h2>
          <label htmlFor="todo" className="todoLabel">
            ToDo :{" "}
          </label>
          <input
            name="todo"
            type="text"
            placeholder="新しいtodoを作成する"
            className="inputForm"
            value={todo}
            onChange={handleInputChange} //handleInputChange formの入力値を受け取る関数
          />
          <Button
            type="button"
            onClick={(e) => handleFormSubmit(e)}
            className="mx-3"
            variant="primary"
          >
            作成
          </Button>
        </div>
      )}

      {/* ラジオボタン todoのstatus別にfilterで出し分け */}
      <div className="radioGroup">
        <label className="radioButton">
          <input
            type="radio"
            value="all"
            onChange={(e) => handleFilterChange(e)}
            checked={radio === "all"}
          />
          すべて
        </label>
        <label className="radioButton">
          <input
            type="radio"
            value="未着手"
            onChange={(e) => handleFilterChange(e)}
            checked={radio === "未着手"}
          />
          未着手
        </label>
        <label className="radioButton">
          <input
            type="radio"
            value="進行中"
            onChange={(e) => handleFilterChange(e)}
            checked={radio === "進行中"}
          />
          進行中
        </label>
        <label className="radioButton">
          <input
            type="radio"
            value="完了"
            onChange={(e) => handleFilterChange(e)}
            checked={radio === "完了"}
          />
          完了
        </label>
      </div>

      <div className="todoList">
        <h1 className="title">ToDo List</h1>
        {/** すべてのtodoのListとstatus別のtodoのListの条件分岐 */}
        {radio === "all" ? (
          /* すべてのtodoのList */
          <ul>
            {todos.map((todo) => (
              <li key={todo.id} className="todoItem">
                {todo.title}
                <select
                  defaultValue={todo.status}
                  className="selectStatus"
                  onChange={(e) => handleStatusChange(e, todo.id)}
                >
                  <option value={todo.status}>{todo.status}</option>
                  <option value="未着手">未着手</option>
                  <option value="進行中">進行中</option>
                  <option value="完了">完了</option>
                </select>
                <Button
                  className="editButton"
                  variant="outline-success"
                  onClick={() => handleEditClick(todo)}
                >
                  編集
                </Button>
                <Button
                  variant="outline-danger"
                  onClick={() => handleDeleteClick(todo.id)}
                >
                  削除
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          /* status別にfilterで分けたtodoのList */
          <ul>
            {filteredTodos.map((todo) => (
              <li key={todo.id} className="todoItem">
                {todo.title}
                <select
                  defaultValue={todo.status}
                  className="selectStatus"
                  onChange={(e) => handleStatusChange(e, todo.id)}
                >
                  <option value={todo.status}>{todo.status}</option>
                  <option value="未着手">未着手</option>
                  <option value="進行中">進行中</option>
                  <option value="完了">完了</option>
                </select>
                <Button
                  className="editButton"
                  variant="outline-success"
                  onClick={() => handleEditClick(todo)}
                >
                  編集
                </Button>
                <Button
                  variant="outline-danger"
                  onClick={() => handleDeleteClick(todo.id)}
                >
                  削除
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default App;
