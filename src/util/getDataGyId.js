export const getDataById = (listId) => {
    const lists = JSON.parse(localStorage.getItem("data"));
    const list = lists.filter((list) => listId === list.id);
    return list[0];

}