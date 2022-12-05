import axios from 'axios';
import {MdEditNote,
    MdDeleteForever
} from 'react-icons/md';
import { Link } from 'react-router-dom';
import './table.scss';

import { API_URL } from '../../../../../utils/apiUrl';

const Table = ({products, getProducts}) => {
   
    const deleteProduct = async (id) => {
        const choice =  window.confirm('Are You Sure???');
        choice === true && (
            await axios.delete(API_URL + 'product/' + id)
            .then(() => {
                getProducts();
            })
            .catch(error => {
                alert('delete product error:', error);
            })
        )
    }

    return (
        <div className='table'>
            <h2 className='text-header'>Date Products</h2>
            <Link to='/product/modal_create'>
                <button className='add'>Add Date</button>
            </Link>
            <table border={1}>
                <thead>
                    <tr>
                        <th>Kode</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map( (product) => {
                            if(product.category_id === null) {
                                return (
                                    <tr key={product.id}>
                                    <td>{product.product_kode}</td>
                                    <td>{product.product_name}</td>
                                    <td>Rp.{product.product_price.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1\.")}</td>
                                    <td>{product.product_stock}</td>
                                    <td>{product.product_desc}</td>
                                    <td>Not Kategory</td>
                                    <td>
                                        <Link to={`/product/modal_update/${product.id}`}>
                                            <button className='edit'><MdEditNote/></button>
                                        </Link>
                                        <button onClick={() => deleteProduct(product.id)} className='delete'><MdDeleteForever/></button>
                                    </td>
                                </tr>
                                )
                            } else {
                                return (
                                    <tr key={product.id}>
                                        <td>{product.product_kode}</td>
                                        <td>{product.product_name}</td>
                                        <td>Rp.{product.product_price.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1\.")}</td>
                                        <td>{product.product_stock}</td>
                                        <td>{product.product_desc}</td>
                                        <td>{product.category.category_name}</td>
                                        <td>
                                            <Link to={`/product/modal_update/${product.id}`}>
                                                <button className='edit'><MdEditNote/></button>
                                            </Link>
                                            <button onClick={() => deleteProduct(product.id)} className='delete'><MdDeleteForever/></button>
                                        </td>
                                    </tr>
                                )
                            }
                        })
                    }
                </tbody>
            </table>
        </div>
    )

}

export default Table;