export function SubgroupDashboard({idGroup}) {

	console.log("Cargando SubgroupDashboard...")

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