
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Cards } from './components/Cards';
import { Header } from './components/Header';
import { Route, Routes } from 'react-router-dom';
import AuthContext from './context/GlobalState';
import { Login } from './components/Login';


function App() {

  return (
    <>
    <AuthContext>
      <h1>Shoot-Off</h1>
    <Navbar />
        <Header />
        <Cards />
     <Footer />
        <Routes>
          <Route path="/register" element={<Login />} />
        </Routes>  
</AuthContext>
    </>
  );
}

export default App;
