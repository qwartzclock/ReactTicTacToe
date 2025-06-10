import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import TicTacToe from './Pages/TicTacToe/TicTacToe';
import NavBar from './NavBar';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavBar/>}>
          <Route index element={<Home/>}/>
          <Route path="tictactoe" element={<TicTacToe/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
