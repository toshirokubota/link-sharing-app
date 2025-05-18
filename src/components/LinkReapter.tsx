import { useState, type ChangeEvent } from "react";
import Select from "react-select";
import type { LinkObject } from "../types";
import { linksPreset, presetLinkIcon, staticAsset } from "../lib";

export default function LinkRepeater(
    {index, link, links, setLinks}: 
    {
        index: number, 
        link: LinkObject,
        links: LinkObject[],
        setLinks: React.Dispatch<React.SetStateAction<LinkObject[]>>
    }) {


    //const [newlink, setNewLink] = useState<LinkObject>({platform: '', link: ''});
    // const remainingOptions = linksPreset
    //     .filter(lk => !links.find(mk => mk.platform == lk.platform));
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

    //console.log('LinkRepeater: ', index, links, selectedOption, options);


    const handleUrlChange = (event: ChangeEvent)=> {
        const value = (event.target as HTMLInputElement).value;
        setLinks(prev => 
            prev.map(lk => 
                lk === link ? ({...lk, link: value}): lk));
    }

    const handlePlatformChange = (selected) => {
        //console.log('handleSelectionChange', selected);
        setSelectedOption(selected);
        setLinks(prev => 
            prev.map(lk => 
                lk === link ? ({...lk, platform: selected.value}): lk));
    }

    // const handleSubmit = (event: SubmitEvent) => {
    //     event.preventDefault();
    //     setLogged(true);
    // }

    return (
        <div className='link-repeater'>
            <div className="flex justify-between items-center">
                <span>Link #{index}</span>
                <button className="button-text">Remove</button>
            </div>
            <form className="login-form">
                <label htmlFor="select-platform">Platform</label>
                <Select 
                    options={availableOptions} 
                    value={selectedOption}
                    onChange={handlePlatformChange}/>
                {/* <select name='platforms' id='select-platform'>
                    {
                        linksPreset.map(lk => (
                            <option value={lk.platform}>
                                <span>
                                    <img src={staticAsset(`/images/${presetLinkIcon.get(lk.platform)}`)} alt=''/>
                                    {lk.platform}
                                </span>                               
                            </option>
                        ))
                    }
                </select> */}
                <label htmlFor="link-url">Link</label>
                <input 
                    type="text" 
                    name="link-url" id="link-url"
                    value={link.link}
                    onChange={handleUrlChange}
                    placeholder="e.g..."
                    className="mb-6"
                />
            </form>

        </div>
    )
}