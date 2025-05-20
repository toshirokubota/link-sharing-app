import { presetLinkColor, staticAsset } from "../lib";
import type { LinkObject } from "../types";

export default function PreviewLinks({links}: {links: LinkObject[]}) {
    // const links2: LinkObject[] = [
    //     {platform:'CodePen', link:'http://www.CodePen.com/gomahan'}, 
    //     {platform:'GitHub', link:'http://www.github.com/gomahan'}, 
    //     {platform:'LinkedIn', link:'http://www.linkedin.com/gomahan'},
    //     {platform:'YouTube', link:'http://www.youtube.com/gomahan'},
    //     {platform:'FrontendMentor', link:'http://www.frontendmentor.io/gomahan'},
    //     {platform:'FaceBook', link:'http://www.FaceBook.com/gomahan'},
    //     {platform:'Twitch', link:'http://www.twitch.com/gomahan'},
    // ]
    return (
        <div className="mockup flex justify-center">
            <img src={staticAsset('/images/illustration-phone-mockup.svg')} alt="phone mockup"/>

            {                
                links.slice(0, Math.min(5, links.length)).map((k, idx) => 
                    <div key={idx} 
                        className="mockup-entry"
                        style={{backgroundColor: presetLinkColor.get(k.platform)?.backgroundColor,
                            color: presetLinkColor.get(k.platform)?.color,
                            transform: `translate(-50%, ${310 + idx * 64}px)`
                        }}>
                        <span>{k.platform} {idx}</span>
                        <span>{k.link}</span>
                    </div>
                    
                )
            }        
            </div>
    )
}