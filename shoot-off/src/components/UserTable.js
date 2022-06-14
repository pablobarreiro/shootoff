import React from 'react'


export const UserTable = ({ contact, handleChangeClick, handleDeleteClick }) => {
    return (
        <>
            <tr>
                <th scope="row">{contact.id}</th>
                <td>{contact.user_name}</td>
                <td>{contact.email}</td>
                <td>{contact.admin ? "ADMIN" : contact.employee ? "EMPLOYEE" : "USER"}</td>
                <td>{ !contact.admin &&
                    <button type='button' onClick={(e) => handleChangeClick(e, contact)}>Change</button>}
                    { !contact.admin && <button type='button'onClick={() => handleDeleteClick(contact.id)}>Delete</button>}
                </td>
            </tr>
        </>
    )
}
