import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import EditableRow, { ReadOnlyRow } from './EditableRow'
import "../styles/UserAdmin.css"

const UserAdmin = () => {

    const [contacts, setContacts] = useState([])


    useEffect(() => {
        axios.get("/api/user/admin/1/users")
            .then(res => res.data)
            .then((users) => setContacts(users))

    },[])


    const [addFormData, setAddFormData] = useState({
        id: "",
        user_name: "",
        phone: "",
        email: "",
        admin: ""
    })

    const [editFormData, setEditFormData] = useState({
        id: "",
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

        const ids = contacts.map((user) => (user.id))
        const maxId = Math.max(...ids)
        const newContact = {
            //Tendria que agarrar el ultimo ID de Users y sumarle 1 sin la posibilidad de editarlo
            id: maxId +1,
            user_name: addFormData.user_name,
            phone: addFormData.phone,
            email: addFormData.email,
            admin: addFormData.admin
        }
        const newContacts = [...contacts, newContact]
        setContacts(newContacts)
    }

    const handleEditFormSubmit = (e) => {
        e.preventDefault()
        const editedContact = {
            id: editContactId,
            user_name: editFormData.user_name,
            phone: editFormData.phone,
            email: editFormData.email,
            admin: editFormData.admin
        }

        const newContacts = [...contacts]

        const index = contacts.findIndex((contact) => contact.id === editContactId)

        newContacts[index] = editedContact

        setContacts(newContacts)
        setEditContactId(null)
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

    const handleCancelClick = (e) => {
        setEditContactId(null)
    }

    const handleDeleteClick = (contactId) => {
        const newContacts = [...contacts]

        const index = contacts.findIndex((contact) => contact.id === contactId)

        newContacts.splice(index, 1)

        setContacts(newContacts)
    }

    return (
        <div className='UserAdmin'>
            <form onSubmit={handleEditFormSubmit}>
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
                                    {editContactId === contact.id ?
                                        <EditableRow
                                            contact={contact}
                                            editFormData={editFormData}
                                            handleEditFormChange={handleEditFormChange}
                                            handleCancelClick={handleCancelClick} /> 
                                            :
                                        <ReadOnlyRow
                                            contact={contact}
                                            i={i}
                                            handleEditClick={handleEditClick}
                                            handleDeleteClick={handleDeleteClick} />}
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