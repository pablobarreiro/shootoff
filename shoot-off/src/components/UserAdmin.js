import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { UserTable } from "./UserTable";
import "../styles/UserAdmin.css";

const UserAdmin = () => {
  const [contacts, setContacts] = useState([]);
  //users      //setUsers
  useEffect(() => {
    axios
      .get("/api/user/admin/1/users")
      .then((res) => res.data)
      .then((users) => setContacts(users));
  }, []);

  const handleChangeClick = (e, contact) => {
    e.preventDefault();
    axios.put(`/api/user/admin/1/changeRol/${contact.id}`).then(() => {
      axios
        .get("/api/user/admin/1/users")
        .then((res) => res.data)
        .then((users) => setContacts(users));
    });
  };

  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === contactId);
    newContacts.splice(index, 1);
    setContacts(newContacts);
  };

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
};

export default UserAdmin;
