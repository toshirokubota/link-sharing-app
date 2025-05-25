import { useState } from "react";
import ProfilePicture from "./ProfilePicture";
import type { LinkObject, Profile } from "../types";
import { isEmpty, isValidEmail } from "../lib";
import MockPreviewLinks from "./MockPreviewLinks";
import HeaderEdit from "./HeaderEdit";

export default function ProfileDetails({profile, setProfile, links, logged}:
    {
        profile: Profile,
        setProfile: React.Dispatch<React.SetStateAction<Profile>>,
        links: LinkObject[],
        logged: boolean
    }
) {
    const [formData, setFormData] = useState(profile);
    const [error, setError] = useState({firstname: false, lastname: false, email_empty: false, email: false});

    const handleChange = (event: React.ChangeEvent)=> {
        const name2 = (event.target as HTMLInputElement).name;
        const value = (event.target as HTMLInputElement).value;
        setFormData(prev => ({...prev, [name2]: value}));
    }
    const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let bOK: boolean = true;
        if(isEmpty(formData.firstname)) {
            setError(prev => ({...prev, firstname: true}));
            bOK = false;
        }
        if(isEmpty(formData.lastname)) {
            setError(prev => ({...prev, lastname: true}))
            bOK = false;
        }
        if(isEmpty(formData.email)) {
            setError(prev => ({...prev, email_empty: true}))
            bOK = false;
        } else if(!isValidEmail(formData.email)) {
            setError(prev => ({...prev, email: true}))
            bOK = false;
        }

        if(bOK) {
            setProfile(formData);
        }
        //console.log('profile is saved.', profile);
    }

    return (
      <div className='profile-page'>
        <HeaderEdit logged={logged} />
        <div className='profile-container'>
        <MockPreviewLinks links={links}/>
        <div className="profile-card">
            <h1>Profile Details</h1>
            <p>Add your details to create a personal touch to your profile.</p>
            <ProfilePicture profile={formData} setProfile={setFormData}/>

            <form onSubmit={handleSave}>
                <div className='form-inputs'>
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
                </div>
                <hr className="my-6 border-t-2 border-t-gray-200"></hr>
                <button className="save mt-8">Save</button>            
            </form>
        </div>
        </div>
      </div>
    )
}