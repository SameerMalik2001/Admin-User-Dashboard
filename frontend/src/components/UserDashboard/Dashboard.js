import React, { useState, useEffect } from "react";
import "./DashboardStyle.css";
import axios from "axios";
import $ from "jquery";
import AddUser from "./subPart/AddUser";
import EditUser from "./subPart/EditUser";
import UserList from "./subPart/UsersList";
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom'
import {setuser} from '../../Redux/reducers.js'


const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state=>state.user)
  const [option, setOption] = useState(1)

  // handle logout events
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

  const optionManuplate = (num) => {
    setOption(num)
  }

  useEffect(() => {
    if(user?.data === undefined){
      navigate('/signin')
    }
    // is user admin, admin check
    const isAdmin = async () =>{
      await axios.post('http://localhost:5000/api/users/IsUserAdmin', {}, {withCredentials: true})
       .then(response => {
          console.log(response);
          if(response.data.data.data === false) {
            navigate('/')
            dispatch(setuser({Null: null}))
          }
        })
       .catch(error => {
          console.log(error);
        });
    }
    isAdmin()
  }, [user])


  return (
    <div className="dashboard_container">
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

        <div className="optionsOfAdmin">
          <p style={{ fontWeight: option === 1 ? '700' : 'normal' }} onClick={()=>setOption(1)}>Add User</p>
          <p style={{ fontWeight: option === 2 ? '700' : 'normal' }} onClick={()=>setOption(2)}>Edit User</p>
          <p style={{ fontWeight: option === 3 ? '700' : 'normal' }} onClick={()=>setOption(3)}>User List</p>
        </div>
        <div className="rest">
        {
          option === 1 && <AddUser />
        }
        {
          option === 2 && <EditUser optionManuplate={optionManuplate}/>
        }
        {
          option === 3 && <UserList optionManuplate={optionManuplate}/>
        }
        </div>

        

    </div>
  );
};

export default Dashboard;
