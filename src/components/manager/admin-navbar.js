import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

function AdminNavbar() {
    const navigate = useNavigate();
    const [UserData, setUserData] = useState(
        JSON.parse(localStorage.getItem("UserData"))
    );

    const handleLogout = async () => {
        await localStorage.removeItem("UserData");
        navigate("/");
    };

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container fluid>
                    <Navbar.Brand href="/admin">Admin</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/admin/products">Product</Nav.Link>
                        <Nav.Link href="/admin/brands">Brand</Nav.Link>
                        <Nav.Link href="/admin/categories-collections">
                            Collection
                        </Nav.Link>
                        <Nav.Link href="#pricing">Statistic</Nav.Link>
                    </Nav>
                    <Nav>
                        <NavDropdown
                            title={
                                UserData.UserSurname +
                                " " +
                                UserData.UserLastname
                            }
                            id="navbarScrollingDropdown"
                        >
                            <NavDropdown.Item href="#action3">
                                Account
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={() => handleLogout()}>
                                Log Out
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    );
}

export default AdminNavbar;
