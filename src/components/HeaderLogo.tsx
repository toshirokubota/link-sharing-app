import { staticAsset } from "../lib";

export default function HeaderLogo() {

    return (
      <header className='logo px-6'>
        <img
          src={staticAsset("/images/logo-devlinks-large.svg")}
          alt="logo"
          className="py-4"
        />
      </header>
    );
}