import React, { useState, useEffect } from 'react';
import './Signin.css'
import { useNavigate, useSearchParams,Link } from 'react-router-dom'
import { Form, Button, Row, Col, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
// import { login } from '../actions/userActions'
import Message from '../components/Message';
import Loader from '../components/Loader';
import axios from 'axios';
import { useAlert } from 'react-alert';

function OtpScreen() {


  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const alert = useAlert()
  const redirect = searchParams.get('redirect') || ''
  const userLogin = useSelector(state => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const [number, setNumber] = useState('')

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate(`/${redirect}`)
    }
  }, [userInfo, redirect,navigate])

  const submitHandler = async(e) => {
    e.preventDefault()

    const userData={
      number
    }

    try {
      const config = {
        headers:{
          "Content-Type":"application/json"
        }
      }

      const {data} = await axios.post("/api/users/otp",userData,config)
   
      if(data.success){
        alert.success(data.message)
        navigate(`/otp/varify/${number}`)
      }
    } catch (error) {
     
      alert.info("User Not found Please register before login !")
    }   
  }

  return (
    <Container>
    <Row>
      <Col xs={12} sm={12} md={6} lg={4} className='m-auto '>
        <div className="text-center my-5 ">
          <div className="screen">
            <div className="screen__content ">
              <Form onSubmit={submitHandler} className="login py-5">
                <h3>log In with otp</h3>
                {error && <Message variant="danger">{error}</Message>}
                {loading && <Loader />}
                
                <div className="login__field px-4">
                  <input value={number} onChange={(e) => setNumber(e.target.value)} type="number" className="login__input w-100 border" placeholder="Please Enter your phone number." />
                </div>
                <div className="login__field px-5">
                  <Button type='submit' className="w-100  my-1  bg-info " >
                    <span className="">Send Message</span>
                  </Button >
                </div>
               
                {/* <div className='    text-center'>
                  <p className=''>Don't have an account?<Link to={'/signup'}  className='text-info h6' >Create New</Link></p>
                </div>  */}
              </Form>
            </div>

          </div>
        </div>
      </Col>
    </Row>
  </Container>
  )
}

export default OtpScreen