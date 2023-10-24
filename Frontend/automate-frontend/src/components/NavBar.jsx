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
import React from 'react'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "./ui/navigation-menu"
import { Link } from 'react-router-dom'
import { navigationMenuTriggerStyle } from "./ui/navigation-menu"
import { useNavigate } from "react-router-dom";

// import Link




function NavBar(props) {
    const navigate = useNavigate();

    const logout = () => {
        console.log('clicked logout');
        localStorage.clear();
        props.setUser(null)
        navigate("/");

    }


    return (
        <NavigationMenu>
            <NavigationMenuList>
                {props.user ? (
                    <>
                        <NavigationMenuItem>
                            <Link to="/" className={navigationMenuTriggerStyle()}>

                                Home

                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link to="/profile" className={navigationMenuTriggerStyle()}>

                                Profile

                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>

                            <NavigationMenuLink className={navigationMenuTriggerStyle()} onClick={logout}>
                                Logout
                            </NavigationMenuLink>

                        </NavigationMenuItem>
                    </>
                ) : (
                    <>
                        <NavigationMenuItem>
                            <Link to="/login" className={navigationMenuTriggerStyle()}>

                                Login

                            </Link>
                        </NavigationMenuItem>
                    </>
                )}
            </NavigationMenuList>
        </NavigationMenu >

    )
}

export default NavBar