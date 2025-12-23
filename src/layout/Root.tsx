import { Outlet } from 'react-router';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const Root = () => {
  return (
    <div>
      <Navbar />
      <main className='pt-16 flex-grow'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Root;
