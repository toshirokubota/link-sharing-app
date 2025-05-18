import { useState, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup () {
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
        //setLogged(true);
        navigate('/login');
    }

    return (
        <div className='signup-card p-8'>
            <h1>Create account</h1>
            <h2>Let’s get you started sharing your links!</h2>
            <form onSubmit={handleSubmit} className="signup-form">
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
                <label htmlFor="new-password">Create password</label>
                <input 
                    type="password" 
                    name="password" 
                    id="new-password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="At least 8 charcters"
                    className="mb-6"
                />
                <label htmlFor="confirm-password">Confirm password</label>
                <input 
                    type="password" 
                    name="password" 
                    id="confirm-password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="At least 8 charcters"
                    className="mb-2"
                />
                <p className='text-xs mb-8'>Password must contain at least 8 characters</p>
                <button>Create new account</button>
            </form>
            <div className='text-center text-sm mt-4'>
                <p>Already have an account? <Link to="/">Login</Link></p>                    
                
            </div>
        </div>
    )
}