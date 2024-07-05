import React, {useEffect, useState} from 'react'
import '../DashboardStyle.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { editUserId } from '../../../Redux/reducers';
import { useDispatch } from 'react-redux';

function UserList(props) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [users, setUsers] = useState([])
  const [index, setIndex] = useState(0)
  const [userChanged, setUserChanged] = useState(false)
  const [search, setSearch] = useState('')

  // indexing for users
  let Numbers = []
  let numOfPage = users.length / 8
  let rest = users.length % 8
  const total = numOfPage + rest
  for(let i=1; i<=total; i++){
    Numbers.push(i)
  }

  // fetch all user to list
  useEffect(() => {
    const fetchAllUser = async () => {
      await axios.get(`http://localhost:5000/api/users/fetchAllUser`)
       .then((response) => {
          console.log(response.data.data);
          console.log(response.data.data.length);
          let newArray = []
          let array8 = []
          response.data.data.map((item, index)=>{
            if(search.length > 0 && ((item.role).includes(search) || (item.username).includes(search) || (item.email).includes(search))) {
              array8.push(item)
            } else if(search.length === 0){
              array8.push(item)
            }
            if(array8.length === 8){
              newArray.push(array8)
              array8 = []
            }
            if(array8.length > 0 && response.data.data.length === index+1) {
              newArray.push(array8)
              array8 = []
            }
          })
          setUsers(newArray)
        })
       .catch((error) => {
          console.log(error);
        })
    }
    fetchAllUser()
  }, [userChanged, search])

  // handle edit events
  const editUser = (id) => {
    dispatch(editUserId(id))
    props.optionManuplate(2)
  }

  // handle delete events
  const deleteUser = async(id) =>{
    await axios.delete(`http://localhost:5000/api/users/delete/${id}`, {withCredentials:true})
     .then((response) => {
        console.log(response);
        setUserChanged(prev=>!prev)
      })
     .catch((error) => {
        console.log(error);
      })
  }

  return (
    <div className='userListContainer'>
    
      <input className='searchInput' type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or email or role"/>
      {/* creating table for user*/}
      <table   cellspacing={0} cellpadding={5}>
        <thead>
          <tr>
            <th>S. No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>option1</th>
            <th>option2</th>
          </tr>
        </thead>
        <tbody>
            {
              users[index]?.map((user, index) => (
                <tr key={user?._id}>
                  <td>{index + 1}</td>
                  <td>{user?.username}</td>
                  <td>{user?.email}</td>
                  <td>{user?.role}</td>
                  <td><button className='edit' onClick={() =>editUser(user?._id)}>Edit</button></td>
                  <td><button className='delete' onClick={() =>deleteUser(user?._id)}>Delete</button></td>
                </tr>
              ))
            }
          
        </tbody>
      </table>

      <div className="indexContainer">
        {
          Numbers?.map((number, ins) => (
            <button key={number} className={ins === index ? 'active indexBtn' : 'indexBtn'} onClick={() => setIndex(ins)}>
              {number}
            </button>
          ))
        }
      </div>



    </div>
  )
}

export default UserList