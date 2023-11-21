import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import Home from "../../pages/Home/index";

const defaulftData = {
  email: "",
  password: "",
};
export const Login = ({ setPage }) => {
  const [success, setSuccess] = useState(false);
  const [userData, setUserData] = useState(defaulftData);
  const [errors, setErrors] = useState([]);
  // const [formData,setFormData] = useState(defaulftData)
  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validate();
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      alert("Login Success");
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({ ...userData, [name]: value });
    const errors = validate();
    setErrors(errors);
    //   console.log(userData);
  };

  const validate = () => {
    const error = {};
    const email = userData.email;
    const password = userData.password;
    if (!email) {
      error.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      error.email = "Email is not matched";
    } else {
      error.email = "";
    }
    if (!password) {
      error.password = "Password is required";
    } else if (password.length < 8) {
      error.password = "Password is not matched";
    } else {
      error.password = "";
    }
    return error;
  };

  // useEffect(()=>{
  //     const getUse = async () =>{
  //         const res = await axios.get("https://6486a69cbeba6297278f00b8.mockapi.io/login")
  //         if(res){
  //             console.log(res.data);
  //         }
  //     }
  //     getUse()
  // },[])

  const handleLogin = async () => {
    try {
      const PostApi = async () => {
        const res = await axios.post("http://localhost:8080/api/v1/auth/authenticate", userData);
        console.log("1", res);
        console.log("2", res.status);
        if (res.status === 200) {
          alert("Authentication successful");
          setSuccess(true);
        } else {
          alert("Authentication failed");
        }
      };
      PostApi();
    } catch (error) {
      console.log(error);
    }

    // setPage("home")

    // const PostApi = () => {
    //     // const res =  axios.post("https://6486a69cbeba6297278f00b8.mockapi.io/login", userData )
    // }

    // PostApi()
    // setPage("home")
  };
  return (
    <>
      {success ? (
        <Home />
      ) : (
        <div className="container">
          <div className="form-container">
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="form-title">WELCOME</div>
              <div className="form-group">
                <input type="text" onChange={(e) => handleChange(e)} name="email" placeholder="Enter" />
                {errors.email && <div className="error">{errors.email}</div>}
              </div>

              <div className="form-group">
                <input type="text" onChange={(e) => handleChange(e)} name="password" placeholder="Password" />
                {errors.password && <div className="error">{errors.password}</div>}
              </div>

              <div className="login-butons">
                <button onClick={handleLogin}>Login</button>
                <div className="login-social">
                  <button className="fb-login">Facebook</button>
                  <button className="google-login">Google</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
