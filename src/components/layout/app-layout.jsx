import { Link, Outlet } from 'react-router';
import { getFirestore, getDoc, doc } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { createContext, useEffect, useState } from 'react';
import { UserMenu } from '../auth/user-menu';
export const UserContext = createContext(null);
export default function AppLayout() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const db = getFirestore();
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                if (userDoc.exists()) {
                    setUserData(userDoc.data());
                } else {
                    setUserData(null);
                }
            } else {
                setUserData(null);
            }
        });
        return () => unsubscribe();
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


    useEffect(() => {
        const fetchData = async () => {   
            const user = auth.currentUser;
            if (user) {
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                if (userDoc.exists()) {
                   setUserData(userDoc.data());
                }
            } else {
                setUserData(null);
            }
        }
        fetchData()
    }, []) 