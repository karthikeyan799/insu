import React, { useContext, useState } from 'react'
// import './Body/Login.css'
import '../Body/Login.css'
import { AuthContext } from './AuthProvider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
    // const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");
    const { login, isLoggedIn, log, setLog, setIsLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const [users, setUsers] = useState({
        userName: "",
        password: ""
    })
    const handleChange = (e) => {
        setUsers({ ...users, [e.target.name]: e.target.value });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const success = login(users);
        // const success = login(log);
        if (success) {
            navigate("/");
            setIsLoggedIn(true);
        }
        else alert("Invalid crenditial");
    };
    const userLogin = async () => {
        try {
            const res = await axios.post('http://localhost:8080/loginUser', users)
            // alert("login successfull")
            if (res.data.message === "Login Success") {
                navigate("/dashboard");
                setIsLoggedIn(true);
                // setUsers(res.data.message);
                console.log(res.data);
            }else if(res.data.message==="Email not exits"){
                alert("email not exits");
            }
            else if(res.data.message==="password not match"){
                alert("password not match")
            }
        } catch (e) {
            console.log("erros on login : " + e)
        }
    }
    // ConstantSourceNode 
    return (
        <div className='container-fluid log'>

            <form className='form row' onSubmit={userLogin}>
                <div className='col-6 dimg'>
                    <img className="img" src="src/assets/3d-cartoon-baby-genius-photo.jpg" alt="bad" /> </div>
                <div className='col-6 dform'>
                    <h2 className='login'>Login</h2><hr />
                    <div className='row'>
                        <label htmlFor="" className='control-label'>UserName</label>
                        <div className='input-group-container'>

                            <input type="text" placeholder='User Name' value={users.userName}
                                // onChange={(e) => setUsername(e.target.value)}
                                onChange={handleChange}
                                className='form-control' name="userName" id="userName" />
                            { }
                        </div>

                    </div>
                    <div className='row mt-2'>
                        <label htmlFor="">password</label>
                        <div className='input-group-container'>
                            <input type="text" className='form-control'
                                value={users.password}
                                // onChange={(e) => setPassword(e.target.value)} 
                                onChange={handleChange}
                                placeholder='Password' name="password" id="password" />
                        </div>

                    </div>
                    <p className='p'>
                        Don't have an Account? <a href="#">Register</a>
                    </p>
                    <div>
                        <button className='btn btn-success' type='submit'>LogIn</button>
                    </div>
                </div>
            </form>

        </div >
    )
}
