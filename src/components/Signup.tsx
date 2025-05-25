import { useState, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { type SignupData } from "../types";
import { formStorageKey, isEmpty, isValidEmail } from "../lib";
import HeaderLogo from "./HeaderLogo";

export default function Signup () {
    const [formData, setFormData] = useState<SignupData>({email:'', password:'', passwordC: ''});
    const navigate = useNavigate();
    const [error, setError] = useState({email: false, password: false, mismatch: false, email_empty: false});


    const handleChange = (event: ChangeEvent)=> {
        const name = (event.target as HTMLInputElement).name;
        const value = (event.target as HTMLInputElement).value;
        if(name == 'email') {
            setFormData(prev => ({...prev, email: value}));
        } else if(name == 'password') {
            setFormData(prev => ({...prev, password: value}));
        } else if(name == 'passwordC') {
            setFormData(prev => ({...prev, passwordC: value}));
        }

    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let bOk = true;
        if(isEmpty(formData.email) ) {
            setError(prev => ({...prev, email_empty: true}));
            bOk = false;
        } 
        if(!isValidEmail(formData.email)) {
            setError(prev => ({...prev, email: true}));
            bOk = false;
        } 
        if(formData.password.length < 8) {
            setError(prev => ({...prev, password: true}));
            bOk = false;
        }
        if(formData.password != formData.passwordC) {
            setError(prev => ({...prev, mismatch: true}));
            bOk = false;
        }
        if(bOk) {
            localStorage.setItem(formStorageKey('signup'), JSON.stringify(formData));
            navigate('/');
        }        
    }

    return (
        <div className='signup-page'>
            <HeaderLogo />
            <div className='signup-card p-8'>
            <h1>Create account</h1>
            <h2>Let’s get you started sharing your links!</h2>
            <form onSubmit={handleSubmit} className="signup-form">
                <div className={"email-section " + `${error.email ? 'invalid': ''}`  + `${error.email_empty ? 'empty': ''}`}>
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
                <p className="error-empty">Can't be empty</p>
                <p className="error-invalid">Invalid email address</p>
                </div>
                <div className={"password-section" + `${error.mismatch ? ' invalid': ''}` + `${error.password ? ' empty': ''}`}>
                <label htmlFor="new-password">Create password</label>
                <input 
                    type="password" 
                    name="password" 
                    id="new-password"
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={()=> {setError(prev=>({...prev, password:false}))}}
                    placeholder="At least 8 charcters"
                    className="mb-6"
                />
                <p className="error-empty">At least 8 characters</p>
                <p className="error-invalid">Please check again</p>
                </div>
                <div className={"password-confirm-section " + `${error.mismatch ? 'invalid': ''}`}>
                <label htmlFor="confirm-password">Confirm password</label>
                <input 
                    type="password" 
                    name="passwordC" 
                    id="confirm-password"
                    value={formData.passwordC}
                    onChange={handleChange}
                    onFocus={()=> {setError(prev=>({...prev, mismatch:false}))}}
                    placeholder="At least 8 charcters"
                    className="mb-2"
                />
                </div>
                <p className='text-xs mb-8'>Password must contain at least 8 characters</p>
                <button>Create new account</button>
            </form>
            <div className='text-center text-sm mt-4'>
                <p>Already have an account? <Link to="/">Login</Link></p>                    
                
            </div>
            </div>
        </div>
    )
}