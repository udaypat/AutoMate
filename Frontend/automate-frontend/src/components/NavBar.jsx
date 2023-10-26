/* eslint-disable react/prop-types */
// import { Link } from 'react-router-dom';

// const Navbar = ({ isLoggedIn }) => {
//     return (
//         <nav>
//             <ul>
//                 {!isLoggedIn ? (
//                     <>
//                         <li>
//                             <Link to="/login">Login</Link>
//                         </li>
//                         <li>
//                             <Link to="/register">Register</Link>
//                         </li>
//                     </>
//                 ) : (
//                     <>
//                         <li>
//                             <Link to="/profile">My Profile</Link>
//                         </li>
//                         <li>
//                             <Link to="/">Logout</Link>
//                         </li>
//                     </>
//                 )}
//             </ul>
//         </nav>
//     );
// };

// export default Navbar;

import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';


function NavBar(props) {
    const navigate = useNavigate();

    const logout = () => {
        console.log('clicked logout');
        localStorage.clear();
        props.setUser(null)
        navigate("/");

    }

    return (
        <>
            {props.user ? ( // If props.user is defined, show the navigation for a logged-in user
                <nav className="navbar navbar-expand-lg navbar-light bg-light p-2">
                    <Link to="#" className="nav-link navbar-brand p-1">
                        AutoMate
                    </Link>
                    <ul className="nav justify-content-end ml-auto">
                        <li className="nav-item">
                            <Link to="/" className="nav-link" style={{ color: "black" }}>
                                Home
                            </Link>
                        </li>
                        {/* <li className="nav-item">
                            <Link to="/profile" className="nav-link" style={{ color: "black" }}>
                                Profile
                            </Link>
                        </li> */}
                        <li className="nav-item">
                            <Link to="/" className="nav-link" onClick={logout} style={{ color: "black" }}>
                                Logout
                            </Link>
                        </li>
                    </ul>
                </nav>
            ) : ( // If props.user is not defined, you can add login links here
                <>
                    {/* 
                    <li className="nav-item">
                        <Link to="/login" className="nav-link">
                            Login
                        </Link>
                    */}
                </>
            )}
        </>
    );
}

export default NavBar