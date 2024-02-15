import { useState } from "react";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export default function UpdateEmployeeButton({ employee, setData }) {
    const [showModal, setShowModal] = useState(false);
    const [firstName, setFirstName] = useState(employee.firstName);
    const [lastName, setLastName] = useState(employee.lastName);
    const [email, setEmail] = useState(employee.email);
    const [validated, setValidated] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        const form = e.currentTarget;
        if (form.checkValidity()) {
            try {
                const response = await fetch(process.env.REACT_APP_API_URI + "/employees/update/" + employee.id, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ firstName, lastName, email })
                });
                const json = await response.json();
                setData((prevData) => {
                    let nextData = [...prevData];
                    let index = nextData.findIndex((employee) => {
                        return employee.id === json.id
                    });
                    nextData[index] = json;
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
            <OverlayTrigger placement="top" overlay={<Tooltip>Update employee</Tooltip>}>
                <Button onClick={() => setShowModal(true)} className="mx-1"><svg fill="#000000" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M5,12A7,7,0,0,1,16.89,7H14a1,1,0,0,0,0,2h5.08A1,1,0,0,0,20,8V3a1,1,0,0,0-2,0V5.32A9,9,0,0,0,3,12a1,1,0,0,0,2,0Z"></path><path d="M20,11a1,1,0,0,0-1,1A7,7,0,0,1,7.11,17H10a1,1,0,0,0,0-2H4.92A1,1,0,0,0,4,16v5a1,1,0,0,0,2,0V18.68A9,9,0,0,0,21,12,1,1,0,0,0,20,11Z"></path></svg></Button>
            </OverlayTrigger>

            <Modal centered show={showModal} onHide={handleCloseModal}>
                <Modal.Header>
                    <Modal.Title>Update Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label htmlFor="inputFirstName">First Name</Form.Label>
                            <Form.Control
                                id="inputFirstName"
                                type="text"
                                value={firstName}
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
                                value={lastName}
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
                                value={email}
                                required
                                onChange={(e) => setEmail(e.target.value)}>
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">Please provide a valid email</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="float-end d-flex gap-2 my-2">
                            <Button onClick={handleCloseModal} variant="light">Cancel</Button>
                            <Button type="submit">Update</Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}