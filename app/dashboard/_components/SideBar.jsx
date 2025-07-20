import React from 'react';
import Image from 'next/image';
import {
  HiOutlineHome,
  HiOutlineSquare3Stack3D,
  HiOutlineShieldCheck,
  HiOutlinePower,
} from 'react-icons/hi2';

function SideBar() {
  const Menu = [
    { id: 1, name: 'Home', icon: <HiOutlineHome />, path: '/dashboard' },
    { id: 2, name: 'Explore', icon: <HiOutlineSquare3Stack3D />, path: '/dashboard' },
    { id: 3, name: 'Upgrade', icon: <HiOutlineShieldCheck />, path: '/dashboard' },
    { id: 4, name: 'Logout', icon: <HiOutlinePower />, path: '/dashboard' },
  ];

  return (
    <div className="fixed h-full md:w-64 p-5 shadow-md">
      <Image src="/logo.jpg" width={60} height={60} alt="logo" />
      <hr className="my-5" />

      <ul>
        {Menu.map((item) => (
          <li
            key={item.id}
            className="flex items-center gap-2 text-gray-600 p-3 cursor-pointer hover:bg-gray-100 hover:text-black rounded-lg"
          >
            <div className="text-2xl">{item.icon}</div>
            <h2>{item.name}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideBar;
