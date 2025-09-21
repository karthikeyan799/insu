import axios from 'axios';
import React, { createContext, useEffect, useRef, useState } from 'react'

export const AuthContext = createContext();

export default function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    // const username=useRef(null);
    // useEffect(() => {
    //     const storedUser = localStorage.getItem("user");
    //     if (storedUser) setUser(JSON.parse(storedUser));
    // }, []);
    // const [isLoggedIn,setIsLoggedIn] = useState(false);
    // const login = (username,password) => {
    //     if (username === "karthi" && password === "1234") {
    //         const loggedUser = { username };
    //         setUser(loggedUser);
    //         setIsLoggedIn(true);
    //         localStorage.setItem("user", JSON.stringify(loggedUser));
    //         return true;
    //     }
    //     return false;
    // };
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [log, setLog] = useState({
        userName:'',
        password:''
    }
    )
    const login = async () => {
        // const {username,password}=
        try {
            const result = await axios.get(`htt://localhost:8080/loginUser`,log);
            const datas = result.data.message;
            const users = result.data.message === "Email not exits";
            const pass = result.data.message === "Login Success";


            console.log(result.data);

            if (datas === "Email not exits") {
                // setfetch({
                //     eMailError: "Invalid UserName",
                //     passwordError: "Invalid Password "
                // });
                alert("email not match");
                console.log('try blocklog')
            } else if (datas === "password Not Match") {
                // setfetch({
                //     eMailError: " ",
                //     passwordError: "Invalid Password "
                // });
                alert("password not match");
            }

            else if (datas === "Login Success") {

                // setfetch({ loggedIn: true });
                setIsLoggedIn(true);
                setUser(loggedUser);
                const loggedUser = { username };
                // props.onLogin(true);
                alert("login succesfull");
                console.log("login succesfull");
                // props.onLogin(fetch);
                // navigate('/dashboard/' + userName);

            }
        } catch (e) {

        }
    }
    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);

        localStorage.removeItem("user");
    }

    return (
        // <div>AuthContext</div>
        <AuthContext.Provider value={{ user, login, logout,log,setLog, isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    )
}
