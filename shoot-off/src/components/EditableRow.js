import React from 'react'


export const ReadOnlyRow = ({contact, i, handleEditClick}) => {
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
                </td>
            </tr>
        </>
    )
}

const EditableRow = () => {
    return (
        <>
            <tr>
                <td><input
                    type="text"
                    name="user_name"
                    required="required"
                    placeholder='Enter a user name'
                /></td>
                <td><input
                    type="text"
                    name="phone"
                    required="required"
                    placeholder='Enter a phone'
                /></td>
                <td><input
                    type="email"
                    name="email"
                    required="required" placeholder='Enter a email'
                /></td>
                <td><input
                    type="text"
                    name="admin"
                    required="required"
                    placeholder='Is admin? YES/NO'
                /></td>
            </tr>
        </>
    )
}

export default EditableRow


