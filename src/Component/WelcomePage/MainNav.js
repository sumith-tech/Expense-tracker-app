// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import { useSelector } from "react-redux";

// const MainNav = () => {
//   const islogin = useSelector((state) => state.auth.isloggedin);

//   return (
//     <header>
//       <Navbar bg="dark" data-bs-theme="dark">
//         <Container>
//           <Navbar.Brand href="/expense">Expense Tracker</Navbar.Brand>
//           <Nav className="me-auto">
//             {islogin && <Nav.Link href="/home">Profile</Nav.Link>}
//             {!islogin && <Nav.Link href="/login">Login</Nav.Link>}
//             {!islogin && <Nav.Link href="/signup">Signup</Nav.Link>}
//           </Nav>
//         </Container>
//       </Navbar>
//     </header>
//   );
// };
// export default MainNav;
