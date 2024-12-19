import React, {PropsWithChildren, useState} from "react";
import {
    Alert,
    Button,
    Col,
    Container,
    Form,
    Row
} from "react-bootstrap";

export default function LoginPage(props: PropsWithChildren) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        // Reset error
        setError('');

        // TODO: Implement actual login logic
        console.log('Login attempt with:', {email, password});
    };

    return (
        <Container fluid className="d-flex justify-content-center align-items-center"
                   style={{minHeight: '70vh'}}>
            <Row className="w-100 justify-content-center">
                <Col md={6} lg={4} className="bg-gray-900 p-8 rounded-lg shadow-2xl">
                    <h2 className="text-center text-white mb-6 text-3xl font-bold">Login</h2>

                    {error && (
                        <Alert variant="danger" className="mb-4">
                            {error}
                        </Alert>
                    )}

                    <Form onSubmit={handleSubmit} className="p-2">
                        <Form.Group className="mb-4">
                            <Form.Label className="text-white">Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-white text-black border-gray-300 focus:ring-2 focus:ring-purple-600"
                            />
                        </Form.Group>

                        <Form.Group className="mb-4 relative">
                            <Form.Label className="text-white">Password</Form.Label>
                            <div className="relative">
                                <Form.Control
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="bg-white text-black border-gray-300 focus:ring-2 focus:ring-purple-600 pr-10"
                                />
                                <Button
                                    variant="link"
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-400 hover:text-black p-0"
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </Button>
                            </div>
                        </Form.Group>

                        <div className="flex items-center justify-between mb-4">
                            <Form.Group controlId="formBasicCheckbox" className="flex items-center">
                                <Form.Check
                                    type="checkbox"
                                    label="Remember me"
                                    className="text-white"
                                />
                            </Form.Group>
                            <a href="/forgot-password" className="text-purple-400 hover:text-purple-300">
                                Forgot Password?
                            </a>
                        </div>

                        <Button
                            variant="primary"
                            type="submit"
                            className="w-full py-2 bg-purple-600 hover:bg-purple-700 transition-colors"
                        >
                            Login
                        </Button>

                        <div className="text-center mt-4">
                            <span className="text-white">
                                Don't have an account? {' '}
                                <a href="/subscribe" className="text-purple-400 hover:text-purple-300">
                                    Sign Up
                                </a>
                            </span>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}