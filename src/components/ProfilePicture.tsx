//import { useEffect } from "react";
import { staticAsset } from "../lib";
import type { Profile } from "../types";

export default function ProfilePicture ({profile, setProfile}:
    {
        profile: Profile,
        setProfile: React.Dispatch<React.SetStateAction<Profile>>
    }
) {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();

        const file = event.target.files?.[0]; // Get the first dropped file
        if (file) {
            handleImageUpload(file);
        }
    }

    const handleImageUpload = (file: File) => {
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setProfile(prev => ({...prev, photo: reader.result as string})); // Set image as base64 URL
            reader.readAsDataURL(file); // Read file as data URL
        }
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();

        const file = event.dataTransfer?.files?.[0]; // Get the first dropped file
        if (file) {
            handleImageUpload(file);
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault(); // Prevent default behavior to allow drop
    };

    //console.log('Profile in ProfilePicture: ', profile);
    return (
        <div className='profile-photo'>
            <p className="text-sm text-gray-500">Profile picture</p>
            <div className='draggable'
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                // style={{
                //     width: "300px",
                //     height: "200px",
                //     border: "2px dashed #ccc",
                //     display: "flex",
                //     alignItems: "center",
                //     justifyContent: "center",
                //     cursor: "pointer",
                // }}
            >
                {profile.photo ? 
                    <div className="profile-img">
                        <img src={profile.photo} alt='profile photo'/>
                    </div>
                : profile.firstname.length > 0 && profile.lastname.length > 0 ? 
                    <div className="profile-img">
                        <span>{profile.firstname[0].toUpperCase() + profile.lastname[0].toUpperCase()}</span>
                    </div>
                :
                <>
                    <label htmlFor="file-input" className="flex justify-center">
                        <img src={staticAsset('/images/icon-upload-image.svg')} alt='upload image icon'/>
                        <input 
                            type="file" 
                            id="file-input" 
                            name="file" 
                            accept="image/png, image/jpeg" 
                            className="hidden"
                            onChange={handleChange}
                            />
                    </label>
                    <span className='block text-sm font-semibold'>+Upload Image</span>
                </>
               }
            </div>
            <p className="text-xs text-gray-500">
                Image must be below 1024x1024px. Use PNG or JPG format.
            </p>
        </div>
    )
}