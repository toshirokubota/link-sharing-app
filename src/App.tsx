import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Login from "./components/Login";
import EditLinks from './components/EditLinks';
import PreviewLinks from './components/PreviewLinks';
import ProfileDetails from './components/ProfileDetails';
import Signup from './components/Signup';
import { type LinkObject, type Profile } from './types';
//import { formStorageKey } from './lib';
import { addNewLink, getLinks, getProfile, updateLink, updateProfile } from './lib/DB';
import { formStorageKey } from './lib';

function App() {
  const [links, setLinks] = useState<LinkObject[]>([]);  
  const [profile, setProfile] = useState<Profile>({firstname: '', lastname: '', email:''})
  const [userId, setUserId] = useState(-1);

  const supabase_enabled = import.meta.env.VITE_SUPABASE_ENABLED === 'true';
  //console.log('supabase_enabled', supabase_enabled);

  useEffect( () => {
    if(userId >= 0) {
      if(supabase_enabled) {
        const _getLinks = async () => {
          const loaded = await getLinks(userId);
          setLinks(loaded);
          console.log('setLink called with', loaded);
        };
        _getLinks();

        const _getProfile = async () => {
          const profile = await getProfile(userId);
          if(profile) {
            setProfile(profile);
          }
        }
        _getProfile();
      } else {
        const link_key = formStorageKey('links');
        if(link_key) {
          const item = localStorage.getItem(link_key);
          if(item) {
            setLinks(JSON.parse(item));
          }
        }
        const profile_key = formStorageKey('profile');
        if(profile_key) {
          const item = localStorage.getItem(profile_key);
          if(item) {
            setProfile(JSON.parse(item));
          }
        }
      }
    }
  }, [userId]);
  
  useEffect(()=>{
    if(userId >= 0) {
      if(supabase_enabled) {
        const _insertNew = async () => {
          for(let i=0; i<links.length; ++i) {
            let link = links[i];
            console.log('in useEffect of App: update(): link = ', link)
            if(!link.link_id) {
              link = await addNewLink(link, i + 1);
            } else {
              await updateLink(link, i + 1)
            }
          }
          setLinks(links);
        }
        _insertNew();
      } else {
        console.log('useEffect in App.tsx:', links)
        if(links.length > 0) {
          const key = formStorageKey('links');
          //console.log('useEffect in App.tsx:', key, links)
          if(key) {
            localStorage.setItem(key, JSON.stringify(links));
          }
        }
      }
    }
  }, [links]);

  useEffect(()=>{
    if(userId >= 0) {
      if(supabase_enabled) {
        updateProfile(profile, userId);
      } else {
        console.log('useEffect in App.tsx:', links)
        if(profile.firstname.length > 0 && profile.lastname.length > 0 && profile.email.length > 0) {
          const key = formStorageKey('profile');
          console.log('profile useEffect in App.tsx:', profile)
          if(key) {
            localStorage.setItem(key, JSON.stringify(profile));
          }
        }
      }
    }
  }, [profile]);

  return (
    <BrowserRouter basename="/link-sharing-app">
      <Routes>
        <Route path="/" element={<Login setUserId={setUserId}/>} />
        <Route path="/edit" element={<EditLinks links={links} setLinks={setLinks} userId={userId}/>} />
        <Route path="/profile" element={<ProfileDetails profile={profile} setProfile={setProfile} links={links} logged={userId >= 0}/>} />
        <Route path="/preview" element={<PreviewLinks links={links} profile={profile}/>} />
        <Route path="/signUp" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
