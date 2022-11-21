import amazon_connect from "amazon-connect-chatjs";
import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Col, Row, Container, Button } from "react-bootstrap";
// import grad1 from "./grad1.jpeg";
// import grad2 from "./grad2.jpeg";
// import grad3 from "./grad3.jpeg";
// import grad4 from "./grad4.jpeg";
// import bot from "./bot.png";

const Bot = () => {
  useEffect(() => {
    (function (w, d, x, id) {
      let s = d.createElement("script");
      s.src =
        "https://db08fjupg2abb.cloudfront.net/amazon-connect-chat-interface-client.js";
      s.async = 1;
      s.id = id;
      d.getElementsByTagName("head")[0].appendChild(s);
      w[x] =
        w[x] ||
        function () {
          (w[x].ac = w[x].ac || []).push(arguments);
        };
    })(
      window,
      document,
      "amazon_connect",
      "66b37319-8b77-470a-98fa-c09d1e14a2c1"
    );
    amazon_connect("styles", {
      openChat: { color: "white", backgroundColor: "#123456" },
      closeChat: { color: "white", backgroundColor: "#123456" },
    });
    amazon_connect(
      "snippetId",
      "QVFJREFIaTVucjV6blZLVmVuUmIvVHpJa0xaVTRpNURvQ3pianQ3R1hoWGhVcmtmTlFFWVhsWUo0RHJwQUs5UkNkTGg3SVhDQUFBQWJqQnNCZ2txaGtpRzl3MEJCd2FnWHpCZEFnRUFNRmdHQ1NxR1NJYjNEUUVIQVRBZUJnbGdoa2dCWlFNRUFTNHdFUVFNc3ByY0g5NG1TenBpdkp5MUFnRVFnQ3VtYVN5TTdESUxVS1dnSW5jbmNxNm1BV21Da1hIMFdnNWJ2NDFGcWN2amtHQXBCWGdFcHVENlQ4eGQ6OkpaYUV5RjF5blFoRlZoODZzNjkzNFpkdG5zZDlWS1ZsekxUNjVmSTBZQUhjRlVNMXU3ODFSYzRvem51a3VmdVBBS1Z5Wm1KN0hzWHJDSGNxaWx0YW9UU2pBQ2RoTjZqU2FwMzBIandmNHd6ME5VcG1sKzFieFNwc2N2UUR4dVdJQkRyRWhGaWJBbGIzaWltVUxJZVAzSWdPeTVET0ZFMD0="
    );
    amazon_connect("supportedMessagingContentTypes", [
      "text/plain",
      "text/markdown",
    ]);
  });

  return (
    <div>
      {/* <div className="row" style={{ height: "400px", padding: "10" }}>
        <div
          className="col-lg-3"
          style={{
            backgroundColor: "grey",
            margin: "1rem",
            border: "double",
            marginLeft: "3rem",
          }}
        >
          <h2 style={{ fontWeight: "bold" }}>Explore Dalhousie</h2>
          <ul>
            <li style={{ paddingTop: "10px" }}>
              <h3>
                <a
                  style={{ color: "black", textDecorationLine: "none" }}
                  href="#topic1"
                >
                  Dalhousie Viewbook
                </a>
              </h3>
            </li>
            <li style={{ paddingTop: "10px" }}>
              <h3>
                <a
                  style={{ color: "black", textDecorationLine: "none" }}
                  href="#topic2"
                >
                  Leadership and vision
                </a>
              </h3>
            </li>
            <li style={{ paddingTop: "10px" }}>
              <h3>
                <a
                  style={{ color: "black", textDecorationLine: "none" }}
                  href="#topic3"
                >
                  Internationalization
                </a>
              </h3>
            </li>
            <li style={{ paddingTop: "10px" }}>
              <h3>
                <a
                  style={{ color: "black", textDecorationLine: "none" }}
                  href="#topic4"
                >
                  Tuition,fees and costs
                </a>
              </h3>
            </li>
            <li style={{ paddingTop: "10px" }}>
              <h3>
                <a
                  style={{ color: "black", textDecorationLine: "none" }}
                  href="#topic5"
                >
                  Payments
                </a>
              </h3>
            </li>
            <li style={{ paddingTop: "10px" }}>
              <h3>
                <a
                  style={{ color: "black", textDecorationLine: "none" }}
                  href="#topic5"
                >
                  Important dates
                </a>
              </h3>
            </li>
            <li style={{ paddingTop: "10px" }}>
              <h3>
                <a
                  style={{ color: "black", textDecorationLine: "none" }}
                  href="#topic5"
                >
                  Events
                </a>
              </h3>
            </li>
          </ul>
        </div>
        <div className="col-lg-7">
          <div
            className="row"
            style={{
              backgroundColor: "black",
              margin: "1rem",
              padding: "1rem",
            }}
          >
            <h1 style={{ color: "white" }}>Covid-19</h1>
            <h3 style={{ color: "white" }}>Information and Updates</h3>
          </div>
          <div
            className="row"
            style={{ backgroundColor: "Yellow", margin: "1rem" }}
          >
            <h3>Feature and New Stories</h3>
          </div>

          <div className="row" style={{ padding: "1rem" }}>
            <div className="col-md-6">
              <Button href="#">
                <img src={grad1} alt="image-2" style={{ width: "350px" }} />
              </Button>
            </div>

            <div className="col-md-6">
              <Button href="#">
                <img src={grad2} alt="image-1" style={{ width: "350px" }} />
              </Button>
            </div>
          </div>

          <div className="row" style={{ padding: "1rem" }}>
            <div className="col-md-6">
              <Button href="#">
                <img
                  src={grad3}
                  alt="image-2"
                  style={{ width: "350px", height: "200px" }}
                />
              </Button>
            </div>

            <div className="col-md-6">
              <Button href="#">
                <img
                  src={grad4}
                  alt="image-1"
                  style={{ width: "350px", height: "200px" }}
                />
              </Button>
            </div>
          </div>
        </div>
        <div className="col-lg-1" style={{ margin: "1rem", height: "400px" }}>
          <h6
            style={{
              color: "blue",
              fontWeight: "bold",
              textDecorationLine: "underline",
            }}
          >
            Quick Links
          </h6>
          <p>my Dal</p>
          <p>Brightspace</p>
          <p>Dal Online</p>
          <p>Faculty List</p>
          <br></br>
          <br></br>

          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      </div> */}
    </div>
  );
};

export default Bot;
