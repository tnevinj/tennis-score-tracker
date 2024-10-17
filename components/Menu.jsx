import { useState } from 'react';
import Link from 'next/link';

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        className="flex items-center focus:outline-none bg-blue"
        onClick={toggleMenu}
      >
        Menu
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg z-10">
          <Link href="/matches" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
            Matches
          </Link>
          <Link href="/matches/admin/new" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
            Add Match
          </Link>
          <Link href="/matches/admin" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
            Admin
          </Link>
          <Link href="sovari.co.za" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
            Contact Us
          </Link>
        </div>
      )}
    </div>
  );
};

export default Menu;