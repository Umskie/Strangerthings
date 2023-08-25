import React from "react";
import { Link, useNavigate }  from 'react-router-dom'
import '../App.css';


const Navbar=()=> {
    const auth = sessionStorage.getItem('token');
    console.log(auth)
    const navigate = useNavigate();
    const logout =()=> {
        sessionStorage.clear();
        navigate('/Register')
    }

    if (auth) {
    return (
        <div>
        
                <ul className="navbar">

                <li><Link to={'/'}>Home</Link></li>
                <li><Link to={'/posts'}>Posts</Link></li>
                <li><Link to={'/newpost'}>New Post</Link></li>
                <li>{ auth ? <Link onClick={logout} to='/Register'>Logout</Link> : <Link to="/Register">Logout</Link>}</li>

             </ul>
            
             
        </div>
    )
            } else {
                return (
                    <ul className="navbar">
                    <li><Link to={'/Register'}>Register</Link></li>
                    <li><Link to={'/login'}>Login</Link></li>
                 </ul>
                )
            }
        }

export default Navbar;