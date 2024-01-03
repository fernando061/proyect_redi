//comoponents/MenuLink
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const MenuLink = ({ item }) => {
  const pathname = usePathname();

  return (
    <Link href={item.path}>
      <div
        className={`p-5 flex items-center gap- my-5 rounded-lg text-white 
          ${pathname === item.path ? 'bg-gray-700 hover:bg-gray-700' : 'hover:bg-gray-700 hover:text-white'}
          ${pathname === item.path ? 'active' : ''}`}
      >
        {item.icon}
        {item.title}
      </div>
    </Link>
  );
};

export default MenuLink;

