import { Outlet } from 'react-router';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const Root = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="pt-16 flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Root;
