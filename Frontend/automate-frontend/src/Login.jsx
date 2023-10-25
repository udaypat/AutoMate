import { Button } from "@/components/ui/button"
// import Navbar from './components/NavBar';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'

import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import axios from "axios"

export default function Login() {
    const navigate = useNavigate();

    const [error, setError] = useState(false)
    const [errorMsg, setErrorMsg] = useState(null)
    const [user, setUser] = useState({})

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    async function onSubmit(event) {
        event.preventDefault();
        // console.log(formData);

        try {
            const response = await axios.post("http://127.0.0.1:5000/login", formData);

            console.log('Response:', response.data.access_token);
            // setlogin(true)
            localStorage.setItem('user', response.data.access_token)
            setError(false)
            navigate("/");
        } catch (error) {
            console.log(error.response)
            setError(true)
            setErrorMsg(error.response.data.msg)
            setUser({});
            localStorage.clear();
        }
    }

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        // console.log(loggedInUser);
        if (loggedInUser) {
            // const foundUser = JSON.parse(loggedInUser);
            setUser(loggedInUser);
        }
    }, [user]);

    function handleInputChange(event) {
        // console.log('input changed');
        console.log(formData);
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }
    return (
        <>
            <section className="vh-100" style={{ backgroundColor: '#296E73' }}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-xl-10">
                            <div className="card" style={{ borderRadius: '1rem' }}>
                                <div className="row g-0">
                                    <div className="col-md-6 col-lg-5 d-none d-md-block">
                                        <img
                                            src="/bg_login.png"
                                            alt="login form"
                                            className="img-fluid"
                                            style={{ borderRadius: '1rem 0 0 1rem', height: '100%' }}
                                        />
                                    </div>
                                    <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                        <div className="card-body p-4 p-lg-5 text-black">
                                            <form id="myform" onSubmit={onSubmit} >
                                                <div className="d-flex align-items-center mb-3 pb-1">
                                                    <i className="fas fa-cubes fa-2x me-3" style={{ color: '#ff6219' }}></i>
                                                    <span className="h1 fw-bold mb-0">AutoMate</span>
                                                </div>
                                                <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>Sign into your account</h5>
                                                <div className="form-outline mb-4">
                                                    <label className="form-label" htmlFor="form2Example17">Email address</label>
                                                    <input
                                                        id="email"
                                                        type="email"
                                                        name="email"
                                                        placeholder="m@example.com"
                                                        className="form-control form-control-lg"
                                                        onChange={handleInputChange}
                                                        value={formData.email}
                                                    />
                                                </div>

                                                <div className="form-outline mb-4">
                                                    <label className="form-label" htmlFor="form2Example27">Password</label>
                                                    <input
                                                        id="password"
                                                        name="password"
                                                        type="password"
                                                        className="form-control form-control-lg"
                                                        value={formData.password}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div className="pt-1 mb-4">
                                                    <button className="btn btn-dark btn-lg" type="submit" form="myform" style={{ backgroundColor: '#296E73' }}>Login</button>
                                                    <p className="mt-2 " style={{ color: '#393f81' }}>Don't have an account?
                                                        <Link to="/" style={{ color: '#393f81' }}>

                                                            Register

                                                        </Link></p>
                                                </div>
                                                {/* <a className="small text-muted" href="#!">Forgot password?</a> */}
                                            </form>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>


        // <>
        //     {/* <Navbar setUser={setUser} user={user} /> */}
        //     <Card>
        //         <CardHeader className="space-y-1">
        //             <CardTitle className="text-2xl">Login to your account</CardTitle>
        //             <CardDescription>
        //                 Enter your email and password below
        //             </CardDescription>
        //         </CardHeader>
        //         <CardContent className="grid gap-4">
        //             <form id="myform" onSubmit={onSubmit} >
        //                 {/* <div className="relative">
        //                 <div className="absolute inset-0 flex items-center">
        //                     <span className="w-full border-t" />
        //                 </div>
        //                 <div className="relative flex justify-center text-xs uppercase">
        //                     <span className="bg-background px-2 text-muted-foreground">
        //                         Or continue with
        //                     </span>
        //                 </div>
        //             </div> */}
        //                 <div className="grid gap-2">
        //                     <Label htmlFor="email">Email</Label>
        //                     <Input id="email" type="email"
        //                         name="email"
        //                         placeholder="m@example.com"
        //                         onChange={handleInputChange}

        //                         value={formData.email}

        //                     />
        //                 </div>
        //                 <div className="grid gap-2">
        //                     <Label htmlFor="password">Password</Label>
        //                     <Input id="password"
        //                         name="password"
        //                         type="password"
        //                         value={formData.password}
        //                         onChange={handleInputChange} />
        //                 </div>
        //             </form>
        //         </CardContent>
        //         <CardFooter>
        //             <Button type="submit" form="myform"
        //                 className="w-full">Create account</Button>
        //         </CardFooter>
        //     </Card>


        //     {error ?
        //         <div>

        //             <Alert variant="destructive">
        //                 <ExclamationTriangleIcon className="h-4 w-4" />
        //                 <AlertTitle>Error</AlertTitle>
        //                 <AlertDescription>
        //                     {errorMsg}
        //                 </AlertDescription>
        //             </Alert>
        //         </div> : null


        //     }

        // </>
    )
}