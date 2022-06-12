import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Navbar, Container, NavDropdown, Nav } from 'react-bootstrap';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const NavbarComponents = () => {
    const classes = useStyles();

    return (
        <Navbar bg="light" expand="lg" style={{ marginBottom: "10px" }}>
            <Container>
                <Navbar.Brand href="/cryptoHome">Shopiseven</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <NavDropdown title="WebDevelopment" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/services/LandingPage">Landing Page</NavDropdown.Item>
                            <NavDropdown.Item href="/services/CompanyProfile">Company Profile</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Invitation" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/services/DigitalInvitation">Undangan Digital</NavDropdown.Item>
                            <NavDropdown.Item href="/services/DigitalInvitation">Undangan Video</NavDropdown.Item>
                            <NavDropdown.Item href="/demoWeddingWebsite">Undangan Website</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="/cryptoHome">Crypto</Nav.Link>
                        <NavDropdown title="Exchanges" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/exchanges">Crypto Exchanges</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Invitation" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/#">Kontak</NavDropdown.Item>
                            <NavDropdown.Item href="/#">Tentang Us</NavDropdown.Item>
                            <NavDropdown.Item href="/#">Testimoni</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="/login">Login</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarComponents