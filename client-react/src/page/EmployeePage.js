import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card"
import ListGroup from "react-bootstrap/ListGroup";

export default function EmployeePage() {
    const { id } = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(process.env.REACT_APP_API_URI + "/employees/" + id, {
                    method: "GET"
                });
                const json = await response.json();
                setData(json);
            } catch (error) {
                console.log(error);
            }
        }

        if (!data) fetchData();
    }, [data, id]);

    if (!data) return (
        <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    );

    return (
        <div>
            <Card>
                <Card.Header>
                    <Card.Title>Profile</Card.Title>
                </Card.Header>
                <ListGroup variant="flush">
                    <ListGroup.Item>{data.firstName}</ListGroup.Item>
                    <ListGroup.Item>{data.lastName}</ListGroup.Item>
                    <ListGroup.Item>{data.email}</ListGroup.Item>
                </ListGroup>
            </Card>
        </div>
    );
}