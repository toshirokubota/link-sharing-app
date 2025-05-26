import { useState } from "react";
import { staticAsset } from "../lib";
import type { LinkObject } from "../types";
import LinkRepeater from "./LinkRepeater";
import MockPreviewLinks from "./MockPreviewLinks";
import HeaderEdit from "./HeaderEdit";

export default function EditLinks({links, setLinks, userId}:
    {
      links: LinkObject[],
      setLinks: React.Dispatch<React.SetStateAction<LinkObject[]>>
      userId: number
    }
) {
  const [editedLinks, setEditedLinks] = useState<LinkObject[]>(links);
  const [dragging, setDragging] = useState(-1);
  const [dirty, setDirty] = useState(false);

  const handleDragStart = (_event:React.DragEvent, index:number) => {
    //_event.preventDefault();
    setDragging(index);
    //console.log('drag started.', index);
  };
  const handleDragOver = (event: React.DragEvent) => {
      //console.log('drag being performed...');
      event.preventDefault();
  };
  const handleDrop = (_event: React.DragEvent, index:number) => {
    if(dragging >= 0 && dragging != index) {
      const newItems = [...editedLinks];
      const draggedItem = newItems.splice(dragging, 1)[0];
      newItems.splice(index, 0, draggedItem);
      setEditedLinks(newItems);
      setDragging(-1);
      setDirty(true);
      //console.log('links reordered.', index);
    }
    //console.log('drag ended.', index);
  };

  const addLink = () => {
    setEditedLinks(prev => [{platform: '', link: '', user_id: userId}, ...prev]);
    setDirty(true);
    console.log('EditLinks: addLink: userId = ', userId);
  }
  const handleSave = () => {
    setLinks(editedLinks);
    setDirty(false);
  }

    return (
      <div className='edit-page'>
        <HeaderEdit logged={userId >= 0} dirty={dirty}/>
        <div className='edit-container'>
        <MockPreviewLinks links={editedLinks}/>
        <div className="edit-card">
          <h1>Customize your links</h1>
          <h2>
            Add/edit/remove links below and then share all your profiles with the
            world!
          </h2>

          <button className='add-link' onClick={addLink}>+ Add new link</button>

          {
            editedLinks.length === 0 ?
            <div className='empty-link-card'>
              <img
                src={staticAsset("/images/illustration-empty.svg")}
                alt="illustrates empty link"
              />
              <h2>Let’s get you started</h2>
              <p>
                Use the “Add new link” button to get started. Once you have more than
                one link, you can reorder and edit them. We’re here to help you share
                your profiles with everyone!
              </p>
            </div>
            :
            <div>
              {
                editedLinks.map((link, idx) => 
                  (<LinkRepeater 
                    key={link.platform} 
                    index={idx} 
                    link={link} 
                    links={editedLinks}
                    setLinks={setEditedLinks}
                    dndHandler={{handleDragStart, handleDragOver, handleDrop}}
                  />))
              }
            </div>
          }
          <hr className="my-6 border-t-2 border-t-gray-200"></hr>
          <button className='save' onClick={handleSave}>Save</button>
        </div>
        </div>
      </div>
    );
}