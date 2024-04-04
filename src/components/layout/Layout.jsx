import { Outlet } from 'react-router-dom';
import Header from '../header/Header';
import { Container } from 'react-bootstrap';
import './layout.css';

const Layout = () => {
  return (
    <div className='main-sec'>
      <Header />
      <Container>
        <Outlet />
      </Container>
    </div>
  );
}

export default Layout;
