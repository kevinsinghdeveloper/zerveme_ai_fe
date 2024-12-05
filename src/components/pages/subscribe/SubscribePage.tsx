import React, {useState} from 'react';
import {
    Container,
    Row,
    Col,
    Form,
    Button,
    Alert
} from 'react-bootstrap';

// Enum for organization sizes
enum OrgSize {
    SMALL = '1-10 Employees',
    MEDIUM = '11-50 Employees',
    LARGE = '51-200 Employees',
    ENTERPRISE = '200+ Employees'
}

export default function SubscribePage() {
    // Personal Information State
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    // Organization Information State
    const [organizationName, setOrganizationName] = useState('');
    const [orgSize, setOrgSize] = useState<OrgSize | ''>('');

    // Contact Information State
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');

    // Form Validation State
    const [errors, setErrors] = useState<string[]>([]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors: string[] = [];

        // Validation checks
        if (!firstName.trim()) validationErrors.push('First Name is required');
        if (!lastName.trim()) validationErrors.push('Last Name is required');
        if (!email.trim()) validationErrors.push('Email is required');
        if (!organizationName.trim()) validationErrors.push('Organization Name is required');
        if (!orgSize) validationErrors.push('Organization Size is required');

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email)) {
            validationErrors.push('Invalid email format');
        }

        // Phone number validation (basic)
        const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
        if (phoneNumber && !phoneRegex.test(phoneNumber)) {
            validationErrors.push('Invalid phone number format');
        }

        // Set errors or proceed with submission
        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Clear any previous errors
        setErrors([]);

        // Prepare submission data
        const registrationData = {
            personalInfo: {firstName, lastName},
            organizationInfo: {
                name: organizationName,
                size: orgSize
            },
            contactInfo: {
                email,
                phone: phoneNumber,
                address: {
                    street: address,
                    city,
                    state,
                    zipCode
                }
            }
        };

        // TODO: Implement actual registration logic
        console.log('Registration Data:', registrationData);
        // Typically, you would send this to your backend API
    };

    return (
        <Container fluid className="d-flex justify-content-center align-items-center" style={{minHeight: '100vh'}}>
            <Row className="w-100 justify-content-center">
                <Col md={8} lg={6} className="bg-gray-900 p-8 rounded-lg shadow-2xl">
                    <h2 className="text-center text-white mb-6 text-3xl font-bold">Create Your Account</h2>

                    {errors.length > 0 && (
                        <Alert variant="danger">
                            <ul className="mb-0">
                                {errors.map((error, index) => (
                                    <li key={index}>{error}</li>
                                ))}
                            </ul>
                        </Alert>
                    )}

                    <Form onSubmit={handleSubmit}>
                        {/* Personal Information Section */}
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="text-white">First Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter first name"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className="bg-white text-black"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="text-white">Last Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter last name"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        className="bg-white text-black"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        {/* Organization Information Section */}
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="text-white">Organization Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter organization name"
                                        value={organizationName}
                                        onChange={(e) => setOrganizationName(e.target.value)}
                                        className="bg-white text-black"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="text-white">Organization Size</Form.Label>
                                    <Form.Select
                                        value={orgSize}
                                        onChange={(e) => setOrgSize(e.target.value as OrgSize)}
                                        className="bg-white text-black"
                                    >
                                        <option value="">Select Organization Size</option>
                                        {Object.values(OrgSize).map((size) => (
                                            <option key={size} value={size}>{size}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>

                        {/* Contact Information Section */}
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="text-white">Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="bg-white text-black"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="text-white">Phone Number</Form.Label>
                                    <Form.Control
                                        type="tel"
                                        placeholder="Enter phone number"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        className="bg-white text-black"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        {/* Address Information Section */}
                        <Form.Group className="mb-3">
                            <Form.Label className="text-white">Street Address</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter street address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="bg-white text-black"
                            />
                        </Form.Group>

                        <Row>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="text-white">City</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter city"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        className="bg-white text-black"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="text-white">State</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter state"
                                        value={state}
                                        onChange={(e) => setState(e.target.value)}
                                        className="bg-white text-black"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="text-white">Zip Code</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter zip code"
                                        value={zipCode}
                                        onChange={(e) => setZipCode(e.target.value)}
                                        className="bg-white text-black"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Button
                            variant="primary"
                            type="submit"
                            className="w-full py-2 bg-purple-600 hover:bg-purple-700 transition-colors mt-3"
                        >
                            Register
                        </Button>

                        <div className="text-center mt-3">
                            <span className="text-white">
                                Already have an account? {' '}
                                <a href="/login" className="text-purple-400 hover:text-purple-300">
                                    Log In
                                </a>
                            </span>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}