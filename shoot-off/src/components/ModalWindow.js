import useInput from "../commons/useInput";
import { Modal, TextField, Button } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import "../styles/modalWindow.css";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

export const ModalWindow = () => {
  const [stateModal, setStateModal] = useState(false);
  const navigate = useNavigate();
  const product_name = useInput("");
  const description = useInput("");
  const price = useInput("");
  const category = useInput("");
  const stock = useInput("");
  const img_url = useInput("");

  const openCloseModal = () => {
    setStateModal(!stateModal);
  };

  const handleModel = (e) => {
    e.preventDefault();
    axios
      .post("/api/product", {
        product_name: product_name.state,
        description: description.state,
        price: Number(price.state),
        category: category.state,
        stock: Number(stock.state),
        img_url: img_url.state,
      })
      .then((res) => res.data)
      .then(() => {
        swal({ tittle: "Created", text: "Product created", icon: "success" });
        navigate("/");
      });
  };

  return (
    <>
      <button className="btn btn-dark" onClick={() => openCloseModal()}>
        Add product
      </button>
      <Modal open={stateModal} onClose={openCloseModal}>
        <form className="modal-product" onSubmit={handleModel}>
          <div>
            <h2>Add product</h2>
          </div>

          <TextField
            label="product_name"
            className="textField"
            {...product_name}
          />
          <br />
          <TextField
            label="description"
            className="textField"
            {...description}
          />
          <br />
          <TextField label="price" className="textField" {...price} />
          <br />
          <TextField label="category" className="textField" {...category} />
          <br />
          <TextField label="stock" className="textField" {...stock} />
          <br />
          <TextField label="img_url" className="textField" {...img_url} />
          <br />
          <div>
            <Button type="submit">Add Product</Button>
            <Button onClick={() => openCloseModal()}>close</Button>
          </div>
        </form>
      </Modal>
    </>
  );
};
