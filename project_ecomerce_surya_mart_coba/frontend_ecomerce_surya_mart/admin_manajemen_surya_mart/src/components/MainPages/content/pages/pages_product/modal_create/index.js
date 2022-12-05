
import { useEffect, useState } from 'react';
// import axios untuk fetching data api
import axios from "axios";
import './index.scss';
import {MdClose} from 'react-icons/md';
import { Link } from 'react-router-dom';
import { API_URL } from '../../../../../../utils/apiUrl';

const ModalCreate = ({products, getProducts, categorys}) => {

    // define state
    const [product_kode, setProduct_kode] = useState('');
    const [product_name, setProduct_name] = useState('');
    const [product_price, setProduct_price] = useState(0);
    const [product_stock, setProduct_stock] = useState(0);
    const [product_desc, setProduct_desc] = useState('');
    const [category_id, setCategory_id] = useState(0);

    // handle image
    const [product_image, setProduct_image] = useState([]);
    const [previewImage, setPreviewImage] = useState('');

    const [validation, setValidation] = useState([]);

    const handlePreviewImage = (e) => {
        // preview image
        const toPreview = URL.createObjectURL(e.target.files[0]);
        setPreviewImage(toPreview);
        setProduct_image(e.target.files[0]);
    }

    const handleFormCreateData = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('product_kode', product_kode);
        formData.append('product_image', product_image);
        formData.append('product_name', product_name);
        formData.append('product_price', product_price);
        formData.append('product_stock', product_stock);
        formData.append('product_desc', product_desc);
        formData.append('category_id', category_id);

        await axios.post(API_URL + 'product', formData)
        .then(() => {
            setProduct_kode('');
            setProduct_image('');
            setProduct_name('');
            setProduct_price(0);
            setProduct_stock(0);
            setProduct_desc('');
            setCategory_id(0);
            setValidation([]);

            alert('Create data product successfully');
            getProducts();
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
                <Link to='/product'>
                    <div className="close" ><MdClose /></div>
                </Link>
                <h2>Add Data Products</h2>
                <div className='modal-form'>
                    <form action='#' onSubmit={handleFormCreateData}>
                        <div className='form-wrapper'>
                            <div className='row-1'>
                                <div className='row'>
                                    <label>Kode</label>
                                    <input type='text' className='kode' value={product_kode} onChange={(e) => setProduct_kode(e.target.value)} />
                                    {
                                        validation.product_kode && (
                                            <div className='error'>
                                                {validation.product_kode[0]}
                                            </div>
                                        )
                                    }
                                </div>
                                <div className='row'>
                                    <label>Image</label>
                                    <div className='image'>
                                        <img width={100} src={previewImage} alt='' />
                                        <input type='file' className='image' onChange={handlePreviewImage} />
                                    </div>
                                    {
                                        validation.product_image && (
                                            <div className='error'>
                                                {validation.product_image[0]}
                                            </div>
                                        )
                                    }
                                </div>
                                <div className='row'>
                                    <label>Name</label>
                                    <input type='text' className="product_name" value={product_name} onChange={(e) => setProduct_name(e.target.value)} />
                                    {
                                        validation.product_name && (
                                            <div className='error'>
                                                {validation.product_name[0]}
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                            <div className='row-2'>
                                <div className='row'>
                                        <label>Price</label>
                                        <input type='number' className="price" value={product_price} onChange={(e) => setProduct_price(e.target.value)} />
                                        {
                                            validation.product_price && (
                                                <div className='error'>
                                                    {validation.product_price[0]}
                                                </div>
                                            )
                                        }
                                </div>
                                <div className='row'>
                                    <label>Stock</label>
                                    <input type='number' className="stock" value={product_stock} onChange={(e) => setProduct_stock(e.target.value)} />
                                    {
                                        validation.product_stock && (
                                            <div className='error'>
                                                {validation.product_stock[0]}
                                            </div>
                                        )
                                    }
                                </div>
                                <div className='row'>
                                    <label>Description</label>
                                    <input type='text' className="description" value={product_desc} onChange={(e) => setProduct_desc(e.target.value)} />
                                    {
                                        validation.product_desc && (
                                            <div className='error'>
                                                {validation.product_desc[0]}
                                            </div>
                                        )
                                    }
                                </div>
                                <div className='row'>
                                    <label>Category</label>
                                    <select className='category' onChange={(e) => setCategory_id(e.target.value)}>
                                        <option>Pilih Category...</option>
                                        {
                                            categorys.map((category) => {
                                                return (
                                                    <option key={category.id} value={category.id} >{category.category_name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    {
                                        validation.category_id && (
                                            <div className='error'>
                                                {validation.category_id[0]}
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <button type='submit' className='add-data'>Add Data Product</button>
                    </form>
                </div>
            </div>
            <div className='data-table-product'>
                <h2 className='text-header'>Date Products</h2>
                <table border={1}>
                    <thead>
                        <tr>
                            <th>Kode</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Description</th>
                            <th>Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map( (product) => (
                                (product.category_id === null) ?
                                <tr key={product.id}>
                                    <td>{product.product_kode}</td>
                                    <td>{product.product_name}</td>
                                    <td>Rp.{product.product_price}</td>
                                    <td>{product.product_stock}</td>
                                    <td>{product.product_desc}</td>
                                    <td>Not Category</td>
                                </tr> :
                                <tr key={product.id}>
                                    <td>{product.product_kode}</td>
                                    <td>{product.product_name}</td>
                                    <td>Rp.{product.product_price}</td>
                                    <td>{product.product_stock}</td>
                                    <td>{product.product_desc}</td>
                                    <td>{product.category.category_name}</td>
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