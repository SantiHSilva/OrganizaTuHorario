import HeaderBar from "../context/global/HeaderBar";
import { TypeAnimation } from 'react-type-animation';

export default function Welcome() {
  return (
    <div className='bg-white dark:bg-[#101218] flex flex-col md:h-screen'>
      <HeaderBar />
      <section className='grid md:grid-cols-2 px-10 md:px-20 mt-10 md:mt-0 md:gap-10 gap-5 grow md:items-center h-full w-full max-w-screen-xl mx-auto'>
        <div className="flex flex-col items-start justify-center h-full">
          <h1 className="pb-5 text-4xl font-bold text-gray-800 dark:text-white">
            Organiza Tu Horario
          </h1>
          <TypeAnimation
            className="text-2xl font-semibold text-gray-600 dark:text-gray-400"
            sequence={[
              'Convierte tus opciones en combinaciones',
              1000,
              'Convierte tus combinaciones para apoyar tus decisiones',
              1000,
              'Convierte tus decisiones en resultados',
              1000,
              'Convierte tus resultados en acciones',
              1000,
            ]}
            repeat={Infinity}
          />
          <button
            className="px-4 py-2 mt-4 w-full md:w-auto bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer"
            onClick={() => window.location.href = '/auth/login'}
          >
            Comenzar 🚀
          </button>
        </div>
        <section className="pb-10 md:pb-0">
          <img src="/demo_white.png" className="hidden md:block dark:hidden" />
          <img src="/demo_black.png" className="hidden md:dark:block" />
          <img src="/mobile_demo_white.png" className="dark:hidden md:hidden" />
          <img src="/mobile_demo_black.png" className="hidden md:dark:hidden dark:block" />
        </section>
      </section>
    </div>
  )
}