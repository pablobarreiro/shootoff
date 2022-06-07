import { useContext } from "react";
import { AuthContext } from "../context/GlobalState";
import React from 'react'

export const Header = () => {

    const {isAuthenticated, toggleAuth, user}= useContext(AuthContext)

    //Login function
    const loginUser = (e) => {
        e.preventDefault()
        //pasamos a logear un usuario generado desde nuestra db
        const user = {
            id:1,
            nombre: "maxi"
        }
        toggleAuth(user)
    }
    console.log(user)
    console.log(isAuthenticated)


  return (
    <nav className="header">
        <div>
            Mensaje de bienvenida
        </div>
        <button onClick={loginUser}>Logearese/Desloguearse</button>
    </nav>
  )
}
