import React from "react";
import { 
    MdMic,
    MdHome,
    MdForum,
    MdPhone,
    MdDevicesOther,
    MdGroup,
    MdDriveFolderUpload,
    MdSettings 
} from "react-icons/md";
import { BsCalendarRange} from 'react-icons/bs';

const Sidebar = () => {
    return (
        <nav className="px-5 bg-white border-r border-r-gray-300 w-20 h-screen  ">
            <div className="bg-indigo-500 w-10 h-10 rounded-2xl flex justify-center items-end mt-4 pt-6">
                <MdMic size={35} color='white' />
            </div>
            <ul className="flex flex-col justify-center items-center mt-10">
                <li className="py-6"><MdHome size={25} /></li>
                <li className="py-6 relative">
                    <span className="w-2 h-2 rounded-full bg-green-500 block absolute -right-2 top-4"></span>
                    < MdForum size={25} />
                </li>
                <li className="py-6 relative">
                    <span className="w-2 h-2 rounded-full bg-green-500 block absolute -right-2 top-4"></span>
                    <MdPhone size={25} />
                </li>
                <li className="py-6"><MdDevicesOther size={25} /></li>
                <li className="py-6"><MdGroup size={25} /></li>
                <li className="py-6"><MdDriveFolderUpload size={25} /></li>
                <li className="py-6 relative">
                    <span className="w-2 h-2 rounded-full bg-green-500 block absolute -right-2 top-4"></span>
                    <BsCalendarRange size={25} />
                </li>
                <li className="py-6"><MdSettings size={25} /></li>
            </ul>
        </nav>
    )
}

export default Sidebar;