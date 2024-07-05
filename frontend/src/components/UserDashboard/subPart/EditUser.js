import React, { useEffect, useState } from 'react'
import '../DashboardStyle.css'
import axios from 'axios'
import { useSelector , useDispatch} from 'react-redux';
import { setuser } from '../../../Redux/reducers';
import { useNavigate } from 'react-router-dom';

function EditUser(props) {
  const navigate = useNavigate()
  const id = useSelector(state=>state.editUserId)
  const dispatch = useDispatch() 
  const user = JSON.parse(localStorage.getItem('user'))
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const [role, setRole] = useState('')

  // fetch user for editing
  useEffect(()=>{
    const fetchUser = async ()=>{
      await axios.get(`http://localhost:5000/api/users/findUserById/${id}`)
      .then((response) => {
        console.log(response);
        setFullName(response.data.data.username)
        setEmail(response.data.data.email)
        setRole(response.data.data.role)
        setPassword('')
      })
      .catch((error) => {
        console.log(error);
      })
    }
    fetchUser()
  },[])

  // handle change in editing user
  const ChangeUserData = async () => {
    if(fullName.trim() === '' || email.trim() === '' || role.trim() === '' || Password.trim() === '') {
      alert('Please fill all required fields')
      return;
    }
    const changeUser = async ()=>{
      await axios.post(`http://localhost:5000/api/users/updateAccountDetails`,
        {
          username: fullName,
          email: email,
          role: role,
          password:  Password,
          id
        },
        {
          withCredentials: true
        }
      )
      .then((response) => {
        console.log(response);
        console.log(user._id, id, role);
        if(String(user._id) === String(id) && role === 'user') {
          dispatch(setuser(response.data.data))
          navigate('/')
        } else {
          props.optionManuplate(3)
        }
      })
      .catch((error) => {
        console.log(error);
      })
    }
    changeUser()
  }
  
  return (
    <div className='addUser_container'>
      <div className="box_password">
        <h1>Edit User</h1>
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
          <input value={Password} onChange={(e)=>setPassword(e.target.value)} required type="password" />
        </div>
        <button onClick={()=>ChangeUserData()} className='changeBtn'>Change</button>
        <p className='msg'>Note: select editing from user lists</p>
      </div>
    </div>
  )
}

export default EditUser