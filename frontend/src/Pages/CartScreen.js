import React, { useEffect } from 'react';
import { Link, useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button, Card, Container } from 'react-bootstrap'
import Swal from 'sweetalert2/dist/sweetalert2.js'

import { addToCart, removeFromCart } from '../actions/cartActions'
import Message from '../components/Message'

const CartScreen = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const qty = useSearchParams()[0].get('qty')
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)
  const { cartItems } = cart

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty])

  const removeFromCartHandler = (id) => {
    Swal.fire({
      title: 'Are you sure to want to remove the item from your cart?',
      showCancelButton: true,
      confirmButtonText: 'remove',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeFromCart(id));
        Swal.fire('item removed successfully !')
      } 
    })
   
  }

  const checkoutHandler = () => {
    navigate('/signin?redirect=shipping')
  }

  return (
    <Container className='pt-3'>
      <Link to='/' className='btn btn-light m-3'>
      <ion-icon name="caret-back-sharp"></ion-icon>
      </Link>
      <Row>
      
        <Col md={8}>
          <h1 className='text-dark '>Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <Message>
              Your cart is empty 
            </Message>
          ) : (
            <ListGroup variant='flush'>
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product} className="my-1 shadow rounded">
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>
                    <i class="fa-solid fa-indian-rupee-sign"></i> {item.discountPrice > 0
                        ? (item.price -
                        item.discountPrice * 0.01 * item.price) +
                        `(${item.discountPrice}% off)`
                        : item.price}
                    </Col>
                    <Col md={2}>
                      <Form.Control
                        as='select'
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        type='button'
                        variant='light'
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card className='shadow rounded' style={{minHeight:"50vh" , display:"flex ", flexDirection:"column" , }}>
            <ListGroup variant='flush' className='py-3'>
              <ListGroup.Item>
                <h2>
                  Subtotal ({cartItems.reduce((acc, item) => Number(acc) + Number(item.qty), 0)})
                  items
                </h2>
               
                <i class="fa-solid fa-indian-rupee-sign"></i>
                {cartItems
                  .reduce((acc, item) => acc + item.qty * (
                    item.discountPrice>0
                      ? item.price -
                      item.discountPrice * 0.01 * item.price
                      : item.price),
                    0)
                  .toFixed(2)}
              
               
              </ListGroup.Item>
              <ListGroup.Item className='mt-5' >
                <Button
                  type='button'
                  className='btn-block mt-5'
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  )
};

export default CartScreen;
