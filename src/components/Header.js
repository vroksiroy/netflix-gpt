import React, { useEffect } from 'react'
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO, SUPPORTED_LANGUAGES, USER_AVATAR } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state => state.user)
    const showGptSearch = useSelector(state => state.gpt.showGptSearch)
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

    const handleGptSearchClick = () => {
        dispatch(toggleGptSearchView())
    }

    const handleLanguageChange  = (e) => {
        const lang = e.target.value
        dispatch(changeLanguage(lang))
    }

    return (
        <div className='absolute z-10 w-screen px-8 py-2 bg-gradient-to-b from-black flex justify-between'>
            <img className='w-44' src={LOGO} alt="logo" />
            {user && 
            <div className='flex gap-4 items-center cursor-pointer'>
                {showGptSearch && <select className='p-2 m-2 bg-gray-900 text-white outline-none' value={user.lang} onChange={handleLanguageChange}>
                    {SUPPORTED_LANGUAGES.map(lang => <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)}
                </select>}
                <button onClick={handleGptSearchClick} className='py-2 px-4 mx-2 bg-blue-800 text-white rounded-sm'>{showGptSearch ? "Homepage": "GPT Search"}</button>
                <img className='w-10 h-10 rounded-sm' alt='userIcon' src={USER_AVATAR} />
                <button onClick={handleSignOut} className='font-bold text-white'>Sign Out</button>
            </div>}
        </div>
    )
}

export default Header
