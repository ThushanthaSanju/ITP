import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { ComponentToPrint } from "../components/ComponentToPrint";
import {
  Row,
  Col,
  Input,
  Button,
  Alert,
  Container,
  Label,
  Form,
  FormGroup,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, listUsers } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { USER_DETAILS_RESET } from "../constants/userConstants";
import Coupon from "../controllers/couponController";
import moment from "moment"

export default function UserListScreen(props) {
  //report
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  //coupon table data
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    loadAllCoupons()
  }, []);


  const [couponState, setCouponState] = useState({
    name: "",
    code: "",
    amount: 0,
    count: 0,
    expireDate: "",
  })

  const handleChange = (e) => {
    let value = e.target.value
    if (e.target.name == "amount") {
      console.log(value);
      value > 100 ? value = 100 : value = value
    }

    setCouponState({
      ...couponState,
      [e.target.name]: value
    });

  }

  //getall coupons
  const loadAllCoupons = (params) => {
    setLoading(true)
    Coupon.getAllCoupons(params)
      .then((result) => {
        setLoading(false)
        const rdata = result;
        console.log(rdata);
        setData(rdata.map((item) => {
          const createdate = moment(item.createDate).format('MMM DD YYYY')
          const expiredate = moment(item.expireDate).format('MMM DD YYYY')

          return (
            {
              id: item._id,
              name: item.name,
              code: item.code,
              expiredate: expiredate,
              created_at: createdate,
              amount: item.amount,
              count: item.count,
              usageCount: item.usageCount,
              isValid: item.isValid
            }
          )
        }))

      })
      .catch((err) => {
        console.log(err);

      })
  }

  //create coupon
  const createCoupon = () => {
    console.log(couponState);

    Coupon.createCoupons(couponState).then((results) => {
      console.log(results);
      loadAllCoupons()
      setCouponState({
        name: "",
        code: "",
        amount: 0,
        count: 0,
        expireDate: "",
      })
    })
  }

  const deleteCoupon = (key) => {
    console.log(key);

    Coupon.deleteCoupon(key).then((results) => {
      console.log(results);
      loadAllCoupons()

    })
  }

  return (
    <React.Fragment>
      <div>
        <Container style={{ padding: "20px" }}>

          <h2>Add Coupon</h2>
          <Form>
            <Row>
              <Col lg="3">
                <FormGroup>
                  <Label style={{ display: "block", paddingBottom: "5px" }} for="name">Name</Label>
                  <Input
                    type="text"
                    className="form-control"
                    value={couponState.name}
                    onChange={handleChange}
                    validate={{ required: { value: true, errorMessage: 'Please enter name' } }}
                    id="name"
                    name="name"
                  />
                </FormGroup>
              </Col>
              <Col lg="3">
                <FormGroup>
                  <Label style={{ display: "block", paddingBottom: "5px" }} for="code">Code</Label>
                  <Input
                    type="text"
                    className="form-control"
                    value={couponState.code}
                    onChange={handleChange}
                    validate={{ required: { value: true, errorMessage: 'Please enter code' } }}
                    id="code"
                    name="code"
                  />
                </FormGroup>
              </Col>
              <Col lg="2">
                <FormGroup>
                  <Label style={{ display: "block", paddingBottom: "5px" }} for="amount">Discount Percentage</Label>
                  <Input
                    type="text"
                    className="form-control"
                    value={couponState.amount}
                    onChange={handleChange}
                    validate={{ required: { value: true, errorMessage: 'Please enter amount' } }}
                    id="amount"
                    name="amount"
                    max={100}
                  />
                </FormGroup>
              </Col>
              <Col lg="2">
                <FormGroup>
                  <Label style={{ display: "block", paddingBottom: "5px" }} for="count">Number of Coupons</Label>
                  <Input
                    type="text"
                    className="form-control"
                    value={couponState.count}
                    onChange={handleChange}
                    validate={{ required: { value: true, errorMessage: 'Please enter count' } }}
                    id="count"
                    name="count"
                  />
                </FormGroup>
              </Col>
              <Col lg="2">
                <FormGroup>
                  <Label style={{ display: "block", paddingBottom: "5px" }} for="expireDate">Expire Date</Label>
                  <Input
                    type="date"
                    className="form-control"
                    value={couponState.expireDate}
                    onChange={handleChange}
                    validate={{ required: { value: true, errorMessage: 'Please enter expireDate' } }}
                    id="expireDate"
                    name="expireDate"
                  />
                </FormGroup>
              </Col>

            </Row>
            <Button
              onClick={() => { createCoupon() }}
            >
              Add Coupon
            </Button>
          </Form>

          <div>

            <h1>Users</h1>

            {loading ? (
              <LoadingBox></LoadingBox>
            ) : (
                <table className="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Code</th>
                      <th>Amount</th>
                      <th>Create Date</th>
                      <th>Expire Date</th>
                      <th>Coupons Issued</th>
                      <th>Coupons Used</th>
                      <th>Validity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((coupon) => (
                      <tr key={coupon.id}>
                        <td>{coupon.name}</td>
                        <td>{coupon.code}</td>
                        <td>{coupon.amount}%</td>
                        <td>{coupon.created_at}</td>
                        <td>{coupon.expiredate}</td>
                        <td>{coupon.count}</td>
                        <td>{coupon.usageCount}</td>
                        <td>{coupon.isValid ? "YES" : " NO"}</td>
                        <td>
                          {/* <button
                            type="button"
                            className="small"
                            onClick={() => props.history.push(`/coupon/${coupon._id}/edit`)}
                          >
                            Edit
                      </button> */}
                          <button
                            type="button"
                            className="small"
                            onClick={() => { deleteCoupon(coupon.id) }}
                          >
                            Delete
                      </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            <div>
              <ComponentToPrint ref={componentRef} />
              <br />
              <button
                style={{
                  background: "green",
                  float: "right",
                  padding: "20px 20px",
                }}
                onClick={handlePrint}
              >
                Generate Report User List
            </button>
              <br />
            </div>
          </div>
        </Container>
      </div>
    </React.Fragment>

  );
}
