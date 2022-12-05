import { useState } from "react";
import ActionTodo from "./components/ActionTodo";
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import './index.css';

function App() {
  const [isRefresh, setIsRefresh] = useState(true);

  const setRefresh = (status) => {
    setIsRefresh(status);
  }

  return (
    <div className="App">
      <div className="content">
        <Header setRefresh={setRefresh} />
        <TodoList setRefresh={setRefresh} isRefresh={isRefresh} />
      </div>
    </div>
  );
}

export default App;
