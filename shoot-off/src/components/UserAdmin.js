import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserTable } from "./UserTable";
import "../styles/UserAdmin.css";
import { AuthContext } from "../context/GlobalState";
import { Link } from "react-router-dom";
import { ReqContext } from "../context/RequestState";

const UserAdmin = () => {
  const { user, isAuthenticated } = useContext(AuthContext)
  const { getAllUsers, promoteOneUser, deleteOneUser } = useContext(ReqContext)

  const [contacts, setContacts] = useState([]);
  //users      //setUsers
  useEffect(() => {
    getAllUsers(user.id)
    .then((users) => setContacts(users));
  }, []);

  const handleChangeClick = (e, contact) => {
    e.preventDefault();
    promoteOneUser(user.id,contact.id)
    .then(() => {
      getAllUsers(user.id)
      .then((users) => setContacts(users));
    });
  };

  const handleDeleteClick = (contactId) => {
    console.log(contactId)
    const newContacts = [...contacts];
    const index = contacts.findIndex((contact) => contact.id === contactId);
    
    newContacts.splice(index, 1);

    setContacts(newContacts);
    deleteOneUser(user.id,contactId)

  };
  if (isAuthenticated && user.admin) {
    return (
      <div className="UserAdmin">
        <form>
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Username</th>
                <th scope="col">E-mail</th>
                <th scope="col">Role</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact, i) => {
                return (
                  <UserTable
                    key={i}
                    contact={contact}
                    handleChangeClick={handleChangeClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                );
              })}
            </tbody>
          </table>
        </form>
      </div>
    );
  } else {
    return (
      <>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Link to="/"><button className="btn btn-dark">BACK TO HOME</button></Link>
      </>
    )
  }



};

export default UserAdmin;
