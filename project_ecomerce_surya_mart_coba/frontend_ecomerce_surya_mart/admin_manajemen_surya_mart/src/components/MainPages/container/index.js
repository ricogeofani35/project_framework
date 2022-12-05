import Header from "../header";
import Sidebar from "../sidebar";
import Content from "../content";
import './index.scss';

import { useEffect, useState } from "react";
import axios from "axios";
import {API_URL} from '../../../utils/apiUrl';

const Container = () => {

    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        // api url backend
        await axios.get(API_URL + 'product')
        .then((json) => {
            let data =  json.data.data.data;
            setProducts(data);
        })
        .catch((err) => {
            if (err.name === "AbortError") {
                console.log("fetch aborted.");
            }
        })
    }
    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div className='container'>
            <Header />
            <div className='container-bottom'>
                <Sidebar />
                <Content  products={products} getProducts={getProducts} />
            </div>
        </div>
    )
}

export default Container;