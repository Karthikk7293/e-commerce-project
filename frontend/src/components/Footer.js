import React from 'react'
import {Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-dark text-center text-lg-start">
       <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
          <span className='text-white'>Get connected with us on social networks:</span>
        </div>
        <div className='' >
        <Link className='mx-3 h4 text-white' to={'/'}><i class="fa-brands fa-facebook-f"></i></Link>

        <Link className='mx-3 h4 text-white' to={'/'}><i class="fa-brands fa-twitter"></i></Link>
        <Link className='mx-3 h4 text-white' to={'/'}><i class="fa-brands fa-google"></i></Link>
        <Link className='mx-3 h4 text-white' to={'/'}><i class="fa-brands fa-instagram"></i></Link>
          <Link className='mx-3 h4 text-white' to={'/'}> <i class="fa-brands fa-linkedin"></i></Link>
         
        </div>
      </section>

      <section className=''>
        <div className='container text-center text-md-start mt-5'>
          <div className='row mt-3'>
            <div className='col-md-3 col-lg-4 col-xl-3 mx-auto mb-4'>
              <h5 className='text-uppercase text-white fw-bold mb-2 '>
            <img width="50"  className='mx-2' style={{ borderRadius: '50%' }}  src="https://media.istockphoto.com/vectors/running-shoe-heart-symbol-on-white-backdrop-vector-id1212219150?k=20&m=1212219150&s=612x612&w=0&h=HDUBBEueWigtu3f7ne8mZFbJmjtfzGqSdSLIgmw5-Lw=" alt="" />

              {/* <ion-icon name="diamond-sharp"></ion-icon>  */}
              The Shoe Shop
              </h5>
              <p className='text-white'>
              www.TheShoeShop.com has launched with many innovative features to ensure that users get an immersive experience of the buying Online Branded Shoes before visiting a showroom.
              </p>
            </div>

            <div className='col-md-2 col-lg-2 col-xl-2  mx-auto mb-4'>
              <h6 className='text-uppercase text-white fw-bold mb-4'>Products</h6>
              <p className='text-white'>
                <Link className='text-white' to={'/'}>WoodLands</Link>
                
              </p >
              <p className='text-white'>
              <Link className='text-white' to={'/'}>Addidas</Link>

              </p>
              <p className='text-white'>
              <Link className='text-white' to={'/'}>Nike</Link>

              </p>
              <p className='text-white'>
              <Link className='text-white' to={'/'}>Puma</Link>

              </p>
              <p className='text-white'>
              <Link className='text-white' to={'/'}>Bata</Link>

              </p>
            </div>

            {/* <div className='col-md-3 col-lg-2 col-xl-2 mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
              <p>
              <Link to={'/'}>Bata</Link>

              </p>
              <p>
              <Link to={'/'}>Bata</Link>

              </p>
              <p>
              <Link to={'/'}>Bata</Link>

              </p>
              <p>
              <Link to={'/'}>Bata</Link>

              </p>
            </div> */}

            <div className='col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase text-white fw-bold mb-4'>Contact</h6>
              <p>
              <i class="fa-solid fa-location-dot"></i>New York, NY 10012, US
              </p>
              <p>
              <i class="fa-solid fa-envelope"></i>
                info@example.com
              </p>
              <p>
               <ion-icon name="call-outline"></ion-icon> + 01 234 567 88
              </p>
              <p>
              <ion-icon name="print-outline"></ion-icon> + 01 234 567 89
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className='text-center text-white p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2021 Copyright:  Developed By  <Link className='text-info' to={'/'}>KARTHIK</Link><br></br>
       
        <Link className='text-info' to={'/'}> www.theshoeshop.com</Link>

      </div>
   
    </footer>
  )
}

export default Footer                                                                                                 