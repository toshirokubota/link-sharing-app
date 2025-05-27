import { presetLinkColor, presetLinkIcon, staticAsset } from "../lib";
import type { LinkObject, Profile } from "../types";

export default function MockPreviewLinks({links, profile}: {links: LinkObject[], profile: Profile}) {

    return (
        <div className="mockup flex justify-center">
            <img src={staticAsset('/images/illustration-phone-mockup.svg')} alt="phone mockup"/>
            {
                profile.photo ? 
                    <div 
                        className="profile-img"
                        style={{position:'absolute', left:'50%', top:'0',  transform: 'translate(-50%, 87px)'}}
                    >
                        <img src={profile.photo} alt='profile photo'/>
                    </div>
                    :      
                profile.firstname.length > 0 && profile.lastname.length > 0 ?
                    <div 
                        className="profile-img"
                        style={{position:'absolute', left:'50%', top:'0',  transform: 'translate(-50%, 87px)'}}
                    >
                        <span>{profile.firstname[0].toUpperCase() + profile.lastname[0].toUpperCase()}</span>
                    </div>
                    :
                    <></>
            }
            <p 
                className='text-3xl font-bold align-middle my-4'
                style={{position:'absolute', left:'50%', top:'0',  transform: 'translate(-50%, 185px)'}}
            >{profile.firstname} {profile.lastname}</p>
            <p 
                className='text-base align-middle my-4'
                style={{position:'absolute', left:'50%', top:'0',  transform: 'translate(-50%, 220px)'}}
            >{profile.email}</p>
            {             
                links.slice(0, Math.min(5, links.length)).map((k, idx) => 
                    <div key={idx} 
                        className="mockup-entry"
                        style={{backgroundColor: presetLinkColor.get(k.platform)?.backgroundColor,
                            color: presetLinkColor.get(k.platform)?.color,
                            transform: `translate(-50%, ${310 + idx * 64}px)`
                        }}> 
                        <div>
                            <img 
                                className='inline-block mx-4'
                                src={staticAsset('/images/' + presetLinkIcon.get(k.platform))} 
                                alt=' ' 
                                style={{color: presetLinkColor.get(k.platform)?.color}}/>
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