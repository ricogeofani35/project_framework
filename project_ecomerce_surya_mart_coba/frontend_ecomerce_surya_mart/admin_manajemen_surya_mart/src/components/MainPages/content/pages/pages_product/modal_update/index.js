
import { useEffect, useState } from 'react';
// import axios untuk fetching data api
import axios from "axios";
import './index.scss';
import {MdClose} from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { API_URL } from '../../../../../../utils/apiUrl';

const ModalUpdate = ({products, getProducts, categorys}) => {

    // define state
    const [product_kode, setProduct_kode] = useState('');
    const [product_image, setProduct_image] = useState([]);
    const [product_name, setProduct_name] = useState('');
    const [product_price, setProduct_price] = useState(0);
    const [product_stock, setProduct_stock] = useState(0);
    const [product_desc, setProduct_desc] = useState('');
    const [category_id, setCategory_id] = useState(0);

    // handle image
    const [updateImage, setUpdateImage] = useState(false);
    const [previewImage, setPreviewImage] = useState('');

    const [validation, setValidation] = useState([]);

    // get id form parameter url
    const {id} = useParams();

    useEffect(() => {
        getProductById();
    }, []);

    const getProductById = async () => {
        // display modal box
        const modalBox = document.querySelector('.modal-box');
        setTimeout(() => {
            modalBox.classList.add('toggle');
        }, 500);

        // api url backend //detail data 
        await axios.get(API_URL + 'product/' + id)
        .then((json) => {
            const data =  json.data.data;
            setProduct_kode(data.product_kode);
            setProduct_image(data.product_image);
            setProduct_name(data.product_name);
            setProduct_price(data.product_price);
            setProduct_stock(data.product_stock);
            setProduct_desc(data.product_desc);
            setCategory_id(data.category_id);
        })
        .catch((err) => {
            if (err.name === "AbortError") {
                console.log("fetch aborted.");
            }
        })
    }

    const handlePreviewImage = (e) => {
         // preview image
         const toPreview = URL.createObjectURL(e.target.files[0]);
         setPreviewImage(toPreview);
         setProduct_image(e.target.files[0]);
        setUpdateImage(true);
    }

    const handleFormUpdateData = async (e) => {
        e.preventDefault();

        
        const formData = new FormData();

        formData.append('product_kode', product_kode);
        formData.append('product_image', product_image);
        formData.append('product_name', product_name);
        formData.append('product_price', product_price);
        formData.append('product_stock', product_stock);
        formData.append('product_desc', product_desc);
        formData.append('category_id', category_id);
        formData.append('_method', 'PUT');

        await axios.post(API_URL + 'product/' + id, formData)
        .then(() => {
            alert('Update data product successfully');
            getProducts();
        })
        .catch((error) => {
            console.log();
            setValidation(error.response.data);
            alert('failed to request:',error.response.data);
        });
    }

    return (
        <div className="modal">
            <div className='modal-box'>
                <Link to='/product'>
                    <div className="close" ><MdClose /></div>
                </Link>
                <h2>Update Data Products</h2>
                <div className='modal-form'>
                    <form action='#' onSubmit={handleFormUpdateData}>
                        <div className='form-wrapper'>
                            <div className='row-1'>
                                <div className='row'>
                                    <label>Kode</label>
                                    <input type='text' className='kode' value={product_kode} style={{ backgroundColor: '#ccc' }} readOnly />
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
                                        {
                                            updateImage == false ?
                                                <img src={`http://localhost:8000/products/${product_image}`} width={100}/>
                                                : <img src={previewImage} width={100}/>
                                        }
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
                        <button type='submit' className='add-data'>Update Data Product</button>
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

export default ModalUpdate;