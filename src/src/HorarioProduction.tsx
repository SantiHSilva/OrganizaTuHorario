import DataRoot from "../components/CRUD/DataRoot";
import { globalGroupList } from "../Data/groupManager";

function HorarioProduction() {
  return (
    <DataRoot
      data={globalGroupList}
    />
  )
}

export default HorarioProduction
