
import { useEffect, useState } from 'react';
// import axios untuk fetching data api
import axios from "axios";
import './index.scss';
import {MdClose} from 'react-icons/md';
import { Link } from 'react-router-dom';
import { API_URL } from '../../../../../../utils/apiUrl';

const ModalCreate = ({categorys, getDateCategory}) => {

    // define state
    const [category_name, setCategory_name] = useState('');

    const [validation, setValidation] = useState([]);

    const handleFormCreateData = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('category_name', category_name);

        await axios.post(API_URL + 'category', formData)
        .then(() => {
            setCategory_name('');
            setValidation([]);

            alert('Create data product successfully');
            getDateCategory();
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
                <Link to='/category'>
                    <div className="close" ><MdClose /></div>
                </Link>
                <h2>Add Data Category</h2>
                <div className='modal-form'>
                    <form action='#' onSubmit={handleFormCreateData}>
                        <div className='form-wrapper'>
                            <div className='row-1'>
                                <div className='row'>
                                    <label>Category Name</label>
                                    <input type='text' className='kode' value={category_name} onChange={(e) => setCategory_name(e.target.value)} />
                                    {
                                        validation.category_name && (
                                            <div className='error'>
                                                {validation.category_name[0]}
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <button type='submit' className='add-data'>Add Data Category</button>
                    </form>
                </div>
            </div>
            <div className='data-table-product'>
                <h2 className='text-header'>Date Category</h2>
                <table border={1}>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Category Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            categorys.map( (category, index) => (
                                <tr key={category.id}>
                                    <td>{index + 1}</td>
                                    <td>{category.category_name}</td>
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