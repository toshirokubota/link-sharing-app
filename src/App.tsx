import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Header from "./components/Header";
import Login from "./components/Login";
import EditLinks from './components/EditLinks';
import PreviewLinks from './components/PreviewLinks';
import ProfileDetails from './components/ProfileDetails';
import Signup from './components/Signup';
import { type LinkObject } from './types';
import { formStorageKey } from './lib';

function App() {
  const [links, setLinks] = useState<LinkObject[]>([]);  
  const [logged, setLogged] = useState(false);

  useEffect(()=>{
      const key = formStorageKey('link');
      if(key) {
        const item = localStorage.getItem(key);
        if(item) {
          setLinks(JSON.parse(item));
        }
      }
  }, []);
  useEffect(()=>{
    if(links.length > 0) {
      const key = formStorageKey('link');
      if(key) {
        localStorage.setItem(key, JSON.stringify(links));
      }
    }
  }, [links]);


  return (
    <BrowserRouter basename="/link-sharing-app">
      <Header logged={logged}/>
      <Routes>
        <Route path="/" element={<Login setLogged={setLogged}/>} />
        <Route path="/edit" element={<EditLinks links={links} setLinks={setLinks}/>} />
        <Route path="/profile" element={<ProfileDetails />} />
        <Route path="/preview" element={<PreviewLinks links={links}/>} />
        <Route path="/signUp" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
