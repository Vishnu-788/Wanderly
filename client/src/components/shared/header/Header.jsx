// src/components/NavbarComponent.jsx
import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../features/authSlice";
import "./header.css"; // navbar-specific styles

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar expand="lg" sticky="top" className="travel-navbar">
        <Container>
          <Navbar.Brand as={Link} to="/" className="text-white fw-bold">
            ✈️ TravelWise
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="travel-navbar-nav" />
          <Navbar.Collapse id="travel-navbar-nav">
            <Nav className="ms-auto">
              {/* Always visible */}
              <Nav.Link as={Link} to="/tours" className="nav-item-custom">
                Tours
              </Nav.Link>

              {user ? (
                <>
                  <Nav.Link
                    as={Link}
                    to="/bookings"
                    className="nav-item-custom"
                  >
                    Bookings
                  </Nav.Link>
                  <NavDropdown
                    title={user.username || "Profile"}
                    id="user-nav-dropdown"
                    className="nav-item-custom"
                  >
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={handleLogout}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/signin" className="nav-item-custom">
                    Sign In
                  </Nav.Link>
                  <Nav.Link as={Link} to="/signup" className="nav-item-custom">
                    Sign Up
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
