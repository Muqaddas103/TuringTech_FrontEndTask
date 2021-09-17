
const AuthHandler = () => {

    const setUserSession = (token, userid) => {
        localStorage.setItem("token", token );
        localStorage.setItem("userid", userid);
    }
    const removeUserSession = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userid");
    }
    const getToken=()=>{
        return localStorage.getItem('token');
    }
    const getId=()=>{
        return localStorage.getItem('userId');
    }
    return { getToken, getId, setUserSession, removeUserSession }
}

export default AuthHandler;

