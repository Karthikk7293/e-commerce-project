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
        <Container className='my-4  'fluid  style={{minHeight:"60vh" ,overflowY:"hidden"}}>
            <Carousel indicators={false} controls={false} pause='hover' className='rounded w-100' style={{height:"0px" }}  >
                {images.map((item) => (
                    <Carousel.Item  className="w-100 text-left"  >

                            <Image src={item.image} width={"100%"}    />
                            
                            <Carousel.Caption className='carousel-capton  text-end  text-left py-5 mt-5 '>
                                <p style={{color:"#ffffff" , fontSize:"4rem" ,fontWeight:"900",fontFamily:"monospace", letterSpacing:"-2px"}} className=" text-uppercase"  >
                                   {item.title}
                                </p>
                                <span style={{color:"#000000" , fontSize:"1.5rem" ,fontWeight:"900",fontFamily:"sans-serif"}} className="  text-capitalize"  >
                                   {item.des}
                                </span>
                            </Carousel.Caption>
                            <Carousel.Caption className='  text-end text-left  '>
                                <p style={{color:"#ffffff" , fontSize:"2rem" ,fontWeight:"900", fontFamily:"sans-serif"}} className=" text-uppercase "  >
                                   {item.head}
                                </p>
                            </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
        </Container>
    )
}

export default ProductCarousel