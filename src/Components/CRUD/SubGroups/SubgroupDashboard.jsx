import {useEffect} from "react";

export function SubgroupDashboard({idGroup}) {


	useEffect(() => {
		console.log("Cargando SubgroupDashboard para el grupo " + idGroup + "...");
	}, [idGroup]);

	return (
		<>
			<button className="btn bg-dark text-white m-2"
				onClick={
					() => {
						console.log("Abriendo modal de modificación..." + idGroup)
					}
				}
			>
				Modificar clases
			</button>
		</>
	)
}