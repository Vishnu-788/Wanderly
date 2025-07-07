import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, FormControl, Button } from "react-bootstrap";

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
    <Form
      onSubmit={handleSearch}
      style={{
        display: "flex",
        alignItems: "center",
        marginLeft: "auto",
        gap: "8px",
        maxWidth: "300px",
      }}
    >
      <FormControl
        type="search"
        placeholder="Search tours..."
        aria-label="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          flex: 1,
          padding: "6px 10px",
          fontSize: "14px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
      <Button
        variant="light"
        type="submit"
        style={{
          fontSize: "14px",
          padding: "6px 12px",
          border: "1px solid #fff",
          borderRadius: "4px",
          backgroundColor: "transparent",
          color: "white",
        }}
      >
        🔍
      </Button>
    </Form>
  );
};

export default NavbarSearch;
