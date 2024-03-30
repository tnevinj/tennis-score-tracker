import Link from 'next/link';
import Menu from './Menu';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <img
                className="h-8 w-auto"
                src="/favicon.ico"
                alt="TennisScore.co.za"
              />
            </Link>
          </div>
          <div className="mt-4 sm:ml-6 sm:flex sm:space-x-8">
            <Link
              href="/matches"
              className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
            >
              TennisScore.co.za
            </Link>
          </div>
          <div className="mt-2 sm:ml-6 sm:flex sm:items-center">
            {/* <Link
              href="/matches/admin/new"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add Match
            </Link> */}
            <Menu />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;