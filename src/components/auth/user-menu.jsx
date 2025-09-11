import { getAuth } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

export const UserMenu = ({ userData }) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        const auth = getAuth();
        await auth.signOut();
        navigate('/');
    }
    return (
        <li className='relative'>
            <button
                className='font-semibold flex items-center focus:outline-none'
                onClick={() => setOpen(!open)}
            >
                Hello,&nbsp;
                <span className='text-blue-400'>{userData.firstName} {userData.lastName}</span>
                <svg className={`ml-1 w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {open && (
                <ul className='absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg z-10'>
                    <li>
                        <Link to="/profile" className='block px-4 py-2 hover:bg-gray-100' onClick={() => setOpen(false)}>
                            Profile
                        </Link>
                    </li>
                    <li>
                        <button
                            onClick={() => { handleLogout(); setOpen(false); }}
                            className='block w-full text-left px-4 py-2 hover:bg-gray-100'
                        >
                            Logout
                        </button>
                    </li>
                </ul>
            )}
        </li>
    )
}