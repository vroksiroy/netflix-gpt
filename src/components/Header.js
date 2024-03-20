import React, { useEffect } from 'react'
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO, USER_AVATAR } from '../utils/constants';

const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state => state.user)
    const handleSignOut = () => {

        signOut(auth).then(() => {}).catch((error) => { navigate('/error') });
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
              const {uid, email, displayName} = user;
              dispatch(addUser({uid, email, displayName}))
              navigate('/browse')
            } else {
              dispatch(removeUser())
              navigate('/')
            }
          });

          return () => unsubscribe()
    },[])

    return (
        <div className='absolute z-10 w-screen px-8 py-2 bg-gradient-to-b from-black flex justify-between'>
            <img className='w-44' src={LOGO} alt="logo" />
            {!user && <div className='flex gap-4 items-center cursor-pointer'>
                <img className='w-10 h-10 rounded-sm' alt='userIcon' src={USER_AVATAR} />
                <button onClick={handleSignOut} className='font-bold text-white'>Sign Out</button>
            </div>}
        </div>
    )
}

export default Header
