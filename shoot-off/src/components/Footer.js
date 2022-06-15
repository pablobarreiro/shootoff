import React from "react"
import { BsFacebook, BsInstagram, BsLinkedin } from "react-icons/bs";
import "../styles/footer.css";
const Footer = () => {
  return (
  <>
  <div className="container-fluid">
    <footer className="footer text-center text-white bg-dark">
      <div>
aca podriar links a el home o una barra de busqueda
{/* { className="d-flex justify-content-lg-between p-4 border-bottom"} */}
        <div className="me text-reset">
            <div className="me text d-none d-lg-block">FOLLOW US</div>
          <section >
            <a
              className="btn footer btn-outline-light m-1"
              href="#!"
              role="button"
            >
              <BsFacebook className="icon" />
            </a>

            <a
              className="btn footer btn-outline-light m-1"
              href="#!"
              role="button"
            >
              <BsInstagram />
            </a>

            <a
              className="btn footer btn-outline-light m-1"
              href="#!"
              role="button"
            >
              <BsLinkedin />
            </a>
          </section>
        </div>
      </div>

      <div className="text-center p">© 2022 Copyright</div>
    </footer>
    </div>
  </>
    
  );
};
export default Footer;
