import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import {  useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Products from "../components/Products";
function WishListScreen() {
  
  const { wishlist } = useSelector((state) => state.wishlist);

  return (
    <div>
      <Container>
        <Link to='/' className='btn btn-light m-3'>
      <ion-icon name="caret-back-sharp"></ion-icon>
      </Link>
        <Row>
        
          {wishlist && wishlist.length !== 0 ? (
            wishlist.map((item) => (
              <Col key={item.product} sm={12} md={6} lg={4} xl={3}>
                <Products product={item} wishlist />
              </Col>
            ))
          ) : (
            <div className="text-center col-12 mt-5">
              <img
                src="https://aquamarineexotic.com/adminpanel/assets/images/empty-wishlist.png"
                alt=""
              />
            </div>
          )}
        </Row>
      </Container>
    </div>
  );
}

export default WishListScreen;
