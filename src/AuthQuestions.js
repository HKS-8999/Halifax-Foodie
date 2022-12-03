import "./App.css";
import db from "./Firebase";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";

function AuthQuestions() {
  const [q0, setq0] = useState("");
  const [q1, setq1] = useState("");
  const [q2, setq2] = useState("");
  const [q3, setq3] = useState("");
  const [q4, setq4] = useState("");
  const [email, setemail] = useState("");
  const search = useLocation().search;
  const [blogs, setBlogs] = useState([]);

  const handleChange = (event, qno = -1) => {
    if (event.target.name === "0") {
      setq0(event.target.value);
    }
    if (event.target.name === "1") {
      setq1(event.target.value);
    }
    if (event.target.name === "2") {
      setq2(event.target.value);
    }
    if (event.target.name === "3") {
      setq3(event.target.value);
    }
    if (event.target.name === "4") {
      setq4(event.target.value);
    }
  };

  const handleSubmit = (qno) => {
    const keys = blogs[0];
    console.log(qno);
    if (qno === "0") {
      let questionAns = {};
      questionAns[keys.q1] = q0;
      db.collection("auth-user-answers").doc(email).set(
        {
          questionAns,
        },
        { merge: true }
      );
    }
    if (qno === "1") {
      let questionAns = {};
      questionAns[keys.q2] = q1;
      db.collection("auth-user-answers").doc(email).set(
        {
          questionAns,
        },
        { merge: true }
      );
    }
    if (qno === "2") {
      let questionAns = {};
      questionAns[keys.q3] = q2;
      db.collection("auth-user-answers").doc(email).set(
        {
          questionAns,
        },
        { merge: true }
      );
    }
    if (qno === "3") {
      let questionAns = {};
      questionAns[keys.q4] = q3;
      db.collection("auth-user-answers").doc(email).set(
        {
          questionAns,
        },
        { merge: true }
      );
    }
    if (qno === "4") {
      let questionAns = {};
      questionAns[keys.q5] = q4;
      db.collection("auth-user-answers").doc(email).set(
        {
          questionAns,
        },
        { merge: true }
      );
    }
  };

  const fetchBlogs = async () => {
    const response = db.collection("auth-user-questions");
    const data = await response.get();
    data.docs.forEach((item) => {
      setBlogs([...blogs, item.data()]);
    });
  };
  useEffect(() => {
    const id_token = new URLSearchParams(search).get("id_token");
    const decoded = jwt_decode(id_token);
    setemail(decoded.email);
    fetchBlogs();
  }, []);
  return (
    <div className="App">
      {blogs &&
        blogs.map((value) => {
          return (
            <div className="blog-container">
              {Object.values(value).map((val, idx) => {
                return (
                  <>
                    <h4>{val}</h4>
                    <input type="text" name={idx} onChange={handleChange} />
                    <button
                      name={idx}
                      onClick={(e) => {
                        handleSubmit(e.target.name);
                      }}
                    >
                      Add
                    </button>
                  </>
                );
              })}
            </div>
          );
        })}
      <Link to={"/cypher-auth"}>Next</Link>
    </div>
  );
}

export default AuthQuestions;