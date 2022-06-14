import React from 'react'


export const ReadOnlyRow = ({ contact, i, handleEditClick, handleDeleteClick }) => {
    return (
        <>
            <tr key={i}>
                <th scope="row">{contact.id}</th>
                <td>{contact.user_name}</td>
                <td>{contact.phone}</td>
                <td>{contact.email}</td>
                <td>{contact.admin ? "YES" : "NO"}</td>
                <td>
                    <button type='button' onClick={(e) => handleEditClick(e, contact)}>Edit</button>
                    <button type='button'onClick={() => handleDeleteClick(contact.id)}>Delete</button>
                </td>
            </tr>
        </>
    )
}

const EditableRow = ({ editFormData, handleEditFormChange, contact, handleCancelClick}) => {

    return (
        <>
            <tr>
                <th scope="row">{contact.id}</th>
                <td><input
                    type="text"
                    name="user_name"
                    required="required"
                    placeholder='Enter a user name'
                    value={editFormData.user_name}
                    onChange={handleEditFormChange}
                /></td>
                <td><input
                    type="text"
                    name="phone"
                    required="required"
                    placeholder='Enter a phone'
                    value={editFormData.phone}
                    onChange={handleEditFormChange}
                /></td>
                <td><input
                    type="email"
                    name="email"
                    required="required" placeholder='Enter a email'
                    value={editFormData.email}
                    onChange={handleEditFormChange}
                /></td>
                <td><input
                    type="text"
                    name="admin"
                    required="required"
                    placeholder='Is admin? YES/NO'
                    value={editFormData.admin}
                    onChange={handleEditFormChange}
                /></td>
                <td>
                    <button type='submit'>Save</button>
                    <button type='button' onClick={handleCancelClick}>Cancel</button>
                </td>
            </tr>
        </>
    )
}

export default EditableRow


