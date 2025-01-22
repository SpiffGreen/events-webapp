import { Link } from "react-router";
import logoAsset from "../assets/logo.png";
function Nav() {
  return (
    <header className="bg-white">
      <nav className="max-w-6xl mx-auto py-4 px-4 flex gap-2 items-center">
        <Link to="/" className="flex items-center gap-2">
          <img src={logoAsset} alt="logo" className="h-10" />
          <h3 className="font-medium">EventsWeb.co</h3>
        </Link>
      </nav>
    </header>
  );
}

export default Nav;
