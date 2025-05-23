import { useEffect } from "react";
import { formStorageKey, staticAsset } from "../lib";
import type { Profile } from "../types";

export default function ProfilePicture ({profile, setProfile}:
    {
        profile: Profile,
        setProfile: React.Dispatch<React.SetStateAction<Profile>>
    }
) {
    // useEffect(()=> {
    //     const key: string = formStorageKey('profile');
    //     if(key) {
    //         const item = localStorage.getItem(key);
    //         if(item) {
    //             const image_src = JSON.parse(item);
    //             if(image_src) {
    //                 setProfile(prev => ({...prev, photo: image_src}));
    //             }
    //         } 
    //     }
    // }, []);
    // useEffect(()=> {
    //     if(profile.photo) {
    //         const key: string = formStorageKey('profile');
    //         if(key) {
    //             localStorage.setItem(key, JSON.stringify(profile.photo));
    //         }
    //     }
    // }, [profile.photo]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();

        const file = event.target.files?.[0]; // Get the first dropped file
        if (file) {
            //setFilename(file.name);
            handleImageUpload(file);
        }
    }

    const handleImageUpload = (file: File) => {
        //const file = event.target.files[0] || ; // Get the uploaded file
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
            //setFilename(file.name);
            handleImageUpload(file);
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault(); // Prevent default behavior to allow drop
    };

    //console.log('Profile in ProfilePicture: ', profile);
    return (
        <div>
            <p>Profile picture</p>
            <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                //onClick={clickHandler}
                style={{
                    width: "300px",
                    height: "200px",
                    border: "2px dashed #ccc",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                }}
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
               }
            </div>
            <p>
                Image must be below 1024x1024px. Use PNG or JPG format.
            </p>
        </div>
    )
}