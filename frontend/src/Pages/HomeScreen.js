import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import Products from '../components/Products';
import { Col, Row, Container } from 'react-bootstrap'
import { listProducts } from '../actions/productActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';


const HomeScreen = () => {

  const params = useParams()
  const keyword = params.keyword
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const { loading, error, products } = productList


  useEffect(() => {
    dispatch(listProducts(keyword))

  }, [dispatch, keyword])


  return (<>
  <Meta/>
  <Container fluid>

  
    {!keyword ? (
      <Row>
        <ProductCarousel />

      </Row>
     
    
    ) : (
      <Link to='/' className='btn btn-light m-3'>
      <ion-icon name="caret-back-sharp"></ion-icon>
      </Link>
    )}

    <Row className="pt-3 ">
      <div className="mx-auto">
      <h1>Top Rated Products</h1>
      </div>
      {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
      <Container>
        <Row>
          {products.map(product => (
            
            <Col key={product._id} sm={12} md={6} lg={3} xl={3}>
              <Products product={product}  />
            </Col>
          ))}
        </Row>
        </Container>
      }

    </Row>
   
{/* {!keyword ? (
     <Container className="pt-3">
     <h1>Best Rated Products</h1>
     {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
       <Row>
         {products.map(product => (
           
           <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
             <Products product={product}  />
           </Col>
         ))}
       </Row>
     }
   </Container>
    ) : (
     ""
    )} */}
    
    </Container>
  </>
  )
};

export default HomeScreen;
