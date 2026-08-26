import { Link } from '@tanstack/react-router';
import HamburgerMenu from '../hamburgerMenu';
import MenuButton from '../ui/menuButton';
import { useState } from 'react';
import { motion, type Variants } from 'motion/react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const streamContainerVariants = {
    rest: {},
    hover: {
      transition: { staggerChildren: 0.05 },
    },
  };

  const streamLetterVariants: Variants = {
    rest: { scaleX: 1, opacity: 1 },
    hover: {
      scaleX: [0, 1],
      opacity: [0, 1],
      transition: { duration: 0.1, ease: 'easeInOut' },
    },
  };

  const streamLetters = ['S', 'T', 'R', 'E', 'A', 'M'];
  const aboutLetters = ['A', 'B', 'O', 'U', 'T'];
  const contactLetters = ['C', 'O', 'N', 'T', 'A', 'C', 'T'];

  return (
    <div className="relative backdrop-blur-xs h-16.25">
      <HamburgerMenu
        className={`md:hidden z-10`}
        isOpen={isOpen}
        onNavigate={() => setIsOpen(!isOpen)}
      />
      <div className="w-screen overflow-clip grid md:grid-cols-3 grid-cols-2 md:px-15 px-5 pt-4">
        <div
          className={`logo text-md pt-0.5 z-50 ${isOpen ? 'text-black' : 'text-white'} transition-all duration-200 ease-in-out`}
        >
          <Link to="/">SHOWTIME</Link>
        </div>

        {/* full view for full screens */}
        <div className="links hidden md:grid grid-cols-2 gap-12 col-span-2 ">
          <div className="nav-links flex gap-12 text-sm pt-1.5 justify-self-center ">
            <motion.div
              className="flex justify-center items-center gap-2 group"
              initial="rest"
              whileHover="hover"
              animate="rest"
            >
              <motion.span
                variants={streamContainerVariants}
                className="size-3 block bg-neutral-300 rounded-full opacity-0 group-hover:opacity-100 -translate-x-3 group-hover:translate-x-0 transition-all duration-200"
              />
              <Link
                to="/dashboard"
                className="group-hover:text-neutral-300 flex"
              >
                <motion.div
                  className="flex"
                  variants={streamContainerVariants}
                  initial="rest"
                  whileHover="hover"
                >
                  {streamLetters.map((letter, i) => (
                    <motion.span key={i} variants={streamLetterVariants}>
                      {letter}
                    </motion.span>
                  ))}
                </motion.div>
              </Link>
            </motion.div>
            <motion.div
              className="flex justify-center items-center gap-2 group"
              initial="rest"
              whileHover="hover"
              animate="rest"
            >
              <motion.span
                variants={streamContainerVariants}
                className="size-3 block bg-neutral-300 rounded-full opacity-0 group-hover:opacity-100 -translate-x-3 group-hover:translate-x-0 transition-all duration-200"
              />
              <Link
                to="/dashboard"
                className="group-hover:text-neutral-300  flex"
              >
                <motion.div
                  className="flex"
                  variants={streamContainerVariants}
                  initial="rest"
                  whileHover="hover"
                >
                  {aboutLetters.map((letter, i) => (
                    <motion.span key={i} variants={streamLetterVariants}>
                      {letter}
                    </motion.span>
                  ))}
                </motion.div>
              </Link>
            </motion.div>
            <motion.div
              className="flex justify-center items-center gap-2 group"
              initial="rest"
              whileHover="hover"
              animate="rest"
            >
              <motion.span
                variants={streamContainerVariants}
                className="size-3 block bg-neutral-300 rounded-full opacity-0 group-hover:opacity-100 -translate-x-3 group-hover:translate-x-0 transition-all duration-200"
              />
              <Link
                to="/dashboard"
                className="group-hover:text-neutral-300 flex"
              >
                <motion.div
                  className="flex"
                  variants={streamContainerVariants}
                  initial="rest"
                  whileHover="hover"
                >
                  {contactLetters.map((letter, i) => (
                    <motion.span key={i} variants={streamLetterVariants}>
                      {letter}
                    </motion.span>
                  ))}
                </motion.div>
              </Link>
            </motion.div>
          </div>
          <div className="buttons flex gap-2 text-sm pt-1.5 justify-self-end pr-5">
            <Link to="/auth?signup=true" className="hover:text-neutral-300">
              Signup
            </Link>
            <span>|</span>
            <Link to="/auth" className="hover:text-neutral-300">
              Login
            </Link>
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
