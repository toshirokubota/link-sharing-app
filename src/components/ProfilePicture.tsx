import { useState } from "react";
import { staticAsset } from "../lib";

export default function ProfilePicture () {
    const [imageSrc, setImageSrc] = useState(null);
    const [filename, setFilename] = useState(null);

    const handleImageUpload = (file) => {
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

    const handleDragOver = (event) => {
        event.preventDefault(); // Prevent default behavior to allow drop
    };

    return (
        <div>
            <p>Profile picture</p>
            <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
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
                    <img src={staticAsset('/images/icon-upload-image.svg')} alt='upload image icon' />
                }
            </div>
            <p>
                Image must be below 1024x1024px. Use PNG or JPG format.
            </p>
        </div>
    )
}