import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card, Container } from 'react-bootstrap'
import { PayPalButton } from 'react-paypal-button-v2'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import Message from '../components/Message'
import { getOrderDetails, payOrder, deliverOrder, deleteOrder } from '../actions/orderActions'
import Loader from '../components/Loader'
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET, ORDER_PAY_SUCCESS,ORDER_CANCEL_RESET } from '../constants/orderConstants'

const OrderScreen = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const orderId = params.id

    const [sdkReady, setSdkReady] = useState(false);

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    const orderDeliver = useSelector(state => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver

    const orderCancel = useSelector((state) => state.orderCancel)
    const { loading: cancelLoading, success: cancelSuccess } = orderCancel


    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    if (!loading) {
        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2)
        }
        // order.itemsPrice = addDecimals(
        //     order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
        // )
    }


    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement('script')
            script.src = src
            script.onload = () => {
                resolve(true)
            }
            script.onerror = () => {
                resolve(false)
            }
            document.body.appendChild(script)
        })
    }

    async function showRazorpay() {
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

        if (!res) {
            
            alert('Razorpay SDK failed to load. Are you online?')
            return
        }

        const { data } = await axios.post(`/razorpay/${orderId}`)
        const options = {
            key: 'rzp_test_SvG7Lpzf0iHxq2',
            currency: data.currency,
            amount: data.amount.toString(),
            order_id: data.id,
            name: 'THE SHOE SHOP',
            description: 'Make the payment to complete the process',
            image: 'https://media.istockphoto.com/vectors/running-shoe-heart-symbol-on-white-backdrop-vector-id1212219150?k=20&m=1212219150&s=612x612&w=0&h=HDUBBEueWigtu3f7ne8mZFbJmjtfzGqSdSLIgmw5-Lw=',
            handler: async (response) => {
                await axios.post(`/razorpay/success/${orderId}`)
                dispatch({ type: ORDER_PAY_SUCCESS })
                // alert(response.razorpay_payment_id);
                // alert(response.razorpay_order_id);
                // alert(response.razorpay_signature);

                Swal.fire('Transaction successful')
              
            },
            prefill: {
                name: 'karthik',
                email: 'karthikk7293@gmail.com',
                phone_number: '7293103936',
            },
        }
        const paymentObject = new window.Razorpay(options)
        paymentObject.open()
        // dispatch({
        //   type: 'ORDER_DELIVER_SUCCESS',
        // })
    }

    useEffect(() => {
        if (!userInfo) {
            navigate('/signin')
        }

        const addPayPalScript = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }

        // dispatch(getOrderDetails(orderId))
        if (!order || successPay || successDeliver || cancelSuccess || order._id !== orderId) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch({ type: ORDER_DELIVER_RESET })
            dispatch({ type: ORDER_CANCEL_RESET })
            dispatch(getOrderDetails(orderId))
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }
    }, [dispatch, orderId, successPay, successDeliver, order, navigate,cancelSuccess,userInfo])

    const submitPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId, paymentResult))
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }

    const cancelHandler = () => {

        Swal.fire({
            title: 'Are you to want to cancel the order?',
            showCancelButton: true,
            confirmButtonText: 'ok',
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteOrder(order))
              Swal.fire('Order canceled successfully !')
            } 
          })
       
       
    }

    return loading ? <Loader /> : error ? <Message variant='danger'>{error}
    </Message> : <>
        <Container>
            <Row className='pt-2 '>
                <Col sm={12} xs={12}>
                    <h3>Order No:</h3>
                    <p style={{ fontSize: '1.3rem', fontWeight: 'bold', color: 'indigo' }}>{order._id}</p>
                </Col>
            </Row>
            <Row className="my-4">
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item className='shadow'>
                            <h2>Shipping</h2>
                            <p><strong>Name:</strong>{order.user.name}</p>
                            <p>
                                <strong>Email:</strong>
                                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                            </p>
                            <p>
                                <strong>Address:</strong>
                                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                                {order.shippingAddress.postalCode},{' '}
                                {order.shippingAddress.country}
                            </p>
                            {order.isDelivered ? <Message variant="success">Delivered {order.deliveredAt.substring(0,10)}</Message> : (
                                <Message variant="danger">Not Delivered</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item className='shadow'>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? <Message variant="success">Paid on {order.paidAt.substring(0,10)}</Message> : (
                                <Message variant="danger">Not Paid</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item className='shadow'>
                            <h2>Order Items</h2>
                            {order.orderItems.length === 0 ? (
                                <Message>Order is empty</Message>
                            ) : (
                                <ListGroup variant='flush'>
                                    {order.orderItems.map((item, index) => (
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
                                                    {item.qty} x {item.price} = {item.qty * item.price}
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
                            <ListGroup.Item >
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col><i class="fa-solid fa-indian-rupee-sign"></i> {order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col> <i class="fa-solid fa-indian-rupee-sign"></i> {order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col> <i class="fa-solid fa-indian-rupee-sign"></i> {order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col> <i class="fa-solid fa-indian-rupee-sign"></i> {order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            {!order.isPaid && !order.isCancelled && 
                                order.paymentMethod === 'PayPal' && (
                                    <>

                                        <ListGroup.Item>
                                            {loadingPay && <Loader />}
                                            {!sdkReady ? <Loader /> : (
                                                <PayPalButton amount={order.totalPrice} onSuccess={submitPaymentHandler} />
                                            )}
                                        </ListGroup.Item>
                                    </>
                                )}

                            {!order.isPaid && !order.isCancelled  && order.paymentMethod === 'RazorPay' && (
                                <ListGroup.Item>
                                    <Button onClick={showRazorpay} className='btn btn-block round'>Pay with RazorPay</Button>
                                </ListGroup.Item>
                            )}

                            {!order.isCancelled ? (
                                <ListGroup.Item>
                                    <Button
                                        type="button"
                                        className="btn btn-danger btn-block"
                                        onClick={cancelHandler}
                                    >
                                        Cancel the Order
                                    </Button>
                                </ListGroup.Item>
                            ) : (
                                <ListGroup.Item>
                                    <Button type="button" className="btn btn-danger btn-block">
                                        Order Cancelled
                                    </Button>
                                </ListGroup.Item>
                            )}

                            {loadingDeliver && <Loader />}
                            {userInfo &&
                                userInfo.isAdmin &&
                                order.isPaid &&
                                !order.isDelivered && !order.isCancelled && (
                                    <ListGroup.Item>
                                        <Button
                                            type='button'
                                            className='btn btn-block'
                                            onClick={deliverHandler}
                                        >
                                            Mark As Delivered
                                        </Button>
                                    </ListGroup.Item>
                                )}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </Container>
    </>
};

export default OrderScreen;
