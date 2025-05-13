interface props{
  groupListed: {
    name: string;
    color: string;
  };
  detectChanges: () => void;
  modifyModal: () => void;
  hexColor: string;
  setColor: (color: string) => void;
}

export default function HeaderSubgroupDashboard({groupListed, detectChanges, modifyModal, hexColor, setColor}:props) {
  return(
    <div className="flex flex-row">
      {/* Equivalente a InputGroup */}
      <div className="flex items-center mb-4 w-full"> {/* Añadimos un margin-bottom para separar los grupos */}
        {/* Equivalente a InputGroup.Text */}
        <span className="inline-flex items-center px-3 py-2 text-sm text-gray-700 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md
                          dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600">
          Modificando...
        </span>

        {/* Equivalente a Form.Control para el texto */}
        <input
          id="groupName"
          placeholder={groupListed.name}
          defaultValue={groupListed.name}
          type='text'
          onChange={detectChanges}
          className="flex-1 block w-full px-3 py-2 text-gray-900 placeholder-gray-400 border border-gray-300 rounded-none rounded-r-md
                     focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
                     dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:border-gray-600
                     dark:focus:ring-indigo-400 dark:focus:border-indigo-400"
        />
      </div>

      {/* Equivalente a Form.Control para el color */}
      <label htmlFor="groupColor" className="block text-sm font-medium text-gray-700 sr-only
                                             dark:text-gray-200">
        Color del Grupo
      </label> {/* Añadimos un label para accesibilidad, oculto visualmente */}
      <input
        type="color"
        defaultValue={hexColor}
        id='groupColor'
        onChange={ (e) => {
          setColor(e.target.value)
          modifyModal();
          detectChanges();
        }}
        // Las entradas de tipo 'color' son difíciles de estilizar de forma consistente entre navegadores.
        // Se aplican clases básicas para el tamaño y margen.
        className="h-10 p-0 border border-gray-300 rounded-md cursor-pointer
                   focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
                   dark:border-gray-600 dark:focus:ring-indigo-400 dark:focus:border-indigo-400"
      />
    </div>
  )
}