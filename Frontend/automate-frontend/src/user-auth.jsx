import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from 'axios';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useNavigate } from "react-router-dom";

import { Label } from "@/components/ui/label";

// eslint-disable-next-line react/prop-types
export function UserAuthForm({ className, ...props }) {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        username: "",
        age: "",
        gender: "",
        pgender: "male",
        pagegrp: "0",
        password: "",
    });

    async function onSubmit(event) {
        event.preventDefault();
        console.log(formData);

        try {
            const response = await axios.post("http://127.0.0.1:5000/register", formData);

            console.log('Response:', response.data);
            navigate("/home");

        } catch (error) {
            console.error('Error:', error);
        }

    }

    // Define a function to handle input changes
    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <form onSubmit={onSubmit}>
                <div className="grid gap-2">
                    <div className="grid gap-1">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            placeholder="name@example.com"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            value={formData.email}
                            onChange={handleInputChange}

                        />
                    </div>
                    <div className="grid gap-1">
                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            name="username"
                            type="text"
                            value={formData.username}
                            onChange={handleInputChange}

                        />
                    </div>
                    <div className="grid gap-1">
                        <Label htmlFor="gender">Gender</Label>
                        <Input
                            id="gender"
                            name="gender"
                            type="text"
                            value={formData.gender}
                            onChange={handleInputChange}

                        />
                    </div>
                    <div className="grid gap-1">
                        <Label htmlFor="gender">Age</Label>
                        <Input
                            id="age"
                            name="age"
                            type="text"
                            value={formData.age}
                            onChange={handleInputChange}

                        />
                    </div>
                    <div className="grid gap-1">
                        <Label htmlFor="preferred-gender">Preferred Gender</Label>
                        <select
                            id="preferred-gender"
                            name="preferredGender"
                            value={formData.pgender}
                            onChange={handleInputChange}

                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div className="grid gap-1">
                        <Label htmlFor="preferred-age">Preferred Age</Label>
                        <select
                            id="preferred-age"
                            name="preferredAge"
                            value={formData.pagegrp}
                            onChange={handleInputChange}

                        >
                            <option value="0">18-25</option>
                            <option value="1">25-30</option>
                            <option value="2">30-45</option>
                            <option value="3">45+</option>
                        </select>
                    </div>
                    <div className="grid gap-1">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleInputChange}

                        />
                    </div>
                </div>
                <Button type="submit">Submit</Button>
            </form>
        </div>
    );
}
