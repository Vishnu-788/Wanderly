// src/components/NavbarComponent.jsx
import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { logout } from "../../../features/authSlice";
import { FaUserCircle } from "react-icons/fa";
import "./header.css";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/auth/logout",
        null,
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        dispatch(logout());
      }
    } catch (error) {
      console.log("Error logiig out user: ", error);
    }
  };

  return (
    <header>
      <Navbar expand="lg" sticky="top" className="travel-navbar">
        <Container>
          <Navbar.Brand as={Link} to="/" className="text-white fw-bold">
            Wanderly
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="travel-navbar-nav" />
          <Navbar.Collapse id="travel-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/" className="nav-item-custom">
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
                    title={
                      <span className="user-dropdown-title">
                        <FaUserCircle className="user-icon" />
                        {user.username || "Profile"}
                      </span>
                    }
                    id="user-nav-dropdown"
                    className="dropdown-custom"
                  >
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
