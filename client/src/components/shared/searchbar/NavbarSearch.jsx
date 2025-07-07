import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { FaSearch } from "react-icons/fa"; // 🔍 classy search icon
import "./searchbar.css";

const NavbarSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = searchTerm.trim();
    if (!trimmed) return;

    const [city, groupSize, distance] = trimmed.split(" ");

    navigate(
      `/search?city=${city}&maxGroupSize=${groupSize || 1}&distance=${
        distance || 0
      }`
    );

    setSearchTerm("");
  };

  return (
    <Form onSubmit={handleSearch} className="navbar-search-form">
      <input
        type="text"
        placeholder="Search tours..."
        aria-label="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="navbar-search-input"
      />
      <button type="submit" className="navbar-search-button">
        <FaSearch />
      </button>
    </Form>
  );
};

export default NavbarSearch;
