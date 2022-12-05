import axios from 'axios';
import {MdEditNote,
    MdDeleteForever
} from 'react-icons/md';
import { Link } from 'react-router-dom';
import './index.scss';

import {API_URL} from '../../../../../utils/apiUrl';

const Category = ({categorys, getDateCategory}) => {
   
    const deleteCategory = async (id) => {
        const choice =  window.confirm('Are You Sure???');
        choice === true && (
            await axios.delete(API_URL + 'category/' + id)
            .then(() => {
                getDateCategory();
            })
            .catch(error => {
                alert('delete product error:', error);
            })
        )
    }

    return (
        <div className='table'>
            <h2 className='text-header'>Date Category</h2>
    
            <Link to='/category/modal_create'>
                <button className='add'>Add Date</button>
            </Link>

            <table border={1}>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Category Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        categorys.map( (category, index) => {
                            return (
                                <tr key={category.id}>
                                    <td>{index + 1}</td>
                                    <td>{category.category_name}</td>
                                    <td>
                                        <Link to={`/category/modal_update/${category.id}`}>
                                            <button className='edit'><MdEditNote/></button>
                                        </Link>
                                        <button onClick={() => deleteCategory(category.id)} className='delete'><MdDeleteForever/></button>
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

export default Category;