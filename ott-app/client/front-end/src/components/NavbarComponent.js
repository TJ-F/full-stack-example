// NavbarComponent.js
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function NavbarComponent() {
  const { isLoggedIn, user, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleAccount = () => {
    navigate('/account_management');
  };

  const handleAdminDashboard = () => {
    navigate('/admin');
  }

  const getNavLinkClass = ({ isActive }) =>
    isActive ? "btn btn-light mx-1" : "btn btn-success mx-1";

  // Helper to capitalize the first letter
  const capitalizeFirst = (str) =>
    str && typeof str === 'string'
      ? str.charAt(0).toUpperCase() + str.slice(1)
      : str;

  return (
    <Navbar expand="lg" className="custom-navbar" bg="success" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={NavLink} to="/" style={{ cursor: 'pointer' }}>
          Stiles Golf Course
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className={getNavLinkClass}>
              Home
            </NavLink>
            <NavLink to="/tee_times" className={getNavLinkClass}>
              Tee Times
            </NavLink>
            <NavLink to="/course_info" className={getNavLinkClass}>
              Course Info
            </NavLink>
          </Nav>

          <Nav className="ms-auto" style={{ alignItems: 'center' }}>
            {isLoggedIn && user ? (
              <>
                <button
                  className="btn btn-outline-light btn-sm"
                  name='account_management'
                  onClick={handleAccount}
                  style={{ cursor: 'pointer' }}
                >
                  <img
                    alt=""
                    src="/images/person-icon.svg"
                    width="20"
                    height="20"
                    className="d-inline-block align-middle"
                    style={{ filter: 'invert(1)', marginRight: '0.3rem' }}
                  />
                  {user.first_name
                    ? capitalizeFirst(user.first_name)
                    : 'User'}
                </button>
                <button
                  className="btn btn-outline-light btn-sm"
                  name='logout'
                  onClick={handleLogout}
                  style={{ cursor: 'pointer' }}
                >
                  <img
                    alt=""
                    src="/images/person-icon.svg"
                    width="20"
                    height="20"
                    className="d-inline-block align-middle"
                    style={{ filter: 'invert(1)', marginRight: '0.3rem' }}
                  />
                  Logout
                </button>
              </>
            ) : (
              <NavLink to="/login" className={getNavLinkClass}>
                <img
                  alt=""
                  src="/images/person-icon.svg"
                  width="20"
                  height="20"
                  className="d-inline-block align-middle"
                  style={{ filter: 'invert(1)' }}
                />{' '}
                Login
              </NavLink>
            )}
            {(isLoggedIn && (user?.admin === true || user?.admin === 1)) && (
              <button
                className="btn btn-warning btn-sm ms-2"
                name='admin_dashboard'
                onClick={handleAdminDashboard}
                style={{ cursor: 'pointer' }}
              >
                Admin Dashboard
              </button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default NavbarComponent;
