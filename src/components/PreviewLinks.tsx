import { presetLinkColor, presetLinkIcon, staticAsset } from "../lib";
import type { LinkObject, Profile } from "../types";

export default function PreviewLinks({links, profile}: 
    {
        links: LinkObject[],
        profile: Profile
    }) {

    return (
        // <img src={staticAsset('/images/illustration-phone-mockup.svg')} alt="phone mockup"/>
        <div className="preview-container">
            {
                profile.photo ? 
                    <div className="profile-img">
                        <img src={profile.photo} alt='profile photo'/>
                    </div>
                    :            
                    <div className="profile-img">
                        <span>{profile.firstname.length > 0 ? profile.firstname[0].toUpperCase(): '?'}</span>
                        <span>{profile.lastname.length > 0 ? profile.lastname[0].toUpperCase(): '?'}</span>
                    </div>
            }
            <p className='text-3xl font-bold align-middle my-4'>{profile.firstname} {profile.lastname}</p>
            <p className='text-xs align-middle my-4'>{profile.email}</p>
            {                
                links.map((k) => 
                    <div key={k.platform} 
                        className="preview-entry"
                        style={{backgroundColor: presetLinkColor.get(k.platform)?.backgroundColor,
                            color: presetLinkColor.get(k.platform)?.color,
                            //transform: `translate(-50%, ${310 + idx * 64}px)`
                        }}> 
                        <div>
                            <img 
                                className={'inline-block mr-2 ' + `${presetLinkColor.get(k.platform)?.color == 'white' ? 'icon-light': 'icon-dark'}`}
                                src={staticAsset('/images/' + presetLinkIcon.get(k.platform))} 
                                alt={k.platform + ' logo'} 
                                //style={{color: presetLinkColor.get(k.platform)?.color}}
                            />
                            <span>{k.platform}</span>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                            <path fill="#fff" d="M2.667 7.333v1.334h8L7 12.333l.947.947L13.227 8l-5.28-5.28L7 3.667l3.667 3.666h-8Z"/>
                        </svg>
                    </div>
                    
                )
            }        
            </div>
    )
}
