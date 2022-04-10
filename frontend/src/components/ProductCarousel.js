import React, { useEffect, useState } from 'react'
import { Carousel, Image,Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import { listTopProducts } from '../actions/productActions'
import images  from './image'
const ProductCarousel = () => {

    const dispatch = useDispatch()
    const productTopRated = useSelector((state) => state.productTopRated)
    const { loading, error, products } = productTopRated


    useEffect(() => {
        dispatch(listTopProducts())
    }, [dispatch])

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
        <Container className='py-4  'fluid  style={{height:"450px" ,overflowY:"hidden"}}>
            <Carousel indicators={false} controls={false} pause='hover' className='rounded w-100' >
                {images.map((item) => (
                    <Carousel.Item  className=" product-carosel w-100 text-left"  >
                       
                           

                            <Image src={item.image} width={"100%"} height={"600"}  style={{marginTop:"-110px"}} />
                            
                            <Carousel.Caption className='carousel-capton mt-5 text-end pt-5 text-left  '>
                                <p style={{color:"#ffffff" , fontSize:"4rem" ,fontWeight:"900", marginLeft:"-6rem",fontFamily:"sans-serif"}} className="py-5 my-5 text-uppercase"  >
                                   {item.title}
                                </p>
                            </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
        </Container>
    )
}

export default ProductCarousel