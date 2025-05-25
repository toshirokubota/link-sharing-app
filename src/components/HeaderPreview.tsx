import { Link } from "react-router-dom";
import type { LinkObject } from "../types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { staticAsset } from "../lib";


// const notify = () => {
//     toast.success("This is a success toast!", {
//         position: toast.POSITION.TOP_RIGHT,
//         autoClose: 3000,
//     });

//     return (
//         <div>
//         <button onClick={notify}>Show Toast</button>
//         <ToastContainer />
//         </div>
//     );
// };


export default function HeaderPreview({links}: {links: LinkObject[]}) {
    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(JSON.stringify(links));
        toast(
            (
                <div>
                    <img className='inline-block mr-4' src={staticAsset('/images/icon-link-copied-to-clipboard.svg')} alt=''/>
                    <span className='text-xs'>"The link has been copied to your clipboard"</span>
                </div>
            ), {
            position: "bottom-center",
            theme: 'dark',
            closeButton: false,
            autoClose: 3000});
    }
    
    return (
        <header className="preview w-full h-20">
        
                <nav>
                    <Link to="/edit" className="rect">Back to Editor</Link>
                    <button onClick={copyToClipboard}>Share Link</button>
                </nav>
                <ToastContainer />
        </header>
    )
}

