import React, { useEffect, useRef,useCallback } from "react";
import { useReactToPrint } from "react-to-print";
import { ComponentToPrint } from "../components/ComponentToPrint";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useDispatch, useSelector } from "react-redux";
import Chart from "react-google-charts";
import { summaryOrder } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';

export default function DashboardScreen() {
  //report
  const componentRef = useRef();
 
  const HTMLDivElement = useRef(null);
  const handlePrint = useCallback(() => {
    if (HTMLDivElement.current === null) {
      return
    }

    toPng(HTMLDivElement.current, { cacheBust: true, })
      .then((dataUrl) => {
        const link = document.createElement('a')
        link.download = 'Chart.jpg'
        link.href = dataUrl
        link.click()
      })
      .catch((err) => {
        console.log(err)
      })
  }, [HTMLDivElement])


  const orderSummary = useSelector((state) => state.orderSummary);
  const { loading, summary, error } = orderSummary;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(summaryOrder());
  }, [dispatch]);
  return (
    <div id="divToPrint" ref={HTMLDivElement}>
      <div className="row">
        <h1>Dashboard Summary</h1>
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
              <ComponentToPrint ref={componentRef} />
              <br />

              <br />
            </div>
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
                    ["Date", "Sales"],
                    ...summary.dailyOrders.map((x) => [x._id, x.sales]),
                  ]}
                ></Chart>
              )}
            </div>
            <div>
              <ComponentToPrint ref={componentRef} />
              <br />

              <br />
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
                  ["Category", "Products"],
                  ...summary.productCategories.map((x) => [x._id, x.count]),
                ]}
              />
            )}
          </div>
        </>
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
          Generate Report
        </button>
        <br />
      </div>
    </div>
  );
}
