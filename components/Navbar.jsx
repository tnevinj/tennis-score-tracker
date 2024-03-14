// components/Navbar.js
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/">
              <span className="text-white font-bold text-xl flex items-center">
                <svg
                  className="h-8 w-8 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                    clipRule="evenodd"
                  />
                </svg>
                Tennis Score Tracker
              </span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="/matches"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300"
              >
                Matches
              </Link>
              <Link
                href="/leaderboard"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300"
              >
                Leaderboard
              </Link>
              <Link
                href="/players"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300"
              >
                Players
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <Link
              href="/login"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="ml-4 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;