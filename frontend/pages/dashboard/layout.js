// dashboard/layout.js
import NavBar from "../../app/components/dashboard/navbar/Navbar";
import SideBar from "../../app/components/dashboard/sidebar/SideBar";

const Layout = ({ children }) => {
  return (
    <div className="flex bg-[#151c2c]">
      <div className="flex-20 bg-[#182237] p-20 min-h-screen text-white">
        <SideBar />
      </div>
      <div className="flex-1 p-5">
        <NavBar />
      </div>
    </div>
  );
};

export default Layout;
