import React, {PropsWithChildren, useState} from "react";
import {
    Col,
    Container,
    Row
} from "react-bootstrap";
import chat_zerveme from "../../../assets/chat_zerveme.png";


export default function ContactUsPage(props: PropsWithChildren) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        inquiryType: 'Question',
        message: ''
    });

    const handleChange = (e: any) => {
        const {name, value} = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        // Handle form submission here
        console.log(formData);
    };

    return (
        <Container fluid className="w-96">
            <Row className="py-4 py-xl-5">
                <Col sm={6}>
                    <img src={chat_zerveme} alt="Contact us"
                         className="w-82 h-82 object-cover rounded-md mt-8 ml-auto mr-auto"/>
                </Col>
                <Col sm={6}>
                    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
                        <div className="mb-6">
                            <label htmlFor="name" className="block text-sm font-medium text-white">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="email" className="block text-sm font-medium text-white">Email
                                address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                required
                            />
                            <p className="mt-2 text-sm text-gray-500">We'll never share your email with anyone else.</p>
                        </div>

                        <div className="mb-6">
                            <label htmlFor="phone" className="block text-sm font-medium text-white">Phone
                                number</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="inquiryType" className="block text-sm font-medium text-white">Inquiry
                                Type</label>
                            <select
                                id="inquiryType"
                                name="inquiryType"
                                value={formData.inquiryType}
                                onChange={handleChange}
                                className="mt-1 block w-full py-2 pl-3 pr-10 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                required
                            >
                                <option value="Question">Question</option>
                                <option value="Request">Request</option>
                            </select>
                        </div>

                        <div className="mb-6">
                            <label htmlFor="message"
                                   className="block text-sm font-medium text-white">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                rows={3}
                                value={formData.message}
                                onChange={handleChange}
                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                required
                            />
                        </div>

                        <button type="submit"
                                className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Submit
                        </button>
                    </form>
                </Col>
            </Row>
        </Container>
    )
}