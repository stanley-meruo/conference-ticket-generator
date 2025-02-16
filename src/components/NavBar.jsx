import { useState } from "react";
import icon from "/icon.svg"
import logo from "/ticz.svg";
import { HiOutlineArrowLongRight } from "react-icons/hi2";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="font-jeju w-full px-4 py-3 rounded-2xl bg-primary bg-opacity-90 border border-color sticky top-4 left-0 z-50">
      <div className="mx-auto flex justify-between items-center">
        <Link to="/">
          <div className="flex items-center gap-2">
            <img
              src={icon}
              alt="Tech Fest Icon"
              className="border border-color p-2 rounded-xl"
            />
            <img src={logo} alt="Tech Fest Logo" />
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex md:items-center gap-6">
          <li className="text-gray-400 hover:text-white cursor-pointer lg:text-lg">
            Events
          </li>
          <li className="text-gray-400 hover:text-white cursor-pointer lg:text-lg">
            My Tickets
          </li>
          <li className="text-gray-400 hover:text-white cursor-pointer lg:text-lg">
            About Project
          </li>
        </ul>

        <div className="flex items-center">
          <button className="bg-white flex items-center gap-2 text-black px-4 py-2 rounded-xl border-white border-2 hover:bg-color hover:text-white lg:text-lg">
            MY TICKETS
            <HiOutlineArrowLongRight className="text-xl" />
          </button>

          {/* Mobile Menu Button */}
          {/* <div
          className="md:hidden cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
          >
            <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
               />
            </svg>
          </div> */}
        </div>
      </div>

      {/* Mobile Menu (Slide Down) */}
      <div
        className={`md:hidden bg-gray-800 transition-all duration-300 ${
          isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0 "
        } overflow-hidden`}
      >
        <ul className="flex flex-col gap-4 p-4 text-center">
          <li className="hover:text-blue-500 cursor-pointer">Home</li>
          <li className="hover:text-blue-500 cursor-pointer">Tickets</li>
          <li className="hover:text-blue-500 cursor-pointer">Contact</li>
          <button className="bg-blue-500 px-4 py-2 rounded w-full">
            Login
          </button>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
