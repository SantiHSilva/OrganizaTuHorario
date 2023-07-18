function getGroupList() {
  const storedGroup = window.sessionStorage.getItem("groupList");
  return storedGroup === null ? [] : JSON.parse(storedGroup);
}

function getGroupById(idGroup = 0){
  const temp = getGroupList();
  return temp.find((element) => element.key === idGroup);
}

function deleteSpecifiedGroup(idGroup = 0){
  const temp = getGroupList();
  const index = temp.findIndex((element) => element.key === idGroup);
  temp.splice(index, 1);
  addSessionStorageGroup(temp);
}

function findIndexGroup(idGroup = 0){
  const temp = getGroupList();
  return temp.findIndex((element) => element.key === idGroup);
}

function getNextIdForANewGroup(){
  const temp = getGroupList();
  return temp.length === 0 ? 1 : Math.max(...temp.map((element) => element.key)) + 1;
}

// Modify Default Values

function modifyGroupName(idGroupName = 0, newName = ""){
  const temp = getGroupList();
  const index = findIndexGroup(idGroupName);
  temp[index].name = newName;
  addSessionStorageGroup(temp);
}

function modifyColorName(idGroupName = 0, newColor = ""){
  const temp = getGroupList();
  const index = findIndexGroup(idGroupName);
  temp[index].color = newColor;
  addSessionStorageGroup(temp);
}

// Default Values

function saveValues(name, color){
  addGroupToSystem(name, color);
}

function addGroupToSystem(name = "", color = ""){
  const temp = getGroupList();
  const newGroup = {
    key: getNextIdForANewGroup(),
    name: name,
    color: color,
    materias : [],
  };
  temp.push(newGroup)
  addSessionStorageGroup(temp);
}

function addSessionStorageGroup(newGroupList = []){
  window.sessionStorage.setItem("groupList", JSON.stringify(newGroupList));
}

export {saveValues, getGroupList, addGroupToSystem, addSessionStorageGroup, getGroupById, deleteSpecifiedGroup, modifyGroupName, modifyColorName};