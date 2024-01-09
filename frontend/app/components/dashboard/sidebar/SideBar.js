"use client";
import Image from "next/image";
import { useRouter } from 'next/router';
import MenuLink from "./MenuLink";
import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdLogout, // Excluimos esta importación
} from "react-icons/md";
import {logout} from "../../../service/UserService"
const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Manage Users",
        path: "/dashboard/users",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Manage Post",
        path: "/dashboard/post",
        icon: <MdShoppingBag />,
      },
      {
        title: "Publications",
        path: "/publish",
        icon: <MdShoppingBag />,
      },
    ],
  },
];

const SideBar = () => {
  const router = useRouter();
  const handleLogout = () =>{
    logout();
    router.push('/');
  }

  return (
    <div className="sticky top-40">
      <div className="flex items-center gap-20 mb-20">
        <Image
          className="rounded-full object-cover"
          src="/icon-user.png"
          width={50}
          height={50}
        />
        <div className="flex flex-col">
          <span className="font-semibold">Redi</span>
          <span className="text-xs text-[#b7bac1]">Administrator</span>
        </div>
      </div>
      <ul className="list-none">
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className="font-bold text-sm text-[#b7bac1] mb-2 block">
              {cat.title}
            </span>
            {cat.list.map((item) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>
      <button className="p-5 my-1 flex items-center gap-10 cursor-pointer rounded-lg text-white bg-none border-none w-full hover:bg-gray-700"
        onClick={handleLogout}>
        <MdLogout />
        Logout
      </button>
    </div>
  );
};

export default SideBar;
