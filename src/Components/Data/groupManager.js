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
  if (storedGroup == null) {
    return [];
  }
  return JSON.parse(storedGroup) || [];
}

function addGroupToSystem(name = "", color = ""){

  const temp = getGroupList();
  const newGroup = {
    name: name,
    color: color,
    materias : [],
  };
  temp.push(newGroup)

  addSessionStorageGroup(temp);

}

function addSessionStorageGroup(groupList = []){
  window.sessionStorage.setItem("groupList", JSON.stringify(groupList));
}

export {saveValues, getGroupList, addGroupToSystem, addSessionStorageGroup}