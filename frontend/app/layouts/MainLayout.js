// layouts/MainLayout.js
import Header from '../components/Header';
import Footer from '../components/Footer';

const MainLayout = ({ children, setShowBlogs, setShowEvents, setShowNews }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header
        setShowBlogs={setShowBlogs}
        setShowEvents={setShowEvents}
        setShowNews={setShowNews}
      />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
