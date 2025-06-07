import React from 'react';
import Link from 'next/link';
const Header = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="container mx-auto flex">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">DevJourney</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href={'/'}>Home</Link>
            </li>
            <li>
              <Link href={'blog'}>Blog</Link>
            </li>
            <li>
              <a href="">About</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
