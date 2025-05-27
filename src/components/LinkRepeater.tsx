import { useState, type ChangeEvent } from "react";
import Select, { type SingleValue } from "react-select";
import type { LinkObject } from "../types";
import { isValidURL, linksPreset, presetLinkIcon, presetLinkURL, staticAsset } from "../lib";

export default function LinkRepeater(
    {index, link, links, setLinks, setRemovedLinks, dndHandler}: 
    {
        index: number, 
        link: LinkObject,
        links: LinkObject[],
        setLinks: React.Dispatch<React.SetStateAction<LinkObject[]>>
        setRemovedLinks: React.Dispatch<React.SetStateAction<LinkObject[]>>
        dndHandler: any
    }) {
    const options = linksPreset.map(lk => (
        {
            value: lk.platform, 
            label: 
                    (<span className='link-preset-label' style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
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
    const [urlError, setUrlError] = useState<boolean>(false);

    const handleUrlChange = (event: ChangeEvent)=> {
        const value = (event.target as HTMLInputElement).value;
        //console.log('handleUrlChange: ', value);
        setLinks(prev => 
            prev.map(lk => 
                lk === link ? ({...lk, link: value}): lk));
    }
    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        const value = (event.target as HTMLInputElement).value;
        const baseUrl = selectedOption ? presetLinkURL.get(selectedOption.value): undefined;
        if(!isValidURL(value) || (baseUrl && !value.startsWith(baseUrl))) {
            setUrlError(true);
        }
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
        setRemovedLinks(prev => [...prev, link]);
    }

    return (
        <div className='link-repeater'>
            <div className="flex gap-4 items-center">
                <div 
                    draggable={true}
                    onDragStart={(event) => dndHandler.handleDragStart(event, index)}
                    onDragOver={(event) => dndHandler.handleDragOver(event)} //(event) => handleDragOver(event)}
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
                    onChange={handlePlatformChange}
                    styles={{
                        control: (base, state) => ({
                        ...base,
                        //borderColor: state.isFocused ? "blue" : "gray",
                        "&:hover, &:focus": {
                            boxShadow: '0 0 10px #633CFF',
                        },
                        }),
                    }}
                />
                <div className={'url-section' + `${urlError ? ' invalid': ''}` + `${link.link.trim().length === 0 ? ' empty': ''}`}>
                <label htmlFor="link-url">Link</label>
                <input 
                    type="text" 
                    name="link-url" id="link-url"
                    value={link.link}
                    onChange={handleUrlChange}
                    onBlur={handleBlur}
                    onFocus={()=>{setUrlError(false)}}
                    placeholder={selectedOption && 'e.g. ' + presetLinkURL.get(selectedOption.value) + '/johnappleseed'}
                    className="mb-6"
                />
                <p className="error-empty">Can't be empty</p>
                <p className="error-invalid">Please check the URL</p>
                </div>
            </form>

        </div>
    )
}