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
            {/* <Navbar setUser={setUser} user={user} /> */}
            <Card>
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl">Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email and password below
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <form id="myform" onSubmit={onSubmit} >
                        {/* <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                Or continue with
                            </span>
                        </div>
                    </div> */}
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email"
                                name="email"
                                placeholder="m@example.com"
                                onChange={handleInputChange}

                                value={formData.email}

                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleInputChange} />
                        </div>
                    </form>
                </CardContent>
                <CardFooter>
                    <Button type="submit" form="myform"
                        className="w-full">Create account</Button>
                </CardFooter>
            </Card>


            {error ?
                <div>

                    <Alert variant="destructive">
                        <ExclamationTriangleIcon className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>
                            {errorMsg}
                        </AlertDescription>
                    </Alert>
                </div> : null


            }

        </>
    )
}