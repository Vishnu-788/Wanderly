import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../features/authSlice";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import "../styles/Signform.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${BASE_URL}/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      const user = res.data.data;
      user.role = res.data.role;
      dispatch(setUser(user));
      navigate("/");
    } catch (err) {
      console.error("Error logging in:", err);
      // you could set an error state here for UI feedback
    }
  };

  return (
    <div className="signin-page d-flex align-items-center justify-content-center min-vh-100">
      <Container>
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <Card className="signin-card shadow border-0">
              <Row className="g-0">
                {/* ───── Form side ───── */}
                <Col md={6} className="p-4">
                  <h3 className="mb-4 text-center text-primary">
                    Sign in to <span className="fw-bold">WanderLy</span>
                  </h3>

                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100">
                      Sign In
                    </Button>
                  </Form>

                  <p className="mt-3 text-center text-muted small">
                    Don’t have an account?{" "}
                    <Link to="/signup" className="text-decoration-none">
                      Register
                    </Link>
                  </p>
                </Col>

                {/* ───── Accent / brand side ───── */}
                <Col
                  md={6}
                  className="d-none d-md-flex signin-accent flex-column align-items-center justify-content-center text-center"
                >
                  <h2 className="display-6 fw-bold mb-3">🌍 WanderLy</h2>
                  <p className="px-4">
                    Discover new places, meet new faces, and make every journey
                    count.
                  </p>
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
