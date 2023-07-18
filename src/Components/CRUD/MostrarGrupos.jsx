import {getGroupList} from "../Data/groupManager.js";

export default function MostrarGrupos(update, toggleUpdate){

  let groups = getGroupList();

  console.log("Updating MostrarGrupos...");

  let groupCarts = groups.map((group) => (
    <div className="col-sm-4" key={group.key}>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{group.name}</h5>
          <p className="card-text">{group.color}</p>
          <a href="#" className="btn btn-primary">Ver grupo</a>
        </div>
      </div>
    </div>
  ));

  return(
    <div>
      <h1>Grupos</h1>
      <p>Esta es la página de grupos.</p>

      <div className="container">
        <div className="row">
          {groupCarts}
        </div>
      </div>
    </div>
  )
}