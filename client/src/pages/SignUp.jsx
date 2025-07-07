import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Alert,
} from "react-bootstrap";
import { BASE_URL } from "../utils/constants";
import "../styles/Signform.css";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${BASE_URL}/auth/register`,
        { username, email, password },
        { withCredentials: true }
      );

      const user = res.data.data;
      user.role = res.data.role;

      dispatch(setUser(user));
      navigate("/");
    } catch (err) {
      console.log(err);

      setError(err.response.data.message);
      // Optional: set an error state for UI
    }
  };

  return (
    <div className="signin-page d-flex align-items-center justify-content-center min-vh-100">
      <Container>
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <Card className="signin-card shadow border-0">
              <Row className="g-0">
                {/* ───── Left: Registration Form ───── */}
                <Col md={6} className="p-4">
                  <h3 className="mb-4 text-center text-primary">
                    Create your <span className="fw-bold">WanderLy</span>{" "}
                    account
                  </h3>
                  {error && (
                    <Alert variant="danger" className="mx-3">
                      {error}
                    </Alert>
                  )}
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formUsername">
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </Form.Group>

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
                      Register
                    </Button>
                  </Form>

                  <p className="mt-3 text-center text-muted small">
                    Already have an account?{" "}
                    <a href="/signin" className="text-decoration-none">
                      Sign In
                    </a>
                  </p>
                </Col>

                {/* ───── Right: Brand Section ───── */}
                <Col
                  md={6}
                  className="signin-accent d-none d-md-flex flex-column align-items-center justify-content-center text-center"
                >
                  <h2 className="display-6 fw-bold mb-3">
                    🌍 Welcome to WanderLy
                  </h2>
                  <p className="px-4">
                    Create your account and start your next unforgettable
                    adventure.
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

export default SignUp;
