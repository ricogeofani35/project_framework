import './index.scss';
import {MdAccountCircle,
        MdShoppingBag, 
        MdAssignment,
        MdHome,
        MdOutlineSettings,
        MdOutlineCategory
} from 'react-icons/md';

import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
            <div className='sidebar'>
                <div className="menu">
                    <div className='admin'>
                        <div className='logo'>
                            <MdAccountCircle />
                        </div>
                        <p>Rico Geofani | Admin</p>
                    </div>
                    <p>Navigasi Menu</p>
                 
                    <ul className="list-menu">
                        <li>
                            <Link to='/dashboard'>
                                <MdHome />Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link to='/product'>
                                <MdShoppingBag />Date Products
                            </Link>
                        </li>
                        <li>
                            <Link to='/category'>
                                <MdOutlineCategory />Date Categorys
                            </Link>
                        </li>
                        <li>
                            <Link to='/report_order'>
                                <MdAssignment /> Report Orders
                            </Link>
                        </li>
                        <li>
                            <Link to='/admin_setting'>
                                <MdOutlineSettings/>Admin Setting
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
    )
}

export default Sidebar;