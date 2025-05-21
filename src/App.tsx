import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Header from "./components/Header";
import Login from "./components/Login";
import EditLinks from './components/EditLinks';
import PreviewLinks from './components/PreviewLinks';
import ProfileDetails from './components/ProfileDetails';
import Signup from './components/Signup';
import { type LinkObject, type Profile } from './types';
import { formStorageKey } from './lib';

function App() {
  const [links, setLinks] = useState<LinkObject[]>([]);  
  const [profile, setProfile] = useState<Profile>({firstname: '', lastname: '', email:''})
  const [logged, setLogged] = useState(false);

  useEffect(()=>{
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
  }, []);
  useEffect(()=>{
    //console.log('useEffect in App.tsx:', links)
    if(links.length > 0) {
      const key = formStorageKey('links');
      //console.log('useEffect in App.tsx:', key, links)
      if(key) {
        localStorage.setItem(key, JSON.stringify(links));
      }
    }
  }, [links]);
  useEffect(()=>{
    //console.log('useEffect in App.tsx:', links)
    const key = formStorageKey('profile');
    console.log('profile useEffect in App.tsx:', key, links)
    if(key) {
      localStorage.setItem(key, JSON.stringify(profile));
    }
  }, [profile]);


  return (
    <BrowserRouter basename="/link-sharing-app">
      <Header logged={logged}/>
      <Routes>
        <Route path="/" element={<Login setLogged={setLogged}/>} />
        <Route path="/edit" element={<EditLinks links={links} setLinks={setLinks}/>} />
        <Route path="/profile" element={<ProfileDetails profile={profile} setProfile={setProfile}/>} />
        <Route path="/preview" element={<PreviewLinks links={links} profile={profile}/>} />
        <Route path="/signUp" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
