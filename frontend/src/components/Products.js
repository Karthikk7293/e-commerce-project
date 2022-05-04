import React from 'react';
import { useAlert } from 'react-alert';
import { Card ,Button} from 'react-bootstrap'   
import { useDispatch } from 'react-redux';
import {Link} from 'react-router-dom'    
import { addToCart } from '../actions/cartActions';
import {removeFromWislist} from '../actions/wishlistAction'
import Rating from './Rating'
import './products.css'                                                                                             

const Products = ({product,wishlist}) => {

  const dispatch = useDispatch()
  const alert = useAlert()

  const addToCartHandler = (id,qty) => {
    alert.success("item added to cart !")
    dispatch(addToCart(id,qty))

  }

  const removeFromWishlistHandler = (id)=>{
    alert.success("Item removed from wishlist!")
    dispatch(removeFromWislist(id))
  }

  return (
    // <div className="pt-2">

          
          <Card className="rounded my-3 p-1 productCard shadow mb-3" style={{minHeight:'20rem'}} >
            <Card.Text as='h4' className='productText' style={{color:'green'}}>
                {product.discountPrice > 0 ? <>{product.discountPrice}% OFF</>:null}
                {wishlist && wishlist ? (<Button
                        type='button'
                        variant='none'
                        className='text-danger'
                        onClick={((e) => removeFromWishlistHandler(product.product))}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>) : ""}
                </Card.Text>
                <div className="product-image mx-auto" style={{height:"11rem",width:"100%", overflowY:"hidden" , overflowX:"hidden"}}>
                {wishlist && wishlist ? (
                   <Link to={`/product/${product.product}`} >
                   <Card.Img src={product.image} variant='top' />
                   </Link>
                ) :(
                  <Link to={`/product/${product._id}`} style={{width:"25rem"}} className="product-image-img" >
                  <Card.Img src={product.image} variant='top'  />
                  </Link>
                ) }
                </div>
                
               
            <Card.Body className='p-1'>
              {wishlist && wishlist? (
                 <Card.Title className='text-right' as='div'><strong className='text-muted  text-uppercase'>{product.name}</strong></Card.Title>
              ):(
                <Card.Title className='text-left' as='div'><strong className='text-primary  text-uppercase'>{product.name}</strong></Card.Title>
              ) }
             
              <Card.Text as='div' className='d-flex justify-content-between'>
                   <Rating value={product.rating} />
                   <p className='bold '>{product.numReviews} Reviews</p>
                </Card.Text>
              <Card.Text as='h5'>
                {/* {product.discountPrice > 0 ? <strike>(${product.price})</strike>:null} */}
                </Card.Text>
              <Card.Text as='h5' className="d-flex justify-content-between">
                {product.discountPrice > 0  ? <><i class="fa-solid fa-indian-rupee-sign">{Math.floor(product.price - (product.price * (product.discountPrice/100)))}</i> </>
                : <><i class="fa-solid fa-indian-rupee-sign">{product.price}</i></>}
                
               {product.price && product.discountPrice>0 ? <del className='text-muted h6 '><i class="fa-solid fa-indian-rupee-sign"><strike>{product.price}</strike></i></del> : "" }
              </Card.Text>
              <Card.Text className=' w-100 btn  mx-auto  py-3 text-white h6 text-center bg-info' onClick={((e)=>addToCartHandler(product._id,1)) } disabled={product.countInStock === 0}>addToCart</Card.Text>

            </Card.Body>

            
          </Card>
         
    // </div>
  )
};

export default Products;
