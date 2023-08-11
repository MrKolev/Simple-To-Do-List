import { useEffect, useState } from 'react';
import './App.css';
import { ToDoLists } from "./components/ToDoLists"
import { NewList } from './components/NewList';

// const toDoLists = [{
//   id: 'toDo1',
//   name: 'toDo1',
//   listStatus: "COMPLETED",
//   tasks: [{
//     title: "task1",
//     description: "To do task1",
//     deadline: "20.01.2024",
//     id: "id1",
//     taskStatus: "COMPLETED",
//   },
//   {
//     title: "task2",
//     description: "To do task2",
//     deadline: "20.01.2024",
//     id: "id2",
//     taskStatus: "COMPLETED",
//   }]
// }, {
//   id: 'toDo2',
//   name: 'toDo2',
//   listStatus: "COMPLETED",
//   tasks: [{
//     title: "task3",
//     description: "To do task3",
//     deadline: "20.01.2024",
//     id: "id123",
//     taskStatus: "COMPLETED",
//   }]
// }]

const data = JSON.parse(localStorage.getItem("data"));

function App() {
  const [lists, setLists] = useState([]);
  const [showNewList, setShowNewList] = useState(false);
  useEffect(() => {
    if (data) {
      setLists(data);
    }
  }, [])



  function updateList(newList) {
    setLists((prevLists) => [newList, ...prevLists]);
  }

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(lists));
  }, [lists]);

  return (
    <div className="App">
      {!showNewList && <button onClick={() => setShowNewList(true)}>create</button>}
      {showNewList && <NewList
        updateList={updateList}
        close={() => setShowNewList(false)} />}
      {!showNewList &&
        <div>
          {lists.map((list) => {
            return (<ToDoLists
              status={list.listStatus}
              key={list.id}
              name={list.name}
              tasks={list.tasks} />)
          })}
        </div>}
    </div>
  );
}

export default App;
