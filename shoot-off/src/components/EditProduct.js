import useInput from "../commons/useInput";
import { Modal, TextField, Button } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import "../styles/modalWindow.css";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

export const EditProduct = ({idProduct}) => {
  const [editedProduct, setEditedProduct] = useState(false);
   const navigate=useNavigate()
    const product_name= useInput("")
    const description= useInput("")
    const price = useInput("")
    const category= useInput("")
    const stock= useInput("")
    const img_url= useInput("")

  const openCloseModal = () => {
    setEditedProduct(!editedProduct);
  };

  const handleModel=(e)=>{
      e.preventDefault();
      axios.put(`/api/product/${idProduct}`,{
        product_name: product_name.state,
        description:description.state,
        price:Number(price.state),
        category:category.state,
        stock:Number(stock.state),
        img_url:img_url.state
      })
      .then(res=>res.data)
      .then(()=>{
          swal({tittle:"Edited", text:"Product edited", icon:"success"})
          navigate("/")
      })
  }

  

  return (
    <>
      
      <Button className="container" onClick={() => openCloseModal()}>
      Edit product
      </Button>
      <Modal open={editedProduct} onClose={openCloseModal}>

        <form className="modal-product" onSubmit={handleModel}>
          <div>
            <h2>Edit product</h2>
          </div>

          <TextField label="product_name" className="textField" {...product_name}/>
      <br />
      <TextField label="description" className="textField" {...description}/>
      <br />
      <TextField label="price" className="textField" {...price}/>
      <br />
      <TextField label="category" className="textField"{...category} />
      <br />
      <TextField label="stock" className="textField" {...stock}/>
      <br />
      <TextField label="img_url" className="textField" {...img_url} />
      <br />
          <div>
            <Button type="submit">Edit Product</Button>
            <Button onClick={() => openCloseModal()}>close</Button>
          </div>
        </form>
      </Modal>
    </>
  );
};
