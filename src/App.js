import { useEffect, useState } from 'react';
import './App.css';
import { ToDoLists } from "./components/ToDoLists"
import { CardList } from './components/CardList';

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

const data = JSON.parse(localStorage.getItem("data"));

function App() {

  const [lists, setLists] = useState([]);
  const [listData, setListData] = useState([]);
  const [showCardList, setShowCardList] = useState(false);
  const [showEditCardList, setShowEditCardList] = useState(false);

  useEffect(() => {
    if (data) {
      setLists(data);
    }
  }, []);

  function addList(newList) {
    setLists((prevLists) => [newList, ...prevLists]);
  }

  function deleteList(listId) {
    const filteredList = lists.filter((list) => listId !== list.id);
    setLists(filteredList);
  }

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(lists));
  }, [lists]);


  const openCardList = () => {
    setShowCardList(true);
  };

  const closeCardList = () => {
    setShowCardList(false);
  };

  const openEditCardList = (listId) => {
    const listById = lists.filter((list) => listId === list.id);
    setListData(listById);
    setShowEditCardList(true);
  }

  return (
    <div className="App">
      <button onClick={openCardList}>create</button>
      {showCardList && <CardList
        addList={addList}
        close={closeCardList}
        title={"New List"} />}

      {showEditCardList && <CardList
        close={() => setShowEditCardList(false)}
        listData={listData}
        title={"Edit List"} />}

      <div>
        {lists.map((list) => {
          return (<ToDoLists
            status={list.listStatus}
            key={list.id}
            name={list.name}
            tasks={list.tasks}
            id={list.id}
            deleteList={deleteList}
            editList={openEditCardList} />)
        })}
      </div>
    </div>
  );
}

export default App;
