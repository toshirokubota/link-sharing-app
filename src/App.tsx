import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Header from "./components/Header";
import Login from "./components/Login";
import EditLinks from './components/EditLinks';
import PreviewLinks from './components/PreviewLinks';
import ProfileDetails from './components/ProfileDetails';
import Signup from './components/Signup';
import { type LinkObject } from './types';

function App() {
  const [links, setLinks] = useState<LinkObject[]>([]);  
  const [logged, setLogged] = useState(false);

  return (
    <BrowserRouter basename="/link-sharing-app">
      <Header logged={logged}/>
      <Routes>
        <Route path="/" element={<Login setLogged={setLogged}/>} />
        <Route path="/edit" element={<EditLinks links={links} setLinks={setLinks}/>} />
        <Route path="/profile" element={<ProfileDetails />} />
        <Route path="/preview" element={<PreviewLinks />} />
        <Route path="/signUp" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
