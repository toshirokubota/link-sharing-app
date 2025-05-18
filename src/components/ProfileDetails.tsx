import { useState } from "react";
import ProfilePicture from "./ProfilePicture";

export default function ProfileDetails() {
    const [formData, setFormData] = useState({firstName: '', lastName: '', email: ''});

    const handleChange = (event: ChangeEvent)=> {
        const name = (event.target as HTMLInputElement).name;
        const value = (event.target as HTMLInputElement).value;
        setFormData(prev => ({...prev, [name]: value}))
    }
    return (
        <div className="profile-card p-8">
            <h1>Profile Details</h1>
            <p>Add your details to create a personal touch to your profile.</p>
            <ProfilePicture />

            <form>
                <label htmlFor="first-name">First name*</label>
                <input 
                    type="text" 
                    id="first-name" 
                    name="first-name" 
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="e.g. John"
                />
                <label htmlFor="last-name">Last name*</label>
                <input 
                    type="text" 
                    id="last-name" 
                    name="last-name" 
                    value={formData.lastName}
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
            </form>
            
        </div>
    )
}