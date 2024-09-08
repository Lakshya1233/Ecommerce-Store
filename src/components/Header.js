import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/auth';

import toast from 'react-hot-toast';
import 'bootstrap/dist/js/bootstrap.bundle.min';
<><link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"></link><script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script></>
const Header = () => {
    const [auth, setAuth] = useAuth();
    const handleLogout = () => {
        setAuth({
            ...auth, user: null, token: ' '
        })
        localStorage.removeItem("auth")
        toast.success("Logout Successfully")


    }
    return (
        <>

            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarTogglerDemo01"
                        aria-controls="navbarTogglerDemo01"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <NavLink to="/" className="navbar-brand" href="#">
                            E-COMMERCE APP
                        </NavLink>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link active" aria-current="page" href="#">
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/category" className="nav-link active" aria-current="page" href="#">
                                    Category
                                </NavLink>
                            </li>
                            {
                                !auth.user ? (<>
                                    <li className="nav-item">
                                        <NavLink to="/register" className="nav-link" >
                                            Register
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/login" className="nav-link" >
                                            Login
                                        </NavLink>
                                    </li>
                                </>) : (
                                    <>
                                        <li className="nav-item dropdown">
                                            <NavLink className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                {auth?.user?.name}
                                            </NavLink>
                                            <ul className="dropdown-menu">
                                                <li>
                                                    <NavLink to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"
                                                        }`} className="dropdown-item" >Dashboard</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/login" onClick={handleLogout} className="dropdown-item" href="#">
                                                        Logout
                                                    </NavLink>
                                                </li>

                                            </ul>
                                        </li>









                                    </>)

                            }

                            <li className="nav-item">
                                <NavLink to="/cart" className="nav-link" href="#">
                                    Cart(0)
                                </NavLink>
                            </li>

                        </ul>

                    </div>
                </div>
            </nav>
        </>

    );
};

export default Header;
