import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../features/authSlice";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import "../styles/SignIn.css";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/auth/login",
        { email, password },
        { withCredentials: true }
      );

      const user = res.data.data;
      user.role = res.data.role;
      console.log("user: ", user);
      console.log("res: ", res);

      dispatch(setUser(user));
      navigate("/");
    } catch (err) {
      console.error("Error logging in:", err);
    }
  };

  return (
    <div className="signin-page d-flex align-items-center justify-content-center vh-100">
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="signin-card shadow-lg border-0">
              <Row className="g-0">
                {/* Left side: Form */}
                <Col
                  md={6}
                  className="p-4 d-flex flex-column justify-content-center"
                >
                  <h3 className="mb-4 text-center">Sign In</h3>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100">
                      Sign In
                    </Button>
                  </Form>
                  <p className="mt-3 text-center text-muted">
                    Don’t have an account? <a href="/register">Register</a>
                  </p>
                </Col>

                {/* Right side: Image */}
                <Col
                  md={6}
                  className="signin-text-container d-none d-md-flex align-items-center justify-content-center"
                >
                  <div className="signin-text-content text-black text-center px-4">
                    <h2 className="mb-3">🌍 TravelWise</h2>
                    <p>
                      Discover new places, meet new faces, and make every
                      journey count.
                    </p>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignIn;
