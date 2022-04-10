import React, { useState, useEffect } from 'react';
// import './Signin.css'
import { Button, Form,Row,Col } from 'react-bootstrap'
import { useNavigate ,Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../actions/userActions'
import Message from '../components/Message';
import Loader from '../components/Loader';

const SignUp = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [number, setNumber] = useState('')
    const [confirmpassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)
    const [refferalId, setRefferalId] = useState('')

    const dispatch = useDispatch();
    const userRegister = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userRegister

    useEffect(() => {
        if (userInfo) {
            navigate('/')
        }
    }, [navigate, userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        // console.log(email,password)
        if (password !== confirmpassword) {
            setMessage('Passwords do not match')
        }
        else {
            dispatch(register(name,number ,email, password, refferalId))
            navigate('/')
        }
    }


    return (
        <Row>
            <Col xs={12} sm={12} md={6} lg={4} className='m-auto '>
                <div className="text-center my-3">
                    <div className="screen">
                        <div className="screen__content">

                            <Form onSubmit={submitHandler} className="login py-5 ">
                                {message && <Message variant="danger">{message}</Message>}
                                {error && <Message variant="danger">{error}</Message>}
                                {loading && <Loader />}
                                <h3>Register</h3>
                                <div className="login__field">
                                    <i className="login__icon fas fa-user"></i>
                                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="login__input" placeholder="Name" required />
                                </div>
                                <div className="login__field">
                                <i class="login__icon fa-solid fa-phone"></i>
                                    <input value={number} onChange={(e) => setNumber(e.target.value)} type="text" className="login__input" placeholder="Number" required />
                                </div>
                                
                                <div className="login__field">
                                    <i className="login__icon fas fa-envelope"></i>
                                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="login__input" placeholder="Email" required />
                                </div>
                                
                                <div className="login__field">
                                    <i className="login__icon fas fa-lock"></i>
                                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="login__input" placeholder="Password" required />
                                </div>
                                <div className="login__field">
                                    <i className="login__icon fas fa-lock"></i>
                                    <input value={confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" className="login__input" placeholder="Confirm Password" required />
                                </div>
                                <div className="login__field">
                                    <i className="login__icon fas fa-user"></i>
                                    <input value={refferalId} onChange={(e) => setRefferalId(e.target.value)} type="text" className="login__input" placeholder="Have a referral id ?!" />
                                </div>
                                 <div className="login__field px-5 pt-3">
                                 <Button type='submit' className="button m-auto bg-info text-center w-100 ">
                                    <span className="">Register</span>
                                </Button>
                                    </div>
                                
                                <div className='d-flex align-items-center pl-5 '>
                                    <p className='mb-0 me-2'>Already have an account?<Link to={'/signin'}  className='text-info h6' > Log In</Link></p>
                                   
                                </div>
                            </Form>

                        </div>
                       
                    </div>
                </div>
            </Col>
        </Row>
    )
};

export default SignUp;
