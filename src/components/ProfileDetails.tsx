import { useState } from "react";
import ProfilePicture from "./ProfilePicture";
import type { Profile } from "../types";
import { isEmpty, isValidEmail } from "../lib";

export default function ProfileDetails({profile, setProfile}:
    {
        profile: Profile,
        setProfile: React.Dispatch<React.SetStateAction<Profile>>
    }
) {
    //const [formData, setFormData] = useState({firstname: '', lastname: '', email: '', photo: ''});
    const [error, setError] = useState({firstname: false, lastname: false, email_empty: false, email: false});

    const handleChange = (event: React.ChangeEvent)=> {
        const name2 = (event.target as HTMLInputElement).name;
        const value = (event.target as HTMLInputElement).value;
        setProfile(prev => ({...prev, [name2]: value}));
    }
    const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(isEmpty(profile.firstname)) {
            setError(prev => ({...prev, firstname: true}))
        }
        if(isEmpty(profile.lastname)) {
            setError(prev => ({...prev, lastname: true}))
        }
        if(isEmpty(profile.email)) {
            setError(prev => ({...prev, email_empty: true}))
        } else if(!isValidEmail(profile.email)) {
            setError(prev => ({...prev, email: true}))
        }
        //console.log('profile is saved.', profile);
    }

    return (
        <div className="profile-card p-8">
            <h1>Profile Details</h1>
            <p>Add your details to create a personal touch to your profile.</p>
            <ProfilePicture profile={profile} setProfile={setProfile}/>

            <form onSubmit={handleSave}>
                <div className={"firstname-section" + `${error.firstname ? ' empty': ''}`}>
                <label htmlFor="firstname">First name*</label>
                <input 
                    type="text" 
                    id="firstname" 
                    name="firstname" 
                    value={profile.firstname}
                    onChange={handleChange}
                    onFocus={()=> {setError(prev => ({...prev, firstname: false}))}}
                    placeholder="e.g. John"
                />
                <p className="error-empty">Can't be empty</p>
                </div>
                <div className={"lastname-section" + `${error.lastname ? ' empty': ''}`}>
                <label htmlFor="lastname">Last name*</label>
                <input 
                    type="text" 
                    id="lastname" 
                    name="lastname" 
                    value={profile.lastname}
                    onChange={handleChange}
                    onFocus={()=> {setError(prev => ({...prev, lastname: false}))}}
                    placeholder="e.g. Appleseed"
                />
                <p className="error-empty">Can't be empty</p>
                </div>
                <div className={"email-section" + `${error.email_empty ? ' empty': ''}` + `${error.email ? ' invalid': ''}`}>
                <label htmlFor="email">Email</label>
                <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={profile.email}
                    onChange={handleChange}
                    onFocus={()=> {setError(prev => ({...prev, email: false, email_empty:false}))}}
                    placeholder="e.g. email@example.com"
                />
                <p className="error-invalid">Invalid email address</p>
                <p className="error-empty">Can't be empty</p>
                </div>
                <button className="mt-8">Save</button>            
            </form>
        </div>
    )
}