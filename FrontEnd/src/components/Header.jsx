import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Header() {
    let user = JSON.parse(localStorage.getItem("user-info"))
    let jwtToken = JSON.parse(localStorage.getItem("jwtToken"))
    const [totalCartItem, setTotalCartItem] = useState(0);
    
    useEffect(() => {
        if(user){
            axios.get(`http://localhost:8080/api/v1/carts/${user.username}/count`,{
            headers: {
                Authorization: `Bearer ${jwtToken}`,
                Accept: "application/json"
            }
           }).then(response => setTotalCartItem(response.data))
           .catch(console.error());
        } 
    },[user])

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">BOOK STORE</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/home">Home</Nav.Link>
          </Nav>
          <Nav>
                {!user ? 
                <>
                    <Form className="d-flex">
                    <Button variant="btn btn-outline-light">
                        <img
                            alt=""
                            src="https://salt.tikicdn.com/ts/upload/51/e2/92/8ca7e2cc5ede8c09e34d1beb50267f4f.png"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />
                        <span className="itemAmount">0</span>
                    </Button>
                    </Form>
                </>:
                <>
                    {user.role === 'USER' ? 
                    <>  
                        <NavDropdown title={`Tài khoản ${ user.firstName} ${user.lastName}`} id="navbarScrollingDropdown">
                        <NavDropdown.Item href="/cart">Đơn hàng của tôi</NavDropdown.Item>
                        <NavDropdown.Item href="/profile">
                            Tài khoản của tôi
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={() => {
                            localStorage.clear();
                            setTimeout(() => {
                                window.location.reload();
                                window.location.href = "localhost:3000/home"
                            }, 500);
                        }}>
                            Đăng xuất
                        </NavDropdown.Item>
                        </NavDropdown>
                        <Form className="d-flex">
                        <Button variant="btn btn-outline-light">
                            <img
                                alt=""
                                src="https://salt.tikicdn.com/ts/upload/51/e2/92/8ca7e2cc5ede8c09e34d1beb50267f4f.png"
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                            />
                            <span className="itemAmount">{totalCartItem}</span>
                        </Button>
                        </Form>
                    
                    </> : 
                    <>  
                        <NavDropdown title="Quản lý người dùng" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="/admin/control/book/-1">Thêm người dùng</NavDropdown.Item>
                            <NavDropdown.Item href="admin/control/user">Danh sách</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Quản lý sách" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="/admin/control/book/-1">Thêm sách</NavDropdown.Item>
                            <NavDropdown.Item href="/admin/control/book">Danh sách</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title={`Tài khoản ${ user.firstName} ${user.lastName}`} id="navbarScrollingDropdown">
                        <NavDropdown.Item onClick={() => {
                            localStorage.clear();
                            setTimeout(() => {
                                window.location.reload();
                            }, 500);
                        }}>
                            Đăng xuất
                        </NavDropdown.Item>
                        </NavDropdown>
                        <Form className="d-flex">
                        <Button variant="btn btn-outline-light">
                            <img
                                alt=""
                                src="https://salt.tikicdn.com/ts/upload/51/e2/92/8ca7e2cc5ede8c09e34d1beb50267f4f.png"
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                            />
                            <span className="itemAmount">{totalCartItem}</span>
                        </Button>
                        </Form>

                    </>}
                </>}

          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Nhập tên sách"
              className="me-2"
              aria-label="Nhập tên sách"
            />
            <button type="button" class="btn btn-outline-success">Tìm</button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;