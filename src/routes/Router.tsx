import { createBrowserRouter } from 'react-router';
import Root from '../layout/Root';
import DashboardLayout from '../layout/DashboardLayout';
import Home from '../pages/Home/Home';
import About from '../pages/About/About';
import Features from '../pages/Features/Features';
import Contact from '../pages/Contact/Contact';
import FAQ from '../pages/FAQ/FAQ';
import Privacy from '../pages/Privacy/Privacy';
import Terms from '../pages/Terms/Terms';
import Register from '../pages/Register/Register';
import Login from '../pages/Login/Login';
import Overview from '../pages/Dashboard/UserDashboard/Overview/Overview';
import Deposit from '../pages/Dashboard/UserDashboard/Deposit/Deposit';
import Withdraw from '../pages/Dashboard/UserDashboard/Withdraw/Withdraw';
import SendMoney from '../pages/Dashboard/UserDashboard/SendMoney/SendMoney';
import Transactions from '../pages/Dashboard/UserDashboard/Transactions/Transactions';
import Profile from '../pages/Dashboard/UserDashboard/Profile/Profile';
import AgentOverview from '../pages/Dashboard/AgentDashboard/AgentOverview/Overview';
import CashIn from '../pages/Dashboard/AgentDashboard/CashIn/CashIn';
import CashOut from '../pages/Dashboard/AgentDashboard/CashOut/CashOut';
import ProtecedRoutes from './ProtecedRoutes';
import AgentTransactions from '../pages/Dashboard/AgentDashboard/AgentTransactions/AgentTransactions';
import AgentProfile from '../pages/Dashboard/AgentDashboard/AgentProfile/AgentProfile';
import AdminOverview from '../pages/Dashboard/AdminDashboard/Overview/Overview';
import ManageAgents from '../pages/Dashboard/AdminDashboard/ManageAgents/ManageAgents';
import ManageUsers from '../pages/Dashboard/AdminDashboard/ManageUsers/ManageUsers';
import AllTransactions from '../pages/Dashboard/AdminDashboard/Transactions/Transactions';
import AdminProfile from '../pages/Dashboard/AdminDashboard/Profile/Profile';
import AdminProtectedRoute from './AdminProtected';
import AgentProtectedRoute from './AgentProtected';
import UserProtectedRoute from './UserProtected';
import Compliance from '@/pages/Compliance/Compliance';
import ForgotPassword from '@/pages/ForgotPassword/ForgotPassword';
import Blogs from '@/pages/Blogs/Blogs';
import BlogDetails from '@/pages/Blogs/BlogDetails';
import ManageBlogs from '@/pages/ManageBlogs/ManageBlogs';
import UserReviews from '@/pages/Dashboard/UserDashboard/Reviews/UserReviews';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'about',
        Component: About,
      },
      {
        path: 'features',
        Component: Features,
      },
      {
        path: 'contact',
        Component: Contact,
      },
      {
        path: 'faq',
        Component: FAQ,
      },
      {
        path: 'privacy&policy',
        Component: Privacy,
      },
      {
        path: 'terms',
        Component: Terms,
      },
      {
        path: 'compliance',
        Component: Compliance,
      },
      {
        path: 'blogs',
        Component: Blogs,
      },
      {
        path: 'blog/:slug',
        Component: BlogDetails,
      },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <ProtecedRoutes>
        <UserProtectedRoute>
          <DashboardLayout />
        </UserProtectedRoute>
      </ProtecedRoutes>
    ),
    children: [
      {
        index: true,
        Component: Overview,
      },
      {
        path: 'deposit',
        Component: Deposit,
      },
      {
        path: 'withdraw',
        Component: Withdraw,
      },
      {
        path: 'send',
        Component: SendMoney,
      },
      {
        path: 'transactions',
        Component: Transactions,
      },
      {
        path: 'profile',
        Component: Profile,
      },
      {
        path: 'review',
        Component: UserReviews,
      },
    ],
  },
  {
    path: '/agent-dashboard',
    element: (
      <ProtecedRoutes>
        <AgentProtectedRoute>
          <DashboardLayout />
        </AgentProtectedRoute>
      </ProtecedRoutes>
    ),
    children: [
      {
        index: true,
        Component: AgentOverview,
      },
      {
        path: 'cash-in',
        Component: CashIn,
      },
      {
        path: 'cash-out',
        Component: CashOut,
      },
      {
        path: 'transactions',
        Component: AgentTransactions,
      },
      {
        path: 'profile',
        Component: AgentProfile,
      },
    ],
  },
  {
    path: '/admin-dashboard',
    element: (
      <ProtecedRoutes>
        <AdminProtectedRoute>
          <DashboardLayout />
        </AdminProtectedRoute>
      </ProtecedRoutes>
    ),
    children: [
      {
        index: true,
        Component: AdminOverview,
      },
      {
        path: 'users',
        Component: ManageUsers,
      },
      {
        path: 'agents',
        Component: ManageAgents,
      },
      {
        path: 'all-transactions',
        Component: AllTransactions,
      },
      {
        path: 'profile',
        Component: AdminProfile,
      },
      {
        path: 'manage-blogs',
        Component: ManageBlogs,
      },
    ],
  },
  {
    path: '/register',
    Component: Register,
  },
  {
    path: '/login',
    Component: Login,
  },
  {
    path: '/forgot-password',
    Component: ForgotPassword,
  },
]);
