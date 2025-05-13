export interface Horario {
    key:      number;
    name:     string;
    color:    string;
    materias: Materia[];
}

export interface Materia {
    descripciones_generales: DescripcionesGenerales[];
    descripciones_por_dia:   DescripcionesPorDia[];
}

export interface DescripcionesGenerales {
    mostrar_en_tabla: boolean;
    titulo:           string;
}

export interface DescripcionesPorDia {
    dia:     string;
    inicio:  string;
    fin:     string;
    ajustes?: DescripcionesGenerales[];
}

function getGroupList() {
  const storedGroup = window.sessionStorage.getItem("groupList");
  return storedGroup === null ? [] : JSON.parse(storedGroup);
}

let globalGroupList : Horario[] = getGroupList(); // TODO: Global Variable

function getGroupById(idGroup: number): Horario | undefined {
  return globalGroupList.find((element: Horario) => element.key === idGroup);
}

function globalDeleteGroups(){
  globalGroupList.splice(0, globalGroupList.length);
  addSessionStorageGroup(globalGroupList);
}

function existGroups(){
  return globalGroupList.length !== 0;
}

function deleteSpecifiedGroup(idGroup = 0){
  const index = globalGroupList.findIndex((element) => element.key === idGroup);
  globalGroupList.splice(index, 1);
  addSessionStorageGroup(globalGroupList);
}

function findIndexGroup(idGroup = 0){
  return globalGroupList.findIndex((element) => element.key === idGroup);
}

function getNextIdForANewGroup(){
  return globalGroupList.length === 0 ? 1 : Math.max(...globalGroupList.map((element) => element.key)) + 1;
}

function replaceGroupList(newGroupList = []){
  globalGroupList.splice(0, globalGroupList.length);
  globalGroupList = newGroupList;
  addSessionStorageGroup(globalGroupList);
}

// Modify Default Values

function modifyGroupName(idGroupName = 0, newName = ""){
  const index = findIndexGroup(idGroupName);
  globalGroupList[index].name = newName;
  addSessionStorageGroup(globalGroupList);
}

function modifyColorName(idGroupName = 0, newColor = ""){
  const index = findIndexGroup(idGroupName);
  globalGroupList[index].color = newColor;
  addSessionStorageGroup(globalGroupList);
}

function modifyMaterias(idGroupName = 0, newMaterias: Horario["materias"] = []){
  const index = findIndexGroup(idGroupName);
  globalGroupList[index].materias = newMaterias;
  addSessionStorageGroup(globalGroupList);
}

// Default Values

function saveValues(name: string = "", color: string = ""){
  addGroupToSystem(name, color);
}

function addGroupToSystem(name = "", color = ""){
  const newGroup = {
    key: getNextIdForANewGroup(),
    name: name,
    color: color,
    materias : [],
  };
  globalGroupList.push(newGroup)
  addSessionStorageGroup(globalGroupList);
}

function duplicateGroup(idGroup = 0){
  const grupo = getGroupById(idGroup);

  if(grupo === undefined) return;

  const newGroup : Horario = {
    key: getNextIdForANewGroup(),
    name: grupo + ' (Copia)',
    color: grupo.color,
    materias: grupo.materias,
  };
  globalGroupList.push(newGroup);
  addSessionStorageGroup(globalGroupList);
}

function addSessionStorageGroup(newGroupList: Horario[]){
  window.sessionStorage.setItem("groupList", JSON.stringify(newGroupList));
}

export {
  saveValues,
  getGroupList,
  addGroupToSystem,
  addSessionStorageGroup,
  getGroupById,
  deleteSpecifiedGroup,
  modifyGroupName,
  modifyColorName,
  globalDeleteGroups,
  modifyMaterias,
  replaceGroupList,
  existGroups,
  duplicateGroup,
  globalGroupList
};