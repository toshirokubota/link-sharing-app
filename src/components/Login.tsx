import { useState, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { SignupData } from "../types";
import HeaderLogo from "./HeaderLogo";
import { verifyUser } from "../lib/DB";
import { formStorageKey, isEmpty, isValidEmail } from "../lib";

export default function Login ({setUserId}:{setUserId: React.Dispatch<React.SetStateAction<number>>}) {
    const [formData, setFormData] = useState<SignupData>({email:'', password:''});
    const navigate = useNavigate();
    const [error, setError] = useState({email: false, password: false, account: false, email_empty: false});
    const supabase_enabled = import.meta.env.VITE_SUPABASE_ENABLED === 'true';

    const handleChange = (event: ChangeEvent)=> {
        const name = (event.target as HTMLInputElement).name;
        const value = (event.target as HTMLInputElement).value;
        if(name == 'email') {
            setFormData(prev => ({...prev, email: value}));
        } else if(name == 'password') {
            setFormData(prev => ({...prev, password: value}));
        }
    }
    async function handleSubmit (event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if(supabase_enabled) {
            const userId = await verifyUser(formData.email, formData.password);
            if(userId && userId >= 0) {
                setUserId(userId);
                navigate('/edit');
            } else {
                if(isEmpty(formData.email) ) {
                    setError(prev => ({...prev, email_empty: true}));
                } 
                if(!isValidEmail(formData.email) ) {
                    setError(prev => ({...prev, email: true}));
                } 
                if(userId < 0) {
                    setError(prev => ({...prev, password: true}));
                }
            }
        } else {
            const item = localStorage.getItem(formStorageKey('signup'));
            if(item) {
                const signup: SignupData = JSON.parse(item);
                if(signup.email === formData.email && signup.password === formData.password){
                    setUserId(1);
                    navigate('/edit');
                } else {
                    if(isEmpty(signup.email) ) {
                        setError(prev => ({...prev, email_empty: true}));
                    } 
                    if(!isValidEmail(formData.email) ) {
                        setError(prev => ({...prev, email: true}));
                    } 
                    if(signup.password != formData.password) {
                        setError(prev => ({...prev, password: true}));
                    }
                }
            } else {
                setError(prev => ({...prev, account: true}))
            }
            //console.log('handleSubmit', error, item, formData);
        }
    }

    return (
        <div className='login-page'>
            <HeaderLogo />
            <div className='login-card p-8'>
            <h1>Login</h1>
            <h2>Add your details below to get back into the app</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <div className={"email-section" + `${error.email ? ' invalid': ''}` + `${error.email_empty ? ' empty': ''}`}>
                    <label htmlFor="login-email">Email address</label>
                    <input 
                        type="email" 
                        name="email" 
                        id="login-email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={()=> {setError(prev=>({...prev, email:false, email_empty:false}))}}
                        placeholder="e.g. alex@email.com"
                        className="mb-6"
                    />
                    <p className='error-empty'>Can't be empty</p>
                    <p className='error-invalid'>Invalid email address</p>
                </div>
                <div className={"password-section" + `${error.password ? ' invalid': ''}`}>
                    <label htmlFor="login-password">Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        id="login-password"
                        value={formData.password}
                        onChange={handleChange}
                        onFocus={()=> {setError(prev=>({...prev, password:false}))}}
                        placeholder="Enter your password"
                        className="mb-6"
                    />
                    <p className='error-invalid'>Please check again</p>
                </div>
                <button>Login</button>
            </form>
            <div className={'signup-suggestion text-center mt-10 ' + `${error.account ? 'invalid': ''}`}>
                <p>Don't have an account? </p>                    
                <Link to="/signUp" className="block">Create account</Link>
            </div>
            </div>
        </div>
    )
}
