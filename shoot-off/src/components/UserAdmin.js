import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { nanoid } from "nanoid"
import EditableRow, { ReadOnlyRow } from './EditableRow'


const users = [
    {
        "id": 2,
        "user_name": "Maximiliano",
        "admin": true,
        "phone": "123-456",
        "email": "maximilminu@gmail.com"
    },
    {
        "id": 3,
        "user_name": "Majo",
        "admin": false,
        "phone": "123-456",
        "email": "maximilminu@gmail.com"
    },
    {
        "id": 4,
        "user_name": "Alejandro",
        "admin": false,
        "phone": "123-456",
        "email": "maximilminu@gmail.com"
    },
    {
        "id": 5,
        "user_name": "Pablo",
        "admin": false,
        "phone": "123-456",
        "email": "maximilminu@gmail.com"
    },
    {
        "id": 6,
        "user_name": "Franco",
        "admin": false,
        "phone": "123-456",
        "email": "maximilminu@gmail.com"
    },
]


const UserAdmin = () => {

    const [contacts, setContacts] = useState(users)
    const [addFormData, setAddFormData] = useState({
        user_name: "",
        phone: "",
        email: "",
        admin: ""
    })

    const[editFormData, setEditFormData] = useState({
        user_name: "",
        phone: "",
        email: "",
        admin: ""
    })

    const [editContactId, setEditContactId] = useState(null)

    const handleAddFormChange = (e) => {
        e.preventDefault()

        const fieldName = e.target.getAttribute("name")
        const fieldValue = e.target.value

        const newFormData = { ...addFormData }
        newFormData[fieldName] = fieldValue

        setAddFormData(newFormData)
    }

    const handleEditFormChange = (e) => {
        e.preventDefault()
        const fieldName = e.target.getAttribute("name")
        const fieldValue = e.target.value

        const newFormData = { ...editFormData }
        newFormData[fieldName] = fieldValue

        setEditFormData(newFormData)
    }

    const handleAddFormSubmit = (e) => {
        e.preventDefault()

        const newContact = {
            id: nanoid(),
            user_name: addFormData.user_name,
            phone: addFormData.phone,
            email: addFormData.email,
            admin: addFormData.admin
        }
        const newContacts = [...contacts, newContact]
        setContacts(newContacts)
    }

    const handleEditClick = (e, contact) => {
        e.preventDefault()
        setEditContactId(contact.id)

        const formValues = {
            user_name: contact.user_name,
            phone: contact.phone,
            email: contact.email,
            admin: contact.admin
        }

        setEditFormData(formValues)
    }


    return (
        <div>
            <form>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Username</th>
                            <th scope="col">Phone</th>
                            <th scope="col">E-mail</th>
                            <th scope="col">Is Admin?</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((contact, i) => {
                            return (
                                <>
                                {editContactId === contact.id ? <EditableRow  editFormData={editFormData} handleEdi/> : <ReadOnlyRow contact={contact} i={i} handleEditClick={handleEditClick}/>}                                    
                                </>
                            )
                        })}
                    </tbody>
                </table>
            </form>
            <h2>Add a contact</h2>
            <form onSubmit={handleAddFormSubmit}>
                <input
                    type="text"
                    name="user_name"
                    required="required"
                    placeholder='Enter a user name'
                    onChange={handleAddFormChange}
                />
                <input
                    type="text"
                    name="phone"
                    required="required"
                    placeholder='Enter a phone'
                    onChange={handleAddFormChange}
                />
                <input
                    type="email"
                    name="email"
                    required="required" placeholder='Enter a email'
                    onChange={handleAddFormChange}
                />
                <input
                    type="text"
                    name="admin"
                    required="required"
                    placeholder='Is admin? YES/NO'
                    onChange={handleAddFormChange}
                />
                <button type='submit'>Add</button>
            </form>
        </div>
    )
}

export default UserAdmin