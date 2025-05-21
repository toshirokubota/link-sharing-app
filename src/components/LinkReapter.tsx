import { useState, type ChangeEvent } from "react";
import Select, { type SingleValue } from "react-select";
import type { LinkObject } from "../types";
import { linksPreset, presetLinkIcon, presetLinkURL, staticAsset } from "../lib";

export default function LinkRepeater(
    {index, link, links, setLinks, dndHandler}: 
    {
        index: number, 
        link: LinkObject,
        links: LinkObject[],
        setLinks: React.Dispatch<React.SetStateAction<LinkObject[]>>
        dndHandler: any
    }) {
    const options = linksPreset.map(lk => (
        {

            value: lk.platform, 
            label: 
                    (<span style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <img 
                            src={staticAsset(`/images/${presetLinkIcon.get(lk.platform)}`)} 
                            alt=''
                            style={{display: 'inline-block'}}/>
                        {lk.platform}
                    </span>)
        }));
    const availableOptions = options.filter(op => !links.find(mk => mk.platform == op.value))
    const [selectedOption, setSelectedOption] = useState(
        options.find(option => option.value == link.platform))

    const handleUrlChange = (event: ChangeEvent)=> {
        const value = (event.target as HTMLInputElement).value;
        console.log('handleUrlChange: ', value);
        setLinks(prev => 
            prev.map(lk => 
                lk === link ? ({...lk, link: value}): lk));
    }


    const handlePlatformChange = (selected: SingleValue<{ label: React.JSX.Element; value: string }>) => {
        if(selected) {
        setSelectedOption(selected);
        setLinks(prev => 
            prev.map(lk => 
                lk === link ? ({...lk, platform: selected.value}): lk));
        }
    }

    const removeLink = () => {
        setLinks(prev => 
            prev.filter(lk => lk.platform != link.platform)
        )
    }

    return (
        <div className='link-repeater'>
            <div className="flex gap-4 items-center">
                <div 
                    draggable={true}
                    onDragStart={(event) => dndHandler.handleDragStart(event, index)}
                    onDragOver={(event) => dndHandler.handleDragOver(event, index)} //(event) => handleDragOver(event)}
                    onDrop={(event) => dndHandler.handleDrop(event, index)} //(event) => handleDrop(event)}
                >
                    <svg className="inline-block mr-4"
                        xmlns="http://www.w3.org/2000/svg" width="12" height="6" fill="none" viewBox="0 0 12 6">
                        <path fill="#737373" d="M0 0h12v1H0zM0 5h12v1H0z"/>
                    </svg>
                    <span>Link #{index + 1}</span>
                </div>
                <button 
                    onClick={removeLink}
                    className="button-text ml-auto">
                        Remove
                </button>
            </div>
            <form className="login-form">
                <label htmlFor="select-platform">Platform</label>
                <Select 
                    options={availableOptions} 
                    value={selectedOption}
                    onChange={handlePlatformChange}/>
                <label htmlFor="link-url">Link</label>
                <input 
                    type="text" 
                    name="link-url" id="link-url"
                    value={link.link}
                    onChange={handleUrlChange}
                    placeholder={selectedOption && 'e.g. ' + presetLinkURL.get(selectedOption.value) + '/johnappleseed'}
                    className="mb-6"
                />
            </form>

        </div>
    )
}