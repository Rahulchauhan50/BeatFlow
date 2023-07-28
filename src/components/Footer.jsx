import React from 'react'

export default function Footer() {
  return (
    <>    
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      <footer style={{position:"relative",bottom:"0px"}} className={`text-center mt-20 text-white`}>
        <section className="justify-between lg:justify-between p-4 border-b" style={{justifyContent: "center",display: "flex"}}>
          <div style={{display: "flex",justifyContent: "space-between",width: "80%"}}>
            <a rel="noreferrer noopener" target='_blank' href="https://wa.me/9625809384" className="me-4">
              <i className="fa fa-whatsapp fa-1x"></i>
            </a>
            <a rel="noreferrer noopener" target='_blank' href="https://www.facebook.com/profile.php?id=100013005587099&mibextid=ZbWKwL" className="me-4">
              <i className="fa fa-facebook-f fa-1x"></i>
            </a>
            <a rel="noreferrer noopener" target='_blank' href="/" className="me-4">
              <i className="fa fa-twitter fa-1x"></i>
            </a>
            <a rel="noreferrer noopener" target='_blank' href="mailto:rahulchauhah50@gmail.com" className="me-4">
              <i className="fa fa-envelope fa-1x"></i>
            </a>
            <a rel="noreferrer noopener" target='_blank' href="https://www.linkedin.com/in/rahul-chauhan-939102208" className="me-4">
              <i className="fa fa-linkedin fa-1x"></i>
            </a>
            <a rel="noreferrer noopener" target='_blank' href="https://github.com/Rahulchauhan50" className="me-4">
              <i className="fa fa-github fa-1x"></i>
            </a>
            <a rel="noreferrer noopener" target='_blank' href="sms:+91 9625809384" className="me-4">
                <strong className="fa fa-comments-o fa-1x"></strong>
            </a>
            <a rel="noreferrer noopener" target='_blank' href="tel:+91 9625809384" className="me-4">
            <strong className="fa fa-phone fa-1x"></strong>
            </a>
          </div>
        </section>
      
        <section className="">
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="mx-auto mb-4">
                <h6 className="mb-4">
                  <i className="fa fa-gem me-3"></i>Spotify - By Rahul
                </h6>
                <p>
                  Here you can Discover a universe of music at your fingertips with our groundbreaking music app.
                </p>
              </div>
      
              <div className="mx-auto md:mb-0 mb-4">
                <h6 className="my-4">Contact</h6>
                <p><i className="fa fa-home me-3 my-3"></i> New York, NY 10012, US</p>
                <p>
                  <i className="fa fa-envelope me-3 my-3"></i>
                  Rahulchauhah50@gmail.com
                </p>
                <p><i className="fa fa-phone me-3 my-3"></i> + 91 96258 09384</p>
                <p><i className="fa fa-print me-3 my-3" ></i> + 01 234 567 89</p>
              </div>
            </div>
          </div>
        </section>
      
        <div className="text-center p-4" style={{backgroundColor: "rgba(0, 0, 0, 0.05)"}}>
          © 2021 Copyright:
          <a className= "fw-bold" href="https://mdbootstrap.com/">MDBootstrap.com</a>
        </div>
      </footer>
  </>
  )
}