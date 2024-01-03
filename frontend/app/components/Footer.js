const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-900 text-gray-200">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
      <div className="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-12">         
          <div className="lg:col-span-4 col-span-12 mb-6 md:mb-0">
            <a href="/">
              <img className="h-24" src="./footer-logo.png" alt="" />
            </a>
            <p className="mt-6">
              redi existe para servir como base invisible que optimiza y unifica
              proyectos, líderes y comunidades cuyas acciones son congruentes a
              la experiencia del despertar humano a la consciencia, el amor y la
              dicha.
            </p>
          </div>
          <div className="lg:col-span-2 md:col-span-4 col-span-12">
            <h5 className="tracking-wide text-gray-100 font-semibold">learn</h5>
            <ul className="list-none mt-6 space-y-2">
              <li>
                <a
                  href="#"
                  className="hover:text-gray-400 transition-all duration-500 ease-in-out"
                >
                  blogs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-gray-400 transition-all duration-500 ease-in-out"
                >
                  news
                </a>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-3 md:col-span-4 col-span-12">
            <h5 className="tracking-wide text-gray-100 font-semibold">
              connect
            </h5>
            <ul className="list-none space-y-2 mt-6">
              <li>
                <a
                  href="#"
                  className="hover:text-gray-400 transition-all duration-500 ease-in-out"
                >
                  about us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-gray-400 transition-all duration-500 ease-in-out"
                >
                  contact
                </a>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-3 md:col-span-4 col-span-12">
          <h5 className="tracking-wide text-gray-100 font-semibold">
              social
            </h5>
            <ul className="list-none space-y-2 mt-6">
              <li>
                <a
                  href="#"
                  className="hover:text-gray-400 transition-all duration-500 ease-in-out"
                >
                  tiktok
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-gray-400 transition-all duration-500 ease-in-out"
                >
                  instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-700">
        <div className="md:text-center text-center container mx-auto py-7 px-6">
          <p className="mb-0">
            &copy; guión realidad dicha infinita | ningún derecho reservado © 200,000 a.c. - {currentYear} d.c.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;