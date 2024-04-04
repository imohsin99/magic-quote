import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Auth from './components/users/auth/Auth';
import Quote from './components/quotes/Quote.jsx';
import Users from './components/users/Users';
import ProtectedRoutes from './utils/ProtectedRoutes';
import Tag from "./components/tags/Tag.jsx";
import MagicQuote from './components/layout/MagicQuote';
import SignUp from './components/users/auth/SignUp';
import Report from './components/reports/Report';
import AdminLayout from "./components/layout/AdminLayout.jsx";

function App() {
  return (
    <div className='main-sec'>
      <Routes>
        <Route path='/auth' element={<Auth />} />
        <Route
          path='/'
          element={
            <ProtectedRoutes>
              <Layout />
            </ProtectedRoutes>
          }
        >
          <Route path='users' element={<Users />} />
          <Route path='home' element={<MagicQuote />} />
          <Route path='quote/*' element={<Quote />} />
          <Route path='tags' element={<Tag />} />
          <Route path='/userProfile' element={<SignUp />} />
          <Route path='/reports' element={<Report />} />
        </Route>

        <Route path='/admin' element={
            <ProtectedRoutes>
                <AdminLayout />
            </ProtectedRoutes>
        }>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
