import React, {  useState , useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { ComponentToPrint } from "../components/ComponentToPrint";

import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  createProduct,
  deleteProduct,
  listProducts,
} from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import axios from 'axios';
import jsPDF from 'jspdf';

import {
  PRODUCT_CREATE_RESET,
  PRODUCT_DELETE_RESET,
} from "../constants/productConstants";

export default function ProductListScreen(props) {
  //report
  const componentRef = useRef();
 

  const { pageNumber = 1 } = useParams();

  const sellerMode = props.match.path.indexOf("/seller") >= 0;
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;
  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      props.history.push(`/product/${createdProduct._id}/edit`);
    }
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
    dispatch(
      listProducts({ seller: sellerMode ? userInfo._id : "", pageNumber })
    );
  }, [
    createdProduct,
    dispatch,
    props.history,
    sellerMode,
    successCreate,
    successDelete,
    userInfo._id,
    pageNumber,
  ]);

  const deleteHandler = (product) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteProduct(product._id));
    }
  };
  const createHandler = () => {
    dispatch(createProduct());
  };

  const [AllProducts,setAllProducts] = useState([])
  useEffect(() => {
      axios.get("http://localhost:5000/getAllProducts")
      .then(res => setAllProducts(res.data))
      .catch(error => console.log(error));
  },[])

  const [searchName,setNameSearch] = useState("");
    function searchUsingName()
    {
        axios.get("http://localhost:5000/getAllProducts/"+searchName)
        .then(res => setAllProducts(res.data))
        .catch(error => console.log(error));
    }

    function cancelSearch()
    {
        setNameSearch("");
        axios.get("http://localhost:5000/getAllProducts")
       .then(res => setAllProducts(res.data))
       .catch(error => console.log(error));
    }

    function handlePrint()
    {
     var doc = new jsPDF('p', 'pt');
     doc.setTextColor(254, 8, 8 );
     doc.text(20, 20, "Product List")
     doc.text(25, 30, '---------------------------')
     doc.addFont('helvetica', 'normal')
     doc.setFontSize(12);
     doc.setTextColor(3, 3, 3);
     // eslint-disable-next-line no-lone-blocks
     localStorage.setItem("AllProducts", JSON.stringify(AllProducts));
     
     // retrieving our data and converting it back into an array
     var AllProductsData = localStorage.getItem("AllProducts");
     var products = JSON.parse(AllProductsData);
   
     let count = 60;
     doc.text(25, 50, "Name - PRICE - Category - Brand")
     doc.setFontSize(11);
    for(var i = 0; i < products.length; i++)
    {
        count = count+20;
       doc.text(25, count, products[i].name+" \t- RS."+ products[i].price.toFixed(2)+" \t- "+products[i].category+" \t- "+products[i].brand)
    }
    
     doc.save('Product List.pdf')
    }

    function Download(_id, name,price,category,brand)
    {
      var doc = new jsPDF('p', 'pt');
      
      doc.setTextColor(254, 8, 8 );
      doc.text(20, 20, name+" Report")
      doc.addFont('helvetica', 'normal')
      doc.setFontSize(12);
      doc.text(25, 80, 'Item Id : '+ _id)   
      doc.text(25, 60, 'Item Name : '+name)
      doc.text(25, 100, 'Price : RS. '+price)  
      doc.text(25, 120, 'Category : '+category)
      doc.text(25, 140, 'Brand : '+brand)         
      doc.save(name+" .pdf")
    }

  return (
    <div style={{margin:'4%'}}>
      <div className="row">
        <h1>Products</h1>
        <button type="button" className="primary" onClick={createHandler}>
          Create Product
        </button>
      </div>
      <div class="mb-3 mt-5 row container">
        <div class="col-10">
            <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Type Product Name.."  aria-label="Recipient's username" aria-describedby="button-addon2" onChange={(e) =>{
                setNameSearch(e.target.value);
            }}/>
            <button class="btn btn-dark" type="button" id="button-addon2" onClick={cancelSearch}>Cancel</button>&nbsp;&nbsp;&nbsp;
            </div>
        </div>
        <div class="col-2">
            <button className="shadow-0 mx-2" size="sm" style={{fontSize:'14px', letterSpacing:'2px'}} color='danger' onClick={searchUsingName}>Search</button>
        </div>
      </div>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

      {loadingCreate && <LoadingBox></LoadingBox>}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <table className="table" style={{marginTop:'3%'}}>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {AllProducts.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <button
                      type="button"
                      className="small"
                      onClick={() =>
                        props.history.push(`/product/${product._id}/edit`)
                      }
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="small"
                      onClick={() => deleteHandler(product)}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="small"
                      onClick={() => Download(product._id,product.name,product.price,product.category,product.brand)}
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="row center pagination">
            {[...Array(pages).keys()].map((x) => (
              <Link
                className={x + 1 === page ? "active" : ""}
                key={x + 1}
                to={`/productlist/pageNumber/${x + 1}`}
              >
                {x + 1}
              </Link>
            ))}
          </div>

          <div>
            <ComponentToPrint ref={componentRef} />
            <br />
            <button
              style={{
                background: "deepskyblue",
                float: "right",
                padding: "20px 20px",
              }}
              onClick={handlePrint}
            >
              Generate Report Product List
            </button>
            <br />
          </div>
        </>
      )}
    </div>
  );
}
