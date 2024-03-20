import React from 'react'
import Header from './Header'
import { checkValidData } from '../utils/Validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BG_IMG, USER_AVATAR } from '../utils/constants';

const Login = () => {
    const dispatch = useDispatch()

    const [isSignInForm, setIsSignInForm] = React.useState(true)
    const email = React.useRef(null);
    const password = React.useRef(null);
    const fullname = React.useRef(null);
    const [errorMessage, setErrorMessage] = React.useState(null)

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm)
    }

    const handleButtonClick = () => {
        // validate the form data
        const message = checkValidData(isSignInForm ? true : false, email.current.value, password.current.value, fullname?.current?.value)
        setErrorMessage(message)

        if (message) return

        if (!isSignInForm) {
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: fullname.current.value, photoURL: USER_AVATAR
                      }).then(() => {
                        const {uid, email, displayName, photoURL} = auth.currentUser;
                        dispatch(addUser({uid, email, displayName, photoURL}))
                      }).catch((error) => {
                        setErrorMessage(error.message)
                      });
                    console.log(user)
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage)
                });

        } else {
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log(user)
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage)
                });
        }
    }

    return (
        <div>
            <Header />
            <div className='absolute'>
                <img src={BG_IMG} alt="bgimg" />
            </div>
            <form onSubmit={(e) => e.preventDefault()} className='absolute p-12 bg-black w-96 my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>
                <h1 className='font-bold text-3xl py-4'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
                {!isSignInForm && <input ref={fullname} type="text" placeholder='Full Name' className='p-4 my-4 w-full bg-gray-700' />}
                <input ref={email} type="text" placeholder='Email Address' className='p-4 my-4 w-full bg-gray-700' />
                <input ref={password} type="password" placeholder='Password' className='p-4 my-4 w-full bg-gray-700' />
                <p className='text-red-500 font-bold text-lg py-2'>{errorMessage}</p>
                <button className='p-4 my-6 bg-red-700 w-full rounded-lg' onClick={handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>
                <p className='py-4 cursor-pointer text-center' onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix ? Sign Up Now!" : "Already have an account ? Sign In!"}</p>
            </form>
        </div>
    )
}

export default Login
