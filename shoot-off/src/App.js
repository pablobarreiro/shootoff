
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Cards } from './components/Cards';
import { Header } from './components/Header';
import { Route, Routes } from 'react-router-dom';
import AuthContext from './context/GlobalState';
import { Login } from './components/Login';
import {Register} from "./components/Register";
import {Cart} from "./components/Cart"
function App() {

  return (
    <>
    <AuthContext>
    <Navbar />
        <Routes>
          <Route path="/"element ={<Cards/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart/>}/>
        </Routes>
            <Footer />
</AuthContext>
    </>
  );
}

export default App;
