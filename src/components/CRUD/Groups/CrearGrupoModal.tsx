import {useState, useEffect, memo} from 'react';
import { saveValues, getGroupList } from "../../../Data/groupManager.js";
import {toast} from "react-toastify";
import {BiBookAdd} from "react-icons/bi";
import {Tooltip} from "react-tooltip";
import { adaptColorByHexColor, getValueById, randomHexColor } from '../../../Utils/Utils.js';
import { Modal } from '../../Modal.js';

function CreateGroupModal({toggleUpdate}: {toggleUpdate: (value?: boolean) => void;}) {

  const [show, setShow] = useState(false);

  const [hexColor, setHexColor] = useState(randomHexColor());

  useEffect(() => {
    import ('react-toastify/dist/ReactToastify.css');

    console.log("Creating CrearGrupoModal...");
  }, []);

  const createNewColor = () => {
    setHexColor(randomHexColor());
  }

  function modifyModal(){
    const hexColor = getValueById("groupColor");

    if(!hexColor) {
      console.error("Element with id groupColor not found");
      return;
    }

    const element = document.getElementById("modifyButtonSave");

    if(!element) {
      console.error("Element with id modifyButtonSave not found");
      return;
    }

    element.setAttribute('style', `background-color: ${hexColor}; border-color: ${hexColor}; color: ${adaptColorByHexColor(hexColor)};`);
  }

  function huboCambios(){
    const name = getValueById("groupName");
    return name !== "";
  }

  function detectChanges(){
    const element = document.getElementById("modifyButtonSave");

    if(!element) {
      console.error("Element with id modifyButtonSave not found");
      return;
    }

    if(huboCambios())
      element.removeAttribute('disabled');
    else
      element.setAttribute('disabled', 'true');
  }

  useEffect(() => {
    if(!show) return;
    const element = document.getElementById("modifyButtonSave");
    const groupColor = document.getElementById("groupColor");

    if(!element) {
      console.error("Element with id modifyButtonSave not found");
      return;
    }

    if(!groupColor) {
      console.error("Element with id groupColor not found");
      return;
    }

    modifyModal();
    console.log("Abriendo modal...")
    groupColor.addEventListener('input', modifyModal);
    element.setAttribute('disabled', 'true');
  }, [show])

  function formSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    saveChanges();
  }

  function saveChanges(){
    console.log("Guardando cambios...")
    const name = getValueById("groupName");
    const color = getValueById("groupColor");
    if (name){
      saveValues(name, color);
      toast.info(
        `Se ha creado el grupo "${name}"`,
        {
        // icon: '💾',
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light',
      });
    }
    setShow(false);
    console.log(getGroupList());
    toggleUpdate();
  }

  const handleSave = () => setShow(false);

  const handleShow = () => setShow(true);

  return (
    <div className='text-center'>

      <BiBookAdd
        data-tooltip-id='crearGrupoBtn'
        onClick={handleShow}
        className='OTHBtn'
        size={25}
      />

      <Tooltip
        id="crearGrupoBtn"
        noArrow
        place={'bottom'}
        border={'1px solid #ffffff'}
        style={{
          userSelect: 'none',
          borderRadius: '20px',
        }}
      >
        Crear nuevo grupo
      </Tooltip>

      <Modal isOpen={show} onClose={() => {
        handleSave(); createNewColor();
      }}>
        <section className='p-4 flex flex-col gap-4'>
          <div className='text-gray-200 text-left font-semibold text-xl'>
            ✍️ Crear nuevo grupo
          </div>

          {/* Body */}

              <form
              onSubmit={formSubmit}
              >
                <div className='text-gray-400 text-left font-semibold text-sm mb-2'>
                  Ingresa el nombre del grupo y escoge un color
                </div>
                <div className='flex flex-row'>
                  <input 
                    id="groupName" 
                    onChange={detectChanges} 
                    type="text" 
                    placeholder='Matematica' 
                    className='shadow-sm border-2 px-2 border-gray-700 w-full placeholder:text-gray-600 text-gray-400 rounded-l-xl outline-none'
                  />
                  <input
                    type="color" 
                    defaultValue={hexColor}
                    title='Color del grupo'
                    className='shadow-sm bg-body rounded'
                    id='groupColor'
                  />
                </div>
              </form>
          {/* Footer */}
          <div className='flex flex-row justify-end items-center gap-2'>
            <button className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow cursor-pointer'
            onClick={handleSave}>
              Cancelar
            </button>
            <button className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow cursor-pointer disabled:grayscale'
            onClick={saveChanges} id='modifyButtonSave'>
              Crear
            </button>
          </div>
        </section>
        {/* Header */}
      </Modal>

        

    </div>
  );
}

export const CrearGrupoModal = memo(CreateGroupModal);