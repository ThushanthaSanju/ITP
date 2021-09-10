import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Chart from 'react-google-charts';
import { summaryOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function DashboardScreen() {
  const orderSummary = useSelector((state) => state.orderSummary);
  const { loading, summary, error } = orderSummary;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(summaryOrder());
  }, [dispatch]);
  return (
    <div>
      <div className="row">
        <h1>Dashboard</h1>
      </div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <ul className="row summary">
            <li>
              <div className="summary-title color1">
                <span>
                  <i className="fa fa-users" /> Users
                </span>
              </div>
              <div className="summary-body">{summary.users[0].numUsers}</div>
            </li>
            <li>
              <div className="summary-title color2">
                <span>
                  <i className="fa fa-shopping-cart" /> Orders
                </span>
              </div>
              <div className="summary-body">
                {summary.orders[0] ? summary.orders[0].numOrders : 0}
              </div>
            </li>
            <li>
              <div className="summary-title color3">
                <span>
                  <i className="fa fa-money" /> Sales
                </span>
              </div>
              <div className="summary-body">
                Rs.
                {summary.orders[0]
                  ? summary.orders[0].totalSales.toFixed(2)
                  : 0}
              </div>
            </li>
          </ul>
          <div>
            <div>
              <h2>Sales</h2>
              {summary.dailyOrders.length === 0 ? (
                <MessageBox>No Sale</MessageBox>
              ) : (
                <Chart
                  width="100%"
                  height="400px"
                  chartType="AreaChart"
                  loader={<div>Loading Chart</div>}
                  data={[
                    ['Date', 'Sales'],
                    ...summary.dailyOrders.map((x) => [x._id, x.sales]),
                  ]}
                ></Chart>
              )}
            </div>
          </div>
          <div>
            <h2>Categories</h2>
            {summary.productCategories.length === 0 ? (
              <MessageBox>No Category</MessageBox>
            ) : (
              <Chart
                width="100%"
                height="400px"
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={[
                  ['Category', 'Products'],
                  ...summary.productCategories.map((x) => [x._id, x.count]),
                ]}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
import React, { useEffect } from "react";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import { listTopSellers } from "../actions/userActions";
import { Link } from "react-router-dom";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const userTopSellersList = useSelector((state) => state.userTopSellersList);
  const {
    loading: loadingSellers,
    error: errorSellers,
    users: sellers,
  } = userTopSellersList;

  useEffect(() => {
    dispatch(listProducts({}));
    dispatch(listTopSellers());
  }, [dispatch]);
  return (
    <div>
      <h2>Top Sellers</h2>
      {loadingSellers ? (
        <LoadingBox></LoadingBox>
      ) : errorSellers ? (
        <MessageBox variant="danger">{errorSellers}</MessageBox>
      ) : (
        <>
          {sellers.length === 0 && <MessageBox>No Seller Found</MessageBox>}
          <Carousel showArrows autoPlay showThumbs={false}>
            {sellers.map((seller) => (
              <div key={seller._id}>
                <Link to={`/seller/${seller._id}`}>
                  <img src={seller.seller.logo} alt={seller.seller.name} />
                  <p className="legend">{seller.seller.name}</p>
                </Link>
              </div>
            ))}
          </Carousel>
        </>
      )}
      <h2>Featured Products</h2>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
          <div className="row center">
            {products.map((product) => (
              <Product key={product._id} product={product}></Product>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import MessageBox from '../components/MessageBox';


export default function CartScreen(props) {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split('=')[1])
    : 1;
    const cart =useSelector((state)=>state.cart);
    const {cartItems} = cart;   
    const dispatch = useDispatch();
    useEffect(() =>{
      if(productId) {
        dispatch(addToCart(productId, qty));
      }
    }, [dispatch, productId, qty]);
  const removeFromCartHandler = (id) => {
    //delete action
    dispatch(removeFromCart(id));

  };
  
  

  const checkoutHandler = () => {
    props.history.push('/signin?redirect=shipping');
  };
  return (<div className="row top">
  <div className="col-2">
    <h1>Shopping Cart</h1>
    {cartItems.length === 0 ? (
      <MessageBox>
        Cart is empty. <Link to="/">Go Shopping</Link>
      </MessageBox>
    ) : (
      <ul>
        {cartItems.map((item) => (
          <li key={item.product}>
            <div className="row">
              <div>
                <img
                  src={item.image}
                  alt={item.name}
                  className="small"
                ></img>
              </div>
              <div className="min-30">
                <Link to={`/product/${item.product}`}>{item.name}</Link>
              </div>
              <div>
                <select
                  value={item.qty}
                  onChange={(e) =>
                    dispatch(
                      addToCart(item.product, Number(e.target.value))
                    )
                  }
                >
                  {[...Array(item.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>
              <div>Rs.{item.price}.00</div>
              <div>
                <button
                  type="button"
                  onClick={() => removeFromCartHandler(item.product)}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    )}
  </div>
  <div className="col-1">
    <div className="card card-body">
      <ul>
        <li>
          <h2>
            Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : Rs.
            {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}.00
          </h2>
        </li>
        <li>
          <button
            type="button"
            onClick={checkoutHandler}
            className="primary block"
            disabled={cartItems.length === 0}
          >
            Proceed to Checkout
          </button>
        </li>
      </ul>
    </div>
  </div>
    </div>
    
  );
}
