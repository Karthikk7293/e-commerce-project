import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../actions/userActions'
import { LinkContainer } from 'react-router-bootstrap'
import SearchBar from './SearchBar';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import './header.css'
const Header = () => {

  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const navigate = useNavigate()

  const logoutHandler = (e) => {
    e.preventDefault();
   
    Swal.fire({
      title: 'Do you want to logout?',
      showCancelButton: true,
      confirmButtonText: 'Log out',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logout())
        navigate('/signin')
        Swal.fire('Logged out successfully !')
      } 
    })
  }

  return (
    <header>
      <Navbar
       
        style={{ backgroundColor: 'rgb(27 38 48)', minHeight: '4rem' }}
        expand="lg"
        collapseOnSelect
        className='p-0 px-2'
      >
        <Container fluid className='shadow' >
        <LinkContainer to="/" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5rem',borderRadius:"50%" }}>
            <img width="50"  src="https://media.istockphoto.com/vectors/running-shoe-heart-symbol-on-white-backdrop-vector-id1212219150?k=20&m=1212219150&s=612x612&w=0&h=HDUBBEueWigtu3f7ne8mZFbJmjtfzGqSdSLIgmw5-Lw=" alt="" />
          </LinkContainer>

          <LinkContainer to="/" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5rem' }}>
            <Navbar.Brand className='ml-1 text-uppercase '><span>TheShopShop</span></Navbar.Brand>
            
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav text-white" />
          <Navbar.Collapse id="basic-navbar-nav">

            <Nav className='mx-auto ' >
              <Nav.Link className='my-auto px-3' >
                {/* <Link  className="text-white" to={'/search/Boots'}>Boots</Link> */}
              </Nav.Link>
              <Nav.Link className="text-white my-auto px-3">
              {/* <Link  className="text-white my-auto" to={'/search/Casuals'}>Casuals</Link> */}
              </Nav.Link>
              
              <Nav.Link className="text-white my-auto mx-3">
              <SearchBar />
              </Nav.Link>

              <LinkContainer
                className="px-3"
                style={{ color: 'white' }}
                to="/cart"
              >
                <Nav.Link className='my-auto text-right'>
                  <i className="fas fa-shopping-cart"></i> Cart
                </Nav.Link>
                
              </LinkContainer>
              <LinkContainer
                className="px-3"
                style={{ color: 'white' }}
                to="/wishlist"
              >
                <Nav.Link className='my-auto text-right'>
                <i class="fa-solid fa-heart"></i> Wishlist
                </Nav.Link>
                
              </LinkContainer>
              {userInfo ? (
                userInfo.isAdmin ? "":(<NavDropdown
                  className="px-3 text-light text-right "
                  title={
                    <img  alt="Remy Sharp" className='my-auto'  style={{ borderRadius: '50%' }}src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=50" ></img>
   
                  }
                  id="username"
                >
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>)
              
              ) : (
                <LinkContainer style={{ color: 'white' }} to="/signin">
                  <Nav.Link className="my-auto  ">
                    <i className="fas fa-user"></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown
                  className=" py-auto text-right"
                  title={
                    <img  alt="Remy Sharp" className='my-auto'  style={{ borderRadius: '50%' }}src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=50" ></img>
                  }
                  id="adminmenu"
                >
                 
                   <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/dashboard">
                    <NavDropdown.Item>Dashboard</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>

                  {/* <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer> */}

                  <LinkContainer to="/admin/offers">
                    <NavDropdown.Item>Offers </NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/categories">
                    <NavDropdown.Item>Categories</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Order Report</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/salesreport">
                    <NavDropdown.Item>Sales Report</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/signin">
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                  </LinkContainer>

                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>


  )
};

export default Header;
