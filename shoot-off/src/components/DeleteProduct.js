import {Button } from "@mui/material";
import axios from "axios";
import React from "react";
import "../styles/modalWindow.css";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

export const DeleteProduct = ({idProduct}) =>{

    const navigate=useNavigate()

    const handleDelete=()=>{
        
        axios.delete(`/api/product/${idProduct}`)
        .then(res=>res.data)
        .then(()=>{
            swal({tittle:"Deleted", text:"Product delete", icon:"success"})
            navigate("/")
        })
    }
    return (
          <Button className="container" onClick={() => handleDelete()}>
          Delete product
          </Button>
        )
  
}