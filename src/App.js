import { useState } from 'react';
import './App.css';
import { ToDoLists } from "./components/ToDoLists"

const toDoLists = [{
  id: 'toDo1',
  listStatus: "COMPLETED",
  tasks: [{
    title: "task1",
    description: "To do task1",
    deadline: "20.01.2024",
    id: "id1",
    taskStatus: "COMPLETED",
  },
  {
    title: "task2",
    description: "To do task2",
    deadline: "20.01.2024",
    id: "id2",
    taskStatus: "COMPLETED",
  }]
}, {
  id: 'toDo2',
  listStatus: "COMPLETED",
  tasks: [{
    title: "task3",
    description: "To do task3",
    deadline: "20.01.2024",
    id: "id123",
    taskStatus: "COMPLETED",
  }]
}]

function App() {

  const [lists, setLists] = useState(toDoLists);

  function createList() {
      
  }



  return (
    <div className="App">
      <button onClick={createList}>create</button>
      <div>{lists.map((list) => {
        return (<ToDoLists status={list.listStatus} key={list.id} tasks={list.tasks} ></ToDoLists>)
      })}</div>
    </div>
  );
}

export default App;
