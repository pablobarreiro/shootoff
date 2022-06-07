import './App.css';
import { Cards } from './components/Cards';
import { Header } from './components/Header';
import { Route, Routes } from 'react-router-dom';
import AuthContext from './context/GlobalState';
import { Login } from './components/Login';

function App() {

  return (
    <>
      <h1>Shoot-Off</h1>
      <AuthContext>
        <Header />
        <Cards />
      </AuthContext>
        <Routes>
          <Route path="/register" element={<Login />} />
        </Routes>
    </>
  );
}

export default App;
