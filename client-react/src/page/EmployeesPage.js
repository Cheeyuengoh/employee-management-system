import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Table from "react-bootstrap/Table";
import AddEmployeeButton from "../components/AddEmployeeButton";
import DeleteEmployeeButton from "../components/DeleteEmployeeButton";
import UpdateEmployeeButton from "../components/UpdateEmployeeButton";
import ViewEmployeeButton from "../components/ViewEmployeeButton";

export default function EmployeesPage() {
    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(process.env.REACT_APP_API_URI + "/employees", {
                    method: "GET"
                });
                const json = await response.json();
                setData(json);
            } catch (error) {
                console.log(error);
            }
        }
        if (!data) fetchData();
    }, [data]);

    if (!data) return (
        <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    );

    return (
        <div>
            <h1>Employees</h1>
            <AddEmployeeButton setData={setData}></AddEmployeeButton>
            <Table hover>
                <thead className="table-dark">
                    <tr className="text-nowrap">
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((employee, index) => {
                        return (
                            <tr key={index}>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.email}</td>
                                <td className="d-flex justify-content-center">
                                    <ViewEmployeeButton id={employee.id}></ViewEmployeeButton>
                                    <UpdateEmployeeButton employee={employee} setData={setData}></UpdateEmployeeButton>
                                    <DeleteEmployeeButton id={employee.id} setData={setData}></DeleteEmployeeButton>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
}