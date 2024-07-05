import React, {useState} from "react";
import "./SigninStyle.css";
import { useNavigate } from "react-router";
import Atropos from "atropos/react";
import axios from "axios";
import 'atropos/css';
import {useDispatch, useSelector} from 'react-redux'
import {setuser} from '../../Redux/reducers.js'

const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch();

  // to redirect to specific path
  const redirect = (path) => {
    navigate(path);
  };

  
  // handle change in data
  const changeData = (e, num) => {
    if(num === 0) {
      setEmail(e.target.value)
    } else {
      setPassword(e.target.value)
    }
  }

  // signin api will call and set local storage variables and redirect to home page
  const submit = (e) => {
    e.preventDefault();
    const createUser = async()=>{
      await axios.post(`http://localhost:5000/api/users/login`, {
        email: email,
        password:password
      }, { withCredentials: true })
      .then(response=>{
        console.log(response.data.data);
        localStorage.setItem('user', JSON.stringify(response.data.data.data));
        setTimeout(() => {
          dispatch(setuser(response.data.data))
          redirect("/")
        }, 1000);
      })
      .catch(error=>{
        console.log(error);
      })
    }
    createUser()
  }
  
  return (
    <div className="signin-wrapper">
      <div className="signin-container">
        <h2>Sign In</h2>
        <form onSubmit={(e)=>submit(e)} className="signin-form">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input required={true} type="email" id="email" name="email" onChange={(e)=>changeData(e, 0)}/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input required={true} type="password" id="password" name="password" onChange={(e)=>changeData(e, 1)}/>
          </div>
          <div shadow={false} rotateXMax={10} rotateYMax={10} className="btn">
            <button type="submit">Sign In</button>
          </div>
          <p>
            Don't have an account?{" "}
            <span onClick={()=>redirect("/signup")}>Sign Up</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signin;
