import { Link } from '@tanstack/react-router';
import HamburgerMenu from '../hamburgerMenu';
import MenuButton from '../ui/menuButton';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="relative backdrop-blur-xs h-16.25">
      <HamburgerMenu
        className={`md:hidden z-10`}
        isOpen={isOpen}
        onNavigate={() => setIsOpen(!isOpen)}
      />
      <div className="w-screen overflow-clip grid md:grid-cols-3 grid-cols-2 px-15 pt-4">
        <div
          className={`logo text-md pt-0.5 z-50 ${isOpen ? 'text-black' : 'text-white'} transition-all duration-200 ease-in-out`}
        >
          <Link to="/">SHOWTIME</Link>
        </div>

        {/* full view for full screens */}
        <div className="links hidden md:grid grid-cols-2 gap-12 col-span-2 ">
          <div className="nav-links flex gap-12 text-sm pt-1.5 justify-self-center">
            <Link to="/dashboard">STREAM</Link>
            <Link to="/about">ABOUT</Link>
            <Link to="/contact">CONTACT</Link>
          </div>
          <div className="buttons flex gap-2 text-sm pt-1.5 justify-self-end pr-5">
            <Link to="/auth">Signup</Link>
            <span>|</span>
            <Link to="/auth">Login</Link>
          </div>
        </div>

        {/* mobile view */}
        <MenuButton
          isActive={isOpen}
          onClick={() => setIsOpen(!isOpen)}
          size={38}
          className={`justify-self-end z-50 transition-all duration-200 ease-in-out md:hidden`}
          strokeColor={isOpen ? '#000000' : '#ffffff'}
        />
      </div>
    </div>
  );
};

export default Navbar;
