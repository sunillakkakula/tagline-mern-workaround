import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
const Header = () => {
  return (
    <div>
      <Navbar bg="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/" style={{ color: "white" }}>
            <Navbar.Brand>Tagline Traders</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to="/cart" style={{ color: "white" }}>
                <Nav.Link>
                  <i className="fas fa-shopping-cart" />
                  Cart
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login" style={{ color: "white" }}>
                <Nav.Link>
                  <i className="fas fa-user" />
                  Login
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
