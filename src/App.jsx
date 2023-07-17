import './Components/Styles/App.css';
import { RouterProvider } from 'react-router-dom';
import { Urls } from './Urls.jsx';

function App() {
  return (
    <main>
      <RouterProvider router={ Urls }/>
    </main>
  )
}

export default App
