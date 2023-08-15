import classes from "./App.module.css"
import { useEffect, useState } from 'react';
import { ToDoLists } from "./components/ToDoLists"
import { CardList } from './components/CardList';
import moment from "moment";


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



const App = () => {

  const [lists, setLists] = useState(JSON.parse(localStorage.getItem("data")));
  const [listById, setListById] = useState({});
  const [showCardList, setShowCardList] = useState(false);
  const [showEditCardList, setShowEditCardList] = useState(false);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(lists));
    console.log("local set");
  }, [lists]);

  useEffect(() => {
    lists.forEach((list) => {
      list.tasks.forEach((task) => {
        if (task.taskStatus !== "DISABLED") {
          const today = moment();
          const expirationDate = moment(task.deadline);
          if (expirationDate.isBefore(today)) {
            task.taskStatus = "DISABLED";
          }
        }
      })
    })
    setLists(lists);
  }, [showCardList]);

  const addToLists = (newList) => {
    setLists((prevLists) => [newList, ...prevLists]);
  }

  const updateLists = (newList) => {
    setLists(lists.map((list) => newList.id === list.id ? newList : list));
  }

  const deleteList = (listId) => {
    const filteredList = lists.filter((list) => listId !== list.id);
    setLists(filteredList);
  }


  const openCardList = () => {
    setShowCardList(true);
  };

  const openEditCardList = (listId) => {
    const listById = lists.filter((list) => listId === list.id);
    setListById(listById[0]);
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
        action={"edit"}
        listEdit={listById}
        updateLists={updateLists}
        close={() => setShowEditCardList(false)}
        addToLists={addToLists}
      />}

      <div>
        {lists.length === 0 && <p>Еmpty list...</p>}
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
