import { useState, type ChangeEvent } from "react";
import ProfilePicture from "./ProfilePicture";

export default function ProfileDetails() {
    const [formData, setFormData] = useState({firstname: '', lastname: '', email: '', photo: ''});

    const handleChange = (event: ChangeEvent)=> {
        const name2 = (event.target as HTMLInputElement).name;
        const value = (event.target as HTMLInputElement).value;
        setFormData(prev => {console.log('handleChange: ', {...prev, [name2]: value}); return ({...prev, [name2]: value});});
    }
    const handleSave = (event: SubmitEvent) => {
        event.preventDefault();
        console.log('profile is saved.', formData);
    }

    return (
        <div className="profile-card p-8">
            <h1>Profile Details</h1>
            <p>Add your details to create a personal touch to your profile.</p>
            <ProfilePicture />

            <form onSubmit={handleSave}>
                <label htmlFor="firstname">First name*</label>
                <input 
                    type="text" 
                    id="firstname" 
                    name="firstname" 
                    value={formData.firstname}
                    onChange={handleChange}
                    placeholder="e.g. John"
                />
                <label htmlFor="lastname">Last name*</label>
                <input 
                    type="text" 
                    id="lastname" 
                    name="lastname" 
                    value={formData.lastname}
                    onChange={handleChange}
                    placeholder="e.g. Appleseed"
                />
                <label htmlFor="email">Email</label>
                <input 
                    type="text" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. email@example.com"
                />
                <button className="mt-8">Save</button>            
            </form>
        </div>
    )
}