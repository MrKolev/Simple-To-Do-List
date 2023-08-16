import classes from "./App.module.css";
import { useEffect, useState } from 'react';
import { ToDoLists } from "./components/ToDoLists";
import { ListCard } from './components/ListCard';
import { checkTaskExpired, updateTaskStatusById } from "./utils/utils";


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

  const [toDoList, setToDoList] = useState(JSON.parse(localStorage.getItem("data")));
  const [listById, setListById] = useState({});
  const [showCreateCardList, setShowCreateCardList] = useState(false);
  const [showEditCardList, setShowEditCardList] = useState(false);

  // check expired tasks and update the localStorage
  useEffect(() => {

    const checkedToDoList = checkTaskExpired(toDoList)

    if (checkedToDoList) {
      console.log("set New list from checkTaskExpired(lists)");
      setToDoList(checkedToDoList);
    };

    localStorage.setItem("data", JSON.stringify(toDoList));
  }, [toDoList]);

  // adding the created new list to the ToDoList
  const addNewList = (newList) => {
    setToDoList((prevLists) => [newList, ...prevLists]);
  }

  // save edtited list to ToDoList
  const addEditedList = (newList) => {
    setToDoList(toDoList.map((list) => newList.id === list.id ? newList : list));
  };

  // update task status
  const updateTaskStatus = (id, taskStatus) => {
    const newList = updateTaskStatusById(toDoList, id, taskStatus);
    setToDoList(newList);
  };

  // deletion list by id
  const deleteList = (listId) => {
    const filteredList = toDoList.filter((list) => listId !== list.id);
    setToDoList(filteredList);
  };

// opening the card to edit a list by id
  const openEditCardList = (listId) => {
    const listById = toDoList.filter((list) => listId === list.id);
    setListById(listById[0]);
    setShowEditCardList(true);
  }


// opening the card to create a new list
const openCreateNewList = () =>{
  setShowCreateCardList(true);
}
  return (
    <div className={classes.app}>
      <button className={classes.button} onClick={openCreateNewList}>create</button>

      {showCreateCardList && <ListCard
        listData={null}
        addEditedList={addEditedList}
        close={() => setShowCreateCardList(false)}
        addNewList={addNewList}
      />}

      {showEditCardList && <ListCard
        action={"edit"}
        listEdit={listById}
        updateLists={addEditedList}
        close={() => setShowEditCardList(false)}
        addToLists={addNewList}
      />}
      <div>
        {toDoList.length === 0 && <p>Еmpty list...</p>}
        {toDoList.map((list) => {
          return (<ToDoLists
            status={list.listStatus}
            key={list.id}
            name={list.name}
            tasks={list.tasks}
            id={list.id}
            deleteList={deleteList}
            editList={openEditCardList}
            updateTaskStatus={updateTaskStatus} />)
        })}
      </div>
    </div>
  );
}

export default App;
