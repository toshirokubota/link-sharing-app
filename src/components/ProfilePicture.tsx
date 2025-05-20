import { useEffect, useState, type ChangeEvent } from "react";
import { staticAsset, storageKeyPrefix, storageKeys } from "../lib";
import type { DropArgument } from "net";
import type { FileChangeInfo } from "fs/promises";

export default function ProfilePicture () {
    const [imageSrc, setImageSrc] = useState(null);
    const [filename, setFilename] = useState(null);
    useEffect(()=> {
        const item = localStorage.getItem(storageKeyPrefix + '.' + storageKeys.profilePhoto);
        if(item) {
            const image_src = JSON.parse(item);
            if(image_src) {
                setImageSrc(image_src);
            }
        } 
    }, []);
    useEffect(()=> {
        if(imageSrc) {
            localStorage.setItem(storageKeyPrefix + '.' + storageKeys.profilePhoto, JSON.stringify(imageSrc));
        }
    }, [imageSrc]);

    const handleChange = (event) => {
        event.preventDefault();

        const file = event.target.files[0]; // Get the first dropped file
        if (file) {
            //setFilename(file.name);
            handleImageUpload(file);
        }
    }

    const handleImageUpload = (file: File) => {
        //const file = event.target.files[0] || ; // Get the uploaded file
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setImageSrc(reader.result); // Set image as base64 URL
            reader.readAsDataURL(file); // Read file as data URL
        }
    };

    const handleDrop = (event) => {
        event.preventDefault();

        const file = event.dataTransfer.files[0]; // Get the first dropped file
        if (file) {
            //setFilename(file.name);
            handleImageUpload(file);
        }
    };

    const handleDragOver = (event: DragEvent) => {
        event.preventDefault(); // Prevent default behavior to allow drop
    };

    //console.log('ProfilePicture: ', imageSrc);
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
                {imageSrc ? 
                    <div className="profile-img">
                        <img src={imageSrc} alt='profile photo'/>
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