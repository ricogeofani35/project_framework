import './index.scss';
import Table from './pages/pages_product/Table';
import Dashboard from './pages/pages_dashboard';
import Category from './pages/pages_category';
import AdminSetting from './pages/pages_admin';
import ReportOrder from './pages/pages_report_order';
import Login from '../../MainPages/Login_pages';

// product
import ModalCreateProduct from './pages/pages_product/modal_create';
import ModalUpdateProduct from './pages/pages_product/modal_update';

// category
import ModalCreateCategory from './pages/pages_category/modal_create';
import ModalUpdateCategory from './pages/pages_category/modal_update';

// admin
import ModalCreateAdmin from './pages/pages_admin/modal_create';
import ModalUpdateAdmin from './pages/pages_admin/modal_update';

import { Routes, Route } from "react-router-dom";
import axios from 'axios';
import { API_URL } from '../../../utils/apiUrl';
import { useEffect, useState } from 'react';


const Content = ({products, getProducts}) => {

    const [categorys, setCategorys] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getDateCategory();
        getDateUser();
    }, []);

     // admin
     const getDateUser = async () => {
        await axios.get(API_URL + 'user')
        .then((json) => {
            const data = json.data.data.data;
            setUsers(data);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    // category
    const getDateCategory = async () => {
        await axios.get(API_URL + 'category')
        .then((json) => {
            const data = json.data.data.data;
            setCategorys(data);
        })
        .catch((error) => {
            console.log(error);
        })
    }


    return (
        <div className='content'>
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/product' element={<Table products={products} getProducts={getProducts} />} />
                    <Route path='/category' element={<Category categorys={categorys} getDateCategory={getDateCategory} />} />
                    <Route path='/admin_setting' element={<AdminSetting users={users} getDateUser={getDateUser} />} />
                    <Route path='/report_order' element={<ReportOrder />} />

                    {/* product */}
                    <Route path="/product/modal_create"  element={<ModalCreateProduct products={products} getProducts={getProducts} categorys={categorys} />} />
                    <Route path="/product/modal_update/:id"  element={<ModalUpdateProduct products={products} getProducts={getProducts} categorys={categorys} />} />

                    {/* category */}
                    <Route path="/category/modal_create"  element={<ModalCreateCategory getDateCategory={getDateCategory}  categorys={categorys} />} />
                    <Route path="/category/modal_update/:id"  element={<ModalUpdateCategory  getDateCategory={getDateCategory}  categorys={categorys} />} />

                    {/*  */}
                    <Route path="/admin_setting/modal_create"  element={<ModalCreateAdmin users={users} getDateUser={getDateUser} />} />
                    <Route path="/admin_setting/modal_update/:id"  element={<ModalUpdateAdmin users={users} getDateUser={getDateUser} />} />
                </Routes>
        </div>
    )
}

export default Content;