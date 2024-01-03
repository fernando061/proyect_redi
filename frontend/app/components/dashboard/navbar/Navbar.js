"use client"
import { usePathname } from "next/navigation";
import "tailwindcss/tailwind.css";
import {
  MdNotifications,
  MdOutlineChat,
  MdPublic,
  MdSearch,
} from "react-icons/md";

const Navbar = () => {
  const pathname = usePathname();
  console.log(pathname)
  return (
    <div className="p-5 rounded-lg bg-[#182237] flex items-center justify-between">
      <div className="text-[#b7bac1] font-bold capitalize">{pathname.split("/").pop()}</div>
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2 bg-gray-700 p-2 rounded-lg">
          <MdSearch className="text-white" />
          <input type="text" placeholder="Search..." className="bg-transparent border-none text-white" />
        </div>
        <div className="flex gap-4">
          <MdOutlineChat size={20} className="text-white" />
          <MdNotifications size={20} className="text-white" />
          <MdPublic size={20} className="text-white" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
