import { useState, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login ({setLogged}:{setLogged: React.Dispatch<React.SetStateAction<boolean>>}) {
    const [formData, setFormData] = useState({email:'', password:''});
    const navigate = useNavigate();

    const handleChange = (event: ChangeEvent)=> {
        const name = (event.target as HTMLInputElement).name;
        const value = (event.target as HTMLInputElement).value;
        if(name == 'email') {
            setFormData(prev => ({...prev, name: value}));
        } else if(name == 'password') {
            setFormData(prev => ({...prev, password: value}));
        }
    }
    const handleSubmit = (event: SubmitEvent) => {
        event.preventDefault();
        setLogged(true);
        navigate('/edit');
    }

    return (
        <div className='login-card p-8'>
            <h1>Login</h1>
            <h2>Add your details below to get back into the app</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <label htmlFor="login-email">Email address</label>
                <input 
                    type="email" 
                    name="email" 
                    id="login-email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. alex@email.com"
                    className="mb-6"
                />
                <label htmlFor="login-password">Password</label>
                <input 
                    type="password" 
                    name="password" 
                    id="login-password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="mb-6"
                />
                <button>Login</button>
            </form>
            <div className='text-center mt-10'>
                <p>Don't have an account? </p>                    
                <Link to="/signUp" className="block">Create account</Link>
            </div>
        </div>
    )
}