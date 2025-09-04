import { Outlet } from 'react-router';
import SideBar from '../components/SideBar/SideBar';

const DashBoard = () => {
  return (
    <div>
      <SideBar />
      <Outlet/>
    </div>
  );
};

export default DashBoard;
