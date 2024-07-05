import React, { useEffect, useState } from "react";
import "./HomeStyle.css";
import axios from "axios";
import {useDispatch, useSelector} from 'react-redux';
import {setuser} from '../../Redux/reducers.js'
import {useNavigate} from 'react-router-dom'

function Home() {
  const user = useSelector(state=>state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // when user logout and navigate to home page and romove local storage
  const logout = () => {
    const callLogoutAPI = async (req, res) => {
        await axios.post('http://localhost:5000/api/users/logout',{}, {withCredentials: true})
        .then(response => {
          console.log(response);
          localStorage.removeItem('user');
          navigate('/')
          dispatch(setuser({Null: null}))
        })
        .catch(error => {
          console.log(error);
        });
        
      
    }
    callLogoutAPI()
  }


  return (
    <div className="HomeContainer">
      <nav>
        <div className="point">
          {
            user?.data !== undefined && <p onClick={()=>logout()}>Logout</p>
          }
          {
            user?.data === undefined && 
            <>
              <p onClick={()=>navigate('/signup')}>Register</p>
              <p onClick={()=>navigate('/signin')}>Login</p>
            </>
          }
        </div>
      </nav>

      <div className="mainBox">
        <div className="box">
          <h1>Options</h1>
          {
            user?.data?.role === 'admin' && <p onClick={()=>navigate('/dashboard')}>Go Dashboard</p>
          }
          {
            user?.data === undefined && <p onClick={()=>navigate('/signin')}>Login First</p>
          }
          {
            user?.data?.role === 'user' && <p>you are user</p>
          }
        </div>
      </div>


    </div>
  );
}

export default Home;