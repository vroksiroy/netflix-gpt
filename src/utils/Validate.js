const checkValidData = (isSignIn, email, password, fullname) => {
    const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email)
    const isPasswordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)

    console.log("isEmailValid::", isEmailValid)
    if (!isSignIn) {
        if (fullname === '') return "Full Name is not valid"
    }

    if (!isEmailValid) return "Email ID is not valid"
    if (!isPasswordValid) return "Password is not valid"

    return null
};

export {
    checkValidData
}