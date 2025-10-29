import { Link, Outlet } from 'react-router'; 
import { createContext, useEffect, useState } from 'react';
import { UserMenu } from '../auth/user-menu';
import { auth, db } from '../../libs/firebase';
import { doc, getDoc } from 'firebase/firestore';
export const UserContext = createContext(null);
export default function AppLayout() {
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        const getUser = async () => {
            const user = auth.currentUser;
            if (user) {
                const response = await getDoc(doc(db, 'users', user.uid));
                if (response.exists()) {
                    console.log(response.data());
                    setUserData(response.data());
                }else{
                    setUserData(null);
                }
            }
        }
        getUser();
    }, []);
 
    return (
        <UserContext.Provider value={userData}>
            <div className='w-full min-h-screen flex flex-col'>
                <header>
                    <nav className='w-full h-16 bg-gray-800 text-white flex items-center justify-between px-4'>
                        <div className='text-lg font-bold'>MyApp</div>
                        <ul className='flex space-x-4'>
                            <li><Link to="/" className='hover:underline'>Home</Link></li>
                            <li><Link to="/admin" className='hover:underline'>Admin</Link></li>
                            {userData ?
                                <UserMenu userData={userData} />
                                :
                                <>
                                    <li><Link to="/login" className='hover:underline'>Login</Link></li>
                                    <li><Link to="/register" className='hover:underline'>Register</Link></li>
                                </>
                            }

                        </ul>
                    </nav>
                </header>
                <main className='flex-grow p-4 bg-gray-100'>
                    <Outlet />
                </main>
                <footer className='w-full h-12 bg-gray-800 text-white flex items-center justify-center'>
                    &copy; 2024 MyApp. All rights reserved.
                </footer>
            </div>
        </UserContext.Provider>
    )
}

