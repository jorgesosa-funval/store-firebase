import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router";
import { auth } from "../../libs/firebase";

export const UserMenu = ({ userData }) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };

        const handleKeyDown = (e) => {
            if (e.key === "Escape") setOpen(false);
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const handleLogout = async () => {
        await auth.signOut()
        navigate('/');
    }
    
    return (
        <li className='relative' ref={menuRef}>
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