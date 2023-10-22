import { useState } from 'react';

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        age: '',
        password: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission, e.g., send data to the server
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" onChange={handleInputChange} />
                <input type="tel" name="phone" placeholder="Phone" onChange={handleInputChange} />
                <input type="email" name="email" placeholder="Email" onChange={handleInputChange} />
                <input type="number" name="age" placeholder="Age" onChange={handleInputChange} />
                <input type="password" name="password" placeholder="Password" onChange={handleInputChange} />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;
