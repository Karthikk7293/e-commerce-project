import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem, Container, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import {
  listProductDetails,
  createProductReview,
} from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Rating from '../components/Rating'
import ReactImageMagnify from 'react-image-magnify'
import Meta from '../components/Meta'
import { addToCart } from '../actions/cartActions'
import { addToWishList } from '../actions/wishlistAction'
// import Rating from '../components/Rating'
// import axios from 'axios'



const Product = () => {

  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const alert = useAlert();

  const [qty, setQty] = useState(1)
  const [mainImage, setMainImage] = useState()

  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productReviewCreate = useSelector((state) => state.productReviewCreate)
  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProductReview,
  } = productReviewCreate


  useEffect(() => {
    if (successProductReview) {
      setRating(0)
      setComment('')
      dispatch(listProductDetails(params.id))
    }
    if (!product._id || product._id !== params.id) {
      dispatch(listProductDetails(params.id))
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
  }, [dispatch,product._id,params,successProductReview])

  const addToCartHandler = () => {
    dispatch(addToCart(params.id,qty))
    alert.success("item added to cart !")
  }

  const addTowishlistHandler = ()=>{
    dispatch(addToWishList(params.id,qty))
    alert.success("item added to wishlist !")

  }



  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createProductReview(params.id, {
        rating,
        comment,
      })
    )
  }

  return (
    <Container className='pt-3' >
      <Link to='/' className='btn btn-light m-3'>
      <ion-icon name="caret-back-sharp"></ion-icon>
      </Link>
      {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
        <>
        <Meta title={product.name} />
          <Row>
            <Col md={6}>
              <Card>
                {/* <Image src={mainImage} alt={product.name} fluid /> */}
                <ReactImageMagnify
                  className="sample"
                  {...{
                    smallImage: {
                      alt: 'Product Image',
                      isFluidWidth: true,
                      src: mainImage ? mainImage : product.image,
                    },
                    largeImage: {
                      src: mainImage ? mainImage : product.image,
                      width: 1200,
                      height: 1200,
                    },
                  }}
                />
                <Row>
                  {product.images && product.images.length > 0 && (
                    <Col className='m-auto'>
                      <Image
                        onClick={(e) => {
                          e.preventDefault()
                          setMainImage(product.image)
                        }}
                        src={product.image}
                        alt={product.name}
                        fluid
                        height='200'
                        width='150'
                        rounded
                        className='ml-auto'
                      />
                    </Col>
                  )}

                  {product.images &&
                    product.images.length > 0 &&
                    product.images.map((image) => {
                      return (
                        <Col className='m-auto'>
                          <Image
                            onClick={(e) => {
                              e.preventDefault()
                              setMainImage(image.url)
                            }}
                            src={image.url}
                            alt={image.name}
                            fluid
                            height='200'
                            width='150'
                            rounded
                            className='ml-auto'
                          />
                        </Col>
                      )
                    })}
                </Row>
              </Card>
            </Col>
            <Col md={6}>
              <ListGroup variant='flush'>
                <ListGroupItem>
                  <h3>{product.name}</h3>
                </ListGroupItem>
                <ListGroupItem>
                  <h4>{product.brand}</h4>
                </ListGroupItem>
                <ListGroupItem className='h6'>
                  <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                </ListGroupItem>

                {product.discountPrice > 0 ? (
                  <ListGroupItem className='h6'>
                    <strike>Price:$ {product.price}</strike>
                  </ListGroupItem>)
                  : null}

                {product.discountPrice > 0 ?
                  (<ListGroupItem><strong>{product.discountPrice} % OFF </strong></ListGroupItem>)
                  : null}
                <ListGroupItem className='h6'>
                <span className='text-secondary'> Price:</span><strong>{product.discountPrice > 0
                    ? product.price - (product.price * (product.discountPrice / 100))
                    : product.price}
                  </strong>
                </ListGroupItem>
                <ListGroupItem className='h6'>
                 <span className='text-secondary'> Size:</span>{product.size}
                </ListGroupItem>
                <ListGroupItem className='h6'>
                 <span className='text-secondary'> Description:</span>{product.description}
                </ListGroupItem>
              </ListGroup>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroupItem className='h6'>
                    <Row>
                      <Col>
                        Price:
                      </Col>
                      <Col>
                        <strong>{product.discountPrice > 0
                          ? product.price - (product.price * (product.discountPrice / 100))
                          : product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroupItem>

                  <ListGroupItem className='h6'>
                    <Row>
                      <Col>
                        Status:
                      </Col>
                      <Col>
                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                      </Col>
                    </Row>
                  </ListGroupItem>
                  {product.countInStock > 0 && (
                    <ListGroupItem className='h6'>
                      <Row>
                        <Col>Quantity</Col>
                        <Col>
                          <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                            {
                              [...Array(product.countInStock).keys()].map(x => (
                                <option key={x + 1} value={x + 1} >{x + 1}</option>
                              ))
                            }
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroupItem>
                  )}
                  <ListGroupItem className='d-flex'>
                  <Button onClick={addToCartHandler} className='mx-auto px-5 bg-info' type='button' disabled={product.countInStock === 0}>Add To Cart</Button>
                    <Button onClick={addTowishlistHandler} className='mx-auto px-4 bg-info' type='button' disabled={product.countInStock === 0}>Add To Favorites</Button>
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
            
          </Row>
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {successProductReview && (
                    <Message variant='success'>
                      Review submitted successfully
                    </Message>
                  )}
                  {loadingProductReview && <Loader />}
                  {errorProductReview && (
                    <Message variant='danger'>{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingProductReview}
                        type='submit'
                        variant='primary'
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/signin'>sign in</Link> to write a review{' '}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </Container>
  )
};

export default Product;
