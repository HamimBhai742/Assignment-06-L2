import { Outlet } from 'react-router';
import Navbar from '../components/Navbar/Navbar';

const Root = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <Outlet />
      </main>
    </div>
  );
};

export default Root;
