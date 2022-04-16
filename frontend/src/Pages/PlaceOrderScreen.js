import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckOutSteps'
import { createOrder } from '../actions/orderActions'
import { getUserDetails } from '../actions/userActions'
import { USER_DETAILS_RESET } from '../constants/userConstants'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'

const PlaceOrderScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const cart = useSelector((state) => state.cart)

    const userDetails = useSelector(state => state.userDetails)
    const {
        //  loading,
          error:detailsError, 
          user } = userDetails
    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }

    let walletUsed=0;
    if(Number(cart.itemsPrice)+Number(cart.shippingPrice)-(user.wallet) > 0){
        walletUsed=Number(user.wallet)
    }else{
        walletUsed=Number(cart.itemsPrice)+Number(cart.shippingPrice)
    }

    cart.itemsPrice = addDecimals(
        cart.cartItems.reduce((acc, item) => acc +
            (item.discountPrice
                ? item.price -
                item.discountPrice * 0.01 * item.price
                : item.price) *
            item.qty, 0)
    )

    cart.shippingPrice = addDecimals(cart.itemsPrice < 100 ? 0 : 100)
    cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))
    cart.totalPrice = (
        Number(cart.itemsPrice) +
        Number(cart.shippingPrice) +
        Number(cart.taxPrice)-
        Number(walletUsed) 
    ).toFixed(2)

    const orderCreate = useSelector(state => state.orderCreate)
    const { order, success, error } = orderCreate

    useEffect(() => {
        if(!user.name){
        dispatch(getUserDetails('profile'))
        }
        if(success) {
            navigate(`/order/${order._id}`)
      dispatch({ type: USER_DETAILS_RESET})
      dispatch({ type: ORDER_CREATE_RESET})
        }
    }, [navigate,success,dispatch,order,user.name])


    const placeOrderHandler = () => {
        dispatch(
            createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice,
                walletDiscount: walletUsed,
            })
        )  
    }

    return (
        <>
            <Container>
                <CheckoutSteps step1 step2 step3 step4 />
                <Row >
                    <Col md={8} >
                        <ListGroup variant='flush' className='shadow'>
                            <ListGroup.Item>
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Address:</strong>
                                    {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                                    {cart.shippingAddress.postalCode},{' '}
                                    {cart.shippingAddress.country}
                                </p>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h2>Payment Method</h2>
                                <strong>Method: </strong>
                                {cart.paymentMethod}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h2>Order Items</h2>
                                {cart.cartItems.length === 0 ? (
                                    <Message>Your cart is empty</Message>
                                ) : (
                                    <ListGroup variant='flush'>
                                        {cart.cartItems.map((item, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image
                                                            src={item.image}
                                                            alt={item.name}
                                                            fluid
                                                            rounded
                                                        />
                                                    </Col>
                                                    <Col>
                                                        <Link to={`/product/${item.product}`}>
                                                            {item.name}
                                                        </Link>
                                                    </Col>
                                                    <Col md={4}>
                                                          {item.qty} x 
                                                           {item.discountPrice
                                                            ? item.price -
                                                            item.discountPrice *
                                                            0.01 *
                                                            item.price
                                                            : item.price}= 
                                                             <i class="fa-solid fa-indian-rupee-sign"></i> {item.qty *
                                                            (item.discountPrice
                                                            ? item.price -
                                                            item.discountPrice *
                                                            0.01 *
                                                            item.price
                                                            : item.price)}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={4}>
                        <Card className='shadow'>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h2>Order Summary</h2>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Items</Col>
                                        <Col> <i class="fa-solid fa-indian-rupee-sign"></i>{cart.itemsPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Wallet Discount</Col>
                                        <Col> <i class="fa-solid fa-indian-rupee-sign"></i>{walletUsed}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Shipping</Col>
                                        <Col> <i class="fa-solid fa-indian-rupee-sign"></i>{cart.shippingPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Tax</Col>
                                        <Col> <i class="fa-solid fa-indian-rupee-sign"></i>{cart.taxPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Total</Col>
                                        <Col> <i class="fa-solid fa-indian-rupee-sign"></i>{cart.totalPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    {error && <Message variant='danger'>{error}</Message>}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Button
                                        type='button'
                                        className='btn-block bg-info'
                                        disabled={cart.cartItems === 0}
                                        onClick={placeOrderHandler}
                                    >
                                        Place Order
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
};

export default PlaceOrderScreen;
