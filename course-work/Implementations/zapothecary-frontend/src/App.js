import logo from './logo.svg';
import Navbar from './components/Navbar';
import './App.css';
import { Outlet } from 'react-router';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
