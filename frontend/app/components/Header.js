import { useRouter } from 'next/router';
import React, { useState, useEffect } from "react";
import Link from "next/link";
import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import LoginForm from "./LoginForm";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const Header = () => {
  const router = useRouter();
  const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showBlogs, setShowBlogs] = useState(false);

  const handleClick = () => {
    console.log("Clicked!");
    setIsOpen(!isOpen);
    setShowBlogs(!showBlogs);
  };
  const toggleLoginForm = () => {
    setIsLoginFormOpen(!isLoginFormOpen);
  };

  useEffect(() => {
    if (showBlogs) {
      // Verifica si ya estamos en la página de inicio antes de redirigir
      if (router.pathname !== '/') {
        router.push('/');
        console.log('showBlogs inside useEffect:', showBlogs);
      }
    }
  }, [showBlogs, router]);

  return (
    <>
      <nav className="bg-white">
        <div className="flex justify-between items-center mx-auto max-w-screen-xl p-4">
          {/* Logo centered */}
          <div className="mx-auto space-x-3 rtl:space-x-reverse logo-container">
            <img src="./logo.png" className="h-9 my-0" alt="Your Logo" />
          </div>

          <div className=" hidden md:flex items-center space-x-6 rtl:space-x-reverse">
            <button
              type="button"
              data-dropdown-toggle="language-dropdown-menu"
              className="inline-flex items-center font-medium justify-center px-4 py-2 text-sm text-white
              rounded-lg cursor-pointer bg-black hover:bg-gray-800"
            >
              English (US)
            </button>
            <button
              type="button"
              className="flex items-center text-black bg-white border border-black font-medium rounded-lg text-sm px-4 py-2 dark:hover:bg-blue-700 hover:text-white hover:border-blue-700"
            >
              <Link href="/login">
                <div className="flex items-center">
                  <span>Login</span>
                  <img
                    src="/user_icon.svg"
                    className="w-5 h-5 rounded-full ml-2"
                    alt="User Icon"
                  />
                </div>
              </Link>
            </button>
          </div>
        </div>
      </nav>

      <nav className="bg-black">
        <div className="max-w-screen-xl px-4 py-3 mx-auto">
          <div className="flex items-center justify-start">
            <ul className="hidden md:flex font-semibold text-1xl lg:text-[20px]">
              <li className="mr-4 lg:mr-8 text-white hover:text-blue-700">
                <Link href="/">
                  <span>Home</span>
                </Link>
              </li>
              <li
                onClick={ handleClick }
                className="mr-4 lg:mr-8 text-white hover:text-blue-700"
              >
                <Link href="/">
                  <span>blogs</span>
                </Link>
              </li>
              <li className="mr-4 lg:mr-8 text-white hover:text-blue hover:text-blue-700">
                <Link href="/events">
                  <span>events</span>
                </Link>
              </li>
              <li className="mr-4 lg:mr-8 text-white hover:text-blue-700">
                <Link href="/news">
                  <span>news</span>
                </Link>
              </li>
            </ul>
            <div onClick={handleClick} className="flex md:hidden text-white">
              {isOpen ? (
                <AiOutlineClose size={25} className="text-white" />
              ) : (
                <AiOutlineMenu size={25} className="text-white" />
              )}
            </div>
            <div
              className={
                isOpen
                  ? "md:hidden absolute top-[100px] right-0 bottom-0 left-0 flex justify-center items-center w-full h-screen bg-slate-800 text-white text-center ease-in duration-300"
                  : "md:hidden absolute top-[100px] right-0 left-[-100%] flex justify-center items-center w-full h-screen bg-slate-800 text-white text-center ease-in duration-300"
              }
            >
              <div className="w-full">
                <ul className="font-bold text-2xl">
                  <li
                    onClick={handleClick}
                    className="py-5 hover:text-blue-600 cursor-pointer"
                  >
                    <Link href="/">
                      <span>Home</span>
                    </Link>
                  </li>
                  <li
                    onClick={() => {
                      handleClick();
                      handleBlogsClick();
                    }}
                    className="py-5 hover:text-blue-600 cursor-pointer"
                  >
                    <Link href="/">
                      <span>blogs</span>
                    </Link>
                  </li>
                  <li
                    onClick={handleClick}
                    className="py-5 hover:text-blue-600 cursor-pointer"
                  >
                    <Link href="/">
                      <span>event</span>
                    </Link>
                  </li>
                  <li
                    onClick={handleClick}
                    className="py-5 hover:text-blue-600 cursor-pointer"
                  >
                    <Link href="/">
                      <span>news</span>
                    </Link>
                  </li>
                </ul>
                <div className="flex flex-col justify-center items-center mt-16">
                  <button
                    type="button"
                    onClick={() => {
                      handleClick();
                      toggleLoginForm();
                    }}
                    className="flex justify-center items-center text-white bg-blue-700 font-medium rounded-lg text-sm px-4  dark:hover:bg-blue-700 hover:text-white hover:border-blue-700
                    py-3 w-[250px] mb-5"
                  >
                    Login
                    <img
                      src="/user_icon.svg"
                      className="w-5 h-5 rounded-full ml-2"
                      alt="User Icon"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {isLoginFormOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          {/* Renderiza el componente de formulario de inicio de sesión */}
          <LoginForm onClose={() => setIsLoginFormOpen(false)} />
        </div>
      )}
    </>
  );
};

export default Header;
