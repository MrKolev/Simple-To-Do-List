import classes from "./App.module.css"
import { useEffect, useState } from 'react';
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

  const [lists, setLists] = useState(data);
  const [listById, setListById] = useState([]);
  const [showCardList, setShowCardList] = useState(false);
  const [showEditCardList, setShowEditCardList] = useState(false);


  function addToLists(newList) {
    setLists((prevLists) => [newList, ...prevLists]);
  }

  function updateLists(newList) {
    setLists(lists.map((list) => newList.id === list.id ? newList : list));
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



  const openEditCardList = (listId) => {
    const listById = lists.filter((list) => listId === list.id);
    setListById(listById);
    setShowEditCardList(true);
  }

  return (
    <div className={classes.app}>
      <button className={classes.button} onClick={openCardList}>create</button>

      {showCardList && <CardList
        listEdit={null}
        updateLists={updateLists}
        close={() => setShowCardList(false)}
        addToLists={addToLists}
      />}

      {showEditCardList && <CardList
        listEdit={listById[0]}
        updateLists={updateLists}
        close={() => setShowEditCardList(false)}
        addToLists={addToLists}
      />}

      <div>
        {lists.length === 0 && <p>To Do List ...</p>}
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