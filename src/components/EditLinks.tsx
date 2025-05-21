import { useState } from "react";
import { staticAsset } from "../lib";
import type { LinkObject } from "../types";
import LinkRepeater from "./LinkReapter";

export default function EditLinks({links, setLinks}:
    {
      links: LinkObject[],
      setLinks: React.Dispatch<React.SetStateAction<LinkObject[]>>
    }
) {
  const [editedLinks, setEditedLinks] = useState<LinkObject[]>(links);
  const [dragging, setDragging] = useState(-1);

  const handleDragStart = (_event:DragEvent, index:number) => {
    //event.preventDefault();
    setDragging(index);
    //console.log('drag started.', index);
  };
  const handleDragOver = (event: DragEvent) => {
      //console.log('drag being performed...');
      event.preventDefault();
  };
  const handleDrop = (_event: DragEvent, index:number) => {
    if(dragging >= 0 && dragging != index) {
      const newItems = [...editedLinks];
      const draggedItem = newItems.splice(dragging, 1)[0];
      newItems.splice(index, 0, draggedItem);
      setEditedLinks(newItems);
      setDragging(-1);
      //console.log('links reordered.', index);
    }
    //console.log('drag ended.', index);
  };

  const addLink = () => {
    setEditedLinks(prev => [{platform: '', link: ''}, ...prev]);
    console.log(editedLinks);
  }
  const handleSave = () => {
    setLinks(editedLinks);
  }

    return (
      <div className="linkedit-card p-8">
        <h1>Customize your links</h1>
        <h2>
          Add/edit/remove links below and then share all your profiles with the
          world!
        </h2>

        <button onClick={addLink}>+ Add new link</button>

        {
          editedLinks.length === 0 ?
          <div>
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
        <button onClick={handleSave}>Save</button>
      </div>
    );
}