import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {  Container, Row, Col, Tab, Nav, Card } from 'react-bootstrap'
import {
    BarChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Bar,
    Legend,
    Tooltip,
    CartesianGrid
  } from 'recharts'

const DashBoard = () => {

    const [data, setData] = useState({ categoryReport: null })
    const [orderData, setOrderData] = useState([])
    const [userData, setUserData] = useState([])

    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }

    useEffect(() => {
        const getUnitsSold = async () => {
            const { data } = await axios.get('/api/products/report/products')
            setData(data)
        }
        const getOrderData = async () => {
            const { data } = await axios.get('/api/orders/report/orders')
            setOrderData(data)
        }
        const getUserData = async () => {
            const { data } = await axios.get('/api/users/report/users')
            setUserData(data)
        }
        getUnitsSold()
        getOrderData()
        getUserData()
    }, [])


  const sample =[
    {
      name: 'Year',
      paid: orderData && orderData.totalPrice,
      unpaid: orderData && orderData.paidprice,
      total: orderData && orderData.unpaid,
    }]
    // console.log(sample)

    return (
        <>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first" >
                <Row>
                    <Col xs={12} md={2} className=' text-start' style={{minHeight:"80vh"}} >
                            <Row>
                                <Nav justify variant="pills" className="pt-4 mt-5 bg-white" style={{ cursor: 'pointer' }}>
                                    <Nav.Item  className='text-left' >
                                        <Nav.Link eventKey="first" className='font-weight-bold '>SALES</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item  className='text-left'>
                                        <Nav.Link eventKey="second" className='font-weight-bold'>PRODUCTS</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item className='text-left'>
                                        <Nav.Link eventKey="third" className='font-weight-bold'>USERS</Nav.Link>
                                    </Nav.Item>
                                    
                                </Nav>
                            </Row>
                    </Col>
                    <Col xs={12} md={9}>
                     <Container>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <Container>
                                    <Row className="align-items-center justify-content-center pt-3">
                                        <h1>Sales Overview</h1>
                                    </Row>
                                    <Row className="align-items-center justify-content-center pt-3">
                                        <Col lg={4} md={6} xs={12} className='m-auto'>
                                            <Card className='m-1 font-weight-bold rounded-4 shadow p-3 bg-white d-flex flex-column align-items-center justify-content-center'>
                                                <Card.Body>
                                                    <Card.Text className='text-center'>
                                                        <Card.Text as="div">Total Revenue</Card.Text>
                                                        <Card.Text as="div">{addDecimals(orderData.totalPrice)}</Card.Text>
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col lg={4} md={6} xs={12}>
                                            <Card className='m-1 font-weight-bold rounded-4 shadow p-3 bg-white d-flex flex-column align-items-center justify-content-center'>
                                                <Card.Body>
                                                    <Card.Text className='text-center'>
                                                        <Card.Text as="div">Total Paid</Card.Text>
                                                        <Card.Text as="div">{addDecimals(orderData.paidprice)}</Card.Text>
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col lg={4} md={6} xs={12}>
                                            <Card className='m-1 font-weight-bold rounded-4 shadow p-3 bg-danger text-white d-flex flex-column align-items-center justify-content-center'>
                                                <Card.Body>
                                                    <Card.Text className='text-center'>
                                                        <Card.Text as="div">Total Unpaid</Card.Text>
                                                        <Card.Text as="div">{addDecimals(orderData.unpaid)}</Card.Text>
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col lg={4} md={6} xs={12}>
                                            <Card className='m-1 font-weight-bold rounded-4 shadow p-3 bg-white d-flex flex-column align-items-center justify-content-center'>
                                                <Card.Body>
                                                    <Card.Text className='text-center'>
                                                        <Card.Text as="div">Total Orders</Card.Text>
                                                        <Card.Text as="div">{addDecimals(orderData.totalOrders)}</Card.Text>
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col lg={4} md={6} xs={12}>
                                            <Card className='m-1 font-weight-bold rounded-4 shadow p-3 bg-white d-flex flex-column align-items-center justify-content-center'>
                                                <Card.Body>
                                                    <Card.Text className='text-center'>
                                                        <Card.Text as="div">Total Paid Orders</Card.Text>
                                                        <Card.Text as="div">{addDecimals(orderData.paidOrdersNumber)}</Card.Text>
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col lg={4} md={6} xs={12}>
                                            <Card className='m-1 font-weight-bold rounded-4 shadow p-3 bg-danger text-white d-flex flex-column align-items-center justify-content-center'>
                                                <Card.Body>
                                                    <Card.Text className='text-center'>
                                                        <Card.Text as="div">Total Unpaid Orders</Card.Text>
                                                        <Card.Text as="div">{addDecimals(orderData.unpaidOrdersNumber)}</Card.Text>
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                    <Container>
                                    <h3 className="text-center pt-4">Monthly Sales</h3>
                                    <ResponsiveContainer width="75%" height={400} className="m-auto">
                                        <BarChart data={sample}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Bar dataKey="total" fill="#8884d8" />
                                            <Bar dataKey="unpaid" fill="#82ca9d" />
                                            <Bar dataKey="paid" fill="#e63d00" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                    </Container>

                                    <Container>
                                    <h3 className="text-center pt-4">Quantity Sold</h3>
                                    <ResponsiveContainer width="75%" height={400} className="m-auto">
                                        <BarChart data={sample}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Bar dataKey="total" fill="#8884d8" />
                                            <Bar dataKey="unpaid" fill="#82ca9d" />
                                            <Bar dataKey="paid" fill="#e63d00" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                    </Container>
                                </Container>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <Row className="align-items-center justify-content-center pt-3">
                                    <h2>Products Overview</h2>
                                </Row>
                                <Row className="align-items-center justify-content-center pt-3">
                                    <Col lg={4} md={6} xs={12}>
                                        <Card className='m-1 font-weight-bold rounded-4 shadow p-3 bg-white d-flex flex-column align-items-center justify-content-center'>
                                            <Card.Body>
                                                <Card.Text className='text-center'>
                                                    <Card.Text as="div">Total Products</Card.Text>
                                                    <Card.Text as="div">{data.productCount}</Card.Text>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                                <Row className="align-items-center justify-content-center  text-center pt-3">
                                   <Container><h4>Categorywise Product Overview</h4></Container> 
                                </Row>
                                <Row className="align-items-center justify-content-center pt-3">
                                    {data.categoryReport && data.categoryReport.map((categoryReports) =>
                                        <Col lg={4} md={6} xs={12}>
                                            <Card className='m-1 font-weight-bold rounded-4 shadow p-3 bg-white d-flex flex-column align-items-center justify-content-center'>
                                                <Card.Body>
                                                    <Card.Text className='text-center'>
                                                        <Card.Text as="div">{categoryReports.category}</Card.Text>
                                                        <Card.Text as="div">{categoryReports.qty}</Card.Text>
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    )}
                                </Row>
                            </Tab.Pane>
                            <Tab.Pane eventKey="third">
                                <Row className="align-items-center justify-content-center pt-3">
                                    <h1>Users Overview</h1>
                                </Row>
                                <Row className="align-items-center justify-content-center pt-3">
                                    <Col lg={4} md={6} xs={12}>
                                        <Card className='m-1 font-weight-bold rounded-4 shadow p-3 bg-white d-flex flex-column align-items-center justify-content-center'>
                                            <Card.Body>
                                                <Card.Text className='text-center'>
                                                    <Card.Text as="div">Total Users</Card.Text>
                                                    <Card.Text as="div">{userData.usersCount}</Card.Text>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col lg={4} md={6} xs={12}>
                                        <Card className='m-1 font-weight-bold rounded-4 shadow p-3 bg-white d-flex flex-column align-items-center justify-content-center'>
                                            <Card.Body>
                                                <Card.Text className='text-center'>
                                                    <Card.Text as="div">Blocked Users</Card.Text>
                                                    <Card.Text as="div">{userData.blockedUsersCount}</Card.Text>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </Tab.Pane>
                        </Tab.Content>
                        </Container>
                    </Col>
                </Row>
            </Tab.Container>
        </>
    )
}

export default DashBoard