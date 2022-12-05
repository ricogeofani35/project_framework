import axios from 'axios';
import {MdEditNote,
    MdDeleteForever
} from 'react-icons/md';
import { Link } from 'react-router-dom';
import './index.scss';

import {API_URL} from '../../../../../utils/apiUrl';

const Admin = ({users, getDateUser}) => {
   
    const deleteUser = async (id) => {
        const choice =  window.confirm('Are You Sure???');
        choice === true && (
            await axios.delete(API_URL + 'user/' + id)
            .then(() => {
                getDateUser();
            })
            .catch(error => {
                alert('delete product error:', error);
            })
        )
    }

    return (
        <div className='table'>
            <h2 className='text-header'>Date Admin</h2>
    
            <Link to='/admin_setting/modal_create'>
                <button className='add'>Add Date</button>
            </Link>
    
            <table border={1}>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Alamat</th>
                        <th>No Telp</th>
                        <th>Level</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map( (user) => {
                            return (
                                <tr key={user.id}>
                                    <td>{user.user_username}</td>
                                    <td>{user.user_name}</td>
                                    <td>{user.user_email}</td>
                                    <td>{user.user_alamat}</td>
                                    <td>{user.user_notelp}</td>
                                    <td>{user.user_level}</td>
                                    <td>
                                        <Link to={`/admin_setting/modal_update/${user.id}`}>
                                            <button className='edit'><MdEditNote/></button>
                                        </Link>
                                        <button onClick={() => deleteUser(user.id)} className='delete'><MdDeleteForever/></button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )

}

export default Admin;