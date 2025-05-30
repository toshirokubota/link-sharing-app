import { Link, useLocation, useNavigate } from "react-router-dom";
import { staticAsset } from "../lib";
import { useState } from "react";
import { ConfirmationModal } from "./ConfirmationModal";

export default function HeaderEdit({logged, dirty}: {logged: boolean, dirty: boolean}) {
    const location = useLocation();
    const [showModal, setShowModal] = useState(false);
    const [nextRoute, setNextRoute] = useState("");
    const navigate = useNavigate();

    const handleNavigation = (to: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault(); 

        if(dirty) {
            setShowModal(true);
            setNextRoute(to);
        } else {
            navigate(to);
        }
    };

    const handleCancel = ()=> {
        setShowModal(false);
        setNextRoute('');
    }
    const handleContinue = ()=> {
        setShowModal(false);
        navigate(nextRoute);
    }

    return (
        <>
            <header className="w-full h-20">
            {
                logged ? 
                    <nav>
                        <Link 
                            onClick={handleNavigation('/')} 
                            to="/" className={`${location.pathname==="/" ? "current": ""}`}>
                            <img className="md:hidden" src={staticAsset('/images/logo-devlinks-small.svg')} alt='logo' />
                            <img className="hidden md:inline-block" src={staticAsset('/images/logo-devlinks-large.svg')} alt='logo' />
                        </Link>                
                        <div>
                            <Link 
                                onClick={handleNavigation('/edit')} 
                                to="/edit" className={`${location.pathname==="/edit" ? "current": ""}`}>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20">
                                        <path fill="#737373" d="M11.154 14.65a.936.936 0 0 1 0 1.329l-.464.464a4.689 4.689 0 1 1-6.631-6.631l1.884-1.884a4.687 4.687 0 0 1 6.432-.194.941.941 0 0 1-1.25 1.407 2.813 2.813 0 0 0-3.857.114l-1.883 1.882a2.813 2.813 0 1 0 3.978 3.978l.464-.464a.936.936 0 0 1 1.327 0ZM16.94 3.558a4.695 4.695 0 0 0-6.63 0l-.465.464a.94.94 0 1 0 1.328 1.328l.464-.464a2.813 2.813 0 0 1 3.978 3.978l-1.883 1.885a2.813 2.813 0 0 1-3.858.111.942.942 0 0 0-1.25 1.407 4.688 4.688 0 0 0 6.43-.19l1.884-1.884a4.695 4.695 0 0 0 .002-6.633v-.002Z"/>
                                    </svg>
                                </span>
                                <span className="hidden md:inline-block">Links</span>
                            </Link>
                            <Link 
                                onClick={handleNavigation('/profile')} 
                                to="/profile" className={'inline ' + `${location.pathname==="/profile" ? "current": ""}`}>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20">
                                        <path fill="#737373" d="M10.5 1.563A8.437 8.437 0 1 0 18.938 10 8.447 8.447 0 0 0 10.5 1.562ZM6.716 15.357a4.688 4.688 0 0 1 7.568 0 6.54 6.54 0 0 1-7.568 0Zm1.596-5.982a2.188 2.188 0 1 1 4.376 0 2.188 2.188 0 0 1-4.376 0Zm7.344 4.683a6.523 6.523 0 0 0-2.265-1.83 4.062 4.062 0 1 0-5.782 0 6.522 6.522 0 0 0-2.265 1.83 6.562 6.562 0 1 1 10.304 0h.008Z"/>
                                    </svg>
                                </span>
                                <span className="hidden md:inline">Profile Details</span>
                            </Link>
                        </div>
                        <Link 
                            onClick={handleNavigation('/preview')} 
                            to="/preview" className={'rect' + `${location.pathname==="/" ? " current": ""}`}>
                            <span className="md:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
                                    <path fill="#633CFF" d="M19.61 9.62c-.03-.064-.714-1.583-2.225-3.095-2.023-2.02-4.572-3.088-7.385-3.088-2.812 0-5.362 1.068-7.382 3.088C1.106 8.037.422 9.556.391 9.62a.944.944 0 0 0 0 .761c.029.064.713 1.583 2.226 3.095 2.021 2.02 4.57 3.086 7.383 3.086 2.813 0 5.362-1.067 7.381-3.086 1.513-1.512 2.197-3.03 2.226-3.095a.946.946 0 0 0 .003-.761Zm-3.599 2.578c-1.677 1.651-3.7 2.49-6.01 2.49-2.313 0-4.334-.839-6.01-2.491A10.185 10.185 0 0 1 2.307 10a10.192 10.192 0 0 1 1.686-2.196C5.667 6.15 7.688 5.312 10 5.312s4.333.839 6.009 2.492c.659.652 1.226 1.39 1.685 2.196a10.19 10.19 0 0 1-1.685 2.197h.002Zm-6.01-5.636a3.438 3.438 0 1 0 0 6.876 3.438 3.438 0 0 0 0-6.876Zm0 5A1.562 1.562 0 1 1 10 8.438a1.562 1.562 0 0 1 0 3.124Z"/>
                                </svg>
                            </span>
                            <span className="hidden md:inline-block">Previews</span>
                        </Link>
                    </nav>
                    :   
                    <Link to="/">
                        <img 
                            src={staticAsset('/images/logo-devlinks-large.svg')} 
                            alt='logo' 
                            className='px-8 py-4'/>
                    </Link>              
            }
            </header>
            {showModal && <ConfirmationModal handleCancel={handleCancel} handleContinue={handleContinue}/>}
        </>
    )
}