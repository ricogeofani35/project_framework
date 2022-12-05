
import { useEffect, useState } from 'react';
// import axios untuk fetching data api
import axios from "axios";
import './index.scss';
import {MdClose} from 'react-icons/md';
import { Link } from 'react-router-dom';
import { API_URL } from '../../../../../../utils/apiUrl';
const ModalCreate = ({users, getDateUser}) => {

    // define state
    const [user_username, setUser_username] = useState('');
    const [user_password, setUser_password] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [user_name, setUser_name] = useState('');
    const [user_email, setUser_email] = useState('');
    const [user_alamat, setUser_alamat] = useState('');
    const [user_notelp, setUser_notelp] = useState(0);
    const [user_level, setUser_level] = useState('');

    const [validation, setValidation] = useState([]);

    const handleFormCreateData = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('user_username', user_username);
        formData.append('password', user_password);
        formData.append('password_confirmation', passwordConfirmation);
        formData.append('user_name', user_name);
        formData.append('user_email',user_email);
        formData.append('user_alamat', user_alamat);
        formData.append('user_notelp', user_notelp);
        formData.append('user_level', user_level);

        await axios.post(API_URL + 'user', formData)
        .then(() => {
            setUser_username('');
            setUser_password('');
            setPasswordConfirmation('');
            setUser_name('');
            setUser_email('');
            setUser_alamat('');
            setUser_notelp('');
            setUser_level('');
            setValidation([]);

            alert('Create data User successfully');

            getDateUser();
            
        })
        .catch((error) => {
            setValidation(error.response.data);
            alert('failed to request:',error.response.data);
        });
    }

    const displayModal = () => {
        const modalBox = document.querySelector('.modal-box');
        setTimeout(() => {
            modalBox.classList.add('toggle');
        }, 500);
    }

    useEffect(() => {
        displayModal();
    }, []);

    return (
        <div className="modal">
            <div className='modal-box'>
                <Link to='/admin_setting'>
                    <div className="close" ><MdClose /></div>
                </Link>
                <h2>Register Data Admin</h2>
                <div className='modal-form'>
                    <form action='#' onSubmit={handleFormCreateData}>
                        <div className='form-wrapper'>
                            <div className='row-1'>
                                <div className='row'>
                                    <label>Username</label>
                                    <input type='text' className='username' value={user_username} onChange={(e) => setUser_username(e.target.value)} />
                                    {
                                        validation.user_username && (
                                            <div className='error'>
                                                {validation.user_username[0]}
                                            </div>
                                        )
                                    }
                                </div>
                                <div className='row'>
                                    <label>password</label>
                                    <input type='password' className='password' value={user_password} onChange={(e) => setUser_password(e.target.value)} />
                                    {
                                        validation.password && (
                                            <div className='error'>
                                                {validation.password[0]}
                                            </div>
                                        )
                                    }
                                </div>
                                <div className='row'>
                                    <label>Password Confirmation</label>
                                    <input type='password' className='password_confirmation' value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
                                </div>
                                <div className='row'>
                                    <label>Name</label>
                                    <input type='text' className='name' value={user_name} onChange={(e) => setUser_name(e.target.value)} />
                                    {
                                        validation.user_name && (
                                            <div className='error'>
                                                {validation.user_name[0]}
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                            <div className='row-2'>
                                <div className='row'>
                                    <label>Email</label>
                                    <input type='email' className='email' value={user_email} onChange={(e) => setUser_email(e.target.value)} />
                                    {
                                        validation.user_email && (
                                            <div className='error'>
                                                {validation.user_email[0]}
                                            </div>
                                        )
                                    }
                                </div>
                                <div className='row'>
                                    <label>Alamat</label>
                                    <input type='text' className='alamat' value={user_alamat} onChange={(e) => setUser_alamat(e.target.value)} />
                                    {
                                        validation.user_alamat && (
                                            <div className='error'>
                                                {validation.user_alamat[0]}
                                            </div>
                                        )
                                    }
                                </div>
                                <div className='row'>
                                    <label>No Telpon</label>
                                    <input type='number' className='notelp' value={user_notelp} onChange={(e) => setUser_notelp(e.target.value)} />
                                    {
                                        validation.user_notelp && (
                                            <div className='error'>
                                                {validation.user_notelp[0]}
                                            </div>
                                        )
                                    }
                                </div>
                                <div className='row'>
                                    <label>Level</label>
                                    <select className='level' value={user_level} onChange={(e) => setUser_level(e.target.value)}>
                                        <option>pilih level....</option>
                                        <option>SA</option>
                                        <option>Admin</option>
                                    </select>
                                    {
                                        validation.user_level && (
                                            <div className='error'>
                                                {validation.user_level[0]}
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <button type='submit' className='add-data'>Register Data user</button>
                    </form>
                </div>
            </div>
            <div className='data-table-admin'>
                <h2 className='text-header'>Date user</h2>
                <table border={1}>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Username</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>alamat</th>
                            <th>No Telp</th>
                            <th>Level</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map( (user, index) => (
                                <tr key={user.id}>
                                    <td>{index + 1}</td>
                                    <td>{user.user_username}</td>
                                    <td>{user.user_name}</td>
                                    <td>{user.user_email}</td>
                                    <td>{user.user_alamat}</td>
                                    <td>{user.user_notelp}</td>
                                    <td>{user.user_level}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ModalCreate;