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

// impport Link




function NavBar({ setUser }) {
    const navigate = useNavigate();

    const logout = () => {
        console.log('clicked logout');
        localStorage.clear();
        setUser(null)
        navigate("/");

    }


    return (
        <NavigationMenu>
            <NavigationMenuList>
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
            </NavigationMenuList>
        </NavigationMenu >

    )
}

export default NavBar