import './index.scss';
import { MdNotificationImportant
} from 'react-icons/md';

const Header = () => {
    return (
        <div className='header'>
           <h2 className='brand'>
            Admin Manajemen Surya<span>Mart</span>
           </h2>
           <div className='header-logo'>
                <MdNotificationImportant />
           </div>
        </div>
    )
}

export default Header;