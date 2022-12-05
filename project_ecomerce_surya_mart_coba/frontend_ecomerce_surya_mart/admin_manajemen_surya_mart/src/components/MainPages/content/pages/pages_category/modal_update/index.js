
import { useEffect, useState } from 'react';
// import axios untuk fetching data api
import axios from "axios";
import './index.scss';
import {MdClose} from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { API_URL } from '../../../../../../utils/apiUrl';

const ModalUpdate = ({categorys, getDateCategory}) => {

    // define state
    const [category_name, setCategory_name] = useState('');
    const [validation, setValidation] = useState([]);

    const {id} = useParams();

    useEffect(() => {
        getCategoryById();
    }, []);

    const getCategoryById = async () => {

        // display modal box
        const modalBox = document.querySelector('.modal-box');
        setTimeout(() => {
            modalBox.classList.add('toggle');
        }, 500);

        axios.get(API_URL + 'category/' + id)
        .then((json) => {
            const data = json.data.data;

            setCategory_name(data.category_name);
        })
        .catch(err => {
            if (err.name === "AbortError") {
                console.log("fetch aborted.");
            }
        });
    }

    const handleFormCreateData = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('category_name', category_name);
        formData.append('_method', 'PUT');

        await axios.post(API_URL + 'category/' + id, formData)
        .then(() => {
            alert('Update data category successfully');
            getDateCategory();
        })
        .catch((error) => {
            setValidation(error.response.data);
            alert('failed to request:',error.response.data);
        });
    }

    return (
        <div className="modal">
            <div className='modal-box'>
                <Link to='/category'>
                    <div className="close" ><MdClose /></div>
                </Link>
                <h2>Update Data Category</h2>
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
                        <button type='submit' className='add-data'>Update Data Category</button>
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

export default ModalUpdate;