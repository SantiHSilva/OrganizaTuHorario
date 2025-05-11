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
              'Convierte tus opciones en combinaciones.',
              1000,
              'Convierte tus combinaciones para apoyar tus decisiones.',
              1000,
              'Convierte tus decisiones en resultados.',
              1000,
              'Convierte tus resultados en acciones.',
              1000,
            ]}
            repeat={Infinity}
          />
          <section className="flex flex-row items-center justify-start mt-4 gap-2 w-full">
            <button
              className="px-4 py-2 w-full md:w-auto bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer"
              onClick={() => window.location.href = '/auth/login'}
            >
              Comenzar 🚀
            </button>
            <a
              href="https://santihsilva.github.io/OrganizaTuHorario/#/import/?groupList=NoCg5AhghAjAfgIymAsgSYCoHkAiWDKABAGICqAcjgIIoCi5GVAMrUfYQMJbn4YBKpDhwD8OWoXxZiGAOpU+tAHoBWAGwBOAMwATAEwASAHwAGAOzqALAGlVAUmMBFGBYBUVAO4xjMAES7EyLQsHBgAkgBqVIRihAAKfFIUOKEAWlQcoQDL5IoIAGYWMMp5Rs6a6mAAlAA0APoABrEATgD2eRIApgDmAK5NnE0AlgAOAC4thEyDAHY9AB5WFrbqDrowbu66xsoAEgBkAFJm6uqL9k7rHlum+1V1MA8wp7q2ABxO6gBeOJ7Guj6aAJgWJMKjkULEUIcdLCACahAA4qwMKJxAoxER4fhaHxwlDQgRFK9tBBTDAEPpyBw+AAuQhecyvM7KJymDZbXQ7QxlVRnd5bdl-HzKIEwADU2lMAGM1CUABoHMrKKwAHx2CoAvi4fltdgBuRUWTSmKwAHk2xlUOwA9AcAP4uABCFpuhAAOqMAI6Ksy881eGA7T0AXicr21v3+qiBujFeTyr2MSf0CqVqvVBy1Ou2OwNZRN5q2VttDud1x27q9PtMft+gZDYYjXl0YAAAq2XJ8AN47Ns1cAdKDAWoHO61QxWKoAXTgAAsh+BBsgHDSk2A4ABrZBy+ocFoAW2GABtooMAM4dACPEwRHTPozirQAnh0pbVwHkoKMmj0OnAusgnq0Eer6jIMABuECPi0XRNBA+4QFKgwAHSEB00xxE+oyzi00zuPgNCEJ8NLKBUcBHguYAAd+v5zsgPh9lO-aQFA+jrtolGDsOtjrgAVsgMB7I0rTtFQx6DFKUHaB0hCOhAF5ntEECjGKhAALSEEEtAhFCURcCgIK0HQDDyKEVCKNa9ShNM34tNoPRSlKhBQUeUF8C0CAtGBkl6sBoEQVB1ldOhgwdEMUG0FKuEHhJECmqofHIGYDjGOobjBmOXYPEamhWMotiqIY5B8BwdIwMIWTkIQraVExU6KOuUrIAAxPUflSg+Xb4BAR4AM-THSKowLYpgfJ8VxmBqZTWJoBVhnaRSFHlyyrDAACAdoaiqXb1IorbCIYwamnq1pinstj6D4nzuJ6tRyg4VgHDsLi1EAA"
              target="_blank"
              className="px-4 py-2 w-full md:w-auto bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition cursor-pointer text-center"
            >
              Ver Ejemplo 📊
            </a>
          </section>
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