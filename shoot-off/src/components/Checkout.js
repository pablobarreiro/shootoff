import "../styles/checkout.css";
import useInput from "../commons/useInput";
import React ,{ useContext, useState, useEffect} from "react";
import { AuthContext } from "../context/GlobalState";
import { ReqContext } from "../context/RequestState";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { CartContext } from "../context/CartState";

const Input = ({ state, onChange }) => {
  return (
    <input
      type="input"
      className="form-control"
      id="Input"
      value={state}
      onChange={onChange}
    />
  );
};

export const Checkout = () => {
  const navigate = useNavigate();
  const { user, toggleAuth } = useContext(AuthContext);
  const { editUser, checkoutCart } = useContext(ReqContext);
  const [editable, setEditable] = useState(false);
  const[ total, setTotal] =useState("")
  const username = useInput(user.user_name);
  const email = useInput(user.email);
  const phone = useInput(user.phone);
  const street = useInput(user.street);
  const streetNumber = useInput(user.street_number);
  const city = useInput(user.city);
  const country = useInput(user.country);
  const postalCode = useInput(user.postal_code);
  const { cartProducts } = useContext(CartContext);

  useEffect(()=>{
    setTotal(0)
    let totalAux = 0
    cartProducts.forEach(product => {
      totalAux += product.quantity * product.price})
    setTotal(totalAux)
  },[cartProducts])
  

  const handleSumit = (e) => {
    e.preventDefault();
    const editedUser = {
      user_name: username.state,
      email: email.state,
      phone: phone.state,
      street: street.state,
      street_number: streetNumber.state,
      city: city.state,
      country: country.state,
      postal_code: postalCode.state,
    };
    editUser(user.id, editedUser)
      .then((data) => data.user)
      .then((newUser) => {
        toggleAuth(null);
        toggleAuth(newUser);
        setEditable(false);
        checkoutCart(user.id)
        swal({ title: "successful registered purchase", icon: "success" });
        navigate("/");
      });
  };
  return (
    <div className="container">
      <div className="row check">
        <div className="col-md-4 order-md-2 mb-4">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-muted">Your cart</span>
            <span className="badge badge-secondary badge-pill">3</span>
          </h4>
          <ul className="list-group mb-3">
            {/* aca se tienen que traer los productos */}
            {cartProducts.map((e) => (
            
              <>
                <li className="list-group-item d-flex justify-content-between lh-condensed">
                  <div>
                    <h6 className="my-0">{e.product_name}</h6>
                  </div>
                  <span className="text-muted">{e.price*e.quantity}</span>
                </li>
              </>
            ))}

            
            <li className="list-group-item d-flex justify-content-between">
              <span>Total</span>
              <strong>{total}</strong>
            </li>
          </ul>
        </div>

        <div className="col-lg-8 order-md-2">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-muted">Check your data</span>
          </h4>
          <form onSubmit={handleSumit}>
            <div className="card-body">
              <div className="mb-3">
                <label id="card-title" className="form-label">
                  Complete Name:
                  {!editable ? (
                    user.user_name
                  ) : (
                    <Input
                      state={username.state}
                      onChange={username.onChange}
                    />
                  )}
                </label>
              </div>
              <div className="mb-3">
                <label
                  id="exampleInputEmail1 card-title"
                  className="form-label"
                >
                  Email address:
                  {!editable ? (
                    <label>{user.email}</label>
                  ) : (
                    <Input state={email.state} onChange={email.onChange} />
                  )}
                </label>
              </div>

              <div className="mb-3">
                <label id="card-title">
                  Phone:
                  {!editable ? (
                    user.phone
                  ) : (
                    <Input state={phone.state} onChange={phone.onChange} />
                  )}
                </label>
              </div>

              <div className="row mx-auto">
                <div className="col-6">
                  <label id=" card-title" className="form-label">
                    City:{" "}
                  </label>
                  {!editable ? (
                    user.city
                  ) : (
                    <Input state={city.state} onChange={city.onChange} />
                  )}
                </div>
                <div className="col-6">
                  <label id=" card-title">Country</label>
                  {!editable ? (
                    user.country
                  ) : (
                    <Input state={country.state} onChange={country.onChange} />
                  )}
                </div>
              </div>
              <div className="row mx-auto">
                <div className="col-5">
                  <label id=" card-title" className="form-label">
                    Street
                  </label>
                  {!editable ? (
                    user.street
                  ) : (
                    <Input state={street.state} onChange={street.onChange} />
                  )}
                </div>
                <div className="col-3">
                  <label id=" card-title">Number: </label>
                  {!editable ? (
                    user.street_number
                  ) : (
                    <Input
                      state={streetNumber.state}
                      onChange={streetNumber.onChange}
                    />
                  )}
                </div>

                <div className="col-3">
                  <label id=" card-title">Postal code: </label>
                  {!editable ? (
                    user.postal_code
                  ) : (
                    <Input
                      state={postalCode.state}
                      onChange={postalCode.onChange}
                    />
                  )}
                </div>
              </div>
            </div>

            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="badge badge-secondary badge-pill">1</span>
              <span className="text-muted">Pay information</span>
            </h4>
            <div className="card-footer text-muted"></div>
            <div className="d-block my-3">
              <div className="custom-control custom-radio">
                <input
                  id="credit"
                  name="paymentMethod"
                  type="radio"
                  className="custom-control-input"
                  required=""
                />
                <label className="custom-control-label">Credit card</label>
              </div>
              <div className="custom-control custom-radio">
                <input
                  id="debit"
                  name="paymentMethod"
                  type="radio"
                  className="custom-control-input"
                  required=""
                />
                <label className="custom-control-label">Debit card</label>
              </div>
              <div className="custom-control custom-radio">
                <input
                  id="paypal"
                  name="paymentMethod"
                  type="radio"
                  className="custom-control-input"
                  required=""
                />
                <label className="custom-control-label">Paypal</label>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label>Name on card</label>
                <input
                  type="text"
                  className="form-control"
                  id="cc-name"
                  placeholder="Full name as displayed on card"
                  required=""
                />
                <div className="invalid-feedback">Name on card is required</div>
              </div>
              <div className="col-md-6 mb-3">
                <label>Credit card number</label>
                <input
                  type="text"
                  className="form-control"
                  id="cc-number"
                  placeholder=""
                  required=""
                />
                <div className="invalid-feedback">
                  Credit card number is required
                </div>
              </div>
              <div className="row">
                <div className="col-md-3 mb-3">
                  <label>Expiration</label>
                  <input
                    type="text"
                    className="form-control"
                    id="cc-expiration"
                    placeholder=""
                    required=""
                  />
                  <div className="invalid-feedback">
                    Expiration date required
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <label>CVV</label>
                  <input
                    type="text"
                    className="form-control"
                    id="cc-cvv"
                    placeholder=""
                    required=""
                  />
                  <div className="invalid-feedback">Security code required</div>
                </div>
                <div>
                  {editable && (
                    <div>
                      <button className="btn btn-dark  ">
                        <p className="checkout">Confirm</p>
                      </button>
                    </div>
                  )}
                  {!editable && (
                    <div>
                      <button
                        onClick={() => {
                          setEditable(true);
                        }}
                        className="btn btn-dark mb-3 "
                      >
                        <p className="checkout">Edit</p>
                      </button>
                      <button className="btn btn-dark mb-3 ">
                        <p className="checkout">Confirm</p>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
