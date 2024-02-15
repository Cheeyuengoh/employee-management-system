import { useState } from "react";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export default function AddEmployeeButton({ setData }) {
    const [showModal, setShowModal] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [validated, setValidated] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        const form = e.currentTarget;
        if (form.checkValidity()) {
            try {
                const response = await fetch(process.env.REACT_APP_API_URI + "/employees/add", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ firstName, lastName, email })
                });
                const json = await response.json();
                setData((prevData) => {
                    let nextData = [...prevData];
                    nextData.push(json);
                    return nextData;
                });
                setShowModal(false);
                setValidated(false);
            } catch (error) {
                console.log(error);
            }
        }

        setValidated(true);
    }

    function handleCloseModal() {
        setShowModal(false);
        setValidated(false);
    }

    return (
        <div>
            <OverlayTrigger placement="top" overlay={<Tooltip variant="light">Add new employee</Tooltip>}>
                <Button onClick={() => setShowModal(true)} className="float-start mx-2 mb-2"><svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 4a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2h-6v6a1 1 0 1 1-2 0v-6H5a1 1 0 1 1 0-2h6V5a1 1 0 0 1 1-1z" fill="#0D0D0D" /></svg></Button>
            </OverlayTrigger>

            <Modal centered show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>New Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label htmlFor="inputFirstName">First Name</Form.Label>
                            <Form.Control
                                id="inputFirstName"
                                type="text"
                                required
                                onChange={(e) => setFirstName(e.target.value)}>
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">Please provide a first name</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="inputLastName">Last Name</Form.Label>
                            <Form.Control
                                id="inputLastName"
                                type="text"
                                required
                                onChange={(e) => setLastName(e.target.value)}>
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">Please provide a last name</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="inputEmail">Email</Form.Label>
                            <Form.Control
                                id="inputEmail"
                                type="email"
                                placeholder="example@gmail.com"
                                required
                                onChange={(e) => setEmail(e.target.value)}>
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">Please provide a valid email</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="float-end d-flex gap-2 my-2">
                            <Button onClick={handleCloseModal} variant="light">Cancel</Button>
                            <Button type="submit">Add</Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}