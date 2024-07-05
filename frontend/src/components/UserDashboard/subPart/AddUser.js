import React, { useEffect, useState } from 'react'
import '../DashboardStyle.css'
import axios from 'axios'
import {useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';

function AddUser() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  
  // add user, calling api for this if user is admin
  const Adduser = async () => {
    const addUser = async () => {
      await axios.post(`http://localhost:5000/api/users/register`,
        { username:fullName, email, password, role }
      ).then((response) => {
        console.log(response);
        setEmail('')
        setFullName('')
        setPassword('')
        setRole('')
      })
      .catch(error => console.log(error))
    }
    addUser()
  }

  return (
    <div className='addUser_container'>
      <div className="box_password">
        <h1>Add User</h1>
        <div className="cover">
          <p>Full name</p>
          <input value={fullName} onChange={(e)=>setFullName(e.target.value)} required type="text" />
        </div>
        <div className="cover">
          <p>Email</p>
          <input value={email} onChange={(e)=>setEmail(e.target.value)} required type="email" />
        </div>
        <div style={{marginBottom:10, marginTop:10}} className="cover">
            <label htmlFor="email">Role:</label>&nbsp;&nbsp;
            <input checked={role === 'user'} required={true} type="radio" id="user" value='user' name="role" onChange={(e)=>setRole(e.target.value)}/>&nbsp;User&nbsp;&nbsp;&nbsp;
            <input checked={role === 'admin'} required={true} type="radio" id="admin" value='admin' name="role" onChange={(e)=>setRole(e.target.value)}/>&nbsp;Admin
        </div>
        <div className="cover">
          <p>Password</p>
          <input value={password} onChange={(e)=>setPassword(e.target.value)} required type="password" />
        </div>
        <button onClick={()=>Adduser()} className='changeBtn'>Add user</button>
      </div>
    </div>
  )
}

export default AddUser