//import { useState } from "react";
import ProfilePicture from "./ProfilePicture";
import type { Profile } from "../types";

export default function ProfileDetails({profile, setProfile}:
    {
        profile: Profile,
        setProfile: React.Dispatch<React.SetStateAction<Profile>>
    }
) {
    //const [formData, setFormData] = useState({firstname: '', lastname: '', email: '', photo: ''});

    const handleChange = (event: React.ChangeEvent)=> {
        const name2 = (event.target as HTMLInputElement).name;
        const value = (event.target as HTMLInputElement).value;
        setProfile(prev => ({...prev, [name2]: value}));
    }
    const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('profile is saved.', profile);
    }

    return (
        <div className="profile-card p-8">
            <h1>Profile Details</h1>
            <p>Add your details to create a personal touch to your profile.</p>
            <ProfilePicture profile={profile} setProfile={setProfile}/>

            <form onSubmit={handleSave}>
                <label htmlFor="firstname">First name*</label>
                <input 
                    type="text" 
                    id="firstname" 
                    name="firstname" 
                    value={profile.firstname}
                    onChange={handleChange}
                    placeholder="e.g. John"
                />
                <label htmlFor="lastname">Last name*</label>
                <input 
                    type="text" 
                    id="lastname" 
                    name="lastname" 
                    value={profile.lastname}
                    onChange={handleChange}
                    placeholder="e.g. Appleseed"
                />
                <label htmlFor="email">Email</label>
                <input 
                    type="text" 
                    id="email" 
                    name="email" 
                    value={profile.email}
                    onChange={handleChange}
                    placeholder="e.g. email@example.com"
                />
                <button className="mt-8">Save</button>            
            </form>
        </div>
    )
}