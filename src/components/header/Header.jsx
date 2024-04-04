import { Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import capitalize from '../../utils/capitalize';
import { logout } from '../../features/usersSlice';

const Header = () => {

    const currentUser = useSelector((state) => state.users.currentUser);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout(currentUser.id));
    }

    return (
      <Navbar bg='dark' data-bs-theme='dark'>
        <Navbar.Brand className='ms-5' as={Link} to={currentUser.role === 'admin' ? '/admin' : '/home'}>
          MagicQuote
        </Navbar.Brand>
        {currentUser.role === 'admin' ? (
          <Nav className='me-auto nav-underline'>
              <Nav.Link as={Link} to='/users'>Users</Nav.Link>
              <Nav.Link as={Link} to='/quote'>Quotes</Nav.Link>
              <Nav.Link as={Link} to='/tags'>Tags</Nav.Link>
              <Nav.Link as={Link} to='/reports'>Reports</Nav.Link>
          </Nav>
        ) : (
          <Nav className='me-auto nav-underline'>
            <Nav.Link as={Link} to='/home'>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to='/quote'>
              Quotes
            </Nav.Link>
            <Nav.Link as={Link} to='/users'>
              Users
            </Nav.Link>
            <Nav.Link as={Link} to='/tags'>
              Tags
            </Nav.Link>
            <Nav.Link as={Link} to='/reports'>
              Reports
            </Nav.Link>
          </Nav>
        )}
        <Nav className='me-5'>
          {currentUser ? (
            <NavDropdown
              title={capitalize(currentUser.username)}
              id='navbarScrollingDropdown'
            >
              <NavDropdown.Item as={Link} to='/userProfile'>
                Profile
              </NavDropdown.Item>
              <NavDropdown.Item onClick={handleLogout}>
                Log Out
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <Nav.Link as={Link} to='/auth'>
              Login
            </Nav.Link>
          )}
        </Nav>
      </Navbar>
    );
}

export default Header;
