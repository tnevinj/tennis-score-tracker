import Link from 'next/link';
import Menu from './Menu';
import { cn } from '@/lib/utils';
import { Home } from 'lucide-react';

const Navbar = () => {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2 mr-6">
          <img
            src="/favicon.ico"
            alt="TennisScore.co.za"
            className="h-8 w-auto"
          />
        </Link>
        <nav className={cn("flex items-center space-x-4 lg:space-x-6 mx-6")}>
          <Link
            href="/matches"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            TennisScore.co.za
          </Link>
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <Menu />
        </div>
      </div>
    </div>
  );
};

export default Navbar;