import React, { useState, useEffect } from 'react';
import './Signin.css'
import { useNavigate, useSearchParams, useParams } from 'react-router-dom'
import { Form, Button, Row, Col, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message';
import Loader from '../components/Loader';
import axios from 'axios';
import {useAlert} from 'react-alert'
import {loginWithOtp} from '../actions/userActions'

function OtpVarifyScreen() {


  const dispatch = useDispatch();
  const params = useParams()
  const alert = useAlert()
  const userLogin = useSelector(state => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const [code, setCode] = useState('')

  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo) {
      navigate('/')
    }
  }, [userInfo,navigate])

  const submitHandler = async(e) => {
    e.preventDefault()

    const userData={
      code,
      number:params.number
    }

    try {
      const config = {
        headers:{
          "Content-Type":"application/json"
        }
      }

      const {data} = await axios.post("/api/users/otp/varify",userData,config)

      if(data.success){
        alert.success(data.message)
         dispatch(loginWithOtp(data))
      }else{
      alert.error(data.message)
      }
      
    } catch (error) {
      alert.error(error)
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
                <h3>Varify otp</h3>
                {error && <Message variant="danger">{error}</Message>}
                {loading && <Loader />}
                <span className="mobile-text">
                  Enter the code we just send on your mobile number
                  <b className="text-danger">{params.number}</b>
                </span>
                
                <div className="login__field px-4">
                  <input value={code} onChange={(e) => setCode(e.target.value)} type="number" className="login__input w-100 border" placeholder="Please Enter your phone number." />
                </div>
                <div className="login__field px-5">
                  <Button type='submit' className="w-100  my-1  bg-info " >
                    <span className="">Send </span>
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

export default OtpVarifyScreen