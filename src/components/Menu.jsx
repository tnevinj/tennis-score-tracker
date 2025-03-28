import { useState } from 'react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Menu as MenuIcon } from 'lucide-react';

const Menu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-1">
          <MenuIcon className="h-4 w-4" />
          <span>Menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem asChild>
          <Link href="/matches" className="w-full cursor-pointer">
            Matches
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/matches/admin/new" className="w-full cursor-pointer">
            Add Match
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/matches/admin/add-many" className="w-full cursor-pointer">
            Add Multiple Matches
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/matches/admin" className="w-full cursor-pointer">
            Admin
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="https://sovari.co.za" className="w-full cursor-pointer">
            Contact Us
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Menu;