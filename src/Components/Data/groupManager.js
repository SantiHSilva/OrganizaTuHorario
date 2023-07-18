import {getValueById} from "../../Utils/Utils.js";

function saveValues(){
  const name = getValueById("groupName");
  if (name)
    addGroupToSystem(
      name,
      getValueById("groupColor")
    );
}

function getGroupList() {
  const storedGroup = window.sessionStorage.getItem("groupList");
  return storedGroup === null ? [] : JSON.parse(storedGroup);
}

function addGroupToSystem(name = "", color = ""){
  const temp = getGroupList();
  const newGroup = {
    key: temp.length,
    name: name,
    color: color,
    materias : [],
  };
  temp.push(newGroup)
  addSessionStorageGroup(temp);
}

function addSessionStorageGroup(groupList = []){
  window.sessionStorage.setItem("groupList", JSON.stringify(groupList));
  window.location.hash = 'update'
}

export {saveValues, getGroupList, addGroupToSystem, addSessionStorageGroup}