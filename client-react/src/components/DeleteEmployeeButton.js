import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Modal from "react-bootstrap/Modal";

export default function DeleteEmployeeButton({ id, setData }) {
    const [showModal, setShowModal] = useState(false);
    const [confirm, setConfirm] = useState(false);

    useEffect(() => {
        async function deleteData() {
            try {
                const response = await fetch(process.env.REACT_APP_API_URI + "/employees/delete/" + id, {
                    method: "DELETE"
                });
                const json = await response.json();
                setData((prevData) => {
                    let nextData = [...prevData];
                    let index = nextData.findIndex((employee) => {
                        return employee.id === json.id
                    });
                    nextData.splice(index, 1);
                    return nextData;
                });
                setConfirm(false);
                setShowModal(false);
            } catch (error) {
                console.log(error);
            }
        }

        if (confirm) deleteData();
    }, [confirm, id, setData]);

    function handleClick() {
        setConfirm(true);
    }

    return (
        <div>
            <OverlayTrigger placement="top" overlay={<Tooltip>Delete employee</Tooltip>}>
                <Button onClick={() => setShowModal(true)} className="mx-1" variant="danger"><svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2h4a1 1 0 1 1 0 2h-1.069l-.867 12.142A2 2 0 0 1 17.069 22H6.93a2 2 0 0 1-1.995-1.858L4.07 8H3a1 1 0 0 1 0-2h4V4zm2 2h6V4H9v2zM6.074 8l.857 12H17.07l.857-12H6.074zM10 10a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1z" fill="#0D0D0D" /></svg></Button>
            </OverlayTrigger>
            <Modal centered show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this employee?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setShowModal(false)} variant="light">Cancel</Button>
                    <Button onClick={handleClick} variant="danger">Delete</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}