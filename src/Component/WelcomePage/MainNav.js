import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import AuthContext from "../../Store/auth-context";
import { useContext } from "react";

const MainNav = () => {
  const authCtx = useContext(AuthContext);
  return (
    <header>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/expense">Expense Tracker</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/home">Profile</Nav.Link>
            {!authCtx.islogin && <Nav.Link href="/login">Login</Nav.Link>}
            {!authCtx.islogin && <Nav.Link href="/signup">Signup</Nav.Link>}
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};
export default MainNav;
