import { useAuth } from "../stores/useAuth";

export default function Counter(){
  const counter = useAuth();

  return ( 
    <div className="bg-white dark:bg-[#101218] h-screen">
      <h1 className="text-2xl text-gray-800 dark:text-white">
        Counter
      </h1>
      <p className="text-gray-500 dark:text-gray-400">
        Contador: {counter.count}
      </p>
      <button className="bg-blue-500 text-white rounded px-4 py-2 cursor-pointer"
        onClick={() => counter.inc()}
      >
        Incrementar
      </button>
      <button className="bg-red-500 text-white rounded px-4 py-2 ml-2 cursor-pointer"
        onClick={() => counter.dec()}
      >
        Decrementar
      </button>
    </div>
  )
}